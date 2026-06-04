import type { CollectionBeforeChangeHook, CollectionAfterReadHook } from 'payload'
import { encryptFields, decryptFields } from '@/standards/nist-sp-800-38'
import type { Invoice } from '@/payload-types'

/**
 * Encryption hooks for Invoices — encrypt Stripe invoice / payment-intent IDs.
 *
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @security ISO-27002 §8.24 use-of-cryptography
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @see docs/STANDARDS.md §4.4
 */

const ENCRYPTED_FIELDS = [
  'stripeInvoiceId',
  'stripePaymentIntentId',
]

/**
 * Before create/update: Encrypt Stripe identifiers
 */
export const encryptInvoiceData: CollectionBeforeChangeHook<Invoice> = async ({
  data,
}) => {
  return encryptFields(data as Record<string, unknown>, ENCRYPTED_FIELDS)
}

/**
 * After read: Decrypt Stripe identifiers
 */
export const decryptInvoiceData: CollectionAfterReadHook<Invoice> = async ({
  doc,
}) => {
  return decryptFields(doc as unknown as Record<string, unknown>, ENCRYPTED_FIELDS)
}
