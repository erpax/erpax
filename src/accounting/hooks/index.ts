/**
 * Accounting Hooks — barrel for transaction hooks (Invoice/Bill/Payment/Item).
 *
 * Dissolve merge: moved verbatim from the former collections/accounting slice
 * and merged with the former no-op `accounting/hooks.ts` stubs (accountable merge — the
 * real implementations win; the stub file's `invoiceAccountingHook`,
 * `itemAccountingHook`, `paymentAccountingHook` no-ops are superseded by the
 * canonical hooks re-exported below). Consumers importing `@/accounting/hooks`
 * now resolve this barrel and reach the real (non-stub) implementations.
 *
 * Slice PPP: removed all backward-compat exports —
 *   • `base-accounting-hook` (`createAccountingHook`, `ensureTenant`,
 *     `calculateTotal`, `HookHandler`) — zero callers (KKK), `ensureTenant`
 *     was a duplicate of canonical `autoPopulateTenant` (PPP merge); file
 *     queued for deletion.
 *   • `ar-aging`, `ap-aging`, `cogs` — each delegated to a
 *     `req.payload.services?.X` lookup against a service file that doesn't
 *     exist (FFF DOA); files queued for deletion. Aging now lives as a
 *     service-generated DTO via `financialReportingService`. COGS will
 *     fold into `gl-posting.service.ts`.
 *   • `depreciation` — CLOSED. `depreciation.hook.ts` is now a working
 *     `DepreciationSchedules.afterChange` hook backed by the canonical
 *     `depreciationService` singleton in `src/services/depreciation.service.ts`.
 *     IAS-16 / ASC-360 expense recognition fires on status → 'posted'.
 *   • `period-end-adjustment` — CLOSED (tech-debt sweep).
 *     `period-end-adjustment.hook.ts` is a `PeriodEndAdjustments.afterChange`
 *     hook that books a balanced JE via `journalEntryService` on
 *     status → 'posted' and back-links the JE id to the adjustment.
 *     Closes the period-end-adjustment.service.ts DOA — accruals,
 *     deferrals, depreciation, and inventory variance now post via
 *     a single canonical path under SOX §404 four-eyes (the
 *     `enforceSegregationOfDuties` hook on the same collection).
 *
 * Per-hook standards live in each file's banner.
 *
 * @audit ISO-19011:2018 audit-trail event-driven-posting
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

// Transaction hooks — each imports its service singleton directly (FFF):
export * from '@/accounting/hooks/invoice.hook'
export * from '@/accounting/hooks/bill.hook'
export * from '@/accounting/hooks/payment.hook'
export * from '@/accounting/hooks/item.hook'
// Slice LLL: bank-statement import emission (closes the IAS-7 GL gap).
export * from '@/accounting/hooks/bank-statement.hook'
// Period-end hooks — schedule-row driven (status → 'posted' triggers GL).
export * from '@/accounting/hooks/depreciation.hook'
export * from '@/accounting/hooks/period-end-adjustment.hook'
export * from '@/accounting/hooks/inventory-movement.hook'
export * from '@/accounting/hooks/payroll-run.hook'
export * from '@/accounting/hooks/payroll-disbursement.hook'
export * from '@/accounting/hooks/lease-period-posting.hook'
