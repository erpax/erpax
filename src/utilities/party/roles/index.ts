/**
 * Parties — the parties to a document are ROLES on that document.
 *
 * A seller, a buyer, a consignee are not columns a collection has to grow: each is a role a user
 * holds on one document (a Rolify resource-scoped role — `user.add_role :buyer, order`). So the
 * same engine that answers "may this user read this?" also answers "who are the parties to this?",
 * and a party sees a document BECAUSE of the role it holds on it.
 *
 * Each document type names its own parties. etrima's `orders` carried five party columns —
 * seller, buyer, supplier, consignee, speditor — which are the roles below.
 *
 * @standard EN-16931:2017 §BG-4 seller · §BG-7 buyer · §BG-10 payee · §BG-13 deliver-to
 * @standard UBL-2.1 Order — SellerSupplierParty · BuyerCustomerParty · OriginatorCustomerParty · Delivery/DeliveryParty · FreightForwarderParty
 * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
 * @security ISO-27001 A.5.15 access-control · A.5.18 access-rights
 * @see @/utilities/nist/incits/359 (the role engine — the Rolify port)
 * @see @/utilities/ability (what a role may do — the CanCanCan port)
 * @see @/access/collections/shared/partyAccess (a party reads the documents it is a party to)
 * @see @/hooks/collections/orders/assignBuyerParty (the hook that makes the checkout customer the buyer)
 */
import type { Payload, PayloadRequest } from 'payload'

import { addRole, removeRole, rolesOn, usersWithRole, type RoleCallbacks } from '@/utilities/nist/incits/359'
import type { ScopeResourceCollection } from '@/utilities/nist/incits/359'

/** The parties each document type has. A status is read per document type AND per party. */
export const PARTY_ROLES = {
  /** An order: who sells, who buys, who supplies the goods, who receives them, who forwards them. */
  order: ['seller', 'buyer', 'supplier', 'consignee', 'forwarder'],
  /** A vendor quote: the vendor who quotes and the buyer who asked. */
  quote: ['seller', 'buyer'],
  /** A purchase requisition: who asks and who approves. */
  requisition: ['requester', 'approver'],
} as const

export type PartyDocumentType = keyof typeof PARTY_ROLES
export type PartyRole = (typeof PARTY_ROLES)[PartyDocumentType][number]

/** The parties a document of this type has; an unknown type is read as an order. */
export const partyRolesOf = (documentType: unknown): readonly PartyRole[] =>
  PARTY_ROLES[(typeof documentType === 'string' && documentType in PARTY_ROLES ? documentType : 'order') as PartyDocumentType]

/** Every party role any document type names. */
export const allPartyRoles = (): PartyRole[] => [...new Set(Object.values(PARTY_ROLES).flat())]

export interface PartyResource {
  collection: ScopeResourceCollection
  id: string
  /** The document's type, when the collection carries several (orders: order · quote · requisition). */
  documentType?: unknown
}

/** Make a user a party to a document. Refuses a role this document type does not have. */
export async function assignParty(payload: Payload, req: PayloadRequest, args: { userId: string; role: string; resource: PartyResource; callbacks?: RoleCallbacks }): Promise<void> {
  const allowed = partyRolesOf(args.resource.documentType)
  if (!(allowed as readonly string[]).includes(args.role)) {
    throw new Error(`party: "${args.role}" is not a party to a ${String(args.resource.documentType ?? 'order')} (its parties: ${allowed.join(', ')})`)
  }
  await addRole(payload, req, { userId: args.userId, roleName: args.role, resource: { collection: args.resource.collection, id: args.resource.id }, callbacks: args.callbacks })
}

/** A user stops being that party to the document. */
export async function removeParty(payload: Payload, req: PayloadRequest, args: { userId: string; role: string; resource: PartyResource; callbacks?: RoleCallbacks }): Promise<void> {
  await removeRole(payload, req, { userId: args.userId, roleName: args.role, resource: { collection: args.resource.collection, id: args.resource.id }, callbacks: args.callbacks })
}

/** Who the parties to a document are: each role held on it, with the users holding it. */
export async function partiesOf(payload: Payload, req: PayloadRequest, resource: PartyResource): Promise<Array<{ role: string; userIds: string[] }>> {
  const names = [...new Set((await rolesOn(payload, req, resource)).map((role) => role.name))]
  return Promise.all(
    names.map(async (role) => ({ role, userIds: await usersWithRole(payload, req, role, { collection: resource.collection, id: resource.id }) })),
  )
}
