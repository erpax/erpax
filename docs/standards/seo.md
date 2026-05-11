# ERPax SEO Standards — Deep Reference

Slice NNNNNN + slice VVVVVVVV (2026-05-11). The SEO layer at `src/services/website/seo-vortex.ts` treats SEO as a **coupled vortex system parallel to the 10 architectural vortices** — not as metadata-on-pages. Every published face has a Schema.org type, an Open Graph card, a content-uuid bitemporal anchor, BCP-47 hreflang variants, and outbound microdata edges. Conservation Law 29 governs the coupling. Trinity collapse (slice JJJJJJJJ) places it at **Law I (Identity)** because each face's contentUuid is the load-bearing primitive.

> **Cross-reference**: top-level index at [README.md](./README.md); MCP layer at [mcp.md](./mcp.md); UUID foundation at [integrity.md](./integrity.md); streams (bitemporal evolution) at [streams.md](./streams.md).

---

## 1. SEO as vortices (per spec §0h)

> "ERPax SEO strategy is microdata + OG vortices indexed and linked in time interacting with each other."

Each `SeoVortexFace` carries:

| Property | Source | Vortex coupling |
|---|---|---|
| `schemaType` + `ogType` | Derived from PageSeed axis (collection / chain / agent / role / standard / walkthrough) | Classifies by domain vortex (A) |
| `contentUuid` | Tamper-proof uuid of the rendered HTML (Law 8 — RRRRR) | Binds to integrity vortex (F) |
| `previousContentUuids` | Bitemporal trail — old uuids 301-redirect to canonical | Binds to time vortex (B + Law 11) |
| `hreflang` | Every supported locale URL (BCP-47) | Binds to i18n vortex (Law 3) |
| `outgoing` edges | `isPartOf` / `mentions` / `cites` / `derivedFrom` / `hasPart` | The SEO citation graph |
| `incoming` edges | Populated by `crossLink()` from peers' `outgoing` | Force-directed coupling |

## 2. Schema.org vocabulary stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **Schema.org WebPage** | Default face type for plain content | `website/seo-vortex.ts` (SchemaType union) | `erpax.seo.renderJsonLd` |
| **Schema.org Article** | Page faces with editorial content | `website/seo-vortex.ts` | `erpax.seo.renderJsonLd` |
| **Schema.org SoftwareApplication** | Surfaces representing applications (the /mcp/ root) | `agents/mcp/presentation.ts` | `erpax.platform.registerAsSeoFaces` |
| **Schema.org Dataset** | Standards bundles + DRY-proof bundles | `proof/dry-proof.ts`, `standardization.ts` | `erpax.platform.{dryProofGet, standardsBundle}` |
| **Schema.org Organization** | Tenant / sovereign profile faces | `website/seo-vortex.ts` | `erpax.seo.renderJsonLd` |
| **Schema.org Action** | Each MCP tool (slice YYYYYY) | `agents/mcp/presentation.ts` | `erpax.platform.toolAsAction` |
| **Schema.org TechArticle** | Spec corpus pages (collections / chains) | `website/index.ts` (seedFromSpec) | `erpax.website.seedFromSpec` |
| **Schema.org CollectionPage** | MCP areas + standards families | `agents/mcp/presentation.ts` | `erpax.platform.areaAsPage` |

## 3. Web platform stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **W3C JSON-LD 1.1** | Typed Schema.org carrier | `website/seo-vortex.ts` (renderJsonLd) | `erpax.seo.renderJsonLd` |
| **W3C Microdata 1.1** | Inline microdata format (alternative carrier) | `website/seo-vortex.ts`, `agents/mcp/presentation.ts` | `erpax.seo.renderJsonLd` |
| **Open Graph protocol** | Social-share preview meta | `website/seo-vortex.ts` (renderOgMeta) | `erpax.seo.renderOgMeta` |
| **Twitter Cards** | Twitter analog of Open Graph | `website/seo-vortex.ts`, `agents/mcp/presentation.ts` | `erpax.platform.toolHead` |
| **Sitemap.xml protocol 0.9** | URL set + xhtml:link alternates per locale | `website/seo-vortex.ts` (generateSitemap) | `erpax.seo.generateSitemap` |
| **RFC 9694 — robots.txt + REP** | Opt-in for ClaudeBot / GPTBot / Google-Extended | `website/seo-vortex.ts` (generateRobots) | `erpax.seo.generateRobots` |
| **BCP-47 — language tags** | hreflang validity per face | `website/seo-vortex.ts` (validateMicrodata) | `erpax.seo.validateMicrodata` |

