export const isAsync = (func: any): boolean => {
  return func.constructor.name === 'AsyncFunction' ||
    String(func).includes('return __awaiter')
}
