export interface OObject {
    [key: string]: any;
}
export interface CleanOptions {
    follow?: boolean;
}
export interface EachOptions {
    follow?: boolean;
}
export interface EachCallback {
    (key: string, value: any, index: number): void;
}
export interface EveryOptions {
    follow?: boolean;
}
export interface EveryCallback {
    (key: string, value: any, index: number): boolean;
}
export interface FilterOptions {
    follow?: boolean;
}
export interface FilterCallback {
    (key: string, value: any, index: number): boolean;
}
export interface FindOptions {
    follow?: boolean;
}
export interface FindCallback {
    (key: string, value: any, index: number): boolean;
}
export interface FlipOptions {
    follow?: boolean;
    useToString?: boolean;
}
export interface IncludesOptions {
    follow?: boolean;
}
export interface KeyOfOptions {
    follow?: boolean;
}
export interface KeysOptions {
    follow?: boolean;
}
export interface MapOptions {
    follow?: boolean;
}
export interface MapCallback {
    (key: string, value: any, index: number): any;
}
export interface SliceOptions {
    follow?: boolean;
}
export interface SomeOptions {
    follow?: boolean;
}
export interface SomeCallback {
    (key: string, value: any, index: number): boolean;
}
export interface SortOptions {
    follow?: boolean;
}
export interface SortElement {
    key: string;
    value: any;
}
export interface SortCallback {
    (firstEl: SortElement, secondEl: SortElement): number;
}
export interface ValuesOptions {
    follow?: boolean;
}
