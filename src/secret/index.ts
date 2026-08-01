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

import { computeContentUuid, computeContentDigest, uuid, nameDigest, ERPAX_NAMESPACE_ROOT } from '@/integrity'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const HKDF_INFO = Buffer.from('erpax:secret-seal:v1', 'utf8')

/** Wire shape for a sealed secret — ciphertext only, never plaintext. */
export interface SealedBlob {
  /** v1 = uuid-only binding; v2 = additionally binds the full 256-bit content digest. */
  readonly v: 1 | 2
  readonly alg: 'AES-256-GCM'
  /** Content-identity uuid bound into AAD and HKDF salt (122-bit addressing key). */
  readonly contextUuid: string
  /**
   * v2 hardening: the FULL 256-bit content digest, bound as AAD. A forger must now
   * collide the 256-bit digest — quantum (BHT) floor 2^85.3 — instead of the bare
   * 122-bit uuid (2^40.67). Absent ⇒ a v1 blob, still decryptable.
   */
  readonly contextDigest?: string
  readonly iv: string
  readonly authTag: string
  readonly ciphertext: string
}

/** AAD binds the addressing uuid and — for v2 — the full 256-bit content digest. */
function aadFor(contextUuid: string, contextDigest?: string): Buffer {
  return Buffer.from(contextDigest ? `${contextUuid}:${contextDigest}` : contextUuid, 'utf8')
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

/**
 * The FULL 256-bit content digest that hardens `decryptIfUuid` beyond the 122-bit
 * uuid — the v2 identity commitment (quantum BHT collision floor 2^85.3 vs 2^40.67).
 */
export function identityDigestForContent(
  content: SecretIdentityContent,
  tenantId: string = PLATFORM_TENANT_ID,
): string {
  if (typeof content === 'string') return nameDigest(ERPAX_NAMESPACE_ROOT, content)
  return computeContentDigest(content, tenantId)
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
  options?: { sealKey?: Buffer; contextDigest?: string },
): SealedBlob {
  const key = deriveSealKey(contextUuid, resolveSealMasterKey(options))
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: 16 })
  // v2 hardening: bind the FULL 256-bit content digest into the AAD when supplied,
  // so forgery costs a 256-bit collision (quantum BHT 2^85.3) not the bare uuid's
  // 2^40.67. Absent ⇒ v1 (uuid-only AAD), still round-trips.
  const digest = options?.contextDigest
  cipher.setAAD(aadFor(contextUuid, digest))
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return {
    v: digest ? 2 : 1,
    alg: 'AES-256-GCM',
    contextUuid,
    ...(digest ? { contextDigest: digest } : {}),
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
  // v2 hardening: the blob commits the full 256-bit content digest; require it to
  // match the expected content's digest (fail-closed) — the 2^85.3 quantum floor.
  if (sealed.v === 2 || sealed.contextDigest !== undefined) {
    const expectedDigest = identityDigestForContent(expectedContent, tenantId)
    if (sealed.contextDigest !== expectedDigest) {
      throw new Error(
        'decryptIfUuid: sealed contextDigest does not match expected content digest (fail-closed)',
      )
    }
  }

  const key = deriveSealKey(sealed.contextUuid, resolveSealMasterKey(options))
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(sealed.iv, 'hex'),
    { authTagLength: 16 },
  )
  decipher.setAAD(aadFor(sealed.contextUuid, sealed.contextDigest))
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
  if (
    (parsed?.v !== 1 && parsed?.v !== 2) ||
    parsed?.alg !== 'AES-256-GCM' ||
    typeof parsed.contextUuid !== 'string'
  ) {
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
/**
 * Read a key from a dotenv file, without a parser and without mutating the environment.
 *
 * The boot error told the reader to "set PAYLOAD_SECRET in .env" while nothing here ever opened
 * `.env` — the instruction was false, and a false instruction in an error message costs more than a
 * missing one, because it sends the reader to do the right thing and watch it fail. A process env
 * var still WINS: the file is the documented fallback, never an override.
 *
 * @invariant a real environment variable always beats the file
 * @invariant an absent or unreadable file yields undefined, never a throw — this is a fallback
 */
export function dotenvValue(key: string, file = '.env'): string | undefined {
  let text: string
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    return undefined
  }
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1 || trimmed.slice(0, eq).trim() !== key) continue
    const raw = trimmed.slice(eq + 1).trim()
    const unquoted = /^(['"]).*\1$/.test(raw) ? raw.slice(1, -1) : raw
    return unquoted.length > 0 ? unquoted : undefined
  }
  return undefined
}

