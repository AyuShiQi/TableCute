/**
 * 这里是与用户相关的接口，包括账号密码登录、找回密码与信息修改
 */
import { request } from './request'
import {
  ToRegister,
  ToLogin, ToUpdate,
  BackPassword,
  GetInfo,
  ChangePassword,
  UpdateInfo,
  GetLPhoneUpdateSMS,
  ChangeMobile,
  BindMobile,
  BindEmail,
  AddEmail,
  HasAccount,
  SetAccount
} from './interface/user'
import qs from 'qs'

/**
 * 注册接口 需要返还
 * @param username 用户名 
 * @param password 密码
 * @param mobile 电话号码
 * @param email 邮箱
 * @returns 响应data
 */
export const toRegister: ToRegister = (username: string, password: string) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
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

/**
 * 找回密码接口
 * @param email 邮箱
 * @param code 验证码
 * @param password 新密码
 * @returns 响应data
 */
export const backPassword: BackPassword = (email: string, code: string, password: string) => {
  return request({
    url: '/user/backPW',
    method: 'get',
    params: {
      email,
      code,
      password
    }
  }).then((val: BackPassword) => val)
}

/**
 * 获取用户信息接口
 * @param token 用户token
 * @returns 响应data
 */
export const getInfo: GetInfo = (token: string) => {
  return request({
    url: '/user/info',
    method: 'get',
    headers: {
      satoken: token
    }
  })
}

/**
 * 更换密码
 * @param oldPassword 老密码 
 * @param newPassword 新密码
 * @param token token
 * @returns 响应data
 */
export const changePassword: ChangePassword = (oldPassword: string, newPassword: string, token: string) => {
  return request({
    url: '/user/users/changePassword',
    method: 'post',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      oldPassword,
      newPassword
    })
  })
}

/**
 * 更新用户信息
 * @param token token
 * @param option 头像和昵称
 * @returns 响应datas
 */
export const updateInfo: UpdateInfo = (token: string, option: {
  avater?: string,
  nickname?: string, 
}) => {
  return request({
    url: '/user/updateInfo',
    method: 'put',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      'nickname': option.nickname,
      'avater': option.avater
    })
  })
}

/**
 * 获取绑定手机号验证码
 * @param token token
 * @param mobile 电话号码
 * @returns 响应datas
 */
export const getLPhoneAddSMS: GetLPhoneUpdateSMS = (token: string, mobile: string) => {
  return request({
    url: '/passport/getLPhoneAddSMS',
    method: 'get',
    headers: {
      'satoken': token
    },
    params: {
      mobile
    }
  })
}

/**
 * 获取更换手机号验证码
 * @param token token
 * @param mobile 电话号码
 * @returns 响应datas
 */
export const getLPhoneUpdateSMS: GetLPhoneUpdateSMS = (token: string, mobile: string) => {
  return request({
    url: '/passport/getLPhoneUpdateSMS',
    method: 'get',
    headers: {
      'satoken': token
    },
    params: {
      mobile
    }
  })
}

/**
 * 修改用户手机号
 * @param token token
 * @param mobile 旧手机
 * @param smscode 验证码
 * @param newMobile 新手机
 * @returns 响应data
 */
export const changeMobile: ChangeMobile = (token: string, mobile: string, smscode: string, newMobile: string) => {
  return request({
    url: '/user/users/mobile',
    method: 'post',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      phoneNumber: mobile,
      verifyCode: smscode,
      newPhoneNumber: newMobile
    })
  })
}

/**
 * 绑定用户手机号
 * @param token token
 * @param mobile 手机
 * @param smscode 验证码
 * @returns 响应data
 */
export const bindMobile: BindMobile = (token: string, mobile: string, smscode: string) => {
  return request({
    url: '/user/bindMobile',
    method: 'post',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      mobile,
      verificationCode: smscode
    })
  })
}

/**
 * 绑定用户邮箱
 * @param token token
 * @param email 邮箱
 * @param smscode 验证码
 * @returns 响应data
 */
export const bindEmail: BindEmail = (token: string, email: string, smscode: string) => {
  return request({
    url: '/user/bindEmail',
    method: 'post',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      email,
      code: smscode
    })
  })
}

/**
 * 获取邮箱验证码
 * @param token token
 * @param email 邮箱
 * @returns 响应datas
 */
export const addEmail: AddEmail = (token: string, email: string) => {
  return request({
    url: '/addEmail',
    method: 'get',
    headers: {
      'satoken': token
    },
    params: {
      email
    }
  })
}

/**
 * 获取该用户是否有绑定账号
 * @param token 
 * @returns 
 */
export const hasAccount: HasAccount = (token: string) => {
  return request({
    url: '/user/account',
    method: 'get',
    headers: {
      'satoken': token
    }
  })
}


/**
 * 设置账号和密码
 * @param token token
 * @param username 设置账号
 * @param password 设置密码
 * @returns 响应data
 */
export const setAccount: SetAccount = (token: string, username: string, password: string) => {
  return request({
    url: '/user/account',
    method: 'put',
    headers: {
      'satoken': token
    },
    data: qs.stringify({
      'userName': username,
      password
    })
  })
}