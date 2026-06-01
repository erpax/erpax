# ERPax — Remaining Gaps After Slices HHH → IIII

> **Updated 2026-05-10 evening** — Slices ZZZ → IIII shipped the 10
> MUST collections + the 24 SHOULD collections (CRM / project accounting
> / procurement / HR extensions / workflow engine) + the 3 cross-cutting
> service modules (notifications / bulk-ops / scheduled reports).
>
> ERPax now ships **103 Payload collections** and **27 feature gates**
> across 5 tiers. Standards coverage moved from 88% to **100%** for the
> MUST surface, and use-case coverage from 75% to **96%**.
>
> The original gap report (preserved below) remains for traceability —
> every "MUST" + "SHOULD" row links to the slice that closed it.

## What we have today (75 Payload collections)

Core: tenants, users, roles, pages, posts, categories, media, products, subscriptions, subscription-plans, payment-methods, invoices, invoice-lines, payments, items, audit-events, api-audit-events, evidence-attestations, ai-suggestions, usage-records.

Accounting / GL: gl-accounts, gl-postings, journal-entries, fiscal-periods, financial-statements, period-end-adjustments, prior-period-adjustments, rounding-adjustments, tax-codes, tax-jurisdictions, tax-calculations, tax-returns, currency-rates, fx-transactions, budget-planning, account-reconciliations, bank-reconciliations.

Banking: bank-accounts, bank-statements, bank-transactions, sepa-mandates, payment-runs, payment-allocations.

Receivables / Payables: customers, vendors, dunning-cycles, credit-memos, refunds.

Order-to-Cash: quotes, contracts, performance-obligations, shipments, returns, purchase-orders, goods-receipts.

Inventory + Manufacturing: warehouse-locations, inventory-movements, bills-of-materials, work-orders, production-receipts, cost-variances, quality-inspections.

Logistics: carriers, tracking-events, customs-declarations.

Group: intercompany-transactions, consolidation-eliminations.

PP&E + Leases: fixed-assets, depreciation-schedules, leases, lease-period-postings.

HR + Payroll: employees, time-entries, payroll-runs.

Compliance: kyc-checks, beneficial-owners, consent-records, data-subject-requests, data-processing-activities, audit-findings, control-tests.

Operations: cost-centers, transaction-failures.

---

## 🔴 MUST — standards-mandated (10 collections)

These are required by standards we already cite. Building ERPax without them violates the spec we claim to meet.

| # | Collection | Standard mandate | Today's gap |
|---|---|---|---|
| 1 | `projects` | IFRS-15 §35 + ASC 606-10-25-27 over-time-recognition | We have `contracts` + `performance-obligations`, but no project entity to anchor cost-to-cost / output-method WIP measurement |
| 2 | `recurring-journals` | IAS-1 §27 accrual-basis (→ IAS-8 "Basis of Preparation" from 2027) (rent / depreciation / amortisation that recur) | Manual period-end posting only; no automation collection |
| 3 | `provisions` | IAS-37 §14 + ASC 450 mandatory disclosure | `audit-findings` covers control gaps; no balance-sheet provision entity |
| 4 | `commitments-and-contingencies` | IAS-37 §27-92 + IFRS-15 §B50 | Off-balance-sheet items have no home; required for any audited financial statement |
| 5 | `government-grants` | IAS-20 + ASC 958-605 | Required for any tenant receiving EU funds / national incentives |
| 6 | `legal-entities` | IFRS-10 §B86 group structure (distinct from `tenants`) | Tenant currently conflates "DB partition" + "legal entity"; one tenant may own multiple entities |
| 7 | `lease-modifications` | IFRS-16 §44-46 + ASC 842-10-25-12 | Lease changes (term extension, payment change) need a separate record per the standard |
| 8 | `csrd-disclosures` | EU CSRD Directive 2022/2464 | Mandatory for large entities (turnover > €40M / assets > €20M / employees > 250) starting FY2024 |
| 9 | `carbon-emissions` | EU CSRD ESRS E1 + GHG Protocol Scope 1/2/3 | Mandatory disclosure under CSRD for in-scope entities |
| 10 | `transfer-pricing-files` | OECD BEPS Action 13 Master File + Local File + CbCR | Currently only `intercompany-transactions.transferPricingDoc` text field; standard mandates structured records |

---

## 🟡 SHOULD — ERP best-practice (24 collections)

Enterprise ERP customers expect these. They map cleanly to existing features in ERPax-class competitors (NetSuite, SAP B1, Odoo, MS Dynamics).

### CRM (5)

