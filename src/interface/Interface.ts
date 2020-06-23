export interface result {
  code: number
  res: object[] | object
}

export interface IRequestOption {
  url:string
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  header?:any
  data:object
}

export interface PageQuery {
  limit: number
  order: string
  skip: number
}
