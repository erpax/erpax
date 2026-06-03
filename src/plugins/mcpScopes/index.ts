/**
 * MCP api-key scopes — collapse the materialized capability MATRIX to the cross.
 *
 * `@payloadcms/plugin-mcp` generates one boolean toggle COLUMN per
 * collection×operation on its api-keys collection (`<slug>.{create,find,update,
 * delete}`). At erpax's scale (~206 collections) that is ~824 columns on one
 * table — far over D1's 100-column cap, so the schema cannot regenerate. This is
 * the same materialized role×resource matrix the access cross collapses.
 *
 * The collapse (no security change): the plugin's handler reads each capability
 * OFF THE DOC OBJECT — `mcpAccessSettings[toCamelCase(slug)].create` etc. (see
 * getMcpHandler.js) — and registers a tool only if truthy; the actual operation
 * then runs under the key OWNER's PayloadRequest (access-gated, never widened).
 * So the toggles gate tool *availability*, and that shape can be supplied
 * VIRTUALLY in `afterRead` instead of stored as columns:
 *
 *   - strip the per-collection capability group fields (no stored columns);
 *   - store one compact `scopes` field (an optional deny-list);
 *   - in afterRead, populate `doc[camelCase(slug)] = {create,find,update,delete}`
 *     for every collection/global — default-open (the actor-merge "door opens
 *     onto everything"), narrowed by `scopes.deny`.
 *
 * Result: the api-keys table drops from ~825 columns to ~8; enforcement is
 * byte-identical (the handler reads the same shape); per-key narrowing survives,
 * compactly. The matrix became a cross.
 *
 * @standard ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)
 * @standard ISO/IEC 27001 §A.9.4.1 information access restriction
 * @see node_modules/@payloadcms/plugin-mcp/dist/mcp/getMcpHandler.js  (the reader)
 * @see src/access/cross/index.ts  the sibling matrix→cross collapse
 */
import type { CollectionAfterReadHook, CollectionConfig, Field } from 'payload'

/** Match `@payloadcms/plugin-mcp`'s toCamelCase EXACTLY (kebab/underscore/space → camel). */
export const toCamelCase = (str: string): string =>
  str
    .replace(/[-_\s]+(.)?/g, (_m, chr: string | undefined) => (chr ? chr.toUpperCase() : ''))
    .replace(/^(.)/, (_m, chr: string) => chr.toLowerCase())

const COLLECTION_OPS = ['create', 'find', 'update', 'delete'] as const
const GLOBAL_OPS = ['find', 'update'] as const

/** A compact, optional per-key narrowing: deny entries are `slug` (all ops) or `slug:op`. */
interface ApiKeyScopes {
  readonly deny?: ReadonlyArray<string>
}

const isDenied = (scopes: ApiKeyScopes | undefined, slug: string, op: string): boolean => {
  const deny = scopes?.deny
  return Array.isArray(deny) && (deny.includes(slug) || deny.includes(`${slug}:${op}`))
}

/** The capability object the plugin reads — default-open, narrowed by `scopes.deny`. */
export const capabilitiesFor = (
  scopes: ApiKeyScopes | undefined,
  slug: string,
  ops: ReadonlyArray<string>,
): Record<string, boolean> => {
  const caps: Record<string, boolean> = {}
  for (const op of ops) caps[op] = !isDenied(scopes, slug, op)
  return caps
}

/**
 * Reshape the plugin's api-keys collection: drop the stored capability matrix,
 * keep base/auth/meta fields, add the compact `scopes` field, and populate the
 * capability shape virtually on read.
 */
export const collapseApiKeyScopes = (collection: CollectionConfig): CollectionConfig => {
  // The generated capability fields are `collapsible` wrappers each holding a
  // `group` named camelCase(slug) (createApiKeyFields.js), plus the custom/
  // experimental capability collapsibles. Every base/auth/meta field is a
  // relationship/text (user, label, description) — never group/collapsible. So
  // strip group + collapsible: those are recomputed in afterRead, never stored.
  const CAPABILITY_CONTAINER_TYPES = new Set(['group', 'collapsible'])
  const baseFields = (collection.fields ?? []).filter(
    (f) => !CAPABILITY_CONTAINER_TYPES.has((f as { type?: string }).type ?? ''),
  )

  const scopesField: Field = {
    name: 'scopes',
    type: 'json',
    admin: {
      description:
        'Optional per-key narrowing: { "deny": ["invoices", "orders:delete"] } disables those capabilities; absent ⇒ all the owner can reach. The full collection×operation matrix is computed on read (never stored — D1 100-col cap).',
    },
  }

  const expandCapabilities: CollectionAfterReadHook = ({ doc, req }) => {
    if (!doc || typeof doc !== 'object') return doc
    const d = doc as Record<string, unknown>
    const scopes = d.scopes as ApiKeyScopes | undefined
    for (const c of req.payload.config.collections) {
      if (c.slug === collection.slug) continue // never gate the key collection on itself
      d[toCamelCase(c.slug)] = capabilitiesFor(scopes, c.slug, COLLECTION_OPS)
    }
    for (const g of req.payload.config.globals ?? []) {
      d[toCamelCase(g.slug)] = capabilitiesFor(scopes, g.slug, GLOBAL_OPS)
    }
    return doc
  }

  return {
    ...collection,
    fields: [...baseFields, scopesField],
    hooks: {
      ...collection.hooks,
      afterRead: [...(collection.hooks?.afterRead ?? []), expandCapabilities],
    },
  }
}
