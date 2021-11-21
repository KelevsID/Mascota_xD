import {Entity, model, property} from '@loopback/repository';

@model()
export class VisitaPreventiva extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'date',
    required: true,
  })
  horaFinVisita: string;

  @property({
    type: 'number',
    required: true,
  })
  temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
  })
  edadMascota: number;

  @property({
    type: 'number',
    required: true,
  })
  frecuCardiaca: number;

  @property({
    type: 'number',
    required: true,
  })
  frecuRespiratoria: number;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;


  constructor(data?: Partial<VisitaPreventiva>) {
    super(data);
  }
}

export interface VisitaPreventivaRelations {
  // describe navigational properties here
}

export type VisitaPreventivaWithRelations = VisitaPreventiva & VisitaPreventivaRelations;
