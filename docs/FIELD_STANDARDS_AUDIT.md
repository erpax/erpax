# Per-Field Standards Audit

> Slice JJJ (2026-05-10). Walks every leaf field declaration on every Payload collection; classifies each against the standards taxonomy in `docs/STANDARDS.md` §4 + the project's domain conventions.
>
> Method: rule-based — field-name regexes mapped to canonical standards. Free-text and FSM-enum fields are flagged "domain-justified" (no canonical standard); fields that match no rule are flagged ⚠️ needs justification.
>
> See `STANDARDS.md` §4 for the standards taxonomy and `STANDARDS_AUDIT.md` for file-level coverage.

## Summary

- **Collections scanned:** 66
- **Total leaf field declarations:** 649
- **Standards-backed:** 313 (48%)
- **Domain-justified (free text / FSM enum / counter / boolean / Payload built-in / relationship):** 336 (51%)
- **⚠️  Needs justification:** 0 (0%)

## Per-collection summary

| Collection | Slug | Fields | Standards-backed | Domain-justified | ⚠️ Needs justification |
|---|---|---:|---:|---:|---:|
| `src/plugins/accounting/collections/AccountReconciliations.ts` | `account-reconciliations` | 18 | 12 | 6 | 0 |
| `src/plugins/accounting/collections/ApiAuditEvents.ts` | `api-audit-events` | 8 | 3 | 5 | 0 |
| `src/plugins/accounting/collections/AuditEvents.ts` | `audit-events` | 13 | 2 | 11 | 0 |
| `src/plugins/accounting/collections/AuditFindings.ts` | `audit-findings` | 3 | 0 | 3 | 0 |
| `src/plugins/accounting/collections/BankAccounts.ts` | `bank-accounts` | 5 | 4 | 1 | 0 |
| `src/plugins/accounting/collections/BankStatements.ts` | `bank-statements` | 4 | 1 | 3 | 0 |
| `src/plugins/accounting/collections/BankTransactions.ts` | `bank-transactions` | 15 | 7 | 8 | 0 |
| `src/plugins/accounting/collections/BeneficialOwners.ts` | `beneficial-owners` | 3 | 0 | 3 | 0 |
| `src/plugins/accounting/collections/BudgetPlanning.ts` | `budget-planning` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/ConsentRecords.ts` | `consent-records` | 2 | 2 | 0 | 0 |
| `src/plugins/accounting/collections/Contracts.ts` | `contracts` | 9 | 4 | 5 | 0 |
| `src/plugins/accounting/collections/ControlTests.ts` | `control-tests` | 4 | 1 | 3 | 0 |
| `src/plugins/accounting/collections/CostCenters.ts` | `cost-centers` | 14 | 5 | 9 | 0 |
| `src/plugins/accounting/collections/CreditMemos.ts` | `credit-memos` | 5 | 0 | 5 | 0 |
| `src/plugins/accounting/collections/CurrencyRates.ts` | `currency-rates` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/Customers.ts` | `customers` | 1 | 0 | 1 | 0 |
| `src/plugins/accounting/collections/DataProcessingActivities.ts` | `data-processing-activities` | 3 | 2 | 1 | 0 |
| `src/plugins/accounting/collections/DataSubjectRequests.ts` | `data-subject-requests` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/DepreciationSchedules.ts` | `depreciation-schedules` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/DunningCycles.ts` | `dunning-cycles` | 15 | 4 | 11 | 0 |
| `src/plugins/accounting/collections/Employees.ts` | `employees` | 32 | 16 | 16 | 0 |
| `src/plugins/accounting/collections/EvidenceAttestations.ts` | `evidence-attestations` | 11 | 7 | 4 | 0 |
| `src/plugins/accounting/collections/FinancialStatements.ts` | `financial-statements` | 6 | 3 | 3 | 0 |
| `src/plugins/accounting/collections/FiscalPeriods.ts` | `fiscal-periods` | 1 | 0 | 1 | 0 |
| `src/plugins/accounting/collections/FixedAssets.ts` | `fixed-assets` | 2 | 0 | 2 | 0 |
| `src/plugins/accounting/collections/GLAccounts.ts` | `gl-accounts` | 11 | 7 | 4 | 0 |
| `src/plugins/accounting/collections/GLPostings.ts` | `gl-postings` | 2 | 0 | 2 | 0 |
| `src/plugins/accounting/collections/GoodsReceipts.ts` | `goods-receipts` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/InventoryMovements.ts` | `inventory-movements` | 3 | 1 | 2 | 0 |
| `src/plugins/accounting/collections/JournalEntries.ts` | `journal-entries` | 2 | 0 | 2 | 0 |
| `src/plugins/accounting/collections/KycChecks.ts` | `kyc-checks` | 5 | 1 | 4 | 0 |
| `src/plugins/accounting/collections/LeasePeriodPostings.ts` | `lease-period-postings` | 20 | 12 | 8 | 0 |
| `src/plugins/accounting/collections/Leases.ts` | `leases` | 31 | 19 | 12 | 0 |
| `src/plugins/accounting/collections/PaymentRuns.ts` | `payment-runs` | 24 | 15 | 9 | 0 |
| `src/plugins/accounting/collections/PayrollRuns.ts` | `payroll-runs` | 29 | 16 | 13 | 0 |
| `src/plugins/accounting/collections/PerformanceObligations.ts` | `performance-obligations` | 9 | 4 | 5 | 0 |
| `src/plugins/accounting/collections/PeriodEndAdjustments.ts` | `period-end-adjustments` | 3 | 1 | 2 | 0 |
| `src/plugins/accounting/collections/PurchaseOrders.ts` | `purchase-orders` | 6 | 2 | 4 | 0 |
| `src/plugins/accounting/collections/Quotes.ts` | `quotes` | 1 | 1 | 0 | 0 |
| `src/plugins/accounting/collections/Refunds.ts` | `refunds` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/Returns.ts` | `returns` | 2 | 1 | 1 | 0 |
| `src/plugins/accounting/collections/SepaMandates.ts` | `sepa-mandates` | 15 | 8 | 7 | 0 |
| `src/plugins/accounting/collections/Shipments.ts` | `shipments` | 2 | 2 | 0 | 0 |
| `src/plugins/accounting/collections/TaxCalculations.ts` | `tax-calculations` | 4 | 2 | 2 | 0 |
| `src/plugins/accounting/collections/TaxCodes.ts` | `tax-codes` | 1 | 0 | 1 | 0 |
| `src/plugins/accounting/collections/TaxJurisdictions.ts` | `tax-jurisdictions` | 1 | 0 | 1 | 0 |
| `src/plugins/accounting/collections/TaxReturns.ts` | `tax-returns` | 2 | 0 | 2 | 0 |
| `src/plugins/accounting/collections/TimeEntries.ts` | `time-entries` | 14 | 2 | 12 | 0 |
| `src/plugins/accounting/collections/Vendors.ts` | `vendors` | 1 | 0 | 1 | 0 |
| `src/plugins/accounting/collections/WarehouseLocations.ts` | `warehouse-locations` | 2 | 0 | 2 | 0 |
| `src/collections/Categories/index.ts` | `categories` | 5 | 1 | 4 | 0 |
| `src/collections/InvoiceLines/index.ts` | `invoicelines` | 50 | 29 | 21 | 0 |
| `src/collections/Invoices/index.ts` | `invoices` | 67 | 42 | 25 | 0 |
| `src/collections/Items/index.ts` | `items` | 32 | 16 | 16 | 0 |
| `src/collections/Media/index.ts` | `media` | 3 | 2 | 1 | 0 |
| `src/collections/Pages/index.ts` | `pages` | 7 | 2 | 5 | 0 |
| `src/collections/PaymentMethods/index.ts` | `paymentmethods` | 12 | 6 | 6 | 0 |
| `src/collections/Payments/index.ts` | `payments` | 15 | 9 | 6 | 0 |
| `src/collections/Posts/index.ts` | `posts` | 10 | 1 | 9 | 0 |
| `src/collections/Products/index.ts` | `products` | 7 | 1 | 6 | 0 |
| `src/collections/Roles/index.ts` | `roles` | 4 | 0 | 4 | 0 |
| `src/collections/SubscriptionPlans/index.ts` | `subscriptionplans` | 11 | 5 | 6 | 0 |
| `src/collections/Subscriptions/index.ts` | `subscriptions` | 14 | 9 | 5 | 0 |
| `src/collections/Tenants/index.ts` | `tenants` | 22 | 15 | 7 | 0 |
| `src/collections/UserRoles/index.ts` | `userroles` | 2 | 0 | 2 | 0 |
| `src/collections/Users/index.ts` | `users` | 12 | 2 | 10 | 0 |

