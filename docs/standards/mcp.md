# ERPax MCP Standards — Deep Reference

Slice QQQQQQQQ (2026-05-11). Comprehensive reference for every standard ERPax cites within its MCP (Model Context Protocol) surface — the layer at `src/services/agents/mcp/`.

This document maps **standard → ERPax module(s) that implement / cite it → which MCP tools surface it**. Every claim ERPax's MCP layer makes traces back to a published standard; this reference is the audit trail.

> **Cross-reference**: The 8 MCP self-properties (Discoverable / Self-built / Self-standardized / Self-presented / Self-rebuildable / Self-testable / Self-proving / Self-DRY-cleaning) are covered in spec §0p–§0w + §0ae. Conservation Laws 37–41, 44, 50 govern the MCP layer specifically.

---

## 1. Core MCP protocol

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **MCP 0.6 — Model Context Protocol** | `tools/list` + `tools/call` + `resources/list` + `resources/read` + `prompts/list` + `prompts/get` + `sampling/createMessage` | `src/services/agents/mcp/tool-defs.ts`, `resource-defs.ts`, `prompt-defs.ts`, `in-process-client.ts` | every `erpax.*.*` tool |
| **MCP 0.6 — tools/list naming convention** | tool ids namespaced by host; per-host area taxonomy encouraged | `src/services/agents/mcp/standardization.ts` (CANONICAL_AREAS) | `erpax.platform.standardization`, `erpax.platform.canonicalAreas` |
| **MCP 0.6 — tools/call result shape** | `{ content: [{ type, text \| imageData \| ... }] }` | `tool-defs.ts` (text + json helpers) | every tool returns this shape |
| **MCP 0.6 — tools/list (rebuild extension)** | implicit: clients can re-read tools/list to detect drift | `rebuild-from-source.ts` | `erpax.platform.rebuildFromSource`, `rebuildExpected`, `rebuildDrift`, `rebuildSkeleton`, `checkRebuildable` |
| **MCP 0.6 — tools/list (presentation extension)** | implicit: tool descriptions are human-readable + may carry markup | `presentation.ts` | `erpax.platform.toolAsAction`, `toolAsOg`, `toolHead`, `areaAsPage`, `registerAsSeoFaces` |
| **MCP 0.6 — tools/list (self-test extension)** | implicit: tool params have schemas → smoke-testable from synthetic args | `self-test.ts` | `erpax.platform.selfTestAll`, `selfTestOne`, `checkSelfTestable` |

## 2. JSON / serialization stack

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **RFC 8259 — JSON** | The data interchange format every MCP message uses | `tool-defs.ts` json() helper, `presentation.ts` JSON-LD output | every tool emits JSON-encoded text |
| **RFC 8785 — JCS (JSON Canonicalization Scheme)** | Canonical byte representation enabling content-uuid stability | `src/services/integrity/content-uuid.ts` (jcsCanonicalize), `voting/index.ts` (exportBallotBundle) | `erpax.integrity.computeTypeUuid`, `erpax.voting.exportBallotBundle` |
| **W3C JSON-LD 1.1** | JSON for Linked Data — typed identifiers, contexts, relationships | `presentation.ts` (Schema.org Action JSON-LD), `standardization.ts` (standards bundle), `proof/dry-proof.ts` (proof bundle) | `erpax.platform.{toolAsAction, standardsBundle}`, `erpax.platform.dryProof*` |
| **W3C JSON Schema (draft 2020-12)** | Structural type descriptors, used for type-uuid derivation | `src/services/integrity/type-uuid.ts` (TypeDescriptor mirrors JSON Schema) | `erpax.integrity.{computeTypeUuid, registerType, verifyType}` |

