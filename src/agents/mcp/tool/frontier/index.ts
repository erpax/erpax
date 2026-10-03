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
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { internalLeads, leadCross, selfSufficientNext, type InternalSources } from '@/self/sufficient'
import { involuteLeads, tagCounts, type Dual, type LeadTag, type TaggedLead } from '@/self/involute'
import { planScalpel, type ScalpelOp, type ScalpelPlan } from '@/scalpel'
import { seatOf, type Rotation } from '@/quantum/coil'
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
  develop: {
    en: 'The ACT leg of the frontier trinity: every theorem lead becomes a MANIFEST — scalpel ops the scalpel has already dry-run where a cut is computable (a two-file import tangle given the leaf `word`), or a decision with its computed evidence where only a human chooses (a hub to nest, a dead export to wire or drop, an atom carried by a dead barrel). Lies and manipulations get no manifest: a lie is fixed at the instrument, a manipulation by wiring a dual. Nothing is applied here — apply is the scalpel\'s door. COST: the same scans as erpax.frontier.next plus the cycle, concentration and unfolded populations for the leads asked.',
    bg: 'Кракът ДЕЙСТВИЕ на тройката на фронтира: всяка теорема-следа става МАНИФЕСТ — операции за скалпела, където разрезът е изчислим, или решение с доказателствата, където избира човек. Лъжи и манипулации не получават манифест. Нищо не се прилага тук.',
    de: 'Das ACT-Bein der Frontier-Dreiheit: jeder Theorem-Lead wird ein MANIFEST — Skalpell-Ops, wo der Schnitt berechenbar ist, oder eine Entscheidung mit Evidenz, wo ein Mensch wählt. Lügen und Manipulationen bekommen kein Manifest. Hier wird nichts angewendet.',
  },
  involute: {
    en: 'Every frontier lead TAGGED by its involution — the same claim asked from the dual seat. `theorem`: the dual instrument agrees (an unreached atom nobody imports or names from outside the charged set; a red axis whose law names its members; a cross whose lift beats chance). `lie`: the dual refutes it (a referrer exists; a red count with no member; an overlap at the base rate) — fix the instrument, never the atom it accused. `manipulation`: no dual could answer — one witness speaking for itself. `tag` filters. COST: the same scans as erpax.frontier.next plus the backward referrer walk.',
    bg: 'Всяка водеща следа на фронтира, ОЗНАЧЕНА чрез своята инволюция — същото твърдение, зададено от дуалното място. theorem: дуалът потвърждава; lie: дуалът опровергава — поправя се инструментът, не атомът; manipulation: никой дуал не може да отговори — един свидетел, говорещ за себе си. ЦЕНА: същите сканирания плюс обратния обход по рефериращите.',
    de: 'Jeder Frontier-Lead, MARKIERT durch seine Involution — dieselbe Behauptung vom dualen Sitz aus gefragt. theorem: das duale Instrument stimmt zu; lie: es widerlegt — das Instrument wird korrigiert, nie das beschuldigte Atom; manipulation: kein Dual konnte antworten — ein Zeuge, der für sich selbst spricht. KOSTEN: dieselben Scans plus der Rückwärtslauf über die Referenzierer.',
    fr: "Chaque piste de la frontière ÉTIQUETÉE par son involution — la même affirmation posée depuis le siège dual. theorem : l'instrument dual confirme ; lie : il réfute — on corrige l'instrument, jamais l'atome accusé ; manipulation : aucun dual n'a pu répondre — un seul témoin parlant pour lui-même. COÛT : les mêmes scans plus la marche arrière sur les référents.",
  },
}

const TAGS = ['theorem', 'lie', 'manipulation'] as const

// ─── the ACT leg — a lead becomes a manifest, never a hand ─────────────────────────────────────

/** One direction of a two-file tangle: what `importer` takes from `exporter`, and the statement that takes it. */
export interface TangleEdge {
  readonly importer: string
  readonly exporter: string
  readonly names: readonly string[]
  /** The exact import statement text — the bytes a scalpel op finds exactly once. */
  readonly statement: string
  /** The module specifier inside it, e.g. `@/auth`. */
  readonly specifier: string
}

