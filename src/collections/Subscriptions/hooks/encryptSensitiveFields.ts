import { BeforeChangeHook, AfterReadHook } from 'payload'
import { encryptFields, decryptFields } from '@/standards/nist-sp-800-38'
import type { Subscriptions } from '@/payload-types'

/**
 * Encryption hooks for Subscriptions — encrypt Stripe customer/subscription IDs.
 *
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @security ISO-27002 §8.24 use-of-cryptography
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @see docs/STANDARDS.md §4.4
 */

const ENCRYPTED_FIELDS = [
  'stripeSubscriptionId',
  'stripeCustomerId',
]

/**
 * Before create/update: Encrypt Stripe identifiers
 */
export const encryptSubscriptionData: BeforeChangeHook<Subscriptions> = async ({
  data,
}) => {
  return encryptFields(data, ENCRYPTED_FIELDS)
}

/**
 * After read: Decrypt Stripe identifiers
 */
export const decryptSubscriptionData: AfterReadHook<Subscriptions> = async ({
  doc,
}) => {
  return decryptFields(doc, ENCRYPTED_FIELDS)
}
