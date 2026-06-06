import { describe, it, expect } from 'vitest'
import {
  EMPTY,
  concatenate,
  stepUuid,
  atomsOf,
  unresolvedAtoms,
  runStep,
  runWorkflow,
  WORKFLOWS,
  type Step,
  type Workflow,
  type Registry,
} from '@/workflow/concatenate'

const s = (command: string, question: string, answer: string): Step => ({ command, question, answer })

// Test the ALGEBRA (the monoid laws + the fixpoint runner), not consistencies —
// the testing-collapse law. The canonical workflows are checked for groundedness.
describe('workflow/concatenate — the free monoid (C×Q×A)*', () => {
  const A: Workflow = [s('a', 'q', 'x')]
  const B: Workflow = [s('b', 'r', 'y')]
  const C: Workflow = [s('c', 't', 'z')]

  it('concatenate is ASSOCIATIVE — (A++B)++C = A++(B++C)', () => {
    expect(concatenate(concatenate(A, B), C)).toEqual(concatenate(A, concatenate(B, C)))
  })
  it('EMPTY is the identity — EMPTY++A = A++EMPTY = A', () => {
    expect(concatenate(EMPTY, A)).toEqual(A)
    expect(concatenate(A, EMPTY)).toEqual(A)
  })
  it('stepUuid is deterministic; identical triples share one uuid, distinct triples differ (the merge law)', () => {
    expect(stepUuid(s('a', 'q', 'x'))).toBe(stepUuid(s('a', 'q', 'x')))
    expect(stepUuid(s('a', 'q', 'x'))).not.toBe(stepUuid(s('a', 'q', 'y')))
  })
  it('atomsOf is the distinct union of the three roles', () => {
    expect(atomsOf(concatenate(A, B)).sort()).toEqual(['a', 'b', 'q', 'r', 'x', 'y'])
  })
})

// A mock state + registry: the COMMAND raises a gap, the ANSWER lowers it, the QUESTION asks gap≤0.
interface St {
  gap: number
}
const raise = { run: (st: St): St => ({ gap: st.gap + 3 }) }
const noop = { run: (st: St): St => st }
const zero = { ask: (st: St): boolean => st.gap <= 0 }
const lower = { apply: (st: St): St => ({ gap: st.gap - 1 }) }
const stuckLower = { apply: (st: St): St => st }
const registry: Registry<St> = { command: { raise, noop }, question: { zero }, answer: { lower } }

describe('workflow/concatenate — the runner reaches the fixed point with no human', () => {
  it('runStep: command then answer-until-YES (gap↓ terminates the loop)', () => {
    const r = runStep(s('raise', 'zero', 'lower'), { gap: 0 }, registry)
    expect(r.green).toBe(true)
    expect(r.tries).toBe(3) // +3 raised, lowered 3× to 0
    expect(r.state.gap).toBeLessThanOrEqual(0)
  })
  it('runWorkflow: folds steps in sequence; green = every gate YES (W*)', () => {
    const w: Workflow = [s('raise', 'zero', 'lower'), s('raise', 'zero', 'lower')]
    const run = runWorkflow(w, { gap: 0 }, registry)
    expect(run.green).toBe(true)
    expect(run.results).toHaveLength(2)
  })
  it('idempotent at W*: a step already at YES applies no answer (tries 0)', () => {
    const r = runStep(s('noop', 'zero', 'lower'), { gap: 0 }, registry)
    expect(r.tries).toBe(0)
    expect(r.green).toBe(true)
  })
  it('budget guard: an answer that never closes the gap halts (green=false), it does not hang', () => {
    const stuck: Registry<St> = { command: { raise }, question: { zero }, answer: { lower: stuckLower } }
    const r = runStep(s('raise', 'zero', 'lower'), { gap: 0 }, stuck, 8)
    expect(r.green).toBe(false)
    expect(r.tries).toBe(8)
  })
  it('an unbound atom throws (the step references a non-registered effect)', () => {
    expect(() => runStep(s('missing', 'zero', 'lower'), { gap: 0 }, registry)).toThrow(/unbound atom/)
  })
  it('the run folds a deterministic verdict-uuid receipt (same workflow ⇒ same verdict)', () => {
    const w: Workflow = [s('raise', 'zero', 'lower'), s('noop', 'zero', 'lower')]
    const a = runWorkflow(w, { gap: 0 }, registry)
    const b = runWorkflow(w, { gap: 0 }, registry)
    expect(a.verdict).toBe(b.verdict)
    expect(a.verdict).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/) // a uuid receipt
  })
})

describe('workflow/concatenate — the canonical workflows are GROUNDED (zero entropy)', () => {
  it('every atom referenced by every WORKFLOW resolves to a corpus atom', () => {
    for (const [name, w] of Object.entries(WORKFLOWS)) {
      expect({ name, unresolved: unresolvedAtoms(w) }).toEqual({ name, unresolved: [] })
    }
  })
  it('there are canonical workflows and each is a non-empty chain of triples', () => {
    const names = Object.keys(WORKFLOWS)
    expect(names.length).toBeGreaterThanOrEqual(5)
    for (const w of Object.values(WORKFLOWS)) {
      expect(w.length).toBeGreaterThan(0)
      for (const step of w) expect([step.command, step.question, step.answer].every((x) => x.length > 0)).toBe(true)
    }
  })
})
