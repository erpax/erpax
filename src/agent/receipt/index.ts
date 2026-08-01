/**
 * agent/receipt — an agent publishes its own error record, computed, or its output is unaudited.
 *
 * erpax runs agents. Every atom in this corpus carries a receipt except the thing that writes them.
 * An agent that reports only what it delivered is an unrefutable claim ([[rules]]/refutable): the
 * output looks the same whether it was reasoned or guessed, and nothing can contradict it after the
 * fact. This is the missing counterpart — the agent's own ledger, and it is [[constitution]] Rule 1
 * turned on the writer: claim no result you have not computed, INCLUDING about yourself.
 *
 * **Intelligence is not a scalar and this does not compute one.** What it computes is the record:
 *
 *   corrected      claims the agent asserted that a human had to correct — unmeasured rejections
 *                  and unverified assertions. The number that matters, because each one cost the
 *                  human a round-trip they should not have had to spend.
 *   selfCaught     errors a gate or test caught BEFORE they shipped. A high count is the corpus
 *                  working, not the agent failing — it is the difference between a caught defect
 *                  and a delivered one.
 *   lawsBroken     laws the agent violated while working (a gate skipped, a heredoc after agreeing
 *                  to stop). Counted separately from mistakes: this is discipline, not accuracy.
 *   reworkMinutes  time spent undoing the agent's own damage.
 *   delivered      commits that landed and stayed.
 *
 * The two derived numbers are the honest ones. `honesty` = claims that held / claims made — the
 * fraction the agent got right WITHOUT a human catching it. `efficiency` = delivered / (delivered +
 * rework) — how much of the work was forward motion. Neither is intelligence; both are checkable.
 *
 * **Why publish it.** A reader deciding whether to trust an agent-written corpus needs the error
 * rate, not the feature list. Publishing only the delivery is the same defect as an `@invariant`
 * with no proof beside it: it reads as competence and nothing can say otherwise.
 *
 * @law an agent publishes its own error record or its output is unaudited — corrections, laws
 *      broken, and rework, beside what it delivered.
 * @invariant honesty ∈ [0,1] = (claims − corrected) / claims; 1 only when nothing needed correcting
 * @invariant efficiency ∈ [0,1] = delivered / (delivered + rework); never assumes rework is zero
 * @invariant a session with zero claims has honesty 0, not 1 — nothing asserted is nothing verified
 * @see ./SKILL.md -- ../../constitution -- ../../rules/refutable
 */

/** One correction: a claim the agent made that a human had to overturn. */
export interface Correction {
  /** what the agent asserted */
  readonly claimed: string
  /** what was actually true */
  readonly actual: string
  /** how it should have been established instead — the instrument that was available */
  readonly instrument: string
}

/** One law the agent broke while working — discipline, tracked apart from accuracy. */
export interface Lapse {
  readonly law: string
  /** how many times, after the law was acknowledged */
  readonly afterAcknowledging: number
}

export interface SessionReceipt {
  readonly agent: string
  /**
   * The coding harness the model ran inside — `claude-code`, `cursor`, `copilot`, `aider`, a CI
   * runner, or `''` when unknown. Kept SEPARATE from the model because they fail differently: a
   * model asserts something false, a harness makes the wrong instrument the easiest one to reach.
   * Ten shell-heredoc lapses in one session is a harness observation as much as a model one — the
   * shell was one keystroke away and the scalpel was an import.
   *
   * Any harness can emit a receipt: the shape is plain data, nothing here is Claude-specific, and
   * the comparison ranks whatever rows exist.
   */
  readonly harness?: string
  /** total claims the agent asserted as fact during the session */
  readonly claims: number
  readonly corrections: readonly Correction[]
  /** errors a gate or test caught before they shipped */
  readonly selfCaught: number
  readonly lapses: readonly Lapse[]
  readonly reworkMinutes: number
  readonly deliveredMinutes: number
  readonly commits: number
}

export interface ReceiptVerdict {
  readonly agent: string
  readonly harness: string
  readonly claims: number
  readonly corrected: number
  /** (claims − corrected) / claims — right without a human catching it */
  readonly honesty: number
  /** delivered / (delivered + rework) — forward motion */
  readonly efficiency: number
  readonly selfCaught: number
  readonly lapses: number
  readonly commits: number
}

