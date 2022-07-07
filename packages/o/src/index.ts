// istanbul ignore file
import is from 'o.is'
import clone from 'o.clone'
import clean from 'o.clean'
import dot from 'o.dot'
import deflate from 'o.deflate'
import deepEntries from 'o.deepentries'
import inflate from 'o.inflate'
import deepFromEntries from 'o.deepfromentries'
import deepKeys from 'o.deepkeys'
import deepValues from 'o.deepvalues'
import del from 'o.del'
import { each, eachAsync, deepEach, deepEachAsync } from 'o.each'
import empty from 'o.empty'
import { equal, deepEqual } from 'o.equal'
import { every, everyAsync, deepEvery, deepEveryAsync } from 'o.every'
import { filter, filterAsync, deepFilter, deepFilterAsync } from 'o.filter'
import { find, findAsync, deepFind, deepFindAsync } from 'o.find'
import get from 'o.get'
import has from 'o.has'
import { includes, deepIncludes } from 'o.includes'
import { keyOf, deepKeyOf } from 'o.keyof'
import { map, mapAsync, deepMap, deepMapAsync } from 'o.map'
import shallowMerge from 'o.shallowmerge'
import merge from 'o.merge'
import set from 'o.set'
import { size, deepSize } from 'o.size'
import { slice, deepSlice } from 'o.slice'
import { some, someAsync, deepSome, deepSomeAsync } from 'o.some'

export {
  is, clone, clean, dot, deflate,
  deepEntries, inflate, deepFromEntries,
  deepKeys, deepValues, del, each, eachAsync,
  deepEach, deepEachAsync, empty, equal,
  deepEqual, every, everyAsync, deepEvery,
  deepEveryAsync, filter, filterAsync,
  deepFilter, deepFilterAsync, find, findAsync,
  deepFind, deepFindAsync, get, has, includes,
  deepIncludes, keyOf, deepKeyOf, map, mapAsync,
  deepMap, deepMapAsync, shallowMerge, merge,
  set, size, deepSize, slice, deepSlice, some,
  someAsync, deepSome, deepSomeAsync
}

export type {
  ArgumentTypeError, AsyncFunction,
  AsyncFunctionArray, GenericObject,
  ObjectKey, IsObject
} from 'o.utils'

export type { Entry } from 'o.deepentries'
export type { DeepCleanObject as CleanObject } from 'o.clean'
export type { EachCallback, AsyncEachCallback } from 'o.each'
export type { EveryCallback, AsyncEveryCallback } from 'o.every'
export type { FilterCallback, AsyncFilterCallback } from 'o.filter'
export type { FindCallback, AsyncFindCallback } from 'o.find'
export type { MapCallback, AsyncMapCallback } from 'o.map'
export type { SomeCallback, AsyncSomeCallback } from 'o.some'
