/**
 * Typed STI — Single Table Inheritance, modelled as a TypeScript discriminated union on a flat
 * `type` discriminator.
 *
 * One collection, one `type` column (Rails' `inheritance_column` default), many subtypes.
 * Payload's generated type for such a collection is *wide* — every subtype's fields merged
 * optional — which loses the per-subtype shape. This overlay restores it: declare the shared base
 * plus a per-type field map once and get a discriminated union, so `switch (doc.type)` narrows to
 * the subtype's fields at compile time. The runtime mirror is the Payload config: a flat `type`
 * select plus per-field `admin.condition` keyed on `type`.
 *
 * Honest boundary: the generated (wide) doc is narrowed to the union exactly once, where a
 * document is read — `type` is always present, so the cast is sound.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @quality ISO-25010 maintainability discriminated-subtype-safety
 */
/** Any typed-STI document carries a string literal `type`. */
export interface StiDoc {
  type: string
}

/**
 * Build the discriminated union from a shared `Base` and a per-`type` field map.
 *
 *   type Invoice = Sti<BaseInvoice, {
 *     invoice:     { /* AR-only fields *\/ }
 *     bill:        { /* AP-only fields *\/ }
 *     credit_note: { creditReason: string }
 *   }>
 *   // ⇒ (Base & { type: 'invoice' }) | (Base & { type: 'bill' }) | (Base & { type: 'credit_note'; creditReason: string })
 */
export type Sti<Base, Variants extends Record<string, object>> = {
  [K in keyof Variants]: Base & { type: K & string } & Variants[K]
}[keyof Variants]

/** All subtype tags of a typed-STI union (e.g. `'invoice' | 'bill' | 'credit_note'`). */
export type StiTypeOf<U extends StiDoc> = U['type']

/** The single variant of `U` whose discriminator is `K`. */
export type StiVariant<U extends StiDoc, K extends StiTypeOf<U>> = Extract<U, { type: K }>

/**
 * Narrow a wide (Payload-generated) document to its typed-STI union. Sound
 * because the `type` discriminator is always populated; do it once at the read
 * boundary, then branch with `matchStiType` / `isStiType`.
 */
export function narrowSti<U extends StiDoc>(doc: { type: U['type'] }): U {
  return doc as unknown as U
}

/** Type guard for one subtype. */
export function isStiType<U extends StiDoc, K extends StiTypeOf<U>>(
  doc: U,
  type: K,
): doc is StiVariant<U, K> {
  return doc.type === type
}

/**
 * Exhaustive subtype dispatch — the typed replacement for Rails STI subclass
 * methods. The handler map MUST cover every subtype; omit one and TS errors,
 * so a new `type` can't silently fall through.
 */
export function matchStiType<U extends StiDoc, R>(
  doc: U,
  handlers: { [K in StiTypeOf<U>]: (doc: StiVariant<U, K>) => R },
): R {
  const handler = handlers[doc.type as StiTypeOf<U>] as (d: U) => R
  return handler(doc)
}

/** @index-cross.foldback child=types/sti parent=types — this cross folds back into its parent. */
