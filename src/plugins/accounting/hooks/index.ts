/**
 * Accounting Hooks — barrel for transaction hooks (Invoice/Bill/Payment/Item).
 *
 * Slice PPP: removed all backward-compat exports —
 *   • `base-accounting-hook` (`createAccountingHook`, `ensureHostId`,
 *     `calculateTotal`, `HookHandler`) — zero callers (KKK), `ensureHostId`
 *     was a duplicate of canonical `autoPopulateHost` (PPP merge); file
 *     queued for deletion.
 *   • `ar-aging`, `ap-aging`, `cogs`, `depreciation` — each delegated to a
 *     `req.payload.services?.X` lookup against a service file that doesn't
 *     exist (FFF DOA); files queued for deletion. Aging now lives as a
 *     service-generated DTO via `financialReportingService`. COGS will
 *     fold into `gl-posting.service.ts`. Depreciation is scheduled-job
 *     territory (`dunningJob` pattern, Slice ZZ).
 *
 * Per-hook standards live in each file's banner.
 *
 * @audit ISO-19011:2018 audit-trail event-driven-posting
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

// Transaction hooks — each imports its service singleton directly (FFF):
export * from './invoice.hook'
export * from './bill.hook'
export * from './payment.hook'
export * from './item.hook'
