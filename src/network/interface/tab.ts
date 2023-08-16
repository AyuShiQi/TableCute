import { TuResponse } from './request'

type CreateProjBack = TuResponse<any>

export type CreateProj = (data: any, style: any, type: number) => Promise<CreateProjBack>