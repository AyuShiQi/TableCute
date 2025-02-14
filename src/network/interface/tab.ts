import { TuResponse } from './request'


export type TuProject = {
  createTime: string
  id: number
  json1: any // data
  json2: any // style
  type: number
  updateTime: string
  userId: number
  url: string
}

type CreateProjBack = TuResponse<any>
type GetProjBack = TuResponse<TuProject[]>
type DeleteProjBack = TuResponse<any>
type UpdateProjBack= TuResponse<any>

export type CreateProj = (data: any, style: any, type: number, token: string) => Promise<CreateProjBack>
export type GetProj = (token: string) => Promise<GetProjBack>
export type DeleteProj = (id: number, token: string) => Promise<DeleteProjBack>
export type UpdateProj = (id: number, data: any, style: any, token: string) => Promise<UpdateProjBack>