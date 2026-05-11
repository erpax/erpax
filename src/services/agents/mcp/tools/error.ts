/**
 * Error-uuid MCP tool family — Slice AAAAAAAAAA-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync' + 'error handling is
 * also part of the uuid'. Surfaces Conservation Law 64 as MCP tools
 * so external clients (agents, IDEs, federation peers) compute the
 * same ErrorUuids the in-process surface uses.
 *
 *   erpax.error.compute  — deterministic uuid from (code, message, …)
 *   erpax.error.wrap      — convert a raw error string + context into
 *                            both the structured info and the uuid
 *
 * @standard MCP 0.6
 * @audit Conservation Law 64 errors-are-first-class-uuids
 * @feature error_uuid
 * @see /src/services/error-uuid/index.ts
 */
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'
import { computeErrorUuid, wrapError } from '@/services/error-uuid'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: Record<string, z.ZodTypeAny>
  readonly handler: (args: Record<string, unknown>, req: PayloadRequest) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

const CATEGORY_ENUM = z.enum(['transient', 'permanent', 'validation', 'security', 'unknown'])

const I18N: Record<string, LocalizedString> = {
  compute: {
    en: 'Compute a deterministic structured ErrorUuid (Law 64) from (code, message, contextUuid?, category?, tenantId). Same logical error → same uuid; federation peers + replay tools verify error histories by uuid equality. sealed:true adds the SEALED capability for critical-error chain seal points.',
    bg: 'Изчислява детерминистичен структуриран ErrorUuid (Закон 64) от (code, message, contextUuid?, category?, tenantId). Един и същ logical error → същия uuid.',
    de: 'Berechnet eine deterministische strukturierte ErrorUuid (Gesetz 64) aus (code, message, contextUuid?, category?, tenantId). Gleicher logischer Fehler → gleiche uuid.',
    fr: 'Calcule un ErrorUuid structurée déterministe (Loi 64) à partir de (code, message, contextUuid?, category?, tenantId). Même erreur logique → même uuid.',
  },
  wrap: {
    en: 'Wrap a raw error message into structured ErrorInfo + ErrorUuid. Conversion is lossy by design — stack traces + non-deterministic fields dropped so the uuid is replay-safe. Use from any handler/provider that catches a thrown value.',
    bg: 'Обвива суров грешка в структуриран ErrorInfo + ErrorUuid. Конверсията е загубна — stack traces се изхвърлят за replay-safety.',
    de: 'Wickelt eine rohe Fehlermeldung in strukturiertes ErrorInfo + ErrorUuid. Verlustbehaftete Konvertierung — Stack Traces werden entfernt.',
    fr: 'Encapsule un message d\'erreur brut en ErrorInfo + ErrorUuid structurés. Conversion avec perte — les stack traces sont retirées pour la replay-safety.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.error.${k}`, v)
}

export function buildErrorTools(): ReadonlyArray<ErpaxMcpTool> {
  const tCompute = makeToolI18n('erpax.error.compute')
  const tWrap = makeToolI18n('erpax.error.wrap')

  return [
    {
      name: 'erpax.error.compute',
      description: tCompute.desc(I18N.compute!),
      parameters: {
        code: z.string().describe('Stable error code identifying the kind of failure (e.g. TIMEOUT, AUTH_DENIED, DATA_LOSS).'),
        message: z.string(),
        tenantId: z.string(),
        contextUuid: z.string().optional().describe('Content-uuid of the operation context (queryUuid / chainLeafUuid / etc.).'),
        category: CATEGORY_ENUM.optional(),
        sealed: z.boolean().optional().describe('When true, the uuid carries the SEALED capability — use for critical errors at chain seal points.'),
      },
      async handler(args, _req) {
        const errorUuid = computeErrorUuid({
          info: {
            code: String(args.code),
            message: String(args.message),
            contextUuid: args.contextUuid as string | undefined,
            category: (args.category as 'transient' | 'permanent' | 'validation' | 'security' | 'unknown' | undefined),
          },
          tenantId: String(args.tenantId),
          sealed: args.sealed === true,
        })
        return json({ errorUuid })
      },
    },
    {
      name: 'erpax.error.wrap',
      description: tWrap.desc(I18N.wrap!),
      parameters: {
        message: z.string().describe('The raw error message or thrown value (stringified).'),
        tenantId: z.string(),
        code: z.string().optional(),
        contextUuid: z.string().optional(),
        category: CATEGORY_ENUM.optional(),
        sealed: z.boolean().optional(),
      },
      async handler(args, _req) {
        const result = wrapError({
          err: String(args.message),
          tenantId: String(args.tenantId),
          code: args.code as string | undefined,
          contextUuid: args.contextUuid as string | undefined,
          category: (args.category as 'transient' | 'permanent' | 'validation' | 'security' | 'unknown' | undefined),
          sealed: args.sealed === true,
        })
        return json(result)
      },
    },
  ]
}