## 3. Identity / content addressing

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | Name-based UUIDs derived from a namespace + canonical bytes via SHA-1 (ERPax substitutes SHA-256 per FIPS 180-4) | `content-uuid.ts`, `type-uuid.ts`, `uuid-stream.ts`, `uuid-short.ts` | `erpax.integrity.{verifyObject, computeTypeUuid, shortUuid}` |
| **FIPS 180-4 — SHA-256** | The hash function backing the uuid derivation | `content-uuid.ts` (Node's createHash), `streams/index.ts` (streamUuid hash-chain) | indirectly via every uuid-emitting tool |
| **NIST SP 800-208 — stateful hash-based signatures** | Future: PQC signatures over content uuids | `src/services/beyond/pqc.ts` (slice ZZZZZ Law 18) | `erpax.beyond.pqcSignature` |
| **W3C VC Data Model 2.0** | Verifiable claims: every MCP tool is an Action that can carry verifiable provenance | `presentation.ts` (Action), `proof/dry-proof.ts` (proof-as-VC) | `erpax.platform.{toolAsAction, dryProofPublish}` |

## 4. Open Graph / Schema.org / SEO

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **Schema.org Action vocabulary** | Each MCP tool is a Schema.org `Action` with EntryPoint + actionStatus + category | `presentation.ts` (mcpToolAsAction) | `erpax.platform.toolAsAction` |
| **Schema.org Dataset** | DRY-proof bundle + standards-bundle are typed Datasets | `proof/dry-proof.ts`, `standardization.ts` | `erpax.platform.{dryProofGet, standardsBundle}` |
| **Schema.org SoftwareApplication** | The `/mcp/` root face is a SoftwareApplication | `presentation.ts` (registerAllMcpFaces) | `erpax.platform.registerAsSeoFaces` |
| **Schema.org CollectionPage** | Each MCP area (`mcp/area/<area>`) is a CollectionPage | `presentation.ts` (areaAsCollectionPage) | `erpax.platform.areaAsPage` |
| **W3C Microdata 1.1** | Inline microdata format (an alternative carrier of the same Schema.org types) | `presentation.ts`, `website/seo-vortex.ts` | `erpax.platform.toolHead`, `erpax.seo.renderJsonLd` |
| **Open Graph protocol (Facebook 2010+)** | Social-share preview meta — every tool gets a shareable card | `presentation.ts` (mcpToolAsOg) | `erpax.platform.toolAsOg`, `erpax.platform.toolHead` |
| **Twitter Cards** | Twitter's analog of Open Graph | `presentation.ts` (renderToolHead) | `erpax.platform.toolHead` |
| **Sitemap.xml protocol 0.9** | The MCP catalog can be exposed as a per-tool URL set in sitemap.xml | `website/seo-vortex.ts` (generateSitemap) | `erpax.seo.generateSitemap` |
| **RFC 9694 — robots.txt + REP** | The MCP surface is opened to ClaudeBot / GPTBot / Google-Extended | `website/seo-vortex.ts` (generateRobots) | `erpax.seo.generateRobots` |
| **BCP-47 — language tags** | hreflang on per-tool / per-area / per-page faces | `website/seo-vortex.ts`, `presentation.ts` | every `erpax.seo.*` + `presentation` tool |

## 5. Quality + audit standards

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **ISO/IEC 25010:2023 §5.2 performance** | Resource envelope discipline (Trinity Law III) | `topology/torus.ts`, `streams/index.ts` | `erpax.platform.{torusTopology, checkTorusBounded}` |
| **ISO/IEC 25010:2023 §5.3 usability — discoverability** | The readiness manifest IS the discoverability surface | `platform-readiness/index.ts` | `erpax.platform.{readiness, toolCatalog}` |
| **ISO/IEC 25010:2023 §5.4 reusability** | DRY by detection (Law 50) + generator-set Trinity (3 over 52) | `agents/mcp/dry-clean.ts`, `architecture-invariants/trinity.ts` | `erpax.platform.{dryCleanScan, trinity}` |
| **ISO/IEC 25010:2023 §5.5 testability** | Self-test smoke probe on every tool | `agents/mcp/self-test.ts` | `erpax.platform.{selfTestAll, selfTestOne}` |
| **ISO/IEC 25010:2023 §5.6 security — non-repudiation** | Vote signatures + content-uuid integrity | `voting/index.ts`, `content-uuid.ts` | `erpax.voting.castVote`, `erpax.integrity.verifyObject` |
| **ISO/IEC 25010:2023 §5.7 modularity** | 10 dimensional plugins; per-area MCP grouping | `plugins/dimensions.ts`, `agents/mcp/standardization.ts` | `erpax.platform.{dimensions, toolsByArea}` |
| **ISO/IEC/IEEE 29119-2 — software testing process** | The self-test framework's classification (pass/skip/fail) | `agents/mcp/self-test.ts` | `erpax.platform.selfTestAll` |
| **ISO 19011:2018 §6.4.6 — audit-evidence + traceability** | Every MCP operation audit-trailed; standards lexicon enforces traceability | `architecture-invariants/checks.ts`, every MCP file's banner | implicit in every tool handler |
| **ISO/IEC 27001 §A.9.4.5 — information access restriction** | Short uuids in UI (Law 46); full uuids reserved for verification | `integrity/uuid-short.ts` | `erpax.integrity.{shortUuid, displayUuid, lookupShortUuid}` |
| **ISO/IEC 27040:2024 — storage security** | Storage-independence + replication guarantees (Laws 35+36) | `storage-independence/index.ts` | `erpax.storage.{verifyAcrossBackends, replicate, consensusRead}` |
| **ISO/IEC 30134 — KPIs for resource efficiency** | Cost + carbon caps (Laws 15+16) feed the torus envelope (Law 43) | `topology/torus.ts`, `beyond/cost.ts`, `beyond/carbon.ts` | `erpax.platform.checkTorusBounded` |

## 6. Streams / time / order

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **Lamport 1978 — distributed-system causal ordering** | Lamport clock per stream event; window-coherence verification | `streams/index.ts` (ClockedEvent) | `erpax.streams.{checkCoherence, probeWindow}` |
| **W3C Streams API + ReactiveX** | AsyncIterable surface for `EventStream` | `streams/index.ts` | `erpax.streams.tumblingDemo` |
| **W3C PROV-DM** | Per-event provenance attribution (Law 12) | `beyond/provenance.ts`, `audit-trail` collections | implicit; auditable via `erpax.audit.getEvidence` |

## 7. Web platform / PWA

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **W3C Service Workers** | Cache + sync queue + push entry-point for the PWA layer | `pwa/index.ts` | `erpax.pwa.cacheAsset`, `enqueueMutation` |
| **W3C Web App Manifest** | The PWA's identity + icons + display mode; ERPax wraps in a content-uuid envelope | `pwa/index.ts` (publishManifest) | `erpax.pwa.{publishManifest, verifyManifest}` |
| **W3C Push API + W3C Notifications API** | Push notifications dedup'd by uuid | `pwa/index.ts` (preparePush, dedupPush) | `erpax.pwa.{preparePush, dedupPush}` |
| **W3C Cache API** | The asset cache uuid-keyed (no manual cache-busting) | `pwa/index.ts` (cacheAsset) | `erpax.pwa.{cacheAsset, listCachedAssets, evictAsset}` |
| **W3C IndexedDB 3.0 + W3C OPFS** | Underlying browser storage backends; quota tracked via totalCachedBytes | `pwa/index.ts` (totalCachedBytes) | `erpax.pwa.totalCachedBytes` |

## 8. Topology / closure

| Standard | What it specifies | ERPax module | MCP tools |
|---|---|---|---|
| **Topology — torus / closed manifold (Hatcher 2002)** | The 11-vertex / 14-edge closed loop ERPax + MCP forms | `topology/torus.ts` | `erpax.platform.{torusTopology, torusTrace, checkTorusBounded}` |
| **CAP theorem** | UUID-consensus reads choose CP (replicas may be unavailable; survivors give consistent answers) | `storage-independence/index.ts` (consensusRead) | `erpax.storage.consensusRead` |

## 9. Standards families (per §0g)

The MCP layer cross-references the 7 standard families ERPax tracks via `standards-as-live-objects` (slice CCCCCC):

| Family | Examples cited by MCP modules |
|---|---|
| `ifrs-ias` | IFRS 15, IAS 1 — referenced in commerce/accounting MCP tool descriptions |
| `iso` | All ISO/IEC 25010, 19011, 27001, 27040, 30134, 13616, 20022 above |
| `eu-directive` | PSD2, GDPR, eIDAS — referenced in payment-provider / bank / country profile tools |
| `us-fed` | SOX §404, FIPS 180-4, NIST SP 800-208 — referenced in integrity / audit tools |
| `w3c-ietf` | Every W3C / RFC reference above |
| `cloudflare` | Workers Runtime, MCP 0.6, WebCrypto — referenced in `erpax.platform.*` tools |
| `un-oecd-wco` | UN/CEFACT, OECD CRS, WCO HS — referenced in country-tenant / customs tools |

## 10. Conservation laws governing the MCP layer

| Law # | Title | Slice | Standard anchor |
|---|---|---|---|
| 37 | auto-generation coverage | WWWWWW | MCP 0.6 + ISO/IEC 25010 §5.4 |
| 38 | mcp standardization (naming + areas + citations) | XXXXXX | MCP 0.6 + ISO 19011:2018 §6.4.6 |
| 39 | mcp presentation coverage (every tool an Action face) | YYYYYY | W3C JSON-LD 1.1 + Schema.org Action |
| 40 | mcp rebuildable from source | ZZZZZZ | JSDoc-as-spec (slice CCCCC) + MCP 0.6 |
| 41 | mcp self-testable | AAAAAAA | ISO/IEC/IEEE 29119-2 |
| 44 | dry proof published | DDDDDDD | W3C VC Data Model 2.0 + Schema.org Dataset |
| 50 | mcp DRY cleanliness | BBBBBBB | ISO/IEC 25010 §5.4 |
| 52 | pwa uuid integrity | NNNNNNNN | W3C Service Workers + RFC 4122 §4.3 |

## 11. The Trinity collapse (slice JJJJJJJJ)

Every MCP-related law derives from one of the three Trinity laws:

- **Law I (Identity)** — Laws 39, 46, 47 (every MCP tool, short uuid display, type uuid)
- **Law II (Causality)** — Laws 32, 33, 34 (block composition, stream coherence, stream uuid chain)
- **Law III (Closure)** — Laws 1, 37, 38, 40, 41, 44, 45, 50, 52 (everything else: discoverability, rebuildable, testable, proving, DRY, PWA)

## 12. How to cite a new MCP tool

When adding a new tool, the description MUST cite ≥1 standard from the lexicon (Law 38). Recommended citation patterns:

```ts
// Minimal — single standard
description: '... per RFC 4122 §4.3'

// Multiple standards
description: '... (W3C JSON-LD 1.1 + RFC 8785 + ISO/IEC 25010:2023 §5.4)'

// Conservation law citation (counts as a standard per Law 38)
description: '... — Conservation Law 8 echo'
```

The `standards-citation-index.sh` pre-push script + `checkMcpToolStandardizationInvariant` (Law 38) verify every hand-curated tool has at least one citation; auto-generated tools (slice WWWWWW) are exempt via the `[generated]` prefix.

## 13. Inline citations across the MCP modules

Every file under `src/services/agents/mcp/` carries a `@standard` block in its banner. Per-function JSDoc adds tighter citations where a specific standard governs that function's behavior (e.g. `descriptorFromZod` cites JSON Schema 2020-12 explicitly).

---

**Cross-reference index — every cited standard once, alphabetized:**

BCP-47, CAP theorem, FIPS 180-4, Hatcher 2002, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.2 / §5.3 / §5.4 / §5.5 / §5.6 / §5.7, ISO/IEC 27001 §A.9.4.5, ISO/IEC 27040:2024, ISO/IEC 30134, ISO/IEC/IEEE 29119-2, Lamport 1978, MCP 0.6, NIST SP 800-208, Open Graph protocol, ReactiveX, RFC 4122 §4.3, RFC 8259, RFC 8785, RFC 9694, Schema.org (Action / Dataset / SoftwareApplication / CollectionPage), Sitemap.xml protocol 0.9, Twitter Cards, W3C Cache API, W3C IndexedDB 3.0, W3C JSON-LD 1.1, W3C JSON Schema (draft 2020-12), W3C Microdata 1.1, W3C Notifications API, W3C OPFS, W3C PROV-DM, W3C Push API, W3C Service Workers, W3C Streams API, W3C VC Data Model 2.0, W3C Web App Manifest.
