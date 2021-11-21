import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagoPlan, PagoPlanRelations} from '../models';

export class PagoPlanRepository extends DefaultCrudRepository<
  PagoPlan,
  typeof PagoPlan.prototype.id,
  PagoPlanRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PagoPlan, dataSource);
  }
}
