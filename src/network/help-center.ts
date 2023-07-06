/**
 * 这里是帮助中心的相关接口，包括找回密码等
 */
import { request } from './request'
import { GetCodeBye } from './interface/help-center'

/**
 * 发送找回密码验证码邮箱
 * @param email 邮箱
 * @returns 响应data
 */
export const getCodeBye: GetCodeBye = (email: string) => {
    return request({
        url: '/getcodebye',
        method: 'get',
        params: {
          email
        }
    }).then((val: GetCodeBye) => val)
  }