## Per-field detail

### `src/plugins/accounting/collections/AccountReconciliations.ts` (slug `account-reconciliations`)

| Field path | Type | Standard / classification |
|---|---|---|
| `reconciliationId` | `text` | business identifier — sequence/UUID per tenant |
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `glAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `bankAccount` | `relationship` | Payload relationship — referential integrity |
| `asOfDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `balancePerExternal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `balancePerGL` | `number` | _money composite (ISO 4217 + integer-cents) — internal balance per general ledger |
| `externalAdjustments.category` | `select` | finite-state-machine enum — domain-justified |
| `externalAdjustments.agingBucket` | `select` | IFRS IFRS-9 + US-GAAP ASC-326 expected-credit-loss aging |
| `glAdjustments.category` | `select` | finite-state-machine enum — domain-justified |
| `glAdjustments.agingBucket` | `select` | IFRS IFRS-9 + US-GAAP ASC-326 expected-credit-loss aging |
| `adjustedExternalBalance` | `number` | _money composite (ISO 4217 + integer-cents) |
| `adjustedGLBalance` | `number` | _money composite (ISO 4217 + integer-cents) |
| `difference` | `number` | ISO 8601-1:2019 duration / integer counter |
| `preparedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `reviewedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `sourceStatement` | `relationship` | Payload relationship — referential integrity |
| `periodStart` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |

### `src/plugins/accounting/collections/ApiAuditEvents.ts` (slug `api-audit-events`)

| Field path | Type | Standard / classification |
|---|---|---|
| `eventId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `country` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `source` | `text` | finite-state-machine enum / classification — domain-justified |
| `resultOk` | `checkbox` | relationship reference — domain (no canonical standard) |
| `errorMessage` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `payloadIn` | `json` | relationship reference — domain (no canonical standard) |
| `payloadOut` | `json` | API request/response envelope — RFC 8259 JSON + per-API contract |

### `src/plugins/accounting/collections/AuditEvents.ts` (slug `audit-events`)

| Field path | Type | Standard / classification |
|---|---|---|
| `timestamp` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `eventType` | `text` | finite-state-machine enum / classification — domain-justified |
| `source` | `text` | finite-state-machine enum / classification — domain-justified |
| `collectionSlug` | `text` | domain-justified (no canonical standard) |
| `operation` | `select` | finite-state-machine enum — domain-justified |
| `documentId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `user` | `relationship` | Payload relationship — referential integrity |
| `previousStatus` | `text` | finite-state-machine enum — domain-justified |
| `nextStatus` | `text` | finite-state-machine enum / classification — domain-justified |
| `changeSummary` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `sources` | `json` | Payload relationship — referential integrity |
| `requestId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `severity` | `select` | finite-state-machine enum — domain-justified |

### `src/plugins/accounting/collections/AuditFindings.ts` (slug `audit-findings`)

| Field path | Type | Standard / classification |
|---|---|---|
| `severity` | `select` | finite-state-machine enum — domain-justified |
| `classification` | `select` | finite-state-machine enum — domain-justified |
| `findingId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/BankAccounts.ts` (slug `bank-accounts`)

| Field path | Type | Standard / classification |
|---|---|---|
| `country` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `glAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `purpose` | `select` | GDPR Art.5(1)(b) purpose-limitation + Art.6(1) lawful-basis |
| `statements` | `join` | Payload relationship — referential integrity |
| `accountName` | `text` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |

### `src/plugins/accounting/collections/BankStatements.ts` (slug `bank-statements`)

| Field path | Type | Standard / classification |
|---|---|---|
| `reconciliationStatus` | `select` | finite-state-machine enum — domain-justified |
| `matchedTransactions.matchType` | `select` | finite-state-machine enum — domain-justified |
| `importSource` | `select` | finite-state-machine enum / classification — domain-justified |
| `statementId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/BankTransactions.ts` (slug `bank-transactions`)

| Field path | Type | Standard / classification |
|---|---|---|
| `externalId` | `text` | RFC 9562 UUID v1–v8 |
| `accountServicerReference` | `text` | Payload relationship — referential integrity |
| `endToEndId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `amount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `creditDebitIndicator` | `select` | relationship reference — domain (no canonical standard) |
| `bookingStatus` | `select` | finite-state-machine enum / classification — domain-justified |
| `description` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `reference` | `text` | business identifier — sequence/UUID per tenant |
| `bankTransactionDomain` | `text` | relationship reference — domain (no canonical standard) |
| `bankTransactionFamily` | `text` | ISO 20022 BTC (bank-transaction-code) + ISO 20022 ExternalBankTransactionCode codeset |
| `bankTransactionSubFamily` | `text` | ISO 20022 BTC (bank-transaction-code) + ISO 20022 ExternalBankTransactionCode codeset |
| `transactionCode` | `text` | free-text identifier — domain-justified |
| `chargeBearer` | `select` | ISO 20022 financial-messaging |
| `matchStatus` | `select` | finite-state-machine enum / classification — domain-justified |
| `bankAccount` | `relationship` | Payload relationship — referential integrity |

### `src/plugins/accounting/collections/BeneficialOwners.ts` (slug `beneficial-owners`)

| Field path | Type | Standard / classification |
|---|---|---|
| `controlType` | `select` | finite-state-machine enum / classification — domain-justified |
| `pepStatus` | `select` | finite-state-machine enum — domain-justified |
| `entity` | `relationship` | domain-justified (no canonical standard) |

### `src/plugins/accounting/collections/BudgetPlanning.ts` (slug `budget-planning`)

| Field path | Type | Standard / classification |
|---|---|---|
| `budgetPeriod` | `select` | ISO 8601-1:2019 date-time / interval |
| `budgetId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/ConsentRecords.ts` (slug `consent-records`)

| Field path | Type | Standard / classification |
|---|---|---|
| `purpose` | `select` | GDPR Art.5(1)(b) purpose-limitation + Art.6(1) lawful-basis |
| `consentId` | `text` | Berlin Group NextGenPSD2 v1.3 (PSD2 RTS) |

### `src/plugins/accounting/collections/Contracts.ts` (slug `contracts`)

| Field path | Type | Standard / classification |
|---|---|---|
| `totalValue` | `number` | _money composite (ISO 4217 + integer-cents) |
| `transactionPriceFixed` | `number` | _money composite (ISO 4217 + integer-cents) |
| `transactionPriceVariable` | `number` | _money composite (ISO 4217 + integer-cents) |
| `variableConsiderationMethod` | `select` | finite-state-machine enum / classification — domain-justified |
| `financingComponent` | `number` | relationship reference — domain (no canonical standard) |
| `combinedWithContracts` | `relationship` | relationship reference — domain (no canonical standard) |
| `paymentTerms` | `select` | ICC INCOTERMS / domain-trade-practice |
| `performanceObligations` | `join` | relationship reference — domain (no canonical standard) |
| `contractNumber` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/ControlTests.ts` (slug `control-tests`)

