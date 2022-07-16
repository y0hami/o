// istanbul ignore file
import is from '../../is/src'
import clone from '../../clone/src'
import clean from '../../clean/src'
import dot from '../../dot/src'
import deflate from '../../deflate/src'
import deepEntries from '../../deepentries/src'
import inflate from '../../inflate/src'
import deepFromEntries from '../../deepfromentries/src'
import deepKeys from '../../deepkeys/src'
import deepValues from '../../deepvalues/src'
import del from '../../del/src'
import { each, eachAsync, deepEach, deepEachAsync } from '../../each/src'
import empty from '../../empty/src'
import { equal, deepEqual } from '../../equal/src'
import { every, everyAsync, deepEvery, deepEveryAsync } from '../../every/src'
import { filter, filterAsync, deepFilter, deepFilterAsync } from '../../filter/src'
import { find, findAsync, deepFind, deepFindAsync } from '../../find/src'
import get from '../../get/src'
import has from '../../has/src'
import { includes, deepIncludes } from '../../includes/src'
import { keyOf, deepKeyOf } from '../../keyof/src'
import { map, mapAsync, deepMap, deepMapAsync } from '../../map/src'
import shallowMerge from '../../shallowmerge/src'
import merge from '../../merge/src'
import set from '../../set/src'
import { size, deepSize } from '../../size/src'
import { slice, deepSlice } from '../../slice/src'
import { some, someAsync, deepSome, deepSomeAsync } from '../../some/src'

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
} from '../../utils/src'

export type { Entry } from '../../deepentries/src'
export type { DeepCleanObject as CleanObject } from '../../clean/src'
export type { EachCallback, AsyncEachCallback } from '../../each/src'
export type { EveryCallback, AsyncEveryCallback } from '../../every/src'
export type { FilterCallback, AsyncFilterCallback } from '../../filter/src'
export type { FindCallback, AsyncFindCallback } from '../../find/src'
export type { MapCallback, AsyncMapCallback } from '../../map/src'
export type { SomeCallback, AsyncSomeCallback } from '../../some/src'
