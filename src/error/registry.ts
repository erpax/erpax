/**
 * Application-wide error registry — maps `AppErrorCode` → `{status, message}`.
 *
 * The `status` field is a HTTP/1.1 status code per RFC 9110 §15. The
 * `message` is a stable, human-readable English string suitable for the
 * `title` field of an RFC 7807 problem-details JSON body.
 *
 * @rfc 7807 problem-details-for-http-apis
 * @rfc 9110 §15 status-codes
 * @standard OWASP-ASVS V7 error-handling-and-logging
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @see ./errorCodes.ts
 * @see ./httpApiError.ts
 */

import { ERR, type AppErrorCode } from '@/error/errorCodes'

type Entry = { status: number; message: string }

export const ERROR_REGISTRY: Record<AppErrorCode, Entry> = {
  [ERR.AUTH_CREDENTIALS_REQUIRED]: {
    status: 400,
    message: 'Username and password are required.',
  },
  [ERR.AUTH_RATE_LIMITED]: {
    status: 429,
    message: 'Too many sign-in attempts. Please try again later.',
  },
  [ERR.AUTH_LOGIN_FAILED]: {
    status: 400,
    message: 'Sign-in failed. Check your credentials and try again.',
  },
  [ERR.TENANT_DOCUMENT_FORBIDDEN]: {
    status: 403,
    message: 'You can only create or update content for tenants you are assigned to.',
  },
  [ERR.VAL_USERNAME_DUPLICATE]: {
    status: 400,
    message: 'This username is already in use for the selected tenant.',
  },
  [ERR.VAL_SLUG_DUPLICATE]: {
    status: 400,
    message: 'This slug is already in use for this tenant.',
  },
  [ERR.ROLE_DUPLICATE_ASSIGNMENT]: {
    status: 409,
    message: 'This user already has that role assignment.',
  },
  [ERR.ROLE_SCOPE_COLLECTION_INVALID]: {
    status: 400,
    message: 'A valid collection must be selected for this role binding.',
  },
  [ERR.ROLE_DOCUMENT_REQUIRED]: {
    status: 400,
    message: 'A document must be selected for this role binding.',
  },
  [ERR.ROLE_BINDING_INVALID]: {
    status: 400,
    message: 'The role binding is not valid.',
  },
  [ERR.EMAIL_SEND_CONFIG]: {
    status: 400,
    message: 'Email could not be sent. Try again later or contact support.',
  },
  [ERR.PAY_PAYMENT_INTENT_REQUIRED]: {
    status: 400,
    message: 'Payment information is missing.',
  },
  [ERR.PAY_TRANSACTION_NOT_FOUND]: {
    status: 404,
    message: 'No matching payment record was found.',
  },
  [ERR.PAY_STRIPE_SECRET_MISSING]: {
    status: 503,
    message: 'Payment service is not configured for this site.',
  },
  [ERR.PAY_NOT_COMPLETED]: {
    status: 400,
    message: 'Payment was not completed.',
  },
  [ERR.PAY_CART_METADATA_MISSING]: {
    status: 400,
    message: 'Checkout data was incomplete. Start checkout again.',
  },
  [ERR.PAY_CART_SNAPSHOT_INVALID]: {
    status: 400,
    message: 'Checkout data was invalid. Start checkout again.',
  },
  [ERR.PAY_INIT_STRIPE_SECRET_MISSING]: {
    status: 503,
    message: 'Payment service is not configured for this site.',
  },
  [ERR.PAY_INIT_NOT_CONFIGURED]: {
    status: 503,
    message: 'Payment service is not configured.',
  },
  [ERR.PAY_CONFIRM_FAILED]: {
    status: 500,
    message: 'We could not confirm your payment. Please contact support with this code.',
  },
  [ERR.PAY_INSUFFICIENT_STOCK]: {
    status: 400,
    message: 'Requested quantity is not available.',
  },
  [ERR.PREVIEW_SECRET_INVALID]: {
    status: 403,
    message: 'Preview is not available.',
  },
  [ERR.PREVIEW_PATH_MISSING]: {
    status: 404,
    message: 'Preview link is incomplete.',
  },
  [ERR.PREVIEW_PATH_INVALID]: {
    status: 500,
    message: 'Preview request is invalid.',
  },
  [ERR.PREVIEW_AUTH_FAILED]: {
    status: 403,
    message: 'Preview is not available.',
  },
  [ERR.SEED_FORBIDDEN]: {
    status: 403,
    message: 'You are not allowed to run this action.',
  },
  [ERR.SEED_FAILED]: {
    status: 500,
    message: 'Seeding failed. Try again or check server logs.',
  },
  [ERR.WEBHOOK_STRIPE_BAD_REQUEST]: {
    status: 400,
    message: 'Webhook request was rejected.',
  },
  [ERR.INTERNAL_REMOTE_FETCH]: {
    status: 500,
    message: 'Failed to load remote file.',
  },
  [ERR.INTERNAL_SEED_REMOTE_FETCH]: {
    status: 500,
    message: 'Failed to load remote file during seed.',
  },
  [ERR.INTERNAL_RICHTEXT_VALUE]: {
    status: 500,
    message: 'Rich text value was invalid.',
  },
}
