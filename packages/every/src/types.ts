export type EveryCallback = (key: string, value: any, index: number) => boolean
export type AsyncEveryCallback = (key: string, value: any, index: number) => Promise<boolean>
