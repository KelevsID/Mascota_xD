import {Entity, model, property} from '@loopback/repository';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sexo: boolean;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'boolean',
    required: true,
  })
  enfermedadesPre: boolean;

  @property({
    type: 'string',
  })
  enfermedadesDescrip?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoPlan: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  rescindido: boolean;

  @property({
    type: 'string',
    required: true,
  })
  motivoRescindido: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  historiales?: string[];


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
