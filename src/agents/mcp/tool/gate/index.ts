/**
 * MCP tools over the gate registry — every guardian verdict, and the gates FORMULATED AS CROSSES.
 *
 * A gate here is not a lane an author waits for; it is a question an agent asks. `verdicts` is the
 * same arbiter the push lane runs (assertRulesHold, never a second measurement). `cross` and
 * `crosses` are the cross-formulated gates: two laws, their violating populations intersected, the
 * lift of that intersection against independence, and the surprise of the pair's absence in prose
 * ([[conjecture]]). A cross whose intersection is empty over non-empty parents is a theorem at zero —
 * the shape [[rules]]/copy's copy × cycle already holds.
 *
 * The lanes stay. A gate that can be skipped is prose ([[rules]]), and an MCP door is skippable by
 * construction; this is the surface that lets an agent ask BEFORE the push, not a replacement for
 * the push refusing. Every tool here is a full-tree scan and says so.
 *
 * @see /src/rules/index.ts · /src/conjecture/index.ts · ../novelty (lawPopulations)
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import { type Cross, type Intersection, crossIntersections, crosses as proseCrosses } from '@/conjecture'

const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })

const I18N: Record<string, LocalizedString> = {
  verdicts: {
    en: 'Every guardian of the gate registry — axis, violations, baseline, ok, reason — read from the SAME arbiter the push lane runs (assertRulesHold; a 5-minute cached full-tree scan). `axis` narrows to one. `sealed` is the conjunction. This asks the gate before the push; it does not replace the push refusing.',
    bg: 'Всеки пазител на регистъра на гейтовете — ос, нарушения, базова линия, ok — от същия арбитър, който пуш-лентата изпълнява. Пълно сканиране на дървото.',
    de: 'Jeder Wächter der Gate-Registry — Achse, Verstöße, Basislinie, ok — vom selben Schiedsrichter, den die Push-Lane ausführt. Vollständiger Baum-Scan.',
  },
  cross: {
    en: 'One gate FORMULATED AS A CROSS of two laws (copy · cycle · concentration · mirror · unfolded): the files both laws flag, the lift of that intersection against independence (≈1 means the two fire independently, whatever the count), and how conspicuously the pair is absent from prose. `theorem` is true when the intersection is empty over two non-empty parents — a cross that holds at zero. Full-tree scans for both laws.',
    bg: 'Един гейт, ФОРМУЛИРАН КАТО КРЪСТОСВАНЕ на два закона: файловете, които двата закона отбелязват, lift спрямо независимост и колко забележимо двойката липсва в прозата. theorem е true при празно сечение над непразни родители.',
    de: 'Ein Gate, FORMULIERT ALS KREUZ zweier Gesetze: die Dateien, die beide Gesetze markieren, der Lift gegen Unabhängigkeit und wie auffällig das Paar in der Prosa fehlt. theorem ist true bei leerem Schnitt über nichtleeren Eltern.',
  },
  coil: {
    en: 'The rosetta of laws COILED instead of enumerated: coins (a law and its dual face) in trinities, each trinity turned once forward and once backward — six ordered pairs, every cross in both faces (forward = share of A inside B, backward = share of B inside A). Seven laws coil into two trinities and an axis (accounting-wave); one turn each way at each of the three nodes covers all 21 crosses — `coverage.complete` is the theorem, measured on the live structure. A coil–coil cross unions populations and withholds the lift. Same scans as erpax.gate.crosses plus the unreached and accounting-wave populations.',
    bg: 'Розетата от закони НАВИТА вместо изброена: монети (закон и дуалното му лице) в тройки, всяка тройка завъртяна веднъж напред и веднъж назад — шест наредени двойки, всяко кръстосване в двете му лица. Седем закона се навиват в две тройки и ос; по един оборот във всяка посока на всеки възел покрива всичките 21 кръстосвания.',
    de: 'Die Rosette der Gesetze GEWICKELT statt aufgezählt: Münzen (ein Gesetz und seine duale Seite) in Dreiheiten, jede einmal vorwärts und einmal rückwärts gedreht — sechs geordnete Paare, jedes Kreuz in beiden Seiten. Sieben Gesetze wickeln sich zu zwei Dreiheiten und einer Achse; eine Drehung je Richtung an jedem Knoten deckt alle 21 Kreuze.',
  },
  crosses: {
    en: 'Every pair of the measured laws as a cross-formulated gate, ranked by lift (then shared files): which crosses are theorems at zero, which fire together more than independence predicts, and which have never been drawn in prose. One scan per law pays for every pair.',
    bg: 'Всяка двойка от измерените закони като кръстосан гейт, подредена по lift: кои са теореми при нула, кои се задействат заедно повече от независимостта, кои не са описани в прозата.',
    de: 'Jedes Paar der gemessenen Gesetze als Kreuz-Gate, nach Lift geordnet: welche Kreuze Theoreme bei null sind, welche häufiger zusammen feuern als Unabhängigkeit vorhersagt, welche nie in Prosa gezeichnet wurden.',
  },
}

export interface CrossGate {
  readonly a: string
  readonly b: string
  /** Files both laws flag. */
  readonly shared: number
  readonly files: readonly string[]
  /** Observed ÷ expected-under-independence; ≈1 is independent, whatever `shared` says. */
  readonly lift: number
  readonly bits: number
  /** Both parents report violations — a cross between two satisfied laws finds nothing. */
  readonly live: boolean
  /** Empty intersection over two non-empty parents: the cross holds at zero. */
  readonly theorem: boolean
  /** How the pair reads in prose — SKILLs naming each, naming both, and the surprise of their absence. */
  readonly prose: { readonly citedA: number; readonly citedB: number; readonly together: number; readonly bits: number } | null
}