/** What the live scans hand the act leg — every field optional, keyed by the lead's target. */
export interface DevelopEvidence {
  /** unreached target → barrels nothing imports that import it (the address to act at). */
  readonly deadReferrers?: ReadonlyMap<string, readonly string[]>
  /** cycle target → its tangle's members (repo-relative files) and, for a two-file tangle, both edges. */
  readonly tangles?: ReadonlyMap<string, { readonly members: readonly string[]; readonly edges: readonly TangleEdge[] }>
  /** concentration target → the hub's metrics. */
  readonly hubs?: ReadonlyMap<string, { readonly lineCount: number; readonly exportCount: number; readonly childAtomCount: number; readonly concentrationScore: number }>
  /** unfolded target → its dead (0 sites) and single-use (1 site) exports. */
  readonly exports?: ReadonlyMap<string, readonly { readonly name: string; readonly file: string; readonly sites: number }[]>
  /** The one decision a human makes for a leaf extraction: its word. Without it the ops stay templates. */
  readonly word?: string
  /** target → the rosetta turned about it: every law a seat, both faces ([[quantum]]/coil `rotateAbout`). */
  readonly rotations?: ReadonlyMap<string, Rotation>
}

/**
 * What a seat prescribes is its own law's sentence — the `**Law — …**` line of the law's SKILL, read
 * from the tree rather than restated here (a copy of an answer goes stale; [[rules]]/drift).
 */
