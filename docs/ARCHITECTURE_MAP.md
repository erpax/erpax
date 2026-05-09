# erpax — full architecture map (accounting ↔ business merged)

> One page that ties every collection, hook, event, GL handler, generator,
> and standard together. Read top-to-bottom for the data-is-money path.

## 1. The five layers

```
┌──────────────────────────────────────────────────────────────────────┐
│                  L5  Documents & exports                              │
│  PDF (ISO-32000) · Excel (ISO/IEC-29500) · UBL (Peppol) · SAF-T XML   │
│  Statement: Trial Balance · Balance Sheet · Income Statement · CF     │
└────────────────────────────▲─────────────────────────────────────────┘
                             │
┌────────────────────────────┴─────────────────────────────────────────┐
│                  L4  Reports & UI                                     │
│  Analytics cards · Widgets · Modals · Admin tables · Customer portal  │
│  Dispatch: tenant.config.accounting.standard → IFRS / GAAP / ...      │
└────────────────────────────▲─────────────────────────────────────────┘
                             │
┌────────────────────────────┴─────────────────────────────────────────┐
│                  L3  GL Posting (event-driven)                        │
│  glPostingService subscribes to 18 domain events                      │
│  Validates double-entry via DebitCreditLogic.validateEntry            │
│  Resolves accounts via gl-account-resolver(role → tenant.glAccount)   │
└────────────────────────────▲─────────────────────────────────────────┘
                             │  emit
┌────────────────────────────┴─────────────────────────────────────────┐
│                  L2  Collections + hooks                              │
│  Each collection's afterChange emits domain events                    │
│  Each collection's beforeValidate / beforeChange enforces controls    │
│  (autoPopulateHost, autoPopulateCreatedBy, validateNotLocked,         │
│   enforceSegregationOfDuties, autoSetTimestamp, validateBalancedEntry)│
└────────────────────────────▲─────────────────────────────────────────┘
                             │
┌────────────────────────────┴─────────────────────────────────────────┐
│                  L1  Per-tenant config + cascade                      │
│  tenant.config = Payload-shaped sandbox (identity, localization,      │
│                  currency, accounting)                                 │
│  user.config = same shape, narrowed (presentation only)                │
│  Resolver: resolveRequestConfig(req) → ResolvedConfig (one cascade)   │
└──────────────────────────────────────────────────────────────────────┘
```

## 2. End-to-end flow per business application

### A) Quote-to-Cash (sales)

```
Customer master ──► Quote ──► Order ──► Invoice ──► Payment ──► Cash
   (KYC)              (TBD)     │          │           │
                                │          │           │
                       afterChange:        │           │
                       emitOrderLifecycleEvents       │
                                │          │           │
                       order:activated     │           │
                                │          │           │
                                ▼          │           │
                       glPostingService    │           │
                       postOrderActivated  │           │
                                │          │           │
                       Dr AR / Cr Revenue  │           │
                       Dr COGS / Cr Inv    │           │
                       Cr SalesTaxPayable  │           │
                                           │           │
                                  invoice:paid (Stripe webhook) ──► subscription:invoiced
                                                       │
                                              payment:received ──► glPostingService.postPaymentReceived
                                                                   Dr Cash / Cr AR
```

### B) Procure-to-Pay (purchasing)

```
Vendor master ──► PO ──► Receipt ──► Vendor Bill ──► Payment ──► Cash
   (W-9/W-8)       (TBD)    (TBD)         │             │
                                          │             │
                              bill:activated │
                                          │             │
                                          ▼             │
                              glPostingService          │
                              postBillActivated        │
                                          │             │
                              Dr Expense / Cr AP        │
                              Dr InputTaxAsset          │
                                                        │
                                              payment:sent ──► glPostingService.postPaymentSent
                                                               Dr AP / Cr Cash
```

### C) Subscription / SaaS

