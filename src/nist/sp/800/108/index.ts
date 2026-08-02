/**
 * Public surface of the NIST SP 800-108 standards module.
 *
 * @standard NIST SP-800-108 key-derivation-function
 */
export {
  deriveSecretFrom,
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
  type InternalSecretPurpose,
  horoPosition,
  horoLabel,
  advanceKey,
  rotateKey,
  foldDimensions,
  type HoroDirection,
  type RotateMode,
  type RotateSpec,
} from './kdf'
