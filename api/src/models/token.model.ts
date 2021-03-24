import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true, postgresql: {schema: 'public', table: 'token'}}})
export class Token extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  created: string;

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
  })
  ttl: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Token>) {
    super(data);
  }
}

export interface TokenRelations {
  // describe navigational properties here
}

export type TokenWithRelations = Token & TokenRelations;
