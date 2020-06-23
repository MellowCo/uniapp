import request from '@/uilts/request'
import { PageQuery } from '@/interface/Interface'

export function recommendList(query: PageQuery): Promise<any> {
  return request({
    url: 'image/v3/homepage/vertical',
    data: {
      ...query
    }
  })
}

export function albumList(query: PageQuery): Promise<any> {
  return request({
    url: 'image/v1/wallpaper/album',
    data: {
      ...query
    }
  })
}

export function albumdetail(query: PageQuery, id: string): Promise<any> {
  return request({
    url: `image/v1/wallpaper/album/${id}/wallpaper`,
    data: {
      ...query
    }
  })
}
