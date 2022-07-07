export type FindCallback = (key: string, value: any, index: number) => boolean
export type AsyncFindCallback = (key: string, value: any, index: number) => Promise<boolean>

export interface FoundResult<T> { key: string, value: T, index: number, found: true }
export interface NotFoundResult { key: undefined, value: undefined, index: undefined, found: false }
export type FindResult<T> = FoundResult<T> | NotFoundResult
