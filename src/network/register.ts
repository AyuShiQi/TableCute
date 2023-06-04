import { request } from './request'

export const toRegister = () => {
  return request({
    url: '/register',
    method: 'post'
  }).then(val => {
    console.log(val)
  })
}
