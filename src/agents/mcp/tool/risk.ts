/**
 * MCP tools over [[risk]] — large-exposure concentration, aggregated by connected client BEFORE the test.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant ([[_guards]] is for tools that do, and adding it here is theatre).
 * The atom's refusals are restated in each description, because an MCP caller does not read a SKILL.
 *
 * @see /src/risk/index.ts
 */
import { z } from 'zod'
import { json, makeToolI18n, type ErpaxMcpTool, type LocalizedString } from './_contract'
import { concentration } from '@/risk'

const I18N: Record<string, LocalizedString> = {
  concentration: {
    en: 'Large-exposure concentration against Tier 1 capital (CRR Art. 392/395). Exposures are AGGREGATED BY CONNECTED CLIENT before testing, because a borrower split across three names sits under the limit while the real exposure sits over it. Large (report) and breach (cure) are returned as separate lists.',
    bg: 'Концентрация на големи експозиции спрямо капитал от първи ред (CRR 392/395). Агрегира по свързани клиенти ПРЕДИ проверката.',
    de: 'Großkredit-Konzentration gegen Kernkapital (CRR Art. 392/395). Aggregiert VOR der Prüfung nach verbundenen Kunden.',
  },
}

const EXPOSURE = z.object({ client: z.string(), group: z.string().optional(), amount: z.number() })

export function buildRiskTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.risk.concentration')
  return [
    {
      name: 'erpax.risk.concentration',
      description: t.desc(I18N.concentration!),
      parameters: {
        exposures: z.array(EXPOSURE),
        tier1: z.number().describe('Tier 1 capital, same unit as the exposures.'),
      },
      async handler(args) {
        return json(concentration(args.exposures as unknown as Parameters<typeof concentration>[0], Number(args.tier1)))
      },
    },
  ]
}
