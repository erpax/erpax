/**
 * publish — the local agent that automates commit and push, trained in quantum security and the standards.
 *
 * [[decide]] computes WHETHER a commit/push is warranted and NAMES who decides; it deliberately stops at the
 * boundary ("pulling the trigger is not this atom's"). This atom is the trigger — but a TRAINED one. It does
 * not push because an operator said so; it pushes because the gates it is trained on all said yes, and it
 * refuses the moment one says no. The training is literal: the agent's push authority is the conjunction of
 *
 *   - the WRITE-TIME SEAL      ([[confirm]]: trinity · dead-links/refs · import purity)  — decides the commit
 *   - QUANTUM SECURITY         ([[tamper]] · [[quantum]] · [[security]]: tamper-cost, no leak) — a push lane
 *   - THE STANDARDS            ([[standards]]: compliance green)                            — a push lane
 *   - the app LOADS            ([[gate]] lane zero)                                          — a push lane
 *
 * Fail-closed, inherited from [[decide]]/[[guardian]]: a lane that did not run, or did not literally pass, is
 * NOT a yes. An untrained agent (no security or standards lane supplied) cannot push — there is nothing to be
 * trained on, so the decision denies. Every act emits a tamper-evident RECEIPT ([[merge]].chainLeaf, uuid-
 * chained to the prior), so the automation is auditable: what was pushed, on whose authority, in what order.
 *
 * Honest boundary: the agent EXECUTES the decision; it never WEAKENS the gate. The verdicts must be REAL —
 * produced by actually running the security and standards gates (CI / the caller), never asserted green. The
 * git side effects are injected (`GitRunner`), so the decision logic is provable hermetically and the one place
 * that touches the remote is explicit and swappable. This automates the push; it does not automate trust.
 *
 * Composes [[decide]] · [[confirm]] · [[tamper]] · [[standards]] · [[merge]] · [[guardian]] · [[law]].
 */
import { commitDecision, pushDecision, type GateVerdict, type GitDecision } from '@/decide'
import { chainLeaf } from '@/merge'

/** The one place that touches git — injected, so the decision is provable without a real repo. */
export interface GitRunner {
  add(paths: readonly string[]): void
  /** Commit the staged paths; returns the new commit sha. */
  commit(message: string): string
  push(): void
}

/** What the agent did, and on whose authority — a tamper-evident audit leaf. */
export interface PublishReceipt {
  /** the furthest the agent got: `refused` (nothing committed), `committed` (push blocked), `pushed` (both). */
  readonly outcome: 'refused' | 'committed' | 'pushed'
  readonly commit: GitDecision
  readonly push: GitDecision
  /** the commit sha, when one was made. */
  readonly sha?: string
  /** uuid-chained receipt — folds this act against the prior, so the automation's history cannot be re-ordered. */
  readonly leaf: string
}

/** The trained agent's brief: what to publish, and the verdicts it is trained on. */
export interface PublishOrder {
  readonly paths: readonly string[]
  readonly message: string
  /** the write-time seal verdicts ([[confirm]]) — these decide the commit. */
  readonly commitVerdicts: readonly GateVerdict[]
  /** quantum-security verdicts ([[tamper]] · [[quantum]]) — a push lane the agent is trained on. */
  readonly securityLanes: readonly GateVerdict[]
  /** standards verdicts ([[standards]]) — a push lane the agent is trained on. */
  readonly standardsLanes: readonly GateVerdict[]
  /** the prior receipt leaf, to chain this act onto (tamper-evident order). */
  readonly priorLeaf?: string
}

/**
 * Publish — commit then push, each performed ONLY if its computed decision is warranted, and refused with the
 * blocking axis named otherwise. A trained agent: it cannot push without security AND standards lanes, and it
 * cannot push what it could not commit ([[decide]]: push ⊇ commit).
 *
 * @invariant nothing is committed unless the commit decision is warranted — fail-closed
 * @invariant nothing is pushed unless the push decision is warranted — and push ⊇ commit
 * @invariant an agent with no security or standards lane CANNOT push — there is nothing to be trained on
 */
export function publish(order: PublishOrder, git: GitRunner): PublishReceipt {
  // Training is a PRECONDITION, not just extra lanes: an agent with no security lane, or no standards lane, has
  // nothing to be trained on, so it may not push — even a perfectly clean commit. These fail-closed verdicts
  // make "trained in quantum security AND the standards" a literal gate, named when it blocks.
  const trained: GateVerdict[] = [
    { gate: 'trained:security', pass: order.securityLanes.length > 0, detail: 'no quantum-security lane to be trained on' },
    { gate: 'trained:standards', pass: order.standardsLanes.length > 0, detail: 'no standards lane to be trained on' },
  ]
  const trainingLanes = [...trained, ...order.securityLanes, ...order.standardsLanes]
  const commit = commitDecision(order.commitVerdicts)
  const push = pushDecision(order.commitVerdicts, trainingLanes)

  let outcome: PublishReceipt['outcome'] = 'refused'
  let sha: string | undefined
  if (commit.warranted) {
    git.add(order.paths)
    sha = git.commit(order.message)
    outcome = 'committed'
    if (push.warranted) {
      git.push()
      outcome = 'pushed'
    }
  }

  const leaf = chainLeaf(
    { outcome, sha: sha ?? null, commitBy: commit.by, pushBy: push.by, blockers: [...commit.blockers, ...push.blockers] },
    order.priorLeaf ?? '',
  )
  return { outcome, commit, push, sha, leaf }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const noop: GitRunner = { add: () => {}, commit: () => 'sha-dry', push: () => {} }
  const green: GateVerdict[] = [{ gate: 'trinity', pass: true }, { gate: 'dead-links', pass: true }]
  const security: GateVerdict[] = [{ gate: 'tamper-cost', pass: true }, { gate: 'quantum-leak', pass: true }]
  const standards: GateVerdict[] = [{ gate: 'standards', pass: true }, { gate: 'load', pass: true }]
  console.log('publish — the trained agent automates commit and push, fail-closed:\n')
  const ok = publish({ paths: ['src/x'], message: 'demo', commitVerdicts: green, securityLanes: security, standardsLanes: standards }, noop)
  console.log(`  fully green      → ${ok.outcome}  (push by ${ok.push.by})`)
  const untrained = publish({ paths: ['src/x'], message: 'demo', commitVerdicts: green, securityLanes: [], standardsLanes: [] }, noop)
  console.log(`  untrained (no security/standards lane) → ${untrained.outcome}  — cannot push without training`)
  const dirty = publish({ paths: ['src/x'], message: 'demo', commitVerdicts: [{ gate: 'trinity', pass: false }], securityLanes: security, standardsLanes: standards }, noop)
  console.log(`  commit blocked   → ${dirty.outcome}  (${dirty.commit.by} said no)`)
  console.log('\n  the agent pushes because the gates said yes — never because it was told to.')
}
