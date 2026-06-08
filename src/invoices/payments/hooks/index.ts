/**
 * Barrel export — Payments/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from '../../../Payments/hooks/hooks'`
 * instead of `from '../../../Payments/hooks/hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './afterChange'
export * from './beforeChange'
export * from './beforeValidate'
// GL posting hook (dissolved from the former accounting/hooks slice).
export * from './payment'
