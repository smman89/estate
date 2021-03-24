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
import {Complain} from '../models';
import {ComplainRepository} from '../repositories';

export class ComplainController {
  constructor(
    @repository(ComplainRepository)
    public complainRepository: ComplainRepository,
  ) { }

  @post('/complains')
  @response(200, {
    description: 'Complain model instance',
    content: {'application/json': {schema: getModelSchemaRef(Complain)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Complain, {
            title: 'NewComplain',
            exclude: ['id'],
          }),
        },
      },
    })
    complain: Omit<Complain, 'id'>,
  ): Promise<Complain> {
    return this.complainRepository.create(complain);
  }

  @get('/complains/count')
  @response(200, {
    description: 'Complain model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Complain) where?: Where<Complain>,
  ): Promise<Count> {
    return this.complainRepository.count(where);
  }

  @get('/complains')
  @response(200, {
    description: 'Array of Complain model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Complain, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Complain) filter?: Filter<Complain>,
  ): Promise<Complain[]> {
    return this.complainRepository.find(filter);
  }

  @get('/complains/{id}')
  @response(200, {
    description: 'Complain model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Complain, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Complain, {exclude: 'where'}) filter?: FilterExcludingWhere<Complain>
  ): Promise<Complain> {
    return this.complainRepository.findById(id, filter);
  }

  @patch('/complains/{id}')
  @response(204, {
    description: 'Complain PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Complain, {partial: true}),
        },
      },
    })
    complain: Complain,
  ): Promise<void> {
    await this.complainRepository.updateById(id, complain);
  }

  @put('/complains/{id}')
  @response(204, {
    description: 'Complain PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() complain: Complain,
  ): Promise<void> {
    await this.complainRepository.replaceById(id, complain);
  }

  @del('/complains/{id}')
  @response(204, {
    description: 'Complain DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.complainRepository.deleteById(id);
  }
}
