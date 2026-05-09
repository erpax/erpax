# Tech-debt register

> Generated 2026-05-09 from filename-pattern + standards-vs-implementation audit.
> Score formula: `(Impact + Risk) × (6 − Effort)`. Higher = address sooner.

## 🔴 Critical (priority ≥ 30)

| # | Item | Cat | I | R | E | Score | Status |
|---|---|---|---|---|---|---|---|
| 1 | **Stripe webhook → emitEvent wire missing** | Architecture | 5 | 5 | 2 | 40 | Sprint 1 — implementing |
| 2 | **WCAG-2.1 zero implementation** (53 banners, 0 attrs) | Code+Compliance | 4 | 5 | 2 | 36 | Sprint 3 |

## 🟠 High (20-29)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 3 | TypeScript 6.0.3 (beta) → 5.7.x | 3 | 4 | 2 | 28 |
| 4 | Statement generators per `accountingStandard` adapter | 4 | 4 | 3 | 24 |
| 5 | `GL_ACCOUNTS` tenant-config-driven (was hardcoded) | 4 | 4 | 3 | 24 |
| 6 | A/R + A/P aging dashboards | 4 | 3 | 3 | 21 |
| 7 | Invoice PDF / UBL generator | 5 | 5 | 4 | 20 |
| 8 | 15 collection sub-folders missing `index.ts` | 2 | 2 | 1 | 20 |

## 🟡 Medium (10-19)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 9 | 71% banner coverage → 100% | 3 | 3 | 3 | 18 |
| 10 | Subscription dashboard | 3 | 3 | 3 | 18 |
| 11 | ISO-20022 pain.001 generator | 4 | 4 | 4 | 16 |
| 12 | Bank reconciliation UI | 4 | 3 | 4 | 14 |
| 13 | SAF-T export wizard UI | 3 | 4 | 4 | 14 |
| 14 | EN-16931 / Peppol UBL serializer | 5 | 5 | 5 | 10 |
| 15 | OECD SAF-T XML generator (per-jurisdiction) | 5 | 5 | 5 | 10 |
| 16 | Tax engine per country (VAT/GST/Sales Tax/HST) | 5 | 5 | 5 | 10 |
| 17 | 9 files >500 LOC (config-discovery 1148) | 3 | 2 | 4 | 10 |
| 18 | 25 `.bak` files cleanup | 1 | 1 | 1 | 10 |
| 19 | 180 `.fuse_hidden*` cleanup (sandbox blocked) | 1 | 1 | 1 | 10 |

## 🟢 Low (< 10)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 20 | 25 single-file accounting collections → folders | 2 | 2 | 4 | 8 |
| 21 | Capital vs lowercase collection-folder mix | 2 | 2 | 5 | 4 |
| 22 | tsc/vitest local-only in sandbox (TS6 stack overflow) | 1 | 1 | 5 | 2 |

## Phased plan

- **Sprint 1** (~5d): items 1, 5, 8, 9 (first 50), 18
- **Sprint 2** (~7d): items 4, 6, 10
- **Sprint 3** (~5d): items 2, 12
- **Sprint 4** (~10d): items 7, 11, 14, 15
- **Sprint 5+**: items 3, 13, 16, 17, 19, 20, 21

## Insights

- 2 critical items (1, 2) are *declared standards without implementation*.
- Architecture debt dominates (12 of 22). Vocabulary outpaced behavior.
- No security debt — banners trace to real implementations.
- One quick-win cluster (1+8+18) closes the loudest gaps in <1 sprint.

---

## Business-end backlog (front-of-house parity with accounting)

The accounting back-end has SOX controls, GL postings, audit trails,
segregation of duties, period locks, IFRS/ASC adapters. The front-of-house
**business surface has none of those equivalents** — orders, customers,
refunds, returns, sales pipeline are silent on lifecycle events and lack
the equivalent control rigor.

