/**
 * Barrel export — Products/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from '../../../Products/hooks/hooks'`
 * instead of `from '../../../Products/hooks/hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './beforeChange'

/** @index-cross.foldback child=media/products/hooks parent=media/products — this cross folds back into its parent. */
