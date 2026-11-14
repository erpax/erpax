/**
 * Stock — warehouses, movements, shipments.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const stock: App = {
  slug: 'stock',
  title: 'Stock',
  anchors: ['warehouse-locations', 'shipments', 'inventory-movements'],
}
