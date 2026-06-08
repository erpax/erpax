/**
 * ERPax MCP tool registry — central declaration of every tool the
 * Payload MCP plugin exposes.
 *
 * Slice DDDDD task 10 (2026-05-11), enriched per slice QQQQQQQQ.
 * Each tool is declared once here and consumed by both:
 *   (a) the @payloadcms/plugin-mcp plugin config (over-the-wire MCP)
 *   (b) the in-process McpClient bound to AgentContext.mcp
 *
 * Tool naming convention: `erpax.<area>.<verb>` per Conservation
 * Law 38 (slice XXXXXX). Area must be in CANONICAL_AREAS; hand-
 * curated tool descriptions must cite ≥1 standard from the lexicon.
 *
 * Eight self-properties of MCP (per spec §0p–§0w + §0ae):
 *   1. Discoverable      — VVVVVV (erpax.platform.readiness)
 *   2. Self-built        — WWWWWW (auto-generated.ts) + Law 37
 *   3. Self-standardized — XXXXXX (standardization.ts) + Law 38
 *   4. Self-presented    — YYYYYY (presentation.ts) + Law 39
 *   5. Self-rebuildable  — ZZZZZZ (rebuild-from-source.ts) + Law 40
 *   6. Self-testable     — AAAAAAA (self-test.ts) + Law 41
 *   7. Self-proving      — DDDDDDD (proof/dry-proof.ts) + Law 44
 *   8. Self-DRY-cleaning — BBBBBBB (dry-clean.ts) + Law 50
 *
 * Comprehensive standards reference: docs/standards/mcp.md.
 *
 * @standard MCP 0.6 — Model Context Protocol (tools/list + tools/call
 *                     + resources + prompts + sampling)
 * @standard MCP 0.6 — tools/list naming convention (§1 of mcp.md)
 * @standard MCP 0.6 — tools/call result shape `{content:[{type,text}]}`
 * @standard RFC 8259 — JSON (every tool emits JSON-encoded text)
 * @standard W3C JSON-LD 1.1 (tool descriptions + standards bundles)
 * @standard W3C JSON Schema draft 2020-12 (Zod parameters bridge)
 * @standard ISO/IEC 25010:2023 §5.3 usability (discoverability),
 *           §5.4 reusability (single tool surface),
 *           §5.5 testability (self-test), §5.7 modularity (10 areas)
 * @standard ISO 19011:2018 §6.4.6 (audit-evidence — every tool
 *                                  description audit-trailed via
 *                                  the standards lexicon, Law 38)
 * @standard ISO/IEC 27001 §A.9.4.5 (information access restriction
 *                                   via short uuids in UI, Law 46)
 *
 * Conservation Laws governing this file: 1, 7, 37, 38, 39, 40, 41,
 * 44, 45, 50, 52 (per docs/standards/mcp.md §10).
 */

import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import {
  extractCorpus, collectEvidence, extractE2eCorpus,
  generateMultimediaForWorkflow, generateMarketingPage,
} from '@/spec/generator'
import { localeRecord, supportedLocales, type SupportedLocale } from '@/i18n'
import { BUSINESS_CHAINS } from '@/business/chain'
import { getTradingApis, getTradingApisByCategory, type TradingApiCategory } from '@/config/trading-apis'
import { verifyContentUuid, TAMPER_PROOF_COLLECTIONS_REGISTRY, UUID_REF_REGISTRY, resolveByUuid, findDanglingRefs } from '@/integrity'
// `@/cloning` is imported for TYPES ONLY at module scope (erased at runtime). Its
// runtime fns (publishSelf / bootFromFederation) are pulled LAZILY inside the two
// handlers below via `await import('@/cloning')`. WHY: tool-defs ⇄ @/cloning is a
// boot cycle (@/cloning → genome → @/agent/bootstrap, which CALLS buildErpaxMcpTools
// at module-eval). An eager `import` here makes that cycle fire the heavy builder
// while tool-defs is still mid-evaluation — its later consts/helpers are then in the
// temporal dead zone and the eval throws (e.g. for any barrel importer like
// @/dashboard/spec). Deferring the runtime edge to the async handlers breaks the
// eager arm of the cycle with zero behaviour change (the handlers already await).
import type { GenomePublication } from '@/cloning'
import { checkout, provisionInstance, listSubscriptions, checkCommerceLifecycle } from '@/commerce'
import { bookRevenue, bookCost, scheduleFiling, scheduleObligation, checkSelfAccountingComplete } from '@/self/accounting'
import { createDid, resolveDid, listDids } from '@/did'
import { publishStandard, resolveStandard, subscribeTenant, tenantSubscriptions, addCitation, listCitations, declareConflict, declareSupersession, traceSupersession, checkStandardCitationsConsistent, checkStandardSupersessionsResolved, familyOf } from '@/registry'
import { anchorRoot, listAnchors, NOTARY_STUB_BACKEND } from '@/anchoring'
import { tenantPins } from '@/archival'
import { listProposals } from '@/meta/automation'
import { listAgentCapabilities } from '@/beyond'
import { seedFromE2e, seedFromSpec, exportMediaBundle, importMediaBundle } from '@/website'
import { deriveSeoMeta, generateChannelVariants, reviewBrandVoice, auditSeo, buildOnboardingDrip, checkMarketingTransparency, ERPAX_MARKETING_STRATEGY } from '@/website'
import {
  registerFace, listFaces, crossLink, renderJsonLd, renderOgMeta,
  generateSitemap, generateRobots, checkSeoVortexCoupling, bitemporalAnchor,
  validateMicrodata, type SeoVortexFace, type SchemaType, type OgType,
} from '@/website'
import { SHADCN_SURFACE_MAP, shadcnSurfaceFor, allRequiredShadcnComponents, type SiteSurface } from '@/website'
import {
  createBallot, castVote, computeAggregate, verifyAggregate,
  listBallots, listVotes, exportBallotBundle,
  derivePseudoDid, checkNoDoubleVoting, type BallotKind, type VoteValue,
} from '@/voting'
import {
  buildBlockCatalog, manifestOf, composeBlocks, validateComposition,
  chainBlocks, checkRegistryCoupling, chainsAsBlockCompositions,
  type AgentBlockManifest,
} from '@/agent'
import {
  makeStream, tumblingWindow,
  checkWindowCoherence, checkStreamUuidChain,
  type ClockedEvent,
} from '@/stream'
import {
  verifyAcrossBackends, planMigration, replicateObject, consensusRead,
  checkStorageIndependence, listBackends,
} from '@/storage/independence'
import { buildReadinessManifest, buildToolCatalog, toolsByArea } from '@/platform/readiness'
import { buildAutoGeneratedTools } from '@/agents/mcp/auto-generated'
// Slice BBBBBBBBBB-cut1 (2026-05-11) — wire the orphan tool barrel.
// The factories in ./tools/ were exported but never consumed; their
// six namespaces (kv / security / share / format / governance / error
// + integrity-extensions) were dead on the live MCP surface. This
// import + the push loop below in `buildErpaxMcpTools` close that gap.
// Conservation Laws 58–64 + 38 now reach external clients.
import {
  buildConsistencyTools, buildEventsTools, buildCloudflareTools,
  buildKvTools, buildIntegrityExtensionTools, buildSecurityTools,
  buildShareTools, buildFormatTools, buildGovernanceTools, buildErrorTools,
  buildBatchTools, buildVersionsTools,
} from '@/agents/mcp/tool'
import { wrapToolsWithTenantGuard } from '@/agents/mcp/tool'
import { nodeOf, neighborsOf, backlinksOf, bindingOf, matrixDigest, UUID_MATRIX_NODES } from '@/uuid/matrix'
// ── the quantum-leap atoms, wired onto the live MCP matrix surface (the society's tool) ──
import { leap as quantumLeap } from '@/leap'
import { lines as spectrumLines } from '@/spectrum'
import { superpose, collapse as collapseState, probabilities } from '@/superposition'
import { HORO_DIGITS, type HoroStep } from '@/horo'

/**
 * State-mutating tools that need an admin/auditor role check beyond
 * tenant-match. Slice FFFFFFFFFF (2026-05-11).
 *
 * Tools NOT in this set get the default `assertTenantMatch` (caller
 * tenant must equal claimed tenantId; super-admin bypasses). Tools IN
 * this set additionally require the caller to hold `super-admin`,
 * `admin`, `tenant-admin`, or `auditor`.
 *
 * Curated (explicit) over naming-heuristic because some verbs are
 * ambiguous (`verify` is read; `attest` is mutate; `subscribe`
 * persists; `check` is read). An invariant test can sanity-check
 * coverage in a follow-up slice.
 *
 * Selection criteria for inclusion:
 *   (1) persists chain-linked audit / financial / governance evidence
 *   (2) provisions tenant infrastructure or platform identity
 *   (3) writes to a tamper-proof or content-addressed surface
 *
 * Per-handler `assertAdminOnTenant` in the share / governance / error /
 * integrity-extensions tool files (added in BBBBBBBBBB-cut3) remains
 * the precise per-tool layer; this allowlist covers the 33 inlined
 * tools in this file.
 */
const STATE_MUTATING_TOOLS: ReadonlySet<string> = new Set([
  // Audit + chain evidence (SOX §404 forgery vector class)
  'erpax.events.emit',
  'erpax.integrity.uuidStreamRecord',
  'erpax.anchoring.anchorRoot',
  // Financial mutation
  'erpax.accounting.bookRevenue',
  // Tenant + platform provisioning
  'erpax.commerce.provisionInstance',
  'erpax.platform.publishSelf',
  // Voting / governance
  'erpax.voting.createBallot',
  // Content / site seeding
  'erpax.website.seedFromSpec',
  // PWA mutation queue (sync writes)
  'erpax.pwa.enqueueMutation',
  // Storage write paths
  'erpax.storage.replicate',
  // Chain execution (writes to audit chain per JSDoc)
  'erpax.chain.runFull',
  'erpax.chain.runStep',
  // Standards subscription (creates a watch row)
  'erpax.standards.subscribe',
  // Agent dispatch (effects → side-effects)
  'erpax.agents.dispatch',
  // Bulk state-transition (the upstream batch_action surface) — writes status
  // to many rows, each firing emitOnStatusTransition.
  'erpax.batch.transition',
  // Version restore (the upstream `reify`) — restores a document to a version.
  'erpax.versions.restore',
])
import {
  checkMcpToolStandardization, buildMcpStandardsBundle, CANONICAL_AREAS,
  listMcpStandards, mcpStandardsByFamily, standardsForLaw,
  type McpStandardEntry,
} from '@/agents/mcp/standardization'
import {
  mcpToolAsAction, mcpToolAsOg, renderToolHead, areaAsCollectionPage,
  registerAllMcpFaces, checkMcpPresentationCoverage,
} from '@/agents/mcp/presentation'
import {
  rebuildMcpFromSource, deriveExpectedToolsFromCorpus,
  compareExpectedVsLive, emitToolDefsSkeleton, checkMcpRebuildableFromSource,
} from '@/agents/mcp/rebuild-from-source'
import { selfTestAll, selfTestOne, checkMcpSelfTestable } from '@/agents/mcp/self-test'
import { dryCleanScan, checkMcpDryCleanliness, MAX_DESCRIPTION_OVERLAP } from '@/agents/mcp/dry-clean'
import {
  cacheAsset, listCachedAssets, evictAsset, totalCachedBytes,
  enqueueMutation, listQueuedMutations, dequeueMutation,
  publishManifest, verifyManifest, preparePush, dedupPush,
  checkPwaUuidIntegrity, type AssetKind, type WebAppManifest,
} from '@/pwa'
import { checkTorusBounded, traceTorusRoundTrip, TORUS_DEFAULT_ENVELOPE, TORUS_VERTICES, TORUS_EDGES } from '@/topology/torus'
import {
  buildDryProofBundle, publishDryProofBundle, getCurrentProofBundle,
  checkDryProofPublished, asFederationEnvelope, MAX_PROOF_AGE_HOURS,
  type CorpusSelfProof,
} from '@/proof/dry-proof'
// The corpus self-proof cluster — collider (joint convention coverage),
// strength (DRY×slices), emergence (dualities forged). They read the live src
// tree (fs), so they run HERE in the Node MCP handler and the resulting plain
// numbers are passed into buildDryProofBundle, which stays fs-free for the edge.
import { corpusCollider } from '@/collider'
import { corpusStrength } from '@/strength'
import { emergenceCoverage } from '@/emergence'
// Multi-currency GL (FX gain/loss + IAS-21/ASC-830 revaluation) and bulk
// import/export + Playwright test-artifact uploader — wired to real consumers.
import { multiCurrencyService } from '@/multi/currency.service'
import { enqueueBulkOperation, type BulkFormat, type BulkOperationKind } from '@/bulk/op'
import { uploadTestArtifacts } from '@/capture/media'
import * as allCollections from '@/collections'
import {
  LAW_CATALOG, buildAgentLawProfile, buildAllAgentLawProfiles, checkAgentLawCoverage,
} from '@/architecture/invariant'
import {
  shortUuid, parseShortUuid, lookupShort, displayUuid,
  checkUuidShortDisplay, SHORT_UUID_POLICY, type ShortUuidKind,
} from '@/integrity'
import {
  computeTypeUuid, registerType,
  getType, getTypeByUuid, listTypes, verifyType, ensureBaselineTypesRegistered,
  checkTypeUuidCoverage, type TypeDescriptor,
} from '@/integrity'
import {
  recordUuid, queryUuidStream, snapshotFromRegistries,
  buildInfiniteFinitenessReport, checkInfiniteFiniteness, type UuidSource,
} from '@/integrity'
import {
  TRINITY, trinityGrouping, trinityForPriorLaw, rollUpToTrinity,
} from '@/architecture/invariant'
import {
  DIMENSIONAL_PLUGINS, checkDimensionalCoverage, dimensionForCollection,
  totalCollectionCount,
} from '@/plugin/dimensions'
import {
  DIMENSION_PLUGIN_FACTORIES, allDimensionalPlugins, checkDimensionalPluginScaffolded,
} from '@/dimension'
import { computeContentUuid } from '@/integrity'
import type { AgentRegistry } from '@/agent'
import { createAgentContext } from '@/agent'
import {
  planSelfResearch,
  securingGrant,
  secureFootprint,
  identityBindings,
  type DiscoveredAccount,
  type SelfIdentity,
} from '@/self/research'

export interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(
    args: Record<string, unknown>,
    req: PayloadRequest,
  ): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

/**
 * Resolve the live corpus self-proof (collider/strength/emergence) at BUILD time
 * (Node — these read the src tree via fs). The numbers GROUND the proof bundle's
 * tamper-cost coverage instead of a hardcoded floor. FAIL-CLOSED: if the tree scan
 * is unavailable (e.g. invoked outside a checkout), return undefined so the bundle
 * degrades to the honest 2^106 digest floor rather than crashing or over-claiming.
 */
function resolveCorpusSelfProof(): CorpusSelfProof | undefined {
  try {
    return {
      collider: corpusCollider(),
      strength: corpusStrength(),
      emergence: emergenceCoverage(),
    }
  } catch {
    return undefined
  }
}

/**
 * The known Payload collection slugs, computed from the collections module
 * (the SAME `Object.values(allCollections)` the config registers). The bulk
 * tool validates `targetCollection` against this set so an arbitrary slug can
 * never reach `payload.create` (fail-closed; tenant-isolation guard).
 */
const KNOWN_COLLECTION_SLUGS: ReadonlySet<string> = new Set(
  (Object.values(allCollections) as Array<{ slug?: unknown }>)
    .map((c) => c.slug)
    .filter((s): s is string => typeof s === 'string'),
)

/**
 * Derive the caller's OWN footprint: fan the computed identity-bindings (schema-derived)
 * through the gateway, each find run in the caller's `PayloadRequest` under
 * `overrideAccess: false` — so the access scope IS the ownership boundary and no other
 * actor's rows are ever reached (no bypass). A collection the caller cannot read simply
 * contributes nothing. Shared by erpax.platform.selfResearch + selfSecure.
 */
