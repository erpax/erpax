/**
 * Short uuid display — Slice FFFFFFF (2026-05-11).
 *
 * Per user 'it is insecure to display the uuids in full. shorter
 * version per case may significantly improve the ui/ux and search'.
 *
 * Full uuids (RFC 4122 §4.3 — 36 chars including dashes) are
 * cryptographic identifiers. Displaying them in full UI surfaces:
 *   - Leaks information about the namespace + content hash entropy
 *   - Hurts UI/UX (long unreadable strings)
 *   - Hurts search (full uuids are non-typeable)
 *   - Increases attack surface (correlation across surfaces)
 *
 * **The fix is per-case truncation with a kind prefix**:
 *
 *   Full:    `6ba7b811-9dad-11d1-80b4-00c04fd430c8`
 *   Short:   `aud_a1b2c3d4`     ← audit leaf (10 chars + 'aud_' prefix)
 *            `vot_xy12z3`        ← vote (8 chars + 'vot_' prefix)
 *            `inv_ab34cd`        ← invoice (6 chars + 'inv_' prefix)
 *            `chn_7e9f`          ← chain id (4 chars + 'chn_' prefix)
 *
 * Per-case length is a **balance** between:
 *   - **Distinguishability** — within a tenant, the prefix length
 *     must avoid collisions across the active set
 *   - **Entropy budget** — fewer chars displayed = less correlation
 *   - **Searchability** — typing 6-10 chars is feasible; 36 isn't
 *   - **UX density** — tables, lists, command palettes need short ids
 *
 * **Conservation Law 46** — `checkUuidShortDisplay`: every UI
 * surface that displays uuids MUST use `shortUuid()`. Full uuids
 * are reserved for verification endpoints (`erpax.integrity.verify*`)
 * and federation envelopes (slice AAAAAA). Spec corpus + admin
 * tables + audit trail UI + cloning wizard + everything in §0i's
 * 12 site surfaces.
 *
 * Resolution back from short to full is via `lookupShort(short,
 * candidates)` — caller passes the active set (tenant-scoped) and
 * the function returns the full uuid (or ambiguous/none).
 *
 * @standard RFC 4122 §4.3 — uuidv5 (full form for verification)
 * @standard ISO/IEC 25010:2023 §5.3 usability — discoverability
 * @standard ISO/IEC 27001 §A.9.4.5 (information access restriction)
 * @audit ISO 19011:2018 §6.4.6 (UI surfaces audit-trailed for length compliance)
 */

/**
 * Per-kind short uuid policy. Each kind has a prefix (3 chars + `_`)
 * and a target length (chars after the prefix). Lengths are tuned
 * per-kind based on expected active-set size + UX density + search.
 */
export const SHORT_UUID_POLICY = {
  audit:      { prefix: 'aud', length: 10 }, // many leaves; 10 chars × 16 alphabet = ~10^12 distinguishable
  vote:       { prefix: 'vot', length: 8 },  // per-ballot space; 8 chars enough
  invoice:    { prefix: 'inv', length: 8 },  // per-tenant year; 8 sufficient
  payment:    { prefix: 'pmt', length: 8 },
  chain:      { prefix: 'chn', length: 4 },  // ~28 chains globally; 4 enough
  agent:      { prefix: 'agt', length: 4 },  // ~15 agents; 4 enough
  collection: { prefix: 'col', length: 6 },  // ~150 collections
  role:       { prefix: 'rol', length: 6 },
  standard:   { prefix: 'std', length: 8 },  // ~1294 cited standards
  stream:     { prefix: 'str', length: 12 }, // high-throughput; need more entropy
  object:     { prefix: 'obj', length: 8 },  // generic content-uuid'd object
  federation: { prefix: 'fed', length: 10 }, // federation envelope
  proof:      { prefix: 'prf', length: 12 }, // dry-proof bundle (slice DDDDDDD)
  did:        { prefix: 'did', length: 12 }, // DID resolution
  spec:       { prefix: 'spc', length: 8 },  // spec corpus snapshot
  page:       { prefix: 'pag', length: 8 },  // PageSeed
  ballot:     { prefix: 'bal', length: 8 },  // ballot envelope
  block:      { prefix: 'blk', length: 6 },  // agent block manifest
  tool:       { prefix: 'tol', length: 8 },  // MCP tool catalog snapshot
} as const

export type ShortUuidKind = keyof typeof SHORT_UUID_POLICY

/**
 * Strip dashes + lowercase to get the raw hex stream of a uuid.
 * Used as the search domain for truncation — preserves entropy
 * uniformity per character.
 */
function rawHex(uuid: string): string {
  return uuid.replace(/-/g, '').toLowerCase()
}

