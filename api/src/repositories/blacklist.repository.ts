import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EstateDataSource} from '../datasources';
import {Blacklist, BlacklistRelations} from '../models';

export class BlacklistRepository extends DefaultCrudRepository<
  Blacklist,
  typeof Blacklist.prototype.id,
  BlacklistRelations
> {
  constructor(
    @inject('datasources.estate') dataSource: EstateDataSource,
  ) {
    super(Blacklist, dataSource);
  }
}
