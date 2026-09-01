/**
 * factory/collection/lifecycle — the spine fold: a collection's events, derived.
 *
 * Any CollectionConfig with a `status` select produces `<slug>:created` plus one
 * event per transition — applied once at registration, so every collection speaks
 * with zero per-collection code. A collection that already wired explicit emits
 * carries EMITS_WIRED_KEY and the fold leaves it alone.
 *
 * @see ./SKILL.md
 */
import type { CollectionConfig, Field } from 'payload'
import { emitOnStatusTransition, emitOnCreate, AGGREGATE_TYPES, type AggregateType } from '@/chain/event/emitter'
import { EMITS_WIRED_KEY, type EmitWiring, type StatusOption } from '@/factory/collection/base'

/**
 * Spine fold (2026-07-15) — derive the lifecycle event stream for ANY CollectionConfig
 * from its `status` select: `<slug>:created` + `<slug>:<status>` per transition.
 * Applied once at registration (the payload.config map), so every collection —
 * factory-built or raw — speaks with zero per-collection code (the mute-corpus fold).
 */
export function deriveLifecycleEmits(slug: string, fields: ReadonlyArray<Field>): ReadonlyArray<EmitWiring> {
  const status = fields.find(
    (f): f is Field & { options: ReadonlyArray<string | StatusOption> } =>
      (f as { name?: string }).name === 'status' &&
      (f as { type?: string }).type === 'select' &&
      Array.isArray((f as { options?: unknown[] }).options),
  )
  const values = status?.options.map((o) => (typeof o === 'string' ? o : o.value)) ?? []
  if (values.length === 0) return []
  const singular = slug.replace(/ies$/, 'y').replace(/s$/, '').replace(/-/g, '_')
  const aggregate: AggregateType = AGGREGATE_TYPES.includes(singular as AggregateType)
    ? (singular as AggregateType)
    : 'record'
  return [
    { event: `${slug}:created`, aggregate, onCreate: true },
    ...values.map((value) => ({ event: `${slug}:${value}`, aggregate, onStatus: value })),
  ]
}

/** Fold one registered collection — append derived lifecycle producers unless explicitly wired. */
export function foldCollectionLifecycle<T extends CollectionConfig>(c: T): T {
  if ((c as Record<string, unknown>)[EMITS_WIRED_KEY] === true) return c
  const derived = deriveLifecycleEmits(c.slug, c.fields)
  if (derived.length === 0) return c
  const producers = derived.map((e) =>
    e.onCreate === true
      ? emitOnCreate(e.event, e.aggregate)
      : emitOnStatusTransition(e.onStatus as string, e.event, e.aggregate),
  )
  return {
    ...c,
    hooks: { ...c.hooks, afterChange: [...(c.hooks?.afterChange ?? []), ...producers] },
  }
}
