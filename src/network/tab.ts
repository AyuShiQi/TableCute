import { request } from './request'
import qs from 'qs'

import { CreateProj, GetProj, DeleteProj } from './interface/tab'

export const createProj: CreateProj = (data: any, style: any, type: number, token: string) => {
  return request({
      url: '/tab/create',
      method: 'post',
      headers: {
        satoken: token
      },
      data: qs.stringify({
        json1: data,
        json2: style,
        type
      })
  })
}

export const getProj: GetProj = (token: string) => {
  return request({
      url: '/tab/lists',
      method: 'get',
      headers: {
        satoken: token
      }
  })
}

export const deleteProj: DeleteProj = (id: number, token: string) => {
  return request({
      url: '/tab/tabs/delete',
      method: 'post',
      headers: {
        satoken: token
      },
      data: qs.stringify({
        id
      })
  })
}
