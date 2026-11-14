/**
 * Barrel export — Subscriptions/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from '../../../Subscriptions/hooks/hooks'`
 * instead of `from '../../../Subscriptions/hooks/hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents'
export * from '@/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData'

/** @index-cross.foldback child=subscription/plans/subscriptions/hooks parent=subscription/plans/subscriptions — this cross folds back into its parent. */
