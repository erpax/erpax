/**
 * grantApps — a completed sale of an app switches that app on for the buyer.
 *
 * erpax's apps are sold through the ecommerce catalogue: a product lists the apps it switches on
 * (`products.apps` — one app, or several for a bundle built around a use case). When a sale to a
 * TENANT reaches `completed`, the apps of every product on the order are added to the buyer's
 * `tenants.apps`. That list is what the tenant's admin and API are made of
 * (src/access/collections/shared/appAccess).
 *
 * Only a sale whose counterparty is a tenant grants anything: an order to a trading partner or to
 * a storefront customer is ordinary commerce. A tenant with nothing chosen already has every app,
 * so a grant leaves it as it is. Nothing is taken away here — a refund or a cancellation does not
 * switch an app off; that is a decision for a person.
 *
 * @standard NIST INCITS-359-2012 §6.1 permission-assignment
 * @see src/packages/engine/index.ts (grant) · src/components/ecommerce/catalogue (products.apps)
 */
import type { CollectionAfterChangeHook } from 'payload'
import { APPS } from '@/packages'
import { grant } from '@/packages/engine'

const idOf = (value: unknown): string | undefined =>
  typeof value === 'string' || typeof value === 'number' ? String(value) : value !== null && typeof value === 'object' && 'id' in value ? String((value as { id: unknown }).id) : undefined

/** The buyer, when the order's counterparty is a tenant. */
export const buyerTenant = (order: { party?: unknown }): string | undefined => {
  const party = order.party as { relationTo?: unknown; value?: unknown } | null | undefined
  return party && party.relationTo === 'tenants' ? idOf(party.value) : undefined
}

/** The products on an order, by id. */
export const productsOf = (order: { items?: unknown }): string[] =>
  [...new Set((Array.isArray(order.items) ? order.items : []).flatMap((item) => idOf((item as { product?: unknown } | null)?.product) ?? []))]

/** The apps a set of products switches on. */
export const appsOf = (products: ReadonlyArray<{ apps?: readonly string[] | null }>): string[] => [...new Set(products.flatMap((product) => product.apps ?? []))].sort()

/** Did this write take the order to `completed`? */
export const justCompleted = (doc: { status?: unknown }, previous: { status?: unknown } | null | undefined): boolean => doc.status === 'completed' && previous?.status !== 'completed'

export const grantApps: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (!justCompleted(doc, previousDoc)) return doc
  const tenant = buyerTenant(doc)
  const ids = productsOf(doc)
  if (!tenant || ids.length === 0) return doc
  const found = await req.payload.find({ collection: 'products', where: { id: { in: ids } }, limit: ids.length, depth: 0, pagination: false, overrideAccess: true, req })
  const apps = appsOf(found.docs as unknown as Array<{ apps?: string[] | null }>)
  if (apps.length === 0) return doc
  const buyer = await req.payload.findByID({ collection: 'tenants', id: tenant, depth: 0, overrideAccess: true, req })
  const current = (buyer as { apps?: string[] | null }).apps
  const next = grant(current, apps, APPS)
  // unchanged: the tenant already has them (or has everything)
  if ([...(current ?? [])].sort().join() === [...next].sort().join()) return doc
  await req.payload.update({ collection: 'tenants', id: tenant, data: { apps: next } as never, overrideAccess: true, req })
  return doc
}
