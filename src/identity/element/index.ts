/**
 * Identity-element framework — Conservation Law 54 as reusable machinery.
 *
 * Slice OOOOOOOOO-cut1 (2026-05-11). Per user 'anything blank has
 * the same logic'.
 *
 * After three concrete instances — currency (XXX, Slice LLLLLLLLL),
 * locale (`und`, Slice MMMMMMMMM), country (`ZZ`, Slice NNNNNNNNN) —
 * the pattern is unmistakable. This module promotes it from a
 * file-for-file template into one abstract framework. Slot modules
 * register once and re-export narrowed wrappers; adding a tenth
 * slot is a one-line registration, not a 200-line file.
 *
 * The IDENTITY ELEMENT principle (algebraic):
 *
 *   For any typed slot S with category set C(S), there exists a
 *   designated `identity(S) ∈ C(S)` such that every operation that
 *   admits a missing input treats `null / undefined / '' / blank-
 *   equivalent` as `identity(S)`. The platform never crashes on a
 *   missing categorical value; it routes the missing case to the
 *   identity, which by construction is a valid value.
 *
 * The framework binds:
 *
 *   - **Slot name** — `'currency' | 'locale' | 'country' | ...`
 *   - **Identity value** — `'XXX' | 'und' | 'ZZ' | ...`
 *   - **Normalisation** — trim + slot-specific case rule
 *   - **Equality predicate** — for membership checks (default `===`)
 *   - **Standards citation list** — what regulates this identity
 *   - **Optional `blank` display label** — defaults to em-dash
 *
 * Each slot's specific module continues to expose narrowed types and
 * helpers (e.g. `Currency<Code>`, `resolveCurrency`) but delegates
 * the runtime work here. Backwards compatibility is preserved.
 *
 * Composition with the uuid family (Slice GGGGGGG / RRRRR):
 *
 *   `computeIdentityUuid(slot, code, tenantId)` returns a
 *   `ContentUuid<{ slot, code }>`. The slot name participates in the
 *   hash so `(currency, EUR, tenant-1)` and `(locale, en, tenant-1)`
 *   produce different uuids even when the codes coincide. Same
 *   tenant + slot + normalised code → same uuid. Same uuid-family
 *   laws (federation, replay, signature, envelope) transfer
 *   automatically.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — identity by abstraction
 * @standard NIST FIPS 180-4 SHA-256 (uuid hash)
 * @standard RFC 9562 §5.8 uuidv8 (uuid construction)
 * @audit Conservation Law 53 self-referential-closure (identity element is the role's internal-fallback)
 * @audit Conservation Law 54 universal-identity-element (this module formalises it)
 * @audit Conservation Law 8 content-addressable integrity
 * @audit Conservation Law 47 type uuid (each slot is a typed family)
 * @feature identity_element_framework
 * @see ../currency-fallback/index.ts (slot='currency', blank='XXX')
 * @see ../locale-fallback/index.ts   (slot='locale',   blank='und')
 * @see ../country-fallback/index.ts  (slot='country',  blank='ZZ')
 */

import { computeContentUuid } from '@/integrity/content-uuid'
import type { ContentUuid } from '@/integrity/content-uuid'
import { requireSafetyMode } from '@/safety/mode'

/**
 * Declarative definition of a categorical slot's identity element.
 * Slot modules register one of these at load time.
 */
export interface IdentitySlotDef<Code extends string = string> {
  /** Stable slot name — `'currency'`, `'locale'`, etc. */
  readonly slot: string
  /** The identity value — `'XXX'`, `'und'`, `'ZZ'`, ... */
  readonly blank: Code
  /**
   * Normalise an input value before equality checks. Common shapes:
   *   trim only          → `(s) => s.trim()`
   *   trim + uppercase   → `(s) => s.trim().toUpperCase()`
   * Defaults to trim only.
   */
  readonly normalise?: (input: string) => string
  /**
   * Equality predicate over normalised codes. Defaults to `===`.
   * Override for slots where multiple normalised values denote the
   * same identity (e.g. locale primary-subtag matching).
   */
  readonly equality?: (a: Code, b: Code) => boolean
  /** Optional default human label when displaying the blank value. */
  readonly displayBlankAs?: string
  /** Standards citations anchoring this slot's identity choice. */
  readonly standards?: ReadonlyArray<string>
  /** Optional human description used by docs + the registry invariant. */
  readonly description?: string
}

// SAFE-INMEM: identity slot registrations form a write-once registry
// populated at module-load via static imports of the slot modules.
// The graph is immutable after init; no MCP-managed mutable state
// (Slice RRRRRRRR's "mcp-mutations-have-collection" does not apply).
const REGISTRY = new Map<string, IdentitySlotDef>()