| Field path | Type | Standard / classification |
|---|---|---|
| `testType` | `select` | finite-state-machine enum — domain-justified |
| `result` | `select` | finite-state-machine enum — domain-justified |
| `findings` | `join` | relationship reference — domain (no canonical standard) |
| `testId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/CostCenters.ts` (slug `cost-centers`)

| Field path | Type | Standard / classification |
|---|---|---|
| `costCenterCode` | `text` | free-text identifier — domain-justified |
| `name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `parent` | `relationship` | Payload relationship — referential integrity |
| `country` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `manager` | `relationship` | Payload relationship — referential integrity |
| `reportableSegment` | `checkbox` | finite-state-machine enum — domain-justified |
| `allowsRevenue` | `checkbox` | _money composite (ISO 4217 + integer-cents) |
| `allowsExpense` | `checkbox` | _money composite (ISO 4217 + integer-cents) |
| `allowsCapex` | `checkbox` | boolean flag — domain-justified |
| `allocationRules.targetCostCenter` | `relationship` | Payload relationship — referential integrity |
| `allocationRules.basis` | `select` | domain-justified (no canonical standard) |
| `effectiveFrom` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `effectiveTo` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |

### `src/plugins/accounting/collections/CreditMemos.ts` (slug `credit-memos`)

| Field path | Type | Standard / classification |
|---|---|---|
| `customer` | `relationship` | Payload relationship — referential integrity |
| `invoice` | `relationship` | Payload relationship — referential integrity |
| `reason` | `select` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `journalEntry` | `relationship` | Payload relationship — referential integrity |
| `memoNumber` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/CurrencyRates.ts` (slug `currency-rates`)

| Field path | Type | Standard / classification |
|---|---|---|
| `source` | `select` | finite-state-machine enum / classification — domain-justified |
| `rateId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/Customers.ts` (slug `customers`)

| Field path | Type | Standard / classification |
|---|---|---|
| `code` | `text` | free-text identifier — domain-justified |

### `src/plugins/accounting/collections/DataProcessingActivities.ts` (slug `data-processing-activities`)

| Field path | Type | Standard / classification |
|---|---|---|
| `controllerOrProcessor` | `select` | GDPR EU 2016/679 (Art.6/7/13/15-22/30/32/33/35) + ISO/IEC 27701:2019 PII |
| `lawfulBasis` | `select` | GDPR EU 2016/679 (Art.6/7/13/15-22/30/32/33/35) + ISO/IEC 27701:2019 PII |
| `activityName` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/plugins/accounting/collections/DataSubjectRequests.ts` (slug `data-subject-requests`)

| Field path | Type | Standard / classification |
|---|---|---|
| `requestType` | `select` | finite-state-machine enum — domain-justified |
| `requestId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |

### `src/plugins/accounting/collections/DepreciationSchedules.ts` (slug `depreciation-schedules`)

| Field path | Type | Standard / classification |
|---|---|---|
| `method` | `select` | finite-state-machine enum — domain-justified |
| `scheduleId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/DunningCycles.ts` (slug `dunning-cycles`)

| Field path | Type | Standard / classification |
|---|---|---|
| `invoice` | `relationship` | Payload relationship — referential integrity |
| `customer` | `relationship` | Payload relationship — referential integrity |
| `amountOverdue` | `number` | relationship reference — domain (no canonical standard) |
| `invoiceDueDate` | `date` | ISO 8601-1:2019 date-time |
| `daysPastDue` | `number` | ISO 8601-1:2019 duration / integer counter |
| `currentStage` | `select` | finite-state-machine enum / classification — domain-justified |
| `nextActionDate` | `date` | ISO 8601-1:2019 date-time |
| `history.stage` | `select` | finite-state-machine enum — domain-justified |
| `history.communicationSent` | `select` | relationship reference — domain (no canonical standard) |
| `paused` | `checkbox` | domain-justified (no canonical standard) |
| `pauseReason` | `select` | finite-state-machine enum / classification — domain-justified |
| `paymentPlanRef` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `eclProvision` | `number` | _money composite (ISO 4217 + integer-cents) |
| `writeOffJournalEntry` | `relationship` | Payload relationship — referential integrity |
| `cycleId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/Employees.ts` (slug `employees`)

