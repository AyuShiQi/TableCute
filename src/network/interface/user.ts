import type { TuResponse } from './request'

type ToRegisterBack = TuResponse<null>

type ToLoginBack = TuResponse<{
  isLogin: boolean
  loginDevice: string
  loginId: string
  loginType: string
  sessionTimeout: number
  tag: any
  tokenActivityTimeout: number
  tokenName: "satoken"
  tokenSessionTimeout: number
  tokenTimeout: number
  tokenValue: string
}>

type ToUpdateBack = TuResponse<any>

type BackPasswordBack = TuResponse<any>
  
export type ToRegister = (username: string, password: string, mobile?: string, email?: string) => Promise<ToRegisterBack>

export type ToLogin = (username: string, password: string) => Promise<ToLoginBack>

export type ToUpdate = (token: string, option?: {
    // 头像地址
    avatar?: string,
	createBy?: string,
	email?: string,
    // 创建时间
	gmtCreate?: string,
    // 更新时间
	gmtModified?: string,
	id?: number,
	isDeleted?: boolean,
	mobile?: string,
	nickname?: string,
	password?: string,
	type?: number,
	updateBy?: string,
	userName?: string
}) => Promise<ToUpdateBack>

export type BackPassword = (email: string, code: string, password: string) => Promise<BackPasswordBack>