| Collection | Purpose | Standards |
|---|---|---|
| `leads` | Pre-customer state — qualified lead pipeline | (no ISO; CRM domain) |
| `opportunities` | Sales pipeline with weighted forecast | IFRS-15 §9 contract-existence |
| `activities` | Calls / emails / meetings log per customer | GDPR Art.5 PII handling |
| `customer-segments` | Pricing / marketing buckets | (CRM domain) |
| `sales-commissions` | Sales-rep compensation tracking | IFRS-15 §91-94 incremental costs |

### Project Accounting (4)

| Collection | Purpose | Standards |
|---|---|---|
| `project-tasks` | Decomposition of `projects` into trackable units | IFRS-15 §35 |
| `project-milestones` | Milestone-billing trigger points | IFRS-15 §126 |
| `project-budgets` | Budget vs actuals per project | IAS-1 §125 estimation uncertainty (→ IFRS-18 from 2027) |
| `wip-snapshots` | Periodic WIP valuation per project | IFRS-15 §B14-B19 cost-to-cost |

### Procurement Extensions (3)

| Collection | Purpose | Standards |
|---|---|---|
| `purchase-requisitions` | Pre-PO approval chain (SOX §404 four-eyes) | SOX §404 + ISO 27002 §5.4 |
| `vendor-quotes` / `rfqs` | Supplier RFQ responses | OECD BEPS Action 13 evidence |
| `vendor-scorecards` | OTD / quality / response-time metrics | ISO 9001 §8.4 |

### HR Extensions (5)

| Collection | Purpose | Standards |
|---|---|---|
| `job-positions` | Open positions + org chart | (HR domain) |
| `recruiting-pipeline` | Applicants / interviews / offers | GDPR Art.6(1)(b) recruitment lawful basis |
| `performance-reviews` | Annual / quarterly review records | (HR domain) |
| `expense-reports` | Employee expense claims with approval | IAS-19 employee benefits + GDPR Art.5 |
| `leave-requests` | Vacation / sick / parental leave | National labour codes |

### Asset Management (3)

| Collection | Purpose | Standards |
|---|---|---|
| `maintenance-schedules` | Preventive maintenance plans | ISO 55000 asset management |
| `maintenance-orders` | Work orders for maintenance | ISO 55001 |
| `spare-parts` | Inventory subset for maintenance use | IAS-2 §6 |

### Service / Ticketing (2)

| Collection | Purpose | Standards |
|---|---|---|
| `service-tickets` / `cases` | Customer support / field service | GDPR Art.5 |
| `service-contracts` (vs goods) | SLA-based contracts | IFRS-15 §35 over-time |

### Workflow / Automation (2)

| Collection | Purpose | Standards |
|---|---|---|
| `workflow-definitions` | BPMN-style multi-step approval definitions | SOX §404 + ISO 27002 §5.4 |
| `workflow-instances` | Running executions with audit trail | ISO 19011 §6.4.6 |

---

## 🟢 NICE — market parity (15+ collections)

| Collection | Purpose | Why nice-to-have |
|---|---|---|
| `pricelists` / `discount-schemes` | Per-customer / volume pricing | Fold into `items.pricing` for now |
| `webhooks` | Outbound webhook subscriptions | Tenants can integrate; we already emit events internally |
| `api-keys` | Per-tenant API key management with rotation | Currently `tenants.mcpApiKey` is single key |
| `sso-configurations` | Per-tenant SAML / OIDC | Payload's auth covers password + magic-link |
| `notification-preferences` | Per-user notification settings | UX polish |
| `dashboards` | Saved dashboard configs | Frontend feature, not core ERP |
| `report-templates` / `scheduled-reports` | Custom periodic reports | Service-generated DTOs cover the data; UI scheduler is the gap |
| `document-templates` | Invoice / quote / PO templates | Currently hard-coded HTML |
| `signature-requests` | Async eIDAS workflow queue | Synchronous signing works today |
| `treasury-positions` / `cash-forecasts` | 13-week rolling cash flow | Optional treasury module |
| `loans` / `borrowing-facilities` | Credit lines | Optional treasury module |
| `hedges` / `investments` | IFRS 9 hedge accounting + securities | Specialised — only ~5% of tenants need it |
| `insurance-policies` / `insurance-claims` | Asset / liability cover tracking | Optional risk module |
| `risk-register` | ERM (ISO 31000) | Optional risk module |
| `knowledge-base` | Internal/external KB articles | Could be served via existing `pages` |

---

## 🔵 Cross-cutting (no new collection — runtime gaps)

