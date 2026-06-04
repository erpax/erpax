import type { AppErrorCode } from '@/error/errorCodes'
import { CodedError } from '@/error/codedError'
import { ERROR_REGISTRY } from '@/error/registry'

/** Non-HTTP failure with registry message + optional `cause` for logs only. */
export function codedFromRegistry(code: AppErrorCode, cause?: Error): CodedError {
  return new CodedError(code, ERROR_REGISTRY[code].message, cause ? { cause } : undefined)
}
