/**
 * trading/quantum — quantum realtime trading across economic surfaces.
 *
 * A trade quote exists in superposition (weighted outcomes) until measurement
 * collapses it to a sealed content-uuid trade. The collapsed trade is emitted on
 * the secure team/comms wave envelope (tenant + receipt + correlation), appended
 * to the realtime log, and settled via a balanced double-entry posting whose
 * conservation is verified at collapse.
 *
 * Integration path only — not a full ERP trading desk.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard RFC 9562 §5.8 content-uuid trade identity
 * @see ../index.ts · ../../quantum · ../../team/comms · ../../realtime · ./SKILL.md
 */
import { computeContentUuid, jcsCanonicalize, uuid } from '@/integrity'
import { doubleTorusCostLog2 } from '@/quantum'
import { toDoubleEntry, isBalanced, type Entry } from '@/entry'
import { conserves, trialBalance } from '@/conservation'
import { manualDevelopmentPrice } from '@/cost'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
  type TeamCommsEmit,
  type WaveInSecureCommsResult,
} from '@/team/comms'
import { append } from '@/realtime'

export { SECURE_WAVE_PAYLOAD_KEY } from '@/team/comms'

/** One trading outcome in superposition — keyed as `side:price` (e.g. `buy:1.085`). */
export type TradeOutcomeKey = `${'buy' | 'sell'}:${number}`

/** A quote in superposition — multiple side/price outcomes until collapse. */
export interface QuantumTradeQuote {
  readonly tenantId: string
  readonly instrument: string
  readonly notional: number
  readonly currency: string
  readonly amplitudes: Partial<Record<TradeOutcomeKey | string, number>>
}

/** A collapsed, sealed trade — definite side and price with content-uuid identity. */
export interface CollapsedTrade {
  readonly tradeUuid: string
  readonly tenantId: string
  readonly instrument: string
  readonly side: 'buy' | 'sell'
  readonly price: number
  readonly notional: number
  readonly currency: string
  readonly collapsedAt: string
}

/** Realtime log event for a collapsed trade emit. */
export interface TradeRealtimeEvent {
  readonly tradeUuid: string
  readonly event: string
  readonly emit: TeamCommsEmit
  readonly verdictOk: boolean
}

/** Payment settlement stub — double-entry + conservation check at collapse. */
export interface TradeSettlementResult {
  readonly entry: Entry
  readonly conserves: boolean
  readonly trialBalance: number
  readonly tamperCostLog2: number
  readonly developmentForgeImpossible: boolean
}

export interface QuantumTradeCollapseResult {
  readonly trade: CollapsedTrade
  readonly settlement: TradeSettlementResult
  readonly superpositionTotal: number
}

export interface EmitTradeRealtimeOpts {
  readonly trade: CollapsedTrade
  readonly envelope: SecureWaveEnvelope
  readonly scopeTenantId: string
  readonly agent: string
  readonly sessionId: string
  readonly receipt?: {
    readonly actor: string
    readonly head: { leafUuid: string; seq: number } | null
    readonly timestampIso: string
  }
}

export interface EmitTradeRealtimeResult extends WaveInSecureCommsResult {
  readonly tradeEvent: TradeRealtimeEvent
}

/** Normalise quote amplitudes so Σ|c|² = 1 (Born rule on trade outcomes). */
export function normaliseQuoteAmplitudes(
  raw: Partial<Record<string, number>>,
): Record<string, number> {
  const amp: Record<string, number> = {}
  for (const [k, v] of Object.entries(raw)) {
    if (Number.isFinite(v) && v !== 0) amp[k] = v!
  }
  const norm = Math.sqrt(Object.values(amp).reduce((s, a) => s + a * a, 0))
  if (norm === 0) {
    throw new Error('quantumTradeQuote: zero superposition — provide at least one non-zero amplitude')
  }
  for (const k of Object.keys(amp)) amp[k] = amp[k]! / norm
  return amp
}

/** Total probability on the quote superposition — 1 when normalised. */
export function quoteSuperpositionTotal(raw: Partial<Record<string, number>>): number {
  const amp = normaliseQuoteAmplitudes(raw)
  return Object.values(amp).reduce((s, a) => s + a * a, 0)
}

function parseOutcomeKey(key: string): { side: 'buy' | 'sell'; price: number } {
  const [side, priceStr] = key.split(':')
  if (side !== 'buy' && side !== 'sell') {
    throw new Error(`quantumTradeCollapse: invalid outcome key ${key}`)
  }
  const price = Number(priceStr)
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(`quantumTradeCollapse: invalid price in key ${key}`)
  }
  return { side, price }
}

/** Measure the quote at r ∈ [0,1) — cumulative-probability collapse to one outcome. */
export function measureQuote(
  quote: QuantumTradeQuote,
  r: number,
): { side: 'buy' | 'sell'; price: number } {
  const amp = normaliseQuoteAmplitudes(quote.amplitudes)
  const keys = Object.keys(amp).sort()
  let acc = 0
  for (const k of keys) {
    const p = amp[k]! * amp[k]!
    acc += p
    if (r < acc) return parseOutcomeKey(k)
  }
  return parseOutcomeKey(keys[keys.length - 1]!)
}

