import { request } from './request'

/**
 * 获取手机登录验证码
 * @param mobile 手机号
 * @returns 响应data
 */
export const toGetSMCode = (mobile: string) => {
  return request({
    url: '/passport/getSMSCode',
    method: 'get',
    params: {
      mobile
    }
  }).then(val => val)
}

/**
 * 手机验证码登录
 * @param mobile 手机号
 * @param smsCode 验证码
 * @returns 响应data
 */
export const doLogin = (mobile: string, smsCode: string) => {
  return request({
      url: '/passport/doLogin',
      method: 'post',
      data: {
        "mobile": mobile,
        "smsCode": smsCode
      }
  }).then(val => val)
}