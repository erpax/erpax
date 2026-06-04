/**
 * Accounting Hooks — barrel for transaction hooks (Invoice/Bill/Payment/Item).
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
export * from '@/collections/accounting/invoice.hook'
export * from '@/collections/accounting/bill.hook'
export * from '@/collections/accounting/payment.hook'
export * from '@/collections/accounting/item.hook'
// Slice LLL: bank-statement import emission (closes the IAS-7 GL gap).
export * from '@/collections/accounting/bank-statement.hook'
// Period-end hooks — schedule-row driven (status → 'posted' triggers GL).
export * from '@/collections/accounting/depreciation.hook'
export * from '@/collections/accounting/period-end-adjustment.hook'
export * from '@/collections/accounting/inventory-movement.hook'
export * from '@/collections/accounting/payroll-run.hook'
export * from '@/collections/accounting/payroll-disbursement.hook'
export * from '@/collections/accounting/lease-period-posting.hook'
