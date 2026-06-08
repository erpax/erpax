/**
 * secret — seal payload secrets at rest; decrypt iff uuid proves identity.
 *
 * Payload CMS secrets (`PAYLOAD_SECRET`, database URLs, API keys) must not live
 * as plaintext in the repo. `sealSecret` encrypts under AES-256-GCM with the
 * context uuid bound as AAD (tamper-evident diamond). `decryptIfUuid` unwraps
 * ONLY when `presentedUuid` matches the content-identity of `expectedContent`
 * — no uuid match, no decrypt (fail-closed).
 *
 * Bootstrap key material comes from `ERPAX_SEAL_KEY` (never from source).
 * Per-context DEK = HKDF-SHA256(ERPAX_SEAL_KEY, salt=contextUuid).
 *
 * @standard NIST SP 800-38D AES-GCM
 * @standard RFC 5869 HKDF
 * @see ./SKILL.md · ../integrity/content-uuid
 */
import crypto from 'node:crypto'
import fs from 'node:fs'

import { computeContentUuid, uuid } from '@/integrity'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const HKDF_INFO = Buffer.from('erpax:secret-seal:v1', 'utf8')

/** Wire shape for a sealed secret — ciphertext only, never plaintext. */
export interface SealedBlob {
  readonly v: 1
  readonly alg: 'AES-256-GCM'
  /** Content-identity uuid bound into AAD and HKDF salt. */
  readonly contextUuid: string
  readonly iv: string
  readonly authTag: string
  readonly ciphertext: string
}

export type SecretIdentityContent = Record<string, unknown> | string

/** Platform tenant for global env-secret identity descriptors. */
export const PLATFORM_TENANT_ID = 'platform'

/** Canonical identity for sealing `PAYLOAD_SECRET` at rest. */
export const PAYLOAD_SECRET_IDENTITY = {
  purpose: 'payload-secret',
  scope: 'platform',
} as const satisfies Record<string, unknown>

/** Compute the content-uuid that proves identity for `decryptIfUuid`. */
export function identityUuidForContent(
  content: SecretIdentityContent,
  tenantId: string = PLATFORM_TENANT_ID,
): string {
  if (typeof content === 'string') return uuid(content)
  return computeContentUuid(content, tenantId)
}

/** Resolve bootstrap seal key from options or `ERPAX_SEAL_KEY` env (hex or base64). */
export function resolveSealMasterKey(options?: { sealKey?: Buffer }): Buffer {
  if (options?.sealKey) return options.sealKey
  const raw = process.env.ERPAX_SEAL_KEY?.trim()
  if (!raw) {
    throw new Error(
      'ERPAX_SEAL_KEY is required to seal/unseal secrets at rest (generate: openssl rand -hex 32).',
    )
  }
  if (/^[0-9a-f]{64}$/i.test(raw)) return Buffer.from(raw, 'hex')
  return Buffer.from(raw, 'base64')
}

function deriveSealKey(contextUuid: string, masterKey: Buffer): Buffer {
  return Buffer.from(
    crypto.hkdfSync('sha256', masterKey, Buffer.from(contextUuid, 'utf8'), HKDF_INFO, 32),
  )
}

/** Encrypt `plaintext` at rest; bind to `contextUuid` in AAD + HKDF salt. */
export function sealSecret(
  plaintext: string,
  contextUuid: string,
  options?: { sealKey?: Buffer },
): SealedBlob {
  const key = deriveSealKey(contextUuid, resolveSealMasterKey(options))
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: 16 })
  cipher.setAAD(Buffer.from(contextUuid, 'utf8'))
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return {
    v: 1,
    alg: 'AES-256-GCM',
    contextUuid,
    iv: iv.toString('hex'),
    authTag: cipher.getAuthTag().toString('hex'),
    ciphertext: ciphertext.toString('hex'),
  }
}

/**
 * Decrypt `sealed` ONLY when `presentedUuid` matches the identity of
 * `expectedContent`. Wrong uuid, wrong AAD, or tampered ciphertext throws.
 */
export function decryptIfUuid(
  sealed: SealedBlob,
  presentedUuid: string,
  expectedContent: SecretIdentityContent,
  options?: { tenantId?: string; sealKey?: Buffer },
): string {
  const tenantId = options?.tenantId ?? PLATFORM_TENANT_ID
  const expectedUuid = identityUuidForContent(expectedContent, tenantId)

  if (presentedUuid !== expectedUuid) {
    throw new Error(
      'decryptIfUuid: presented uuid does not match expected content identity (fail-closed)',
    )
  }
  if (presentedUuid !== sealed.contextUuid) {
    throw new Error(
      'decryptIfUuid: sealed contextUuid does not match presented identity uuid (fail-closed)',
    )
  }

  const key = deriveSealKey(sealed.contextUuid, resolveSealMasterKey(options))
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(sealed.iv, 'hex'),
    { authTagLength: 16 },
  )
  decipher.setAAD(Buffer.from(sealed.contextUuid, 'utf8'))
  decipher.setAuthTag(Buffer.from(sealed.authTag, 'hex'))
  try {
    return Buffer.concat([
      decipher.update(Buffer.from(sealed.ciphertext, 'hex')),
      decipher.final(),
    ]).toString('utf8')
  } catch (err) {
    throw new Error(
      `decryptIfUuid: AES-GCM authentication failed — tampered ciphertext or wrong seal key (${err instanceof Error ? err.message : String(err)})`,
    )
  }
}

export function parseSealedBlob(raw: string): SealedBlob {
  const parsed = JSON.parse(raw) as SealedBlob
  if (parsed?.v !== 1 || parsed?.alg !== 'AES-256-GCM' || typeof parsed.contextUuid !== 'string') {
    throw new Error('parseSealedBlob: invalid SealedBlob wire shape')
  }
  return parsed
}

function loadSealedBlobFromEnv(): SealedBlob | undefined {
  const sealedRaw = process.env.PAYLOAD_SECRET_SEALED?.trim()
  if (!sealedRaw) return undefined
  if (sealedRaw.startsWith('{')) return parseSealedBlob(sealedRaw)
  return parseSealedBlob(fs.readFileSync(sealedRaw, 'utf8'))
}

function payloadSecretIdentityFromEnv(): SecretIdentityContent {
  const custom = process.env.PAYLOAD_SECRET_IDENTITY_JSON?.trim()
  if (!custom) return PAYLOAD_SECRET_IDENTITY
  return JSON.parse(custom) as Record<string, unknown>
}

/**
 * Resolve `PAYLOAD_SECRET` for boot: plain env first, else decrypt sealed blob
 * when uuid identity of the descriptor matches (fail-closed otherwise).
 */
export function resolvePayloadSecret(): string | undefined {
  const plain = process.env.PAYLOAD_SECRET?.trim()
  if (plain) return plain

  const sealed = loadSealedBlobFromEnv()
  if (!sealed) return undefined

  const identity = payloadSecretIdentityFromEnv()
  const presentedUuid = identityUuidForContent(identity, PLATFORM_TENANT_ID)
  return decryptIfUuid(sealed, presentedUuid, identity, { tenantId: PLATFORM_TENANT_ID })
}