/** The pure cross: measured intersection + prose absence for one pair. Hermetic — the test feeds the maps. */
export function crossGate(
  sets: ReadonlyMap<string, ReadonlySet<string>>,
  prose: readonly Cross[],
  a: string,
  b: string,
): CrossGate {
  const [x, y] = [a, b].sort()
  const i: Intersection | undefined = crossIntersections(sets).find((c) => c.a === x && c.b === y)
  const sa = sets.get(x)?.size ?? 0
  const sb = sets.get(y)?.size ?? 0
  const p = prose.find((c) => (c.a === x && c.b === y) || (c.a === y && c.b === x))
  const shared = i?.files.length ?? 0
  return {
    a: x!,
    b: y!,
    shared,
    files: i?.files ?? [],
    lift: i?.lift ?? 0,
    bits: i?.bits ?? 0,
    live: sa > 0 && sb > 0,
    theorem: sa > 0 && sb > 0 && shared === 0,
    prose: p ? { citedA: p.citedA, citedB: p.citedB, together: p.together, bits: p.bits } : null,
  }
}

/** Every pair, ranked: lift first, then shared, then name. */
export function crossGates(sets: ReadonlyMap<string, ReadonlySet<string>>, prose: readonly Cross[]): CrossGate[] {
  const laws = [...sets.keys()].sort()
  const out: CrossGate[] = []
  for (let i = 0; i < laws.length; i++) {
    for (let j = i + 1; j < laws.length; j++) out.push(crossGate(sets, prose, laws[i]!, laws[j]!))
  }
  return out.sort((p, q) => q.lift - p.lift || q.shared - p.shared || p.a.localeCompare(q.a) || p.b.localeCompare(q.b))
}

/** The laws, their populations, and the prose crosses — one scan per law, paid once per call. */
async function measured(cwd: string): Promise<{ sets: Map<string, ReadonlySet<string>>; prose: Cross[] }> {
  const { lawPopulations } = await import('@/agents/mcp/tool/novelty')
  const sets = await lawPopulations()
  const live = new Map([...sets].map(([law, files]) => [law, files.size]))
  return { sets, prose: proseCrosses(cwd, live) }
}

/**
 * The seven-law rosetta the coil turns: the five file-addressed laws plus the two the frontier
 * addresses as ATOMS — `unreached` (charged atoms) and `accounting-wave` (gap paths) — brought to the
 * same address form as a barrel file, so a coil–coil cross can meet them. The order is declared,
 * because the coil never reorders what it is handed; the remainder is the axis.
 */
