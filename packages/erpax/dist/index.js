// src/utilities/erpax/api/surface/index.ts
var erpaxWikiParity = {
  wiki: "https://wiki.erpax.com",
  namespaces: {
    admin: {
      payloadAdminUi: "/admin",
      restCollections: "/api/:collectionSlug",
      graphql: "/api/graphql"
    },
    sales: {
      note: "Commerce data (orders, carts, products, users as customers) is exposed via Payload REST under /api and the ecommerce plugin collections."
    },
    client: {
      tenantFrontends: ["/tenant-slugs", "/tenant-domains"],
      tenantLogin: "POST /api/users/external-users/login"
    },
    system: {
      health: "GET /next/system/health",
      seed: "POST /next/seed (authenticated)",
      preview: "GET /next/preview",
      exitPreview: "GET /next/exit-preview",
      stripeWebhook: "POST /webhooks"
    }
  }
};
function erpaxApiDiscoveryPayload() {
  return {
    wiki: erpaxWikiParity.wiki,
    namespaces: erpaxWikiParity.namespaces,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
export {
  erpaxApiDiscoveryPayload,
  erpaxWikiParity
};
