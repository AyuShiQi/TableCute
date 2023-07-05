import type { TuResponse } from './request'

type TelLoginBack = TuResponse<{
  token: string
}>

type ToGetSMCodeBack = TuResponse<any>
  
export type TelLogin = (mobile: string, smsCode: string) => Promise<TelLoginBack>

export type ToGetSMCode = (mobile: string) => Promise<ToGetSMCodeBack>