async function deriveSelfFootprint(
  req: PayloadRequest,
): Promise<{ self: SelfIdentity; footprint: DiscoveredAccount[] }> {
  const u = req.user as { email?: string; id?: string | number } | null | undefined
  const self: SelfIdentity = { email: u?.email ?? '', userId: u?.id != null ? String(u.id) : '' }
  const footprint: DiscoveredAccount[] = []
  if (!self.email && !self.userId) return { self, footprint }
  const bindings = await identityBindings()
  const reachable = [...new Set(bindings.map((b) => b.collectionSlug))].map((slug) => ({
    name: slug,
    collectionSlug: slug,
  }))
  for (const q of planSelfResearch({ self, reachable, bindings })) {
    try {
      const res = await req.payload.find({
        collection: q.collectionSlug as never,
        where: q.where as never,
        overrideAccess: false,
        req,
        depth: 0,
        limit: 100,
      })
      for (const doc of res.docs as Array<{ id: unknown }>) {
        footprint.push({ accountUuid: String(doc.id), collectionSlug: q.collectionSlug, provider: q.collectionSlug })
      }
    } catch {
      // caller cannot read this collection — it contributes nothing to the footprint
    }
  }
  return { self, footprint }
}

const localeEnum = z.enum(supportedLocales as unknown as [string, ...string[]])

/**
 * Build the tool list, parameterised over the bootstrapped agent
 * registry. Called once at boot from `bootstrap.ts`.
 */