export function resolvePayloadSecret(): string | undefined {
  // PRECEDENCE, and the order is a security decision, not a convenience:
  //   1. an explicit environment variable — the operator said so, out of band
  //   2. the SEALED blob — encrypted at rest, identity-proved; it must beat any plaintext
  //   3. `.env` plaintext — the documented fallback, and the last resort
  // Putting the file above the seal (which I did first) makes a plaintext value shadow an
  // encrypted one. The existing seal test caught it immediately, which is what it is for.
  const plain = process.env.PAYLOAD_SECRET?.trim()
  if (plain) return plain

  const sealed = loadSealedBlobFromEnv()
  if (!sealed) return dotenvValue('PAYLOAD_SECRET')

  const identity = payloadSecretIdentityFromEnv()
  const presentedUuid = identityUuidForContent(identity, PLATFORM_TENANT_ID)
  return decryptIfUuid(sealed, presentedUuid, identity, { tenantId: PLATFORM_TENANT_ID })
}

/**
 * The CROSS — the governing 3·6·9 axis and the 1·2·4·8·7·5 helix, as one address.
 *
 * `[[cross]]` is the corpus's own two-ray structure: the axis governs, the helix flows, and the
 * mirror through the void carries each onto the other ([[horo]]). Folded to a content-uuid it is a
 * stable, recomputable ADDRESS — the same on every machine, in every checkout, forever.
 *
 * @invariant the cross uuid is derived, never typed — a wrong ray cannot be spelled here
 */
export const CROSS_AXIS = [3, 6, 9] as const
export const CROSS_HELIX = [1, 2, 4, 8, 7, 5] as const

export function crossUuid(): string {
  return identityUuidForContent(
    { purpose: 'payload-secret', axis: [...CROSS_AXIS], helix: [...CROSS_HELIX] },
    PLATFORM_TENANT_ID,
  )
}

/**
 * `PAYLOAD_SECRET`, computed from the cross.
 *
 * ```
 * PAYLOAD_SECRET = HKDF-SHA256( ERPAX_SEAL_KEY, salt = crossUuid(), info = 'erpax:payload-secret:v1' )
 * ```
 *
 * The cross supplies the **address**: deterministic, recomputable, identical everywhere. The seal
 * key supplies the **secrecy**, and it must, because —
 *
 * **A secret derived from the cross ALONE is not a secret.** The cross is in the repository. Anyone
 * who clones erpax could recompute it, and `PAYLOAD_SECRET` is what signs Payload's auth tokens and
 * cookies: a public value there is not a weak secret, it is *no authentication at all* — any session
 * for any user, forged offline. So the derivation is keyed, exactly as [[secret]] already prescribes
 * for platform secrets: *the uuid is the key ceremony, not the key*.
 *
 * It **fails closed**: with no `ERPAX_SEAL_KEY` it throws rather than falling back to deriving from
 * public content, because that fallback is the whole vulnerability wearing a convenience's clothes.
 *
 * @invariant same seal key + same cross ⇒ same secret, on every machine
 * @invariant different seal keys ⇒ different secrets, however identical the corpus
 * @invariant no seal key ⇒ throws; there is no keyless path to a value
 * @standard RFC 5869 HKDF — extract-and-expand key derivation
 * @standard RFC 9562 §5.8 — content-address as the derivation salt
 */
const PAYLOAD_SECRET_INFO = Buffer.from('erpax:payload-secret:v1', 'utf8')

export function payloadSecretFromCross(options?: { sealKey?: Buffer }): string {
  const master = resolveSealMasterKey(options)
  const salt = Buffer.from(crossUuid(), 'utf8')
  return Buffer.from(crypto.hkdfSync('sha256', master, salt, PAYLOAD_SECRET_INFO, 32)).toString('hex')
}
