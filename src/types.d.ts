declare interface OObject {
  [key: string]: any;
}

declare module 'circle-assign' {
  function assign(target: OObject, ...sources: OObject[]): OObject;
  export = assign;
}
