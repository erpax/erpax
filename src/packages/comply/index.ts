/**
 * Comply — frameworks, controls, evidence, risk.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const comply: App = {
  slug: 'comply',
  title: 'Comply',
  anchors: ['compliance-frameworks', 'internal-controls', 'audit-evidence', 'risk-register'],
}
