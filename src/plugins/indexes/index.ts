/**
 * Indexes — two rules Payload's index documentation states, applied to every collection at once.
 *
 * 1. UNIQUE IS PER TENANT. `unique: true` on a field is a collection-wide database index: in a
 *    collection split by tenant it means two tenants cannot both have invoice number INV-1. For
 *    every tenant-scoped collection, a top-level unique field becomes a compound unique index
 *    with the tenant — `indexes: [{ fields: ['tenant', field], unique: true }]` — which is the
 *    rule that was meant. A collection that is not split by tenant keeps its unique fields.
 *    `uuid` stays collection-wide on purpose: a content address is the same everywhere.
 *
 * 2. THE TITLE IS INDEXED. A collection's `admin.useAsTitle` field is what the admin lists, sorts
 *    and searches by, and what every relationship picker looks up. It gets `index: true`.
 *
 * Put this after the multi-tenant plugin, so the `tenant` field exists. A unique field nested in
 * a group is left as it is — a compound index over a nested path is not something this handles —
 * and so is a LOCALIZED unique field: the SQL adapter refuses a compound index that mixes a
 * localized column with a non-localized one (the tenant).
 *
 * @see https://payloadcms.com/docs/database/indexes
 * @see src/utilities/tenants/scope.ts (which collections are split by tenant)
 */
import type { CollectionConfig, Config, Field, Plugin } from 'payload'

export interface IndexesOptions {
  /** The collections split by tenant. */
  readonly tenantScoped: readonly string[]
  /** The tenant field's name. */
  readonly tenantField?: string
  /** Unique fields that stay collection-wide. */
  readonly global?: readonly string[]
}

type Named = Field & { name: string; unique?: boolean; index?: boolean }
const named = (field: Field): field is Named => 'name' in field && typeof field.name === 'string'

/** One collection under the two rules. */
export const withIndexes = (collection: CollectionConfig, options: IndexesOptions): CollectionConfig => {
  const tenantField = options.tenantField ?? 'tenant'
  const keep = new Set([tenantField, ...(options.global ?? ['uuid'])])
  const scoped = options.tenantScoped.includes(collection.slug) && collection.fields.some((field) => named(field) && field.name === tenantField)
  const title = collection.admin?.useAsTitle
  const already = new Set((collection.indexes ?? []).map((index) => index.fields.join('+')))
  const compound: NonNullable<CollectionConfig['indexes']> = []

  const fields = collection.fields.map((field): Field => {
    if (!named(field)) return field
    // the SQL adapter cannot build one index across a localized and a non-localized column
    const localized = 'localized' in field && field.localized === true
    if (scoped && field.unique === true && !keep.has(field.name) && !localized) {
      if (!already.has(`${tenantField}+${field.name}`)) compound.push({ fields: [tenantField, field.name], unique: true })
      const { unique: _unique, index: _index, ...rest } = field
      return rest as Field
    }
    if (field.name === title && field.unique !== true && field.index !== true && !('virtual' in field && field.virtual)) return { ...field, index: true } as Field
    return field
  })

  return { ...collection, fields, ...(compound.length > 0 ? { indexes: [...(collection.indexes ?? []), ...compound] } : {}) }
}

export const indexesPlugin =
  (options: IndexesOptions): Plugin =>
  (config: Config): Config => ({ ...config, collections: (config.collections ?? []).map((collection) => withIndexes(collection, options)) })
