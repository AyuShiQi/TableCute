import { request } from './request'

export const toRegister = (username: string, password: string) => {
  return request({
    url: '/register',
    method: 'post',
    params: {
      username,
      password
    }
  }).then(val => val)
}
