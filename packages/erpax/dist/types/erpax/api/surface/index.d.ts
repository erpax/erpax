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
export declare const erpaxWikiParity: {
    readonly wiki: "https://wiki.erpax.com";
    readonly namespaces: {
        readonly admin: {
            readonly payloadAdminUi: "/admin";
            readonly restCollections: "/api/:collectionSlug";
            readonly graphql: "/api/graphql";
        };
        readonly sales: {
            readonly note: "Commerce data (orders, carts, products, users as customers) is exposed via Payload REST under /api and the ecommerce plugin collections.";
        };
        readonly client: {
            readonly tenantFrontends: readonly ["/tenant-slugs", "/tenant-domains"];
            readonly tenantLogin: "POST /api/users/external-users/login";
        };
        readonly system: {
            readonly health: "GET /next/system/health";
            readonly seed: "POST /next/seed (authenticated)";
            readonly preview: "GET /next/preview";
            readonly exitPreview: "GET /next/exit-preview";
            readonly stripeWebhook: "POST /webhooks";
        };
    };
};
export declare function erpaxApiDiscoveryPayload(): {
    wiki: string;
    namespaces: typeof erpaxWikiParity['namespaces'];
    generatedAt: string;
};
