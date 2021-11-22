import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Producto, Mascota, ConsultaVeterinaria} from '../models';
import {ProductoRepository} from './producto.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {MascotaRepository} from './mascota.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Proveedor.prototype.id>;

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.id,
          ConsultaVeterinaria,
          typeof Proveedor.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Proveedor, dataSource);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
