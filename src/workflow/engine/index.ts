/**
 * workflow-engine — makes the unified state machine LIVE, and self-audits it.
 *
 * The keystone gap closed: a `WorkflowDefinitions.stateMachine` is inert data
 * until something reads it. This pure engine (a) gates a document transition
 * against the machine, returning the next state + emitted content-uuid event,
 * and (b) AUDITS the machine's harmony — dead-ends and unreachable states are
 * exactly the "disconnected organ" gaps. The same code that runs the organism
 * detects where it is incomplete. Pure (no I/O) → testable; a collection
 * beforeStatusChange hook consumes `attemptTransition`, an afterChange hook
 * emits `result.emits`.
 *
 * @standard OMG BPMN 2.0 process-execution-semantics
 */

export interface SMState {
  key: string
  collection?: string
  label?: string
  terminal?: boolean
}
export interface SMTransition {
  from: string
  to: string
  on: string
  guard?: string
  emits?: string
  crossDomain?: boolean
}
export interface StateMachine {
  states: SMState[]
  transitions: SMTransition[]
  events?: string[]
}

export interface TransitionResult {
  allowed: boolean
  toState?: string
  emits?: string
  crossDomain?: boolean
  reason?: string
}

/** Gate a transition: is there an edge from `fromState` firing on `event`? */
export function attemptTransition(sm: StateMachine, fromState: string, event: string): TransitionResult {
  const t = sm.transitions.find((x) => x.from === fromState && x.on === event)
  if (t) {
    const targetState = sm.states.find((x) => x.key === t.to)
    if (!targetState) return { allowed: false, reason: `target state '${t.to}' does not exist` }
    return { allowed: true, toState: t.to, emits: t.emits || undefined, crossDomain: t.crossDomain }
  }
  const s = sm.states.find((x) => x.key === fromState)
  if (!s) return { allowed: false, reason: `unknown state '${fromState}'` }
  if (s.terminal) return { allowed: false, reason: `state '${fromState}' is terminal` }
  return { allowed: false, reason: `no transition from '${fromState}' on '${event}'` }
}

/** Outgoing edges from a state. */
export function outgoing(sm: StateMachine, fromState: string): SMTransition[] {
  return sm.transitions.filter((t) => t.from === fromState)
}

/** Harmony audit — non-terminal states with NO outgoing edge (stuck organs). */
export function deadEnds(sm: StateMachine): string[] {
  return sm.states
    .filter((s) => !s.terminal && !sm.transitions.some((t) => t.from === s.key))
    .map((s) => s.key)
}

/** Harmony audit — states with NO inbound edge (only valid for declared entry points). */
export function noInbound(sm: StateMachine): string[] {
  return sm.states.filter((s) => !sm.transitions.some((t) => t.to === s.key)).map((s) => s.key)
}

/** The content-uuid events emitted along every edge — the synchronisation surface. */
export function emittedEvents(sm: StateMachine): string[] {
  return [...new Set(sm.transitions.map((t) => t.emits).filter((e): e is string => Boolean(e)))]
}

/** Cross-domain (federating) edges — where one domain's event drives another. */
export function crossDomainEdges(sm: StateMachine): SMTransition[] {
  return sm.transitions.filter((t) => t.crossDomain)
}
