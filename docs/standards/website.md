# ERPax Website Standards — Deep Reference

Slice MMMMMM + slice MMMMMM-shadcn + slice VVVVVVVV (2026-05-11). The website layer at `src/services/website/` makes ERPax tangible — auto-seeds Payload's `pages` collection from e2e multimedia, spec corpus, and federation broadcasts; renders 12 interactive shadcn surfaces beyond Payload's admin reach.

> **Cross-reference**: top-level index at [README.md](./README.md); SEO coupling at [seo.md](./seo.md); MCP layer at [mcp.md](./mcp.md).

---

## 1. The marketing transparency strategy (per spec §0h)

> "ERPax marketing strategy is transparency without security compromise."

Every page is derived from one of three seed sources:

| `seedSource` | What it carries | ERPax module |
|---|---|---|
| `e2e-multimedia` | Playwright video / png / trace turned into HTML per locale (CCCCC-cut2) | `website/index.ts` (seedFromE2e) |
| `spec-corpus` | Every CollectionSpec / Chain / Agent / Role / Standard becomes a browsable Page | `website/index.ts` (seedFromSpec) |
| `federation` | Peer ERPax instances broadcast their pages via federation envelopes (AAAAAA) | `website/index.ts` (importMediaBundle) |

The transparency principle: **what ERPax does inside the platform is what ERPax shows on the outside.** Every collection, every chain, every agent, every conservation law has a public page derived from the same source-of-truth (JSDoc-as-spec). No marketing copy that diverges from the implementation.

## 2. Payload plugin stack

| Standard / plugin | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **@payloadcms/plugin-import-export** | Round-trip seeded pages | `payload.config.ts`, `website/index.ts` (exportMediaBundle) | `erpax.website.exportMediaBundle` |
| **@payloadcms/plugin-form-builder** | Interactive demos (try-the-MCP from a page form) | `payload.config.ts` | indirect |
| **@payloadcms/plugin-search** | Search the spec corpus + pages | `payload.config.ts` | indirect |
| **@payloadcms/plugin-seo** | Sitemap + per-page meta (rooted in `seo-vortex.ts`) | `payload.config.ts`, `website/seo-vortex.ts` | `erpax.seo.*` |
| **@payloadcms/plugin-mcp** | Exposes the 200+ `erpax.*` tools over MCP | `payload.config.ts`, `agents/mcp/tool-defs.ts` | every `erpax.*` |

## 3. shadcn/ui surface stack (per spec §0i)

> "And here you can use the whole power of shadcn for anything beyond payload."

Payload owns data + admin + lexical content; shadcn owns every interactive surface beyond it. Slice MMMMMM-shadcn declares 12 surfaces in `src/services/website/shadcn-components.ts`:

| Surface | Schema.org type | Key MCP tools wired |
|---|---|---|
| `mcp-playground` | `WebApplication` | `*` (every erpax.* — Cmd+K fuzzy search) |
| `conservation-dashboard` | `Dataset` | `erpax.standards.lawConsistency`, lifecycle audits |
| `spec-corpus-browser` | `Dataset` | `erpax.spec.{getCollection, getChainRegistry}`, `erpax.agents.list` |
| `tenant-role-activator` | `BuyAction` | `erpax.commerce.{checkout, provisionInstance}` |
| `federation-explorer` | `Dataset` | `erpax.platform.publishSelf`, `erpax.refs.resolve` |
| `audit-trail-viewer` | `Action` | `erpax.audit.getEvidence`, `erpax.integrity.verifyObject` |
| `cloning-ui` | `CreateAction` | `erpax.platform.{publishSelf, bootFromFederation}` |
| `stripe-checkout-embed` | `BuyAction` | `erpax.commerce.checkout`, `erpax.marketing.buildOnboardingDrip` |
| `standards-graph-viz` | `Dataset` | `erpax.standards.{listCitations, listConflicts, traceSupersession}` |
| `walkthrough-player` | `VideoObject` | `erpax.multimedia.render`, `erpax.marketing.transparencyCheck` |
| `i18n-coverage-heatmap` | `Dataset` | `erpax.i18n.{audit, translate}` |
| `cost-carbon-meter` | `Dataset` | `erpax.commerce.lifecycleAudit`, `erpax.accounting.lifecycleAudit` |