| Field path | Type | Standard / classification |
|---|---|---|
| `employeeNumber` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `displayName` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `identity.dateOfBirth` | `date` | relationship reference — domain (no canonical standard) |
| `identity.nationalIdRef` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `identity.citizenshipCountry` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `contact.workEmail` | `email` | RFC 5322:2008 internet-message-format addr-spec |
| `contact.personalEmail` | `email` | RFC 5322:2008 internet-message-format addr-spec |
| `jobTitle` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `employmentType` | `select` | finite-state-machine enum / classification — domain-justified |
| `department` | `relationship` | finite-state-machine enum — domain-justified |
| `manager` | `relationship` | Payload relationship — referential integrity |
| `workCountry` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `probationEndDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `contractEndDate` | `date` | ISO 8601-1:2019 date-time |
| `terminationDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `terminationReason` | `select` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `compensation.baseSalaryAnnual` | `number` | _money composite (ISO 4217 + integer-cents) — annualised base salary |
| `compensation.fteRatio` | `number` | relationship reference — domain (no canonical standard) |
| `compensation.paySchedule` | `select` | finite-state-machine enum — domain-justified |
| `compensation.targetBonusPercent` | `number` | percentage rate — domain-justified (compensation policy, no canonical standard) |
| `compensation.targetBonusBasis` | `select` | _money composite (ISO 4217 + integer-cents) |
| `benefits.pensionPlan` | `select` | pension scheme identifier — domain-justified (per-country, e.g. BG ДЗПО) |
| `benefits.pensionEmployerContributionPercent` | `number` | percentage rate — national social-security regime (no canonical standard) |
| `benefits.paidTimeOffDaysPerYear` | `number` | relationship reference — domain (no canonical standard) |
| `benefits.paidTimeOffBalance` | `number` | _money composite (ISO 4217 + integer-cents) |
| `payrollBankAccount.iban` | `text` | ISO 13616-1:2020 IBAN |
| `payrollBankAccount.bic` | `text` | ISO 9362:2022 BIC/SWIFT |
| `payrollBankAccount.accountHolder` | `text` | domain-justified (no canonical standard) |
| `tax.taxIdRef` | `text` | national tax/identity ID — per-country (ISO 7064 mod-11/97 BG ЕГН) + EN-16931 §BT-31 |
| `tax.socialSecurityIdRef` | `text` | national tax/identity ID — per-country (ISO 7064 mod-11/97 BG ЕГН) + EN-16931 §BT-31 |
| `tax.taxResidenceCountry` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `hireDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |

### `src/plugins/accounting/collections/EvidenceAttestations.ts` (slug `evidence-attestations`)

| Field path | Type | Standard / classification |
|---|---|---|
| `attestationId` | `text` | business identifier — sequence/UUID per tenant |
| `workflow` | `text` | finite-state-machine enum — domain-justified |
| `country` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `capturedAt` | `date` | ISO 8601-1:2019 date-time |
| `pdfA` | `select` | ISO 19005 (PDF/A) + ISO 14289 (PDF/UA) + ETSI EN 319 142 (PAdES) |
| `pdfUa` | `select` | ISO 19005 (PDF/A) + ISO 14289 (PDF/UA) + ETSI EN 319 142 (PAdES) |
| `signed` | `checkbox` | boolean flag — domain (no canonical standard) |
| `padesLevel` | `select` | ISO 19005 (PDF/A) + ISO 14289 (PDF/UA) + ETSI EN 319 142 (PAdES) |
| `pdfFile` | `upload` | ISO 19005 (PDF/A) + ISO 14289 (PDF/UA) + ETSI EN 319 142 (PAdES) |
| `stepsCount` | `number` | integer counter / score — domain-justified |
| `gapsCount` | `number` | integer counter — domain-justified |

### `src/plugins/accounting/collections/FinancialStatements.ts` (slug `financial-statements`)

| Field path | Type | Standard / classification |
|---|---|---|
| `statementType` | `select` | finite-state-machine enum — domain-justified |
| `language` | `select` | BCP-47 language-tag (RFC 5646) |
| `financialRatios.category` | `select` | finite-state-machine enum — domain-justified |
| `status` | `select` | finite-state-machine enum — domain-justified |
| `exportFormats.format` | `select` | ISO 8601-1:2019 date-time |
| `statementId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/FiscalPeriods.ts` (slug `fiscal-periods`)

| Field path | Type | Standard / classification |
|---|---|---|
| `label` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/plugins/accounting/collections/FixedAssets.ts` (slug `fixed-assets`)

| Field path | Type | Standard / classification |
|---|---|---|
| `assetCategory` | `select` | finite-state-machine enum — domain-justified |
| `depreciationMethod` | `select` | finite-state-machine enum — domain-justified |

### `src/plugins/accounting/collections/GLAccounts.ts` (slug `gl-accounts`)

| Field path | Type | Standard / classification |
|---|---|---|
| `accountNumber` | `text` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `accountName` | `text` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `accountType` | `select` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `role` | `select` | finite-state-machine enum — domain-justified |
| `parentAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 chart-of-accounts |
| `normalBalance` | `select` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `balance` | `number` | _money composite (ISO 4217 + integer-cents) |
| `balanceInBaseCurrency` | `number` | relationship reference — domain (no canonical standard) |
| `description` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `isTaxAccount` | `checkbox` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 chart-of-accounts |
| `tags.tag` | `text` | finite-state-machine enum — domain-justified |

### `src/plugins/accounting/collections/GLPostings.ts` (slug `gl-postings`)

| Field path | Type | Standard / classification |
|---|---|---|
| `sourceType` | `select` | finite-state-machine enum — domain-justified |
| `postingId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/GoodsReceipts.ts` (slug `goods-receipts`)

| Field path | Type | Standard / classification |
|---|---|---|
| `purchaseOrder` | `relationship` | Payload relationship — referential integrity |
| `receiptNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/InventoryMovements.ts` (slug `inventory-movements`)

| Field path | Type | Standard / classification |
|---|---|---|
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `sourceDocumentType` | `select` | finite-state-machine enum — domain-justified |
| `movementId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/JournalEntries.ts` (slug `journal-entries`)

| Field path | Type | Standard / classification |
|---|---|---|
| `sourceType` | `select` | finite-state-machine enum — domain-justified |
| `entryNumber` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/KycChecks.ts` (slug `kyc-checks`)

| Field path | Type | Standard / classification |
|---|---|---|
| `subjectType` | `select` | finite-state-machine enum — domain-justified |
| `cddLevel` | `select` | FATF R.10 Customer Due Diligence + EU AMLD5 |
| `pepStatus` | `select` | finite-state-machine enum — domain-justified |
| `riskRating` | `select` | finite-state-machine enum — domain-justified |
| `checkId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/LeasePeriodPostings.ts` (slug `lease-period-postings`)

| Field path | Type | Standard / classification |
|---|---|---|
| `postingId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `lease` | `relationship` | IFRS 16 / US-GAAP ASC 842 lease-accounting |
| `periodStart` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `periodEnd` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `openingLiabilityCarrying` | `number` | _money composite (ISO 4217 + integer-cents) |
| `openingRouCarrying` | `number` | relationship reference — domain (no canonical standard) |
| `interest` | `number` | _money composite (ISO 4217 + integer-cents) |
| `principalRepayment` | `number` | Payload relationship — referential integrity |
| `cashPayment` | `number` | Payload relationship — referential integrity |
| `rouAmortisation` | `number` | relationship reference — domain (no canonical standard) |
| `closingLiabilityCarrying` | `number` | _money composite (ISO 4217 + integer-cents) |
| `closingRouCarrying` | `number` | relationship reference — domain (no canonical standard) |
| `interestExpenseAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `leaseLiabilityAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `rouAmortisationAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `accumulatedRouAmortisationAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 chart-of-accounts |
| `cashAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 chart-of-accounts |
| `costCenter` | `relationship` | Payload relationship — referential integrity |
| `postedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `journalEntry` | `relationship` | Payload relationship — referential integrity |

### `src/plugins/accounting/collections/Leases.ts` (slug `leases`)

| Field path | Type | Standard / classification |
|---|---|---|
| `leaseNumber` | `text` | business identifier — sequence/UUID per tenant |
| `description` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `lessor` | `relationship` | IFRS 16 / US-GAAP ASC 842 lease-accounting |
| `classification` | `select` | finite-state-machine enum — domain-justified |
| `underlyingAssetCategory` | `select` | finite-state-machine enum / classification — domain-justified |
| `commencementDate` | `date` | ISO 8601-1:2019 date-time |
| `endDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `leaseTermMonths` | `number` | IFRS 16 / US-GAAP ASC 842 lease-accounting |
| `fixedPayment` | `number` | Payload relationship — referential integrity |
| `paymentFrequency` | `select` | finite-state-machine enum / classification — domain-justified |
| `paymentTiming` | `select` | relationship reference — domain (no canonical standard) |
| `variablePaymentNotes` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `residualValueGuarantee` | `number` | _money composite (ISO 4217 + integer-cents) |
| `terminationPenalty` | `number` | _money composite (ISO 4217 + integer-cents) |
| `discountRateBasis` | `select` | relationship reference — domain (no canonical standard) |
| `discountRatePercent` | `number` | relationship reference — domain (no canonical standard) |
| `initialLeaseLiability` | `number` | _money composite (ISO 4217 + integer-cents) |
| `initialDirectCosts` | `number` | relationship reference — domain (no canonical standard) |
| `leaseIncentivesReceived` | `number` | relationship reference — domain (no canonical standard) |
| `prepaidRent` | `number` | IFRS 16 / US-GAAP ASC 842 lease-accounting |
| `initialRouAsset` | `number` | _money composite (ISO 4217 + integer-cents) |
| `rouAssetCarrying` | `number` | _money composite (ISO 4217 + integer-cents) |
| `liabilityCarrying` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lastPostingDate` | `date` | ISO 8601-1:2019 date-time |
| `modifications.kind` | `select` | finite-state-machine enum — domain-justified |
| `impairmentReserve` | `number` | _money composite (ISO 4217 + integer-cents) |
| `terminationDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `rouAssetAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `leaseLiabilityAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `rouAmortizationAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `interestExpenseAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |

