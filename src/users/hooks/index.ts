/**
 * Barrel export — Users/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/hooks/ensureUniqueUsername'
export * from '@/hooks/firstUserSuperAdmin'
export * from '@/hooks/setCookieBasedOnDomain'

/** @index-cross.foldback child=users/hooks parent=users — this cross folds back into its parent. */
