import type { TuResponse } from './request'

type TelLoginBack = TuResponse<{
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

type ToGetSMCodeBack = TuResponse<any>
  
export type TelLogin = (mobile: string, smsCode: string) => Promise<TelLoginBack>

export type ToGetSMCode = (mobile: string) => Promise<ToGetSMCodeBack>