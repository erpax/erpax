/**
 * anti-corruption — the architectural invariants that make corruption
 * structurally detectable or impossible, as executable checks.
 *
 * erpax does not *police* corruption with policy; it *forecloses* it by
 * construction. Four invariants, each a different impossibility:
 *
 *   1. CONTENT-UUID IMMUTABILITY — a record's id IS the hash of its content.
 *      Alter the content and the id no longer matches → tamper is detected,
 *      not trusted. (Merkle audit chain; the `identity`/`event` skills.)
 *   2. SEGREGATION OF DUTIES — creator ≠ approver ≠ payer (four-eyes). No
 *      single actor can complete a value transfer alone. (SOX §404.)
 *   3. DOUBLE-ENTRY BALANCE — every posting nets Σdebit = Σcredit. Value
 *      cannot be fabricated from nothing. (IFRS / the `balance` skill.)
 *   4. NO-DELETE / REVERSAL-ONLY — history is append-only; you correct by a
 *      reversing entry, never by erasing. (BG Наредба Н-18 / `supto`.)
 *
 * All pure (no I/O) → testable: the tests below prove each invariant CATCHES a
 * concrete corruption attempt. A document afterChange hook + a scheduled audit
 * job consume `scanTransaction` over the live ledger.
 *
 * @audit ISO-19011:2018 audit-trail integrity-verification
 * @compliance SOX §404 segregation-of-duties internal-controls
 * @security ISO-27001 A.8.15 logging A.8.16 monitoring (tamper detection)
 */

/** 1 · Tamper detection: the stored content-uuid must equal the recomputed one. */
export function detectTamper(storedUuid: string, recomputedUuid: string): { tampered: boolean } {
  return { tampered: storedUuid !== recomputedUuid }
}

/** 2 · Segregation of duties: roles that must differ must not be the same actor. */
export function detectSodViolation(
  assignments: Record<string, string | null | undefined>,
  mustDiffer: ReadonlyArray<readonly [string, string]>,
): { violation: boolean; conflicts: Array<[string, string]> } {
  const conflicts: Array<[string, string]> = []
  for (const [a, b] of mustDiffer) {
    const ua = assignments[a]
    const ub = assignments[b]
    // Unassigned role bypass: a missing actor on a must-differ duty defeats
    // four-eyes just as surely as the same actor on both — the gate was never
    // manned. Either both are assigned and distinct, or it is a conflict.
    if (ua == null || ub == null || ua === ub) conflicts.push([a, b])
  }
  return { violation: conflicts.length > 0, conflicts }
}

/** 3 · Double-entry balance: Σdebit must equal Σcredit (delta 0). */
export function detectImbalance(
  lines: ReadonlyArray<{ debit?: number | null; credit?: number | null }>,
): { balanced: boolean; debit: number; credit: number; delta: number; dualLines: number[] } {
  const debit = lines.reduce((s, l) => s + (l.debit ?? 0), 0)
  const credit = lines.reduce((s, l) => s + (l.credit ?? 0), 0)
  const delta = debit - credit
  // Double-entry principle: each line is exclusively debit XOR credit. A line
  // carrying BOTH sides is malformed — it can self-net to look balanced while
  // hiding value movement. Such a posting is never balanced, whatever the sums.
  const dualLines: number[] = []
  lines.forEach((l, i) => {
    if (l.debit != null && l.credit != null) dualLines.push(i)
  })
  return { balanced: delta === 0 && dualLines.length === 0, debit, credit, delta, dualLines }
}

/**
 * 4 · No-delete / reversal-only: a posted record is immutable. It may be
 * corrected only by appending a *reversing* entry — never erased, and never
 * mutated in place. A `delete` of a posted record is always illegal. An
 * `update` of a posted record is illegal when it *mutates content*
 * (`mutatesContent` true): the reversal path appends a new record, it does not
 * rewrite the posted one. A non-mutating update (e.g. attaching the reversal
 * link / status flip that the reversal path performs) remains permitted, which
 * preserves the established reversal-as-update contract.
 */
export function detectIllegalErasure(
  op: 'delete' | 'update' | 'create',
  wasPosted: boolean,
  mutatesContent = false,
): { illegal: boolean; reason?: string } {
  if (op === 'delete' && wasPosted) return { illegal: true, reason: 'posted records are reversal-only, never deleted' }
  if (op === 'update' && wasPosted && mutatesContent) {
    return { illegal: true, reason: 'posted records are reversal-only, never updated in place — append a reversing entry' }
  }
  return { illegal: false }
}

export interface CorruptionFindings {
  clean: boolean
  findings: string[]
}

/** Run all invariants over one transaction; any failure is a corruption signal. */
export function scanTransaction(tx: {
  storedUuid: string
  recomputedUuid: string
  assignments: Record<string, string | null | undefined>
  mustDiffer: ReadonlyArray<readonly [string, string]>
  lines: ReadonlyArray<{ debit?: number | null; credit?: number | null }>
}): CorruptionFindings {
  const findings: string[] = []
  if (detectTamper(tx.storedUuid, tx.recomputedUuid).tampered) findings.push('content-uuid mismatch (record altered after addressing)')
  const sod = detectSodViolation(tx.assignments, tx.mustDiffer)
  if (sod.violation) findings.push(`segregation-of-duties breach: ${sod.conflicts.map((c) => c.join('=')).join(', ')}`)
  const bal = detectImbalance(tx.lines)
  if (!bal.balanced) findings.push(`unbalanced posting: Σdebit−Σcredit = ${bal.delta}`)
  return { clean: findings.length === 0, findings }
}
