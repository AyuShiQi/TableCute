import { request } from './request'

/**
 * 注册接口
 * @param username 用户名 
 * @param password 密码
 * @returns 响应data
 */
export const toRegister = (username: string, password: string) => {
  return request({
    url: '/user/register',
    method: 'post',
    params: {
      username,
      password
    }
  }).then(val => val)
}

/**
 * 账号密码登录接口
 * @param username 用户名
 * @param password 密码
 * @returns 响应data
 */
export const toLogin = (username: string, password: string) => {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      username,
      password
    }
  }).then(val => val)
}

/**
 * 更新用户信息接口
 * @param token 用户token 
 * @param option 用户信息
 * @returns 响应data
 */
export const toUpdate = (token: string, option?: any) => {
  return request({
    url: '/user/update',
    method: 'put',
    headers: {
      'satoken': `Baser ${token}`
    }
  }).then(val => val)
}
