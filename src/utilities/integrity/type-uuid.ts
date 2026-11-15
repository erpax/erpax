/**
 * Type-level content uuid — Slice GGGGGGG (2026-05-11).
 *
 * Per user 'any type has uuid as well as any type object'. The deep
 * generalization of slice RRRRR: not only every OBJECT has a
 * content-uuid; every TYPE itself has one too.
 *
 *   Object uuid (RRRRR — Law 8)  = uuidv8(content of an instance)
 *   Type uuid   (this slice)     = uuidv8(content of the type def)
 *
 * The type definition is a structural descriptor (Zod schema → JSON
 * schema; TypeScript interface → JSON-LD type manifest). When the
 * type changes — a field is added / removed / re-typed / made
 * required — the type uuid changes. When the type is byte-identical
 * (post-canonicalisation), the uuid collides — an invariant the rest
 * of the system can rely on.
 *
 * Implications:
 *
 *   1. **Type evolution tracking** — schema migrations are now
 *      transitions between two type-uuids; the audit trail (Law 12)
 *      captures the type-uuid at each transition.
 *
 *   2. **Type federation (slice AAAAAA)** — peer ERPax instances
 *      verify they speak the same types by exchanging type-uuids
 *      before exchanging instances. No more "field X means Y here
 *      but Z there" drift.
 *
 *   3. **Cross-language interop** — type-uuids let any language
 *      (TS / Rust / Go / Python) verify they're talking about the
 *      same type, regardless of source-language syntax. The uuid
 *      is computed from the JSON-Schema-canonicalised shape.
 *
 *   4. **Backward-compat detection** — a migration's safety = the
 *      old uuid + new uuid both verify against the migration's
 *      transformer; otherwise the migration breaks the federation.
 *
 *   5. **Type registry as live object** — `TYPE_REGISTRY` is a
 *      content-addressed map (name → {uuid, descriptor}); registry
 *      changes themselves get an envelope uuid (Law 8 echo).
 *
 *   6. **Per-tenant type lock** — a tenant can pin a type-uuid; any
 *      attempt to write an instance against a different type-uuid
 *      is rejected upstream of Law 8.
 *
 * **Conservation Law 47** — `checkTypeUuidCoverage`: every domain
 * type in use (collection schemas, agent block manifests, event
 * payloads, vote ballot kinds, federation envelope kinds) MUST be
 * registered with a type-uuid. Boot suite verifies coverage.
 *
 * @standard W3C JSON-LD 1.1 + JSON Schema (draft 2020-12)
 * @standard RFC 9562 §5.8 + RFC 8785 (canonical type uuid)
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
 * @standard W3C Verifiable Credentials Data Model 2.0 (typed claims)
 * @audit ISO 19011:2018 §6.4.6 (type evolution audit-trailed)
 */

import { computeContentUuid, jcsCanonicalize } from '@/utilities/integrity/content'

const TYPE_REGISTRY_NS = 'erpax-type-registry'

// ─── Structural descriptor (the canonical type body) ───────────────

/**
 * The descriptor we hash to derive a type-uuid. It mirrors JSON
 * Schema draft 2020-12 surface BUT canonicalised by JCS so two
 * equivalent shapes produce the same uuid even if the surface
 * generator differs. Future versions of this descriptor MUST be
 * additive only — removing a field changes the uuid for every
 * registered type, which would invalidate the federation.
 */
export interface TypeDescriptor {
  readonly kind: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'enum' | 'union' | 'literal' | 'record' | 'tuple' | 'unknown'
  readonly properties?: Record<string, TypeDescriptor>
  readonly required?: ReadonlyArray<string>          // sorted ascending — required for determinism
  readonly items?: TypeDescriptor
  readonly itemsTuple?: ReadonlyArray<TypeDescriptor>
  readonly enumValues?: ReadonlyArray<string | number | boolean>
  readonly literal?: string | number | boolean | null
  readonly unionMembers?: ReadonlyArray<TypeDescriptor>
  readonly recordValueType?: TypeDescriptor
  readonly description?: string                      // optional doc (does NOT participate in uuid)
}

/**
 * Strip uuid-irrelevant fields (description, examples, default) so
 * they don't contribute to the hash. Required so types with
 * different docstrings but identical structure produce the SAME uuid.
 */
