/**
 * token-ledger — account EVERY token spent between agents, so the app ledger is complete.
 *
 * Inter-agent token spend (the workflows' tens of millions; every agent↔agent call) is a real
 * value flow — the [[allocation]] unit (value = anchor × tokens). Metered per-call as a
 * `usage-records` row (the document side, IFRS-15 §B16 — see the Invoices model); THIS is the
 * matching ledger ENTRY side (the document↔entry dual — [[transaction]]). Each spend books a
 * balanced double-entry via the canonical `StandardTransactions.createBillReceived`: DEBIT
 * AI-compute expense, CREDIT the agent-resource pool (a liability — the conserved pot the
 * society draws on, a bill incurred on account). Balanced by construction, so Σ debit = Σ
 * credit = Σ priced tokens: the conservation invariant ([[balance]]) — no unaccounted token,
 * the ledger closes.
 *
 * Pure: builds entries; the caller posts them (and the usage-records row) through Payload.
 *
 * @accounting IFRS IAS-1 + IFRS-15 §B16 metered usage
 * @audit ISO-19011 double-entry-invariant (debits = credits)
 */
import { ANCHOR } from '@/allocation'
import { StandardTransactions, type ValidatedEntry } from './debit-credit'

/** One inter-agent token spend — the unit the ledger accounts for. */
export interface TokenSpend {
  /** the agent that spent (content-uuid or id). */
  readonly agent: string
  /** tokens consumed (prompt + completion). */
  readonly tokens: number
  /** optional counterpart / feature / model the spend was for. */
  readonly kind?: string
}

/** GL accounts the spend posts to (the tenant chart-of-accounts maps these; semantic codes here). */
export const AI_COMPUTE_EXPENSE = '6900-ai-compute'
export const AGENT_RESOURCE_POOL = '2900-agent-resource-pool'

/** Price a token spend in cents at the harmonic anchor (allocation: value = anchor × tokens). */
export function priceTokens(tokens: number, anchor: number = ANCHOR): number {
  return Math.round(Math.max(0, tokens) * anchor)
}

/**
 * Book ONE token spend as a balanced double-entry: debit AI-compute expense, credit the
 * agent-resource pool (a bill received for compute consumed on account). Throws if unbalanced
 * (it never is — the builder enforces the invariant).
 */
export function tokenEntry(spend: TokenSpend, anchor: number = ANCHOR): ValidatedEntry {
  return StandardTransactions.createBillReceived(AI_COMPUTE_EXPENSE, AGENT_RESOURCE_POOL, priceTokens(spend.tokens, anchor))
}

/** The complete token ledger over a set of spends. */
export interface TokenLedger {
  readonly entries: ValidatedEntry[]
  readonly totalTokens: number
  readonly totalValueCents: number
  /** every entry balanced AND Σ debit = Σ credit — the ledger closes (conservation). */
  readonly balanced: boolean
}

/**
 * Account EVERY token spend — the complete ledger. `balanced` is true iff no token went
 * unaccounted (Σ debit = Σ credit = Σ priced tokens): the app ledger closes.
 */
export function tokenLedger(spends: readonly TokenSpend[], anchor: number = ANCHOR): TokenLedger {
  const entries = spends.map((s) => tokenEntry(s, anchor))
  const totalTokens = spends.reduce((sum, s) => sum + Math.max(0, s.tokens), 0)
  const sumDebits = entries.reduce((sum, e) => sum + e.totalDebits, 0)
  const sumCredits = entries.reduce((sum, e) => sum + e.totalCredits, 0)
  return {
    entries,
    totalTokens,
    totalValueCents: sumDebits,
    balanced: entries.every((e) => e.balanced) && sumDebits === sumCredits,
  }
}