### `src/plugins/accounting/collections/PaymentRuns.ts` (slug `payment-runs`)

| Field path | Type | Standard / classification |
|---|---|---|
| `runId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `messageType` | `select` | finite-state-machine enum / classification — domain-justified |
| `sequenceType` | `select` | finite-state-machine enum — domain-justified |
| `localInstrument` | `select` | ISO 20022 financial-messaging |
| `sourceBankAccount` | `relationship` | Payload relationship — referential integrity |
| `requestedExecutionDate` | `date` | ISO 20022 financial-messaging |
| `transactions.endToEndId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `transactions.amount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `transactions.counterpartyName` | `text` | ISO 20022 + Berlin Group NextGenPSD2 transaction-details schema |
| `transactions.remittanceReference` | `text` | Payload relationship — referential integrity |
| `transactions.mandateId` | `text` | ISO 20022 financial-messaging |
| `transactions.sourceBill` | `relationship` | Payload relationship — referential integrity |
| `transactions.paymentRecord` | `relationship` | ISO 20022 + Berlin Group NextGenPSD2 transaction-details schema |
| `numberOfTransactions` | `number` | Payload relationship — referential integrity |
| `controlSum` | `number` | _money composite (ISO 4217 + integer-cents) |
| `preparedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `authorisedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `exportFilename` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `exportedAt` | `date` | ISO 8601-1:2019 date-time |
| `submittedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `settledAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `bankResponseStatus` | `select` | finite-state-machine enum / classification — domain-justified |
| `bankResponseReasonCode` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `preparedAt` | `date` | ISO 8601-1:2019 date-time |

### `src/plugins/accounting/collections/PayrollRuns.ts` (slug `payroll-runs`)

| Field path | Type | Standard / classification |
|---|---|---|
| `runId` | `text` | request/event-correlation identifier — RFC 9562 UUID v4 |
| `paySchedule` | `select` | finite-state-machine enum — domain-justified |
| `paymentDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `sourceBankAccount` | `relationship` | Payload relationship — referential integrity |
| `lines.employee` | `relationship` | Payload relationship — referential integrity |
| `lines.baseGross` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.overtimeGross` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.bonusGross` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.totalGross` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.incomeTaxWithheld` | `number` | relationship reference — domain (no canonical standard) |
| `lines.socialSecurityEmployee` | `number` | national social-security regime (no canonical standard; per-country) |
| `lines.pensionEmployee` | `number` | national social-security regime (no canonical standard; per-country) |
| `lines.otherDeductions` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.netPay` | `number` | _money composite (ISO 4217 + integer-cents) |
| `lines.socialSecurityEmployer` | `number` | national social-security regime (no canonical standard; per-country) |
| `lines.pensionEmployer` | `number` | national social-security regime (no canonical standard; per-country) |
| `lines.payrollTaxesEmployer` | `number` | _money composite (ISO 4217 + integer-cents) — employer-side payroll-tax accrual |
| `lines.costCenter` | `relationship` | Payload relationship — referential integrity |
| `lines.paySlipDocument` | `upload` | Payload relationship/array — referential integrity |
| `employeeCount` | `number` | integer counter / score — domain-justified |
| `totalGross` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totalDeductions` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totalNet` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totalEmployerSideAccruals` | `number` | _money composite (ISO 4217 + integer-cents) |
| `preparedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `authorisedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `journalEntry` | `relationship` | Payload relationship — referential integrity |
| `paymentRun` | `relationship` | domain-justified (no canonical standard) |
| `periodStart` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |

### `src/plugins/accounting/collections/PerformanceObligations.ts` (slug `performance-obligations`)

| Field path | Type | Standard / classification |
|---|---|---|
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `recognitionTiming` | `select` | finite-state-machine enum — domain-justified |
| `overTimeMeasurement` | `select` | IFRS 15 / US-GAAP ASC 606 revenue-from-contracts-with-customers |
| `measurementKind` | `select` | finite-state-machine enum / classification — domain-justified |
| `recognitionMethod` | `select` | finite-state-machine enum — domain-justified |
| `allocatedAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `recognisedToDate` | `number` | _money composite (ISO 4217 + integer-cents) |
| `percentComplete` | `number` | IFRS 15 / US-GAAP ASC 606 revenue-from-contracts-with-customers |
| `contract` | `relationship` | domain-justified (no canonical standard) |

### `src/plugins/accounting/collections/PeriodEndAdjustments.ts` (slug `period-end-adjustments`)

| Field path | Type | Standard / classification |
|---|---|---|
| `adjustmentType` | `select` | finite-state-machine enum — domain-justified |
| `status` | `select` | finite-state-machine enum — domain-justified |
| `adjustmentId` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/PurchaseOrders.ts` (slug `purchase-orders`)

| Field path | Type | Standard / classification |
|---|---|---|
| `vendor` | `relationship` | Payload relationship — referential integrity |
| `lines.glAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `lines.quantityReceived` | `number` | integer counter — domain-justified (goods-receipt note quantity) |
| `receipts` | `join` | Payload relationship — referential integrity |
| `invoice` | `relationship` | Payload relationship — referential integrity |
| `poNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/Quotes.ts` (slug `quotes`)

| Field path | Type | Standard / classification |
|---|---|---|
| `quoteNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/Refunds.ts` (slug `refunds`)

| Field path | Type | Standard / classification |
|---|---|---|
| `method` | `select` | finite-state-machine enum — domain-justified |
| `refundNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/Returns.ts` (slug `returns`)

| Field path | Type | Standard / classification |
|---|---|---|
| `reason` | `select` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `rmaNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/SepaMandates.ts` (slug `sepa-mandates`)

| Field path | Type | Standard / classification |
|---|---|---|
| `mandateId` | `text` | ISO 20022 financial-messaging |
| `localInstrument` | `select` | ISO 20022 financial-messaging |
| `debtorName` | `text` | ISO 20022 financial-messaging |
| `debtorIban` | `text` | relationship reference — domain (no canonical standard) |
| `debtor` | `relationship` | relationship reference — domain (no canonical standard) |
| `creditorIdentifier` | `text` | national tax/identity ID — per-country (ISO 7064 mod-11/97 BG ЕГН) + EN-16931 §BT-31 |
| `signatureDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `mandateDocument` | `upload` | relationship reference — domain (no canonical standard) |
| `signatureMethod` | `select` | finite-state-machine enum — domain-justified |
| `sequenceState` | `select` | finite-state-machine enum — domain-justified |
| `lastCollectionAt` | `date` | ISO 8601-1:2019 date-time |
| `expiryDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `revokedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `revocationReason` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `debtorBic` | `text` | relationship reference — domain (no canonical standard) |

