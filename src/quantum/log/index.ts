/**
 * quantum/log — append-only agent trail; chain length IS forging difficulty.
 *
 * Each receipt hash-links to prior entries — altering one past action forces
 * re-harmonising every entry that followed (≈one order of magnitude per link).
 * The stream hardens as it grows ([[receipt]] · [[stream]] · [[tamper]]).
 *
 * @audit pure functions; never hand-asserted chain cost
 * @see ../../receipt — ../digit — ./SKILL.md
 */
import { verifyReceiptChain, type Receipt, type Decision } from '@/receipt'

const LOG10_2 = Math.log2(10)

/** Forging difficulty grows ~one decimal order per append-only link after genesis. */
export function forgingDifficultyLog2(chainLength: number): number {
  if (chainLength <= 1) return 0
  return LOG10_2 * (chainLength - 1)
}

/** Chain length IS the tamper surface — the SKILL law made numeric. */
export const logTamperCostLog2 = forgingDifficultyLog2

/** Monotonic seq — append-only trail invariant. */
export function appendOnlySeqHolds(receipts: readonly Receipt[]): boolean {
  for (let i = 1; i < receipts.length; i++) {
    if (receipts[i]!.seq !== receipts[i - 1]!.seq + 1) return false
  }
  return true
}

/** Verify an agent trail: structural chain integrity + optional decision content. */
export async function verifyAgentTrail(
  receipts: readonly Receipt[],
  decisions?: readonly Decision[],
): Promise<{ ok: boolean; chainLength: number; forgingDifficultyLog2: number }> {
  const chainLength = receipts.length
  const verdict = await verifyReceiptChain(receipts, decisions)
  return {
    ok: verdict.ok && appendOnlySeqHolds(receipts),
    chainLength,
    forgingDifficultyLog2: forgingDifficultyLog2(chainLength),
  }
}

export type { Receipt, Decision } from '@/receipt'
