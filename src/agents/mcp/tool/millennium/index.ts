/**
 * MCP tools over [[millennium]]/data — the Clay statements tested on public datasets, from the chat.
 *
 * Pure over its arguments and the public web: no tenant rows. `erpax.millennium.data` runs every
 * dataset probe and returns the witnesses with their receipts; `erpax.millennium.perspectives`
 * crosses every problem with the perspectives the corpus reads it from. Unreachable is reported as
 * unreachable — never as a pass. `corpusSolves` is false in every row, as the register says.
 *
 * @see /src/millennium/data/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })

const I18N: Record<string, LocalizedString> = {
  data: {
    en: 'Every Clay (Millennium) statement the corpus can hold against a PUBLIC dataset, tested now: Riemann–von Mangoldt zero counting on Odlyzko\'s zeros, the Euler product against the Dirichlet series on the OEIS primes, BSD rank = analytic rank on LMFDB\'s curves. Each row carries witnesses, worst deviation, bound, and a receipt over the dataset bytes. Unreachable is reported as unreachable, never as a pass; the four untestable statements are returned as refusals with reasons. Nothing here proves a problem — corpusSolves stays false.',
    bg: 'Всяко твърдение от задачите на Клей, проверено срещу ПУБЛИЧЕН набор данни: нули на дзета (Odlyzko), прости числа (OEIS), елиптични криви (LMFDB). Недостъпното се докладва като недостъпно, никога като успех; непроверимите четири са отказани с причина.',
    de: 'Jede Clay-Aussage, die gegen einen ÖFFENTLICHEN Datensatz geprüft werden kann: Zeta-Nullstellen (Odlyzko), Primzahlen (OEIS), elliptische Kurven (LMFDB). Unerreichbar wird als unerreichbar gemeldet, nie als bestanden; die vier unprüfbaren Aussagen kommen als begründete Ablehnungen zurück.',
  },
  perspectives: {
    en: 'Every Millennium problem crossed with the perspectives the corpus reads it from: the lens atoms its register names (resolved to a SKILL on disk, dangling ones named), the referrers of @/millennium with the standards each cites, and whether the statement is dataset-tested or refused. No network.',
    bg: 'Всяка задача на Клей, кръстосана с перспективите, от които корпусът я чете: атомите на лещата, референтите със стандартите им, и дали твърдението е проверено или отказано.',
    de: 'Jedes Millennium-Problem gekreuzt mit den Perspektiven, aus denen der Korpus es liest: Linsen-Atome, Referrer mit ihren Standards, geprüft oder abgelehnt.',
  },
}

export function buildMillenniumTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.millennium.data')
  return [
    {
      name: 'erpax.millennium.data',
      description: t.desc(I18N.data!),
      parameters: {
        problem: z.string().optional().describe('narrow to one problem by its register name'),
      },
      async handler(args) {
        const { testClayData, refusals } = await import('@/millennium/data')
        const problem = typeof args.problem === 'string' ? args.problem : undefined
        const rows = (await testClayData()).filter((r) => problem === undefined || r.problem === problem)
        return json({
          corpusSolves: false,
          rows,
          refusals: refusals().filter((r) => problem === undefined || r.problem === problem),
          holds: rows.filter((r) => r.reachable).every((r) => r.witness?.holds === true),
          unreachable: rows.filter((r) => !r.reachable).map((r) => r.source),
        })
      },
    },
    {
      name: 'erpax.millennium.perspectives',
      description: t.desc(I18N.perspectives!),
      parameters: {
        problem: z.string().optional(),
      },
      async handler(args) {
        const { perspectives, coverageGaps } = await import('@/millennium/data')
        const problem = typeof args.problem === 'string' ? args.problem : undefined
        return json({
          corpusSolves: false,
          coverageGaps: coverageGaps(),
          perspectives: perspectives(process.cwd()).filter((p) => problem === undefined || p.problem === problem),
        })
      },
    },
  ]
}
