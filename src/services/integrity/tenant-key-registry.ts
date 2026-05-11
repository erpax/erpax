/**
 * Tenant key registry — resolves `kid` → CryptoKey.
 *
 * Slice HHHHHHHHH-cut2 (2026-05-11). The missing piece between the
 * pure-crypto services (`signatures.ts`, `envelope.ts`) and the
 * Mediator: callers ask the registry for a key by its `kid` (key id);
 * production wires the registry to Cloudflare KV; tests inject keys
 * directly.
 *
 * Why a registry rather than passing keys around:
 *
 *   - The Mediator already owns the tenant boundary (Slice SSSSSSSS).
 *     A key lookup belongs there so RBAC + audit + rate-limit hold
 *     uniformly with the rest of the binding surface.
 *   - Per-tenant key rotation is a calendar event (NIST SP 800-57
 *     §5.6 — KEKs every 12 months, signing keys every 24). The `kid`
 *     encodes the rotation date (`<tenantId>/<purpose>/<yyyy-mm-dd>`);
 *     the resolver picks the active key by date or by explicit kid.
 *   - Tests get a deterministic registry; production gets a KV-backed
 *     one. The API is identical so test ↔ production parity holds.
 *
 * Storage layout (when KV-backed):
 *
 *   key:    `tenant-keys/${tenantId}/${purpose}/${rotationDate}`
 *   value:  base64url-encoded raw key material
 *
 * The value is encrypted at rest by the platform KEK (chicken-and-
 * egg solved by Cloudflare's at-rest KV encryption + a platform-level
 * unwrap key held in Workers Secrets). This module is unaware of that
 * layer — it asks KV for bytes and gets bytes; the wrap/unwrap is
 * KV's job.
 *
 * @standard NIST SP 800-57 §5.6 key-management lifecycles
 * @standard ISO/IEC 27001 Annex A.10.1.2 key-management policy
 * @standard PCI DSS 4.0 §3.6 key-management procedures
 * @audit ISO 19011:2018 §6.4.6 (every key fetch produces an audit row)
 * @feature integrity_keys
 * @see ./signatures.ts (signContentUuid)
 * @see ./envelope.ts  (encryptEnvelope / decryptEnvelope)
 * @see ../cloudflare/index.ts (Mediator integration)
 */

/** Purpose namespace for a key. */
export type KeyPurpose = 'signing' | 'kek'

/**
 * The resolver interface — what the Mediator depends on. Tests supply
 * an `InMemoryKeyResolver`; production wires a `KvBackedKeyResolver`.
 */
export interface TenantKeyResolver {
  /**
   * Get a private signing key for a `kid`. Throws when the kid is
   * unknown — the caller should treat that as a configuration error.
   */
  getSigningPrivateKey(tenantId: string, kid: string): Promise<CryptoKey>

  /** Get the matching public verification key. */
  getSigningPublicKey(tenantId: string, kid: string): Promise<CryptoKey>

  /** Get an HKDF-usable KEK for envelope encryption. */
  getKek(tenantId: string, kid: string): Promise<CryptoKey>

  /**
   * Return the active key id for a (tenant, purpose). Used when the
   * caller doesn't yet know which rotation date to use — pick the
   * one the registry says is current.
   */
  resolveActiveKid(tenantId: string, purpose: KeyPurpose): Promise<string>
}

// ─── In-memory implementation (default; tests + dev) ─────────────────

interface InMemoryEntry {
  readonly kid: string
  readonly tenantId: string
  readonly purpose: KeyPurpose
  readonly issuedAt: string
  readonly signingPrivateKey?: CryptoKey
  readonly signingPublicKey?: CryptoKey
  readonly kek?: CryptoKey
}

/**
 * In-memory resolver — write-once-per-kid via `register()`. Lives for
 * the lifetime of the process; not suitable for production (keys
 * vanish on restart). Production deployments use `KvBackedKeyResolver`.
 *
 * SAFE-INMEM: this module is a CACHE for test/dev. The persistent
 * source of truth is KV in production. The "MCP mutations need a
 * collection" invariant (Slice RRRRRRRR) does not apply because the
 * registry is opaque to MCP and tenant-scoped already.
 */
export class InMemoryKeyResolver implements TenantKeyResolver {
  private readonly entries = new Map<string, InMemoryEntry>()
  /** `${tenantId}/${purpose}` → kid (the current-active for the pair). */
  private readonly active = new Map<string, string>()

  register(entry: InMemoryEntry): void {
    this.entries.set(entry.kid, entry)
    // First write wins as 'active' unless explicitly promoted.
    const pair = `${entry.tenantId}/${entry.purpose}`
    if (!this.active.has(pair)) this.active.set(pair, entry.kid)
  }

  /** Promote a registered kid to the active slot for its (tenant, purpose). */
  promote(kid: string): void {
    const e = this.entries.get(kid)
    if (!e) throw new Error(`InMemoryKeyResolver: unknown kid ${kid}`)
    this.active.set(`${e.tenantId}/${e.purpose}`, kid)
  }

