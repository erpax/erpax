/**
 * wallet — holds value: a balance under an owner. In erpax value is double-entry ([[balance]] ·
 * [[entry]]) and content-addressed, so a wallet's state is tamper-evident ([[quantum]]/wallet — any
 * balance change yields a new state-uuid). Pure: credit/debit return a new wallet.
 * Composes [[balance]] · [[identity]] · [[money]] · [[account]].
 *
 *   tsx src/wallet/index.ts
 *
 * @see ../balance -- ../identity -- ../money -- ../account -- ../quantum/wallet -- ./SKILL.md
 */
export interface Wallet {
  readonly owner: string
  readonly balance: number
}

/** Open a wallet for an owner (default zero balance). */
export const wallet = (owner: string, balance = 0): Wallet => ({ owner, balance })

/** Credit (add) value — returns a new wallet. */
export const credit = (w: Wallet, amount: number): Wallet => ({ owner: w.owner, balance: w.balance + amount })

/** Debit (remove) value — returns a new wallet. */
export const debit = (w: Wallet, amount: number): Wallet => ({ owner: w.owner, balance: w.balance - amount })

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('wallet — credit/debit: ' + JSON.stringify(debit(credit(wallet('alice'), 100), 30)))
}
