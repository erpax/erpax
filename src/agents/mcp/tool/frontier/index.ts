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
import { join } from 'node:path'
import { internalLeads, leadCross, selfSufficientNext, type InternalSources } from '@/self/sufficient'
import { involuteLeads, tagCounts, type Dual, type LeadTag } from '@/self/involute'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  next: {
    en: "The corpus's own next move, measured rather than asked: red gates, undrawn proven crosses, unreached atoms and unanswered boundary questions become intents, which the standing queue ranks (regression > auditor-facing > blocks-everything > debt > cosmetic). A target named by TWO sources IN ONE SCOPE is corroborated, and `agreement` says per pair whether the overlap beats chance (lift>1) or is the base rate of two large populations. COST: each source is a full corpus scan, so pick only the ones you need.",
    bg: 'Следващият ход на корпуса, измерен вместо питан: червени гейтове, недоказани кръстосвания, непостигнати атоми и неотговорени въпроси към границата стават интенции, подредени по стоящата опашка. Цел, посочена от ДВА независими източника, се отчита като потвърдена. ЦЕНА: всеки източник е пълно сканиране.',
    de: 'Der eigene nächste Schritt des Korpus, gemessen statt erfragt: rote Gates, ungezeichnete Kreuze, unerreichte Atome und unbeantwortete Grenzfragen werden zu Intentionen, die die Warteschlange ordnet. Ein von ZWEI Quellen genanntes Ziel gilt als bestätigt. KOSTEN: jede Quelle ist ein vollständiger Scan.',
    fr: "Le prochain coup du corpus, mesuré plutôt que demandé : gates rouges, croisements non tracés, atomes non atteints et questions de frontière sans réponse deviennent des intentions que la file d'attente classe. Une cible nommée par DEUX sources est rapportée comme corroborée. COÛT : chaque source est un scan complet.",
  },
  involute: {
    en: 'Every frontier lead TAGGED by its involution — the same claim asked from the dual seat. `theorem`: the dual instrument agrees (an unreached atom nobody imports or names from outside the charged set; a red axis whose law names its members; a cross whose lift beats chance). `lie`: the dual refutes it (a referrer exists; a red count with no member; an overlap at the base rate) — fix the instrument, never the atom it accused. `manipulation`: no dual could answer — one witness speaking for itself. `tag` filters. COST: the same scans as erpax.frontier.next plus the backward referrer walk.',
    bg: 'Всяка водеща следа на фронтира, ОЗНАЧЕНА чрез своята инволюция — същото твърдение, зададено от дуалното място. theorem: дуалът потвърждава; lie: дуалът опровергава — поправя се инструментът, не атомът; manipulation: никой дуал не може да отговори — един свидетел, говорещ за себе си. ЦЕНА: същите сканирания плюс обратния обход по рефериращите.',
    de: 'Jeder Frontier-Lead, MARKIERT durch seine Involution — dieselbe Behauptung vom dualen Sitz aus gefragt. theorem: das duale Instrument stimmt zu; lie: es widerlegt — das Instrument wird korrigiert, nie das beschuldigte Atom; manipulation: kein Dual konnte antworten — ein Zeuge, der für sich selbst spricht. KOSTEN: dieselben Scans plus der Rückwärtslauf über die Referenzierer.',
    fr: "Chaque piste de la frontière ÉTIQUETÉE par son involution — la même affirmation posée depuis le siège dual. theorem : l'instrument dual confirme ; lie : il réfute — on corrige l'instrument, jamais l'atome accusé ; manipulation : aucun dual n'a pu répondre — un seul témoin parlant pour lui-même. COÛT : les mêmes scans plus la marche arrière sur les référents.",
  },
}

const TAGS = ['theorem', 'lie', 'manipulation'] as const

/** What the live scans hand the duals — every field optional, because every source is asked for. */
export interface DualEvidence {
  /** Charged atoms (`unreached`). */
  readonly unreached?: readonly string[]
  /** Charged atoms a file or path string OUTSIDE the charged set reaches (`referrersOf`). */
  readonly referred?: ReadonlySet<string>
  /** Law → number of atom-addressed members its population names. */
  readonly populations?: ReadonlyMap<string, number>
  /** `bypass-math` violations by the axis each names (`artifact` for a hand-maintained file). */
  readonly bypass?: readonly { readonly axis: string }[]
  /** Axes the slack law reports over or under their ceiling — the ratchet's own claim balance. */
  readonly moved?: ReadonlySet<string>
  /** `accounting-wave` gap paths, atom-addressed. */
  readonly gaps?: readonly string[]
  /** Undrawn-cross label → lift. */
  readonly lifts?: ReadonlyMap<string, number>
}