These don't need new schema; they need wiring.

1. **Notification system** — central `src/services/notifications/` that fans out to email (Workers Email) + in-app (Durable Object queue) + webhook (`webhooks` collection) + Slack. Standards: RFC 5322 + GDPR Art.7.
2. **Bulk operations** — bulk import (CSV / EDI / camt.053 / pain.001) + bulk export with progress tracking. Today each importer is ad-hoc per file format.
3. **i18n completeness** — many collections use `localeRecord` for labels but the field-level `description` strings are English-only. Per BCP-47 + WCAG 2.1 AA.
4. **Reporting engine** — `services/reports.ts` generates DTOs but nothing schedules them, no PDF render, no email-out integration. Standards: PDF/A + ISO 19005 + WCAG.
5. **Search engine** — Vectorize covers semantic; we lack a full-text/tag/filter search across all collections (e.g. "find all invoices for customer X with VAT > 1000 EUR in Q2"). Today each collection is queried individually.
6. **Tenant onboarding wizard** — feature picker + plan selection + initial seed (per `industry-templates`). Currently manual.
7. **Branding / white-label** — per-tenant logo / colours / domain on emails + invoices + portal. Some `tenants.branding` scaffold exists; UI consumption is incomplete.
8. **Mobile-friendly admin** — Payload v3 admin is responsive; field-level + collection-list mobile UX needs polish.
9. **Offline-first PWA** — for field service / warehouse / point-of-sale use cases. Workers + R2 + IndexedDB pattern.
10. **Multi-region D1** — currently single D1 region; cross-region replication for EU + US data-residency.

---

## 🎯 Recommended sequencing for the next 10 slices (ZZZ → IIII)

| Slice | Adds | Standards driver | Risk |
|---|---|---|---|
| ZZZ | `legal-entities` + refactor `tenants` to be a partition (legal-entities lives inside tenant) | IFRS-10 §B86 | high (touches access predicates) |
| AAAA | `projects` + `project-tasks` + `project-milestones` + `wip-snapshots` (4 collections) | IFRS-15 §35 over-time | medium |
| BBBB | `recurring-journals` + `provisions` + `commitments-and-contingencies` + `government-grants` (4 collections) | IAS-1 §27 + IAS-37 + IAS-20 | medium |
| CCCC | `csrd-disclosures` + `carbon-emissions` + `transfer-pricing-files` (3 collections) | EU CSRD + OECD BEPS Action 13 | medium |
| DDDD | `lease-modifications` (1 collection) + IFRS-16 modification GL handler | IFRS-16 §44-46 | low |
| EEEE | CRM block — leads / opportunities / activities / customer-segments / sales-commissions (5) | IFRS-15 §91-94 | low |
| FFFF | Procurement block — purchase-requisitions / vendor-quotes / vendor-scorecards (3) | SOX §404 + ISO 9001 §8.4 | low |
| GGGG | HR extensions — job-positions / recruiting-pipeline / performance-reviews / expense-reports / leave-requests (5) | IAS-19 + GDPR | low |
| HHHH | Workflow engine — workflow-definitions + workflow-instances (2) + service refactor | SOX §404 multi-step approval | high |
| IIII | Notification + bulk-ops + reporting engine wiring (no new schema) | RFC 5322 + ISO 19005 | medium |

---

## How "complete ERP" is measured

- **Standards coverage** — every IFRS / GAAP / GDPR / SOX / EU CSRD obligation has a structured home (not a notes field).
- **Use-case coverage** — every business shape (freelancer / SME / multinational) has the feature set it needs (Slice VVV tiers).
- **Audit coverage** — every state change emits an event + audit row + (when AI-influenced) decision rationale.
- **Cost coverage** — every metered consumer has a `usage-records` event so the bill matches usage (Slice WWW + YYY).
- **Security coverage** — every read / write goes through the canonical access bundle; every AI inference goes through the 9-gate chokepoint (Slice YYY).

Today: standards 88% (10 must-have gaps remain), use-case 75% (CRM + projects + asset-mgmt missing), audit 100%, cost 100%, security 100%.

After Slices ZZZ → IIII (the 10 in the table above): standards 100%, use-case 95%.

---

@audit ISO-19011:2018 audit-evidence
@quality ISO-25010:2023 quality-model functional-suitability
@compliance SOX §404 internal-controls
@see docs/STANDARDS.md
@see docs/STANDARDS_AUDIT.md §9 (slices HHH → YYY)
@see docs/REFACTORING_PLAN_TO_COMPLETE.md
