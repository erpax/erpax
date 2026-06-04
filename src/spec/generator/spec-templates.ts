/**
 * Spec-template registry — every SpecXxx type from `types.ts` gets one
 * i18n template key, and every instance of that type renders by
 * substituting its fields into the template.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11). User insight: "if every type has
 * translation, types may be used to generate meaningful logical
 * captions." The Spec* types ARE the semantic vocabulary; their
 * translations should be templated by type, not free-form per
 * instance. This collapses the translator surface from "thousands of
 * one-off strings" to "~14 templates × N locales" and inherits
 * pluralisation / placeholder ordering automatically.
 *
 * Templates use Mustache-style `{{var}}` placeholders. A missing var
 * collapses to empty, and adjacent punctuation/whitespace is normalised
 * so a sparse instance still reads naturally.
 *
 * The default-English templates here are the seed values; the bundle
 * pipeline writes them into `messages/en.json` under
 * `spec-template.<kind>` and into other locales as `[en] …` stubs for
 * a translator pass.
 *
 * @standard ICU-MessageFormat (template grammar — adopted via Mustache)
 * @standard W3C i18n composable-translations
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 */

export type SpecTypeKind =
  | 'standard'
  | 'chain-step'
  | 'feature'
  | 'role'
  | 'emit'
  | 'subscribe'
  | 'example'
  | 'invariant'
  | 'use-case'
  | 'summary'
  | 'slice'
  | 'cron'
  | 'see'
  | 'collection-singular'
  | 'collection-plural'
  | 'collection-description'
  | 'chain-title'
  | 'chain-description'
  | 'workflow-title'
  | 'workflow-description'
  | 'workflow-video-caption'
  | 'workflow-step-caption'

/** Template registry — `kind → defaultEnglishTemplate`. */
export const SPEC_TEMPLATES: Record<SpecTypeKind, string> = {
  // ── Spec* type templates (composed at render time)
  'standard':       'Per {{body}} {{id}}{{#description}}: {{description}}{{/description}}',
  'chain-step':     'Step {{stepIndex}} of {{totalSteps}} — {{action}} the {{collectionLabel}}{{#description}}: {{description}}{{/description}}',
  'feature':        '{{label}}{{#tier}} (available on {{tier}} tier){{/tier}}',
  'role':           '{{roleLabel}} can {{access}}',
  'emit':           'Emits {{eventId}}{{#payloadDescription}} — {{payloadDescription}}{{/payloadDescription}}',
  'subscribe':      'Subscribes to {{eventId}}',
  'example':        'Worked example for {{chainTitle}} step {{stepIndex}}/{{totalSteps}}',
  'invariant':      'Invariant: {{predicate}}',
  'use-case':       '{{markdown}}',
  'summary':        '{{text}}',
  'slice':          'Introduced in slice {{sliceId}}',
  'cron':           'Runs on schedule: {{cron}}',
  'see':            'See: {{target}}',
  // ── Per-key templates (used when rendering bundle-keyed labels directly)
  'collection-singular':    '{{title}}',
  'collection-plural':      '{{plural}}',
  'collection-description': '{{description}}',
  'chain-title':            '{{title}}',
  'chain-description':      '{{description}}',
  'workflow-title':         '{{title}}',
  'workflow-description':   '{{title}} — process walk-through',
  'workflow-video-caption': 'Process walk-through',
  'workflow-step-caption':  'Step {{stepIndex}}: {{label}}',
}

/** Bundle key for a given template kind (e.g. `spec-template.chain-step`). */
export function templateKey(kind: SpecTypeKind): string {
  return `spec-template.${kind}`
}

/**
 * Compose a string by substituting `{{var}}` placeholders. Supports
 * conditional sections `{{#var}} … {{/var}}` (rendered only when the
 * variable is truthy). Adjacent whitespace and dangling punctuation
 * are squashed so sparse instances read naturally.
 */
export function compose(template: string, vars: Record<string, unknown>): string {
  // 1. Conditional sections {{#x}} … {{/x}}
  let out = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, key, body) => {
    const v = vars[key]
    return v === undefined || v === null || v === '' || v === false ? '' : body
  })
  // 2. Plain {{var}}
  out = out.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = vars[key]
    return v === undefined || v === null ? '' : String(v)
  })
  // 3. Squash duplicate whitespace and dangling punctuation
  out = out
    .replace(/\s+/g, ' ')
    .replace(/\s+([:.;,])/g, '$1')
    .replace(/([:—–-])\s*$/g, '')
    .replace(/^\s+|\s+$/g, '')
  return out
}

/** Pull all template keys (handy for the audit + stub-filler). */
export function allTemplateKeys(): ReadonlyArray<{ key: string; defaultEnglish: string; kind: SpecTypeKind }> {
  return (Object.keys(SPEC_TEMPLATES) as SpecTypeKind[])
    .map((kind) => ({ kind, key: templateKey(kind), defaultEnglish: SPEC_TEMPLATES[kind] }))
}
