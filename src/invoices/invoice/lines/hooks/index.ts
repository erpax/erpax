/**
 * Barrel export — InvoiceLines/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from '../../../InvoiceLines/hooks/hooks'`
 * instead of `from '../../../InvoiceLines/hooks/hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from './beforeValidate'
