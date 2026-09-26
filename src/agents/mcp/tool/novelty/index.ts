/**
 * Novelty MCP tool family — the corpus's own cross enumerator, on the public surface.
 *
 * [[conjecture]] enumerates every pair of laws (C(n,2) of them exist the moment the laws do) and
 * ranks the undrawn ones. Two rankings, and they disagree: `crosses` measures absence in PROSE and
 * its top three picks each measured EMPTY, while `measure` intersects the laws' actual populations
 * and inverts the order. Both are exposed, because the disagreement is the finding.
 *
 * Read-only: nothing here writes, so no tenant guard is needed (the state-mutating set is where
 * that applies). The expensive one says so in its own description.
 *
 * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
 * @standard Shannon (1948) — surprise is −log₂ p, in bits
 * @see ../../../conjecture — ../i18n.ts makeToolI18n + registerToolI18n
 */
import { z } from 'zod'
import { exactRound } from '@/algebra'
import { crossIntersections, containment, crosses, orthogonalLaws } from '@/conjecture'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  crosses: {
    en: 'Enumerate every pair of erpax laws (C(n,2)) and rank the UNDRAWN ones by the surprise of their absence — Laplace-smoothed −PMI, large when both laws are widely cited and still never meet. HONEST CAVEAT, measured: this ranks absence in PROSE and does not predict what a cross would find; its top three picks each measured empty. Use erpax.novelty.measure for the population-based ranking.',
    bg: 'Изброява всяка двойка закони на erpax (C(n,2)) и подрежда НЕначертаните по изненадата на тяхното отсъствие — −PMI със заглаждане по Лаплас. ЧЕСТНА ОГРАДА, измерена: това подрежда отсъствие в ПРОЗАТА и не предсказва какво ще намери едно кръстосване; първите три избора се оказаха празни. За подреждане по популация използвайте erpax.novelty.measure.',
    de: 'Zählt jedes Gesetzespaar (C(n,2)) auf und ordnet die UNGEZEICHNETEN nach der Überraschung ihres Fehlens — Laplace-geglättetes −PMI. EHRLICHE GRENZE, gemessen: dies ordnet Abwesenheit im TEXT und sagt nicht voraus, was ein Kreuz finden würde; die ersten drei Treffer waren leer. Für die populationsbasierte Ordnung: erpax.novelty.measure.',
    fr: "Énumère chaque paire de lois (C(n,2)) et classe les NON TRACÉES par la surprise de leur absence — −PMI lissé de Laplace. LIMITE HONNÊTE, mesurée : ceci classe l'absence dans la PROSE et ne prédit pas ce qu'un croisement trouverait ; les trois premiers choix se sont révélés vides. Pour le classement par population : erpax.novelty.measure.",
  },
  measure: {
    en: 'The MEASURED cross: which laws fire on the SAME files. Returns the pairwise intersections, the DIRECTIONAL containment matrix (58% of duplicated-body files are also un-folded while only 3% of un-folded files are copies — so unfolded CARRIES copy rather than merely meeting it), and the orthogonal laws whose crosses are provably empty. EXPENSIVE: it runs one full scan per law supplied.',
    bg: 'ИЗМЕРЕНОТО кръстосване: кои закони се задействат върху ЕДНИ И СЪЩИ файлове. Връща двойните сечения, ПОСОЧНАТА матрица на съдържане (58% от файловете с дублирано тяло са и несгънати, докато само 3% от несгънатите са копия — значи unfolded НОСИ copy) и ортогоналните закони, чиито кръстосвания са доказуемо празни. СКЪПО: по едно пълно сканиране на закон.',
    de: 'Das GEMESSENE Kreuz: welche Gesetze auf DENSELBEN Dateien feuern. Liefert die paarweisen Schnittmengen, die GERICHTETE Enthaltungsmatrix (58% der Dateien mit dupliziertem Rumpf sind auch ungefaltet, aber nur 3% der ungefalteten sind Kopien — unfolded TRÄGT copy) und die orthogonalen Gesetze, deren Kreuze beweisbar leer sind. TEUER: ein voller Scan pro Gesetz.',
    fr: "Le croisement MESURÉ : quelles lois se déclenchent sur les MÊMES fichiers. Renvoie les intersections deux à deux, la matrice de containment DIRECTIONNELLE (58% des fichiers à corps dupliqué sont aussi non pliés, mais seulement 3% des non pliés sont des copies — unfolded PORTE copy) et les lois orthogonales dont les croisements sont prouvablement vides. COÛTEUX : un scan complet par loi.",
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.novelty.${k}`, v)
}

/** Each law's violating files, scanned once so every pair is free. See SKILL.md. */
async function populations(laws: readonly string[]): Promise<Map<string, ReadonlySet<string>>> {
  const cwd = process.cwd()
  const out = new Map<string, ReadonlySet<string>>()
  const want = new Set(laws)
  if (want.has('copy')) {
    const m = await import('@/rules/copy')
    out.set('copy', new Set(m.duplicateBodies(cwd).flatMap((g) => g.sites.map((s) => s.file))))
  }
  if (want.has('cycle')) {
    const m = await import('@/rules/cycle')
    out.set('cycle', new Set(m.importCycles(cwd).flat().map((f) => f.replace(`${cwd}/`, ''))))
  }
  if (want.has('concentration')) {
    const m = await import('@/rules/concentration')
    out.set('concentration', new Set(m.concentrationViolations(cwd).map((v) => v.file)))
  }
  if (want.has('mirror')) {
    const m = await import('@/rules/mirror')
    out.set('mirror', new Set(m.mirroredAssertions(cwd).map((x) => x.file)))
  }
  if (want.has('unfolded')) {
    const m = await import('@/rules/unfolded')
    const r = m.unfoldedExports(cwd)
    out.set('unfolded', new Set([...r.dead, ...r.single].map((e) => e.file)))
  }
  return out
}

const KNOWN = ['copy', 'cycle', 'concentration', 'mirror', 'unfolded'] as const

export function buildNoveltyTools(): ReadonlyArray<ErpaxMcpTool> {
  const tCrosses = makeToolI18n('erpax.novelty.crosses')
  const tMeasure = makeToolI18n('erpax.novelty.measure')
  return [
    {
      name: 'erpax.novelty.crosses',
      description: tCrosses.desc(I18N.crosses!),
      parameters: {
        limit: z.number().int().min(1).max(100).optional(),
        undrawnOnly: z.boolean().optional(),
      },
      async handler(args) {
        const all = crosses()
        const rows = args.undrawnOnly === false ? all : all.filter((c) => c.together === 0)
        return json({
          laws: new Set(all.flatMap((c) => [c.a, c.b])).size,
          pairs: all.length,
          drawn: all.filter((c) => c.together > 0).length,
          caveat:
            'ranks absence in PROSE, which did not predict what a cross would find — its top three picks measured empty; erpax.novelty.measure ranks by population',
          crosses: rows.slice(0, (args.limit as number | undefined) ?? 12),
        })
      },
    },
    {
      name: 'erpax.novelty.measure',
      description: tMeasure.desc(I18N.measure!),
      parameters: {
        laws: z.array(z.enum(KNOWN)).min(2).optional(),
      },
      async handler(args) {
        const laws = ((args.laws as string[] | undefined) ?? [...KNOWN]).filter((l) =>
          (KNOWN as readonly string[]).includes(l),
        )
        const sets = await populations(laws)
        const sizes = Object.fromEntries([...sets].map(([k, v]) => [k, v.size]))
        return json({
          scanned: sizes,
          intersections: crossIntersections(sets).map((x) => ({ ...x, files: x.files.slice(0, 5) })),
          containment: containment(sets)
            .filter((c) => c.share > 0)
            .map((c) => ({ ...c, share: exactRound(c.share * 100) / 100 })),
          orthogonal: orthogonalLaws(sets),
          reading:
            'containment is DIRECTIONAL: a law whose files are largely inside another is CARRIED by it, which places the carrier upstream',
        })
      },
    },
  ]
}

/** @index-cross.foldback child=agents/mcp/tool/novelty parent=agents/mcp/tool — this cross folds back into its parent. */
