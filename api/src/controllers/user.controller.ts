// Uncomment these imports to begin using these cool features!

import {TokenService, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, getModelSchemaRef, param, patch, post, requestBody, response, SchemaObject} from '@loopback/rest';
import {genSalt, hash} from 'bcryptjs';
import * as _ from 'lodash';
import {Credentials, TokenServiceBindings, UserServiceBindings} from '../components/jwt-authentication';
import {User} from '../models';
import {TokenRepository, UserRepository} from '../repositories';

const CredentialsSchemaSignup: SchemaObject = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    username: {
      type: 'string',
      minLength: 6,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const RESOURCE_NAME = 'user';


const ACL_USER = {
  update: {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['update'],
    allowedRoles: ['admin'],
  }

};

const CredentialsSchemaLogin: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBodyLogin = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchemaLogin},
  },
};

export const CredentialsRequestBodySignup = {
  description: 'The input of signup function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchemaSignup},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(TokenRepository)
    public tokenRepository: TokenRepository,
  ) { }

  @post('/api/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody(CredentialsRequestBodyLogin) credentials: Credentials): Promise<{token: string, username: string, fullname: string, phone: string, email: string, id: number}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    const date = new Date().toISOString();
    await this.tokenRepository.create({id: token, ttl: 1209600, created: date, userId: user.id});
    return {token, username: user.username, fullname: user.fullname, phone: user.phone, email: user.email, id: user.id};
  }

  @post('/api/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async signup(@requestBody(CredentialsRequestBodySignup) credentials: Credentials) {
    const hashedPassword = await this.hashPassword(credentials.password, 10);
    const savedUser = await this.userRepository.create(_.pick(credentials, ['email', 'username']));

    await this.userRepository.userCredentials(savedUser.id).create({password: hashedPassword, userId: savedUser.id});
    return savedUser;
  }

  async hashPassword(password: string, rounds: number): Promise<string> {
    const salt = await genSalt(rounds);
    return hash(password, salt);
  }


  @patch('/api/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Pick<User, 'phone' | 'email' | 'fullname'>,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }
}

