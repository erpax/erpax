/**
 * Frontier MCP tool family — the corpus's own frontier, crossed and ranked, over the public surface.
 *
 * `nextDirection` could always ORDER a frontier and never generate one: every intent had to be typed
 * by a person into [[think]]'s store. `internalLeads` closes that — the leads come from what the
 * corpus measures about itself, so the answer needs neither the network nor a human. See ./SKILL.md.
 *
 * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
 * @see ../../../self/sufficient — ../i18n.ts makeToolI18n + registerToolI18n
 */
import { z } from 'zod'
import { internalLeads, leadCross, selfSufficientNext, type InternalSources } from '@/self/sufficient'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  next: {
    en: "The corpus's own next move, measured rather than asked: red gates, undrawn proven crosses, unreached atoms and unanswered boundary questions become intents, which the standing queue ranks (regression > auditor-facing > blocks-everything > debt > cosmetic). A target named by TWO independent sources is reported as corroborated and outranks anything one source found alone. COST: each source is a full corpus scan, so pick only the ones you need.",
    bg: 'Следващият ход на корпуса, измерен вместо питан: червени гейтове, недоказани кръстосвания, непостигнати атоми и неотговорени въпроси към границата стават интенции, подредени по стоящата опашка. Цел, посочена от ДВА независими източника, се отчита като потвърдена. ЦЕНА: всеки източник е пълно сканиране.',
    de: 'Der eigene nächste Schritt des Korpus, gemessen statt erfragt: rote Gates, ungezeichnete Kreuze, unerreichte Atome und unbeantwortete Grenzfragen werden zu Intentionen, die die Warteschlange ordnet. Ein von ZWEI Quellen genanntes Ziel gilt als bestätigt. KOSTEN: jede Quelle ist ein vollständiger Scan.',
    fr: "Le prochain coup du corpus, mesuré plutôt que demandé : gates rouges, croisements non tracés, atomes non atteints et questions de frontière sans réponse deviennent des intentions que la file d'attente classe. Une cible nommée par DEUX sources est rapportée comme corroborée. COÛT : chaque source est un scan complet.",
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.frontier.${k}`, v)
}

const SOURCES = ['guardians', 'unreached', 'crosses', 'boundary'] as const

/**
 * Wire the requested measurements. Each is a full scan, so none runs unless asked for — and a source
 * that throws contributes NOTHING rather than failing the whole answer, because a missing
 * measurement is an unasked question, not a reason to refuse the ones that did answer.
 */
async function liveSources(want: ReadonlySet<string>): Promise<InternalSources> {
  const src: Record<string, unknown> = {}
  if (want.has('guardians')) {
    const { assertRulesHold } = await import('@/rules')
    const g = assertRulesHold(process.cwd()).guardians ?? []
    src.guardians = () => g.map((x) => ({ axis: x.axis, violations: x.violations, baseline: x.baseline, ok: x.ok }))
  }
  if (want.has('unreached')) {
    const { unreachedAtoms } = await import('@/rules/unreached')
    const a = unreachedAtoms(process.cwd())
    // The field is `atomPath`. Reading `.atom` gave undefined, so all 69 stringified to
    // "[object Object]" and the cross collapsed them to ONE target — a wrong adapter answers, it
    // does not error, and only the implausible count (1 where 69 was measured) showed it.
    src.unreached = () => a.map((x) => (typeof x === 'string' ? x : ((x as { atomPath: string }).atomPath)))
  }
  if (want.has('boundary')) {
    const { harvestLeads } = await import('@/outward/leads')
    const h = await harvestLeads()
    src.boundary = () => h.rows.map((r) => ({ name: r.name, state: r.state }))
  }
  return src as InternalSources
}

export function buildFrontierTools(): ReadonlyArray<ErpaxMcpTool> {
  const tNext = makeToolI18n('erpax.frontier.next')
  return [
    {
      name: 'erpax.frontier.next',
      description: tNext.desc(I18N.next!),
      parameters: {
        sources: z.array(z.enum(SOURCES)).min(1).optional(),
        limit: z.number().int().min(1).max(50).optional(),
      },
      async handler(args) {
        const want = new Set((args.sources as string[] | undefined) ?? ['guardians'])
        const src = await liveSources(want)
        const leads = internalLeads(src)
        const ranked = selfSufficientNext(src)
        const cross = leadCross(leads)
        return json({
          asked: [...want].sort(),
          leads: leads.length,
          next: ranked[0] ?? null,
          ranked: ranked.slice(0, (args.limit as number | undefined) ?? 8),
          corroborated: cross.corroborated,
          orthogonal: cross.orthogonal,
          sources: cross.sources,
          law: 'A frontier the corpus GENERATES, not one it was handed: nextDirection could always order intents and never produce them. A target two independent sources name outranks one either found alone.',
        })
      },
    },
  ]
}

/** @index-cross.foldback child=agents/mcp/tool/frontier parent=agents/mcp/tool — this cross folds back into its parent. */
