import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EstateDataSource} from '../datasources';
import {Ad, AdRelations} from '../models';

export class AdRepository extends DefaultCrudRepository<
  Ad,
  typeof Ad.prototype.id,
  AdRelations
> {
  constructor(
    @inject('datasources.estate') dataSource: EstateDataSource,
  ) {
    super(Ad, dataSource);
  }
}