function strippedForHash(d: TypeDescriptor): unknown {
  const out: Record<string, unknown> = { kind: d.kind }
  if (d.required) out.required = [...d.required].sort()
  if (d.properties) {
    const props: Record<string, unknown> = {}
    const keys = Object.keys(d.properties).sort()
    for (const k of keys) props[k] = strippedForHash(d.properties[k]!)
    out.properties = props
  }
  if (d.items) out.items = strippedForHash(d.items)
  if (d.itemsTuple) out.itemsTuple = d.itemsTuple.map(strippedForHash)
  if (d.enumValues) out.enumValues = [...d.enumValues].sort((a, b) => String(a).localeCompare(String(b)))
  if (d.literal !== undefined) out.literal = d.literal
  if (d.unionMembers) {
    const members = d.unionMembers.map((m) => jcsCanonicalize(strippedForHash(m)))
    out.unionMembers = [...members].sort()
  }
  if (d.recordValueType) out.recordValueType = strippedForHash(d.recordValueType)
  return out
}

// ─── Compute the type uuid ─────────────────────────────────────────

export function computeTypeUuid(descriptor: TypeDescriptor): string {
  const stripped = strippedForHash(descriptor)
  return computeContentUuid(stripped as Record<string, unknown>, TYPE_REGISTRY_NS)
}

// ─── Type registry ─────────────────────────────────────────────────

export interface RegisteredType {
  readonly name: string                 // canonical name e.g. 'Invoice', 'Vote'
  readonly uuid: string                 // type-uuid (Law 47)
  readonly descriptor: TypeDescriptor
  readonly registeredAt: string         // ISO 8601
  readonly version?: string             // optional semver hint (does NOT affect uuid)
}

const TYPE_REGISTRY = new Map<string, RegisteredType>()
const TYPE_REGISTRY_BY_UUID = new Map<string, RegisteredType>()

export function registerType(args: { name: string; descriptor: TypeDescriptor; version?: string }): RegisteredType {
  const uuid = computeTypeUuid(args.descriptor)
  const entry: RegisteredType = {
    name: args.name,
    uuid,
    descriptor: args.descriptor,
    registeredAt: new Date().toISOString(),
    version: args.version,
  }
  TYPE_REGISTRY.set(args.name, entry)
  TYPE_REGISTRY_BY_UUID.set(uuid, entry)
  return entry
}

export function getType(name: string): RegisteredType | undefined { return TYPE_REGISTRY.get(name) }
export function getTypeByUuid(uuid: string): RegisteredType | undefined { return TYPE_REGISTRY_BY_UUID.get(uuid) }
export function listTypes(): ReadonlyArray<RegisteredType> { return [...TYPE_REGISTRY.values()] }

// ─── Descriptor builder ──────────────────────────────────────────────

/** Build descriptors directly: every key of an object is required, sorted for determinism. */
const t = {
  string: { kind: 'string' } as TypeDescriptor,
  unknown: { kind: 'unknown' } as TypeDescriptor,
  literal: (literal: string | number | boolean | null): TypeDescriptor => ({ kind: 'literal', literal }),
  enumOf: (...enumValues: string[]): TypeDescriptor => ({ kind: 'enum', enumValues }),
  record: (recordValueType: TypeDescriptor): TypeDescriptor => ({ kind: 'record', recordValueType }),
  union: (...unionMembers: TypeDescriptor[]): TypeDescriptor => ({ kind: 'union', unionMembers }),
  object: (properties: Record<string, TypeDescriptor>): TypeDescriptor => ({ kind: 'object', properties, required: Object.keys(properties).sort() }),
}

// ─── Verification ──────────────────────────────────────────────────

export interface TypeVerification {
  readonly ok: boolean
  readonly registeredUuid: string
  readonly recomputedUuid: string
  readonly drifted?: { fieldsAdded: ReadonlyArray<string>; fieldsRemoved: ReadonlyArray<string> }
}

/**
 * Verify a candidate descriptor matches the registered type's uuid.
 * Used by federation peers to confirm they speak the same shape;
 * by migration scripts to detect breaking changes; by per-tenant
 * type-lock to reject foreign instances.
 */
