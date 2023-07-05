/**
 * 这里是与用户相关的接口，包括账号密码登录、找回密码与信息修改
 */
import { request } from './request'
import { ToRegister, ToLogin, ToUpdate } from './interface/user'

/**
 * 注册接口
 * @param username 用户名 
 * @param password 密码
 * @returns 响应data
 */
export const toRegister: ToRegister = (username: string, password: string) => {
  return request({
    url: '/user/register',
    method: 'post',
    params: {
      username,
      password
    }
  }).then((val: ToRegister) => val)
}

/**
 * 账号密码登录接口
 * @param username 用户名
 * @param password 密码
 * @returns 响应data
 */
export const toLogin: ToLogin = (username: string, password: string) => {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      username,
      password
    }
  }).then((val: ToLogin) => val)
}

/**
 * 更新用户信息接口
 * @param token 用户token 
 * @param option 用户信息
 * @returns 响应data
 */
export const toUpdate: ToUpdate = (token: string, option?: any) => {
  return request({
    url: '/user/update',
    method: 'put',
    headers: {
      'satoken': `Baser ${token}`
    }
  }).then((val: ToUpdate) => val)
}
