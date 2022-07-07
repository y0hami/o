export type MapCallback<T> = (key: string, value: any, index: number) => T
export type AsyncMapCallback<T> = (key: string, value: any, index: number) => Promise<T>