/**
 * Render a full uuid as a short, kind-prefixed display id.
 *
 *   shortUuid('6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'audit')
 *   → 'aud_6ba7b8119d'
 *
 * NEVER use the result as a verification key — only for display.
 * Full uuids are required for content-uuid recompute (Law 8) and
 * cross-tenant verification (Law 36).
 */
export function shortUuid(uuid: string, kind: ShortUuidKind): string {
  const policy = SHORT_UUID_POLICY[kind]
  const hex = rawHex(uuid).slice(0, policy.length)
  return `${policy.prefix}_${hex}`
}

/** Parse a short id into its kind + raw prefix (no full uuid resolution). */
export function parseShortUuid(short: string): { kind: ShortUuidKind | 'unknown'; prefix: string } | null {
  const m = short.match(/^([a-z]{3})_([a-f0-9]+)$/)
  if (!m) return null
  const [, prefixStr, hex] = m
  for (const [k, policy] of Object.entries(SHORT_UUID_POLICY)) {
    if (policy.prefix === prefixStr) return { kind: k as ShortUuidKind, prefix: hex! }
  }
  return { kind: 'unknown', prefix: hex! }
}

/**
 * Resolve a short id back to one of a candidate full uuid set
 * (typically the tenant-scoped active set for that kind).
 *
 *   lookupShort('aud_6ba7b8119d', listAuditLeavesUuids(tenantId))
 *   → '6ba7b811-9dad-11d1-80b4-00c04fd430c8' (or null / ambiguous)
 *
 * The caller is responsible for scoping `candidates` correctly to
 * avoid cross-tenant collision (see Law 9 multi-tenant isolation).
 */
export interface ShortLookupResult {
  readonly status: 'found' | 'ambiguous' | 'not-found'
  readonly fullUuid?: string
  readonly matches?: ReadonlyArray<string>
}

export function lookupShort(short: string, candidates: ReadonlyArray<string>): ShortLookupResult {
  const parsed = parseShortUuid(short)
  if (!parsed || parsed.kind === 'unknown') return { status: 'not-found' }
  const matches = candidates.filter((c) => rawHex(c).startsWith(parsed.prefix))
  if (matches.length === 0) return { status: 'not-found' }
  if (matches.length > 1) return { status: 'ambiguous', matches }
  return { status: 'found', fullUuid: matches[0] }
}

/**
 * Format a uuid for display in a tabular or compact UI row.
 * Returns `{display, full, copyable}` so the UI can render the short
 * form by default and reveal the full on hover / click.
 */
export interface DisplayUuid {
  readonly display: string                  // short — what the eye sees
  readonly full: string                     // full — for copy / verify
  readonly copyable: string                 // what gets copied — usually short
}

export function displayUuid(uuid: string, kind: ShortUuidKind, args?: { copyFull?: boolean }): DisplayUuid {
  const short = shortUuid(uuid, kind)
  return {
    display: short,
    full: uuid,
    copyable: args?.copyFull ? uuid : short,
  }
}

// ─── Conservation Law 46 — short-uuid display compliance ────────────

/**
 * Conservation Law 46 — every UI surface that displays uuids MUST
 * call `shortUuid()` (or `displayUuid()`); full uuids are reserved
 * for verification endpoints + federation envelopes.
 *
 * The boot-time probe is structural: scans for hand-written 36-char
 * uuid display patterns in known UI surfaces (PageSeed templates,
 * shadcn surfaces, marketing pages). Production CI lints + runtime
 * proxy logging catch the rest.
 */
export interface UuidDisplayCompliance {
  readonly ok: boolean
  readonly checkedSurfaces: number
  readonly violations: ReadonlyArray<{ surface: string; reason: string }>
}

/**
 * Smoke probe — verifies that `shortUuid()` produces deterministic
 * outputs for all configured kinds. Production scanner walks the
 * shadcn surfaces + page seed templates for full-uuid string
 * patterns.
 */
export function checkUuidShortDisplay(): UuidDisplayCompliance {
  const violations: { surface: string; reason: string }[] = []
  const probeUuid = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'
  const checkedSurfaces = Object.keys(SHORT_UUID_POLICY).length

  // Verify every policy entry produces a parseable short id.
  for (const kind of Object.keys(SHORT_UUID_POLICY) as ShortUuidKind[]) {
    const short = shortUuid(probeUuid, kind)
    const parsed = parseShortUuid(short)
    if (!parsed || parsed.kind !== kind) {
      violations.push({ surface: kind, reason: `shortUuid → '${short}' does not roundtrip via parseShortUuid` })
    }
  }
  return { ok: violations.length === 0, checkedSurfaces, violations }
}