async function rosetta(cwd: string): Promise<{ laws: string[]; sets: Map<string, ReadonlySet<string>> }> {
  const { existsSync } = await import('node:fs')
  const { join } = await import('node:path')
  const { sets } = await measured(cwd)
  const barrel = (atom: string): string => {
    for (const n of ['index.ts', 'index.tsx']) if (existsSync(join(cwd, 'src', atom, n))) return `src/${atom}/${n}`
    return `src/${atom}`
  }
  const { unreachedAtoms } = await import('@/rules/unreached')
  sets.set('unreached', new Set(unreachedAtoms(cwd).map((a) => barrel(a.atomPath))))
  const { waveAccountingGapViolations } = await import('@/accounting/gaps')
  const wave = waveAccountingGapViolations(cwd)
  sets.set('accounting-wave', new Set(wave.verdict.waves.flatMap((w) => [...w.paths]).map(barrel)))
  const laws = ['copy', 'cycle', 'concentration', 'mirror', 'unfolded', 'unreached', 'accounting-wave'].filter((l) => sets.has(l))
  return { laws, sets }
}

export function buildGateTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.gate.verdicts')
  return [
    {
      name: 'erpax.gate.verdicts',
      role: 'measure',
      description: t.desc(I18N.verdicts!),
      parameters: {
        axis: z.string().optional().describe('one guardian axis, e.g. stray-ts · diamond-membership · matrix-crack'),
      },
      async handler(args) {
        const { assertRulesHold } = await import('@/rules')
        const v = assertRulesHold(process.cwd())
        const axis = typeof args.axis === 'string' ? args.axis : undefined
        const guardians = v.guardians.filter((g) => axis === undefined || g.axis === axis)
        if (axis !== undefined && guardians.length === 0) {
          throw new Error(`erpax.gate.verdicts: no guardian on axis "${axis}" — the registry holds ${v.guardians.map((g) => g.axis).join(', ')}`)
        }
        return json({
          sealed: v.sealed,
          reason: v.reason,
          total: v.guardians.length,
          red: v.guardians.filter((g) => !g.ok).length,
          guardians: guardians.map((g) => ({ axis: g.axis, violations: g.violations, baseline: g.baseline, ok: g.ok, reason: g.reason })),
        })
      },
    },
    {
      name: 'erpax.gate.cross',
      role: 'involute',
      description: t.desc(I18N.cross!),
      parameters: {
        a: z.string(),
        b: z.string(),
      },
      async handler(args) {
        const a = String(args.a)
        const b = String(args.b)
        if (a === b) throw new Error('erpax.gate.cross: a cross needs two different laws')
        const { measuredLaws } = await import('@/agents/mcp/tool/novelty')
        const known = measuredLaws()
        for (const law of [a, b]) {
          if (!known.includes(law)) throw new Error(`erpax.gate.cross: "${law}" is not a measured law — the measured laws are ${known.join(', ')}`)
        }
        const { sets, prose } = await measured(process.cwd())
        return json(crossGate(sets, prose, a, b))
      },
    },
    {
      name: 'erpax.gate.crosses',
      role: 'involute',
      description: t.desc(I18N.crosses!),
      parameters: {
        limit: z.number().int().min(1).max(50).optional(),
      },
      async handler(args) {
        const { sets, prose } = await measured(process.cwd())
        const all = crossGates(sets, prose)
        return json({
          laws: [...sets.keys()].sort(),
          pairs: all.length,
          theorems: all.filter((c) => c.theorem).map((c) => `${c.a} × ${c.b}`),
          crosses: all.slice(0, (args.limit as number | undefined) ?? all.length),
        })
      },
    },
    {
      name: 'erpax.gate.coil',
      role: 'involute',
      description: t.desc(I18N.coil!),
      parameters: {},
      async handler() {
        const { coil, coilCrosses, coins, coverage } = await import('@/quantum/coil')
        const { laws, sets } = await rosetta(process.cwd())
        const tree = coil(laws)
        const levels = coilCrosses(sets, laws)
        const flat = levels.flatMap((l) => [...l.forward, ...l.backward])
        return json({
          rosetta: laws,
          coil: tree.kind === 'coil' ? tree.children.map(coins) : [coins(tree)],
          coverage: coverage(tree),
          populations: Object.fromEntries(laws.map((l) => [l, sets.get(l)?.size ?? 0])),
          theorems: flat.filter((c) => c.theorem && c.a.length === 1 && c.b.length === 1).map((c) => `${c.a[0]} → ${c.b[0]}`),
          levels,
          law: 'Coins coil in trinities because three is the one ring a single turn each way closes (C(n,2)=n ⇔ n=3, Coil.lean); more coins coil fractally and one turn each way at every node crosses everything — both faces, nothing enumerated.',
        })
      },
    },
  ]
}
