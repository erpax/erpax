/**
 * Payload REST / SDK errors often expose a stable app code on `errors[0].data.code`
 * (see `apiErr` / `createAppApiError`). Use for support references without leaking internals.
 */

export function parseSupportJson(json: unknown): { code?: string; message?: string } {
  if (!json || typeof json !== 'object') {
    return {}
  }
  const o = json as Record<string, unknown>
  const message =
    typeof o.message === 'string'
      ? o.message
      : typeof o.error === 'string'
        ? o.error
        : undefined
  return {
    code: typeof o.code === 'string' ? o.code : undefined,
    message,
  }
}

export function getPayloadErrorCode(err: unknown): string | undefined {
  if (!err || typeof err !== 'object' || !('errors' in err)) {
    return undefined
  }
  const { errors } = err as { errors?: unknown }
  if (!Array.isArray(errors) || errors.length === 0) {
    return undefined
  }
  const first = errors[0]
  if (!first || typeof first !== 'object' || !('data' in first)) {
    return undefined
  }
  const { data } = first as { data?: unknown }
  if (!data || typeof data !== 'object' || data === null || !('code' in data)) {
    return undefined
  }
  const c = (data as { code?: unknown }).code
  return typeof c === 'string' ? c : undefined
}

export function formatSupportReference(message: string, code?: string): string {
  const trimmed = message.trim()
  if (!trimmed) {
    return code ? `(Code: ${code})` : ''
  }
  return code ? `${trimmed} (Code: ${code})` : trimmed
}

export function formatPayloadSdkUserMessage(
  err: { errors?: { message?: string }[]; message?: string },
  fallback: string,
): string {
  const raw = err.errors?.[0]?.message || err.message
  const base = raw?.trim() ? raw : fallback
  return formatSupportReference(base, getPayloadErrorCode(err))
}

export async function messageFromFailedJsonResponse(res: Response, fallback: string): Promise<string> {
  try {
    const json: unknown = await res.json()
    const { code, message } = parseSupportJson(json)
    const msg = message?.trim()
    if (msg) {
      return formatSupportReference(msg, code)
    }
    if (code) {
      return formatSupportReference(fallback, code)
    }
    return fallback
  } catch {
    return fallback
  }
}