### `src/plugins/accounting/collections/Shipments.ts` (slug `shipments`)

| Field path | Type | Standard / classification |
|---|---|---|
| `carrier` | `select` | ICC INCOTERMS 2020 + WCO domain-shipping |
| `shipmentNumber` | `text` | business identifier — sequence/UUID per tenant |

### `src/plugins/accounting/collections/TaxCalculations.ts` (slug `tax-calculations`)

| Field path | Type | Standard / classification |
|---|---|---|
| `taxType` | `select` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `jurisdiction` | `select` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `status` | `select` | finite-state-machine enum — domain-justified |
| `calculationId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |

### `src/plugins/accounting/collections/TaxCodes.ts` (slug `tax-codes`)

| Field path | Type | Standard / classification |
|---|---|---|
| `code` | `text` | free-text identifier — domain-justified |

### `src/plugins/accounting/collections/TaxJurisdictions.ts` (slug `tax-jurisdictions`)

| Field path | Type | Standard / classification |
|---|---|---|
| `code` | `text` | free-text identifier — domain-justified |

### `src/plugins/accounting/collections/TaxReturns.ts` (slug `tax-returns`)

| Field path | Type | Standard / classification |
|---|---|---|
| `returnType` | `select` | finite-state-machine enum — domain-justified |
| `taxCalculations` | `relationship` | Payload relationship — referential integrity |

### `src/plugins/accounting/collections/TimeEntries.ts` (slug `time-entries`)

| Field path | Type | Standard / classification |
|---|---|---|
| `entryId` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `employee` | `relationship` | Payload relationship — referential integrity |
| `minutes` | `number` | relationship reference — domain (no canonical standard) |
| `kind` | `select` | finite-state-machine enum — domain-justified |
| `costCenter` | `relationship` | Payload relationship — referential integrity |
| `project` | `text` | Payload relationship — referential integrity |
| `task` | `text` | Payload relationship — referential integrity |
| `description` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `billable` | `checkbox` | domain-justified (no canonical standard) |
| `billableRate` | `number` | relationship reference — domain (no canonical standard) |
| `submittedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `rejectionReason` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `payrollRun` | `relationship` | domain-justified (no canonical standard) |
| `workDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |

### `src/plugins/accounting/collections/Vendors.ts` (slug `vendors`)

| Field path | Type | Standard / classification |
|---|---|---|
| `code` | `text` | free-text identifier — domain-justified |

### `src/plugins/accounting/collections/WarehouseLocations.ts` (slug `warehouse-locations`)

| Field path | Type | Standard / classification |
|---|---|---|
| `type` | `select` | finite-state-machine enum — domain-justified |
| `code` | `text` | free-text identifier — domain-justified |

### `src/collections/Categories/index.ts` (slug `categories`)

| Field path | Type | Standard / classification |
|---|---|---|
| `title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `parent` | `relationship` | Payload relationship — referential integrity |
| `breadcrumbs.doc` | `relationship` | Payload relationship/array — referential integrity |
| `breadcrumbs.title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `breadcrumbs.url` | `text` | RFC 3986 URI |

### `src/collections/InvoiceLines/index.ts` (slug `invoicelines`)

| Field path | Type | Standard / classification |
|---|---|---|
| `invoice` | `relationship` | Payload relationship — referential integrity |
| `code` | `text` | free-text identifier — domain-justified |
| `description` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `lineNote` | `textarea` | relationship reference — domain (no canonical standard) |
| `objectIdentifier` | `text` | national tax/identity ID — per-country (ISO 7064 mod-11/97 BG ЕГН) + EN-16931 §BT-31 |
| `status` | `select` | finite-state-machine enum — domain-justified |
| `items.buyerItem` | `relationship` | Payload relationship — referential integrity |
| `items.sellerItem` | `relationship` | Payload relationship — referential integrity |
| `items.source` | `relationship` | finite-state-machine enum / classification — domain-justified |
| `items.destination` | `relationship` | relationship reference — domain (no canonical standard) |
| `quantity.quantity` | `number` | integer counter / score — domain-justified |
| `quantity.unit` | `text` | UN/CEFACT Recommendation 20 (units of measure) |
| `quantity.grams` | `number` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `pricing.unitPrice` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.itemTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.exchangeRate` | `number` | ISO 4217:2015 + ECB rate-quoting convention |
| `discounting.discountRate` | `number` | relationship reference — domain (no canonical standard) |
| `discounting.discountTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `taxation.taxable` | `checkbox` | boolean flag — domain (no canonical standard) |
| `taxation.vatCategoryCode` | `select` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `taxation.taxRate` | `number` | EN-16931:2017 §BT-119 invoiced-item-net-price-VAT-rate |
| `taxation.vatExemptionReasonCode` | `text` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `taxation.vatExemptionReason` | `text` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `taxation.priceIncludesTax` | `checkbox` | boolean flag — domain (no canonical standard) |
| `taxation.netTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `taxation.taxTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totals.totalAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totals.totalPaid` | `number` | _money composite (ISO 4217 + integer-cents) |
| `totals.totalDue` | `number` | _money composite (ISO 4217 + integer-cents) |
| `ledger.debitAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.creditAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.taxDebitAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.taxCreditAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `dates.contractStart` | `date` | ISO 8601-1:2019 date-time / interval |
| `dates.contractEnd` | `date` | ISO 8601-1:2019 date-time / interval |
| `dates.periodStart` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.periodEnd` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.deliveredAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.returnedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `details.currencyCode` | `text` | ISO 4217:2015 currency-codes |
| `details.sku` | `text` | free-text identifier — domain-justified |
| `details.hsCode` | `text` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `details.serialNumber` | `text` | manufacturer serial — domain (no canonical standard) |
| `details.lot` | `text` | domain-justified (no canonical standard) |
| `details.variant` | `text` | domain-justified (no canonical standard) |
| `details.variation` | `text` | relationship reference — domain (no canonical standard) |
| `details.option` | `text` | domain-justified (no canonical standard) |
| `details.period` | `text` | IFRS IAS-1 §36 fiscal-period (→ IFRS-18 from 2027) + ISO 8601-1:2019 |
| `details.giftCard` | `checkbox` | domain-justified (no canonical standard) |
| `metadata` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Invoices/index.ts` (slug `invoices`)

| Field path | Type | Standard / classification |
|---|---|---|
| `typeStatus.invoiceType` | `select` | finite-state-machine enum — domain-justified |
| `typeStatus.invoiceTypeCode` | `select` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `typeStatus.status` | `select` | finite-state-machine enum — domain-justified |
| `typeStatus.confirmed` | `checkbox` | domain-justified (no canonical standard) |
| `number` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `protocolNumber` | `text` | business identifier — sequence/UUID per tenant |
| `purchaseOrder` | `text` | Payload relationship — referential integrity |
| `salesOrder` | `text` | Payload relationship — referential integrity |
| `parties.seller` | `relationship` | Payload relationship — referential integrity |
| `parties.sellerAgent` | `relationship` | Payload relationship — referential integrity |
| `parties.buyer` | `relationship` | Payload relationship — referential integrity |
| `parties.buyerAgent` | `relationship` | domain-justified (no canonical standard) |
| `parties.supplier` | `relationship` | Payload relationship — referential integrity |
| `parties.consignee` | `relationship` | domain-justified (no canonical standard) |
| `dates.date` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.issuedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.orderDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.proformaDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.protocolDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.paymentDate` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.paidAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.deliveredAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.cancelledAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.dueAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.pastDueSinceAt` | `date` | ISO 8601-1:2019 date-time |
| `dates.gracePeriodEndsAt` | `date` | ISO 8601-1:2019 date-time |
| `dates.suspensionScheduledFor` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `amounts.itemTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.discountTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.allowancesTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.chargesTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.netTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.taxTotal` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.totalAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.prepaidAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.roundingAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.totalPaid` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.totalDue` | `number` | _money composite (ISO 4217 + integer-cents) |
| `vatBreakdown.categoryCode` | `select` | free-text identifier — domain-justified |
| `vatBreakdown.rate` | `number` | ISO 4217:2015 + ECB rate-quoting convention |
| `vatBreakdown.taxableAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `vatBreakdown.taxAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `vatBreakdown.exemptionReasonCode` | `text` | business identifier — sequence/UUID per tenant (no canonical standard) |
| `vatBreakdown.exemptionReason` | `text` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `billingTax.currencyCode` | `text` | ISO 4217:2015 currency-codes |
| `billingTax.exchangeRate` | `number` | ISO 4217:2015 + ECB rate-quoting convention |
| `billingTax.taxType` | `select` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `billingTax.taxesIncluded` | `checkbox` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `billingTax.taxNote` | `textarea` | EN-16931:2017 §BG-23 vat-breakdown + UN/CEFACT 5305 tax-category |
| `recurring.billingPeriod` | `select` | ICC INCOTERMS / domain-trade-practice |
| `recurring.nextBillingDate` | `date` | IFRS 15 / ASC 606 revenue-recognition + provider billing-domain |
| `recurring.periodStart` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `recurring.periodEnd` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `recurring.subscription` | `relationship` | Payload relationship — referential integrity |
| `ledger.debitAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.creditAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `notes.note` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `notes.invoiceNote` | `textarea` | relationship reference — domain (no canonical standard) |
| `notes.deliveryNote` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `notes.deliveryTerms` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `notes.paymentTerms` | `text` | ICC INCOTERMS / domain-trade-practice |
| `notes.paymentMethods` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `relationships.parent` | `relationship` | Payload relationship — referential integrity |
| `relationships.order` | `relationship` | Payload relationship — referential integrity |
| `relationships.domain` | `relationship` | RFC 3986 URI |
| `test` | `checkbox` | Payload relationship — referential integrity |
| `metadata` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Items/index.ts` (slug `items`)

| Field path | Type | Standard / classification |
|---|---|---|
| `code` | `text` | free-text identifier — domain-justified |
| `sku` | `text` | free-text identifier — domain-justified |
| `barcode` | `text` | free-text identifier — domain-justified |
| `address` | `relationship` | Payload relationship — referential integrity |
| `pricing.price` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.cost` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.compareAtPrice` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.vendorPrice` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.minPrice` | `number` | _money composite (ISO 4217 + integer-cents) |
| `pricing.currencyCode` | `text` | ISO 4217:2015 currency-codes |
| `pricing.priceIncludesTax` | `checkbox` | boolean flag — domain (no canonical standard) |
| `taxation.taxable` | `checkbox` | boolean flag — domain (no canonical standard) |
| `taxation.taxRate` | `number` | EN-16931:2017 §BT-119 invoiced-item-net-price-VAT-rate |
| `taxation.taxDebitAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `taxation.taxCreditAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.debitAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `ledger.creditAccount` | `relationship` | IFRS IAS-1 §54 elements (→ IFRS-18 from 2027) + US-GAAP ASC-205 + OECD SAF-T 2.0 §2 |
| `inventory.inventoryQuantity` | `number` | integer counter — domain-justified |
| `inventory.inventoryManagement` | `select` | relationship reference — domain (no canonical standard) |
| `inventory.inventoryPolicy` | `select` | relationship reference — domain (no canonical standard) |
| `physical.weight` | `number` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `physical.weightUnit` | `text` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `physical.grams` | `number` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `physical.hsCode` | `text` | WCO HS Code (hsCode) + SI / NIST SP-811 (units) |
| `physical.requiresShipping` | `checkbox` | boolean flag — domain (no canonical standard) |
| `discounts.maxDiscountRate` | `number` | relationship reference — domain (no canonical standard) |
| `discounts.minProfitRate` | `number` | relationship reference — domain (no canonical standard) |
| `discounts.maxProfitRate` | `number` | relationship reference — domain (no canonical standard) |
| `fulfillment.fulfillmentService` | `text` | domain-justified (no canonical standard) |
| `fulfillment.period` | `select` | IFRS IAS-1 §36 fiscal-period (→ IFRS-18 from 2027) + ISO 8601-1:2019 |
| `visibility.visibility` | `select` | finite-state-machine enum — domain-justified |
| `metadata` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Media/index.ts` (slug `media`)