```
Plan ──► Subscription ──► Stripe webhook ──► Invoice ──► Payment
                │                    │            │
       afterChange:                  │            │
       emitSubscriptionLifecycleEvents          │
                │                                │
       subscription:activated                    │
                │                                │
                ▼                                │
       glPostingService                          │
       postSubscriptionActivated                 │
                │                                │
       Dr AR / Cr DeferredRevenue                │
                                                 │
                                  Stripe handleInvoicePaid emits
                                  subscription:invoiced
                                                 │
                                                 ▼
                                  glPostingService.postSubscriptionInvoiced
                                  Dr DeferredRevenue / Cr SubscriptionRevenue
                                  (IFRS 15 §35 / ASC 606-10-25-30)
```

### D) Inventory

```
Item master ──► Purchase ──► Stock movement ──► Sale ──► Stock movement
                  │              │                │           │
                  ▼              ▼                ▼           ▼
       inventory:purchased     (TBD)        inventory:sold  (TBD)
                  │                                │
                  ▼                                ▼
       glPostingService                 glPostingService
       postInventoryPurchased           postInventorySold
       Dr Inventory / Cr AP             Dr COGS / Cr Inventory
```

### E) Banking

```
camt.053 file ──► bank-statement-import.service ──► BankStatement ──► Reconciliation
                                                          │                    │
                                                          ▼                    ▼
                                            bank:statement:imported   bank:transaction:matched
                                                          │
                                                          ▼
                                            glPostingService
                                            postBankStatementImported
```

### F) Period close

```
Day-to-day GL postings ──► End of month ──► Period-end adjustments ──► Close → Lock
                                                       │                  │       │
                                                       ▼                  ▼       ▼
                                       PeriodEndAdjustments hook   FiscalPeriods hook
                                       enforceSegregationOfDuties  enforceSegregationOfDuties
                                       (preparer ≠ approver)        (closer ≠ creator)
                                                                    (locker ≠ closer)
                                                       │                          │
                                                       ▼                          ▼
                                       auditTrailAfterChange       auditTrailAfterChange
                                       SOX §404 evidence           SOX §404 period-close-integrity
```

## 3. The 18 domain events → GL coverage

| # | Event | Handler | Standard cited |
|---|---|---|---|
| 1 | invoice:activated | postInvoiceActivated | IFRS 15 / ASC 606 |
| 2 | invoice:completed | postInvoiceCompleted | IFRS 15 |
| 3 | invoice:reversed | postInvoiceReversed | IAS-8 |
| 4 | bill:activated | postBillActivated | IAS-1 |
| 5 | bill:paid | postBillPaid | IAS-7 / ASC 230 |
| 6 | bill:reversed | postBillReversed | IAS-8 |
| 7 | payment:received | postPaymentReceived | IAS-7 |
| 8 | payment:sent | postPaymentSent | IAS-7 |
| 9 | inventory:purchased | postInventoryPurchased | IAS-2 / ASC 330 |
| 10 | inventory:sold | postInventorySold | IAS-2 / ASC 330 |
| 11 | bank:statement:imported | postBankStatementImported | ISO-20022 camt.053 |
| 12 | subscription:activated | postSubscriptionActivated | IFRS 15 §31 / ASC 606-10-25 |
| 13 | subscription:invoiced | postSubscriptionInvoiced | IFRS 15 §35 / ASC 606-10-25-30 |
| 14 | subscription:cancelled | postSubscriptionCancelled | IFRS 15 §B47 / ASC 606-10-25-13 |
| 15 | subscription:refunded | postSubscriptionRefunded | IFRS 15 §B22 |
| 16 | order:activated | postOrderActivated | IFRS 15 §38b / ASC 606-10-25-30c |
| 17 | order:cancelled | postOrderCancelled | IAS-8 |
| 18 | order:refunded | postOrderRefunded | IFRS 15 §B22 |

## 4. The canonical hook factory toolkit

Every accounting/business collection composes from the same nine primitives:

