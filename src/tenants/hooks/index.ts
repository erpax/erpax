/**
 * Barrel export — Tenants/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './initializeTrial'
export * from './normalizeRouting'

/** @index-cross.foldback child=tenants/hooks parent=tenants — this cross folds back into its parent. */
