/**
 * Barrel export — Items/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/items/hooks/afterChange'
export * from '@/items/hooks/beforeValidate'
// GL posting hook (dissolved from the former accounting/hooks slice).
export * from '@/items/hooks/item'