| Field path | Type | Standard / classification |
|---|---|---|
| `alt` | `text` | media metadata — RFC 6838 (mime-type) + WCAG 1.1.1 (alt-text) |
| `caption` | `richText` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `thumbnail` | `?` | media metadata — RFC 6838 (mime-type) + WCAG 1.1.1 (alt-text) |

### `src/collections/Pages/index.ts` (slug `pages`)

| Field path | Type | Standard / classification |
|---|---|---|
| `title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `meta` | `?` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `publishedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `parent` | `relationship` | Payload relationship — referential integrity |
| `breadcrumbs.doc` | `relationship` | Payload relationship/array — referential integrity |
| `breadcrumbs.title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `breadcrumbs.url` | `text` | RFC 3986 URI |

### `src/collections/PaymentMethods/index.ts` (slug `paymentmethods`)

| Field path | Type | Standard / classification |
|---|---|---|
| `stripePaymentMethodId` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `type` | `select` | finite-state-machine enum — domain-justified |
| `cardBrand` | `select` | PCI-DSS 4.0 + provider tokenization |
| `cardLast4` | `text` | PCI-DSS 4.0 + provider tokenization |
| `cardExpMonth` | `number` | PCI-DSS 4.0 + provider tokenization |
| `cardExpYear` | `number` | PCI-DSS 4.0 + provider tokenization |
| `bankName` | `text` | domain-justified (no canonical standard) |
| `bankLast4` | `text` | domain-justified (no canonical standard) |
| `isDefault` | `checkbox` | boolean flag — domain-justified |
| `isActive` | `checkbox` | boolean flag — domain-justified |
| `createdViaStripe` | `checkbox` | relationship reference — domain (no canonical standard) |
| `nextRetryAt` | `date` | ISO 8601-1:2019 date-time |

### `src/collections/Payments/index.ts` (slug `payments`)

| Field path | Type | Standard / classification |
|---|---|---|
| `transactionNumber` | `text` | business identifier — sequence/UUID per tenant |
| `invoice` | `relationship` | Payload relationship — referential integrity |
| `parties.sender` | `relationship` | Payload relationship — referential integrity |
| `parties.receiver` | `relationship` | Payload relationship — referential integrity |
| `amounts.amount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.invoiceAmount` | `number` | _money composite (ISO 4217 + integer-cents) |
| `amounts.currencyCode` | `text` | ISO 4217:2015 currency-codes |
| `amounts.exchangeRate` | `number` | ISO 4217:2015 + ECB rate-quoting convention |
| `dates.sentAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.receivedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `dates.authorizedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `authorization.authorizedBy` | `relationship` | ISO 19011:2018 audit-trail subject + NIST INCITS-359 RBAC |
| `payment.paymentMethod` | `text` | finite-state-machine enum / classification — domain-justified |
| `payment.note` | `textarea` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `metadata` | `json` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Posts/index.ts` (slug `posts`)

