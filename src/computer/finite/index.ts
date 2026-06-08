/**
 * computer/finite — finite-state automata; seal/computed proof as an accepting FSM.
 *
 * Links vocabulary @/finite to executable automata theory: states, transitions,
 * and acceptance — the same pattern guardians use (checking → sealed).
 *
 * @see @/seal — @/proof — ../processor
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export type FsmState = string

export interface FsmTransition {
  readonly from: FsmState
  readonly on: string
  readonly to: FsmState
}

export interface FiniteAutomaton {
  readonly initial: FsmState
  readonly accepting: ReadonlySet<FsmState>
  readonly transitions: readonly FsmTransition[]
}

/** Step one symbol through the automaton; undefined if no transition. */
export function step(aut: FiniteAutomaton, state: FsmState, symbol: string): FsmState | undefined {
  return aut.transitions.find((t) => t.from === state && t.on === symbol)?.to
}

/** True when the input sequence ends in an accepting state. */
export function accepts(aut: FiniteAutomaton, input: readonly string[]): boolean {
  let cur = aut.initial
  for (const sym of input) {
    const next = step(aut, cur, sym)
    if (next === undefined) return false
    cur = next
  }
  return aut.accepting.has(cur)
}

/** Guardian-shaped FSM: unsealed → checking → sealed | rejected. */
export const SEAL_CHECK_FSM: FiniteAutomaton = {
  initial: 'unsealed',
  accepting: new Set(['sealed']),
  transitions: [
    { from: 'unsealed', on: 'check', to: 'checking' },
    { from: 'checking', on: 'pass', to: 'sealed' },
    { from: 'checking', on: 'fail', to: 'rejected' },
    { from: 'sealed', on: 'tamper', to: 'unsealed' },
  ],
}

export function recordComputerFiniteOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/finite', { kind: 'computer.finite.step', payload }, at, prevEntryUuid, seq)
}
