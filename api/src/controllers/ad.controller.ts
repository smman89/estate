import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Ad} from '../models';
import {AdRepository} from '../repositories';


const RESOURCE_NAME = 'ad';
const ACL_AD = {
  read: {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['read'],
    allowedRoles: ['authenticated'],
  },
  update: {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['update'],
    allowedRoles: ['admin'],
  },
  create: {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['create'],
    allowedRoles: ['authenticated'],
  },
  delete: {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['delete'],
    allowedRoles: ['admin']
  },
};

export class AdController {
  constructor(
    @repository(AdRepository)
    public adRepository: AdRepository,
  ) { }

  @post('/api/ads')
  @response(200, {
    description: 'Ad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ad)}},
  })
  @authenticate('jwt')
  @authorize(ACL_AD['create'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ad, {
            title: 'NewAd',
            exclude: ['adId'],
          }),
        },
      },
    })
    ad: Omit<Ad, 'adId'>,
  ): Promise<Ad> {
    return this.adRepository.create(ad);
  }


  @get('/api/ads/count')
  @response(200, {
    description: 'Ad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize(ACL_AD['read'])
  async count(
    @param.where(Ad) where?: Where<Ad>,
  ): Promise<Count> {
    return this.adRepository.count(where);
  }

  @get('/api/ads')
  @response(200, {
    description: 'Array of Ad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ad, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_AD['read'])
  async find(
    @param.filter(Ad) filter?: Filter<Ad>,
  ): Promise<Ad[]> {
    return this.adRepository.find(filter);
  }


  @get('/api/ads/{id}')
  @response(200, {
    description: 'Ad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ad, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_AD['read'])
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ad>
  ): Promise<Ad> {
    return this.adRepository.findById(id, filter);
  }

  @patch('/api/ads/{id}')
  @response(204, {
    description: 'Ad PATCH success',
  })
  @authenticate('jwt')
  @authorize(ACL_AD['update'])
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ad, {partial: true}),
        },
      },
    })
    ad: Ad,
  ): Promise<void> {
    await this.adRepository.updateById(id, ad);
  }

  @put('/api/ads/{id}')
  @response(204, {
    description: 'Ad PUT success',
  })
  @authenticate('jwt')
  @authorize(ACL_AD['update'])
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ad: Ad,
  ): Promise<void> {
    await this.adRepository.replaceById(id, ad);
  }

  @del('/api/ads/{id}')
  @response(204, {
    description: 'Ad DELETE success',
  })
  @authenticate('jwt')
  @authorize(ACL_AD['delete'])
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adRepository.deleteById(id);
  }
}
