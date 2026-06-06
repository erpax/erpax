/**
 * quantum/research — research priced. Research is not free: a run consumes resources (the scouts
 * dispatched × the tokens they burn — the real spend a [[workflow]] usage reports) and produces
 * value (the [[entropy]] it reduces — gaps found and closed). So research is a billable [[expense]],
 * booked double-entry ([[entry]]): it DEBITS the resources it consumed and CREDITS the disorder it
 * closed. Its WORTH is the net — worthwhile only when it reduces more entropy than it costs. Merges
 * into [[research]] (the quantum/resource facet — research as a measured, billable cost).
 *
 * HONEST: agents × tokens is the real resource cost; entropy-reduced is the measured value; both are
 * supplied per run and the ledger balances ([[balance]]) — the worth (value − cost) is the judgment.
 *
 *   tsx src/quantum/research/index.ts
 *
 * @audit cost = agents × tokens (the run's real spend); value = entropy reduced; the ledger balances
 * @see ../../research -- ../../expense -- ../../entry -- ../../cost -- ./SKILL.md
 */
import type { Entry } from '@/entry'
import { toDoubleEntry, consolidate, net } from '@/entry'

/** One research run — what it consumed and what disorder it closed. */
export interface ResearchRun {
  readonly agent: string
  readonly agents: number // scouts/subagents dispatched
  readonly tokens: number // tokens each consumed (the resource)
  readonly entropyReduced: number // disorder closed by the findings (the value)
}

/** The resource COST of a run — agents × tokens (the real spend). */
export const researchCost = (run: ResearchRun): number => run.agents * run.tokens

/** Research billed as a double-entry EXPENSE — the agent pays the research fund for what it consumed. */
export const researchExpense = (run: ResearchRun): Entry =>
  toDoubleEntry({ payer: run.agent, payee: 'research-fund', amount: researchCost(run) })

/** The VALUE of a run — entropy reduced, credited to the agent (knowledge created, disorder closed). */
export const researchValue = (run: ResearchRun, rate: number): Entry =>
  toDoubleEntry({ payer: 'entropy-fund', payee: run.agent, amount: run.entropyReduced * rate })

/**
 * The research ledger: the expense ⊕ the value, consolidated into one balanced double-entry. The
 * `worth` is value − cost (the agent's net position); worthwhile only when the run pays for itself.
 */
export function researchLedger(run: ResearchRun, rate: number): { entry: Entry; worth: number; worthwhile: boolean } {
  const entry = consolidate([researchExpense(run), researchValue(run, rate)])
  const worth = run.entropyReduced * rate - researchCost(run)
  return { entry, worth, worthwhile: worth >= 0 }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  // a worthwhile run (closed a lot of disorder) and a wasteful one (burned tokens, found little)
  const good: ResearchRun = { agent: 'agent:scouts', agents: 5, tokens: 1000, entropyReduced: 8000 }
  const waste: ResearchRun = { agent: 'agent:idle', agents: 9, tokens: 1000, entropyReduced: 10 }
  console.log('quantum/research — research is a billable expense; worth = entropy reduced − cost:')
  for (const r of [good, waste]) {
    const l = researchLedger(r, 1)
    console.log('  ' + r.agent + ': cost ' + researchCost(r) + ' · value ' + r.entropyReduced + ' · worth ' + l.worth + ' · worthwhile=' + l.worthwhile + ' · ledger balances(net=' + net(l.entry) + ')')
  }
}
