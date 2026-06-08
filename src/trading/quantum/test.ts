/**
 * trading/quantum — end-to-end: superposition → collapse → realtime → ledger.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import { append, since, advance } from '@/realtime'
import { conserves } from '@/conservation'
import { isBalanced } from '@/entry'
import {
  quantumTradeCollapse,
  emitTradeRealtime,
  settleTradePayment,
  sealCollapsedTrade,
  quoteSuperpositionTotal,
  tradeWaveCorrelationUuid,
  appendTradeToLog,
  quantumTradeSessionUuid,
  SECURE_WAVE_PAYLOAD_KEY,
  type QuantumTradeQuote,
  type CollapsedTrade,
} from '@/trading/quantum'

const TENANT = 'tenant-trading'
const TEAM = 'desk-1'
const TS = '2026-06-08T12:00:00.000Z'
const AGENT = 'agent-fx-1'

const superposedQuote = (): QuantumTradeQuote => ({
  tenantId: TENANT,
  instrument: 'EUR/USD',
  notional: 10_000,
  currency: 'USD',
  amplitudes: {
    'buy:1.0850': 2,
    'sell:1.0860': 1,
  },
})

describe('trading/quantum — quote superposition', () => {
  it('normalises amplitudes so Σ|c|² = 1 (Born rule)', () => {
    expect(quoteSuperpositionTotal(superposedQuote().amplitudes)).toBeCloseTo(1, 12)
  })

  it('rejects a zero superposition', () => {
    expect(() =>
      quantumTradeCollapse({
        tenantId: TENANT,
        instrument: 'EUR/USD',
        notional: 1,
        currency: 'USD',
        amplitudes: {},
      }),
    ).toThrow(/zero superposition/)
  })
})

describe('trading/quantum — collapse to sealed trade uuid', () => {
  it('collapses at r=0 to the highest-probability outcome (buy)', () => {
    const { trade, superpositionTotal } = quantumTradeCollapse(superposedQuote(), { r: 0, collapsedAt: TS })
    expect(trade.side).toBe('buy')
    expect(trade.price).toBe(1.085)
    expect(superpositionTotal).toBeCloseTo(1, 12)
    expect(trade.tradeUuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
  })

  it('seal is deterministic — same collapsed body ⇒ same tradeUuid', () => {
    const body = {
      tenantId: TENANT,
      instrument: 'EUR/USD',
      side: 'buy' as const,
      price: 1.085,
      notional: 10_000,
      currency: 'USD',
      collapsedAt: TS,
    }
    expect(sealCollapsedTrade(body)).toBe(sealCollapsedTrade(body))
  })

  it('different outcomes ⇒ different trade uuids', () => {
    const a = quantumTradeCollapse(superposedQuote(), { r: 0, collapsedAt: TS }).trade.tradeUuid
    const b = quantumTradeCollapse(superposedQuote(), { r: 0.99, collapsedAt: TS }).trade.tradeUuid
    expect(a).not.toBe(b)
  })
})

describe('trading/quantum — payment settlement conservation', () => {
  it('settlement entry balances and trialBalance === 0', () => {
    const { trade, settlement } = quantumTradeCollapse(superposedQuote(), { r: 0, collapsedAt: TS })
    expect(isBalanced(settlement.entry)).toBe(true)
    expect(settlement.trialBalance).toBe(0)
    expect(settlement.conserves).toBe(true)
    expect(settlement.tamperCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(settlement.developmentForgeImpossible).toBe(true)

    const ledger = settlement.entry.lines.map((l) => ({ debit: l.debit, credit: l.credit }))
    expect(conserves(ledger)).toBe(true)

    const direct = settleTradePayment(trade)
    expect(direct.conserves).toBe(true)
    expect(direct.entry.lines.find((l) => l.accountable.startsWith('cash:'))?.credit).toBe(
      trade.notional * trade.price,
    )
  })
})

describe('trading/quantum — realtime emit via team/comms wave', () => {
  function collapsedTrade(): CollapsedTrade {
    return quantumTradeCollapse(superposedQuote(), { r: 0, collapsedAt: TS }).trade
  }

  function waveEnvelope(waveId = 0) {
    const correlationUuid = tradeWaveCorrelationUuid({
      sessionId: 'fx-session-1',
      tenantId: TENANT,
      teamId: TEAM,
    })
    return {
      waveId,
      correlationUuid,
      depth: waveId,
      tenantId: TENANT,
      teamId: TEAM,
      emittedAt: TS,
    }
  }

  it('honest emit passes enforceTeamComms gate', () => {
    const trade = collapsedTrade()
    const envelope = waveEnvelope(0)
    const r = emitTradeRealtime({
      trade,
      envelope,
      scopeTenantId: TENANT,
      agent: AGENT,
      sessionId: 'fx-session-1',
      receipt: { actor: AGENT, head: null, timestampIso: TS },
    })
    expect(r.verdict.ok).toBe(true)
    expect(r.receipt?.seq).toBe(0)
    expect(r.tradeEvent.verdictOk).toBe(true)
    expect(r.tradeEvent.tradeUuid).toBe(trade.tradeUuid)
    expect(r.emit.event).toBe('trading:quantum:collapsed')
  })

  it('cross-tenant wave is rejected', () => {
    const trade = collapsedTrade()
    const envelope = waveEnvelope(0)
    const r = emitTradeRealtime({
      trade,
      envelope: { ...envelope, tenantId: 'other-tenant' },
      scopeTenantId: TENANT,
      agent: AGENT,
      sessionId: 'fx-session-1',
    })
    expect(r.verdict.ok).toBe(false)
  })

  it('appends to realtime log — tail delivers only new trade events', () => {
    const trade = collapsedTrade()
    const envelope = waveEnvelope(1)
    const emit = emitTradeRealtime({
      trade,
      envelope,
      scopeTenantId: TENANT,
      agent: AGENT,
      sessionId: 'fx-session-1',
    })
    let log = appendTradeToLog([], emit.tradeEvent)
    const cursor = advance(log)
    const trade2 = quantumTradeCollapse(superposedQuote(), { r: 0.99, collapsedAt: TS }).trade
    const emit2 = emitTradeRealtime({
      trade: trade2,
      envelope: waveEnvelope(2),
      scopeTenantId: TENANT,
      agent: AGENT,
      sessionId: 'fx-session-1',
    })
    log = appendTradeToLog(log, emit2.tradeEvent)
    expect(since(log, cursor)).toEqual([emit2.tradeEvent])
    expect(log).toHaveLength(2)
  })
})

describe('trading/quantum — end-to-end pipeline', () => {
  it('quote superposition → collapse → realtime emit → payment ledger balances', () => {
    const quote = superposedQuote()
    const { trade, settlement } = quantumTradeCollapse(quote, { r: 0.1, collapsedAt: TS })
    expect(settlement.conserves).toBe(true)

    const correlationUuid = tradeWaveCorrelationUuid({
      sessionId: 'e2e-session',
      tenantId: TENANT,
      teamId: TEAM,
    })
    const envelope = {
      waveId: 0,
      correlationUuid,
      depth: 0,
      tenantId: TENANT,
      teamId: TEAM,
      emittedAt: TS,
    }
    const event = 'trading:quantum:collapsed'
    const payload = {
      tradeUuid: trade.tradeUuid,
      instrument: trade.instrument,
      side: trade.side,
      price: trade.price,
      notional: trade.notional,
      currency: trade.currency,
      [SECURE_WAVE_PAYLOAD_KEY]: envelope,
    }
    const eventUuid = computeContentUuid(
      { id: event, tenantId: TENANT, payload, emittedAt: TS },
      TENANT,
    )

    const emit = emitTradeRealtime({
      trade,
      envelope,
      scopeTenantId: TENANT,
      agent: AGENT,
      sessionId: 'e2e-session',
      receipt: { actor: AGENT, head: null, timestampIso: TS },
    })
    expect(emit.verdict.ok).toBe(true)

    const sessionUuid = quantumTradeSessionUuid({ quote, tradeUuid: trade.tradeUuid, eventUuid })
    expect(sessionUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)

    const log = appendTradeToLog([], emit.tradeEvent)
    expect(log[0]?.tradeUuid).toBe(trade.tradeUuid)
    expect(settlement.trialBalance).toBe(0)
  })
})
