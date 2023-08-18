import { TuResponse } from './request'


type TuProject = {
  createTime: string
  id: number
  json1: any // data
  json2: any // style
  type: number
  updateTime: string
  userId: number
}

type CreateProjBack = TuResponse<any>
type GetProjBack = TuResponse<TuProject[]>
type DeleteProjBack = TuResponse<any>

export type CreateProj = (data: any, style: any, type: number, token: string) => Promise<CreateProjBack>
export type GetProj = (token: string) => Promise<GetProjBack>
export type DeleteProj = (id: number, token: string) => Promise<DeleteProjBack>