export function buildErpaxMcpTools(registry: AgentRegistry): ErpaxMcpTool[] {
  // The full list is constructed first; the trailing 3 readiness tools
  // (slice VVVVVV) reference `tools` so they can survey themselves.
  const tools: ErpaxMcpTool[] = [
    {
      name: 'erpax.spec.getCollection',
      description: 'Return the parsed CollectionSpec (JSDoc-as-spec) for a given collection slug — title, summaries, standards cited, chain steps owned, features gated, roles, emits/subscribes, examples, invariants, use cases.',
      parameters: { slug: z.string() },
      async handler({ slug }) {
        const corpus = extractCorpus(process.cwd())
        const spec = corpus.collections.find((c) => c.slug === slug)
        return spec ? json(spec) : text(`No spec found for slug='${slug as string}'`)
      },
    },
    {
      name: 'erpax.spec.getChainRegistry',
      description: 'List every BusinessChain — id, title, steps (collection + action + emits + requires), feature gate, standards cited.',
      parameters: {},
      async handler() { return json(Object.values(BUSINESS_CHAINS)) },
    },
    {
      name: 'erpax.trading.list',
      description:
        'List the commercial trading-integration APIs in scope for a region — the commercial sibling of the official country-apis registry. Covers payment_gateway / direct_debit / payout_provider, ecommerce_platform / marketplace, shipping_carrier / shipping_aggregator, peppol_access_point / edi_network / product_data / doc_validation, banking_aggregator and fx_rates. `region` is an ISO 3166-1 alpha-2 code (or "EU" / "GLOBAL"); GLOBAL and (for EU members) EU-wide providers are always unioned in. Optional `category` filters to one taxonomy slot. Returns catalogue metadata only — endpoint, auth model, format, docs — never credentials (those resolve per-tenant). Spans PSD2 (Berlin Group) banking aggregators, Peppol BIS / EN 16931 e-invoicing access points, and ISO 4217 FX feeds.',
      parameters: { region: z.string(), category: z.string().optional() },
      async handler({ region, category }) {
        const r = String(region)
        const list = category
          ? getTradingApisByCategory(r, String(category) as TradingApiCategory)
          : getTradingApis(r)
        return json(list)
      },
    },
    {
      name: 'erpax.matrix.query',
      description: 'Query the content-addressed corpus uuid matrix (content-uuids per RFC 9562 §5.8). op="digest" → the whole corpus as one 128-bit root + counts; "node" → an atom\'s content-uuid + dimension + band + horo position; "neighbors"/"backlinks" → its out/in edges; "binding" → the merge-uuid of edge atom→to. QUANTUM ops over the horo energy-ladder: "leap" → the discrete transition between atom and to (their horo rungs) — emit/absorb, gap-frequency, the photon, and the symmetric spectral line-uuid; "spectrum" → every distinct line of the seven-rung system; "collapse" → measure the corpus superposition over the seven horo bands at r∈[0,1) to one band (amplitudes ∝ √(atoms per band), the Born rule). In-memory + content-addressed: no DB, deterministic.',
      parameters: {
        op: z.enum(['digest', 'node', 'neighbors', 'backlinks', 'binding', 'leap', 'spectrum', 'collapse']),
        atom: z.string().optional(),
        to: z.string().optional(),
        r: z.number().optional(),
      },
      async handler({ op, atom, to, r }) {
        const a = typeof atom === 'string' ? atom : ''
        const b = typeof to === 'string' ? to : ''
        const rungs = HORO_DIGITS as readonly number[]
        switch (op) {
          case 'digest': return json(matrixDigest())
          case 'node': return json(nodeOf(a) ?? { error: `no atom '${a}'` })
          case 'neighbors': return json({ atom: a, neighbors: neighborsOf(a).map((n) => n.atom) })
          case 'backlinks': return json({ atom: a, backlinks: backlinksOf(a).map((n) => n.atom) })
          case 'binding': return json({ from: a, to: b, binding: bindingOf(a, b) ?? null })
          case 'leap': {
            const fn = nodeOf(a)
            const tn = nodeOf(b)
            if (!fn || !tn) return json({ error: `leap needs two known atoms (atom + to); got atom='${a}', to='${b}'` })
            if (!rungs.includes(fn.horo) || !rungs.includes(tn.horo)) {
              return json({ error: `both atoms must sit on a diatonic rung; got horo ${fn.horo} / ${tn.horo}` })
            }
            const l = quantumLeap(fn.horo as HoroStep, tn.horo as HoroStep)
            return json({ from: { atom: fn.atom, horo: fn.horo }, to: { atom: tn.atom, horo: tn.horo }, kind: l.kind, gapHz: l.gapHz, photon: l.photon, line: l.uuid })
          }
          case 'spectrum': return json({ lines: spectrumLines() })
          case 'collapse': {
            const counts = Object.fromEntries(HORO_DIGITS.map((d) => [d, 0])) as Record<HoroStep, number>
            for (const n of UUID_MATRIX_NODES) if (rungs.includes(n.horo)) counts[n.horo as HoroStep]++
            const amps = Object.fromEntries(HORO_DIGITS.map((d) => [d, Math.sqrt(counts[d])])) as Record<HoroStep, number>
            if (HORO_DIGITS.reduce((s, d) => s + amps[d], 0) === 0) return json({ error: 'no atoms on diatonic rungs to superpose' })
            const state = superpose(amps)
            const rr = typeof r === 'number' && Number.isFinite(r) ? ((r % 1) + 1) % 1 : 0
            return json({ measured: collapseState(state, rr), r: rr, probabilities: probabilities(state) })
          }
          default: return text(`unknown op '${op as string}'`)
        }
      },
    },
    {
      name: 'erpax.chain.runStep',
      description: 'Execute one step of a business chain end-to-end against a tenant + locale. Resolves the step\'s collection to the owning agent and processes its returned AgentEffect[]. Writes to the audit chain.',
      parameters: {
        chainId: z.string(),
        stepIndex: z.number().int().min(1),
        tenantId: z.string(),
        locale: localeEnum,
      },
      async handler({ chainId, stepIndex, tenantId, locale }) {
        // Wired in EEEEE once FinanceAgent ships and demonstrates the round-trip.
        return text(`(stub) runStep chainId=${chainId as string} step=${stepIndex as number} tenant=${tenantId as string} locale=${locale as string}`)
      },
    },
    {
      name: 'erpax.chain.runFull',
      description: 'Execute every step of a business chain in sequence; returns the per-step audit-evidence summary.',
      parameters: { chainId: z.string(), tenantId: z.string(), locale: localeEnum },
      async handler({ chainId }) { return text(`(stub) runFull ${chainId as string}`) },
    },
    {
      name: 'erpax.i18n.translate',
      description: 'Resolve a translation key in a given locale. Strict mode treats `[en] …` stubs as missing (returns "MISSING:<locale>").',
      parameters: { key: z.string(), locale: localeEnum, strict: z.boolean().optional() },
      async handler({ key, locale, strict }) {
        const value = localeRecord(key as string)[locale as SupportedLocale]
        if (strict && (typeof value !== 'string' || value.startsWith('[en] '))) {
          return text(`MISSING:${locale as string}`)
        }
        return text(value ?? '')
      },
    },
    {
      name: 'erpax.i18n.audit',
      description: 'Audit i18n coverage across every supported locale. Returns per-locale stub counts.',
      parameters: { strict: z.boolean().optional() },
      async handler() {
        // Defers to outputs/check-i18n-strict-bg.mjs equivalent in-process.
        return text('(stub) i18n audit summary — see checkI18nCoverageStrict invariant for live data')
      },
    },
    {
      name: 'erpax.multimedia.render',
      description: 'Render the multimedia walkthrough (HTML hero + storyboard + JSON manifest + PDF/A blocks) for a given workflow + locale.',
      parameters: { workflow: z.string(), locale: localeEnum },
      async handler({ workflow, locale }) {
        const corpus = collectEvidence(process.cwd())
        const wf = corpus.byWorkflow.get(workflow as string)
        if (!wf) return text(`No evidence for workflow='${workflow as string}'`)
        const out = generateMultimediaForWorkflow(wf, { locale: locale as SupportedLocale })
        return json({
          html: out.htmlSnippet,
          markdown: out.markdownSnippet,
          manifest: out.manifest,
          pdfaBlocks: out.pdfaBlocks,
        })
      },
    },
    {
      name: 'erpax.marketing.generatePage',
      description: 'Generate the full marketing HTML page for a workflow + locale (hero + video + storyboard + standards + features + UX gaps + audit-trail evidence + CTA). Self-contained HTML5 with inline CSS + ARIA landmarks.',
      parameters: { workflow: z.string(), locale: localeEnum },
      async handler({ workflow, locale }) {
        const repoRoot = process.cwd()
        const evidence = collectEvidence(repoRoot)
        const e2e = extractE2eCorpus(repoRoot)
        const out = generateMarketingPage({
          workflow: workflow as string,
          evidence, e2e,
          options: { locale: locale as string, defaultLocale: 'en' },
        })
        return text(out.html)
      },
    },
    {
      name: 'erpax.audit.getEvidence',
      description: 'Return the audit-evidence Merkle pack for a chain + tenant + optional time window. ISO 19011:2018 §6.4.6 + SOX §404 conformant.',
      parameters: { chainId: z.string(), tenantId: z.string(), since: z.string().optional() },
      async handler({ chainId, tenantId, since }, req) {
        const events = await req.payload.find({
          collection: 'audit-events' as never,
          where: {
            chainId: { equals: chainId },
            tenant: { equals: tenantId },
            ...(since ? { createdAt: { greater_than: since } } : {}),
          },
          limit: 500,
        })
        return json(events)
      },
    },
    {
      name: 'erpax.agents.list',
      description: 'List every registered DomainAgent — id, owned collections, subscribed events, emitted events, cron schedule.',
      parameters: {},
      async handler() {
        return json(registry.all().map((a) => ({
          id: a.id,
          ownsCollections: a.ownsCollections,
          subscribesTo: a.subscribesTo,
          emits: a.emits,
          cron: a.cron ?? null,
        })))
      },
    },
    {
      name: 'erpax.agents.dispatch',
      description: 'Dispatch a synthetic DomainEvent to every subscribed agent via agentRuntime.dispatchEvent. Returns the AgentEffect[] each agent produced. Slice MMMMMMMM (2026-05-11) — replaces the EEEEE-era stub with the real round-trip. Gated by super-admin role at the plugin layer.',
      parameters: {
        event: z.object({
          id: z.string(),
          tenantId: z.string(),
          payload: z.record(z.unknown()),
        }),
      },
      async handler({ event }, req) {
        const { agentRuntime } = await import('@/agent/bootstrap')
        const { createInProcessMcpClient } = await import('@/agents/mcp/in-process-client')
        const e = event as { id: string; tenantId: string; payload: Record<string, unknown> }
        const ctx = createAgentContext({
          runtime: agentRuntime,
          payload: req.payload,
          tenantId: e.tenantId,
          mcp: createInProcessMcpClient(buildErpaxMcpTools(registry), req),
        })
        const effects = await agentRuntime.dispatchEvent(ctx, {
          id: e.id, tenantId: e.tenantId, payload: e.payload,
          emittedAt: new Date().toISOString(),
        })
        return json({
          dispatched: { event: e.id, tenant: e.tenantId },
          subscribers: agentRuntime.registry.bySubscribedEvent(e.id).map((a) => a.id),
          effectCount: effects.length,
          effects,
        })
      },
    },
    {
      name: 'erpax.platform.publishSelf',
      description: 'Conservation Laws 23 + 24 (HHHHHH): collect this ERPax instance\'s genome (spec corpus + chains + agents + roles + MCP tools + standards) as a deterministic content-addressed bundle. Returns GenomePublication with bundleUuid, scope, sourceDid, the bundle itself, and (when sign fn configured) a signature. The bundle can be ingested by any blank ERPax instance via erpax.platform.bootFromFederation to produce a verified bit-identical clone.',
      parameters: {
        sourceDid: z.string(),
        scope: z.enum(['genome', 'genome+state']),
        tenantId: z.string().optional(),
      },
      async handler({ sourceDid, scope, tenantId }) {
        const { publishSelf } = await import('@/cloning')
        const pub = publishSelf({
          tenantId: (tenantId as string | undefined) ?? 'erpax-self',
          sourceDid: sourceDid as string,
          scope: scope as 'genome' | 'genome+state',
        })
        return json(pub)
      },
    },
    {
      name: 'erpax.platform.bootFromFederation',
      description: 'Conservation Law 24: ingest a published genome (from erpax.platform.publishSelf) into this clone instance. Verifies Law 24 checkCloneIntegrity (uuid recompute), runs all 23 invariants under the new genome, activates the erpax-platform role on the clone\'s self-tenant. Returns { cloneDid, bootedAt, divergencePoint } on success. Sandbox mode: validate the genome without mutating registries (used in tests + dry-runs).',
      parameters: {
        publication: z.record(z.unknown()),
        cloneTenantId: z.string(),
        cloneDid: z.string(),
        sandbox: z.boolean().optional(),
        requireScope: z.enum(['genome', 'genome+state']).optional(),
      },
      async handler({ publication, cloneTenantId, cloneDid, sandbox, requireScope }) {
        const { bootFromFederation } = await import('@/cloning')
        const result = await bootFromFederation({
          publication: publication as unknown as GenomePublication,
          cloneTenantId: cloneTenantId as string,
          cloneDid: cloneDid as string,
          sandbox: sandbox as boolean | undefined,
          requireScope: requireScope as 'genome' | 'genome+state' | undefined,
        })
        return json(result)
      },
    },
    // ── self/research — any actor finds where its OWN identity is used, and secures it ──
    {
      name: 'erpax.platform.selfResearch',
      description:
        "Self-research: find where the CALLER'S OWN identity (their email + user id) is used across the corpus. Fans the computed find-surface over every schema-derived identity-binding, each query run in the caller's PayloadRequest under overrideAccess:false — so the access scope IS the ownership boundary and no other actor's rows can be reached (no bypass of the gateway). Read-only. @standard NIST SP 800-162 ABAC; @standard OWASP ASVS V5 (IDOR-prevention).",
      parameters: {},
      async handler(_params, req) {
        const { self, footprint } = await deriveSelfFootprint(req)
        if (!self.email && !self.userId) return json({ error: 'no authenticated identity on this request' })
        return json({ identity: self.email || self.userId, count: footprint.length, footprint })
      },
    },
    {
      name: 'erpax.platform.selfSecure',
      description:
        "Self-secure: authorize + receipt the securing (reset/recover) of chosen accounts from the caller's OWN footprint. The securing grant's allowlist IS the footprint, so any accountUuid self-research did not return is BLOCKED and receipted — account-takeover is structurally unreachable. Owner-initiated, exposed-first; emits a uuid-chained receipt ledger. The per-provider credential reset is the effect this receipt authorizes (erpax holds the audit; the credential lives at the provider). @standard NIST SP 800-63B §6.1.3 owner-authorized recovery; @standard NIST SP 800-162 ABAC.",
      parameters: { accountUuids: z.array(z.string()).min(1) },
      async handler({ accountUuids }, req) {
        const { self, footprint } = await deriveSelfFootprint(req)
        if (!self.email && !self.userId) return json({ error: 'no authenticated identity on this request' })
        const byUuid = new Map(footprint.map((a) => [a.accountUuid, a]))
        const chosen = (accountUuids as string[]).map(
          (u) => byUuid.get(u) ?? { accountUuid: u, collectionSlug: 'unknown', provider: 'unknown' },
        )
        const ledger = secureFootprint({
          chosen,
          grant: securingGrant({ toolUuid: 'erpax.platform.selfSecure', footprint }),
          actor: self.email || self.userId,
          stamp: () => new Date().toISOString(),
        })
        return json({
          secured: ledger.secured.map((a) => ({ accountUuid: a.accountUuid, collection: a.collectionSlug })),
          refused: ledger.refused.map((a) => a.accountUuid),
          receipts: ledger.receipts.length,
          note: 'each authorized securing is receipted; trigger the per-provider reset where the credential lives',
        })
      },
    },
    // ── Slice JJJJJJ — Commerce: ERPax sells + deploys + bills itself ──
    {
      name: 'erpax.commerce.checkout',
      description: 'Stripe checkout — initiate a subscription for a new tenant. Reserves a tenant id; activates on payment-success webhook → erpax.commerce.provisionInstance.',
      parameters: {
        tier: z.enum(['free', 'solo', 'team', 'business', 'enterprise']),
        roleProfileId: z.string(),
        email: z.string(),
        companyName: z.string(),
        billingJurisdiction: z.string(),
        returnUrl: z.string(),
      },
      async handler(args) {
        return json(await checkout(args as never))
      },
    },
    {
      name: 'erpax.commerce.provisionInstance',
      description: 'Deploy a Cloudflare Worker for a paid tenant + ingest the canonical ERPax genome (slice HHHHHH bootFromFederation). Returns the new instance MCP endpoint + admin URL + clone DID.',
      parameters: {
        tenantId: z.string(),
        roleProfileId: z.string(),
        genomeBundleUuid: z.string(),
        region: z.enum(['wnam', 'enam', 'eu', 'apac', 'sa', 'me-af']),
        customDomain: z.string().optional(),
      },
      async handler(args) {
        return json(await provisionInstance(args as never))
      },
    },
    {
      name: 'erpax.commerce.listSubscriptions',
      description: 'List every active subscription registered with this ERPax instance (tier + role profile + MCP endpoint + clone DID).',
      parameters: {},
      async handler() { return json(listSubscriptions()) },
    },
    {
      name: 'erpax.commerce.lifecycleAudit',
      description: 'Conservation Law 25 — verify every active tenant has Stripe subscription + CF deployment + audit-chain entry. Surfaces orphans (paid-no-deploy, deploy-no-pay).',
      parameters: {},
      async handler() { return json(checkCommerceLifecycle()) },
    },
    // ── Slice KKKKKK — Self-accounting + filing + obligations ──
    {
      name: 'erpax.accounting.bookRevenue',
      description: 'Book subscription revenue per IFRS-15 §31-§39 (point-in-time / over-time recognition). Called by Stripe webhook handler on the platform tenant.',
      parameters: {
        platformTenantId: z.string(),
        booking: z.object({
          source: z.enum(['stripe', 'manual']),
          stripeInvoiceId: z.string().optional(),
          tenantId: z.string(),
          amountCents: z.number(),
          currency: z.string(),
          recognitionMethod: z.enum(['point-in-time', 'over-time']),
          performanceObligationsSatisfied: z.array(z.string()),
        }),
      },
      async handler({ platformTenantId, booking }) {
        return json(bookRevenue(platformTenantId as string, booking as never))
      },
    },
    {
      name: 'erpax.accounting.bookCost',
      description: 'Book a cost (Cloudflare infra / payroll / supplier / tax). Auto-called by the data agent for CF billing + HR agent for payroll.',
      parameters: {
        platformTenantId: z.string(),
        cost: z.object({
          source: z.enum(['cloudflare', 'payroll', 'supplier', 'tax']),
          category: z.string(),
          amountCents: z.number(),
          currency: z.string(),
          periodStart: z.string(),
          periodEnd: z.string(),
        }),
      },
      async handler({ platformTenantId, cost }) {
        return json(bookCost(platformTenantId as string, cost as never))
      },
    },
    {
      name: 'erpax.accounting.scheduleFiling',
      description: 'Schedule a regulatory filing (FINREP/COREP/IFRS-15/IFRS-S1/IFRS-S2/CSRD/VAT/DAC8/CRS/FATCA). Gov agent files it on dueAt - 1 day.',
      parameters: {
        platformTenantId: z.string(),
        filing: z.object({
          framework: z.enum(['FINREP','COREP','IFRS-15','IFRS-S1','IFRS-S2','CSRD','VAT','DAC8','CRS','FATCA']),
          periodEnd: z.string(),
          jurisdiction: z.string(),
          dueAt: z.string(),
        }),
      },
      async handler({ platformTenantId, filing }) {
        return json(scheduleFiling(platformTenantId as string, filing as never))
      },
    },
    {
      name: 'erpax.accounting.scheduleObligation',
      description: 'Schedule an obligation (VAT remittance / payroll / supplier invoice / regulator fee / tax prepayment). Finance + payment-provider agents settle it on dueAt via the declared payment rail.',
      parameters: {
        platformTenantId: z.string(),
        obligation: z.object({
          kind: z.enum(['vat-remittance','payroll','supplier-invoice','regulator-fee','tax-prepayment']),
          amountCents: z.number(),
          currency: z.string(),
          dueAt: z.string(),
          creditor: z.string(),
          paymentRailHint: z.enum(['sepa','swift','card','wire','sepa-instant']).optional(),
        }),
      },
      async handler({ platformTenantId, obligation }) {
        return json(scheduleObligation(platformTenantId as string, obligation as never))
      },
    },
    {
      name: 'erpax.accounting.lifecycleAudit',
      description: 'Conservation Law 26 — verify every revenue event booked + every filing filed by dueAt + every obligation paid by dueAt for the platform tenant. Returns overdue items for the meta-agent to escalate.',
      parameters: { platformTenantId: z.string() },
      async handler({ platformTenantId }) {
        return json(checkSelfAccountingComplete(platformTenantId as string))
      },
    },
    // ── Multi-currency GL — IAS-21 / ASC-830 (wire the FX service) ──
    {
      name: 'erpax.accounting.currencySetup',
      description: 'Establish a tenant\'s functional/reporting currency profile (base + supported + unrealized-gain account) for FX translation. Derives missing fields from the tenant country via the canonical regional defaults. IFRS IAS-21 (functional currency) + US-GAAP ASC-830 (reporting currency) + ISO-4217 currency-codes.',
      parameters: {
        tenantId: z.string(),
        baseCurrency: z.string().optional(),
        supportedCurrencies: z.array(z.string()).optional(),
        unrealizedGainAccountId: z.string().optional(),
        realizedGainAccountId: z.string().optional(),
        tenantCountry: z.string().optional(),
      },
      async handler(args, req) {
        // db-dependent (downstream journalEntryService uses the Local API); the
        // req reference also routes it to the integration-test lane via self-test.
        void req.payload
        const config = await multiCurrencyService.setupCurrencyConfig(
          args.tenantId as string,
          {
            tenantId: args.tenantId as string,
            ...(args.baseCurrency !== undefined ? { baseCurrency: args.baseCurrency as never } : {}),
            ...(args.supportedCurrencies !== undefined ? { supportedCurrencies: args.supportedCurrencies as never } : {}),
            ...(args.unrealizedGainAccountId !== undefined ? { unrealizedGainAccountId: args.unrealizedGainAccountId as string } : {}),
            ...(args.realizedGainAccountId !== undefined ? { realizedGainAccountId: args.realizedGainAccountId as string } : {}),
          },
          args.tenantCountry as string | undefined,
        )
        return json(config)
      },
    },
    {
      name: 'erpax.accounting.currencyRevalue',
      description: 'Run the month-end FX gain/loss revaluation for a tenant: compute the period-end currency adjustments then post the (balanced) gain/loss journal entry to the GL via the canonical journal-entry service. IFRS IAS-21 §28-§34 (exchange differences) + US-GAAP ASC-830-20 (foreign-currency transactions) + ISO-8601 period-end date.',
      parameters: {
        tenantId: z.string(),
        periodEnd: z.string(),
        tenantCountry: z.string().optional(),
      },
      async handler(args, req) {
        void req.payload // db-dependent — posts real journal entries via getPayload()
        const tenantId = args.tenantId as string
        // Ensure a currency profile exists (lazy-init from country defaults) so the
        // adjustment + posting path can resolve the base currency + gain account.
        multiCurrencyService.getOrInitConfig(tenantId, args.tenantCountry as string | undefined)
        const adjustment = await multiCurrencyService.calculateMonthEndCurrencyAdjustments(
          tenantId,
          new Date(args.periodEnd as string),
        )
        const journalEntryId = await multiCurrencyService.postCurrencyAdjustments(tenantId, adjustment)
        return json({ journalEntryId, status: adjustment.status, totalGain: adjustment.totalGain, totalLoss: adjustment.totalLoss })
      },
    },
    // ── Slice DDDDDD — DID resolver ──
    {
      name: 'erpax.did.create',
      description: 'Create a W3C DID Core v1.0 document for a tenant or agent (did:erpax:<uuid>). Content-addressed; portable across federation.',
      parameters: {
        subject: z.record(z.unknown()),
        publicKeyMultibase: z.string(),
      },
      async handler({ subject, publicKeyMultibase }) {
        return json(createDid({ subject: subject as Record<string, unknown>, publicKeyMultibase: publicKeyMultibase as string }))
      },
    },
    {
      name: 'erpax.did.resolve',
      description: 'Resolve a did:erpax:<uuid> identifier to its DID document.',
      parameters: { did: z.string() },
      async handler({ did }) { const d = resolveDid(did as string); return d ? json(d) : text(`unresolved: ${did as string}`) },
    },
    {
      name: 'erpax.did.list',
      description: 'List every DID registered with this instance.',
      parameters: {},
      async handler() { return json(listDids()) },
    },
    // ── Slice CCCCCC — Standards-as-live-objects ──
    {
      name: 'erpax.standards.publishLive',
      description: 'Publish a standard as a uuid-keyed live object (body / id / version / paragraph / bodyText). Tenants subscribe by uuid; supersession proposes rebinds.',
      parameters: {
        body: z.string(), id: z.string(), version: z.string(), paragraph: z.string().optional(),
        bodyText: z.string(), publisherDid: z.string(), supersedes: z.string().optional(),
      },
      async handler(args) {
        return json(publishStandard(args as never))
      },
    },
    {
      name: 'erpax.standards.resolveLive',
      description: 'Resolve a live-standard uuid to its content.',
      parameters: { uuid: z.string() },
      async handler({ uuid }) { const s = resolveStandard(uuid as string); return s ? json(s) : text(`unresolved: ${uuid as string}`) },
    },
    {
      name: 'erpax.standards.subscribe',
      description: 'Subscribe a tenant to a live-standard uuid. Future versions trigger Law 10 referential-harmony rebind proposals.',
      parameters: { tenantId: z.string(), standardUuid: z.string() },
      async handler({ tenantId, standardUuid }) {
        subscribeTenant(tenantId as string, standardUuid as string)
        return json({ ok: true, subscriptions: tenantSubscriptions(tenantId as string) })
      },
    },
    // ── Slice LLLLLL — Standards-as-vortices: citation graph + conflict + supersession ──
    {
      name: 'erpax.standards.addCitation',
      description: 'Slice LLLLLL: declare that standard X cites standard Y (e.g. IFRS-15 §B77 → IAS-2 §6). Builds the cross-standard coupling graph.',
      parameters: { citerUuid: z.string(), citedUuid: z.string() },
      async handler({ citerUuid, citedUuid }) {
        addCitation(citerUuid as string, citedUuid as string)
        return json({ ok: true })
      },
    },
    {
      name: 'erpax.standards.listCitations',
      description: 'Return the outgoing + incoming citation edges for a standard uuid (which standards it cites; which standards cite it).',
      parameters: { uuid: z.string() },
      async handler({ uuid }) { return json(listCitations(uuid as string)) },
    },
    {
      name: 'erpax.standards.declareConflict',
      description: 'Slice LLLLLL: declare that two standards are mutually exclusive (e.g. UK-IFRS-15 ⨯ IFRS-EU-15 post-Brexit).',
      parameters: { uuidA: z.string(), uuidB: z.string(), reason: z.string().optional() },
      async handler({ uuidA, uuidB, reason }) {
        declareConflict(uuidA as string, uuidB as string, reason as string | undefined)
        return json({ ok: true })
      },
    },
    {
      name: 'erpax.standards.declareSupersession',
      description: 'Slice LLLLLL: declare that standard X is superseded by standard Y in jurisdiction Z effective from a date (e.g. IAS-18 → IFRS-15 globally; AMLD5 → AMLD6 in EU).',
      parameters: {
        oldUuid: z.string(), newUuid: z.string(),
        jurisdiction: z.string(), effectiveDate: z.string(),
        notes: z.string().optional(),
      },
      async handler(args) {
        declareSupersession(args as never)
        return json({ ok: true })
      },
    },
    {
      name: 'erpax.standards.traceSupersession',
      description: 'Walk a standard\'s supersession chain in a jurisdiction. Returns ordered list of edges from the input uuid forward to the latest version.',
      parameters: { uuid: z.string(), jurisdiction: z.string() },
      async handler({ uuid, jurisdiction }) { return json(traceSupersession(uuid as string, jurisdiction as string)) },
    },
    {
      name: 'erpax.standards.lawConsistency',
      description: 'Conservation Law 27: verify a tenant\'s subscribed standards have no mutual conflicts. Surfaces pairs that the tenant must elect between.',
      parameters: { tenantId: z.string() },
      async handler({ tenantId }) { return json(checkStandardCitationsConsistent(tenantId as string)) },
    },
    {
      name: 'erpax.standards.lawSupersessions',
      description: 'Conservation Law 28: list every tenant subscription whose subscribed-uuid has been superseded in the tenant\'s jurisdiction. The MetaSkillAgent auto-applies safe rebinds.',
      parameters: { tenantId: z.string(), jurisdiction: z.string() },
      async handler({ tenantId, jurisdiction }) { return json(checkStandardSupersessionsResolved(tenantId as string, jurisdiction as string)) },
    },
    // ── Slice MMMMMM — interactive website (Pages from e2e + spec; import/export) ──
    {
      name: 'erpax.website.seedFromE2e',
      description: 'Slice MMMMMM: walk marketing/*.<locale>.html (Playwright e2e multimedia output) and return PageSeed[] ready for Payload\'s pages collection. The seeds carry the full per-locale walkthrough HTML — hero + storyboard + UX-gap callouts + audit-trail footer.',
      parameters: {},
      async handler() { return json(seedFromE2e({ repoRoot: process.cwd() })) },
    },
    {
      name: 'erpax.website.seedFromSpec',
      description: 'Slice MMMMMM: every CollectionSpec / Chain / Agent / TenantRoleProfile / standard family becomes a PageSeed for the public website. Browseable spec corpus + try-it-via-MCP CTA on every page.',
      parameters: {
        tenantId: z.string(),
        include: z.array(z.enum(['collection', 'chain', 'agent', 'role', 'standard'])).optional(),
      },
      async handler({ tenantId, include }) {
        return json(await seedFromSpec({ tenantId: tenantId as string, include: include as never }))
      },
    },
    {
      name: 'erpax.website.exportMediaBundle',
      description: 'Slice MMMMMM: serialise an array of PageSeed as ndjson — federation-friendly bundle that any peer ERPax instance can importMediaBundle.',
      parameters: { seeds: z.array(z.record(z.unknown())) },
      async handler({ seeds }) { return text(exportMediaBundle(seeds as never)) },
    },
    {
      name: 'erpax.marketing.strategy',
      description: 'Slice MMMMMM: return ERPax\'s declared marketing strategy + the 7 operationalised rules. Per user "transparency without security compromise".',
      parameters: {},
      async handler() { return json(ERPAX_MARKETING_STRATEGY) },
    },
    {
      name: 'erpax.marketing.deriveSeo',
      description: 'Auto-derive SEO meta (title + description + OG + Schema.org JSON-LD + keyword set) from a page title + body + axis hint.',
      parameters: {
        title: z.string(), description: z.string(),
        axis: z.enum(['collection', 'chain', 'agent', 'role', 'standard', 'walkthrough']),
        url: z.string().optional(), ogImage: z.string().optional(),
      },
      async handler(args) { return json(deriveSeoMeta(args as never)) },
    },
    {
      name: 'erpax.marketing.channelVariants',
      description: 'Generate channel-specific copy (blog post / email / press release / social X / social LinkedIn) from a base hero + body + standards count.',
      parameters: {
        title: z.string(), hero: z.string(), body: z.string(),
        citationCount: z.number(),
        cta: z.object({ url: z.string(), label: z.string() }),
      },
      async handler(args) { return json(generateChannelVariants(args as never)) },
    },
    {
      name: 'erpax.marketing.reviewBrandVoice',
      description: 'Brand-voice review against ERPax\'s plain-precise default voice. Flags marketing fluff (revolutionary / leverage / synergy) + sentences > 250 chars.',
      parameters: { text: z.string(), voice: z.enum(['plain-precise','bold-confident','measured-regulatory','community-warm']).optional() },
      async handler({ text, voice }) {
        return json(reviewBrandVoice(text as string, voice as never ?? 'plain-precise'))
      },
    },
    {
      name: 'erpax.marketing.auditSeo',
      description: 'SEO audit on a SeoMeta + body — title length / description length / keyword density / first-3 keywords appear in body.',
      parameters: { meta: z.record(z.unknown()), body: z.string() },
      async handler({ meta, body }) { return json(auditSeo(meta as never, body as string)) },
    },
    {
      name: 'erpax.marketing.transparencyCheck',
      description: 'Per "transparency without security compromise" strategy: verify a page about to publish carries no PII, sources only from erpax-platform/synthetic-* tenants, every standards claim resolves. Critical findings escalate; pages NEVER auto-publish if this fails.',
      parameters: {
        pageBody: z.string(),
        declaredStandards: z.array(z.object({ body: z.string(), id: z.string() })),
        sourceTenant: z.string(),
      },
      async handler(args) { return json(checkMarketingTransparency(args as never)) },
    },
    {
      name: 'erpax.marketing.buildOnboardingDrip',
      description: 'Generate the 5-email post-checkout onboarding sequence for a new tenant role (welcome / first MCP call / first audit pack / standards posture / quarterly filing).',
      parameters: { roleProfileId: z.string() },
      async handler({ roleProfileId }) { return json(buildOnboardingDrip(roleProfileId as string)) },
    },
    {
      name: 'erpax.website.importMediaBundle',
      description: 'Slice MMMMMM: parse a federation-broadcast ndjson bundle into PageSeed[] and return it for ingestion into the local Payload pages collection.',
      parameters: { ndjson: z.string() },
      async handler({ ndjson }) { return json(importMediaBundle(ndjson as string)) },
    },
    {
      name: 'erpax.website.uploadTestArtifacts',
      description: 'Walk a Playwright test-results directory (manifest.json + .png/.webm), upload each screenshot/video — and a generated WebVTT subtitle track per video — to the Media collection, and return the Media id map so the product-pages seed can reference them in hero.media. Node/CI only (reads the filesystem; not edge-safe). W3C WebVTT + WCAG-2.1 §1.2.2 captions + ISO 19011 audit-evidence.',
      parameters: {
        artifactsDir: z.string(),
        tenantId: z.string().optional(),
        manifestFile: z.string().optional(),
      },
      async handler(args, req) {
        void req.payload // db-dependent (writes Media) + filesystem-reading ⇒ Node-only, self-test skips it
        const result = await uploadTestArtifacts(
          req.payload,
          args.artifactsDir as string,
          {
            ...(args.tenantId !== undefined ? { tenantId: args.tenantId as string } : {}),
            ...(args.manifestFile !== undefined ? { manifestFile: args.manifestFile as string } : {}),
          },
        )
        return json(result)
      },
    },
    // ── Bulk operations — unified CSV/EDI/camt.053/pain.001 import/export ──
    {
      name: 'erpax.bulk.enqueue',
      description: 'Enqueue a bulk import/export/reprocess/reverse operation (CSV / xlsx / json(l) / UBL / CII / camt.053-054 / pain.001-008 / EDIFACT / PDF-OCR). Writes an audit-events row immediately (operation visible before the queue consumer wakes) and returns the operationId for progress tracking. ISO 20022 + EN-16931 + RFC 4180 + SOX §404 import-completeness.',
      parameters: {
        tenantId: z.string(),
        targetCollection: z.string(),
        kind: z.enum(['import', 'export', 'reprocess', 'reverse']),
        format: z.enum(['csv', 'xlsx', 'json', 'jsonl', 'xml_ubl', 'xml_cii', 'camt_053', 'camt_054', 'pain_001', 'pain_008', 'edifact', 'pdf_ocr']),
        sourceUrl: z.string().optional(),
        sourceContent: z.string().optional(),
        operationId: z.string().optional(),
        notifyUserId: z.string().optional(),
      },
      async handler(args, req) {
        // FAIL-CLOSED: never let an arbitrary slug reach payload.create — validate
        // against the computed known-collection set before enqueue (tenant guard).
        const targetCollection = args.targetCollection as string
        if (!KNOWN_COLLECTION_SLUGS.has(targetCollection)) {
          return json({ ok: false, reason: `unknown targetCollection '${targetCollection}'` })
        }
        const result = await enqueueBulkOperation(
          req.payload,
          {
            tenantId: args.tenantId as string,
            targetCollection,
            kind: args.kind as BulkOperationKind,
            format: args.format as BulkFormat,
            ...(args.sourceUrl !== undefined ? { sourceUrl: args.sourceUrl as string } : {}),
            ...(args.sourceContent !== undefined ? { sourceContent: args.sourceContent as string } : {}),
            ...(args.operationId !== undefined ? { operationId: args.operationId as string } : {}),
            ...(args.notifyUserId !== undefined ? { notifyUserId: args.notifyUserId as string } : {}),
          },
          req,
        )
        return json(result)
      },
    },
    // ── Slice NNNNNN — SEO-as-vortices (Law 29) ──
    {
      name: 'erpax.seo.registerFace',
      description: 'Slice NNNNNN: register a SeoVortexFace for a published page. The face carries Schema.org type + Open Graph type + content uuid + outgoing edges to related pages. Run after each PageSeed is persisted.',
      parameters: {
        url: z.string(), title: z.string(), description: z.string(),
        schemaType: z.enum(['WebPage', 'Article', 'SoftwareApplication', 'Organization', 'Dataset', 'Action', 'TechArticle', 'CreativeWork', 'CollectionPage']),
        ogType: z.enum(['website', 'article', 'product', 'profile', 'video']),
        contentUuid: z.string(), ogImage: z.string().optional(),
        hreflang: z.array(z.object({ locale: z.string(), url: z.string() })).optional(),
        outgoing: z.array(z.object({
          relation: z.enum(['isPartOf', 'mentions', 'cites', 'derivedFrom', 'subjectOf', 'workExample', 'hasPart']),
          targetUrl: z.string(), targetType: z.string(), targetName: z.string(),
        })).optional(),
        axisHint: z.enum(['collection', 'chain', 'agent', 'role', 'standard', 'walkthrough']).optional(),
      },
      async handler(args) {
        const face: SeoVortexFace = {
          url: args.url as string, title: args.title as string, description: args.description as string,
          schemaType: args.schemaType as SchemaType, ogType: args.ogType as OgType,
          ogImage: args.ogImage as string | undefined,
          ogUpdatedTime: new Date().toISOString(),
          contentUuid: args.contentUuid as string, previousContentUuids: [],
          hreflang: (args.hreflang as Array<{ locale: string; url: string }>) ?? [],
          outgoing: ((args.outgoing as Array<{ relation: string; targetUrl: string; targetType: string; targetName: string }>) ?? []).map((e) => ({
            relation: e.relation as 'isPartOf' | 'mentions' | 'cites' | 'derivedFrom' | 'subjectOf' | 'workExample' | 'hasPart',
            targetUrl: e.targetUrl, targetType: e.targetType as SchemaType, targetName: e.targetName,
          })),
          incoming: [],
          axisHint: args.axisHint as SeoVortexFace['axisHint'],
        }
        registerFace(face)
        return json({ ok: true, registered: face.url })
      },
    },
    {
      name: 'erpax.seo.crossLink',
      description: 'Slice NNNNNN: build the citation graph — for every face, populate its incoming edges from the outgoing edges of every other face. Required before checkCoupling / generateSitemap.',
      parameters: {},
      async handler() { return json(crossLink()) },
    },
    {
      name: 'erpax.seo.renderJsonLd',
      description: 'Slice NNNNNN: render the Schema.org JSON-LD <script> for a face URL. Embed this in the page <head>.',
      parameters: { url: z.string() },
      async handler({ url }) {
        const face = listFaces().find((f) => f.url === url)
        if (!face) return text(`(no face registered at ${url})`)
        return text(renderJsonLd(face))
      },
    },
    {
      name: 'erpax.seo.renderOgMeta',
      description: 'Slice NNNNNN: render the Open Graph + Twitter + alternate hreflang <meta>/<link> tags for a face URL. Embed this in the page <head>.',
      parameters: { url: z.string() },
      async handler({ url }) {
        const face = listFaces().find((f) => f.url === url)
        if (!face) return text(`(no face registered at ${url})`)
        return text(renderOgMeta(face))
      },
    },
    {
      name: 'erpax.seo.generateSitemap',
      description: 'Slice NNNNNN: generate sitemap.xml for every registered SEO face, with xhtml:link alternates for every locale. Serve at /sitemap.xml.',
      parameters: { siteOrigin: z.string() },
      async handler({ siteOrigin }) { return text(generateSitemap(siteOrigin as string)) },
    },
    {
      name: 'erpax.seo.generateRobots',
      description: 'Slice NNNNNN: generate robots.txt — exposes the audit trail + spec corpus to crawlers (transparency strategy MMMMMM); explicitly opts in ClaudeBot/GPTBot/Google-Extended for AI training.',
      parameters: { siteOrigin: z.string() },
      async handler({ siteOrigin }) { return text(generateRobots(siteOrigin as string)) },
    },
    {
      name: 'erpax.seo.checkCoupling',
      description: 'Conservation Law 29 — every published SEO face must have ≥minDegree inbound + outbound microdata edges. Returns under-coupled pages so the platform can refuse to publish them or mark them as scope:pending-coupling.',
      parameters: { minDegree: z.number().int().min(1).max(10).optional() },
      async handler({ minDegree }) { return json(checkSeoVortexCoupling((minDegree as number | undefined) ?? 2)) },
    },
    {
      name: 'erpax.seo.bitemporalAnchor',
      description: 'Slice NNNNNN: when a page content-uuid changes, register the old uuid so requests to historical URLs 301 to the canonical URL and og:updated_time is bumped.',
      parameters: { url: z.string(), oldUuid: z.string(), newUuid: z.string() },
      async handler({ url, oldUuid, newUuid }) {
        const updated = bitemporalAnchor({ url: url as string, oldUuid: oldUuid as string, newUuid: newUuid as string })
        return json(updated ?? { ok: false, reason: 'face not registered' })
      },
    },
    {
      name: 'erpax.seo.validateMicrodata',
      description: 'Slice NNNNNN: validate a face — Schema.org-required fields present, BCP-47 hreflang, no orphan edges. Major issues block publish; minor issues are warnings.',
      parameters: { url: z.string() },
      async handler({ url }) {
        const face = listFaces().find((f) => f.url === url)
        if (!face) return json({ ok: false, issues: [{ field: 'url', severity: 'major', detail: 'no face registered' }] })
        return json(validateMicrodata(face))
      },
    },
    // ── shadcn extension (slice MMMMMM cont.) ──
    {
      name: 'erpax.website.shadcnInventory',
      description: 'Per user "and here you can use the whole power of shadcn for anything beyond payload" — return the SHADCN_SURFACE_MAP describing every interactive surface (12 site surfaces) and which shadcn components they require, plus the union of all required components.',
      parameters: {},
      async handler() {
        return json({
          surfaces: SHADCN_SURFACE_MAP,
          allComponents: allRequiredShadcnComponents(),
          totalSurfaces: SHADCN_SURFACE_MAP.length,
        })
      },
    },
    {
      name: 'erpax.website.shadcnSurface',
      description: 'Look up a single SiteSurface (e.g. "mcp-playground", "conservation-dashboard", "cloning-ui") and return its shadcn component requirements + MCP tools + Schema.org type + description.',
      parameters: {
        surface: z.enum([
          'mcp-playground', 'conservation-dashboard', 'spec-corpus-browser',
          'tenant-role-activator', 'federation-explorer', 'audit-trail-viewer',
          'cloning-ui', 'stripe-checkout-embed', 'standards-graph-viz',
          'walkthrough-player', 'i18n-coverage-heatmap', 'cost-carbon-meter',
        ]),
      },
      async handler({ surface }) {
        return json(shadcnSurfaceFor(surface as SiteSurface) ?? { ok: false, reason: 'unknown surface' })
      },
    },
    // ── Slice PPPPPP — agents-as-shadcn-blocks (Law 32) ──
    {
      name: 'erpax.blocks.list',
      description: 'Per user "i realize the mcp agents are like the bloocks in shadcn. blocks of types as components" — return the block catalog: every agent as a typed AgentBlockManifest with accepts/emits surfaces + category + standards.',
      parameters: {},
      async handler() { return json(buildBlockCatalog(registry)) },
    },
    {
      name: 'erpax.blocks.get',
      description: 'Slice PPPPPP: look up a single agent block by id (e.g. "finance", "legal", "data") — its typed surface for use as a shadcn-style composable block.',
      parameters: {
        agentId: z.enum([
          'finance', 'sales', 'marketing', 'hr', 'legal', 'ops', 'engineering',
          'customer-support', 'data', 'design', 'product', 'productivity',
          'enterprise-search', 'plugins', 'meta-skill',
        ]),
      },
      async handler({ agentId }) {
        const a = registry.byId(agentId as never)
        if (!a) return json({ ok: false, reason: 'unknown agent' })
        return json(manifestOf(a))
      },
    },
    {
      name: 'erpax.blocks.compose',
      description: 'Slice PPPPPP: compose two agent blocks — A\'s emitted events feed into B\'s subscription set. Returns the composition + the shared event types at the boundary; ok=false if no shared types (Law 32 type-incoherent).',
      parameters: {
        upstreamId: z.enum([
          'finance', 'sales', 'marketing', 'hr', 'legal', 'ops', 'engineering',
          'customer-support', 'data', 'design', 'product', 'productivity',
          'enterprise-search', 'plugins', 'meta-skill',
        ]),
        downstreamId: z.enum([
          'finance', 'sales', 'marketing', 'hr', 'legal', 'ops', 'engineering',
          'customer-support', 'data', 'design', 'product', 'productivity',
          'enterprise-search', 'plugins', 'meta-skill',
        ]),
      },
      async handler({ upstreamId, downstreamId }) {
        const u = registry.byId(upstreamId as never)
        const d = registry.byId(downstreamId as never)
        if (!u || !d) return json({ ok: false, reason: 'unknown agent' })
        const comp = composeBlocks(manifestOf(u), manifestOf(d))
        return json(validateComposition(comp))
      },
    },
    {
      name: 'erpax.blocks.chain',
      description: 'Slice PPPPPP: compose N blocks into a meta-block. Returns the composition path; on first type-incoherent boundary, returns the failure detail.',
      parameters: {
        agentIds: z.array(z.enum([
          'finance', 'sales', 'marketing', 'hr', 'legal', 'ops', 'engineering',
          'customer-support', 'data', 'design', 'product', 'productivity',
          'enterprise-search', 'plugins', 'meta-skill',
        ])).min(2),
      },
      async handler({ agentIds }) {
        const ids = agentIds as string[]
        const manifests: AgentBlockManifest[] = []
        for (const id of ids) {
          const a = registry.byId(id as never)
          if (!a) return json({ ok: false, reason: `unknown agent ${id}` })
          manifests.push(manifestOf(a))
        }
        return json(chainBlocks(manifests))
      },
    },
    {
      name: 'erpax.blocks.checkCoupling',
      description: 'Conservation Law 32 — registry-wide audit: every emitted event has a consumer; every subscribed event has an emitter. Mirrors the shadcn rule "every block variant must be reachable from at least one composition example".',
      parameters: {},
      async handler() { return json(checkRegistryCoupling(registry)) },
    },
    // ── Slice RRRRRR — quantum-stream layer (Law 33) ──
    {
      name: 'erpax.streams.probeWindow',
      description: 'Per user "in the quantum world it is stream" — synthetic 16-event burst through a tumbling window; returns the per-window Lamport-coherence verdict. Conservation Law 33 baseline.',
      parameters: { windowMs: z.number().int().min(1).max(60_000).optional() },
      async handler({ windowMs }) {
        const stream = makeStream({ id: 'probe-stream' })
        const ms = (windowMs as number | undefined) ?? 50
        const win = tumblingWindow(stream, ms)
        for (let i = 0; i < 16; i++) {
          stream.push({ id: `probe.${i}`, tenantId: 'probe', payload: { i }, emittedAt: new Date().toISOString() })
        }
        stream.close()
        const buckets: Array<{ start: number; end: number; coherent: boolean }> = []
        for await (const b of win) {
          const c = checkWindowCoherence(b.events)
          buckets.push({ start: b.window.start, end: b.window.end, coherent: c.ok })
        }
        return json({ buckets, allCoherent: buckets.every((b) => b.coherent) })
      },
    },
    {
      name: 'erpax.streams.checkCoherence',
      description: 'Conservation Law 33 — verify a list of {event, lamport} pairs are in monotonically non-decreasing Lamport order. Out-of-order pairs are causal-coherence violations.',
      parameters: {
        events: z.array(z.object({ id: z.string(), tenantId: z.string(), lamport: z.number().int() })),
      },
      async handler({ events }) {
        const arr = (events as Array<{ id: string; tenantId: string; lamport: number }>).map((e) => ({
          event: { id: e.id, tenantId: e.tenantId, payload: {}, emittedAt: new Date().toISOString() },
          lamport: e.lamport,
        }))
        return json(checkWindowCoherence(arr))
      },
    },
    {
      name: 'erpax.streams.checkUuidChain',
      description: 'Conservation Law 34 — per user "uuid protects the stream from tampering": verify a list of ClockedEvent (event + lamport + streamUuid + prevStreamUuid). Any tampering — re-ordering, mutation, insertion, deletion — breaks the chain at the point of corruption and downstream.',
      parameters: {
        events: z.array(z.object({
          event: z.object({ id: z.string(), tenantId: z.string(), payload: z.record(z.unknown()), emittedAt: z.string() }),
          lamport: z.number().int(),
          streamUuid: z.string(),
          prevStreamUuid: z.union([z.string(), z.null()]),
        })),
        tenantNs: z.string().optional(),
      },
      async handler({ events, tenantNs }) {
        return json(checkStreamUuidChain(events as unknown as ClockedEvent[], tenantNs as string | undefined))
      },
    },
    // ── Slice TTTTTT + UUUUUU — storage independence + replication ──
    {
      name: 'erpax.storage.listBackends',
      description: 'Per user "this way any object is storage independent" — list every registered storage backend (memory always present; production adds D1/R2/KV/DO/IPFS/Arweave/Filecoin/peer-erpax).',
      parameters: {},
      async handler() { return json({ backends: listBackends() }) },
    },
    {
      name: 'erpax.storage.verifyAcrossBackends',
      description: 'Slice TTTTTT: read an object from every registered backend; recompute its content uuid; verify all match the input. Returns per-backend verdict so missing replicas / tampered bytes are localizable.',
      parameters: { collection: z.string(), uuid: z.string(), tenantId: z.string() },
      async handler({ collection, uuid, tenantId }) {
        return json(await verifyAcrossBackends({
          collection: collection as string, uuid: uuid as string, tenantId: tenantId as string,
        }))
      },
    },
    {
      name: 'erpax.storage.planMigration',
      description: 'Slice TTTTTT: compute which uuids need to be copied from source to target backend (toCopy / alreadyPresent / missingFromSource). The actual byte-copy is delegated to the backend driver.',
      parameters: { source: z.string(), target: z.string(), collection: z.string(), uuids: z.array(z.string()), tenantId: z.string() },
      async handler({ source, target, collection, uuids, tenantId }) {
        return json(await planMigration({
          source: source as string, target: target as string, collection: collection as string,
          uuids: uuids as string[], tenantId: tenantId as string,
        }))
      },
    },
    {
      name: 'erpax.storage.replicate',
      description: 'Conservation Law 36 — per user "uuid solves any replication": copy bytes from source backend to N target backends; recompute uuid at each target; report per-target ok/mismatch. No master/slave coordination.',
      parameters: { source: z.string(), targets: z.array(z.string()), collection: z.string(), uuid: z.string(), tenantId: z.string() },
      async handler({ source, targets, collection, uuid, tenantId }) {
        return json(await replicateObject({
          source: source as string, targets: targets as string[],
          collection: collection as string, uuid: uuid as string, tenantId: tenantId as string,
        }))
      },
    },
    {
      name: 'erpax.storage.consensusRead',
      description: 'Conservation Law 36 — Byzantine-fault-tolerant read: query up to K backends; if at least minAgreement return matching uuids, succeed. Tampered backends fail alone; consensus continues.',
      parameters: { collection: z.string(), uuid: z.string(), tenantId: z.string(), minAgreement: z.number().int().min(1) },
      async handler({ collection, uuid, tenantId, minAgreement }) {
        return json(await consensusRead({
          collection: collection as string, uuid: uuid as string,
          tenantId: tenantId as string, minAgreement: minAgreement as number,
        }))
      },
    },
    {
      name: 'erpax.storage.checkIndependence',
      description: 'Conservation Law 35 — synthetic content-uuid object recomputes the same uuid across every registered backend. Boot-suite probe; raise per-tenant when production backends online.',
      parameters: { tenantId: z.string().optional() },
      async handler({ tenantId }) { return json(await checkStorageIndependence((tenantId as string | undefined) ?? 'storage-probe')) },
    },
    {
      name: 'erpax.streams.tumblingDemo',
      description: 'Slice RRRRRR demo: push N events through a tumblingWindow(ms) and return the per-window event counts + total. Useful for clients implementing high-throughput dashboards.',
      parameters: { events: z.number().int().min(1).max(1000), windowMs: z.number().int().min(1).max(60_000) },
      async handler({ events, windowMs }) {
        const stream = makeStream({ id: 'tumbling-demo' })
        const win = tumblingWindow(stream, windowMs as number)
        const total = events as number
        for (let i = 0; i < total; i++) {
          stream.push({ id: 'tick', tenantId: 'demo', payload: { i }, emittedAt: new Date().toISOString() })
        }
        stream.close()
        const buckets: Array<{ start: number; end: number; count: number }> = []
        for await (const b of win) buckets.push({ start: b.window.start, end: b.window.end, count: b.events.length })
        return json({ buckets, total })
      },
    },
    {
      name: 'erpax.blocks.chainsAsCompositions',
      description: 'Per user "so erpax is chains of blocks" — derive every BUSINESS_CHAIN as a typed block composition path. Each step\'s owning agent is a node; consecutive steps form composeBlocks() boundaries. Returns { chainId, path, composition } for each chain so the UI can render flow diagrams and the boot suite can assert end-to-end type safety.',
      parameters: {},
      async handler() { return json(chainsAsBlockCompositions(registry)) },
    },
    // ── Slice OOOOOO — voting/rating uuid coupling (Laws 30 + 31) ──
    {
      name: 'erpax.voting.createBallot',
      description: 'Slice OOOOOO: create a content-addressable ballot. Returns the ballot uuid. Subject can be any tamper-proof object uuid; periodUuid separates voting rounds (also drives the per-period pseudo-DID).',
      parameters: {
        tenantId: z.string(), subjectUuid: z.string(), periodUuid: z.string(),
        kind: z.enum(['binary', 'choice-one', 'rank', 'rating-1to5', 'rating-1to10', 'sentiment-pos-neg']),
        choices: z.array(z.string()).optional(),
        opensAt: z.string(), closesAt: z.string(),
      },
      async handler(args) {
        const ballot = createBallot({
          tenantId: args.tenantId as string,
          subjectUuid: args.subjectUuid as string,
          periodUuid: args.periodUuid as string,
          kind: args.kind as BallotKind,
          choices: (args.choices as string[]) ?? [],
          opensAt: args.opensAt as string,
          closesAt: args.closesAt as string,
        })
        return json(ballot)
      },
    },
    {
      name: 'erpax.voting.castVote',
      description: 'Slice OOOOOO: cast a vote against a ballot. Vote uuid is derived from (ballotUuid, voterPseudoDid, subjectUuid, periodUuid, value); double-cast returns duplicate-vote (Law 31). Voter master DID is hashed with periodUuid to a pseudo-DID — cross-period unlinkability.',
      parameters: {
        ballotUuid: z.string(),
        voterMasterDid: z.string(),
        value: z.record(z.unknown()),
        signature: z.string(),
        castAt: z.string().optional(),
      },
      async handler(args) {
        return json(castVote({
          ballotUuid: args.ballotUuid as string,
          voterMasterDid: args.voterMasterDid as string,
          value: args.value as unknown as VoteValue,
          signature: args.signature as string,
          castAt: args.castAt as string | undefined,
        }))
      },
    },
    {
      name: 'erpax.voting.computeAggregate',
      description: 'Slice OOOOOO: compute and persist the ballot aggregate. Aggregate uuid = content-uuid({tenantId, ballotUuid, sorted leaf uuids, tally, weightedAverage, closedAt}). Anyone with the leaves can recompute (Law 30).',
      parameters: { ballotUuid: z.string(), closedAt: z.string().optional() },
      async handler({ ballotUuid, closedAt }) {
        return json(computeAggregate(ballotUuid as string, closedAt as string | undefined))
      },
    },
    {
      name: 'erpax.voting.verifyAggregate',
      description: 'Conservation Law 30 — verify a published aggregate by re-deriving its uuid from leaves. Returns ok=false + issue list if any leaf is tampered (Law 8) or if the aggregate uuid does not match.',
      parameters: { ballotUuid: z.string() },
      async handler({ ballotUuid }) { return json(verifyAggregate(ballotUuid as string)) },
    },
    {
      name: 'erpax.voting.checkNoDoubleVoting',
      description: 'Conservation Law 31 — scan every recorded vote and report duplicate (ballot, voterPseudoDid, subjectUuid) triples. Should always return ok=true since vote uuid derivation collides at cast-time; this is the post-hoc auditor.',
      parameters: {},
      async handler() { return json(checkNoDoubleVoting()) },
    },
    {
      name: 'erpax.voting.listBallots',
      description: 'List all ballots for a tenant (in-memory store; production layer pages through Payload).',
      parameters: { tenantId: z.string() },
      async handler({ tenantId }) { return json(listBallots(tenantId as string)) },
    },
    {
      name: 'erpax.voting.listVotes',
      description: 'List all votes for a ballot (with their content uuids — verifiable individually via Law 8).',
      parameters: { ballotUuid: z.string() },
      async handler({ ballotUuid }) { return json(listVotes(ballotUuid as string)) },
    },
    {
      name: 'erpax.voting.exportBallotBundle',
      description: 'Slice OOOOOO: emit a JCS-canonicalised JSON bundle of {ballot, votes, aggregate} for federation broadcast (slice AAAAAA) or external audit. Receivers can re-derive every uuid.',
      parameters: { ballotUuid: z.string() },
      async handler({ ballotUuid }) { return text(exportBallotBundle(ballotUuid as string)) },
    },
    {
      name: 'erpax.voting.derivePseudoDid',
      description: 'Slice OOOOOO: HKDF-style derivation of a voter\'s per-period pseudo-DID. Two votes by the same master DID in two different periods are statistically unlinkable without the master DID.',
      parameters: { voterMasterDid: z.string(), ballotPeriodUuid: z.string() },
      async handler({ voterMasterDid, ballotPeriodUuid }) {
        return json({ pseudoDid: derivePseudoDid(voterMasterDid as string, ballotPeriodUuid as string) })
      },
    },
    {
      name: 'erpax.standards.classify',
      description: 'Classify a standards body into one of the 7 standard families: ifrs-ias / iso / eu-directive / us-fed / w3c-ietf / cloudflare / un-oecd-wco. Used by the standards-as-vortices coupling matrix (§0g).',
      parameters: { body: z.string() },
      async handler({ body }) { return json({ family: familyOf(body as string) }) },
    },
    // ── Slice BBBBBB — Blockchain anchoring ──
    {
      name: 'erpax.anchoring.anchorRoot',
      description: 'Anchor a Merkle audit-chain root to a public chain (default: notary-signature stub). Regulators verify by resolving the chain anchor.',
      parameters: { tenantId: z.string(), merkleRoot: z.string() },
      async handler({ tenantId, merkleRoot }) {
        const receipt = await anchorRoot({
          tenantId: tenantId as string, merkleRoot: merkleRoot as string, backend: NOTARY_STUB_BACKEND,
        })
        return json(receipt)
      },
    },
    {
      name: 'erpax.anchoring.list',
      description: 'List every audit anchor for a tenant — transaction ids on whatever chains were used.',
      parameters: { tenantId: z.string() },
      async handler({ tenantId }) { return json(listAnchors(tenantId as string)) },
    },
    // ── Slice EEEEEE — Long-term archival ──
    {
      name: 'erpax.archival.list',
      description: 'List long-term archive pinning receipts for a tenant (IPFS / Arweave / Filecoin / R2-Glacier).',
      parameters: { tenantId: z.string() },
      async handler({ tenantId }) { return json(tenantPins(tenantId as string)) },
    },
    // ── Slice QQQQQ — Meta-automation ──
    {
      name: 'erpax.meta.listProposals',
      description: 'List FixProposals the MetaSkillAgent has produced from invariant WARN/FAIL signals — what was auto-applied vs escalated to the maintainer.',
      parameters: {},
      async handler() { return json(listProposals()) },
    },
    {
      name: 'erpax.agents.capabilities',
      description: 'List every registered DomainAgent\'s capability matrix (Law 17 — roleId + readScopes + writeScopes + mcpToolPermissions + jurisdictions).',
      parameters: {},
      async handler() { return json([...listAgentCapabilities().entries()]) },
    },
    {
      name: 'erpax.standards.cite',
      description: 'List the standards (IFRS / IAS / SOX / ISO / NIST / GDPR / EN / RFC / OECD / W3C) cited by a given collection or chain.',
      parameters: { target: z.string() },
      async handler({ target }) {
        const corpus = extractCorpus(process.cwd())
        const spec = corpus.collections.find((c) => c.slug === target)
        return spec ? json(spec.standards) : text(`No spec for '${target as string}'`)
      },
    },
    {
      name: 'erpax.integrity.verifyObject',
      description: 'Conservation Law 8: fetch a row from a tamper-proof collection, recompute its content-uuid (RFC 9562 §5.8 + RFC 8785 + SHA-256), and compare to the stored uuid. Returns {ok: true} on match or {ok: false, expected, actual} on Byzantine tamper.',
      parameters: { collection: z.string(), id: z.string() },
      async handler({ collection, id }, req) {
        if (!TAMPER_PROOF_COLLECTIONS_REGISTRY.has(collection as string)) {
          return text(`Collection '${collection as string}' has not opted into Law 8 (tamperProofUuidField).`)
        }
        const doc = await req.payload.findByID({ collection: collection as never, id: id as string })
        if (!doc) return text(`Not found: ${collection as string}#${id as string}`)
        const obj = doc as Record<string, unknown> & { uuid?: string; tenant?: string }
        const tenantId = typeof obj.tenant === 'string' ? obj.tenant : 'unknown'
        return json(verifyContentUuid(obj, tenantId))
      },
    },
    {
      name: 'erpax.refs.resolve',
      description: 'Conservation Law 10: resolve a uuid reference to its row + verify content integrity (Law 8). Returns the row when its recomputed uuid matches the pointer, or null on the harmony "disappear" case (referenced content has changed or row is missing).',
      parameters: { collection: z.string(), uuid: z.string(), tenantId: z.string() },
      async handler({ collection, uuid, tenantId }, req) {
        const row = await resolveByUuid({
          payload: req.payload,
          collection: collection as string,
          uuid: uuid as string,
          tenantId: tenantId as string,
        })
        return row ? json(row) : text(`unresolved: ${collection as string}@${(uuid as string).slice(0, 8)} for tenant ${tenantId as string}`)
      },
    },
    {
      name: 'erpax.refs.findDangling',
      description: 'Conservation Law 10 sweep: walk every uuidRef field on every opted-in collection for a tenant; return the list of unresolved pointers ({owningCollection, owningId, fieldPath, targetCollection, uuid}). Empty list = full referential harmony for that tenant.',
      parameters: { tenantId: z.string(), sampleSize: z.number().int().min(1).max(500).optional() },
      async handler({ tenantId, sampleSize }, req) {
        const dangling = await findDanglingRefs({
          payload: req.payload,
          tenantId: tenantId as string,
          sampleSize: sampleSize as number | undefined,
        })
        return json({ tenantId, sampled: UUID_REF_REGISTRY.size, dangling })
      },
    },
    {
      name: 'erpax.integrity.auditTenant',
      description: 'Conservation Law 8 bulk audit: for a given tenant, sample N rows from every tamper-proof collection, recompute uuids, return per-collection counts of {ok, tampered}. Use to confirm storage integrity end-to-end (and, with TTTTT, across redundant backends).',
      parameters: { tenantId: z.string(), sampleSize: z.number().int().min(1).max(500).optional() },
      async handler({ tenantId, sampleSize }, req) {
        const limit = (sampleSize as number | undefined) ?? 50
        const collections = [...TAMPER_PROOF_COLLECTIONS_REGISTRY]
        const summary: Record<string, { ok: number; tampered: number; tamperedIds: string[] }> = {}
        for (const slug of collections) {
          const result = await req.payload.find({
            collection: slug as never,
            where: { tenant: { equals: tenantId } },
            limit,
            pagination: false,
          })
          let ok = 0
          const tamperedIds: string[] = []
          for (const doc of result.docs) {
            const obj = doc as Record<string, unknown> & { uuid?: string; id?: string | number }
            const v = verifyContentUuid(obj, tenantId as string)
            if (v.ok) ok++
            else tamperedIds.push(String(obj.id ?? obj.uuid ?? '?'))
          }
          summary[slug] = { ok, tampered: tamperedIds.length, tamperedIds }
        }
        return json({ tenantId, sampleSize: limit, collections: summary })
      },
    },
  ]

  // ── Slice WWWWWW — auto-generated tools (one per agent / chain /
  // tamper-proof collection / role / standards family). Concatenated
  // BEFORE the readiness tools so they show up in the catalog survey.
  for (const t of buildAutoGeneratedTools(registry)) tools.push(t)

  // ── Slice BBBBBBBBBB-cut1 (2026-05-11) — wire the orphan tool barrel.
  // Six new namespaces (Conservation Laws 58–64) become live MCP tools
  // here. They were authored in slices QQQQQQQQQ → AAAAAAAAAA but the
  // factories were exported by ./tools/index.ts and consumed by no one.
  // Names verified non-colliding with the inlined catalog above. Slice
  // EEEEEEEEEE unified the per-file ErpaxMcpTool interfaces with this
  // file's canonical type, so no cast is needed.
  for (const t of buildKvTools()) tools.push(t)
  for (const t of buildIntegrityExtensionTools()) tools.push(t)
  for (const t of buildSecurityTools()) tools.push(t)
  for (const t of buildShareTools()) tools.push(t)
  for (const t of buildFormatTools()) tools.push(t)
  for (const t of buildGovernanceTools()) tools.push(t)
  for (const t of buildErrorTools()) tools.push(t)
  // Slice CCCCCCCCC modularization, completed: the erpax.events.* family
  // (list / emit / subscribers / replay) was DRY-collapsed out of the
  // inline catalog above into the modular factory tools/events.ts. The
  // modular `replay` is the superset kept on reconciliation — it convenes
  // the agent society via the coil (conveneAgentSociety); the deleted
  // inline copy did not. Conservation Law 4 event-graph-closure.
  for (const t of buildEventsTools(registry)) tools.push(t)
  // Same Slice CCCCCCCCC collapse for the consistency.* + cloudflare.*
  // families: both factories were exported by ./tools yet never called,
  // while the live inline twins lived in the catalog above. Inline copies
  // deleted; concatenate the modular factories here — each is the superset
  // kept (the modular descriptions carry the 4-language i18n the inline
  // copies lacked). Neither factory takes the registry. Conservation
  // Law 38 mcp-tool-standardization.
  for (const t of buildConsistencyTools()) tools.push(t)
  for (const t of buildCloudflareTools()) tools.push(t)
  // ── Upstream executable-action surface (ActiveAdmin member/batch/reify) ──
  // The dominant upstream admin verbs — bulk state-transition (batch_action)
  // and version restore (reify) — ported as MCP tools so MCP-only agents can
  // drive them through the erpax API. Both work WITH the machinery (the
  // collection hooks + emitOnStatusTransition + Payload Versions), never around
  // it; both are admin-gated via STATE_MUTATING_TOOLS + wrapToolsWithTenantGuard.
  for (const t of buildBatchTools()) tools.push(t)
  for (const t of buildVersionsTools()) tools.push(t)

  // ── Slice XXXXXX — MCP self-standardization (Law 38) ──
  tools.push(
    {
      name: 'erpax.platform.standardization',
      description: 'Conservation Law 38 (slice XXXXXX) — per user "let mcp standardize itself": audit every tool against the naming convention erpax.<area>.<verb>, validate area is in CANONICAL_AREAS, and require hand-curated tools to cite >=1 standard (auto-generated tools exempt). Returns per-tool violation report (W3C JSON-LD).',
      parameters: {},
      async handler() { return json(checkMcpToolStandardization(tools)) },
    },
    {
      name: 'erpax.platform.standardsBundle',
      description: 'Slice XXXXXX — emit the MCP layer\'s own standards conformance bundle as Schema.org Dataset JSON-LD (per W3C JSON-LD 1.1). Federable + content-addressable. Drives the conservation-dashboard surface.',
      parameters: {},
      async handler() { return json(buildMcpStandardsBundle(tools)) },
    },
    {
      name: 'erpax.platform.canonicalAreas',
      description: 'Slice XXXXXX — return the canonical area taxonomy enforced by Conservation Law 38. Adding a new area requires editing CANONICAL_AREAS explicitly (forces conscious taxonomy decisions).',
      parameters: {},
      async handler() { return json({ canonicalAreas: CANONICAL_AREAS }) },
    },
    // ── Slice QQQQQQQQ — runtime MCP standards index ──
    {
      name: 'erpax.platform.standardsIndex',
      description: 'Per user "deep document related standards inline starting with mcp" — return the runtime MCP_STANDARDS_INDEX: every standard the MCP layer cites (RFC / W3C / ISO / Schema.org / MCP / topology) with its family + citing modules + governed Conservation Laws. Comprehensive doc: docs/standards/mcp.md (W3C JSON-LD 1.1 + ISO 19011:2018 §6.4.6).',
      parameters: {},
      async handler() { return json(listMcpStandards()) },
    },
    {
      name: 'erpax.platform.standardsByFamily',
      description: 'Slice QQQQQQQQ — filter MCP_STANDARDS_INDEX by family: mcp / rfc-ietf / w3c / iso / schema-org / topology / open-graph / other.',
      parameters: {
        family: z.enum(['mcp', 'rfc-ietf', 'w3c', 'iso', 'schema-org', 'topology', 'open-graph', 'other']),
      },
      async handler({ family }) {
        return json(mcpStandardsByFamily(family as McpStandardEntry['family']))
      },
    },
    {
      name: 'erpax.platform.standardsForLaw',
      description: 'Slice QQQQQQQQ — reverse-lookup: which standards govern a given Conservation Law N? Returns the subset of MCP_STANDARDS_INDEX entries whose conservationLaws include N (per ISO 19011:2018 §6.4.6 audit-evidence traceability).',
      parameters: { num: z.number().int().min(1).max(99) },
      async handler({ num }) { return json(standardsForLaw(num as number)) },
    },
    // ── Slice YYYYYY — let MCP present itself as microdata + OG (Law 39) ──
    {
      name: 'erpax.platform.toolAsAction',
      description: 'Per user "let mcp present itself as microdata open graphs" — render a single MCP tool as a Schema.org Action JSON-LD (W3C JSON-LD 1.1 + Schema.org Action vocabulary). Drives the SEO + AI-crawler discoverability of the MCP catalog.',
      parameters: { toolName: z.string(), origin: z.string() },
      async handler({ toolName, origin }) {
        const tool = tools.find((t) => t.name === toolName)
        if (!tool) return json({ ok: false, reason: `unknown tool ${toolName as string}` })
        return json(mcpToolAsAction(tool, origin as string))
      },
    },
    {
      name: 'erpax.platform.toolAsOg',
      description: 'Slice YYYYYY — render Open Graph + Twitter Card meta for one MCP tool (W3C Open Graph protocol). Use to give every tool a shareable preview card.',
      parameters: { toolName: z.string(), origin: z.string() },
      async handler({ toolName, origin }) {
        const tool = tools.find((t) => t.name === toolName)
        if (!tool) return json({ ok: false, reason: `unknown tool ${toolName as string}` })
        return json(mcpToolAsOg(tool, origin as string))
      },
    },
    {
      name: 'erpax.platform.toolHead',
      description: 'Slice YYYYYY — full <head> snippet for a tool detail page: JSON-LD Action + OG + Twitter Card meta combined (W3C Microdata 1.1 + Schema.org).',
      parameters: { toolName: z.string(), origin: z.string() },
      async handler({ toolName, origin }) {
        const tool = tools.find((t) => t.name === toolName)
        if (!tool) return text(`(unknown tool ${toolName as string})`)
        return text(renderToolHead(tool, origin as string))
      },
    },
    {
      name: 'erpax.platform.areaAsPage',
      description: 'Slice YYYYYY — render a canonical MCP area as a Schema.org CollectionPage (W3C JSON-LD 1.1) listing every tool in the area as hasPart edges. Drives the per-area browsing surface.',
      parameters: { area: z.string(), origin: z.string() },
      async handler({ area, origin }) { return json(areaAsCollectionPage(area as string, tools, origin as string)) },
    },
    {
      name: 'erpax.platform.registerAsSeoFaces',
      description: 'Slice YYYYYY — register every MCP tool + area + the root /mcp/ as SeoVortexFaces (slice NNNNNN). After registration, calling erpax.seo.crossLink populates the citation graph; the MCP catalog becomes a fully-coupled SEO vortex (Law 29 satisfied for the MCP layer).',
      parameters: { origin: z.string() },
      async handler({ origin }) {
        // Content uuid over the catalog snapshot — drives bitemporal SEO (slice NNNNNN bitemporalAnchor).
        const snapshot = tools.map((t) => ({ name: t.name, description: t.description, params: Object.keys(t.parameters) }))
        const contentUuid = computeContentUuid({ snapshot } as Record<string, unknown>, 'mcp-catalog')
        return json(registerAllMcpFaces({ tools, origin: origin as string, contentUuidForCatalog: contentUuid }))
      },
    },
    {
      name: 'erpax.platform.checkPresentationCoverage',
      description: 'Conservation Law 39 — every MCP tool must have a registered SeoVortexFace with schemaType Action and >=1 outbound microdata edge. Run after erpax.platform.registerAsSeoFaces.',
      parameters: { origin: z.string() },
      async handler({ origin }) { return json(checkMcpPresentationCoverage(tools, origin as string)) },
    },
    // ── Slice ZZZZZZ — MCP rebuilds itself from the source (Law 40) ──
    {
      name: 'erpax.platform.rebuildFromSource',
      description: 'Per user "let mcp rebuild itself from the source" — walk the JSDoc-as-spec corpus (slice CCCCC), derive the expected MCP catalog, compare with live, return rebuild plan + skeleton tool-defs.ts (W3C JSON-LD 1.1, MCP 0.6 + JSDoc-as-spec).',
      parameters: { cwd: z.string().optional() },
      async handler({ cwd }) {
        return json(rebuildMcpFromSource({ cwd: cwd as string | undefined, liveTools: tools }))
      },
    },
    {
      name: 'erpax.platform.rebuildExpected',
      description: 'Slice ZZZZZZ — derive the expected MCP catalog from the spec corpus alone (does not compare with live). Useful for clones that boot from genome (slice HHHHHH) and want to know what tools they should expose (Conservation Law 1 spec coverage).',
      parameters: { cwd: z.string().optional() },
      async handler({ cwd }) {
        const corpus = (await import('@/spec/generator')).extractCorpus((cwd as string | undefined) ?? process.cwd())
        return json(deriveExpectedToolsFromCorpus(corpus))
      },
    },
    {
      name: 'erpax.platform.rebuildDrift',
      description: 'Slice ZZZZZZ — compare an expected catalog against the live one and return per-tool drift entries (add/remove/mismatch/intact) per Conservation Law 40.',
      parameters: { cwd: z.string().optional() },
      async handler({ cwd }) {
        const corpus = (await import('@/spec/generator')).extractCorpus((cwd as string | undefined) ?? process.cwd())
        const expected = deriveExpectedToolsFromCorpus(corpus)
        return json(compareExpectedVsLive(expected, tools))
      },
    },
    {
      name: 'erpax.platform.rebuildSkeleton',
      description: 'Slice ZZZZZZ — emit a starter tool-defs.ts skeleton from the source-derived expected tools (RFC-style code template, MCP 0.6). Use as the regeneration starting point if tool-defs.ts is corrupted or deleted.',
      parameters: { cwd: z.string().optional() },
      async handler({ cwd }) {
        const corpus = (await import('@/spec/generator')).extractCorpus((cwd as string | undefined) ?? process.cwd())
        const expected = deriveExpectedToolsFromCorpus(corpus)
        return text(emitToolDefsSkeleton(expected))
      },
    },
    // ── Slice AAAAAAA — MCP self-testing (Law 41) ──
    {
      name: 'erpax.platform.selfTestAll',
      description: 'Per user "mcp interacts with itself by testing" — synthetic per-tool invocation derived from each tool\'s Zod schema; verify response shape; report pass/skip/fail per Conservation Law 41. ISO/IEC/IEEE 29119-2.',
      parameters: {},
      async handler() { return json(await selfTestAll(tools)) },
    },
    {
      name: 'erpax.platform.selfTestOne',
      description: 'Slice AAAAAAA — smoke-test a single tool. Returns {tool, verdict, reason?, elapsedMs}. Use to debug a Law 41 boot failure (W3C Web Tracing convention).',
      parameters: { toolName: z.string() },
      async handler({ toolName }) {
        const tool = tools.find((t) => t.name === toolName)
        if (!tool) return json({ ok: false, reason: `unknown tool ${toolName as string}` })
        return json(await selfTestOne(tool))
      },
    },
    // ── Slice CCCCCCC — torus topology (Law 43) ──
    {
      name: 'erpax.platform.torusTopology',
      description: 'Per user "erpax and mcp are interacting to infinity within the limitations of a torus" — return the 11 torus vertices + 14 directed edges + default resource envelope. The closed-system synthesis (Topology / closed manifold; ISO/IEC 25010:2023 §5.2 performance).',
      parameters: {},
      async handler() { return json({ vertices: TORUS_VERTICES, edges: TORUS_EDGES, envelope: TORUS_DEFAULT_ENVELOPE }) },
    },
    {
      name: 'erpax.platform.torusTrace',
      description: 'Slice CCCCCCC — trace a round-trip around the torus from a starting vertex; verify the loop closes (Conservation Law 43 closure property). Returns the hop sequence + closedLoop boolean.',
      parameters: {
        start: z.enum(['spec-corpus', 'mcp-tools', 'agent-blocks', 'chain-of-blocks', 'event-streams', 'audit-trail', 'archival', 'federation', 'cloning', 'standards-corpus', 'website']),
        maxHops: z.number().int().min(1).max(64).optional(),
      },
      async handler({ start, maxHops }) {
        return json(traceTorusRoundTrip(start as never, (maxHops as number | undefined) ?? 32))
      },
    },
    {
      name: 'erpax.platform.checkTorusBounded',
      description: 'Conservation Law 43 — verify the torus is closed (every vertex has incoming + outgoing edges) and current resource usage is within envelope (cost / carbon — Laws 15+16; CF Worker memory + CPU + queues — slice IIIIII; chain-step circumference soft cap 42).',
      parameters: {
        current: z.object({
          costUsdMicrosPerMin: z.number().optional(),
          carbonGCO2ePerMin: z.number().optional(),
          memoryBytes: z.number().optional(),
          cpuMs: z.number().optional(),
          queueDepth: z.number().optional(),
          chainStepsPerWorkflow: z.number().optional(),
        }).optional(),
      },
      async handler({ current }) {
        return json(checkTorusBounded({ current: current as never }))
      },
    },
    // ── Slice EEEEEEE — laws regrouped per-agent for efficiency (Law 45) ──
    // ── Slice LLLLLLLL — 10 dimensional plugins + missing collections (Law 49) ──
    {
      name: 'erpax.platform.dimensions',
      description: 'Per user "start by creating the missing collections stored in 10 dimensional plugins" — return the 10 dimensional plugins (A-domain / B-substrate / C-process / D-conservation / E-tenant-role / F-integrity / G-beyond / H-clients / I-federation / J-meta-evolution per §0b vortices). Each carries its trinityLaw + canonicalCollections + newCollections (W3C JSON-LD 1.1).',
      parameters: {},
      async handler() { return json(DIMENSIONAL_PLUGINS) },
    },
    {
      name: 'erpax.platform.dimensionForCollection',
      description: 'Slice LLLLLLLL — look up which dimension a collection slug belongs to (or null if unassigned). Conservation Law 49 requires every collection to have exactly one dimension.',
      parameters: { slug: z.string() },
      async handler({ slug }) {
        return json({ dimension: dimensionForCollection(slug as string) })
      },
    },
    {
      name: 'erpax.platform.dimensionalCounts',
      description: 'Slice LLLLLLLL — total collection counts: canonical + new + total across all 10 dimensions. Drives the conservation-dashboard surface\'s dimensional breakdown card (W3C JSON-LD 1.1).',
      parameters: {},
      async handler() { return json(totalCollectionCount()) },
    },
    {
      name: 'erpax.platform.dimensionalPluginFactories',
      description: 'Slice MMMMMMMM — return the 10 dimension plugin factory ids (BBBBB cut-prep). Each is a no-op today; slice BBBBB will fill them with collection moves on the local machine. ISO/IEC 25010:2023 §5.7 modularity.',
      parameters: {},
      async handler() { return json(Object.keys(DIMENSION_PLUGIN_FACTORIES)) },
    },
    {
      name: 'erpax.platform.allDimensionalPluginsCount',
      description: 'Slice MMMMMMMM — return the count of declared dimension plugin factories (should be 10, one per §0b vortex).',
      parameters: {},
      async handler() { return json({ count: allDimensionalPlugins().length }) },
    },
    {
      name: 'erpax.platform.checkDimensionalPluginScaffolded',
      description: 'Conservation Law 51 — every dimension declared in DIMENSIONAL_PLUGINS has a matching plugin factory in DIMENSION_PLUGIN_FACTORIES. Symmetry catches drift (dimension added without factory, or vice versa).',
      parameters: {},
      async handler() { return json(checkDimensionalPluginScaffolded()) },
    },
    {
      name: 'erpax.platform.checkDimensionalCoverage',
      description: 'Conservation Law 49 — verify the 10-dimension taxonomy is well-formed: 10 dimensions exist, none empty, no duplicate assignments, no orphan collections (when declaredCollections passed). ISO/IEC 25010:2023 §5.7 modularity.',
      parameters: { declaredCollections: z.array(z.string()).optional() },
      async handler({ declaredCollections }) {
        return json(checkDimensionalCoverage(declaredCollections as string[] | undefined))
      },
    },
    // ── Slice JJJJJJJJ — the Trinity of Conservation (3 generators) ──
    {
      name: 'erpax.platform.trinity',
      description: 'Per user "the more laws less powerfull they are. remember the trinity brought then dimensions. what are their laws?" — return the THREE foundational laws (Identity / Causality / Closure) from which all 48 prior laws derive. Each carries dimension + statement + obligations + subsumed prior-law list (W3C JSON-LD 1.1).',
      parameters: {},
      async handler() { return json(TRINITY) },
    },
    {
      name: 'erpax.platform.trinityGrouping',
      description: 'Slice JJJJJJJJ — concise grouping: each Trinity law → list of prior law numbers it generalises. Used by the conservation-dashboard surface to collapse the 48-law view into 3 cards.',
      parameters: {},
      async handler() { return json(trinityGrouping()) },
    },
    {
      name: 'erpax.platform.trinityForLaw',
      description: 'Slice JJJJJJJJ — reverse map: prior Law N → which Trinity law it derives from (Identity / Causality / Closure / null if not yet mapped).',
      parameters: { num: z.number().int().min(1).max(99) },
      async handler({ num }) { return json({ trinityLaw: trinityForPriorLaw(num as number) }) },
    },
    {
      name: 'erpax.platform.trinityRollup',
      description: 'Slice JJJJJJJJ — given a list of prior law numbers that currently pass, return the per-Trinity-law verdict (% of derived theorems witnessed). Used to roll the 48-verdict boot suite into a 3-card dashboard.',
      parameters: { passedPriorLawNums: z.array(z.number().int()) },
      async handler({ passedPriorLawNums }) {
        return json(rollUpToTrinity(passedPriorLawNums as number[]))
      },
    },
    {
      name: 'erpax.platform.lawCatalog',
      description: 'Per user "regroup the laws for maximum agent efficiency" — return the LAW_CATALOG: every conservation law with its category + which AgentEffect kinds it governs + applicableWhen trigger (W3C JSON-LD 1.1, ISO/IEC 25010:2023 §5.4 reusability).',
      parameters: {},
      async handler() { return json(LAW_CATALOG) },
    },
    {
      name: 'erpax.platform.agentLawProfile',
      description: 'Slice EEEEEEE — derive a single agent\'s law profile: which laws are applicable based on its emitted AgentEffect kinds + grouped by category + skipped-laws list. Coverage ratio shows the efficiency win (W3C Web Components composition + Conservation Law 32).',
      parameters: {
        agentId: z.enum([
          'finance', 'sales', 'marketing', 'hr', 'legal', 'ops', 'engineering',
          'customer-support', 'data', 'design', 'product', 'productivity',
          'enterprise-search', 'plugins', 'meta-skill',
        ]),
      },
      async handler({ agentId }) {
        const a = registry.byId(agentId as never)
        if (!a) return json({ ok: false, reason: 'unknown agent' })
        return json(buildAgentLawProfile(a))
      },
    },
    {
      name: 'erpax.platform.allAgentLawProfiles',
      description: 'Slice EEEEEEE — agent×Conservation-Law coverage matrix. For each of the 16 DomainAgents (Finance/Consistency/etc.), reports which subset of the 52 laws it owns / observes / emits. Powers per-agent accountability breakdowns. Output: ndjson rows {agentId, ownsLaws, observesLaws, emitsLaws}.',
      parameters: {},
      async handler() { return json(buildAllAgentLawProfiles()) },
    },
    // ── Slice FFFFFFF — short uuids per case for UI/UX + search + security (Law 46) ──
    {
      name: 'erpax.integrity.shortUuid',
      description: 'Per user "it is insecure to display the uuids in full. shorter version per case may significantly improve the ui/ux and search" — render a full uuid (RFC 9562 §5.8) as a short, kind-prefixed display id (e.g. aud_a1b2c3d4 for audit, vot_xy12z3 for vote). NEVER use as verification key — display-only (ISO/IEC 27001 §A.9.4.5).',
      parameters: {
        uuid: z.string(),
        kind: z.enum([
          'audit', 'vote', 'invoice', 'payment', 'chain', 'agent', 'collection',
          'role', 'standard', 'stream', 'object', 'federation', 'proof', 'did',
          'spec', 'page', 'ballot', 'block', 'tool',
        ]),
      },
      async handler({ uuid, kind }) { return json({ short: shortUuid(uuid as string, kind as ShortUuidKind) }) },
    },
    {
      name: 'erpax.integrity.parseShortUuid',
      description: 'Slice FFFFFFF — parse a short id into its kind + hex prefix (no full uuid resolution; use erpax.integrity.lookupShortUuid for resolution).',
      parameters: { short: z.string() },
      async handler({ short }) { return json(parseShortUuid(short as string) ?? { ok: false, reason: 'unparseable' }) },
    },
    {
      name: 'erpax.integrity.lookupShortUuid',
      description: 'Slice FFFFFFF — resolve a short id back to one of a candidate full uuid set (typically tenant-scoped). Returns found / ambiguous / not-found per Law 9 multi-tenant isolation.',
      parameters: { short: z.string(), candidates: z.array(z.string()) },
      async handler({ short, candidates }) {
        return json(lookupShort(short as string, candidates as string[]))
      },
    },
    {
      name: 'erpax.integrity.displayUuid',
      description: 'Slice FFFFFFF — return {display, full, copyable} for UI rendering. UI shows display by default; reveals full on hover/click; copyFull controls clipboard target (W3C JSON-LD 1.1).',
      parameters: {
        uuid: z.string(),
        kind: z.enum([
          'audit', 'vote', 'invoice', 'payment', 'chain', 'agent', 'collection',
          'role', 'standard', 'stream', 'object', 'federation', 'proof', 'did',
          'spec', 'page', 'ballot', 'block', 'tool',
        ]),
        copyFull: z.boolean().optional(),
      },
      async handler({ uuid, kind, copyFull }) {
        return json(displayUuid(uuid as string, kind as ShortUuidKind, { copyFull: copyFull as boolean | undefined }))
      },
    },
    {
      name: 'erpax.integrity.uuidShortPolicy',
      description: 'Slice FFFFFFF — return the per-kind SHORT_UUID_POLICY (prefix + length) so external clients can render short ids consistently across surfaces.',
      parameters: {},
      async handler() { return json(SHORT_UUID_POLICY) },
    },
    // ── Slice GGGGGGG — type-level content uuid (Law 47) ──
    {
      name: 'erpax.integrity.computeTypeUuid',
      description: 'Per user "any type has uuid as well as any type object" — derive a uuidv8 from a TypeDescriptor (RFC 9562 §5.8 + JSON Schema draft 2020-12 + RFC 8785 canonicalisation). Two equivalent type shapes hash to the same uuid; any structural change shifts it.',
      parameters: { descriptor: z.record(z.unknown()) },
      async handler({ descriptor }) {
        return json({ typeUuid: computeTypeUuid(descriptor as unknown as TypeDescriptor) })
      },
    },
    {
      name: 'erpax.integrity.registerType',
      description: 'Slice GGGGGGG — register a TypeDescriptor under a canonical name; returns {name, uuid, descriptor, registeredAt, version?}. Subsequent verify/lookup uses the registered uuid (W3C VC Data Model 2.0 typed claims).',
      parameters: {
        name: z.string(),
        descriptor: z.record(z.unknown()),
        version: z.string().optional(),
      },
      async handler({ name, descriptor, version }) {
        return json(registerType({
          name: name as string,
          descriptor: descriptor as unknown as TypeDescriptor,
          version: version as string | undefined,
        }))
      },
    },
    {
      name: 'erpax.integrity.getType',
      description: 'Slice GGGGGGG — look up a registered type by canonical name. Returns full descriptor + type-uuid + registeredAt.',
      parameters: { name: z.string() },
      async handler({ name }) {
        return json(getType(name as string) ?? { ok: false, reason: 'not registered' })
      },
    },
    {
      name: 'erpax.integrity.getTypeByUuid',
      description: 'Slice GGGGGGG — reverse lookup: type-uuid → registered type. Federation peers use this after exchanging type-uuids (slice AAAAAA pre-flight).',
      parameters: { uuid: z.string() },
      async handler({ uuid }) {
        return json(getTypeByUuid(uuid as string) ?? { ok: false, reason: 'unknown type-uuid' })
      },
    },
    {
      name: 'erpax.integrity.listTypes',
      description: 'Slice GGGGGGG — TypeRegistry inventory. Returns each content-addressed type definition (collection field-shape, hook signature, MCP-tool parameter schema) with its baseline uuid. Used by federation peers to verify type compatibility before exchanging rows.',
      parameters: {},
      async handler() { return json(listTypes()) },
    },
    {
      name: 'erpax.integrity.verifyType',
      description: 'Slice GGGGGGG — verify a candidate descriptor matches the registered type\'s uuid. On mismatch returns drifted={fieldsAdded, fieldsRemoved} so migration scripts can detect breaking changes (W3C JSON Schema draft 2020-12).',
      parameters: { name: z.string(), descriptor: z.record(z.unknown()) },
      async handler({ name, descriptor }) {
        return json(verifyType(name as string, descriptor as unknown as TypeDescriptor))
      },
    },
    {
      name: 'erpax.integrity.ensureBaselineTypes',
      description: 'Slice GGGGGGG — eagerly register the platform-mandated baseline types (AgentEffect, DomainEvent, AuditLeaf, BallotKind, PageSeed, SeoVortexFace, CollectionSpec). Idempotent. Required for Law 47 to pass at boot.',
      parameters: {},
      async handler() { ensureBaselineTypesRegistered(); return json({ ok: true, registered: listTypes().length }) },
    },
    // ── Slice IIIIIIIII — infinite-within-finite spacetime (Law 48) ──
    {
      name: 'erpax.integrity.uuidStreamSnapshot',
      description: 'Per user "no. much more than this. with the replication it is infinite within the finite spacetime" — snapshot every uuid from live registries (faces + types) into the unified UUID_STREAM. Returns counts added (W3C JSON-LD 1.1).',
      parameters: {},
      async handler() { return json(snapshotFromRegistries()) },
    },
    {
      name: 'erpax.integrity.uuidStreamQuery',
      description: 'Slice IIIIIIIII — unified query interface across every uuid source (object/type/stream/audit/vote/aggregate/page/face/standard/clone/federation/proof/did/tool-catalog/platform-genome). Filter by source + tenant + limit (RFC 9562 §5.8).',
      parameters: {
        source: z.union([
          z.enum(['object', 'type', 'stream', 'audit', 'vote', 'aggregate', 'page', 'face', 'standard', 'clone', 'federation', 'proof', 'did', 'tool-catalog', 'platform-genome']),
          z.array(z.enum(['object', 'type', 'stream', 'audit', 'vote', 'aggregate', 'page', 'face', 'standard', 'clone', 'federation', 'proof', 'did', 'tool-catalog', 'platform-genome'])),
        ]).optional(),
        tenantId: z.string().optional(),
        limit: z.number().int().min(1).max(1000).optional(),
      },
      async handler({ source, tenantId, limit }) {
        return json(queryUuidStream({
          source: source as UuidSource | UuidSource[] | undefined,
          tenantId: tenantId as string | undefined,
          limit: limit as number | undefined,
        }))
      },
    },
    {
      name: 'erpax.integrity.uuidStreamRecord',
      description: 'Slice IIIIIIIII — record a uuid into the unified stream (manually push when a subsystem produces a uuid outside the auto-snapshot path). For testing + production extensions.',
      parameters: {
        uuid: z.string(),
        source: z.enum(['object', 'type', 'stream', 'audit', 'vote', 'aggregate', 'page', 'face', 'standard', 'clone', 'federation', 'proof', 'did', 'tool-catalog', 'platform-genome']),
        tenantId: z.string().optional(),
        metadata: z.record(z.unknown()).optional(),
      },
      async handler({ uuid, source, tenantId, metadata }) {
        recordUuid({
          uuid: uuid as string,
          source: source as UuidSource,
          tenantId: tenantId as string | undefined,
          metadata: metadata as Record<string, unknown> | undefined,
          registeredAt: new Date().toISOString(),
        })
        return json({ ok: true })
      },
    },
    {
      name: 'erpax.integrity.infiniteFinitenessReport',
      description: 'Slice IIIIIIIII — quantify infinite-within-finite: totalUuids × (backends × federationPeers × bitemporalVersions) = totalLogicalUuids; physical_bytes vs envelope; richness ratio (logical_extent / physical_bytes). Topology — torus + Hilbert-space replicas (Hatcher 2002).',
      parameters: {
        federationPeersConfigured: z.number().int().min(1).optional(),
        bitemporalVersionsAvg: z.number().min(1).optional(),
        bytesEstimate: z.number().int().min(0).optional(),
      },
      async handler({ federationPeersConfigured, bitemporalVersionsAvg, bytesEstimate }) {
        return json(buildInfiniteFinitenessReport({
          federationPeersConfigured: federationPeersConfigured as number | undefined,
          bitemporalVersionsAvg: bitemporalVersionsAvg as number | undefined,
          bytesEstimate: bytesEstimate as number | undefined,
        }))
      },
    },
    {
      name: 'erpax.integrity.checkInfiniteFiniteness',
      description: 'Conservation Law 48 — physical_bytes <= envelope (Law 43 echo); logical_extent unbounded; every uuid has a known source. Returns verdict + full report (W3C VC Data Model 2.0 verifiable replicas).',
      parameters: {
        federationPeersConfigured: z.number().int().min(1).optional(),
        bitemporalVersionsAvg: z.number().min(1).optional(),
        bytesEstimate: z.number().int().min(0).optional(),
      },
      async handler({ federationPeersConfigured, bitemporalVersionsAvg, bytesEstimate }) {
        return json(checkInfiniteFiniteness({
          federationPeersConfigured: federationPeersConfigured as number | undefined,
          bitemporalVersionsAvg: bitemporalVersionsAvg as number | undefined,
          bytesEstimate: bytesEstimate as number | undefined,
        }))
      },
    },
    {
      name: 'erpax.integrity.checkTypeUuidCoverage',
      description: 'Conservation Law 47 — every domain type in use must be registered with a uuid. Boot-suite probe verifies the baseline (extend by calling registerTypeFromZod for your own types). RFC 9562 §5.8 + RFC 8785.',
      parameters: {},
      async handler() {
        ensureBaselineTypesRegistered()
        return json(checkTypeUuidCoverage())
      },
    },
    {
      name: 'erpax.integrity.checkShortUuidDisplay',
      description: 'Conservation Law 46 — verify every kind in SHORT_UUID_POLICY produces parseable short ids (roundtrip). Production CI lints + runtime proxy logging catch UI surfaces that display full uuids in violation.',
      parameters: {},
      async handler() { return json(checkUuidShortDisplay()) },
    },
    {
      name: 'erpax.platform.checkAgentLawCoverage',
      description: 'Conservation Law 45 — every agent must have at least one law per emitted effect kind; average coverage ratio < 1.0 (otherwise regrouping isn\'t buying efficiency). ISO/IEC 25010:2023 §5.2 performance.',
      parameters: {},
      async handler() { return json(checkAgentLawCoverage()) },
    },
    // ── Slice BBBBBBB — MCP solves manual work by DRY cleaning (Law 50) ──
    // ── Slice NNNNNNNN — uuid solves PWA (Law 52) ──
    {
      name: 'erpax.pwa.cacheAsset',
      description: 'Per user "uuid solves pwa" — cache an asset keyed by its content-uuid (W3C Cache API + W3C Service Workers). The uuid IS the cache key — no manual cache-busting hash. RFC 9562 §5.8 + RFC 8785.',
      parameters: {
        url: z.string(),
        kind: z.enum(['js', 'css', 'html', 'image', 'font', 'json', 'wasm', 'other']),
        content: z.string(),
        etag: z.string().optional(),
      },
      async handler({ url, kind, content, etag }) {
        return json(cacheAsset({
          url: url as string, kind: kind as AssetKind,
          content: content as string, etag: etag as string | undefined,
        }))
      },
    },
    {
      name: 'erpax.pwa.listCachedAssets',
      description: 'Slice NNNNNNNN — enumerate every cached asset with its uuid + url + kind + bytes. Drives the PWA storage-quota dashboard (W3C IndexedDB 3.0).',
      parameters: {},
      async handler() { return json(listCachedAssets()) },
    },
    {
      name: 'erpax.pwa.evictAsset',
      description: 'Slice NNNNNNNN — evict an asset by uuid. Storage-independence (Law 35) means the asset remains recoverable from any other backend that holds it (IPFS / federation peer / etc.).',
      parameters: { uuid: z.string() },
      async handler({ uuid }) { return json({ ok: evictAsset(uuid as string) }) },
    },
    {
      name: 'erpax.pwa.totalCachedBytes',
      description: 'Slice NNNNNNNN — total bytes across the asset cache. Quota tracking + eviction trigger (W3C Cache API).',
      parameters: {},
      async handler() { return json({ bytes: totalCachedBytes() }) },
    },
    {
      name: 'erpax.pwa.enqueueMutation',
      description: 'Slice NNNNNNNN — uuid-chained background sync queue (Conservation Law 34 streamUuid echo). Each enqueue derives uuid from {tenantId, endpoint, body, prev}; replay order causally preserved + tamper-detectable.',
      parameters: { tenantId: z.string(), endpoint: z.string(), body: z.unknown() },
      async handler({ tenantId, endpoint, body }) {
        return json(enqueueMutation({ tenantId: tenantId as string, endpoint: endpoint as string, body }))
      },
    },
    {
      name: 'erpax.pwa.listQueuedMutations',
      description: 'Slice NNNNNNNN — list pending offline mutations (optionally tenant-scoped per Law 9). Each carries uuid + prevUuid + endpoint + body.',
      parameters: { tenantId: z.string().optional() },
      async handler({ tenantId }) { return json(listQueuedMutations(tenantId as string | undefined)) },
    },
    {
      name: 'erpax.pwa.dequeueMutation',
      description: 'Slice NNNNNNNN — dequeue a mutation by uuid (after successful replay).',
      parameters: { uuid: z.string() },
      async handler({ uuid }) { return json({ ok: dequeueMutation(uuid as string) }) },
    },
    {
      name: 'erpax.pwa.publishManifest',
      description: 'Slice NNNNNNNN — publish a Web App Manifest (W3C Web App Manifest) wrapped in a content-uuid envelope. Recompute on the client to verify integrity (Conservation Law 8 echo).',
      parameters: {
        manifest: z.object({
          name: z.string(),
          short_name: z.string().optional(),
          start_url: z.string().optional(),
          display: z.enum(['standalone', 'fullscreen', 'minimal-ui', 'browser']).optional(),
          theme_color: z.string().optional(),
          background_color: z.string().optional(),
          icons: z.array(z.object({ src: z.string(), sizes: z.string(), type: z.string().optional() })).optional(),
          assetUuids: z.array(z.string()).optional(),
        }),
      },
      async handler({ manifest }) {
        return json(publishManifest(manifest as unknown as WebAppManifest))
      },
    },
    {
      name: 'erpax.pwa.verifyManifest',
      description: 'Slice NNNNNNNN — verify a manifest envelope by recomputing the content-uuid (RFC 9562 §5.8 + RFC 8785). Tampered manifest fails immediately.',
      parameters: {
        envelope: z.object({
          uuid: z.string(),
          manifest: z.record(z.unknown()),
          publishedAt: z.string(),
        }),
      },
      async handler({ envelope }) {
        return json(verifyManifest(envelope as unknown as { uuid: string; manifest: WebAppManifest; publishedAt: string }))
      },
    },
    {
      name: 'erpax.pwa.preparePush',
      description: 'Slice NNNNNNNN — derive a uuid-keyed push notification (W3C Push API + W3C Notifications API). uuid lets the SW dedup retries trivially.',
      parameters: {
        title: z.string(), body: z.string(),
        url: z.string().optional(), tag: z.string().optional(),
        tenantId: z.string(),
      },
      async handler({ title, body, url, tag, tenantId }) {
        return json(preparePush({
          title: title as string, body: body as string,
          url: url as string | undefined, tag: tag as string | undefined,
          tenantId: tenantId as string,
        }))
      },
    },
    {
      name: 'erpax.pwa.dedupPush',
      description: 'Slice NNNNNNNN — dedup-check a push notification by uuid. Returns {delivered, reason?} per W3C Push API guidance.',
      parameters: {
        notification: z.object({ uuid: z.string(), title: z.string(), body: z.string(), url: z.string().optional(), tag: z.string().optional() }),
      },
      async handler({ notification }) {
        return json(dedupPush(notification as unknown as Parameters<typeof dedupPush>[0]))
      },
    },
    {
      name: 'erpax.pwa.checkUuidIntegrity',
      description: 'Conservation Law 52 — verify cache map-key symmetry + queue chain integrity (Law 34 echo). Tamper-detect the SW cache + sync queue at any moment.',
      parameters: {},
      async handler() { return json(checkPwaUuidIntegrity()) },
    },
    {
      name: 'erpax.platform.dryCleanScan',
      description: `Per user 'mcp solves manual work by dry cleaning' — scan the catalog for description duplicates (jaccard >= ${MAX_DESCRIPTION_OVERLAP}), parameter-shape clusters (>=3 tools sharing param names), verb inconsistencies (same verb / different shapes). Returns extraction proposals (W3C JSON-LD 1.1, ISO/IEC 25010:2023 §5.4 reusability).`,
      parameters: {},
      async handler() { return json(dryCleanScan(tools)) },
    },
    {
      name: 'erpax.platform.checkDryCleanliness',
      description: `Conservation Law 50 — no two non-generated tools share > ${MAX_DESCRIPTION_OVERLAP * 100}% word overlap; shape clusters + verb inconsistencies are warnings (refactor opportunities). ISO/IEC 25010:2023 §5.7 modularity.`,
      parameters: {},
      async handler() { return json(checkMcpDryCleanliness(tools)) },
    },
    {
      name: 'erpax.platform.checkSelfTestable',
      description: 'Conservation Law 41 — every MCP tool must either pass the smoke test or be explicitly skipped (db-dependent). Returns failures list if any tool throws or returns malformed shape.',
      parameters: {},
      async handler() { return json(await checkMcpSelfTestable(tools)) },
    },
    // ── Slice DDDDDDD — public DRY conformance proof (Law 44) ──
    {
      name: 'erpax.platform.dryProofBuild',
      description: 'Per user "now when al is dry clean in theory tests need to prove it and present it to the world" — run every conservation invariant + every MCP self-test; ground the tamper-cost in the LIVE corpus self-proof (collider joint convention coverage + strength + emergence, read from the tree); roll into a Schema.org Dataset JSON-LD bundle (W3C JSON-LD 1.1 + W3C VC Data Model 2.0); content-uuid the bundle (Conservation Law 8). Returns the bundle without publishing.',
      parameters: { origin: z.string() },
      async handler({ origin }, req) {
        const bundle = await buildDryProofBundle({
          invariantCtx: { payload: req.payload },
          tools, origin: origin as string,
          corpusSelfProof: resolveCorpusSelfProof(),
        })
        return json(bundle)
      },
    },
    {
      name: 'erpax.platform.dryProofPublish',
      description: 'Slice DDDDDDD — build the proof bundle (tamper-cost grounded in the live corpus self-proof: collider/strength/emergence) AND register it as an SeoVortexFace at /proof/ (W3C Microdata 1.1 + Open Graph). After this, anyone hitting /proof/ can verify the conformance themselves; federation peers can ingest the bundle directly (slice AAAAAA).',
      parameters: { origin: z.string() },
      async handler({ origin }, req) {
        const bundle = await publishDryProofBundle({
          invariantCtx: { payload: req.payload },
          tools, origin: origin as string,
          corpusSelfProof: resolveCorpusSelfProof(),
        })
        return json({ ok: true, contentUuid: bundle.contentUuid, summary: bundle.summary, publicUrl: bundle.publicUrl })
      },
    },
    {
      name: 'erpax.platform.dryProofGet',
      description: 'Slice DDDDDDD — return the most recently published proof bundle. Anyone can recompute the bundle.contentUuid to verify it has not been tampered with (Law 8).',
      parameters: {},
      async handler() { return json(getCurrentProofBundle() ?? { ok: false, reason: 'no proof published yet — call erpax.platform.dryProofPublish first' }) },
    },
    {
      name: 'erpax.platform.dryProofFederate',
      description: 'Slice DDDDDDD — wrap the current proof bundle as a federation envelope (slice AAAAAA, kind=erpax/dry-proof). Peer ERPax instances can ingest + verify (uuid recomputes locally) without trusting our chain.',
      parameters: { originDid: z.string() },
      async handler({ originDid }) {
        const bundle = getCurrentProofBundle()
        if (!bundle) return json({ ok: false, reason: 'no proof published yet' })
        return json(asFederationEnvelope(bundle, originDid as string))
      },
    },
    {
      name: 'erpax.platform.checkDryProofPublished',
      description: `Conservation Law 44 — verify the proof bundle (a) exists, (b) generatedAt within ${MAX_PROOF_AGE_HOURS}h, (c) content-uuid recomputes (Law 8 echo), (d) public face registered at /proof/. Pass for the world to depend on the proof.`,
      parameters: { origin: z.string() },
      async handler({ origin }) { return json(checkDryProofPublished(origin as string)) },
    },
    {
      name: 'erpax.platform.checkRebuildable',
      description: 'Conservation Law 40 — verify the live MCP catalog can be rebuilt from the spec corpus (no missing expected tools). Returns ok + missingFromLive list. Pre-push gate (FFFFFF) regenerates when this fails.',
      parameters: { cwd: z.string().optional() },
      async handler({ cwd }) {
        return json(checkMcpRebuildableFromSource({ liveTools: tools, cwd: cwd as string | undefined }))
      },
    },
  )

  // ── Slice TTTTTTTT (2026-05-11) — uuid-linked DO chains ──────────
  // Every append carries leafUuid = sha256(prev || payload || ts);
  // tampering breaks every subsequent leaf detectably. Per user
  // "using durable objects linked using uuid would prevent tampering".
  tools.push(
    {
      name: 'erpax.audit.chainAppend',
      description: 'Append a uuid-linked leaf to the tenant\'s AUDIT_CHAIN_DO. Leaf carries prevLeafUuid + payloadUuid + timestamp → leafUuid; any mutation breaks the chain at the mutated index. Tenant-scoped per Slice SSSSSSSS mediator. Returns the appended UuidLinkedLeaf.',
      parameters: { payload: z.record(z.unknown()) },
      async handler({ payload }, req) {
        const env = (req as { env?: unknown }).env as { AUDIT_CHAIN_DO?: unknown } | undefined
        if (!env?.AUDIT_CHAIN_DO) {
          return text('AUDIT_CHAIN_DO binding not available in this runtime')
        }
        const { erpaxMediator } = await import('@/cloudflare/plugin-helper')
        const m = erpaxMediator(req)
        const leaf = await m.auditChainAppendLinked(payload as Record<string, unknown>)
        return json(leaf)
      },
    },
    {
      name: 'erpax.audit.chainVerify',
      description: 'Walk the tenant\'s AUDIT_CHAIN_DO leaves end-to-end (or a fromSeq/toSeq sub-range) and verify every uuid link. Returns ChainVerifyResult with brokenAtSeq pinpointing the first tampered leaf, or ok:true with chainLength when intact. Slice TTTTTTTT.',
      parameters: { fromSeq: z.number().int().min(0).optional(), toSeq: z.number().int().min(0).optional() },
      async handler({ fromSeq, toSeq }, req) {
        const env = (req as { env?: unknown }).env as { AUDIT_CHAIN_DO?: unknown } | undefined
        if (!env?.AUDIT_CHAIN_DO) {
          return text('AUDIT_CHAIN_DO binding not available in this runtime')
        }
        const { erpaxMediator } = await import('@/cloudflare/plugin-helper')
        const m = erpaxMediator(req)
        const result = await m.auditChainVerify({
          fromSeq: fromSeq as number | undefined,
          toSeq: toSeq as number | undefined,
        })
        return json(result)
      },
    },
  )

  // ── Slice VVVVVV — platform readiness + tool exploration ──
  // Registered AFTER the main array so they can survey themselves.
  tools.push(
    {
      name: 'erpax.platform.toolCatalog',
      description: 'Per user "mcp is ready to build and explore" — return every registered erpax.* tool with name + description + parameter names + area. Drives the shadcn mcp-playground (Cmd+K fuzzy search).',
      parameters: {},
      async handler() { return json(buildToolCatalog(tools)) },
    },
    {
      name: 'erpax.platform.toolsByArea',
      description: 'Slice VVVVVV: tools grouped by area (spec / chain / agents / standards / seo / blocks / streams / storage / voting / website / marketing / commerce / accounting / integrity / archival / cloning / federation / anchoring / etc.). Returns area → ordered tool names.',
      parameters: {},
      async handler() {
        const grouped = toolsByArea(tools)
        const out: Record<string, string[]> = {}
        for (const [k, v] of grouped) out[k] = v.map((t) => t.name)
        return json(out)
      },
    },
    {
      name: 'erpax.platform.readiness',
      description: 'Slice VVVVVV — single survey endpoint: counts of every primitive (agents, tools, chains, conservation laws, role profiles, locales, standards families, backends, site surfaces) + the readyToBuild capability matrix + the full tool catalog. The shadcn mcp-playground calls this on page load.',
      parameters: {},
      async handler() {
        return json(buildReadinessManifest({ tools, registry, conservationLawCount: 36 }))
      },
    },
  )

  // ── Slice BBBBBBBBBB-cut3 + FFFFFFFFFF + IIIIIIIIII (2026-05-11) —
  // defense-in-depth tenant + role guard. Wrap every tenantId-bearing
  // tool so admin-allowlisted ones get `assertAdminOnTenant` and the
  // rest get `assertTenantMatch`. Super-admin and internal context
  // (no req.user) bypass both. Implementation lives in
  // `wrapToolsWithTenantGuard` (tools/_guards.ts) — extracted in
  // IIIIIIIIII so the wrapping policy is unit-testable in isolation.
  const wrapped = wrapToolsWithTenantGuard(tools, { mutatingTools: STATE_MUTATING_TOOLS })
  // Replace in place — caller-side references to `tools` (readiness /
  // standardization checks built above) keep their array identity.
  for (let i = 0; i < tools.length; i++) tools[i] = wrapped[i]!

  return tools
}
