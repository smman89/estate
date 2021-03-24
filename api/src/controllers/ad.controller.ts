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

export class AdController {
  constructor(
    @repository(AdRepository)
    public adRepository: AdRepository,
  ) { }

  @post('/ads')
  @response(200, {
    description: 'Ad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ad)}},
  })
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

  @get('/ads/count')
  @response(200, {
    description: 'Ad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ad) where?: Where<Ad>,
  ): Promise<Count> {
    return this.adRepository.count(where);
  }

  @get('/ads')
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
  async find(
    @param.filter(Ad) filter?: Filter<Ad>,
  ): Promise<Ad[]> {
    return this.adRepository.find(filter);
  }

  // @patch('/ads')
  // @response(200, {
  //   description: 'Ad PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Ad, {partial: true}),
  //       },
  //     },
  //   })
  //   ad: Ad,
  //   @param.where(Ad) where?: Where<Ad>,
  // ): Promise<Count> {
  //   return this.adRepository.updateAll(ad, where);
  // }

  @get('/ads/{id}')
  @response(200, {
    description: 'Ad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ad>
  ): Promise<Ad> {
    return this.adRepository.findById(id, filter);
  }

  @patch('/ads/{id}')
  @response(204, {
    description: 'Ad PATCH success',
  })
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

  @put('/ads/{id}')
  @response(204, {
    description: 'Ad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ad: Ad,
  ): Promise<void> {
    await this.adRepository.replaceById(id, ad);
  }

  @del('/ads/{id}')
  @response(204, {
    description: 'Ad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adRepository.deleteById(id);
  }
}