/** Seal a collapsed trade body as a content-uuid — same content ⇒ same trade id. */
export function sealCollapsedTrade(body: Omit<CollapsedTrade, 'tradeUuid'>): string {
  return computeContentUuid(
    {
      tenantId: body.tenantId,
      instrument: body.instrument,
      side: body.side,
      price: body.price,
      notional: body.notional,
      currency: body.currency,
      collapsedAt: body.collapsedAt,
    },
    body.tenantId,
  )
}

/**
 * Collapse a superposed quote to a sealed trade uuid and verify payment conservation.
 * `r` is the measurement draw (default 0 — deterministic first-outcome edge).
 */
export function quantumTradeCollapse(
  quote: QuantumTradeQuote,
  opts: { r?: number; collapsedAt?: string } = {},
): QuantumTradeCollapseResult {
  const r = opts.r ?? 0
  const collapsedAt = opts.collapsedAt ?? new Date().toISOString()
  const { side, price } = measureQuote(quote, r)
  const tradeBody = {
    tenantId: quote.tenantId,
    instrument: quote.instrument,
    side,
    price,
    notional: quote.notional,
    currency: quote.currency,
    collapsedAt,
  }
  const trade: CollapsedTrade = { tradeUuid: sealCollapsedTrade(tradeBody), ...tradeBody }
  const settlement = settleTradePayment(trade)
  return {
    trade,
    settlement,
    superpositionTotal: quoteSuperpositionTotal(quote.amplitudes),
  }
}

/**
 * Payment settlement stub — posts a balanced trade flow and checks conservation +
 * tamper-cost floor (double-torus ∞ at zero gap; manual-path forge impossible).
 */
export function settleTradePayment(trade: CollapsedTrade): TradeSettlementResult {
  const value = Math.abs(trade.notional * trade.price)
  const entry = toDoubleEntry({
    payer: `cash:${trade.currency}`,
    payee: `position:${trade.instrument}:${trade.side}`,
    amount: value,
  })
  const ledger = entry.lines.map((l) => ({ debit: l.debit, credit: l.credit }))
  const devPrice = manualDevelopmentPrice({
    corpusCoverage: 1,
    nodes: 2200,
    manualPath: true,
  })
  return {
    entry,
    conserves: conserves(ledger) && isBalanced(entry),
    trialBalance: trialBalance(ledger),
    tamperCostLog2: doubleTorusCostLog2(0),
    developmentForgeImpossible: devPrice.impossible,
  }
}

/** Build the secure wave correlation uuid for a trading session. */
export function tradeWaveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return waveCorrelationUuid(opts)
}

/**
 * Emit a collapsed trade on the realtime bus via team/comms secure wave envelope.
 * Returns the gate verdict, optional receipt, and a log-friendly trade event.
 */
export function emitTradeRealtime(opts: EmitTradeRealtimeOpts): EmitTradeRealtimeResult {
  const event = 'trading:quantum:collapsed'
  const tradePayload = {
    tradeUuid: opts.trade.tradeUuid,
    instrument: opts.trade.instrument,
    side: opts.trade.side,
    price: opts.trade.price,
    notional: opts.trade.notional,
    currency: opts.trade.currency,
    [SECURE_WAVE_PAYLOAD_KEY]: opts.envelope,
  }
  const eventUuid = computeContentUuid(
    {
      id: event,
      tenantId: opts.trade.tenantId,
      payload: tradePayload,
      emittedAt: opts.envelope.emittedAt,
    },
    opts.trade.tenantId,
  )
  const result = waveInSecureComms({
    scopeTenantId: opts.scopeTenantId,
    envelope: opts.envelope,
    event,
    eventUuid,
    agent: opts.agent,
    payload: tradePayload,
    receipt: opts.receipt,
  })
  return {
    ...result,
    tradeEvent: {
      tradeUuid: opts.trade.tradeUuid,
      event,
      emit: result.emit,
      verdictOk: result.verdict.ok,
    },
  }
}

/** Append a trade realtime event to an append-only log (pull-side delivery). */
export function appendTradeToLog<T extends TradeRealtimeEvent>(
  log: readonly T[],
  event: T,
): T[] {
  return append(log, event)
}

/** Session fold uuid — deterministic correlation of quote → collapse → emit → settle. */
export function quantumTradeSessionUuid(parts: {
  readonly quote: QuantumTradeQuote
  readonly tradeUuid: string
  readonly eventUuid: string
}): string {
  return uuid(
    jcsCanonicalize({
      tenantId: parts.quote.tenantId,
      instrument: parts.quote.instrument,
      tradeUuid: parts.tradeUuid,
      eventUuid: parts.eventUuid,
    }),
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const quote: QuantumTradeQuote = {
    tenantId: 'demo-tenant',
    instrument: 'EUR/USD',
    notional: 1000,
    currency: 'USD',
    amplitudes: { 'buy:1.085': 1, 'sell:1.086': 1 },
  }
  const { trade, settlement } = quantumTradeCollapse(quote, { r: 0.25 })
  console.log('trading/quantum — collapse → settle:')
  console.log('  tradeUuid=' + trade.tradeUuid)
  console.log('  side=' + trade.side + ' price=' + trade.price)
  console.log('  conserves=' + settlement.conserves + ' trialBalance=' + settlement.trialBalance)
}
