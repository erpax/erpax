import { APIError } from 'payload'

/** App `APIError` instances that carry a registry `code` in `data`. */
export function isRegistryCodedApiError(err: unknown): err is APIError {
  return (
    err instanceof APIError &&
    err.data != null &&
    typeof err.data === 'object' &&
    'code' in err.data
  )
}
