export type SomeCallback = (key: string, value: any, index: number) => boolean
export type AsyncSomeCallback = (key: string, value: any, index: number) => Promise<boolean>
