import type { Field } from 'payload'

// ─── Slice JJJJ — taxonomy + reference field factories ───────────────────
//
// `taxonomySelect()` consumes any `src/standards/<id>/` registry's
// `optionsForPayload()` array and produces a Payload `select` field. Use
// instead of inlining `options: [...]` per collection.
//
// `referenceField()` collapses the `reference: text/required/unique/indexed`
// pattern that recurs in 30+ collections.
//
// `legalEntityField()`, `countryCodeField()`, `naceCodeField()` collapse
// the three highest-frequency text-as-FK patterns.
//
// @standard ISO/IEC 25010:2023 quality-model maintainability-modularity
// @audit ISO-19011:2018 audit-trail registry-traceability

/**
 * Build a Payload `select` field driven by a standards-registry options
 * array. Pass any `*_OPTIONS` constant from `src/standards/<id>/index.ts`.
 *
 * @example
 *   taxonomySelect('scope', GHG_SCOPE_OPTIONS, { defaultValue: 'scope_1' })
 *   taxonomySelect('incoterms', INCOTERM_OPTIONS, { required: true })
 */
export const taxonomySelect = <T extends string>(
  name: string,
  options: ReadonlyArray<{ label: string; value: T }>,
  opts: {
    required?: boolean
    defaultValue?: T
    description?: string
    hasMany?: boolean
    index?: boolean
  } = {},
): Field =>
  // SelectField is discriminated on `hasMany`; a single spread-built literal
  // can't satisfy either union arm, so assert the assembled select field.
  ({
    name,
    type: 'select',
    ...(opts.required ? { required: true } : {}),
    ...(opts.defaultValue !== undefined ? { defaultValue: opts.defaultValue } : {}),
    ...(opts.hasMany ? { hasMany: true } : {}),
    ...(opts.index ? { index: true } : {}),
    options: options.map((o) => ({ label: o.label, value: o.value })),
    ...(opts.description ? { admin: { description: opts.description } } : {}),
  }) as Field
