/**
 * Barrel export — Posts/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './beforeChange'
export * from './populateAuthors'
export * from './revalidatePost'

/** @index-cross.foldback child=posts/hooks parent=posts — this cross folds back into its parent. */
