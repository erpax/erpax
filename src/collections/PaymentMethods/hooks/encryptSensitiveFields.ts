import type { CollectionBeforeChangeHook, CollectionAfterReadHook } from 'payload'
import { encryptFields, decryptFields } from '@/standards/nist-sp-800-38'
import type { PaymentMethod } from '@/payload-types'

/**
 * Encryption hooks for PaymentMethods — encrypt-at-rest for tokenized payment refs.
 *
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @security ISO-27002 §8.24 use-of-cryptography
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @see docs/STANDARDS.md §4.4
 */

const ENCRYPTED_FIELDS = [
  'stripePaymentMethodId',
  'cardLast4',
  'bankLast4',
]

/**
 * Before create/update: Encrypt sensitive fields
 */
export const encryptPaymentMethodData: CollectionBeforeChangeHook<PaymentMethod> = async ({
  data,
}) => {
  return encryptFields(data as Record<string, unknown>, ENCRYPTED_FIELDS)
}

/**
 * After read: Decrypt sensitive fields
 * Applied to all read operations (find, findByID)
 */
export const decryptPaymentMethodData: CollectionAfterReadHook<PaymentMethod> = async ({
  doc,
}) => {
  return decryptFields(doc as unknown as Record<string, unknown>, ENCRYPTED_FIELDS)
}
