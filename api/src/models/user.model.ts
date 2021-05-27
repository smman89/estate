import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Team} from './team.model';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'public', table: 'user'},
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: false,
    updateOnly: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
  })
  fullname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'emailVerified',
    },
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'verificationToken',
    },
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Team, {keyTo: 'owner_id'})
  teams: Team[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
