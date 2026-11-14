/**
 * Non-HTTP errors with a mask code (`ABCDE`) for logs and optional wrapping
 * at API boundaries.
 *
 * Sister types: `httpApiError.ts` produces RFC 7807-shaped HTTP responses;
 * this class produces typed in-process errors. Both share the registry in
 * `errorCodes.ts` / `registry.ts`.
 *
 * @rfc 7807 problem-details-for-http-apis sister-type
 * @standard OWASP-ASVS V7 error-handling-and-logging
 * @audit ISO-19011:2018 audit-trail
 * @see ./registry.ts
 * @see ./httpApiError.ts
 */
export class CodedError extends Error {
  readonly code: string

  constructor(code: string, message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'CodedError'
    this.code = code
  }
}
