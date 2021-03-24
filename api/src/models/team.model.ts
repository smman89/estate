import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true, postgresql: {schema: 'public', table: 'team'}}})
export class Team extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: false,
    updateOnly: true
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'owner_id',
    },
  })
  owner_id: number;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
    postgresql: {
      columnName: 'member_ids',
    },
  })
  memberIds: number[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
