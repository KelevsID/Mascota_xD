import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {Mascota} from './mascota.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

@model()
export class Proveedor extends Entity {
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
  ceo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono1: string;

  @property({
    type: 'string',
  })
  telefono2?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Mascota, {through: {model: () => ConsultaVeterinaria}})
  mascotas: Mascota[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
