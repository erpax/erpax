/**
 * Forms — a collection's field list as DATA: a `@payloadcms/plugin-form-builder` form.
 *
 * The form builder is the one standard Payload package where the SCHEMA itself is data: a `forms`
 * document lists the fields, `form-submissions` holds the records, and the multi-tenant plugin
 * splits both by tenant. So a collection that is only a field list — no hooks of its own, no code
 * reading it — can in principle be served as a seeded form instead of a table.
 *
 * `formOf` does that conversion and is honest about its limits: for every field it says whether
 * the form carries it as it was (`kept`), carries it with something missing (`degraded`), or
 * cannot carry it at all (`lost`). It is a pure function over a collection config; it reads and
 * writes nothing.
 *
 * What the form builder can hold: text, textarea, number, email, checkbox, date, select, radio,
 * upload — each with a name, a label, `required` and a static default. A group is flattened into
 * its fields. What it cannot: a relationship (there is no reference to another document), an
 * array or blocks (no repeating rows), JSON, rich text as anything but plain text, and every
 * rule that is not "required": unique, min / max, a validate function, field access, hooks.
 *
 * @standard ISO/IEC-25012:2008 data-quality — what a conversion preserves is stated, not assumed
 * @see https://payloadcms.com/docs/plugins/form-builder
 * @see src/seed/contact/form.ts (a seeded form, the shape produced here)
 */
import type { CollectionConfig, Field } from 'payload'

/** The form builder's own field blocks. */
export type FormBlockType = 'text' | 'textarea' | 'number' | 'email' | 'checkbox' | 'date' | 'select' | 'radio' | 'upload'

export interface FormBlock {
  blockType: FormBlockType
  name: string
  blockName: string
  label: string
  required: boolean
  width: number
  defaultValue?: string | number | boolean
  options?: Array<{ label: string; value: string }>
}

export type Fate = 'kept' | 'degraded' | 'lost'

export interface FieldReport {
  /** The field's path in the collection, dotted through groups. */
  readonly path: string
  readonly type: string
  readonly fate: Fate
  /** What the form does not carry for this field; empty when it is kept whole. */
  readonly missing: readonly string[]
}

export interface FormOf {
  readonly form: { title: string; fields: FormBlock[] }
  readonly report: readonly FieldReport[]
  readonly kept: number
  readonly degraded: number
  readonly lost: number
}

/** Payload field types the form builder has a block for. */
const DIRECT: Partial<Record<string, FormBlockType>> = {
  text: 'text',
  textarea: 'textarea',
  number: 'number',
  email: 'email',
  checkbox: 'checkbox',
  date: 'date',
  select: 'select',
  radio: 'radio',
  upload: 'upload',
}

/** Types that have no block but can be carried as plain text, losing their structure. */
const AS_TEXT: Partial<Record<string, { block: FormBlockType; missing: string }>> = {
  richText: { block: 'textarea', missing: 'rich-text formatting (stored as plain text)' },
  code: { block: 'textarea', missing: 'code editing and language' },
  point: { block: 'text', missing: 'the coordinate type (stored as text)' },
}

const labelOf = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())

/** The rules a Payload field can carry that a form field cannot. */
const rulesLost = (field: Record<string, unknown>): string[] => {
  const missing: string[] = []
  if (field.unique === true) missing.push('unique')
  if (field.min !== undefined || field.max !== undefined) missing.push('min / max')
  if (field.minLength !== undefined || field.maxLength !== undefined) missing.push('length limits')
  if (typeof field.validate === 'function') missing.push('a validate function')
  if (field.access !== undefined) missing.push('field access')
  if (field.hooks !== undefined) missing.push('field hooks')
  if (field.localized === true) missing.push('localization')
  if (field.hasMany === true) missing.push('multiple values')
  if (typeof field.defaultValue === 'function') missing.push('a computed default')
  const admin = field.admin as { condition?: unknown; readOnly?: unknown } | undefined
  if (typeof admin?.condition === 'function') missing.push('a display condition')
  if (admin?.readOnly === true) missing.push('read-only')
  return missing
}

const optionsOf = (field: Record<string, unknown>): Array<{ label: string; value: string }> =>
  ((field.options as Array<string | { label?: unknown; value: string }> | undefined) ?? []).map((option) =>
    typeof option === 'string' ? { label: labelOf(option), value: option } : { label: typeof option.label === 'string' ? option.label : labelOf(option.value), value: option.value },
  )

const walk = (fields: readonly Field[], prefix: string, blocks: FormBlock[], report: FieldReport[]): void => {
  for (const raw of fields) {
    const field = raw as unknown as Record<string, unknown> & { type: string; name?: string; fields?: Field[]; tabs?: Array<{ name?: string; fields: Field[] }> }
    // containers with no name add no path segment; a group or a named tab flattens into its fields
    if (field.type === 'row' || field.type === 'collapsible') {
      walk(field.fields ?? [], prefix, blocks, report)
      continue
    }
    if (field.type === 'tabs') {
      for (const tab of field.tabs ?? []) walk(tab.fields, tab.name ? `${prefix}${tab.name}.` : prefix, blocks, report)
      continue
    }
    if (field.type === 'ui' || field.name === undefined) continue
    const path = `${prefix}${field.name}`
    if (field.type === 'group') {
      walk(field.fields ?? [], `${path}.`, blocks, report)
      continue
    }

    const direct = DIRECT[field.type]
    const asText = AS_TEXT[field.type]
    if (!direct && !asText) {
      const why =
        field.type === 'relationship' ? 'a reference to another document'
        : field.type === 'join' ? 'a computed list of related documents'
        : field.type === 'array' || field.type === 'blocks' ? 'repeating rows'
        : field.type === 'json' ? 'structured JSON'
        : `the ${field.type} type`
      report.push({ path, type: field.type, fate: 'lost', missing: [why] })
      continue
    }

    const missing = [...(asText ? [asText.missing] : []), ...rulesLost(field)]
    const block: FormBlock = {
      blockType: (direct ?? asText!.block) as FormBlockType,
      name: path.replace(/\./g, '_'),
      blockName: path.replace(/\./g, '_'),
      label: typeof field.label === 'string' ? field.label : labelOf(field.name),
      required: field.required === true,
      width: 100,
    }
    const fallback = field.defaultValue
    if (typeof fallback === 'string' || typeof fallback === 'number' || typeof fallback === 'boolean') block.defaultValue = fallback
    if (block.blockType === 'select' || block.blockType === 'radio') block.options = optionsOf(field)
    blocks.push(block)
    report.push({ path, type: field.type, fate: missing.length === 0 ? 'kept' : 'degraded', missing })
  }
}

/** A collection's field list as a form-builder form, with what each field keeps and loses. */
export const formOf = (collection: Pick<CollectionConfig, 'slug' | 'fields'> & { labels?: CollectionConfig['labels'] }): FormOf => {
  const blocks: FormBlock[] = []
  const report: FieldReport[] = []
  walk(collection.fields, '', blocks, report)
  const plural = collection.labels?.plural
  const count = (fate: Fate): number => report.filter((r) => r.fate === fate).length
  return {
    form: { title: typeof plural === 'string' ? plural : labelOf(collection.slug), fields: blocks },
    report,
    kept: count('kept'),
    degraded: count('degraded'),
    lost: count('lost'),
  }
}

/** Does the whole collection survive as a form — every field kept exactly as it was? */
export const survives = (result: FormOf): boolean => result.lost === 0 && result.degraded === 0
