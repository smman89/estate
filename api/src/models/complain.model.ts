import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}, postgresql: {schema: 'public', table: 'complain'}})
export class Complain extends Entity {
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
      columnName: 'user_complained_id',
    },
  })
  userComplainedId: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'complain_type_id',
    },
  })
  complainTypeId: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'ad_id',
    },
  })
  adId: number;

  @property({
    type: 'number',
    required: true,
  })
  date: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Complain>) {
    super(data);
  }
}

export interface ComplainRelations {
  // describe navigational properties here
}

export type ComplainWithRelations = Complain & ComplainRelations;