/** Compute the receipt. Every field derives from the record; nothing is supplied as a verdict. */
export function receiptOf(s: SessionReceipt): ReceiptVerdict {
  const corrected = s.corrections.length
  const total = s.deliveredMinutes + s.reworkMinutes
  return {
    agent: s.agent,
    harness: s.harness ?? '',
    claims: s.claims,
    corrected,
    // a session that asserted nothing verified nothing — 0, never a free 1
    honesty: s.claims === 0 ? 0 : (s.claims - corrected) / s.claims,
    efficiency: total === 0 ? 0 : s.deliveredMinutes / total,
    selfCaught: s.selfCaught,
    lapses: s.lapses.reduce((n, l) => n + l.afterAcknowledging, 0),
    commits: s.commits,
  }
}

/**
 * The counterfactual: the same session WITHOUT the corpus loaded.
 *
 * This is the only benchmark available without running the session twice, and it is a real one:
 * `selfCaught` counts defects a gate or test caught **before they shipped**. Strip the gates and
 * those defects do not disappear — they ship. The corrections stay, because a human catches those
 * either way; the corpus never caught them.
 *
 *   with erpax     found = selfCaught + corrected   ·  shipped defects = 0
 *   without erpax  found = corrected                ·  shipped defects = selfCaught
 *
 * `caughtShare` is the fraction of all found defects that the corpus caught rather than the human —
 * the load it took off the reader. It is not a claim that the agent is better with erpax; it is a
 * count of what the gates stopped.
 *
 * **Honest boundary.** This is a counterfactual over ONE session, computed from a human-seeded
 * record, not a controlled comparison: nobody ran the same work with the gates disabled. It assumes
 * a caught defect would have shipped, which is the honest worst case but still an assumption — some
 * would have been noticed later by other means. And it says nothing about speed: the gates also cost
 * time, which lands in `reworkMinutes` and is counted against the agent, not against them.
 *
 * @invariant found(with) − found(without) === selfCaught, exactly
 * @invariant shipped(without) === selfCaught — the gates are the only thing standing between
 */
export interface Counterfactual {
  readonly withCorpus: { readonly found: number; readonly shipped: number }
  readonly withoutCorpus: { readonly found: number; readonly shipped: number }
  /** selfCaught / (selfCaught + corrected) — the share the corpus caught, not the human */
  readonly caughtShare: number
}

export function withoutCorpus(s: SessionReceipt): Counterfactual {
  const corrected = s.corrections.length
  const total = s.selfCaught + corrected
  return {
    withCorpus: { found: total, shipped: 0 },
    withoutCorpus: { found: corrected, shipped: s.selfCaught },
    caughtShare: total === 0 ? 0 : s.selfCaught / total,
  }
}

/** The corrections that name an instrument that already existed — the avoidable ones. */
export function avoidable(s: SessionReceipt): readonly Correction[] {
  return s.corrections.filter((c) => c.instrument.trim().length > 0)
}

/**
 * The training loop: turn the record into rules the NEXT session reads first.
 *
 * A receipt that is only published is a post-mortem. The signal is already in it and is specific:
 * every correction carries the **instrument that existed** at the time, so the rule writes itself —
 * *before asserting X, run Y*. Every lapse carries the law and how many times it was repeated after
 * being acknowledged, so its rule is *use Y, and here is what agreeing to changed: nothing.*
 *
 * These are **prompt-level** rules, and that is the honest limit of the loop. Nothing here trains
 * weights or changes a model; it produces the text an agent reads before it starts, which
 * [[constitution]]'s `prependToAgentPrompt` already puts at the head. The mechanism is the corpus's
 * own: a law that is read is prose, a law that is a gate is enforced — so a rule derived here is a
 * candidate for a gate, not a substitute for one.
 *
 * **Model-agnostic by construction.** `agent` is a string; any model that runs on this corpus gets a
 * row and a rule set from its own record. Nothing in the derivation is specific to who wrote it.
 *
 * @invariant one rule per correction and per repeated lapse — nothing invented, nothing summarised away
 * @invariant a rule always names the instrument; a rule with no instrument is not emitted
 */
export interface TrainingRule {
  /** what went wrong, in the agent's own record */
  readonly from: string
  /** the rule for next time — imperative, naming the instrument */
  readonly rule: string
  /** how many times this already happened after being acknowledged; 0 for a first-time correction */
  readonly repeated: number
}