export function verifyType(name: string, descriptor: TypeDescriptor): TypeVerification {
  const registered = TYPE_REGISTRY.get(name)
  if (!registered) {
    return { ok: false, registeredUuid: '', recomputedUuid: computeTypeUuid(descriptor) }
  }
  const recomputed = computeTypeUuid(descriptor)
  if (recomputed === registered.uuid) {
    return { ok: true, registeredUuid: registered.uuid, recomputedUuid: recomputed }
  }
  // Drift hint: compare top-level properties.
  const a = new Set(Object.keys(registered.descriptor.properties ?? {}))
  const b = new Set(Object.keys(descriptor.properties ?? {}))
  const fieldsAdded = [...b].filter((k) => !a.has(k))
  const fieldsRemoved = [...a].filter((k) => !b.has(k))
  return {
    ok: false,
    registeredUuid: registered.uuid,
    recomputedUuid: recomputed,
    drifted: { fieldsAdded, fieldsRemoved },
  }
}

// ─── Conservation Law 47 — type uuid coverage ──────────────────────

/**
 * The minimum baseline of types ERPax expects to be registered at
 * boot. Production wires more (every collection slug, every event
 * id, every vote kind, etc.); this is the floor.
 */
const REQUIRED_BASELINE_TYPES: ReadonlyArray<string> = [
  'AgentEffect', 'DomainEvent', 'AuditLeaf', 'BallotKind',
  'PageSeed', 'SeoVortexFace', 'CollectionSpec',
]

export interface TypeUuidCoverageResult {
  readonly ok: boolean
  readonly registeredCount: number
  readonly missingBaseline: ReadonlyArray<string>
}

export function checkTypeUuidCoverage(): TypeUuidCoverageResult {
  const present = new Set([...TYPE_REGISTRY.keys()])
  const missing = REQUIRED_BASELINE_TYPES.filter((t) => !present.has(t))
  return {
    ok: missing.length === 0,
    registeredCount: TYPE_REGISTRY.size,
    missingBaseline: missing,
  }
}

// ─── Bootstrap baseline registration ───────────────────────────────

/**
 * Eagerly register the baseline types so the boot suite passes Law 47
 * without requiring every domain to register at module-load. Production
 * domains call `registerType` for their own types; this function
 * just primes the registry with the platform-mandated minimum.
 */
let baselineRegistered = false
export function ensureBaselineTypesRegistered(): void {
  if (baselineRegistered) return
  baselineRegistered = true

  // AgentEffect — discriminated union (slice DDDDD).
  registerType({
    name: 'AgentEffect',
    descriptor: t.union(
      t.object({ kind: t.literal('create'), collection: t.string, data: t.unknown }),
      t.object({ kind: t.literal('update'), collection: t.string, id: t.string, patch: t.unknown }),
      t.object({ kind: t.literal('notify'), channel: t.string, templateKey: t.string, vars: t.record(t.unknown) }),
      t.object({ kind: t.literal('audit'), leaf: t.record(t.unknown) }),
      t.object({ kind: t.literal('escalate'), severity: t.string, templateKey: t.string, vars: t.record(t.unknown) }),
      t.object({ kind: t.literal('emit'), event: t.record(t.unknown) }),
      t.object({ kind: t.literal('capture'), frame: t.record(t.unknown) }),
    ),
  })

  registerType({
    name: 'DomainEvent',
    descriptor: t.object({
      id: t.string, tenantId: t.string,
      payload: t.record(t.unknown), emittedAt: t.string,
    }),
  })

  registerType({
    name: 'AuditLeaf',
    descriptor: t.object({
      tenantId: t.string, subjectCollection: t.string,
      subjectId: t.string, action: t.string,
    }),
  })

  registerType({
    name: 'BallotKind',
    descriptor: t.enumOf('binary', 'choice-one', 'rank', 'rating-1to5', 'rating-1to10', 'sentiment-pos-neg'),
  })

  registerType({
    name: 'PageSeed',
    descriptor: t.object({
      slug: t.string, title: t.string, locale: t.string,
      heroSection: t.string, bodyHtml: t.string,
      seedSource: t.enumOf('e2e-multimedia', 'spec-corpus', 'federation'),
    }),
  })

  registerType({
    name: 'SeoVortexFace',
    descriptor: t.object({
      url: t.string, title: t.string, description: t.string,
      schemaType: t.string, ogType: t.string,
      contentUuid: t.string,
    }),
  })

  registerType({
    name: 'CollectionSpec',
    descriptor: t.object({
      slug: t.string, filePath: t.string,
      title: t.string, description: t.string,
    }),
  })
}
