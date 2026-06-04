/**
 * Batch MCP tool family — bulk state-transition (the upstream ActiveAdmin
 * `batch_action` surface, ported as one generic tool).
 *
 * The dominant upstream admin pattern is
 *   `batch_action :close { |ids| Model.find(ids).each { |r| r.status = …; r.save! } }`
 * — one state change applied to many selected rows (48 such actions in
 * ceccec/erpax, 71 in etrima). This tool ports the whole class as a single
 * generic capability: set `status = toStatus` on many `ids` of one collection,
 * driving each row through the Payload Local API (`req.payload.update`) so every
 * collection hook (beforeChange/afterChange) and `emitOnStatusTransition` fires
 * naturally — NEVER a raw DB write. Each row is independent; a failure is caught
 * and reported per-id (no early exit).
 *
 * The admin/tenant guard is supplied once by `wrapToolsWithTenantGuard` (this
 * tool is registered in STATE_MUTATING_TOOLS and carries a `tenantId` param), so
 * there is deliberately no in-handler guard — a single source of truth (DRY).
 *
 * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (per-row ok/error summary)
 * @standard ISO/IEC 27002 §5.4 segregation-of-duties (admin-gated bulk mutation)
 * @audit Conservation Law 4 event-graph-closure (emitOnStatusTransition fires per row)
 * @see ../i18n.ts makeToolI18n + registerToolI18n
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  transition: {
    en: 'Bulk state-transition: set `status` = toStatus on many rows (ids) of one collection — the upstream ActiveAdmin batch_action ported as one tool. Each row is updated through the Payload Local API so all collection hooks + emitOnStatusTransition fire naturally (no raw DB writes; full transaction + access context). Admin-gated per tenant. Returns a per-id {id, ok, error?} summary (ISO 19011:2018 §6.4.6 audit-evidence).',
    bg: 'Групов преход на състояние: задава `status` = toStatus на много редове (ids) от една колекция — upstream ActiveAdmin batch_action като един инструмент. Всеки ред минава през Payload Local API, така че всички hooks + emitOnStatusTransition се задействат естествено (без директни DB записи). Връща обобщение по id (ISO 19011:2018 §6.4.6).',
    de: 'Massen-Statusübergang: setzt `status` = toStatus für viele Zeilen (ids) einer Collection — die ActiveAdmin batch_action als ein Tool. Jede Zeile läuft über die Payload Local API, sodass alle Hooks + emitOnStatusTransition natürlich feuern (keine rohen DB-Schreibvorgänge). Liefert eine Zusammenfassung pro id (ISO 19011:2018 §6.4.6).',
    fr: "Transition d'état en masse : définit `status` = toStatus sur plusieurs lignes (ids) d'une collection — la batch_action ActiveAdmin portée en un outil. Chaque ligne passe par la Local API Payload afin que tous les hooks + emitOnStatusTransition se déclenchent naturellement (aucune écriture brute en base). Renvoie un résumé par id (ISO 19011:2018 §6.4.6).",
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.batch.${k}`, v)
}

export function buildBatchTools(): ReadonlyArray<ErpaxMcpTool> {
  const tTransition = makeToolI18n('erpax.batch.transition')
  return [
    {
      name: 'erpax.batch.transition',
      description: tTransition.desc(I18N.transition!),
      parameters: {
        collection: z.string().min(1),
        ids: z.array(z.string().min(1)).min(1).max(500),
        toStatus: z.string().min(1),
        tenantId: z.string().min(1),
        reason: z.string().optional(),
      },
      async handler(args, req) {
        const collection = args.collection as string
        const ids = args.ids as string[]
        const toStatus = args.toStatus as string
        const tenantId = args.tenantId as string
        const reason = args.reason as string | undefined

        const results: Array<{ id: string; ok: boolean; error?: string }> = []
        for (const id of ids) {
          try {
            // Drive the mutation through the Local API so every collection hook
            // + emitOnStatusTransition fires (no bypass). overrideAccess:false +
            // the shared `req` keep access control + the transaction intact.
            await req.payload.update({
              collection: collection as never,
              id,
              data: { status: toStatus } as never,
              overrideAccess: false,
              req,
            })
            results.push({ id, ok: true })
          } catch (error) {
            results.push({
              id,
              ok: false,
              error: (error instanceof Error ? error.message : String(error)).slice(0, 200),
            })
          }
        }

        const successful = results.filter((r) => r.ok).length
        return json({
          collection,
          toStatus,
          tenantId,
          requested: ids.length,
          successful,
          failed: results.length - successful,
          ...(reason ? { reason: String(reason).slice(0, 500) } : {}),
          results,
        })
      },
    },
  ]
}