/**
 * Register a slot's identity definition. Throws on duplicate
 * registration unless `{ replace: true }` is supplied (tests).
 *
 * Slice RRRRRRRRR-cut1 — `{ replace: true }` is a uuid-family
 * escape hatch (Conservation Law 58). Production mode rejects the
 * override; test/dev modes admit it.
 */
export function registerIdentitySlot<C extends string>(
  def: IdentitySlotDef<C>,
  opts: { replace?: boolean } = {},
): void {
  if (REGISTRY.has(def.slot)) {
    if (!opts.replace) {
      throw new Error(
        `[identity-element] slot '${def.slot}' already registered (blank=${REGISTRY.get(def.slot)!.blank}). Pass { replace: true } to override.`,
      )
    }
    // safety-mode is a pure leaf (no imports, no side effects), so a
    // static top-level import has the same behavior as the prior lazy
    // require — and vitest's tsconfigPaths resolves `@/` only for
    // `import`, not for CJS `require()`.
    requireSafetyMode(['test', 'dev'], `registerIdentitySlot('${def.slot}', { replace: true })`)
  }
  REGISTRY.set(def.slot, def as unknown as IdentitySlotDef<string>)
}

/** Look up a slot's definition. */
export function getIdentitySlot(slot: string): IdentitySlotDef | undefined {
  return REGISTRY.get(slot)
}

/** Every registered slot — for the Law 54 invariant. */
export function listIdentitySlots(): ReadonlyArray<IdentitySlotDef> {
  return [...REGISTRY.values()]
}

/** Test-only: clear the registry. Production-mode invocations throw. */
export function __resetIdentitySlotRegistryForTests(): void {
  requireSafetyMode(['test', 'dev'], '__resetIdentitySlotRegistryForTests')
  REGISTRY.clear()
}

// ─── Resolution helpers (generic — work over any registered slot) ───

function defaultNormalise(s: string): string { return s.trim() }
function defaultEquality<C extends string>(a: C, b: C): boolean { return a === b }

function requireSlot(slot: string): IdentitySlotDef {
  const def = REGISTRY.get(slot)
  if (!def) throw new Error(`[identity-element] slot '${slot}' is not registered`)
  return def
}

/**
 * Resolve any input value to a non-null code for the named slot.
 * Returns the slot's `blank` for null / undefined / empty /
 * whitespace inputs; otherwise the normalised input. Throws if the
 * slot isn't registered — that's a programmer error.
 */
export function resolveIdentity<C extends string = string>(
  slot: string,
  input?: string | null,
): C {
  const def = requireSlot(slot)
  if (input === undefined || input === null) return def.blank as C
  const normalised = (def.normalise ?? defaultNormalise)(input)
  if (normalised.length === 0) return def.blank as C
  return normalised as C
}

/** True iff resolution yields the slot's blank value. */
export function isBlankIdentity(slot: string, input?: string | null): boolean {
  const def = requireSlot(slot)
  return resolveIdentity(slot, input) === (def.blank as string)
}

/**
 * Universal compatibility predicate. The blank value is compatible
 * with anything; non-blank pairs use the slot's `equality` predicate.
 */
export function identitiesCompatible(
  slot: string,
  a?: string | null,
  b?: string | null,
): boolean {
  const def = requireSlot(slot)
  const ra = resolveIdentity(slot, a)
  const rb = resolveIdentity(slot, b)
  if (ra === def.blank || rb === def.blank) return true
  return (def.equality ?? defaultEquality)(ra, rb)
}

/** Display label — blank renders per slot definition, else the code itself. */
export function identityDisplayLabel(slot: string, input?: string | null): string {
  const def = requireSlot(slot)
  const resolved = resolveIdentity(slot, input)
  if (resolved === def.blank) return def.displayBlankAs ?? '—'
  return resolved
}

// ─── uuid-family bridge (composes with Slice RRRRR + GGGGGGG) ───────

/**
 * Content-uuid of a slot identity. The slot name participates in the
 * hash so different categorical axes don't collide even when codes
 * coincide:
 *
 *   computeIdentityUuid('currency', 'EUR', 't') → uuid-A
 *   computeIdentityUuid('locale',   'EUR', 't') → uuid-B  (distinct,
 *                                                          even though
 *                                                          'EUR' isn't
 *                                                          a real locale)
 *
 * Per-tenant namespaced via the underlying `computeContentUuid`.
 * Type-branded by `(slot, code)` so consumers can express
 * `ContentUuid<{ slot: 'currency'; code: 'EUR' }>` constraints.
 */
export function computeIdentityUuid<C extends string = string>(
  slot: string,
  code: C,
  tenantId: string,
): ContentUuid<{ slot: string; code: C }> {
  const def = requireSlot(slot)
  const resolved = (def.normalise ?? defaultNormalise)(code)
  return computeContentUuid(
    { slot: def.slot, code: resolved as C },
    tenantId,
  ) as ContentUuid<{ slot: string; code: C }>
}
