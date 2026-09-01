// src/skill/wire/index.ts
var ERPAX_CANONICAL_REPO = "https://github.com/erpax/erpax";
var ERPAX_SKILL_ENTRY = ".claude/skills/SKILL.md";
var ERPAX_SKILL_ENTRY_ALT = "src/skills/SKILL.md";
var ERPAX_SKILL_ENTRY_CONTENT_UUID = "29c9640e-0e90-566b-96ac-988d0580776b";
var ERPAX_AGENT_SURFACES = [
  "AGENTS.md",
  "CLAUDE.md",
  ".github/copilot-instructions.md",
  "README.md",
  ".cursor/rules/erpax.mdc",
  ".well-known/ai-skills.json",
  "skills.json"
];
function normalizeErpaxRepoUrl(url) {
  const trimmed = url.trim().replace(/\/+$/, "").replace(/\.git$/i, "");
  if (/^(?:https?:\/\/)?github\.com\/erpax\/erpax(?:\/.*)?$/i.test(trimmed)) {
    return ERPAX_CANONICAL_REPO;
  }
  return null;
}
function wireFromRepoUrl(url) {
  const normalized = normalizeErpaxRepoUrl(url);
  if (!normalized) {
    return {
      ok: false,
      reason: `URL is not the canonical erpax repository (github.com/erpax/erpax). Paste or clone https://github.com/erpax/erpax \u2014 then open ${ERPAX_SKILL_ENTRY} (or ${ERPAX_SKILL_ENTRY_ALT} via the src/ face). Orientation: AGENTS.md.`
    };
  }
  return {
    ok: true,
    repoUrl: ERPAX_CANONICAL_REPO,
    entryPoint: ERPAX_SKILL_ENTRY,
    entryPointAlt: ERPAX_SKILL_ENTRY_ALT,
    contentUuid: ERPAX_SKILL_ENTRY_CONTENT_UUID,
    surfaces: [...ERPAX_AGENT_SURFACES]
  };
}
if (import.meta.url === "file://" + process.argv[1]) {
  const r = wireFromRepoUrl("https://github.com/erpax/erpax");
  console.log("skill/wire \u2014 entry: " + (r.ok ? r.entryPoint + " \xB7 " + r.contentUuid.slice(0, 8) + "\u2026" : r.reason));
}

// src/erpax/api/surface/index.ts
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
  ERPAX_AGENT_SURFACES,
  ERPAX_CANONICAL_REPO,
  ERPAX_SKILL_ENTRY,
  ERPAX_SKILL_ENTRY_ALT,
  ERPAX_SKILL_ENTRY_CONTENT_UUID,
  erpaxApiDiscoveryPayload,
  erpaxWikiParity,
  wireFromRepoUrl
};
