import qs from 'qs'
/**
 * 这里是与短信登录相关的接口
 */
import { request } from './request'
import type { TelLogin, ToGetSMCode } from './interface/passport'

/**
 * 获取手机登录验证码
 * @param mobile 手机号
 * @returns 响应data
 */
export const toGetSMCode: ToGetSMCode = (mobile: string) => {
  return request({
    url: '/passport/getSMSCode',
    method: 'get',
    params: {
      mobile
    }
  }).then((val: ToGetSMCode) => val)
}

/**
 * 手机验证码登录
 * @param mobile 手机号
 * @param smsCode 验证码
 * @returns 响应data
 */
export const telLogin: TelLogin = (mobile: string, smsCode: string) => {
  return request({
      url: '/passport/doLogin',
      method: 'post',
      data: {
        mobile,
        smsCode
      }
  }).then((val: TelLogin) => val)
}