### 🔴 Critical business-end (priority ≥ 30)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 23 | **Orders collection emits zero lifecycle events** — `order:activated/shipped/completed/cancelled/refunded` not declared, not emitted, not handled by `gl-posting.service`. Every direct/marketplace sale silently bypasses the GL. | 5 | 5 | 2 | 40 |
| 24 | **No Refund / Credit-Memo collection** — only the `CreditMemo` type exists in `src/plugins/receivables/types.ts`; no Payload collection, no event, no GL handler. ASC 606 contract-liability adjustments unrecorded. | 5 | 5 | 3 | 30 |

### 🟠 High business-end (20-29)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 25 | **No three-way match** (PO ↔ receipt ↔ invoice) — vendor invoices auto-post without confirmation that the goods/services were received. P2P fraud risk. | 4 | 5 | 4 | 18 |
| 26 | **Customer onboarding has no KYC / credit-limit / sales-rep workflow** — Customers collection is master-data only; no validation hooks, no onboarding state machine. | 4 | 4 | 3 | 24 |
| 27 | **Vendor onboarding has no banking-info encryption, W-9/W-8 capture, OFAC screening** | 4 | 5 | 4 | 18 |
| 28 | **No tax-jurisdiction auto-lookup at order time** — rely on customer's stored taxRate; cross-border / nexus rules not applied. | 4 | 5 | 4 | 18 |

### 🟡 Medium business-end (10-19)

| # | Item | I | R | E | Score |
|---|---|---|---|---|---|
| 29 | **No Sales Pipeline domain** — Quotes / Opportunities / Leads collections absent; no quote-to-cash visibility | 4 | 3 | 4 | 14 |
| 30 | **No Returns / RMA collection** — RMA workflow + inventory-restock + GL reversal absent | 3 | 4 | 4 | 14 |
| 31 | **No Discounts / Promotions / Coupons collection** — pricing has no promotional layer | 3 | 3 | 3 | 18 |
| 32 | **No Shipments / Fulfillment / Tracking collection** — no carrier integration, tracking number storage | 3 | 3 | 3 | 18 |
| 33 | **No inventory availability / reserve / backorder logic** — items can be added to cart without stock check | 4 | 4 | 3 | 24 |
| 34 | **No CRM UI** — `src/components/crm/`, `src/components/sales/` don't exist | 3 | 2 | 4 | 10 |
| 35 | **No customer-facing portal** — self-service invoices, payments, subscriptions; customers have no login surface | 4 | 3 | 5 | 7 |
| 36 | **No business KPI dashboard** — MRR / ARR / churn / CAC / LTV references absent | 3 | 2 | 3 | 15 |
| 37 | **No marketing automation / drip campaigns / abandoned-cart emails** | 2 | 2 | 4 | 8 |
| 38 | **Customers / Vendors lack `auditTrailAfterChange`** — master-data changes silent on audit log | 3 | 3 | 1 | 30 |

### Phased plan addendum

- **Sprint 1B** (~3d): items 23, 24, 38 — wire Order/Refund GL pipeline + master-data audit trails
- **Sprint 2B** (~5d): items 25, 26, 27, 28 — control rigor on customer/vendor onboarding + three-way match + tax lookup
- **Sprint 3B+** (~10d): items 29-37 — net-new domains (CRM, RMA, shipments, customer portal, KPIs)

### Architectural pattern

The business-end follows the same blueprint already proven for the
accounting back-end (Slice ZZ-2 → Subscription lifecycle):

```
Business doc state change
        ↓
afterChange hook emits domain event (`order:activated`, `refund:issued`, …)
        ↓
glPostingService subscribes → posts double-entry via DebitCreditLogic
        ↓
journalEntryService.createEntry → validateBalancedEntry → durable
        ↓
auditTrailAfterChange → structured SOX §404 event
```

Replicate for: Orders, Refunds, CreditMemos, Returns, Shipments,
ThreeWayMatch, Quotes, Opportunities, Customer-onboarding-state-changes,
Vendor-onboarding-state-changes.
