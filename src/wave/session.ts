/**
 * wave/session — mutable wave session for strict-apply persist gates.
 *
 * Persist only after every horo-phase wave completes with balanced receipts.
 *
 * @see ../agent/strict-apply · ./load.ts
 */
import type { Receipt } from '@/receipt'
import { issueReceipt, type Decision } from '@/receipt'
import type { SelfBalancingWavePlan } from './load'
import { tamperCostForWave } from './load'

/** Mutable session — wave completion + append-only receipt chain. */
export interface WaveSession<T = string> {
  readonly plan: SelfBalancingWavePlan<T>
  readonly correlationUuid: string
  completedOrdinals: Set<number>
  waveReceipts: Receipt[]
  receiptHead: { leafUuid: string; seq: number } | null
}

export interface WaveSessionVerdict {
  readonly complete: boolean
  readonly completedWaves: number
  readonly totalWaves: number
  readonly balanced: boolean
  readonly reason?: string
}

export function createWaveSession<T>(
  plan: SelfBalancingWavePlan<T>,
  correlationUuid: string,
): WaveSession<T> {
  return {
    plan,
    correlationUuid,
    completedOrdinals: new Set(),
    waveReceipts: [],
    receiptHead: null,
  }
}

/** Record one wave hop — append receipt, mark ordinal complete. */
export function completeWaveHop<T>(
  session: WaveSession<T>,
  ordinal: number,
  timestampIso: string,
  actor: string,
): Receipt {
  const batch = session.plan.waves.find((w) => w.ordinal === ordinal)
  if (!batch) {
    throw new Error(`wave session: unknown ordinal ${ordinal}`)
  }

  const tamperLog2 = tamperCostForWave(batch, {
    completedWaves: session.completedOrdinals.size + 1,
    totalWaves: session.plan.waveCount,
  })

  const decision: Decision = {
    action: `wave:${session.correlationUuid}:${ordinal}`,
    actor,
    outcome: 'allow',
    tier: 'wave-complete',
    capabilities: ['read'],
  }

  const receipt = issueReceipt({
    decision,
    head: session.receiptHead,
    timestampIso,
  })

  session.receiptHead = { leafUuid: receipt.leafUuid, seq: receipt.seq }
  session.waveReceipts.push(receipt)
  session.completedOrdinals.add(ordinal)

  // Tamper mass recorded on receipt seq — chain length compounds cost.
  void tamperLog2

  return receipt
}

/** All waves done with one receipt per wave — balanced load within 2× spread. */
export function waveSessionVerdict<T>(session: WaveSession<T>): WaveSessionVerdict {
  const total = session.plan.waveCount
  const completed = session.completedOrdinals.size

  if (total === 0) {
    return { complete: true, completedWaves: 0, totalWaves: 0, balanced: true }
  }

  if (completed < total) {
    return {
      complete: false,
      completedWaves: completed,
      totalWaves: total,
      balanced: false,
      reason: `${completed}/${total} waves complete — persist deferred`,
    }
  }

  if (session.waveReceipts.length < total) {
    return {
      complete: false,
      completedWaves: completed,
      totalWaves: total,
      balanced: false,
      reason: `${session.waveReceipts.length}/${total} wave receipts — chain incomplete`,
    }
  }

  const balanced = session.plan.balanceRatio <= 2 || total <= 1

  return {
    complete: true,
    completedWaves: completed,
    totalWaves: total,
    balanced,
    reason: balanced ? undefined : `wave load imbalance ratio ${session.plan.balanceRatio} > 2`,
  }
}

export function isWaveSessionReady<T>(session: WaveSession<T>): boolean {
  const v = waveSessionVerdict(session)
  return v.complete && v.balanced
}
