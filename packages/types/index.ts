export declare type ObjectKey = string | number | symbol
export declare type GenericObject = Record<ObjectKey, any>

export declare type IsObject<T> = T extends GenericObject
  ? T extends any[]
    ? false
    : true
  : false
