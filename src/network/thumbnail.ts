import { request } from './request'
import qs from 'qs'

import { CreateProj } from './interface/tab'

export const getThumbnail: CreateProj = (token: string) => {
  return request({
      url: '/thumbnail',
      method: 'get',
      headers: {
        satoken: token
      },
  })
}