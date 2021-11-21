import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitaPreventiva, VisitaPreventivaRelations} from '../models';

export class VisitaPreventivaRepository extends DefaultCrudRepository<
  VisitaPreventiva,
  typeof VisitaPreventiva.prototype.id,
  VisitaPreventivaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VisitaPreventiva, dataSource);
  }
}
