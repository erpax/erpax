/**
 * quantum/wallet — the wallet on the quantum substrate: its state is a content-uuid (tamper-evident,
 * any balance change yields a new state-uuid), and every transfer is a balanced double-entry
 * ([[entry]] — payer credited, payee debited). The history is a chain of state-uuids ([[merge]]).
 * Merges into [[wallet]]. Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[karma]].
 *
 *   tsx src/quantum/wallet/index.ts
 *
 * @standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)
 * @see ../../wallet -- ../../entry -- ../../uuid/matrix -- ./SKILL.md
 */
import type { Wallet } from '@/wallet'
import { toDoubleEntry, isBalanced, type Entry } from '@/entry'
import { toUuid } from '@/uuid/matrix'

/** The content-uuid of a wallet's state (tamper-evident; any balance change → a new uuid). */
export const stateUuid = (w: Wallet): string => toUuid(Buffer.from('wallet:' + w.owner + ':' + w.balance, 'utf8'))

/** A balanced transfer (double-entry): payer credited (gives), payee debited (receives). */
export const transfer = (from: string, to: string, amount: number): Entry => toDoubleEntry({ payer: from, payee: to, amount })

/** Is a transfer balanced (Σdebit = Σcredit)? */
export const balanced = (e: Entry): boolean => isBalanced(e)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/wallet — state-uuid + balanced transfer:')
  console.log('  balanced(transfer alice→bob 30) = ' + balanced(transfer('alice', 'bob', 30)))
}
