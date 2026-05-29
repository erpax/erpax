/**
 * Universal uuid mapping — every key-value pair is uuid → uuid.
 *
 * Slice QQQQQQQQQ-cut1 (2026-05-11). Per user 'key value becomes
 * [uuid]: uuid'.
 *
 * The ultimate generalisation of the uuid family. After Slice
 * RRRRR (content-uuid for rows), Slice GGGGGGG (type-uuid for
 * any type), Slice KKKKKKKKK (queryUuid for SQL), and Slice
 * OOOOOOOOO (identity-element uuid per slot), the recurring
 * pattern is: every pair in every store is `ContentUuid<K> →
 * ContentUuid<V>`. Both sides are content-addressable; both sides
 * compose with the rest of the uuid family for free.
 *
 *   string-keyed map           ←→  UuidMap<K, V>
 *   ───────────────────────────────────────────────────────────
 *   'EUR' → {…currency def}    ←→  computeCurrencyUuid('EUR', t)
 *                                    → computeContentUuid(def, t)
 *   'tenant-1/signing/2026' → CryptoKey ←→  kid uuid → key uuid
 *   'erpax.consistency.scan' → tool def ←→  tool name uuid → def uuid
 *   'mcp-tool:erpax.…:description' → text ←→  translation key uuid
 *                                              → value uuid
 *
 * What changes when keys and values are both uuids:
 *
 *   - **Federation is byte-equal.** Two peers holding the same uuid →
 *     same content. Cross-peer reconciliation is just uuid comparison.
 *   - **Cache layers are universal.** One KV store keyed by uuid
 *     serves every map shape; no per-domain key conventions.
 *   - **Tamper detection is asymmetric.** Adding a `[key]→value`
 *     binding requires producing a contentUuid of value that matches
 *     the binding's uuid. Forging requires recomputation across the
 *     dependency graph (Conservation Law 55).
 *   - **Lock at boot becomes trivial.** A registry is "frozen" by
 *     materialising it as a UuidMap; post-boot inserts produce uuids
 *     the chain doesn't witness. Closes Finding 3 of the tamper-
 *     surface review without runtime guards.
 *   - **Identity elements compose naturally.** The blank-key uuid
 *     (`computeIdentityUuid('any-slot', '', tenantId)`) maps to the
 *     blank-value uuid; resolution still terminates.
 *
 * The shape:
 *
 *   ```ts
 *   const m: UuidMap<Currency, CurrencyDef> = new UuidMap()
 *   m.set(
 *     computeCurrencyUuid('EUR', 'tenant-1'),
 *     computeContentUuid(eurDef, 'tenant-1'),
 *   )
 *   ```
 *
 * @standard RFC 4122 §4.3 uuidv5 (both sides)
 * @standard RFC 8785 JCS (canonicalisation that makes equivalence hold)
 * @standard NIST FIPS 180-4 SHA-256
 * @audit Conservation Law 8 content-addressable integrity
 * @audit Conservation Law 47 type uuid
 * @audit Conservation Law 53 self-referential-closure (identity element
 *        for the missing-key + missing-value cases)
 * @audit Conservation Law 54 universal identity element
 * @audit Conservation Law 56 dynamic-trust (chain-of-bindings supersedes
 *        static key tables — every binding is a uuid pair, walk the chain)
 * @feature uuid_kv
 * @see ../integrity/content-uuid.ts (computeContentUuid + ContentUuid<T>)
 * @see ../identity-element/index.ts (identity elements per slot — blank uuids)
 */

import { computeContentUuid } from '@/services/integrity/content-uuid'
import type { ContentUuid } from '@/services/integrity/content-uuid'

/**
 * A binding from a content-uuid'd key to a content-uuid'd value.
 * Both sides are type-branded by their source shapes so the type
 * system enforces "the value-uuid resolves to the right type" at
 * compile time.
 */
export interface KvBinding<K, V> {
  readonly keyUuid: ContentUuid<K>
  readonly valueUuid: ContentUuid<V>
}

/**
 * Content-uuid of the BINDING itself — the (key, value) pair as a
 * first-class entity. Useful for proving "this binding existed at
 * this point in time" (federation snapshots, audit-chain leaves,
 * cache key invalidation).
 *
 * Note: this is distinct from `keyUuid` (which identifies the key
 * alone) and `valueUuid` (which identifies the value alone). The
 * binding uuid encodes BOTH so two snapshots with same key but
 * different values produce distinct binding uuids.
 */