export function seatStep(law: string, cwd: string = process.cwd()): string | undefined {
  const atom = law === 'accounting-wave' ? 'accounting/gaps' : `rules/${law}`
  let text: string
  try {
    text = readFileSync(join(cwd, 'src', atom, 'SKILL.md'), 'utf8')
  } catch {
    return undefined
  }
  const at = text.indexOf('**Law — ')
  if (at < 0) return undefined
  const end = text.indexOf('**', at + 8)
  return text
    .slice(at + 8, end < 0 ? undefined : end)
    .replace(/^\[\[law\]\]:\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface Development {
  readonly lead: Pick<TaggedLead, 'source' | 'target' | 'tag' | 'intent'>
  /** `ops`: the scalpel can cut it; `decision`: computed evidence, a human chooses; `none`: not a theorem. */
  readonly kind: 'ops' | 'decision' | 'none'
  readonly ops: readonly ScalpelOp[]
  /** The scalpel's own dry run over `ops` — every refusal named — or null when there is nothing to plan. */
  readonly plan: ScalpelPlan | null
  readonly steps: readonly string[]
  readonly evidence: Record<string, unknown>
}

const leafOps = (edge: TangleEdge, word: string): ScalpelOp => ({
  file: edge.importer,
  find: edge.statement,
  replace: edge.statement.replace(`'${edge.specifier}'`, `'${edge.specifier}/${word}'`),
  reason: `${edge.importer} takes ${edge.names.join(', ')} from ${edge.exporter}; those names depend on nothing else there, so they move to the leaf ${edge.specifier}/${word} and the import follows — the tangle's edge is cut, the exporter keeps its face by re-exporting`,
})

/**
 * The act leg, pure: a tagged lead becomes a manifest. Only a THEOREM is developed — a lie is fixed at
 * the instrument that told it and a manipulation is fixed by wiring a dual, so both return `none`
 * with the step that says so. Each theorem class gets what the corpus has learned to do with it:
 *
 * - a two-file cycle: extract the smaller side's names into a leaf child of the exporter, repoint the
 *   importer, re-export from the exporter — the cut that dissolved auth ↔ subscription/gate. With a
 *   `word` the import repoint is a scalpel op planned here; without one the ops stay a template,
 *   because the leaf's name is the one decision no theorem makes.
 * - a concentration hub: nest the pure private statics into children, the class keeps its face.
 * - a dead export: wire it at a caller that holds what it needs, or drop it; a single-use export:
 *   inline at its one site or make it reused.
 * - an unreached atom with a dead referrer: the referrer's barrel is the address, not the atom.
 */
export function developManifest(leads: readonly TaggedLead[], ev: DevelopEvidence, cwd: string = process.cwd()): Development[] {
  return leads.map((l) => rotated(develop(l, ev, cwd), l, ev.rotations?.get(l.target), cwd))
}

/**
 * The rosetta turned about the lead: every seat that sees it adds what that law prescribes, and the
 * seat count is carried as evidence — corroborated (two or more laws, never written to agree),
 * single (its own law alone), unseen (no law holds it as matter; the lead is a count). The lead's own
 * law is not repeated: its step is the manifest above.
 */
function rotated(d: Development, l: TaggedLead, rot: Rotation | undefined, cwd: string): Development {
  if (!rot) return d
  const own = l.source.replace(/^law:/, '')
  const dependent = dependentSeats(own)
  const others = rot.perspectives.filter((p) => p.seen > 0 && p.law !== own)
  // a seat that is the lead's own dual sees it by construction and corroborates nothing
  const independent = rot.seats.filter((s) => !dependent.has(s))
  const seat = seatOf(independent.length)
  const steps = [
    ...d.steps,
    ...others.map((p) => `from the ${p.law} seat (${p.seen} of ${rot.files} file(s), ${(p.backward * 100).toFixed(1)}% of its population${dependent.has(p.law) ? '; a dependent seat — it sees this lead because the other law does' : ''}): ${seatStep(p.law, cwd) ?? 'no prescription declared for this law'}`),
    ...(seat === 'unseen' ? ['no law of the rosetta holds this target as files — it is a count, not matter; develop the instrument that counted it before the target'] : []),
  ]
  return { ...d, steps, evidence: { ...d.evidence, seats: rot.seats, independent, seat, files: rot.files } }
}

/**
 * Seats whose population is DEFINED by another law's — one explains the other, so their agreement is
 * not two instruments agreeing. The pairs are the duals `frontierDuals` already encodes, declared
 * here in the open: an unreached atom has no deployment face, which is exactly what the accounting
 * wave charges, so the wave sees every unreached atom by construction.
 */
export function dependentSeats(law: string): ReadonlySet<string> {
  return DEPENDENT_SEATS[law] ?? new Set()
}

const DEPENDENT_SEATS: Readonly<Record<string, ReadonlySet<string>>> = {
  unreached: new Set(['accounting-wave']),
  'accounting-wave': new Set(['unreached']),
}

function develop(l: TaggedLead, ev: DevelopEvidence, cwd: string): Development {
    const lead = { source: l.source, target: l.target, tag: l.tag, intent: l.intent }
    if (l.tag === 'lie') return { lead, kind: 'none', ops: [], plan: null, steps: [`fix the instrument that told it (${l.instrument ?? 'unknown'}), never the target`], evidence: {} }
    if (l.tag === 'manipulation') return { lead, kind: 'none', ops: [], plan: null, steps: ['wire a dual instrument for this source before acting on its count'], evidence: {} }
    const tangle = ev.tangles?.get(l.target)
    if (l.source === 'law:cycle' && tangle) {
      if (tangle.members.length !== 2 || tangle.edges.length === 0) {
        return { lead, kind: 'decision', ops: [], plan: null, steps: [`a tangle of ${tangle.members.length} files — no single leaf dissolves it; see rules/cycle fatalCycleUses for the edge that bites`], evidence: { members: tangle.members } }
      }
      // the side that takes FEWER names moves: a smaller leaf, and the exporter's face stays intact
      const edge = [...tangle.edges].sort((a, b) => a.names.length - b.names.length)[0] as TangleEdge
      const leaf = ev.word ? `${edge.specifier}/${ev.word}` : `${edge.specifier}/<word>`
      const steps = [
        `create src/${leaf.slice(2)}/index.ts with ${edge.names.join(', ')} moved out of ${edge.exporter} (type imports only, so nothing can loop through it)`,
        `re-export ${edge.names.join(', ')} from ${edge.exporter} — its face is unchanged`,
        `repoint ${edge.importer}: ${edge.statement.trim()} → from '${leaf}'`,
        ...(ev.word ? [] : ['the leaf needs a word — pass `word` and the repoint becomes a planned scalpel op']),
      ]
      const ops = ev.word ? [leafOps(edge, ev.word)] : []
      return { lead, kind: ops.length ? 'ops' : 'decision', ops, plan: ops.length ? planScalpel(ops, cwd) : null, steps, evidence: { members: tangle.members, edges: tangle.edges.map((e) => ({ importer: e.importer, exporter: e.exporter, names: e.names })) } }
    }
    const hub = ev.hubs?.get(l.target)
    if (l.source === 'law:concentration' && hub) {
      return {
        lead,
        kind: 'decision',
        ops: [],
        plan: null,
        steps: [
          `${hub.lineCount} lines, ${hub.exportCount} export(s), ${hub.childAtomCount} child atom(s), score ${hub.concentrationScore}`,
          'nest the private statics that depend only on their arguments into one-word children with their own tests; the hub keeps every method and delegates (fiscal/period/resolver → span · code)',
        ],
        evidence: { ...hub },
      }
    }
    const exps = ev.exports?.get(l.target)
    if (l.source === 'law:unfolded' && exps) {
      return {
        lead,
        kind: 'decision',
        ops: [],
        plan: null,
        steps: exps.map((e) => (e.sites === 0 ? `${e.name} (${e.file}) has no caller: wire it where its inputs already exist (a job or route holding payload) or drop it — persistApiAuditEvent was wired in jobs/bnb/rates/sync` : `${e.name} (${e.file}) has one site: inline it there or make it reused`)),
        evidence: { exports: exps },
      }
    }
    const dead = ev.deadReferrers?.get(l.target)
    if (l.source === 'unreached' && dead && dead.length > 0) {
      return { lead, kind: 'decision', ops: [], plan: null, steps: dead.map((by) => `${by} imports ${l.target} and nothing imports ${by}: the dead code starts at ${by}, decide there`), evidence: { deadReferrers: dead } }
    }
    if (l.source === 'unreached') {
      return { lead, kind: 'decision', ops: [], plan: null, steps: ['no door reaches it and nothing refers to it: wire it (MCP tool, CLI, deployed import) or drop it — a lexical walk cannot decide which'], evidence: {} }
    }
    return { lead, kind: 'decision', ops: [], plan: null, steps: ['holds from both seats; no computed cut exists for this class yet — the act leg names that rather than guessing'], evidence: {} }
}

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
  /**
   * Whether an atom-scoped target is an address the tree has. A population that names a path no
   * folder answers to (`../fiscal/period/resolver`, from a law reporting src-relative files) has lied
   * about WHERE, and no dual can cross-examine a place that does not exist.
   */
  readonly addressable?: (target: string) => boolean
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
    const addressable = ev.addressable
    duals.push({
      source: 'law:',
      instrument: 'population',
      ask: (l) => {
        // A member at an address the tree does not have is the instrument lying about WHERE.
        if (addressable && !addressable(l.target)) return 'refutes'
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
    const { existsSync } = await import('node:fs')
    ev.addressable = (t) => !t.startsWith('.') && existsSync(join(cwd, 'src', t))
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
      role: 'measure',
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
      role: 'involute',
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
    {
      name: 'erpax.frontier.develop',
      role: 'act',
      description: makeToolI18n('erpax.frontier.develop').desc(I18N.develop!),
      parameters: {
        sources,
        target: z.string().optional().describe('one lead target, e.g. subscription/gate · fiscal/period/resolver · dashboard/nav'),
        word: z.string().regex(/^[a-z][a-z0-9]*$/).optional().describe('the leaf word for a two-file tangle — the one decision that turns the template into planned ops'),
        rotate: z.boolean().optional().describe('turn the rosetta about every lead (default true): each law a seat, both faces, its prescription fused into the manifest'),
        limit: z.number().int().min(1).max(200).optional(),
      },
      async handler(args) {
        const want = new Set((args.sources as string[] | undefined) ?? ['populations', 'unreached'])
        const cwd = process.cwd()
        const { src, duals, carried } = await liveSources(want)
        const tagged = involuteLeads(internalLeads(src), duals)
        const target = typeof args.target === 'string' ? args.target : undefined
        const theorems = tagged.filter((t) => t.tag === 'theorem' && (target === undefined || t.target === target))
        const ev = await developEvidence(cwd, theorems, carried, typeof args.word === 'string' ? args.word : undefined, args.rotate !== false)
        const developments = developManifest(theorems, ev, cwd)
        const seat = (s: string): number => developments.filter((d) => d.evidence.seat === s).length
        const rows = developments.slice(0, (args.limit as number | undefined) ?? 50)
        return json({
          asked: [...want].sort(),
          theorems: theorems.length,
          kinds: { ops: developments.filter((d) => d.kind === 'ops').length, decision: developments.filter((d) => d.kind === 'decision').length },
          ops: developments.flatMap((d) => d.ops).length,
          refused: developments.reduce((n, d) => n + (d.plan?.refused ?? 0), 0),
          // the rosetta turned about every lead: how many seats see each — laws never written to agree, agreeing
          rotation: ev.rotations ? { rosetta: [...(ev.rotations.values().next().value?.perspectives ?? [])].map((p) => p.law), corroborated: seat('corroborated'), single: seat('single'), unseen: seat('unseen') } : null,
          developments: rows,
          law: 'A lead is developed by a manifest the scalpel can plan, never by a hand — and by turning the rosetta about it, so every law that sees the lead adds what it has learned. Where a theorem names a word nobody can compute, the manifest says so and stops; applying is the scalpel\'s own door, ring-verified, batch by batch.',
        })
      },
    },
  ]
}

/** The evidence the act leg needs for the theorem leads it was handed — only the scans those leads call for. */
async function developEvidence(cwd: string, theorems: readonly TaggedLead[], carried: readonly Carried[], word?: string, rotate = true): Promise<DevelopEvidence> {
  const deadReferrers = new Map<string, string[]>()
  for (const c of carried) deadReferrers.set(c.target, [...(deadReferrers.get(c.target) ?? []), c.by])
  const ev: { -readonly [K in keyof DevelopEvidence]: DevelopEvidence[K] } = { deadReferrers, word }
  if (rotate) {
    // the rosetta the gate coil turns, turned here about each ATOM lead; an axis-scoped lead is a count and has no files to turn about
    const { rosetta } = await import('@/agents/mcp/tool/gate')
    const { rotateAbout } = await import('@/quantum/coil')
    const { laws, sets } = await rosetta(cwd)
    const rotations = new Map<string, Rotation>()
    for (const t of theorems) if (t.scope === 'atom' && !rotations.has(t.target)) rotations.set(t.target, rotateAbout(t.target, sets, laws))
    ev.rotations = rotations
  }
  const by = (source: string): string[] => [...new Set(theorems.filter((t) => t.source === source).map((t) => t.target))]
  const cycleTargets = by('law:cycle')
  if (cycleTargets.length > 0) {
    const { importCycles, importedNames } = await import('@/rules/cycle')
    const { readFileSync } = await import('node:fs')
    const { relative } = await import('node:path')
    const cycles = importCycles(cwd)
    const tangles = new Map<string, { members: string[]; edges: TangleEdge[] }>()
    for (const t of cycleTargets) {
      const c = cycles.find((x) => x.some((f) => f.includes(`/src/${t}/`)))
      if (!c) continue
      const members = c.map((f) => relative(cwd, f))
      const edges: TangleEdge[] = []
      if (c.length === 2) {
        for (const [importer, exporter] of [[c[0] as string, c[1] as string], [c[1] as string, c[0] as string]] as const) {
          const names = importedNames(importer, cwd).get(exporter) ?? []
          if (names.length === 0) continue
          const text = readFileSync(importer, 'utf8')
          const statement = text.split('\n').find((line) => /^import\b/.test(line) && names.every((n) => n === 'default' || n === '*' || line.includes(n))) ?? ''
          const specifier = /from\s+'([^']+)'/.exec(statement)?.[1] ?? ''
          edges.push({ importer: relative(cwd, importer), exporter: relative(cwd, exporter), names, statement, specifier })
        }
      }
      tangles.set(t, { members, edges })
    }
    ev.tangles = tangles
  }
  if (by('law:concentration').length > 0) {
    const { concentrationViolations } = await import('@/rules/concentration')
    ev.hubs = new Map(concentrationViolations(cwd).map((v) => [v.atomPath, { lineCount: v.metrics.lineCount, exportCount: v.metrics.exportCount, childAtomCount: v.metrics.childAtomCount, concentrationScore: v.metrics.concentrationScore }]))
  }
  const unfoldedTargets = new Set(by('law:unfolded'))
  if (unfoldedTargets.size > 0) {
    const { unfoldedExports } = await import('@/rules/unfolded')
    const { atomOfFile } = await import('@/mesh')
    const r = unfoldedExports(cwd)
    const exports = new Map<string, { name: string; file: string; sites: number }[]>()
    for (const e of [...r.dead, ...r.single]) {
      const atom = atomOfFile(e.file.startsWith('/') ? e.file : join(cwd, e.file), cwd)
      if (unfoldedTargets.has(atom)) exports.set(atom, [...(exports.get(atom) ?? []), { name: e.name, file: e.file, sites: e.sites }])
    }
    ev.exports = exports
  }
  return ev
}

/** @index-cross.foldback child=agents/mcp/tool/frontier parent=agents/mcp/tool — this cross folds back into its parent. */
