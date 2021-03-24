import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}, postgresql: {schema: 'public', table: 'blacklist'}})
export class Blacklist extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'user_id',
    },
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'reason_id',
    },
  })
  reasonId: number;

  @property({
    type: 'number',
    required: true,
  })
  date: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Blacklist>) {
    super(data);
  }
}

export interface BlacklistRelations {
  // describe navigational properties here
}

export type BlacklistWithRelations = Blacklist & BlacklistRelations;
