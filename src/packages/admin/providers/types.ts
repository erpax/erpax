/**
 * The shape of a provider adapter. Kept apart from ./index so an adapter can import it without
 * importing the registry that imports the adapter.
 */

/** Where a provider's property lives in Payload (`collection.path`), or why it does not apply. */
export type Target = string | { readonly na: string }

export interface Resource {
  /** The resource's name in the provider's own schema. */
  readonly schema: string
  /** Set when the whole resource does not apply, with the reason. */
  readonly na?: string
  readonly fields: Readonly<Record<string, Target>>
}

export interface Provider {
  readonly slug: string
  readonly title: string
  /** Where the vendored schema came from. */
  readonly source: string
  readonly schemas: Readonly<Record<string, { readonly properties?: Readonly<Record<string, unknown>> }>>
  readonly resources: readonly Resource[]
  /** Envelope properties every resource carries and no document stores (`kind`, `etag`, links). */
  readonly ignore?: readonly string[]
}

/** Mark several properties as not applicable for one reason. */
export const na = (reason: string, ...properties: string[]): Record<string, Target> => Object.fromEntries(properties.map((property) => [property, { na: reason }]))