  async getSigningPrivateKey(tenantId: string, kid: string): Promise<CryptoKey> {
    const e = this.requireEntry(tenantId, kid, 'signing')
    if (!e.signingPrivateKey) {
      throw new Error(`InMemoryKeyResolver: no signing private key for kid=${kid}`)
    }
    return e.signingPrivateKey
  }
  async getSigningPublicKey(tenantId: string, kid: string): Promise<CryptoKey> {
    const e = this.requireEntry(tenantId, kid, 'signing')
    if (!e.signingPublicKey) {
      throw new Error(`InMemoryKeyResolver: no signing public key for kid=${kid}`)
    }
    return e.signingPublicKey
  }
  async getKek(tenantId: string, kid: string): Promise<CryptoKey> {
    const e = this.requireEntry(tenantId, kid, 'kek')
    if (!e.kek) {
      throw new Error(`InMemoryKeyResolver: no KEK for kid=${kid}`)
    }
    return e.kek
  }
  async resolveActiveKid(tenantId: string, purpose: KeyPurpose): Promise<string> {
    const pair = `${tenantId}/${purpose}`
    const kid = this.active.get(pair)
    if (!kid) {
      throw new Error(`InMemoryKeyResolver: no active ${purpose} key for tenant ${tenantId}`)
    }
    return kid
  }

  private requireEntry(tenantId: string, kid: string, purpose: KeyPurpose): InMemoryEntry {
    const e = this.entries.get(kid)
    if (!e) throw new Error(`InMemoryKeyResolver: unknown kid ${kid}`)
    if (e.tenantId !== tenantId) {
      throw new Error(`InMemoryKeyResolver: kid ${kid} belongs to tenant ${e.tenantId}, not ${tenantId}`)
    }
    if (e.purpose !== purpose) {
      throw new Error(`InMemoryKeyResolver: kid ${kid} has purpose ${e.purpose}, not ${purpose}`)
    }
    return e
  }
}

// ─── Process-scoped default resolver ─────────────────────────────────

let _defaultResolver: TenantKeyResolver = new InMemoryKeyResolver()

/**
 * Get the platform-wide default resolver. The Mediator uses this when
 * `ctx.keyResolver` isn't supplied. Tests can replace it with
 * `setDefaultKeyResolver(...)` for isolation.
 */
export function getDefaultKeyResolver(): TenantKeyResolver {
  return _defaultResolver
}

export function setDefaultKeyResolver(r: TenantKeyResolver): void {
  // Slice RRRRRRRRR-cut1 — guarded escape hatch. Production wires the
  // KV-backed resolver at boot; runtime swaps are test-only.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { requireSafetyMode } = require('@/services/safety-mode') as typeof import('@/services/safety-mode')
  requireSafetyMode(['test', 'dev'], 'setDefaultKeyResolver')
  _defaultResolver = r
}

/**
 * Convenience: generate + register a fresh Ed25519 keypair for a
 * (tenant, kid) under the default in-memory resolver. Test-only.
 */
export async function provisionTestSigningKey(args: {
  tenantId: string
  kid: string
}): Promise<{ kid: string; publicKey: CryptoKey; privateKey: CryptoKey }> {
  // Slice RRRRRRRRR-cut1 — guarded; production rejects.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { requireSafetyMode } = require('@/services/safety-mode') as typeof import('@/services/safety-mode')
  requireSafetyMode(['test', 'dev'], 'provisionTestSigningKey')
  const pair = await globalThis.crypto.subtle.generateKey(
    { name: 'Ed25519' }, true, ['sign', 'verify'],
  ) as CryptoKeyPair
  const resolver = _defaultResolver
  if (resolver instanceof InMemoryKeyResolver) {
    resolver.register({
      kid: args.kid,
      tenantId: args.tenantId,
      purpose: 'signing',
      issuedAt: new Date().toISOString(),
      signingPrivateKey: pair.privateKey,
      signingPublicKey: pair.publicKey,
    })
  }
  return { kid: args.kid, publicKey: pair.publicKey, privateKey: pair.privateKey }
}

/** Test-only KEK provisioning. Same pattern as above for envelope encryption. */
export async function provisionTestKek(args: {
  tenantId: string
  kid: string
}): Promise<{ kid: string; kek: CryptoKey }> {
  // Slice RRRRRRRRR-cut1 — guarded; production rejects.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { requireSafetyMode } = require('@/services/safety-mode') as typeof import('@/services/safety-mode')
  requireSafetyMode(['test', 'dev'], 'provisionTestKek')
  const raw = globalThis.crypto.getRandomValues(new Uint8Array(32))
  const kek = await globalThis.crypto.subtle.importKey(
    'raw', raw, { name: 'HKDF' }, false, ['deriveKey'],
  )
  const resolver = _defaultResolver
  if (resolver instanceof InMemoryKeyResolver) {
    resolver.register({
      kid: args.kid,
      tenantId: args.tenantId,
      purpose: 'kek',
      issuedAt: new Date().toISOString(),
      kek,
    })
  }
  return { kid: args.kid, kek }
}
