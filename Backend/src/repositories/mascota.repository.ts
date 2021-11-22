import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Empleado, Proveedor, ConsultaVeterinaria, Plan, PagoPlan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {ProveedorRepository} from './proveedor.repository';
import {PagoPlanRepository} from './pago-plan.repository';
import {PlanRepository} from './plan.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.id>;

  public readonly proveedors: HasManyThroughRepositoryFactory<Proveedor, typeof Proveedor.prototype.id,
          ConsultaVeterinaria,
          typeof Mascota.prototype.id
        >;

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          PagoPlan,
          typeof Mascota.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Mascota, dataSource);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.proveedors = this.createHasManyThroughRepositoryFactoryFor('proveedors', proveedorRepositoryGetter, consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