| Field path | Type | Standard / classification |
|---|---|---|
| `title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `heroImage` | `upload` | Payload relationship/array — referential integrity |
| `content` | `richText` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `relatedPosts` | `relationship` | Payload relationship — referential integrity |
| `categories` | `relationship` | Payload relationship — referential integrity |
| `meta` | `?` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `publishedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `authors` | `relationship` | Payload relationship/array — referential integrity |
| `populatedAuthors.id` | `text` | Payload built-in (no standard) |
| `populatedAuthors.name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Products/index.ts` (slug `products`)

| Field path | Type | Standard / classification |
|---|---|---|
| `description` | `richText` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `gallery.image` | `upload` | media metadata — RFC 6838 (mime-type) + WCAG 1.1.1 (alt-text) |
| `gallery.variantOption` | `relationship` | relationship reference — domain (no canonical standard) |
| `relatedProducts` | `relationship` | Payload relationship — referential integrity |
| `meta` | `?` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `categories` | `relationship` | Payload relationship — referential integrity |
| `title` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |

### `src/collections/Roles/index.ts` (slug `roles`)

| Field path | Type | Standard / classification |
|---|---|---|
| `name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `binding` | `select` | relationship reference — domain (no canonical standard) |
| `scopedCollection` | `select` | Payload relationship — referential integrity |
| `resource` | `relationship` | finite-state-machine enum / classification — domain-justified |

### `src/collections/SubscriptionPlans/index.ts` (slug `subscriptionplans`)

| Field path | Type | Standard / classification |
|---|---|---|
| `name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `slug` | `text` | free-text identifier — domain-justified |
| `stripeProductId` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `stripePriceId` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `monthlyUSD` | `number` | _money composite (ISO 4217 + integer-cents) — explicit currency in field name |
| `yearlyUSD` | `number` | _money composite (ISO 4217 + integer-cents) |
| `billingCycle` | `select` | ICC INCOTERMS / domain-trade-practice |
| `limits` | `json` | domain-justified (no canonical standard) |
| `isActive` | `checkbox` | boolean flag — domain-justified |
| `description` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `sortOrder` | `number` | Payload relationship — referential integrity |

### `src/collections/Subscriptions/index.ts` (slug `subscriptions`)

| Field path | Type | Standard / classification |
|---|---|---|
| `plan` | `relationship` | domain-justified (no canonical standard) |
| `status` | `select` | finite-state-machine enum — domain-justified |
| `trialStartedAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `trialEndsAt` | `date` | IFRS 15 / ASC 606 revenue-recognition + provider billing-domain |
| `currentPeriodStart` | `date` | ISO 8601-1:2019 date-time / interval |
| `currentPeriodEnd` | `date` | ISO 8601-1:2019 date-time / interval |
| `stripeSubscriptionId` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `stripeCustomerId` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `cancelledAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `cancellationReason` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `pausedAt` | `date` | ISO 8601-1:2019 date-time |
| `resumeAt` | `date` | ISO 8601-1:2019 date-time + ISO 19011:2018 audit-trail |
| `lastStatusChange` | `date` | relationship reference — domain (no canonical standard) |
| `lastStatusChangeReason` | `text` | finite-state-machine enum / classification — domain-justified |

### `src/collections/Tenants/index.ts` (slug `tenants`)

| Field path | Type | Standard / classification |
|---|---|---|
| `name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `domain` | `text` | RFC 3986 URI |
| `slug` | `text` | free-text identifier — domain-justified |
| `locales` | `json` | BCP-47 language-tag (RFC 5646) |
| `config.identity.country` | `text` | ISO 3166-1:2020 country-codes alpha-2 |
| `config.identity.legalName` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `config.identity.taxRegistration` | `text` | national tax/identity ID — per-country (ISO 7064 mod-11/97 BG ЕГН) + EN-16931 §BT-31 |
| `config.localization.defaultLocale` | `text` | BCP-47 language-tag (RFC 5646) |
| `config.localization.fallbackLocale` | `text` | BCP-47 language-tag (RFC 5646) |
| `config.currency.reportingCurrency` | `text` | ISO 4217:2015 currency-codes |
| `config.accounting.standard` | `select` | IFRS / US-GAAP / FRS / JGAAP / ASBE / INDAS — per-tenant choice |
| `config.accounting.fiscalYearStartMonth` | `number` | IFRS IAS-1 §36 fiscal-period (→ IFRS-18 from 2027) + ISO 8601-1:2019 |
| `allowPublicRead` | `checkbox` | boolean flag — domain (no canonical standard) |
| `publicSiteUrl` | `text` | RFC 3986 URI |
| `stripePublishableKey` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `stripeSecretKey` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `stripeWebhookSecret` | `text` | PCI-DSS 4.0 + provider tokenization (Stripe/PayPal); we never touch raw PAN |
| `integrationSettings` | `json` | relationship reference — domain (no canonical standard) |
| `resendApiKey` | `text` | NIST SP-800-108 KDF-derived secret + ISO/IEC 27002 §8.24 cryptographic-key-management |
| `emailDefaultFromAddress` | `text` | Payload relationship — referential integrity |
| `emailDefaultFromName` | `text` | relationship reference — domain (no canonical standard) |
| `mcpApiKey` | `text` | NIST SP-800-108 KDF-derived secret + ISO/IEC 27002 §8.24 cryptographic-key-management |

### `src/collections/UserRoles/index.ts` (slug `userroles`)

| Field path | Type | Standard / classification |
|---|---|---|
| `user` | `relationship` | Payload relationship — referential integrity |
| `role` | `relationship` | finite-state-machine enum — domain-justified |

### `src/collections/Users/index.ts` (slug `users`)

| Field path | Type | Standard / classification |
|---|---|---|
| `roles` | `select` | Payload relationship — referential integrity |
| `password` | `text` | NIST SP-800-63b authentication + bcrypt/Argon2 hashing (Payload built-in) |
| `name` | `text` | free-text — domain-justified (Unicode UTF-8 per RFC 3629) |
| `roles` | `select` | Payload relationship — referential integrity |
| `username` | `text` | free-text identifier — domain (no canonical standard) |
| `orders` | `join` | Payload relationship — referential integrity |
| `cart` | `join` | domain-justified (no canonical standard) |
| `addresses` | `join` | Payload relationship — referential integrity |
| `config.localization.defaultLocale` | `text` | BCP-47 language-tag (RFC 5646) |
| `config.localization.displayCurrency` | `text` | domain-justified (no canonical standard) |
| `config.localization.dateFormat` | `select` | ISO 8601-1:2019 date-time |
| `config.features` | `json` | relationship reference — domain (no canonical standard) |
