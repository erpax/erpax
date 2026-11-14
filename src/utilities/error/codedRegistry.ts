import type { AppErrorCode } from '@/utilities/error/errorCodes'
import { CodedError } from '@/utilities/error/codedError'
import { ERROR_REGISTRY } from '@/utilities/error/registry'

/** Non-HTTP failure with registry message + optional `cause` for logs only. */
export function codedFromRegistry(code: AppErrorCode, cause?: Error): CodedError {
  return new CodedError(code, ERROR_REGISTRY[code].message, cause ? { cause } : undefined)
}
