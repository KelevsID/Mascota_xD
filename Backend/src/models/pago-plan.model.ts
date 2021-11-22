import {Entity, model, property} from '@loopback/repository';

@model()
export class PagoPlan extends Entity {
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
  fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadCuotasPagar: number;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
  })
  planId?: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  constructor(data?: Partial<PagoPlan>) {
    super(data);
  }
}

export interface PagoPlanRelations {
  // describe navigational properties here
}

export type PagoPlanWithRelations = PagoPlan & PagoPlanRelations;
