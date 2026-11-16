/**
 * Assets — fixed assets, leases, properties, business combinations.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const assets: App = {
  slug: 'assets',
  title: 'Assets',
  // business-combinations was placed here by the held-for-sale register, which linked it to fixed assets; that
  // register is now a governed page (whose references place nothing), so the placement is kept by name
  anchors: ['fixed-assets', 'leases', 'properties', 'business-combinations'],
}