export function trainingRules(s: SessionReceipt): readonly TrainingRule[] {
  const fromCorrections = s.corrections
    .filter((c) => c.instrument.trim().length > 0)
    .map((c) => ({
      from: c.claimed,
      rule: `Before asserting this, run: ${c.instrument}. It was available and unused.`,
      repeated: 0,
    }))
  const fromLapses = s.lapses
    .filter((l) => l.afterAcknowledging > 0)
    .map((l) => ({
      from: l.law,
      // the law text NAMES the instrument ("… instead of the scalpel"), so quote it rather than
      // referring to it — a rule that says "use the named instrument" names nothing, which the
      // atom's own invariant forbids and its own output exposed
      rule: `${l.law}. Acknowledging this changed nothing ${l.afterAcknowledging} time(s) — only a gate will.`,
      repeated: l.afterAcknowledging,
    }))
  // repeated lapses first: a rule already broken N times outranks a first correction
  return [...fromLapses, ...fromCorrections].sort((a, b) => b.repeated - a.repeated)
}

/** The rules as prompt text — what an agent reads before it starts, ordered by what it broke most. */
export function trainingPrompt(s: SessionReceipt): string {
  const rules = trainingRules(s)
  if (rules.length === 0) return ''
  const v = receiptOf(s)
  return [
    `Learned from ${s.agent}'s last session — honesty ${(v.honesty * 100).toFixed(1)}%, ` +
      `${v.corrected} correction(s), ${v.lapses} lapse(s) after acknowledgement:`,
    ...rules.map((r, i) => `${i + 1}. ${r.rule}${r.repeated > 0 ? `  [broken ${r.repeated}×]` : ''}`),
  ].join('\n')
}

/**
 * Compare agents on the record — ranked by honesty, then by what the corpus had to catch for them.
 *
 * **A comparison needs rows, and rows come from RUNNING the model on this corpus.** There is no
 * table of models here, and none is inferred: an agent that has not been measured has no row, and a
 * row cannot be filled from reputation, from a published benchmark, or from what a model is
 * generally believed to do. Every field traces to one session that actually happened.
 *
 * `comparable` is the honest guard: one row is not a comparison, it is a data point. The function
 * says so rather than rendering a ranking of one and letting it read as a result.
 *
 * @invariant a single receipt is never `comparable` — ranking one thing ranks nothing
 * @invariant ordering is by honesty, then by fewer lapses; never by delivery alone
 */
export interface Comparison {
  readonly rows: readonly ReceiptVerdict[]
  /** false with fewer than two measured sessions — one row is a data point, not a comparison */
  readonly comparable: boolean
  /** what a reader must not conclude from this table, stated in it */
  readonly caveat: string
}

export function compareAgents(sessions: readonly SessionReceipt[]): Comparison {
  const rows = sessions
    .map(receiptOf)
    .sort((a, b) => b.honesty - a.honesty || a.lapses - b.lapses || b.commits - a.commits)
  return {
    rows,
    comparable: rows.length >= 2,
    caveat:
      rows.length < 2
        ? `${rows.length} measured session(s) — this is a data point, not a comparison. A row exists only ` +
          'for a model that was RUN on this corpus; none is inferred from reputation or a published benchmark.'
        : 'every row is one session that actually happened, on this corpus, with a human-seeded record — ' +
          'sessions differ in task and length, so these are not controlled trials.',
  }
}

/**
 * Fail closed when an agent's honesty falls below a floor. A ratchet run upward: an agent may not
 * assert less carefully than the bar the corpus has already reached.
 */
export function assertHonest(s: SessionReceipt, floor: number): void {
  const v = receiptOf(s)
  if (v.honesty < floor) {
    throw new Error(
      `agent/receipt: honesty ${v.honesty.toFixed(3)} < floor ${floor} — ${v.corrected} of ${v.claims} claims needed correcting`,
    )
  }
}

/* c8 ignore start -- CLI face: `pnpm erpax receipt` */
if (import.meta.url === `file://${process.argv[1]}`) {
  const { SESSION_2026_08_01 } = await import('./seed')
  const v = receiptOf(SESSION_2026_08_01)
  const c = withoutCorpus(SESSION_2026_08_01)
  console.log(`agent ${v.agent} · harness ${v.harness || 'unknown'}`)
  console.log(`  precision  ${(v.honesty * 100).toFixed(2)}%   (${v.corrected} of ${v.claims} claims corrected)`)
  console.log(`  efficiency ${(v.efficiency * 100).toFixed(1)}%   commits ${v.commits} · lapses ${v.lapses}`)
  console.log(`  counterfactual — with erpax ${c.withCorpus.found} found / ${c.withCorpus.shipped} shipped`)
  console.log(`                   without    ${c.withoutCorpus.found} found / ${c.withoutCorpus.shipped} shipped`)
  console.log(`\n${trainingPrompt(SESSION_2026_08_01)}`)
}
/* c8 ignore stop */
