

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
