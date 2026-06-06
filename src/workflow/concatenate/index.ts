/**
 * workflow/concatenate — the CONCATENATOR. command·question·answer atoms chained
 * into COMPLETELY AUTONOMOUS workflows: the free monoid (C×Q×A)*.
 *
 * A Step = ⟨command, question, answer⟩ — three atom NAMES (refs into the corpus;
 * the logic lives in the named atoms, a Step holds none — DRY by reference). A
 * Workflow = ordered Steps. `concatenate` is ASSOCIATIVE with identity EMPTY, so
 * chains compose in any grouping (the [[sequence]] guarantee). The runner is the
 * [[breath]] at step scale: run the COMMAND ([[command]]), ask the QUESTION (a
 * [[gate]]), and on NO apply the computed ANSWER ([[answer]]) and re-ask — until
 * YES, then the next step. No human: the answer is COMPUTED ([[self]]-sufficiency).
 *
 * The fixed point W* is EVERY question YES = zero entropy = aura-gap-0 = coverage-1
 * = ∞ tamper-cost (the [[law]]); at W* re-running is a no-op (idempotent, and
 * [[merge]]-safe because identical steps share one content-uuid).
 *
 *   tsx src/workflow/concatenate/index.ts
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step
 * @audit pure — the algebra + an injected NAME→effect registry; effects at the boundary
 * @see ../index.ts (the BPMN runtime service) -- ../../command -- ../../question -- ../../answer -- ./SKILL.md
 */
import { merge, nodeOf, toUuid } from '@/uuid/matrix'

/** A Step = three atom NAMES (refs). Holds NO logic — DRY by reference. */
export interface Step {
  /** a [[command]] atom — the imperative verb the loop executes (generate | collapse | merge | …). */
  readonly command: string
  /** a [[question]] atom — the yes/no gate the loop asks (aura | balance | vocabulary | entropy | …). */
  readonly question: string
  /** an [[answer]] atom — the computed resolution applied on NO (generate | derive | apply | recover | …). */
  readonly answer: string
}

/** A Workflow = ordered Steps. The free monoid (C×Q×A)*; identity = EMPTY. */
export type Workflow = readonly Step[]
export const EMPTY: Workflow = []

/** Concatenate workflows — ASSOCIATIVE, identity EMPTY (chains compose in any grouping; the sequence). */
export const concatenate = (...ws: Workflow[]): Workflow => ws.reduce<Step[]>((acc, w) => acc.concat(w), [])

/** The matrix uuid of an atom name; a name-content-hashed fallback keeps distinct tokens distinct (RFC 9562 v8). */
const uuidOf = (atom: string): string => nodeOf(atom)?.uuid ?? toUuid(Buffer.from('atom:' + atom, 'utf8'))

/** Step identity = merge of its three atom uuids ⇒ identical triple ⇒ ONE step everywhere ([[merge]]). */
export const stepUuid = (s: Step): string => merge(merge(uuidOf(s.command), uuidOf(s.question)), uuidOf(s.answer))

/** Seed for the run verdict-fold — the concatenator's own content-uuid (so an empty run still has a defined verdict). */
const VERDICT_SEED = toUuid(Buffer.from('workflow:concatenate', 'utf8'))

/** Every distinct atom a workflow references (command ∪ question ∪ answer). */
export const atomsOf = (w: Workflow): string[] => [...new Set(w.flatMap((s) => [s.command, s.question, s.answer]))]

/** Workflow atom-refs that DON'T resolve to a corpus atom — the entropy a grounded workflow must have none of. */
export const unresolvedAtoms = (w: Workflow): string[] => atomsOf(w).filter((a) => nodeOf(a) === undefined)

// ── the runner: command → question → (answer on NO) → re-ask → YES → next. No human. ──

export interface CommandAtom<S> {
  run(state: S): S
}
export interface QuestionAtom<S> {
  ask(state: S): boolean
}
export interface AnswerAtom<S> {
  apply(state: S): S
}

/** NAME → effect. Injected — the pure core stays pure; the real atom effects bind at the boundary. */
export interface Registry<S> {
  readonly command: Readonly<Record<string, CommandAtom<S>>>
  readonly question: Readonly<Record<string, QuestionAtom<S>>>
  readonly answer: Readonly<Record<string, AnswerAtom<S>>>
}

export interface StepResult<S> {
  readonly step: Step
  readonly uuid: string
  /** answer-applications before the question went YES. */
  readonly tries: number
  /** this step's gate reached YES within budget (its fixed point). */
  readonly green: boolean
  readonly state: S
}

