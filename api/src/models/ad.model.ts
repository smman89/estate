import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}, postgresql: {schema: 'public', table: 'ad'}})
export class Ad extends Entity {
  @property({
    type: 'number',
    id: true,
    postgresql: {
      columnName: 'ad_id',
    },
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'city_id',
    },
    required: true,
  })
  cityId: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'user_id',
    },
    required: true,
  })
  userId: number;


  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'post_id',
    },
  })
  postId?: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'price',
    },
  })
  price: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'address',
    },
  })
  address: string;



  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'created_at',
    },
  })
  createdAt: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'ad_type',
    },
  })
  adType: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  images?: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  attachments?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ad>) {
    super(data);
  }
}

export interface AdRelations {
  // describe navigational properties here
}

export type AdWithRelations = Ad & AdRelations;
