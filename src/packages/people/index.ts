/**
 * People — employees, positions, payroll.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const people: App = {
  slug: 'people',
  title: 'People',
  anchors: ['employees', 'payroll-runs', 'job-positions'],
}
