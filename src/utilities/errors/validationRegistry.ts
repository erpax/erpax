import { ValidationError } from 'payload'

import type { AppErrorCode } from './errorCodes'
import { ERROR_REGISTRY } from './registry'

export function buildRegistryFieldEntry(path: string, code: AppErrorCode) {
  return { code, message: ERROR_REGISTRY[code].message, path }
}

export function throwRegistryValidation(path: string, code: AppErrorCode): never {
  throw new ValidationError({
    errors: [buildRegistryFieldEntry(path, code)],
  })
}