## 4. shadcn / Radix / Tailwind stack

| Standard / library | What it specifies | ERPax surface |
|---|---|---|
| **shadcn/ui (Radix UI + Tailwind CSS)** | Components are copied into the repo (not bundled); same pattern as ERPax design tokens | every `SiteSurface` |
| **W3C WAI-ARIA 1.2** | Radix handles keyboard nav + ARIA — WCAG 2.2 AA automatic for keyboard + screen reader | every surface |
| **WCAG 2.2 AA** | Colour contrast audited via Law 16 (tenant-role audit policy) | conservation-dashboard |

## 5. Web standards stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **W3C HTML5 § sectioning** | Page structure semantics | every rendered page |
| **W3C JSON-LD 1.1** | Per-page Schema.org carrier | `website/seo-vortex.ts` |
| **Open Graph protocol** | Social-share previews | `website/seo-vortex.ts` |
| **Schema.org Article + WebSite + SoftwareApplication** | Page typing | `website/index.ts`, `website/seo-vortex.ts` |
| **BCP-47** | hreflang per locale | `website/seo-vortex.ts` (validateMicrodata) |

## 6. ISO quality + audit stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **ISO/IEC 25010:2023 §5.3 usability — discoverability** | The 12 surfaces + the readiness manifest are the discoverability surface | `platform-readiness/index.ts`, `website/shadcn-components.ts` |
| **ISO 19011:2018 §6.4.6** | Every published page audit-trailed via the seedSource + contentUuid trail | `website/index.ts`, `website/seo-vortex.ts` |

## 7. Coupling with other slices

- **Slice CCCCC (JSDoc-as-spec)** — `seedFromSpec` reads the extracted corpus.
- **Slice CCCCC-cut2 (multimedia)** — `seedFromE2e` reads marketing/*.html generated from Playwright recordings.
- **Slice DDDDD (agent runtime)** — every agent has a page; agents register their MCP tool surface visible on the spec-corpus-browser.
- **Slice LLLLL (open tenant roles)** — tenant-role-activator surface walks every registered role.
- **Slice JJJJJJ (commerce / Stripe)** — stripe-checkout-embed + tenant-role-activator wire to `erpax.commerce.checkout` end-to-end.
- **Slice NNNNNN (SEO vortex, Law 29)** — every page becomes a `SeoVortexFace`; cross-linked into the platform's SEO graph.
- **Slice YYYYYY (MCP presentation)** — every MCP tool becomes a face; the playground surface renders them as Cmd+K-searchable inventory.

## 8. The closing transparency property

After all couplings: **every claim ERPax makes about itself has a public page derived from its own source code**. A regulator, customer, or AI agent can navigate from `/proof/` → standards → collections → agents → MCP tools → e2e walkthroughs → conservation laws → Trinity rollup, all on the same surface, all uuid-recoverable.

The shadcn 12 surfaces aren't decoration — they're the **interactive read-write face** of the spec corpus + MCP catalog.

## 9. Standards anchoring

@standard W3C HTML5 § sectioning
@standard W3C JSON-LD 1.1 + Schema.org Article + WebSite + SoftwareApplication
@standard Open Graph protocol
@standard shadcn/ui (Radix UI + Tailwind CSS)
@standard W3C WAI-ARIA 1.2 + WCAG 2.2 AA
@standard BCP-47 — language tags
@standard ISO/IEC 25010:2023 §5.3 usability
@standard ISO 19011:2018 §6.4.6 — page audit-trailed
@standard @payloadcms/plugin-{import-export, form-builder, search, seo, mcp}

## 10. Cross-reference — alphabetized

BCP-47, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.3, Open Graph protocol, Payload plugins (import-export, form-builder, search, seo, mcp), Schema.org (Article / Dataset / SoftwareApplication / WebSite / Action / CollectionPage / VideoObject / BuyAction / CreateAction), shadcn/ui (Radix UI + Tailwind CSS), W3C HTML5, W3C JSON-LD 1.1, W3C WAI-ARIA 1.2, WCAG 2.2 AA.