| Hook (all in `src/hooks/`) | When | What |
|---|---|---|
| `autoPopulateHost` | beforeValidate | Set `data.tenant` from `req.user.tenants[0].tenant` |
| `autoPopulateCreatedBy` | beforeChange | Set `data.createdBy = req.user.id` on create |
| `autoSetTimestamp(field, condition)` | beforeChange | ISO-8601 timestamp on status transition |
| `enforceSegregationOfDuties(approver, creator)` | beforeChange | Throw if `approver === creator` (SOX §404 four-eyes) |
| `auditTrailAfterChange(slug)` | afterChange | Structured `req.payload.logger.info` audit event |
| `validateAddressHook(opts)` | beforeValidate | Country-format check via `address-formats.ts` |
| `validateBalancedEntry(opts)` | beforeValidate | Double-entry via `DebitCreditLogic.validateEntry` |
| `validateNotLocked` (in accounting/utilities) | beforeChange | Reject back-dated edits inside locked period |
| `<domain>:emit<Lifecycle>Events` | afterChange | Emit domain events to `eventEmitter` |

## 5. The seven canonical access predicates

In `src/plugins/auth/access.ts`:

| Predicate | What |
|---|---|
| `multiTenantRead` | Any authenticated user, tenant-scoped |
| `adminOnly` | Admin role required |
| `adminOrAccountant` | Admin OR accountant role |
| `tenantAdmin` | Tenant-scoped admin (delete operations) |
| `scopedAccess(where?)` | Tenant-scoped read with optional extra filter |
| `roleScopedAccess(...roles)` | Role-gated tenant-scoped write |
| `andAccess(...fns)` | AND combinator for layered access |

## 6. The four canonical field factories

In `src/plugins/accounting/fields/base-accounting-fields.ts`:

| Factory | What |
|---|---|
| `multiTenancyField()` | The `tenant` relationship to `tenants` collection |
| `glAccountField(required?)` | `glAccount` + denormalised `accountNumber` + `accountName` |
| `currencyField({name, defaultValue, required}?)` | ISO-4217 select, EUR-first / USD-last ordering |
| `auditFields()` | `createdBy` + `approvedBy` + `approvedAt` triplet |

## 7. The config cascade resolver

`src/utilities/tenant-context.ts` — `resolveRequestConfig(req)`:

```
1. user.config.<section>.<field>            (presentation only)
2. tenant.config.<section>.<field>           (legal/compliance + presentation)
3. tenant.config.identity.country → COUNTRY_PROFILES → derived
4. Deployment defaults (env / DEFAULT_*)
```

Returns one `ResolvedConfig` bundle: `{ country, locale, fallbackLocale,
dateFormat, reportingCurrency, displayCurrency, accountingStandard,
fiscalYearStartMonth, features, sources }`. Sources field tracks which
layer supplied each value (audit/debug).

## 8. Standard applications inventory

| Application | Collections | Hooks | Events | GL handlers | Status |
|---|---|---|---|---|---|
| **General Ledger** | GLAccounts, JournalEntries, GLPostings | full chain | 11 events | full | ✓ |
| **Sales (Quote-to-Cash)** | Quotes (TBD), Orders, Invoices, InvoiceLines, Payments | partial | 5 order events + 3 invoice events | wired | ✓ for Orders & Invoices |
| **Purchasing (P2P)** | POs (TBD), Vendor Bills (TBD), Payments | partial | bill events | wired | partial |
| **Inventory** | Items, FixedAssets | full | 2 events | wired | ✓ |
| **Subscriptions / SaaS** | SubscriptionPlans, Subscriptions | full | 4 events | wired | ✓ |
| **Customer Master** | Customers (Payload addresses for billing) | autoPopulateHost only | — | — | gaps in onboarding/KYC |
| **Vendor Master** | Vendors | autoPopulateHost only | — | — | gaps in W-9/W-8/banking |
| **Tax** | TaxCodes, TaxJurisdictions, TaxCalculations | full chain | — | — | needs per-country engine |
| **Multi-currency** | CurrencyRates | full chain | — | service | ✓ |
| **Banking** | BankStatements | full chain | 3 events | wired | ✓ |
| **Period Close** | FiscalPeriods, PeriodEndAdjustments | full chain + SoD | — | — | ✓ |
| **Financial Statements** | FinancialStatements (records) | full chain + SoD | — | generators in export/statements.ts | needs per-standard adapter |
| **Subscription Plans** | SubscriptionPlans | placeholder hooks/ folder | — | — | TBD |
| **Reporting / Export** | — | — | — | — | PDF/Excel ✓; UBL/SAF-T/pain.001 TBD |

