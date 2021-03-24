import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EstateDataSource} from '../datasources';
import {Complain, ComplainRelations} from '../models';

export class ComplainRepository extends DefaultCrudRepository<
  Complain,
  typeof Complain.prototype.id,
  ComplainRelations
> {
  constructor(
    @inject('datasources.estate') dataSource: EstateDataSource,
  ) {
    super(Complain, dataSource);
  }
}
