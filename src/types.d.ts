declare interface OObject {
  [key: string]: any;
}

declare interface CleanOptions {
  follow?: boolean;
}

declare interface EachOptions {
  follow?: boolean;
}

declare interface EachCallback {
  (key: string, value: any, index: number): void;
}

declare interface EveryOptions {
  follow?: boolean;
}

declare interface EveryCallback {
  (key: string, value: any, index: number): boolean;
}

declare interface FilterOptions {
  follow?: boolean;
}

declare interface FilterCallback {
  (key: string, value: any, index: number): boolean;
}

declare interface FindOptions {
  follow?: boolean;
}

declare interface FindCallback {
  (key: string, value: any, index: number): boolean;
}

declare interface FlipOptions {
  follow?: boolean;
  useToString?: boolean;
}

declare interface IncludesOptions {
  follow?: boolean;
}

declare interface KeyOfOptions {
  follow?: boolean;
}

declare interface KeysOptions {
  follow?: boolean;
}

declare interface MapOptions {
  follow?: boolean;
}

declare interface MapCallback {
  (key: string, value: any, index: number): any;
}

declare interface SliceOptions {
  follow?: boolean;
}

declare interface SomeOptions {
  follow?: boolean;
}

declare interface SomeCallback {
  (key: string, value: any, index: number): boolean;
}

declare interface SortOptions {
  follow?: boolean;
}

declare interface SortElement {
  key: string;
  value: any;
}

declare interface SortCallback {
  (firstEl: SortElement, secondEl: SortElement): number;
}

declare interface ValuesOptions {
  follow?: boolean;
}

declare module 'circle-assign' {
  function assign(target: OObject, ...sources: OObject[]): OObject;
  export = assign;
}
