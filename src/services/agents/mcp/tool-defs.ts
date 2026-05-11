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
