/**
 * Integrity extensions MCP tool family — Slice PPPPPPPPP-cont +
 * QQQQQQQQQ (2026-05-11). Per user 'implement in mcp and erpax in
 * sync'.
 *
 * Surfaces the Batch 1 tamper-surface review services as MCP tools:
 *
 *   erpax.audit.writeEvent         — chain-linked audit-events write
 *   erpax.integrity.tamperCost     — Conservation Law 55 calculator
 *   erpax.integrity.threshold      — name-keyed compliance threshold check
 *
 * The pre-existing `erpax.integrity.*` family (sign / verify / encrypt /
 * decrypt / verify-tamper / federate from Slice SSSSS + HHHHHHHHH)
 * lives in the legacy `tool-defs.ts`; this file ships the NEW
 * extensions only. A follow-up cut will migrate the legacy entries
 * into this same modularized area.
 *
 * @standard MCP 0.6 tools/list + tools/call
 * @audit Conservation Law 8 + 55 (tamper-reversibility-cost)
 * @feature integrity_extensions
 * @see /src/services/audit-trail/write-audit-event.ts
 * @see /src/services/integrity/tamper-reverse-cost.ts
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import { writeAuditEvent } from '@/audit/trail/write-audit-event'
import {
  computeTamperReverseCost, meetsThreshold,
  type RegulatoryThreshold,
} from '@/integrity/tamper-reverse-cost'
import { assertAdminOnTenant } from '@/agents/mcp/tool/_guards'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  writeEvent: {
    en: 'Write a uuid-linked audit-events row: chain-append via auditChainAppendLinked + persist the queryable Payload row with chainLeafUuid + status. signatureRequired:true seals the leaf as a stream-pause / merged-unity meeting point.',
    bg: 'Записва audit-events ред с uuid-връзка: chain-append + Payload ред с chainLeafUuid. При signatureRequired:true листът се запечатва като streampause / срещна точка на обединение.',
    de: 'Schreibt eine uuid-verknüpfte audit-events-Zeile: chain-append + Payload-Zeile mit chainLeafUuid. Bei signatureRequired:true wird das Blatt als Stream-Pause / Merged-Unity-Punkt versiegelt.',
    fr: 'Écrit une ligne audit-events liée par uuid : chain-append + ligne Payload avec chainLeafUuid. Si signatureRequired:true, la feuille est scellée comme point de pause de flux / unité fusionnée.',
  },
  tamperCost: {
    en: 'Compute Conservation Law 55 tamper-reverse-cost for a sealed leaf at the given depth/stream-count/dimension-count. Returns bits-of-security; verifier walks the chain in O(N), tamper takes O(N × streams × dims × 2^k).',
    bg: 'Изчислява разходите за подправяне (Закон 55) за запечатан лист с дадена дълбочина/брой потоци/измерения. Връща бит-сигурност; верификация O(N), подправяне O(N × streams × dims × 2^k).',
    de: 'Berechnet die Tamper-Reverse-Cost (Gesetz 55) für ein versiegeltes Blatt an gegebener Tiefe/Stream-Anzahl/Dimensionszahl. Liefert Sicherheitsbits.',
    fr: 'Calcule le coût-d\'inversion-de-falsification (Loi 55) pour une feuille scellée à profondeur/streams/dimensions données. Retourne les bits de sécurité.',
  },
  threshold: {
    en: 'Compare a TamperReverseCost against a named regulatory threshold (eidas-qes 112-bit, gdpr-art-32 80-bit, pci-dss-§3.6 112-bit, nist-category-5 128-bit, post-quantum 256-bit). Returns whether the leaf meets the threshold.',
    bg: 'Сравнява TamperReverseCost с регулаторен праг (eidas-qes 112, gdpr-art-32 80, pci-dss 112, nist-cat-5 128, post-quantum 256). Връща дали листът покрива прага.',
    de: 'Vergleicht TamperReverseCost gegen einen benannten regulatorischen Schwellenwert. Liefert ob das Blatt den Schwellenwert erfüllt.',
    fr: 'Compare un TamperReverseCost à un seuil réglementaire nommé. Retourne si la feuille satisfait le seuil.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.audit.${k}`, v)
  registerToolI18n(`erpax.integrity.${k}`, v)
}

export function buildIntegrityExtensionTools(): ReadonlyArray<ErpaxMcpTool> {
  const tWrite = makeToolI18n('erpax.audit.writeEvent')
  const tCost = makeToolI18n('erpax.integrity.tamperCost')
  const tThresh = makeToolI18n('erpax.integrity.threshold')

  return [
    {
      name: 'erpax.audit.writeEvent',
      description: tWrite.desc(I18N.writeEvent!),
      parameters: {
        tenantId: z.string(),
        eventName: z.string(),
        subjectCollection: z.string(),
        subjectId: z.string(),
        action: z.string(),
        userId: z.string().optional(),
        correlationId: z.string().optional(),
        signatureRequired: z.boolean().optional().describe('When true, seal the leaf at a stream-pause / merged-unity meeting point.'),
        payload: z.record(z.unknown()).optional(),
      },
      async handler(args, req) {
        assertAdminOnTenant(String(args.tenantId), req)
        const out = await writeAuditEvent(
          { payload: req.payload, mediator: undefined /* CLI / agent context */ },
          {
            tenantId: String(args.tenantId),
            eventName: String(args.eventName),
            subjectCollection: String(args.subjectCollection),
            subjectId: String(args.subjectId),
            action: String(args.action),
            userId: args.userId as string | undefined,
            correlationId: args.correlationId as string | undefined,
            signatureRequired: args.signatureRequired === true,
            payload: args.payload as Record<string, unknown> | undefined,
          },
        )
        return json(out)
      },
    },
    {
      name: 'erpax.integrity.tamperCost',
      description: tCost.desc(I18N.tamperCost!),
      parameters: {
        leafDepth: z.number().int().min(1).describe('Position of the leaf in the chain (1 = first after genesis)'),
        streamCount: z.number().int().min(1).describe('Number of contributing streams (chains, agents, MCP tools)'),
        dimensionCount: z.number().int().min(1).describe('Number of dimensional plugins (10 for full ERPax)'),
        signatureBitsPerSeal: z.number().int().optional().describe('Bits of security per signature (Ed25519=128, RSA-PSS-2048=112)'),
        thresholdBits: z.number().int().optional().describe('Regulatory threshold to compare against (default 112 = eIDAS QES)'),
      },
      async handler(args, _req) {
        const cost = computeTamperReverseCost({
          leafDepth: Number(args.leafDepth),
          streamCount: Number(args.streamCount),
          dimensionCount: Number(args.dimensionCount),
          signatureBitsPerSeal: args.signatureBitsPerSeal as number | undefined,
          thresholdBits: args.thresholdBits as number | undefined,
        })
        return json(cost)
      },
    },
    {
      name: 'erpax.integrity.threshold',
      description: tThresh.desc(I18N.threshold!),
      parameters: {
        leafDepth: z.number().int().min(1),
        streamCount: z.number().int().min(1),
        dimensionCount: z.number().int().min(1),
        thresholdName: z.enum([
          'gdpr-art-32', 'eidas-qes', 'pci-dss-§3.6',
          'nist-category-5', 'post-quantum',
        ]),
      },
      async handler(args, _req) {
        const cost = computeTamperReverseCost({
          leafDepth: Number(args.leafDepth),
          streamCount: Number(args.streamCount),
          dimensionCount: Number(args.dimensionCount),
        })
        const meets = meetsThreshold(cost, args.thresholdName as RegulatoryThreshold)
        return json({ cost, threshold: args.thresholdName, meets })
      },
    },
  ]
}
