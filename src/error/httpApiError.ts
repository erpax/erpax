/**
 * RFC 7807 problem-details JSON bodies for the application's error registry.
 *
 * @rfc 7807 problem-details-for-http-apis
 * @rfc 9110 §15 status-codes
 * @rfc 8259 json
 * @standard OWASP-ASVS V7 error-handling-and-logging
 * @see ./registry.ts
 * @see ./errorCodes.ts
 */

import type { AppErrorCode } from '@/error/errorCodes'
import { ERROR_REGISTRY } from '@/error/registry'

export function apiErrorJson(code: AppErrorCode): {
  body: { code: string; message: string; error: string }
  status: number
} {
  const { message, status } = ERROR_REGISTRY[code]
  // `error` mirrors wiki-style integrator responses; same text as `message`.
  return { body: { code, message, error: message }, status }
}

/** `Response` with `{ code, message }` and the registry HTTP status. */
export function apiErrorResponse(code: AppErrorCode): Response {
  const { body, status } = apiErrorJson(code)
  return Response.json(body, { status })
}

/** Same as {@link apiErrorResponse} but merges extra JSON fields (e.g. `{ received: false }`). */
export function apiErrorResponseMerge(
  code: AppErrorCode,
  extra: Record<string, unknown>,
): Response {
  const { body, status } = apiErrorJson(code)
  return Response.json({ ...body, ...extra }, { status })
}
