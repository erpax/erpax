/**
 * Maps the [ERPax product wiki](https://wiki.erpax.com) logical API layers to
 * this Payload + Next app. For discovery and documentation; not the runtime
 * auth/routing source of truth.
 *
 * Timestamps emitted from this module use ISO 8601 (extended profile, RFC 3339)
 * via `Date.prototype.toISOString()`. Path strings follow RFC 3986 §3.3.
 *
 * @rfc 3986 uri syntax-of-paths
 * @rfc 3339 date-and-time-on-the-internet
 * @standard ISO-8601:2019 date-and-time-extended-format
 * @see docs/STANDARDS.md §4.3
 */
export const erpaxWikiParity = {
  wiki: 'https://wiki.erpax.com',
  namespaces: {
    admin: {
      payloadAdminUi: '/admin',
      restCollections: '/api/:collectionSlug',
      graphql: '/api/graphql',
    },
    sales: {
      note:
        'Commerce data (orders, carts, products, users as customers) is exposed via Payload REST under /api and the ecommerce plugin collections.',
    },
    client: {
      tenantFrontends: ['/tenant-slugs', '/tenant-domains'],
      tenantLogin: 'POST /api/users/external-users/login',
    },
    system: {
      health: 'GET /next/system/health',
      seed: 'POST /next/seed (authenticated)',
      preview: 'GET /next/preview',
      exitPreview: 'GET /next/exit-preview',
      stripeWebhook: 'POST /webhooks',
    },
  },
} as const

export function erpaxApiDiscoveryPayload(): {
  wiki: string
  namespaces: typeof erpaxWikiParity['namespaces']
  generatedAt: string
} {
  return {
    wiki: erpaxWikiParity.wiki,
    namespaces: erpaxWikiParity.namespaces,
    generatedAt: new Date().toISOString(),
  }
}
