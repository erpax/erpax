/**
 * Cloudflare MCP tool family — Slice CCCCCCCCC (2026-05-11) extract.
 *
 * Wraps every CF binding via the tenant-scoped + audit-trailed
 * mediator (Slice SSSSSSSS makeMediator). No direct env.<BINDING>
 * access from handlers (Slice SSSSSSSS invariant checkMcpBindingsAreMediated).
 *
 * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
 * @audit Conservation Law 38 mcp-tool-standardization
 * @see ../../cloudflare/index.ts makeMediator
 * @see ../i18n.ts
 */
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: Record<string, z.ZodTypeAny>
  readonly handler: (args: Record<string, unknown>, req: PayloadRequest) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

type ErpaxCfEnvLite = Record<string, unknown>
function tenantOf(req: PayloadRequest): string {
  const u = req.user as { tenant?: string } | undefined
  return u?.tenant ?? 'platform'
}

const I18N: Record<string, LocalizedString> = {
  vectorizeQuery: {
    en: 'Semantic search over the tenant\'s document vectors via VECTORIZE_DOCS. Tenant scoping enforced via filter; returns top-K matches with scores + metadata.',
    bg: 'Семантично търсене в документните вектори на наемателя през VECTORIZE_DOCS. Наемателят се прилага във филтъра; връща топ-K съвпадения със скор и metadata.',
    de: 'Semantische Suche über die Dokument-Vektoren des Mandanten via VECTORIZE_DOCS. Mandantenfilter erzwungen; gibt Top-K-Treffer mit Scores + Metadaten zurück.',
    fr: 'Recherche sémantique sur les vecteurs documentaires du tenant via VECTORIZE_DOCS. Filtrage tenant appliqué ; retourne les top-K avec scores + métadonnées.',
  },
  vectorizeInsert: {
    en: 'Insert vectors into VECTORIZE_DOCS. The mediator forces tenant_id into every vector\'s metadata so cross-tenant queries are filterable.',
    bg: 'Вмъква вектори в VECTORIZE_DOCS. Mediator-ът поставя tenant_id в metadata-та на всеки вектор за филтриране между наематели.',
    de: 'Fügt Vektoren in VECTORIZE_DOCS ein. Der Mediator erzwingt tenant_id in den Metadaten jedes Vektors für tenantgefilterte Abfragen.',
    fr: 'Insère des vecteurs dans VECTORIZE_DOCS. Le médiateur force tenant_id dans les métadonnées de chaque vecteur pour le filtrage tenant.',
  },
  queueSendNamed: {
    en: 'Send to one of the five named queues (ai-batch / einvoice-out / dunning-out / period-close / email-out) via the mediator. tenantId + mediatorAt are auto-stamped.',
    bg: 'Изпраща към една от петте именувани опашки (ai-batch / einvoice-out / dunning-out / period-close / email-out) през mediator-а. tenantId + mediatorAt се поставят автоматично.',
    de: 'Sendet an eine der fünf benannten Queues (ai-batch / einvoice-out / dunning-out / period-close / email-out) über den Mediator. tenantId + mediatorAt werden automatisch gesetzt.',
    fr: 'Envoie vers l\'une des cinq files nommées (ai-batch / einvoice-out / dunning-out / period-close / email-out) via le médiateur. tenantId + mediatorAt sont auto-estampillés.',
  },
  browserRender: {
    en: 'Render a URL or raw HTML to PDF/PNG via the Browser Rendering binding. Used for invoice PDFs, PAdES attestation rendering, e2e walkthrough screenshots.',
    bg: 'Рендира URL или сурово HTML до PDF/PNG чрез Browser Rendering binding-а. Използва се за PDF фактури, PAdES рендиране, e2e скрийншоти.',
    de: 'Rendert eine URL oder rohes HTML zu PDF/PNG über das Browser-Rendering-Binding. Wird für Rechnungs-PDFs, PAdES-Rendering und e2e-Screenshots verwendet.',
    fr: 'Rend une URL ou du HTML brut en PDF/PNG via le binding Browser Rendering. Utilisé pour les PDF de factures, le rendu PAdES et les captures e2e.',
  },
  emailSend: {
    en: 'Send outbound transactional email via EMAIL_SEND. Tenant-scoped (from-address must be a tenant-verified domain or platform fallback). Audit-trailed per RFC 5321 + GDPR Art.7.',
    bg: 'Изпраща изходящ транзакционен email през EMAIL_SEND. Tenant-scoped (from-адресът трябва да е верифициран домейн на наемателя или платформа fallback).',
    de: 'Sendet ausgehende Transaktions-E-Mails über EMAIL_SEND. Mandantengebunden (From-Adresse muss eine verifizierte Mandantendomäne oder Plattform-Fallback sein).',
    fr: 'Envoie un email transactionnel sortant via EMAIL_SEND. Tenant-scoped (l\'adresse from doit être un domaine vérifié du tenant ou un fallback plateforme).',
  },
  workflowsCreate: {
    en: 'Trigger a Cloudflare Workflow run via WORKFLOWS. tenantId is auto-stamped on the workflow input.',
    bg: 'Стартира Cloudflare Workflow през WORKFLOWS. tenantId се поставя автоматично върху workflow input-а.',
    de: 'Löst einen Cloudflare-Workflow-Lauf über WORKFLOWS aus. tenantId wird automatisch auf den Workflow-Input gesetzt.',
    fr: 'Déclenche un Cloudflare Workflow via WORKFLOWS. tenantId est auto-estampillé sur l\'input du workflow.',
  },
  analyticsWrite: {
    en: 'Write a data point to an Analytics Engine dataset (default or ai). Tenant-tagged automatically; pass a redactor for PII.',
    bg: 'Записва точка в Analytics Engine dataset (default или ai). Маркира се автоматично с наемателя; подавайте redactor за PII.',
    de: 'Schreibt einen Datenpunkt in einen Analytics-Engine-Datensatz (default oder ai). Wird automatisch mit dem Mandanten markiert; übergib einen Redaktor für PII.',
    fr: 'Écrit un point dans un dataset Analytics Engine (default ou ai). Étiqueté automatiquement par tenant ; passer un redactor pour les PII.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.cloudflare.${k}`, v)
}

export function buildCloudflareTools(): ReadonlyArray<ErpaxMcpTool> {
  const tVQ = makeToolI18n('erpax.cloudflare.vectorizeQuery')
  const tVI = makeToolI18n('erpax.cloudflare.vectorizeInsert')
  const tQ  = makeToolI18n('erpax.cloudflare.queueSendNamed')
  const tBR = makeToolI18n('erpax.cloudflare.browserRender')
  const tE  = makeToolI18n('erpax.cloudflare.emailSend')
  const tW  = makeToolI18n('erpax.cloudflare.workflowsCreate')
  const tA  = makeToolI18n('erpax.cloudflare.analyticsWrite')

  return [
    {
      name: 'erpax.cloudflare.vectorizeQuery',
      description: tVQ.desc(I18N.vectorizeQuery!),
      parameters: {
        vector: z.array(z.number()),
        topK: z.number().int().min(1).max(50).optional(),
        filter: z.record(z.unknown()).optional(),
      },
      async handler({ vector, topK, filter }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        return json(await m.vectorizeQuery({ vector: vector as number[], topK: topK as number | undefined, filter: filter as Record<string, unknown> | undefined }))
      },
    },
    {
      name: 'erpax.cloudflare.vectorizeInsert',
      description: tVI.desc(I18N.vectorizeInsert!),
      parameters: {
        vectors: z.array(z.object({
          id: z.string(), values: z.array(z.number()),
          metadata: z.record(z.unknown()).optional(),
        })),
      },
      async handler({ vectors }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        await m.vectorizeInsert(vectors as never)
        return json({ ok: true, inserted: (vectors as unknown[]).length })
      },
    },
    {
      name: 'erpax.cloudflare.queueSendNamed',
      description: tQ.desc(I18N.queueSendNamed!),
      parameters: {
        queueName: z.enum(['ai-batch', 'einvoice-out', 'dunning-out', 'period-close', 'email-out', 'generic']),
        event: z.record(z.unknown()),
      },
      async handler({ queueName, event }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        await m.queueSendNamed(queueName as never, event as Record<string, unknown>)
        return json({ ok: true, queueName })
      },
    },
    {
      name: 'erpax.cloudflare.browserRender',
      description: tBR.desc(I18N.browserRender!),
      parameters: {
        url: z.string().optional(), html: z.string().optional(),
        format: z.enum(['pdf', 'png']),
        opts: z.record(z.unknown()).optional(),
      },
      async handler({ url, html, format, opts }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        const bytes = await m.browserRender({
          url: url as string | undefined, html: html as string | undefined,
          format: format as 'pdf' | 'png', opts: opts as Record<string, unknown> | undefined,
        })
        if (!bytes) return text('browser render unavailable or failed')
        return json({ ok: true, format, bytes: bytes.byteLength })
      },
    },
    {
      name: 'erpax.cloudflare.emailSend',
      description: tE.desc(I18N.emailSend!),
      parameters: { from: z.string(), to: z.string(), raw: z.string() },
      async handler({ from, to, raw }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        await m.emailSend({ from: from as string, to: to as string, raw: raw as string })
        return json({ ok: true, to })
      },
    },
    {
      name: 'erpax.cloudflare.workflowsCreate',
      description: tW.desc(I18N.workflowsCreate!),
      parameters: { workflowId: z.string(), input: z.unknown() },
      async handler({ workflowId, input }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        return json(await m.workflowsCreate({ workflowId: workflowId as string, input }))
      },
    },
    {
      name: 'erpax.cloudflare.analyticsWrite',
      description: tA.desc(I18N.analyticsWrite!),
      parameters: {
        dataPoint: z.record(z.unknown()),
        dataset: z.enum(['default', 'ai']).optional(),
      },
      async handler({ dataPoint, dataset }, req) {
        const env = (req as { env?: unknown }).env as ErpaxCfEnvLite | undefined
        if (!env) return text('CF env not available')
        const { makeMediator } = await import('@/services/cloudflare')
        const m = makeMediator({ env: env as never, tenantId: tenantOf(req), payload: req.payload, user: req.user as never })
        m.analyticsWrite(dataPoint as Record<string, unknown>, undefined, (dataset as 'default' | 'ai' | undefined) ?? 'default')
        return json({ ok: true })
      },
    },
  ]
}
