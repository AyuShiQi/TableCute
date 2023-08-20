import { request } from './request'
import qs from 'qs'

import { 
  CreateProj,
  GetProj,
  DeleteProj,
  UpdateProj
} from './interface/tab'

export const createProj: CreateProj = (data: any, style: any, type: number, token: string) => {
  return request({
      url: '/tab/create',
      method: 'post',
      headers: {
        satoken: token
      },
      data: qs.stringify({
        json1: JSON.stringify(data),
        json2: JSON.stringify(style),
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
  }).then((val: any) => {
    for (const item of val.data) {
      item.json1 = JSON.parse(item.json1)
      item.json2 = JSON.parse(item.json2)
    }
    return val
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

export const updateProj: UpdateProj = (id: number, data: any, style: any, token: string) => {
  return request({
      url: '/tab/update',
      method: 'post',
      headers: {
        satoken: token
      },
      data: qs.stringify({
        TabId: id,
        json1: JSON.stringify(data),
        json2: JSON.stringify(style)
      })
  })
}
