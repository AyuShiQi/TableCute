import { request } from './request'
import qs from 'qs'

import { CreateProj } from './interface/tab'

export const createProj: CreateProj = (data: any, style: any, type: number) => {
    return request({
        url: '/tab/create',
        method: 'post',
        data: qs.stringify({
          json1: data,
          json2: style,
          type
        })
    })
  }