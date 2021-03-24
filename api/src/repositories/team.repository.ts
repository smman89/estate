import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EstateDataSource} from '../datasources';
import {Team, TeamRelations} from '../models';

export class TeamRepository extends DefaultCrudRepository<Team, typeof Team.prototype.id, TeamRelations> {
  constructor(@inject('datasources.estate') dataSource: EstateDataSource) {
    super(Team, dataSource);
  }
}