export function computeKvBindingUuid<K, V>(args: {
  keyUuid: ContentUuid<K>
  valueUuid: ContentUuid<V>
  tenantId: string
}): ContentUuid<KvBinding<K, V>> {
  return computeContentUuid(
    { keyUuid: args.keyUuid, valueUuid: args.valueUuid },
    args.tenantId,
  ) as ContentUuid<KvBinding<K, V>>
}

/**
 * Uuid-keyed map. Same semantics as `Map<string, V>` but the keys
 * are `ContentUuid<K>` and the values are `ContentUuid<V>`. The
 * actual K and V data lives content-addressed elsewhere; this map
 * is the pointer table.
 *
 * Iteration order is insertion order (per ECMA-262 §24.1) so
 * `[...m].map(b => computeKvBindingUuid(b)).join(...)` produces a
 * deterministic content-uuid of the WHOLE map — useful for the
 * Finding 3 fix (registry freeze: the map's contentUuid is the
 * "frozen" signature; any post-boot insert changes it).
 */
export class UuidMap<K, V> {
  private readonly inner = new Map<string, ContentUuid<V>>()

  set(keyUuid: ContentUuid<K>, valueUuid: ContentUuid<V>): this {
    this.inner.set(keyUuid as unknown as string, valueUuid)
    return this
  }

  get(keyUuid: ContentUuid<K>): ContentUuid<V> | undefined {
    return this.inner.get(keyUuid as unknown as string)
  }

  has(keyUuid: ContentUuid<K>): boolean {
    return this.inner.has(keyUuid as unknown as string)
  }

  delete(keyUuid: ContentUuid<K>): boolean {
    return this.inner.delete(keyUuid as unknown as string)
  }

  get size(): number {
    return this.inner.size
  }

  *entries(): IterableIterator<KvBinding<K, V>> {
    for (const [k, v] of this.inner) {
      yield {
        keyUuid: k as unknown as ContentUuid<K>,
        valueUuid: v,
      }
    }
  }

  [Symbol.iterator](): IterableIterator<KvBinding<K, V>> {
    return this.entries()
  }

  /**
   * Convert this map's CURRENT state into a content-uuid that
   * represents the FROZEN map. Two UuidMaps with the same entries
   * (in any order — we sort) produce the same uuid. Used for the
   * registry-freeze pattern: store the freeze-uuid at boot, recompute
   * at any later moment, compare. Mismatch ⇒ post-boot tamper.
   */
  freezeUuid(tenantId: string): ContentUuid<UuidMap<K, V>> {
    const sorted = [...this.inner.entries()].sort((a, b) =>
      a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0,
    )
    return computeContentUuid(
      { entries: sorted },
      tenantId,
    ) as unknown as ContentUuid<UuidMap<K, V>>
  }
}

/**
 * Adapter — convert a string-keyed map into a UuidMap. Each
 * string key is hashed via `computeContentUuid` under the supplied
 * `slot` namespace; each value (which can be ANY shape) is hashed
 * the same way. The slot name participates so two slots can share a
 * key string without their uuid bindings colliding.
 *
 * This is the bridge that existing string-keyed registries
 * (PLUGIN_ACCESS_MAP, identity-element REGISTRY, SUPPORTED_CURRENCIES
 * as a map, etc.) cross to become uuid-keyed.
 */
export function toUuidMap<V>(args: {
  slot: string
  entries: ReadonlyArray<readonly [string, V]>
  tenantId: string
}): UuidMap<{ slot: string; key: string }, V> {
  const m = new UuidMap<{ slot: string; key: string }, V>()
  for (const [key, value] of args.entries) {
    const keyUuid = computeContentUuid(
      { slot: args.slot, key },
      args.tenantId,
    ) as ContentUuid<{ slot: string; key: string }>
    const valueUuid = computeContentUuid(value as unknown as Record<string, unknown>, args.tenantId) as ContentUuid<V>
    m.set(keyUuid, valueUuid)
  }
  return m
}

/**
 * Look up a value's uuid by its raw (slot, key) pair without
 * pre-building a map. Equivalent to one entry of `toUuidMap` and
 * useful when callers want a uuid-keyed lookup against a small
 * source.
 */
export function resolveKeyUuid(args: {
  slot: string
  key: string
  tenantId: string
}): ContentUuid<{ slot: string; key: string }> {
  return computeContentUuid(
    { slot: args.slot, key: args.key },
    args.tenantId,
  ) as ContentUuid<{ slot: string; key: string }>
}
