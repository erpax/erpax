import { APIError } from 'payload'

import type { AppErrorCode } from './errorCodes'
import { apiErrorJson } from './httpApiError'

export type AppApiErrorPayload = { code: string } & Record<string, unknown>

/**
 * Payload REST errors include `errors[].data.code` when `data` is set (mask `ABCDE`, see errorCodes).
 * Import **`apiErr`** from `@/utilities/errors` as the standard short alias.
 */
export function createAppApiError(
  code: AppErrorCode,
  options?: {
    extra?: Record<string, unknown>
    message?: string
    status?: number
  },
): APIError<AppApiErrorPayload> {
  const { body, status: registryStatus } = apiErrorJson(code)
  const message = options?.message ?? body.message
  const status = options?.status ?? registryStatus
  const data: AppApiErrorPayload = {
    code,
    ...(options?.extra ?? {}),
  }
  return new APIError(message, status, data, true)
}
