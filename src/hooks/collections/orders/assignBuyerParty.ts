/**
 * assignBuyerParty — on a sale, the customer who placed the order becomes its BUYER.
 *
 * Parties are roles held on the document (`@/utilities/party/roles`). When a sale order is created
 * with a `customer` (the user who checked out), that user is given the `buyer` role ON the order,
 * so they read it as a party like any other. A purchase, a quote or a requisition has no checkout
 * customer and is left alone. Best-effort: a failure to assign must not undo the order.
 *
 * @standard EN-16931:2017 §BG-7 buyer
 * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
 */
import type { CollectionAfterChangeHook } from 'payload'

import { assignParty } from '@/utilities/party/roles'

export const assignBuyerParty: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const order = doc as { id?: string | number; customer?: unknown; side?: unknown; documentType?: unknown }
  if (order.side === 'purchase' || (order.documentType !== undefined && order.documentType !== null && order.documentType !== 'order')) return doc
  const customer = order.customer
  const userId = customer !== null && typeof customer === 'object' ? (customer as { id?: unknown }).id : customer
  if (order.id === undefined || (typeof userId !== 'string' && typeof userId !== 'number')) return doc
  try {
    await assignParty(req.payload, req, { userId: String(userId), role: 'buyer', resource: { collection: 'orders', id: String(order.id), documentType: 'order' } })
  } catch (error) {
    req.payload.logger?.warn?.({ err: error }, `orders: could not make the customer the buyer party on ${String(order.id)}`)
  }
  return doc
}
