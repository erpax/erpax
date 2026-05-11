/**
 * ERPax MCP tool registry — central declaration of every tool the
 * Payload MCP plugin exposes.
 *
 * Slice DDDDD task 10 (2026-05-11). Each tool is declared once here
 * and consumed by both:
 *   (a) the @payloadcms/plugin-mcp plugin config (over-the-wire MCP)
 *   (b) the in-process McpClient bound to AgentContext.mcp
 *
 * Tool naming convention: `erpax.<area>.<verb>` so external clients
 * can filter by area (`erpax.spec.*`, `erpax.chain.*`, etc.).
 *
 * @standard MCP 0.6 — Model Context Protocol tools/list + tools/call
 * @standard ISO/IEC 25010:2023 §5.4 reusability (single tool surface)
 */

import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import {
  extractCorpus, collectEvidence, extractE2eCorpus,
  generateMultimediaForWorkflow, generateMarketingPage,
} from '@/services/spec-generator'
import { localeRecord, supportedLocales, type SupportedLocale } from '@/i18n'
import { BUSINESS_CHAINS } from '@/services/business-chains/registry'
import { verifyContentUuid, TAMPER_PROOF_COLLECTIONS_REGISTRY, UUID_REF_REGISTRY, resolveByUuid, findDanglingRefs } from '@/services/integrity'
import { publishSelf, bootFromFederation, type GenomePublication } from '@/services/cloning'
import { checkout, provisionInstance, listSubscriptions, checkCommerceLifecycle } from '@/services/commerce'
import { bookRevenue, bookCost, scheduleFiling, scheduleObligation, checkSelfAccountingComplete, listFilings, listObligations } from '@/services/self-accounting'
import { createDid, resolveDid, listDids } from '@/services/did'
import { publishStandard, resolveStandard, subscribeTenant, tenantSubscriptions, addCitation, listCitations, declareConflict, listConflicts, declareSupersession, traceSupersession, checkStandardCitationsConsistent, checkStandardSupersessionsResolved, familyOf } from '@/services/standards-registry'
import { anchorRoot, listAnchors, NOTARY_STUB_BACKEND } from '@/services/anchoring'
import { tenantPins } from '@/services/archival'
import { listProposals } from '@/services/meta-automation'
import { listAgentCapabilities } from '@/services/beyond'
import { seedFromE2e, seedFromSpec, exportMediaBundle, importMediaBundle } from '@/services/website'
import { deriveSeoMeta, generateChannelVariants, reviewBrandVoice, auditSeo, buildOnboardingDrip, checkMarketingTransparency, ERPAX_MARKETING_STRATEGY } from '@/services/website/marketing-skills'
import {
  registerFace, listFaces, crossLink, renderJsonLd, renderOgMeta,
  generateSitemap, generateRobots, checkSeoVortexCoupling, bitemporalAnchor,
  validateMicrodata, type SeoVortexFace, type SchemaType, type OgType,
} from '@/services/website/seo-vortex'
import { SHADCN_SURFACE_MAP, shadcnSurfaceFor, allRequiredShadcnComponents, type SiteSurface } from '@/services/website/shadcn-components'
import {
  createBallot, castVote, computeAggregate, verifyAggregate,
  listBallots, listVotes, getBallot, getAggregate, exportBallotBundle,
  derivePseudoDid, checkNoDoubleVoting, type BallotKind, type VoteValue,
} from '@/services/voting'
import type { AgentRegistry } from '@/services/agents/types'

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
const localeEnum = z.enum(supportedLocales as unknown as [string, ...string[]])

/**
 * Build the tool list, parameterised over the bootstrapped agent
 * registry. Called once at boot from `bootstrap.ts`.
 */
export function buildErpaxMcpTools(registry: AgentRegistry): ErpaxMcpTool[] {
  return [
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
      description: 'Dispatch a domain event to every subscribed agent. Returns the AgentEffect[] each agent produced. Gated by super-admin role at the plugin layer.',
      parameters: {
        event: z.object({
          id: z.string(),
          tenantId: z.string(),
          payload: z.record(z.unknown()),
        }),
      },
      async handler({ event }) {
        // Wired in EEEEE once FinanceAgent ships (full round-trip test).
        return text(`(stub) dispatch event=${(event as { id: string }).id}`)
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
      description: 'Conservation Law 8: fetch a row from a tamper-proof collection, recompute its content-uuid (RFC 4122 §4.3 + RFC 8785 + SHA-256), and compare to the stored uuid. Returns {ok: true} on match or {ok: false, expected, actual} on Byzantine tamper.',
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
}
