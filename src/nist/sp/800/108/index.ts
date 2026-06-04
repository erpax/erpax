/**
 * Public surface of the NIST SP 800-108 standards module.
 *
 * @standard NIST SP-800-108 key-derivation-function
 */
export {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
  type InternalSecretPurpose,
} from '@/nist/sp/800/108/kdf'
