import { ValidationError } from 'payload'

import type { AppErrorCode } from '@/utilities/error/errorCodes'
import { ERROR_REGISTRY } from '@/utilities/error/registry'

export function buildRegistryFieldEntry(path: string, code: AppErrorCode) {
  return { code, message: ERROR_REGISTRY[code].message, path }
}

export function throwRegistryValidation(path: string, code: AppErrorCode): never {
  throw new ValidationError({
    errors: [buildRegistryFieldEntry(path, code)],
  })
}
