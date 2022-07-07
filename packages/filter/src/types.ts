export type FilterCallback = (key: string, value: any, index: number) => boolean
export type AsyncFilterCallback = (key: string, value: any, index: number) => Promise<boolean>
