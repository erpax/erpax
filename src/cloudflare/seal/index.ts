/**
 * Cloudflare config sealing — content-uuid identity, decrypt only on proof.
 *
 * API tokens, account bindings, and Workers secrets are sealed at rest like
 * Payload field secrets: canonical content → content-uuid → AES-GCM envelope
 * keyed via PAYLOAD_SECRET (NIST SP-800-108 purpose `cloudflare-config`).
 * Wrong or missing uuid ⇒ fail-closed (null, never partial plaintext).
 *
 * @standard NIST SP-800-108 key-derivation-function
 * @standard NIST SP-800-38D AES-GCM
 * @see ../integrity/envelope.ts · ../nist/sp/800/108 · ./SKILL.md
 */
import {
  jcsCanonicalize,
  uuid,
  type ContentUuid,
  type CipherEnvelope,
  encryptEnvelope,
  decryptEnvelope,
} from '@/integrity'
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from '@/nist/sp/800/108'

/** Platform KEK kid for Cloudflare config envelopes (not per-tenant). */
export const CLOUDFLARE_SEAL_KID = 'erpax/cloudflare-config/kek'

/**
 * Wrangler / Workers env var names that carry secrets — seal at rest;
 * never commit real values (fixtures use `cf-test-*` prefixes only).
 */
export const WRANGLER_SECRET_ENV_KEYS = [
  'CLOUDFLARE_API_TOKEN',
  'CF_API_TOKEN',
  'CLOUDFLARE_API_KEY',
] as const

/** Non-secret wrangler bindings referenced when building a seal context. */
export const WRANGLER_BINDING_ENV_KEYS = [
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_ENV',
  'D1_DATABASE_ID',
  'R2_BUCKET_NAME',
] as const

/** Plain Cloudflare deployment credentials (test fixtures only in repo). */
export interface CloudflareConfigPlain {
  readonly accountId?: string
  readonly apiToken?: string
  readonly d1DatabaseId?: string
  readonly r2BucketName?: string
  readonly cloudflareEnv?: string
  readonly bindings?: Readonly<Record<string, string>>
}

/** Sealed at-rest form — no raw tokens in the blob outside the envelope. */
export interface SealedCloudflareConfig<T extends CloudflareConfigPlain = CloudflareConfigPlain> {
  readonly contentUuid: ContentUuid<T>
  readonly contextUuid: string
  readonly envelope: CipherEnvelope<T>
  readonly sealedAt: string
}

/** Canonical fold — sorted binding keys, stripped undefined. */
export function canonicalizeCloudflareConfig(
  config: CloudflareConfigPlain,
): CloudflareConfigPlain {
  const bindings = config.bindings
  const sortedBindings =
    bindings && Object.keys(bindings).length > 0
      ? Object.fromEntries(
          Object.keys(bindings)
            .sort()
            .map((k) => [k, bindings[k]!]),
        )
      : undefined
  return {
    ...(config.accountId !== undefined ? { accountId: config.accountId } : {}),
    ...(config.apiToken !== undefined ? { apiToken: config.apiToken } : {}),
    ...(config.d1DatabaseId !== undefined ? { d1DatabaseId: config.d1DatabaseId } : {}),
    ...(config.r2BucketName !== undefined ? { r2BucketName: config.r2BucketName } : {}),
    ...(config.cloudflareEnv !== undefined ? { cloudflareEnv: config.cloudflareEnv } : {}),
    ...(sortedBindings !== undefined ? { bindings: sortedBindings } : {}),
  }
}

/** Content-uuid of canonical config bound to a deployment context. */
export function cloudflareConfigContentUuid(
  config: CloudflareConfigPlain,
  contextUuid: string,
): ContentUuid<CloudflareConfigPlain> {
  const canonical = canonicalizeCloudflareConfig(config)
  return uuid(
    jcsCanonicalize({ contextUuid, config: canonical }),
  ) as ContentUuid<CloudflareConfigPlain>
}

/** Map wrangler/process env vars into a plain config object (pattern only). */
export function wranglerEnvToCloudflareConfig(
  env: Readonly<Record<string, string | undefined>>,
): CloudflareConfigPlain {
  const bindings: Record<string, string> = {}
  for (const k of WRANGLER_BINDING_ENV_KEYS) {
    const v = env[k]
    if (v) bindings[k] = v
  }
  return canonicalizeCloudflareConfig({
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: env.CLOUDFLARE_API_TOKEN ?? env.CF_API_TOKEN,
    d1DatabaseId: env.D1_DATABASE_ID,
    r2BucketName: env.R2_BUCKET_NAME,
    cloudflareEnv: env.CLOUDFLARE_ENV,
    bindings: Object.keys(bindings).length > 0 ? bindings : undefined,
  })
}

async function importPlatformKek(): Promise<CryptoKey> {
  const derived = deriveSecretFromPayloadSecret(internalSecretPurpose.cloudflareConfig)
  if (!derived) {
    throw new Error(
      'Cloudflare config seal unavailable: PAYLOAD_SECRET must be set ' +
        '(single-secret custodianship — see src/nist/sp/800/108/kdf.ts).',
    )
  }
  const raw = Buffer.from(derived, 'hex').subarray(0, 32)
  return globalThis.crypto.subtle.importKey(
    'raw',
    raw,
    { name: 'HKDF' },
    false,
    ['deriveKey'],
  )
}

/**
 * Seal Cloudflare credentials at rest. `contextUuid` scopes the deployment
 * (e.g. content-uuid of `wrangler.jsonc` + env name) so the same token
 * under a different context yields a different content-uuid.
 */
export async function sealCloudflareConfig(
  config: CloudflareConfigPlain,
  contextUuid: string,
): Promise<SealedCloudflareConfig> {
  if (!contextUuid) {
    throw new Error('sealCloudflareConfig: contextUuid is required (fail-closed)')
  }
  const canonical = canonicalizeCloudflareConfig(config)
  const contentUuid = cloudflareConfigContentUuid(canonical, contextUuid)
  const kek = await importPlatformKek()
  const envelope = await encryptEnvelope({
    plaintext: canonical,
    uuid: contentUuid,
    kek,
    kid: CLOUDFLARE_SEAL_KID,
  })
  return {
    contentUuid,
    contextUuid,
    envelope,
    sealedAt: new Date().toISOString(),
  }
}

/**
 * Decrypt only when `presentedUuid` proves identity. Returns `null` on any
 * mismatch (wrong uuid, tampered envelope, or `expectedContent` disharmony).
 */
export async function decryptCloudflareIfUuid<T extends CloudflareConfigPlain = CloudflareConfigPlain>(
  sealed: SealedCloudflareConfig<T>,
  presentedUuid: string,
  expectedContent?: T,
): Promise<T | null> {
  if (!presentedUuid || presentedUuid !== sealed.contentUuid) return null
  if (sealed.envelope.uuid !== sealed.contentUuid) return null
  if (expectedContent !== undefined) {
    const expectedUuid = cloudflareConfigContentUuid(
      canonicalizeCloudflareConfig(expectedContent),
      sealed.contextUuid,
    )
    if (expectedUuid !== sealed.contentUuid) return null
  }
  try {
    const kek = await importPlatformKek()
    const decrypted = await decryptEnvelope({ envelope: sealed.envelope, kek })
    const recomputed = cloudflareConfigContentUuid(decrypted, sealed.contextUuid)
    if (recomputed !== sealed.contentUuid) return null
    return decrypted as T
  } catch {
    return null
  }
}
