import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VisitaPreventiva} from '../models';
import {VisitaPreventivaRepository} from '../repositories';

export class VisitaPreventivaController {
  constructor(
    @repository(VisitaPreventivaRepository)
    public visitaPreventivaRepository : VisitaPreventivaRepository,
  ) {}

  @post('/visita-preventivas')
  @response(200, {
    description: 'VisitaPreventiva model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitaPreventiva)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPreventiva, {
            title: 'NewVisitaPreventiva',
            exclude: ['id'],
          }),
        },
      },
    })
    visitaPreventiva: Omit<VisitaPreventiva, 'id'>,
  ): Promise<VisitaPreventiva> {
    return this.visitaPreventivaRepository.create(visitaPreventiva);
  }

  @get('/visita-preventivas/count')
  @response(200, {
    description: 'VisitaPreventiva model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitaPreventiva) where?: Where<VisitaPreventiva>,
  ): Promise<Count> {
    return this.visitaPreventivaRepository.count(where);
  }

  @get('/visita-preventivas')
  @response(200, {
    description: 'Array of VisitaPreventiva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitaPreventiva, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitaPreventiva) filter?: Filter<VisitaPreventiva>,
  ): Promise<VisitaPreventiva[]> {
    return this.visitaPreventivaRepository.find(filter);
  }

  @patch('/visita-preventivas')
  @response(200, {
    description: 'VisitaPreventiva PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPreventiva, {partial: true}),
        },
      },
    })
    visitaPreventiva: VisitaPreventiva,
    @param.where(VisitaPreventiva) where?: Where<VisitaPreventiva>,
  ): Promise<Count> {
    return this.visitaPreventivaRepository.updateAll(visitaPreventiva, where);
  }

  @get('/visita-preventivas/{id}')
  @response(200, {
    description: 'VisitaPreventiva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitaPreventiva, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitaPreventiva, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitaPreventiva>
  ): Promise<VisitaPreventiva> {
    return this.visitaPreventivaRepository.findById(id, filter);
  }

  @patch('/visita-preventivas/{id}')
  @response(204, {
    description: 'VisitaPreventiva PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPreventiva, {partial: true}),
        },
      },
    })
    visitaPreventiva: VisitaPreventiva,
  ): Promise<void> {
    await this.visitaPreventivaRepository.updateById(id, visitaPreventiva);
  }

  @put('/visita-preventivas/{id}')
  @response(204, {
    description: 'VisitaPreventiva PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaPreventiva: VisitaPreventiva,
  ): Promise<void> {
    await this.visitaPreventivaRepository.replaceById(id, visitaPreventiva);
  }

  @del('/visita-preventivas/{id}')
  @response(204, {
    description: 'VisitaPreventiva DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaPreventivaRepository.deleteById(id);
  }
}
