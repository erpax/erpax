/**
 * Barrel export — Tenants/access canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './updateAndDelete'

/** @index-cross.foldback child=tenants/access parent=tenants — this cross folds back into its parent. */