## 9. Standards × implementation matrix

| Standard | Banner cites | Real impl | Status |
|---|---|---|---|
| ISO-19011 audit-trail | 128 | 8 collections + audit-trail hook | ✓ wired |
| SOX §404 internal-controls | 65 | SoD + period-lock + status-transition timestamps | ✓ wired |
| IFRS 15 / ASC 606 | (multi) | Subscriptions + Orders GL handlers | ✓ wired |
| IFRS IAS-2 / ASC 330 inventory | (multi) | Inventory events + COGS handler | ✓ wired |
| IFRS IAS-7 / ASC 230 cash flow | (multi) | Cash Flow Statement generator + Bank events | ✓ wired |
| ISO-4217 currency | 90 | currencyField + DEFAULT_CURRENCY cascade + isIso4217Currency | ✓ wired |
| ISO-3166-1 country | 26 | COUNTRY_PROFILES + getTenantDefaults | ✓ wired |
| BCP-47 locale | 44 | resolveRequestConfig.locale cascade | ✓ wired |
| ISO-19160 / UPU-S42 addressing | (multi) | address-formats + validator + hook | ✓ wired |
| ISO-32000 PDF | 1 | PDFExporter (Puppeteer) | ✓ wired |
| ISO/IEC-29500 OOXML xlsx | 1 | ExcelExporter (ExcelJS) | ✓ wired |
| EN-16931 / Peppol BIS / UBL | 28 | — | ✗ no XML serializer |
| OECD SAF-T 2.0 | 17 | — | ✗ no XML serializer |
| ISO-20022 pain.001 | 18 | — | ✗ no generator |
| WCAG-2.1 AA | 53 | — | ✗ zero `aria-*` attrs |
| GDPR Art.5 / Art.32 | 45 | tenant isolation + data minimisation in addressFormat | ✓ wired |
| PCI-DSS 4.0 | 20 | Stripe tokenization (no PAN stored) | ✓ wired |
| NIST SP-800-38D AES-GCM | (a few) | Subscription stripe-id encryption hooks | ✓ wired |

## 10. Where to read what

| Question | File |
|---|---|
| What's a tenant's currency / locale / accounting standard? | `src/utilities/tenant-context.ts` → `resolveRequestConfig(req)` |
| What are the supported currencies? | `src/config/regional-defaults.ts` → `SUPPORTED_CURRENCIES` |
| What's the address format for country X? | `src/config/address-formats.ts` → `getAddressFormat(country)` |
| What are the canonical accounting hooks? | `src/hooks/*` |
| What are the access predicates? | `src/plugins/auth/access.ts` |
| What are the canonical field factories? | `src/plugins/accounting/fields/base-accounting-fields.ts` |
| What domain events exist? | `src/types/events.ts` → `AllDomainEvents` union |
| What GL postings happen per event? | `src/services/gl-posting.service.ts` |
| How is double-entry validated? | `src/plugins/accounting/debit-credit.ts` |
| How are journal entries persisted? | `src/services/journal-entry.service.ts` |
| What's the open tech-debt? | `docs/TECH_DEBT.md` |
| What standards are cited where? | `docs/STANDARDS_INDEX.md` (auto-generated) |
