/**
 * perspective — switch the point of view on one content-uuid node.
 *
 * The `dimension`/`duality` law made executable: a single node is ONE content
 * (one id), but it READS differently from each party's vantage — and the view
 * is DERIVED, never stored. The merge already proved it (the same `invoices`
 * row is AR from the seller and AP from the buyer, opposite sign); this
 * generalises it. Switching POV is the inverse map of a relation/transfer:
 *   - a connection edge: "A → supplier → B" is, from B, "A is my customer"
 *   - a transfer: the payer sees an OUTFLOW (give), the payee an INFLOW (take)
 *   - a neutral observer (auditor) sees BOTH sides — the transparency POV
 *
 * Pure (no I/O) → testable. Composes flow/give/take + the connections graph +
 * the accounting debit/credit duals.
 *
 * @standard ISO 20022 party-role-perspective (debtor/creditor are one transfer)
 */

/** Inverse of a connection context — the relation seen from the OTHER end. */
const INVERSE_CONTEXT: Record<string, string> = {
  customer: 'supplier',
  supplier: 'customer',
  employer: 'employee',
  employee: 'employer',
  contractor: 'client',
  client: 'contractor',
  governs: 'regulated_by',
  regulated_by: 'governs',
  represents: 'represented_by',
  follow: 'followed_by',
  subscribe: 'subscribed_by',
  // symmetric relations are their own inverse
  friend: 'friend',
  colleague: 'colleague',
  connect: 'connect',
  member: 'member',
  mention: 'mentioned_by',
  block: 'blocked_by',
  mute: 'muted_by',
}

const idOf = (v: string | number): string => String(v)

export interface Edge {
  from: string | number
  to: string | number
  context: string
}

export interface EdgeView {
  viewer: string
  direction: 'outgoing' | 'incoming' | 'observer'
  counterparty: string | null
  /** the relation as it reads FROM the viewer's point of view */
  relation: string
}

/** View a connection edge from a chosen party (or a neutral observer). */
export function viewEdgeFrom(edge: Edge, viewer: string | number): EdgeView {
  const from = idOf(edge.from)
  const to = idOf(edge.to)
  const v = idOf(viewer)
  if (v === from) return { viewer: v, direction: 'outgoing', counterparty: to, relation: edge.context }
  if (v === to) return { viewer: v, direction: 'incoming', counterparty: from, relation: INVERSE_CONTEXT[edge.context] ?? edge.context }
  // a third party (auditor/regulator) sees the whole edge, not a side
  return { viewer: v, direction: 'observer', counterparty: null, relation: edge.context }
}

export interface TransferView {
  viewer: string
  direction: 'outflow' | 'inflow' | 'observer'
  /** signed from the viewer's POV: negative = leaving, positive = arriving */
  signedAmount: number
  role: 'give' | 'take' | 'witness'
}

/** View a value transfer (payer → payee) from a chosen party. */
export function viewTransferFrom(
  transfer: { payer: string | number; payee: string | number; amount: number },
  viewer: string | number,
): TransferView {
  const v = idOf(viewer)
  if (!Number.isFinite(transfer.amount)) throw new Error('Transfer amount must be a finite number')
  const amt = Math.abs(transfer.amount)
  if (v === idOf(transfer.payer)) return { viewer: v, direction: 'outflow', signedAmount: -amt, role: 'give' }
  if (v === idOf(transfer.payee)) return { viewer: v, direction: 'inflow', signedAmount: +amt, role: 'take' }
  return { viewer: v, direction: 'observer', signedAmount: 0, role: 'witness' }
}

/** The two party-views of a node always net to zero — the conservation law that makes POV switching sound. */
export function isConserved(transfer: { payer: string | number; payee: string | number; amount: number }): boolean {
  if (!Number.isFinite(transfer.amount)) return false
  const a = viewTransferFrom(transfer, transfer.payer).signedAmount
  const b = viewTransferFrom(transfer, transfer.payee).signedAmount
  return a + b === 0
}
