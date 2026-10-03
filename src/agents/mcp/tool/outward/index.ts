import { z } from 'zod'
import { harvestLeads, leadCandidates, leadCoverage, readAnswered } from '@/outward/leads'
import { upstreamCatalogue, upstreamCross } from '@/payload/upstream'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

/**
 * agents/mcp/tool/outward — the boundary, asked over MCP. See ./SKILL.md.
 */

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  leads: {
    en: 'Ask the whole external boundary once and report only what CHANGED. Every answer is content-addressed against a stored receipt, so an unchanged rail costs one comparison and only a MOVED address is news. Returns the leads (moved + fresh), the unreachable rails, and the coverage of the lead space. UNREACHABLE IS NOT A LEAD: a boundary that is down keeps its prior receipt and is reported separately, never as evidence that anything changed. Read-only unless `write` is true.',
    bg: 'Запитва цялата външна граница веднъж и докладва само КАКВО СЕ Е ПРОМЕНИЛО. Всеки отговор е адресиран по съдържание срещу запазена разписка, така че непроменена шина струва едно сравнение и само ПРЕМЕСТЕН адрес е новина. Връща водачите (moved + fresh), недостижимите шини и покритието. НЕДОСТИЖИМО НЕ Е ВОДАЧ: граница, която е спряла, запазва разписката си и се отчита отделно.',
    de: 'Fragt die gesamte äußere Grenze einmal und meldet nur, was sich GEÄNDERT hat. Jede Antwort wird gegen eine gespeicherte Quittung inhaltsadressiert, sodass eine unveränderte Schiene einen Vergleich kostet und nur eine VERSCHOBENE Adresse Neuigkeit ist. UNERREICHBAR IST KEIN LEAD: eine ausgefallene Grenze behält ihre Quittung und wird getrennt gemeldet.',
    fr: "Interroge toute la frontière externe une fois et ne rapporte que ce qui a CHANGÉ. Chaque réponse est adressée par contenu contre un reçu stocké, donc un rail inchangé coûte une comparaison et seule une adresse DÉPLACÉE est une nouvelle. INJOIGNABLE N'EST PAS UN LEAD : une frontière tombée garde son reçu et est rapportée séparément.",
  },
  upstream: {
    en: 'What Payload publishes, crossed against what erpax holds — the official repository\'s templates, examples and packages listed from GitHub and each asked whether this tree holds it (a package by package.json, a template or example by declared evidence). Reports held · gaps · unaskable and coverage per kind; a gap is a candidate, never a debt, and a directory GitHub refuses is refused by name rather than reported empty.',
    bg: 'Какво публикува Payload, кръстосано с какво държи erpax — шаблоните, примерите и пакетите на официалното хранилище, изброени от GitHub, и за всяко се пита дали това дърво го държи. Докладва held · gaps · unaskable и покритие по вид.',
    de: 'Was Payload veröffentlicht, gekreuzt mit dem, was erpax hält — Templates, Beispiele und Pakete des offiziellen Repositorys, von GitHub gelistet und jeweils gefragt, ob dieser Baum sie hält. Meldet held · gaps · unaskable und Abdeckung je Art.',
    fr: "Ce que Payload publie, croisé avec ce qu'erpax détient — les templates, exemples et packages du dépôt officiel listés depuis GitHub, chacun interrogé sur sa présence dans cet arbre. Rapporte held · gaps · unaskable et la couverture par type.",
  },
  next: {
    en: 'The single next lead nothing has answered yet — the boundary FUSED to the ask. The leads are the candidate space and `nextAsk` picks the first whose uuid the answered set does not contain, so this is the autonomous "what should I look at" over the outside world. Returns undefined when the boundary is fully covered, which is a real state and not an error. HONEST: it is the first UNCOVERED lead in harvest order, not the most important one — there is no priority model here.',
    bg: 'Единственият следващ водач, на който нищо още не е отговорило — границата, СЛЯТА с въпроса. Водачите са пространството на кандидатите и `nextAsk` избира първия, чийто uuid липсва в отговорените. Връща undefined когато границата е напълно покрита — реално състояние, не грешка. ЧЕСТНО: първият НЕПОКРИТ водач по ред на събиране, не най-важният.',
    de: 'Der einzige nächste Lead, den noch nichts beantwortet hat — die Grenze, FUSIONIERT mit der Frage. Die Leads sind der Kandidatenraum und `nextAsk` wählt den ersten, dessen uuid die Antwortmenge nicht enthält. Gibt undefined zurück, wenn die Grenze vollständig abgedeckt ist — ein echter Zustand, kein Fehler. EHRLICH: der erste UNBEDECKTE Lead in Erntereihenfolge, nicht der wichtigste.',
    fr: "Le seul lead suivant auquel rien n'a encore répondu — la frontière FUSIONNÉE à la question. Les leads sont l'espace des candidats et `nextAsk` choisit le premier dont l'uuid n'est pas dans l'ensemble répondu. Renvoie undefined quand la frontière est entièrement couverte — un état réel, pas une erreur. HONNÊTE : le premier lead NON COUVERT dans l'ordre de récolte, pas le plus important.",
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.outward.${k}`, v)
}

export function buildOutwardTools(): ReadonlyArray<ErpaxMcpTool> {
  const tLeads = makeToolI18n('erpax.outward.leads')
  const tNext = makeToolI18n('erpax.outward.next')
  const tUpstream = makeToolI18n('erpax.outward.upstream')
  return [
    {
      name: 'erpax.outward.upstream',
      role: 'involute',
      description: tUpstream.desc(I18N.upstream!),
      parameters: {
        kind: z.enum(['template', 'example', 'package']).optional(),
      },
      async handler(args) {
        const { entries, refused } = await upstreamCatalogue()
        const x = upstreamCross(args.kind ? entries.filter((e) => e.kind === args.kind) : entries)
        return json({
          fetched: x.fetched,
          refused,
          counts: { published: x.rows.length, held: x.held, gaps: x.gaps.length, unaskable: x.unaskable.length },
          coverage: x.coverage,
          gaps: x.gaps,
          unaskable: x.unaskable,
          rows: x.rows,
          boundary: refused.length > 0 ? 'a directory could not be read — the cross is partial and says which' : 'held means evidence exists, never that the pattern is used well; a gap is a candidate, and D1-over-Postgres is a choice',
        })
      },
    },
    {
      name: 'erpax.outward.leads',
      role: 'measure',
      description: tLeads.desc(I18N.leads!),
      parameters: {
        write: z.boolean().optional(),
      },
      async handler(args) {
        const h = await harvestLeads()
        const cov = leadCoverage(h, readAnswered())
        if (args.write === true) {
          const { writeHarvest } = await import('@/outward/leads')
          writeHarvest(h)
        }
        return json({
          asked: h.rows.length,
          leads: h.leads.map((r) => ({ name: r.name, state: r.state, note: r.note })),
          unreachable: h.unreachable.map((r) => ({ name: r.name, note: r.note })),
          coverage: { covered: cov.covered, outstanding: cov.outstanding, next: cov.next },
          law: 'A MOVED receipt is the world disagreeing with what was last recorded; a FRESH one is a boundary nobody had asked. UNCHANGED is silence and UNREACHABLE is an unanswered question, never evidence of change.',
          persisted: args.write === true,
        })
      },
    },
    {
      name: 'erpax.outward.next',
      role: 'act',
      description: tNext.desc(I18N.next!),
      parameters: {},
      async handler() {
        const h = await harvestLeads()
        const cov = leadCoverage(h, readAnswered())
        return json({
          next: cov.next ?? null,
          outstanding: cov.outstanding,
          covered: cov.covered,
          candidates: leadCandidates(h).length,
          boundary: cov.next === undefined ? 'fully covered' : 'a lead is outstanding',
        })
      },
    },
  ]
}

/** @index-cross.foldback child=agents/mcp/tool/outward parent=agents/mcp/tool — this cross folds back into its parent. */
