export const IS_PROD = process.env.NODE_ENV === 'production' ? true : false

export const CONNECTION_STRING_PG_ESTATE = IS_PROD ? "" : "postgresql://postgres:postgres@localhost:5436/estate"