const explainedBy = (gap: string, unreached: readonly string[]): boolean =>
  unreached.some((u) => u === gap || u.startsWith(`${gap}/`))

/**
 * The duals, built from evidence — pure, so the cross formulas are testable without a scan.
 *
 * - `unreached` ⊗ referrers: a charged atom something outside the charged set reaches is refuted.
 * - `guardian` ⊗ members: a red axis whose law names addressable members holds; a red count whose law
 *   names none is refuted; an axis with no population wired is silent — a manipulation, however red.
 *   Two counts get a real cross instead of a listing of themselves: `accounting-wave` ⊗ `unreached`
 *   (a gap path is EXPLAINED when an unreached atom lies at or under it — the wave's own claim that it
 *   is the unreached cascade), and `bypass-math` ⊗ slack (the emitted ratchet's complaint about an axis
 *   agrees with the gate's own over/under balance, or it does not).
 * - `law:<name>` ⊗ population: each member a law flags holds, except `law:accounting-wave`, which is
 *   asked the explanation cross per path and is silent when `unreached` was not scanned.
 * - `cross` ⊗ lift: above 1 the two laws agree beyond chance; at or below 1 the "gap" is the base rate.
 */
export function frontierDuals(ev: DualEvidence): Dual[] {
  const duals: Dual[] = []
  const members = new Map<string, number>(ev.populations ?? [])
  if (ev.unreached) members.set('unreached', ev.unreached.length)
  if (ev.bypass) members.set('bypass-math', ev.bypass.filter((v) => v.axis === 'artifact' || (ev.moved?.has(v.axis) ?? false)).length)
  if (ev.gaps && ev.unreached) {
    const u = ev.unreached
    members.set('accounting-wave', ev.gaps.filter((g) => explainedBy(g, u)).length)
  }
  duals.push({
    source: 'guardian',
    instrument: 'members',
    ask: (l) => (members.has(l.target) ? ((members.get(l.target) ?? 0) > 0 ? 'agrees' : 'refutes') : 'silent'),
  })
  if (ev.referred) {
    const refuted = ev.referred
    duals.push({ source: 'unreached', instrument: 'referrersOf', ask: (l) => (refuted.has(l.target) ? 'refutes' : 'agrees') })
  }
  if (ev.populations) {
    const u = ev.unreached
    duals.push({
      source: 'law:',
      instrument: 'population',
      ask: (l) => {
        if (l.source !== 'law:accounting-wave') return 'agrees'
        return u ? (explainedBy(l.target, u) ? 'agrees' : 'refutes') : 'silent'
      },
    })
  }
  if (ev.lifts) {
    const lifts = ev.lifts
    duals.push({ source: 'cross', instrument: 'lift', ask: (l) => (lifts.has(l.target) ? ((lifts.get(l.target) ?? 0) > 1 ? 'agrees' : 'refutes') : 'silent') })
  }
  return duals
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.frontier.${k}`, v)
}

const SOURCES = ['guardians', 'populations', 'unreached', 'crosses', 'boundary'] as const

/**
 * Wire the requested measurements. Each is a full scan, so none runs unless asked for — and a source
 * that throws contributes NOTHING rather than failing the whole answer, because a missing
 * measurement is an unasked question, not a reason to refuse the ones that did answer.
 */
/** An unreached lead a dead barrel imports: the lead holds, and the barrel is where to act. */
interface Carried {
  readonly target: string
  readonly by: string
}

async function liveSources(want: ReadonlySet<string>): Promise<{ src: InternalSources; duals: Dual[]; carried: Carried[] }> {
  const src: Record<string, unknown> = {}
  const ev: { -readonly [K in keyof DualEvidence]: DualEvidence[K] } = {}
  const carried: Carried[] = []
  const cwd = process.cwd()
  // `crosses` and `populations` are the SAME five scans read two ways — the crossing of the laws and
  // their members. Asking for both must not pay for them twice.
  let laws: Promise<ReadonlyMap<string, ReadonlySet<string>>> | undefined
  const measuredLaws = (): Promise<ReadonlyMap<string, ReadonlySet<string>>> =>
    (laws ??= import('@/agents/mcp/tool/novelty').then((m) => m.lawPopulations()))
  if (want.has('guardians')) {
    const { assertRulesHold } = await import('@/rules')
    const g = assertRulesHold(cwd).guardians ?? []
    src.guardians = () => g.map((x) => ({ axis: x.axis, violations: x.violations, baseline: x.baseline, ok: x.ok }))
    // bypass-math names the axis each violation is about; the slack law is the ratchet's own seat on
    // the same axes. Both are read from the gate's cache, so the cross costs no second scan.
    const { bypassMathViolations } = await import('@/law/folder/ratchet/compute')
    const bypass = bypassMathViolations(cwd)
    ev.bypass = bypass.map((v) => ({ axis: v.axis }))
    if (bypass.length > 0) {
      const { claimBalance } = await import('@/rules/slack')
      const cb = claimBalance(cwd)
      ev.moved = new Set([...cb.over, ...cb.under].map((x) => x.axis))
    }
  }
  if (want.has('unreached')) {
    const { unreachedAtoms, referrersOf } = await import('@/rules/unreached')
    const a = unreachedAtoms(cwd)
    // The field is `atomPath`. Reading `.atom` gave undefined, so all 69 stringified to
    // "[object Object]" and the cross collapsed them to ONE target — a wrong adapter answers, it
    // does not error, and only the implausible count (1 where 69 was measured) showed it.
    const atoms = a.map((x) => (typeof x === 'string' ? x : ((x as { atomPath: string }).atomPath)))
    src.unreached = () => atoms
    ev.unreached = atoms
    // The involution: the census asked from the referrer's seat. A charged atom a LIVE file outside
    // the charged set imports, or a path string names, is a lead the dual refutes — a door the
    // forward walk did not open — and it is tagged a lie rather than ranked as dead weight. A DEAD
    // referrer (a parent's barrel nothing imports) carries the lead instead; it is reported, not
    // counted against the claim.
    const refs = referrersOf(cwd, atoms)
    ev.referred = new Set(refs.filter((r) => r.live).map((r) => r.atomPath))
    carried.push(...refs.filter((r) => !r.live).map((r) => ({ target: r.atomPath, by: r.by })))
  }
  if (want.has('crosses')) {
    // `crosses` was DECLARED in SOURCES and wired to nothing — a source that cannot fire, which is
    // [[rules]]/unraised's defect sitting inside the tool that reports the frontier.
    const { crossIntersections, crosses: prose } = await import('@/conjecture')
    const cwd = process.cwd()
    const sets = await measuredLaws()
    // DRAWN is what the SKILL prose already says together; proven is what the tree measures. A cross
    // that is proven and undrawn is the gap — `crosses()` ranks absence in prose, so it is the arbiter
    // of drawn and never of proven.
    const drawn = new Set(prose(cwd).filter((c) => c.together > 0).map((c) => `${c.a}×${c.b}`))
    const rows = crossIntersections(sets)
      .filter((i) => i.shared > 0 && !drawn.has(`${i.a}×${i.b}`) && !drawn.has(`${i.b}×${i.a}`))
      .sort((x, y) => y.shared - x.shared)
    const label = (i: { a: string; b: string; shared: number }): string => `${i.a} × ${i.b} — ${i.shared} shared`
    src.crosses = () => rows.map(label)
    // The involution of "a gap two laws agree on" is the lift: shared files beyond what independence
    // predicts. At or below 1 the agreement IS the base rate of two large populations, and the lead
    // claiming a gap is refuted by the same intersection that produced it.
    ev.lifts = new Map(rows.map((i) => [label(i), i.lift]))
  }
  if (want.has('populations')) {
    const { atomOfFile } = await import('@/mesh')
    const sets = await measuredLaws()
    // The ATOM, not the file: a law's population is file-addressed and `unreached` is atom-addressed,
    // so without this normalisation the two can only ever disagree. One address or no cross.
    const rows = [...sets].map(([law, files]) => ({
      law,
      members: [...new Set([...files].map((f) => atomOfFile(f.startsWith('/') ? f : join(cwd, f), cwd)))].sort(),
    }))
    // accounting-wave is a count of GAP PATHS, and gap paths are atom-addressed — so it is a
    // population too, and each path meets `unreached` at one address. The wave's own claim is that it
    // is the unreached cascade (a charged leaf charges every folder above it); the cross tests it.
    const { waveAccountingGapViolations } = await import('@/accounting/gaps')
    const wave = waveAccountingGapViolations(cwd)
    const gaps = [...new Set(wave.verdict.waves.flatMap((w) => [...w.paths]))].sort()
    rows.push({ law: 'accounting-wave', members: gaps })
    ev.gaps = gaps
    src.populations = () => rows
    ev.populations = new Map(rows.filter((r) => r.law !== 'accounting-wave').map((r) => [r.law, r.members.length]))
  }
  if (want.has('boundary')) {
    const { harvestLeads } = await import('@/outward/leads')
    const h = await harvestLeads()
    src.boundary = () => h.rows.map((r) => ({ name: r.name, state: r.state }))
    // No dual is wired: one failed fetch is one witness. The right dual is a second route (the
    // uuidna fanout over its host list), which is external — named in the SKILL, not imitated here.
  }
  return { src: src as InternalSources, duals: frontierDuals(ev), carried }
}

export function buildFrontierTools(): ReadonlyArray<ErpaxMcpTool> {
  const tNext = makeToolI18n('erpax.frontier.next')
  const tInvolute = makeToolI18n('erpax.frontier.involute')
  const sources = z.array(z.enum(SOURCES)).min(1).optional()
  return [
    {
      name: 'erpax.frontier.next',
      description: tNext.desc(I18N.next!),
      parameters: {
        sources,
        limit: z.number().int().min(1).max(50).optional(),
      },
      async handler(args) {
        const want = new Set((args.sources as string[] | undefined) ?? ['guardians'])
        const { src, duals, carried } = await liveSources(want)
        const leads = internalLeads(src)
        const tagged = involuteLeads(leads, duals)
        const tagOfIntent = new Map(tagged.map((t) => [t.intent, t.tag]))
        // Every ranked entry carries its tag: a lie is never acted on because it ranked first.
        const ranked = selfSufficientNext(src).map((d) => ({ ...d, tag: tagOfIntent.get(d.intent) ?? ('manipulation' as LeadTag) }))
        const cross = leadCross(leads)
        const bySource = (tag: LeadTag): Record<string, number> => {
          const out: Record<string, number> = {}
          for (const t of tagged) if (t.tag === tag) out[t.source] = (out[t.source] ?? 0) + 1
          return out
        }
        return json({
          asked: [...want].sort(),
          leads: leads.length,
          next: ranked.find((d) => d.tag === 'theorem') ?? ranked[0] ?? null,
          ranked: ranked.slice(0, (args.limit as number | undefined) ?? 8),
          tags: tagCounts(tagged),
          lies: tagged.filter((t) => t.tag === 'lie').map(({ source, target, instrument, formula }) => ({ source, target, instrument, formula })),
          manipulations: bySource('manipulation'),
          // `carried` below is leadCross's (a source inside another); this is the referrer kind.
          deadReferrers: carried,
          agreement: cross.agreement,
          corroborated: cross.corroborated,
          carried: cross.carried,
          orthogonal: cross.orthogonal,
          incommensurable: cross.incommensurable,
          scopes: cross.scopes,
          sources: cross.sources,
          law: 'A frontier the corpus GENERATES, not one it was handed, and every lead TAGGED by its involution: asked from the dual seat it holds (theorem), is refuted (lie), or nobody could ask (manipulation). The next move is the first ranked theorem; a lie is fixed at the instrument that told it.',
        })
      },
    },
    {
      name: 'erpax.frontier.involute',
      description: tInvolute.desc(I18N.involute!),
      parameters: {
        sources,
        tag: z.enum(TAGS).optional(),
        limit: z.number().int().min(1).max(500).optional(),
      },
      async handler(args) {
        const want = new Set((args.sources as string[] | undefined) ?? ['guardians'])
        const { src, duals, carried } = await liveSources(want)
        const tagged = involuteLeads(internalLeads(src), duals)
        const only = args.tag as LeadTag | undefined
        const rows = only ? tagged.filter((t) => t.tag === only) : tagged
        return json({
          asked: [...want].sort(),
          tags: tagCounts(tagged),
          duals: duals.map((d) => ({ source: d.source, instrument: d.instrument })),
          deadReferrers: carried,
          leads: rows.slice(0, (args.limit as number | undefined) ?? 50).map(({ source, scope, target, tag, instrument, formula }) => ({ source, scope, target, tag, instrument, formula })),
          law: 'theorem · lie · manipulation is the whole codomain — no lead remains untagged (Involute.every_lead_is_tagged, src/verify/lean/Involute.lean).',
        })
      },
    },
  ]
}

/** @index-cross.foldback child=agents/mcp/tool/frontier parent=agents/mcp/tool — this cross folds back into its parent. */