## 4. Conservation law

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **29** | SEO vortex coupling | Every published face has ≥2 inbound + ≥2 outbound microdata edges; isolated pages dilute the vortex | **I** (Identity) |

Refuse to publish under-coupled faces unless `scope: 'pending-coupling'` is explicit (e.g. brand-new entity that hasn't accumulated citers yet).

## 5. Bitemporal SEO

When a page's content-uuid changes (Law 8 — RRRRR), `bitemporalAnchor({url, oldUuid, newUuid})` records the previous uuid in `previousContentUuids`. The page rendering layer:

1. Emits HTTP 301 from the old-uuid-suffixed URL to the canonical URL.
2. Bumps `og:updated_time` so federation peers + search engines see the temporal evolution.
3. Registers the change as a `PROV:wasRevisionOf` edge in the audit trail (Law 12 W3C-PROV alignment).

The result: the SEO graph is **time-aware** — search engines crawl historical states; AI training crawlers (ClaudeBot, GPTBot, Google-Extended) get the canonical evolving artefact instead of stale snapshots.

## 6. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.seo.registerFace` | Register a face for a published page |
| `erpax.seo.crossLink` | Build the citation graph — populate incoming from peers' outgoing |
| `erpax.seo.renderJsonLd` | Render Schema.org JSON-LD `<script>` for a face |
| `erpax.seo.renderOgMeta` | Render Open Graph + Twitter + alternate hreflang meta |
| `erpax.seo.generateSitemap` | Emit `sitemap.xml` for every registered face |
| `erpax.seo.generateRobots` | Emit `robots.txt` opening spec/audit + opt-in AI crawlers |
| `erpax.seo.checkCoupling` | Conservation Law 29 verdict |
| `erpax.seo.bitemporalAnchor` | Record uuid evolution → 301 + og:updated_time bump |
| `erpax.seo.validateMicrodata` | BCP-47 hreflang + Schema.org-required fields + no orphan edges |

## 7. Coupling with other slices

- **Slice RRRRR (Law 8)** — every face's `contentUuid` is the load-bearing primitive.
- **Slice MMMMMM (interactive website)** — every Payload Page becomes a face; spec primitives (collections / chains / agents / roles / standards) seed faces automatically.
- **Slice MMMMMM-shadcn** — the 12 shadcn site surfaces each register as faces with their Schema.org type.
- **Slice YYYYYY (MCP presentation)** — every MCP tool becomes an Action face; tools + areas + root form a cross-linked subgraph in the same SEO vortex.
- **Slice AAAAAA (federation)** — faces broadcast across peer instances; cross-tenant cross-link enabled.
- **Slice DDDDDDD (DRY-proof)** — the public proof `/proof/` registers as a Dataset face with `derivedFrom` → spec corpus + `isPartOf` → MCP root.

## 8. Standards anchoring

@standard Schema.org WebPage / Article / SoftwareApplication / Dataset / Organization / Action / TechArticle / CollectionPage
@standard W3C JSON-LD 1.1 + W3C Microdata 1.1
@standard Open Graph protocol + Twitter Cards
@standard Sitemap.xml protocol 0.9
@standard RFC 9694 — robots.txt + REP
@standard BCP-47 — language tags
@standard ISO/IEC 25010:2023 §5.3 usability — discoverability
@standard ISO 19011:2018 §6.4.6 — every SEO artefact audit-trailed

## 9. Cross-reference — alphabetized

BCP-47, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.3, Open Graph protocol, RFC 9694, Schema.org (Action / Article / CollectionPage / Dataset / Organization / SoftwareApplication / TechArticle / WebPage), Sitemap.xml protocol 0.9, Twitter Cards, W3C JSON-LD 1.1, W3C Microdata 1.1, W3C PROV-DM (bitemporal edges).
