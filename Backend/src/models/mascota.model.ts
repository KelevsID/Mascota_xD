import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Proveedor} from './proveedor.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';
import {Plan} from './plan.model';
import {PagoPlan} from './pago-plan.model';

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
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'number',
    required: false,
  })
  peso: number;

  @property({
    type: 'boolean',
    required: false,
  })
  enfermedadesPre: boolean;

  @property({
    type: 'string',
  })
  enfermedadesDescrip?: string;

  @property({
    type: 'date',
    required: false,
  })
  fechaNacimiento: string;

  @property({
    type: 'boolean',
    required: false,
  })
  estadoPlan: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  rescindido: boolean;

  @property({
    type: 'string',
    required: false,
  })
  motivoRescindido: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  historiales?: string[];

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => Proveedor, {through: {model: () => ConsultaVeterinaria}})
  proveedors: Proveedor[];

  @hasMany(() => Plan, {through: {model: () => PagoPlan}})
  plans: Plan[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
