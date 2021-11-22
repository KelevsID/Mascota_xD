import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota, PagoPlan} from '../models';
import {PagoPlanRepository} from './pago-plan.repository';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.id,
          PagoPlan,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
