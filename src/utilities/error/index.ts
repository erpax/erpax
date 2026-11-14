/**
 * Application error registry, coded errors, and HTTP problem-detail formatters.
 *
 * Internal files in this folder (`codedError`, `codedRegistry`, `registry`,
 * `validationRegistry`, `errorCodes`, `httpApiError`, `payloadApiError`,
 * `payloadErrorDisplay`, `createAppApiError`) inherit these standards.
 *
 * @rfc 7807 problem-details-for-http-apis
 * @rfc 9110 §15 status-codes
 * @rfc 9110 §10.3 error-responses
 * @standard OWASP-ASVS V7 error-handling-and-logging
 * @audit ISO-19011:2018 audit-trail error-tracing
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @see docs/STANDARDS.md §4.3
 */

export { CodedError } from '@/utilities/error/codedError'
export { codedFromRegistry } from '@/utilities/error/codedRegistry'
export { createAppApiError, createAppApiError as apiErr, type AppApiErrorPayload } from '@/utilities/error/createAppApiError'
export { throwRegistryValidation } from '@/utilities/error/validationRegistry'
export {
  formatPayloadSdkUserMessage,
  formatSupportReference,
  getPayloadErrorCode,
  messageFromFailedJsonResponse,
  parseSupportJson,
} from '@/utilities/error/payloadErrorDisplay'
export { isRegistryCodedApiError } from '@/utilities/error/payloadApiError'
export {
  ERR,
  GROUP_A,
  GROUP_B,
  composeErrorCode,
  parseErrorCode,
  type AppErrorCode,
  type GroupALetter,
  type GroupBLetter,
  type ParsedErrorCode,
} from '@/utilities/error/errorCodes'
export { apiErrorJson, apiErrorResponse, apiErrorResponseMerge } from '@/utilities/error/httpApiError'
export { ERROR_REGISTRY } from '@/utilities/error/registry'
