import type { TuResponse } from './request'

type GetCodeByeBack = TuResponse<any>
  
export type GetCodeBye = (email: string) => Promise<GetCodeByeBack>