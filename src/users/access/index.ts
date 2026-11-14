/**
 * Barrel export — Users/access canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/access/collections/users/createAccess'
export * from './isAccessingSelf'
export * from '@/access/collections/users/readAccess'
export * from '@/access/collections/users/updateAndDeleteAccess'

/** @index-cross.foldback child=users/access parent=users — this cross folds back into its parent. */