/** Run ONE step: command, then (question? : answer ; re-ask) until YES. Terminates: gap↓∈ℕ, bounded by maxTries ([[cost]]). */
export function runStep<S>(s: Step, state: S, r: Registry<S>, maxTries = 1024): StepResult<S> {
  const c = r.command[s.command]
  const q = r.question[s.question]
  const a = r.answer[s.answer]
  if (!c || !q || !a) throw new Error(`workflow: unbound atom in step ${s.command}·${s.question}·${s.answer}`)
  let st = c.run(state)
  let tries = 0
  while (!q.ask(st)) {
    if (tries >= maxTries) return { step: s, uuid: stepUuid(s), tries, green: false, state: st }
    st = a.apply(st)
    tries++
  }
  return { step: s, uuid: stepUuid(s), tries, green: true, state: st }
}

export interface WorkflowRun<S> {
  readonly results: StepResult<S>[]
  readonly state: S
  /** the fixed point W*: every step's gate reached YES (zero entropy). */
  readonly green: boolean
  /** the run's content-identity: the merge-fold of the step uuids over VERDICT_SEED — a tamper-evident receipt (gate's verdict-uuid). */
  readonly verdict: string
}

/** Run the WORKFLOW: fold runStep over the chain in sequence order; state threads through. */
export function runWorkflow<S>(w: Workflow, s0: S, r: Registry<S>, maxTries = 1024): WorkflowRun<S> {
  const results: StepResult<S>[] = []
  let st = s0
  for (const s of w) {
    const res = runStep(s, st, r, maxTries)
    results.push(res)
    st = res.state
    if (!res.green) break // a step that can't reach YES halts the chain (budget exhausted)
  }
  const verdict = results.reduce((acc, res) => merge(acc, res.uuid), VERDICT_SEED)
  return { results, state: st, green: results.length === w.length && results.every((x) => x.green), verdict }
}

// ── the canonical autonomous workflows (DATA — atom refs only; the corpus running itself) ──
export const WORKFLOWS: Readonly<Record<string, Workflow>> = {
  // close the aura — the self-generating corpus closes its own dead links (society step 1).
  'grow-to-whole': [
    { command: 'generate', question: 'aura', answer: 'generate' },
    { command: 'merge', question: 'vocabulary', answer: 'derive' },
    { command: 'collapse', question: 'entropy', answer: 'collapse' },
  ],
  // every plural collection gets its singular model (model⊕collection equilibrium).
  'drive-coverage-to-1': [
    { command: 'balance', question: 'balance', answer: 'generate' },
    { command: 'relocate', question: 'trinity', answer: 'apply' },
    { command: 'migrate', question: 'entropy', answer: 'recover' },
  ],
  // every meaningful word resolves to a path (one harmonized vocabulary).
  'ground-vocabulary': [
    { command: 'derive', question: 'vocabulary', answer: 'generate' },
    { command: 'merge', question: 'aura', answer: 'merge' },
  ],
  // push verify-O(N)/forge-asymmetry to the limit (THE MAIN LAW: zero-entropy ⇒ ∞ tamper-cost).
  'harden-tamper-cost': [
    { command: 'generate', question: 'aura', answer: 'generate' },
    { command: 'balance', question: 'balance', answer: 'generate' },
    { command: 'merge', question: 'vocabulary', answer: 'derive' },
    { command: 'collapse', question: 'entropy', answer: 'collapse' },
    { command: 'reconcile', question: 'proof', answer: 'gate' },
  ],
  // the canonical self-build breath — each fresh agent runs it, commits alone, dies.
  'society-build': [
    { command: 'generate', question: 'aura', answer: 'generate' },
    { command: 'collapse', question: 'trinity', answer: 'collapse' },
    { command: 'breath', question: 'gate', answer: 'gate' },
  ],
  // close every competency gap (required − held) by routing deficits to skillRoutes.
  'train-to-pay': [
    { command: 'train', question: 'balance', answer: 'train' },
    { command: 'decide', question: 'decide', answer: 'decide' },
  ],
  // idempotently pull external records by content-uuid, then match the two sides of a flow.
  'ingest-and-reconcile': [
    { command: 'ingest', question: 'entropy', answer: 'apply' },
    { command: 'reconcile', question: 'proof', answer: 'correction' },
  ],
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('workflow/concatenate — autonomous workflows (command·question·answer):')
  for (const [name, w] of Object.entries(WORKFLOWS)) {
    const unresolved = unresolvedAtoms(w)
    console.log(
      '  ' + name.padEnd(22) + ' ' + w.length + ' steps · ' + atomsOf(w).length + ' atoms · ' + (unresolved.length ? 'UNRESOLVED ' + unresolved.join(',') : 'grounded ✓'),
    )
  }
  const composed = concatenate(WORKFLOWS['grow-to-whole']!, WORKFLOWS['ground-vocabulary']!)
  console.log('  concatenate(grow-to-whole, ground-vocabulary) = ' + composed.length + ' steps; first step-uuid ' + stepUuid(composed[0]!).slice(0, 8))
}
