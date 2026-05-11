# Business Chains — auto-generated from `src/services/business-chains/registry.ts`

> Single source of truth for ERPax's end-to-end workflows. Each chain maps a sequence of (collection, action, emitted-event) tuples to a published process standard. Re-run `pnpm exec tsx scripts/generate-business-chains-doc.ts` after editing the registry.

## Summary table

| Chain | Standards | Feature gate | Wired |
|---|---|---|---|
| **Procure-to-Pay (3-way match)** | SOX §404 P2P-01; IAS-2 §10; IFRS-15 §38; ISO 27002 §5.4 segregation-of-duties | _(core)_ | partial |
| **Record-to-Report (period close)** | SOX §404; IAS-1 §27; IAS-8 §42; IAS-21 §28-29; IFRS-10 §B86 | period_end_closing | partial |
| **IFRS-16 lease cycle** | IFRS-16; ASC-842; IFRS-16 §44-46 modifications; IFRS-16 §22 commencement | leasing | partial |
| **Subscription billing cycle (IFRS-15 §35 + B16)** | IFRS-15 §35; IFRS-15 §B16-B19; ASC 606-10-32-40 | _(core)_ | yes |
| **Hire-to-Retire** | IAS-19; GDPR Art.6(1)(b) recruitment; GDPR Art.5(1)(e) PII retention; national labour codes | _(core)_ | partial |
| **Manufacturing cycle (IAS-2 + ISA-95)** | IAS-2 §10-14; IAS-2 §21 variances; ISA-95 §B.5; ISO 9001 §8.7 nonconformance | manufacturing | no |
| **Multi-step workflow approval** | ISO/IEC 19510:2013 BPMN-2.0; SOX §404; ISO 27002 §5.4; ISO 19011:2018 | workflow_engine | partial |
| **Bulk import cycle** | RFC 4180 csv; ISO 20022 camt.053; EN-16931 ubl/cii; SOX §404 TOM-FAIL-01 | _(core)_ | partial |
| **Order-to-Cash (physical goods)** | IFRS-15 §38 point-in-time; INCOTERMS 2020; IAS-2 | _(core)_ | partial |
| **Order-to-Cash (services / over-time)** | IFRS-15 §35; IFRS-15 §B14-B19 cost-to-cost; IFRS-15 §126 milestone-billing | project_accounting | no |
| **CRM lead-to-cash** | IFRS-15 §9 contract-existence; IFRS-15 §91-94 incremental-costs; GDPR Art.5 Art.6(1)(f) | crm | no |
| **Provision lifecycle (IAS-37)** | IAS-37 §14 §36 §59 §70; ASC 450-20 | period_end_closing | no |
| **ESG reporting cycle (CSRD)** | EU CSRD 2022/2464; EU ESRS 1/2/E1; GHG Protocol; ISAE 3000; ISAE 3410; eIDAS Art.28 | esg_reporting | no |
| **KYC + sanctions screening** | FATF R.10 R.12 R.24; EU AMLD5; EU CFSP sanctions | compliance_aml | partial |
| **Notification dispatch** | RFC 5321/5322; GDPR Art.7 transactional-consent; ISO 19011 §6.4.6 | _(core)_ | partial |

## Chain-by-chain detail

### Procure-to-Pay (3-way match) — `P2P_THREE_WAY_MATCH`

PR → RFQ → PO → GR → AP → Payment. Each step is gated by the prior; the SOX §404 ITGC P2P-01 control test walks PR → PO → GR → Bill matching quantities + price.

**Standards:** SOX §404 P2P-01; IAS-2 §10; IFRS-15 §38; ISO 27002 §5.4 segregation-of-duties
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/p2p-three-way-match.ts`
  **Test file:** `tests/int/chains/p2p-three-way-match.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-1 worked example. PR-approval → PO-create + 3-way match emits added in Slice KKKK._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `purchase-requisitions` | submit | pr:submitted | _(none)_ |
| 2 | `purchase-requisitions` | approve | pr:approved | `pr:submitted` |
| 3 | `vendor-quotes` | receive | rfq:received | `pr:approved` |
| 4 | `vendor-quotes` | award | rfq:awarded | `rfq:received` |
| 5 | `purchase-orders` | create | po:created | `rfq:awarded` |
| 6 | `goods-receipts` | post | gr:posted | `po:created` |
| 7 | `invoices` | activate | bill:activated | `gr:posted` |
| 8 | `invoices` | three-way-match | bill:matched | `bill:activated`, `gr:posted`, `po:created` |
| 9 | `payments` | send | payment:sent | `bill:matched` |
| 10 | `invoices` | mark-paid | bill:paid | `payment:sent` |

### Record-to-Report (period close) — `R2R_PERIOD_CLOSE`

RecurringJournal materialisation → AccrualJE → Depreciation → LeasePeriodPosting → WipSnapshot → FxRevaluation → BankReconciliation → AccountReconciliation → IntercompanyTx → ConsolidationElim → RoundingAdjustment → PriorPeriodAdjustment → FinancialStatements. Orchestrated by `period:close:requested`.

**Standards:** SOX §404; IAS-1 §27; IAS-8 §42; IAS-21 §28-29; IFRS-10 §B86
  **Feature gate:** period_end_closing
  **Seed file:** `src/plugins/accounting/seeds/chains/r2r-period-close.ts`
  **Test file:** `tests/int/chains/r2r-period-close.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-1. Period-close orchestrator emits + sequencing added in Slice KKKK._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `recurring-journals` | materialise | recur:materialised | _(none)_ |
| 2 | `period-end-adjustments` | post | pea:posted | _(none)_ |
| 3 | `depreciation-schedules` | post | depreciation:posted | _(none)_ |
| 4 | `lease-period-postings` | post | lpp:posted | _(none)_ |
| 5 | `wip-snapshots` | snapshot | wip:snapshot:posted | _(none)_ |
| 6 | `fx-transactions` | revalue | fx:revalued | _(none)_ |
| 7 | `bank-reconciliations` | reconcile | bank:reconciled | _(none)_ |
| 8 | `account-reconciliations` | reconcile | acct:reconciled | _(none)_ |
| 9 | `intercompany-transactions` | post | ic:posted | _(none)_ |
| 10 | `consolidation-eliminations` | post | consol:elim:posted | `ic:posted` |
| 11 | `rounding-adjustments` | post | round:posted | _(none)_ |
| 12 | `prior-period-adjustments` | post | ppa:posted | _(none)_ |
| 13 | `fiscal-periods` | lock | period:locked | `recur:materialised`, `pea:posted`, `depreciation:posted`, `lpp:posted`, `wip:snapshot:posted`, `fx:revalued`, `bank:reconciled`, `acct:reconciled`, `consol:elim:posted`, `round:posted` |
| 14 | `financial-statements` | generate | fs:generated | `period:locked` |

### IFRS-16 lease cycle — `IFRS16_LEASE_CYCLE`

LeaseAgreement → InitialJE (Dr ROU / Cr LeaseLiability) → periodic LeasePeriodPosting (interest accretion + ROU amortisation) → optional LeaseModification (remeasure liability + ROU adjust) → final Termination.

**Standards:** IFRS-16; ASC-842; IFRS-16 §44-46 modifications; IFRS-16 §22 commencement
  **Feature gate:** leasing
  **Seed file:** `src/plugins/accounting/seeds/chains/ifrs16-lease-cycle.ts`
  **Test file:** `tests/int/chains/ifrs16-lease-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-1. LeaseModification.afterChange emit added in Slice KKKK._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `leases` | commence | lease:commenced | _(none)_ |
| 2 | `lease-period-postings` | post | lpp:posted | `lease:commenced` |
| 3 | `lease-modifications` | remeasure | lease:remeasured | `lease:commenced` |
| 4 | `lease-period-postings` | post-after-mod | lpp:posted | `lease:remeasured` |
| 5 | `leases` | terminate | lease:terminated | `lease:commenced` |

### Subscription billing cycle (IFRS-15 §35 + B16) — `SUBSCRIPTION_BILLING_CYCLE`

SubscriptionPlan → Subscription activated → UsageRecord events accumulate → BillingRun aggregates by (tenant, feature, billingPeriod) → Invoice issued → Payment received. IFRS-15 §B16 metered + §35 over-time recognition.

**Standards:** IFRS-15 §35; IFRS-15 §B16-B19; ASC 606-10-32-40
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/subscription-billing-cycle.ts`
  **Test file:** `tests/int/chains/subscription-billing-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=yes · isStandard=true
  _Cut-1. All emits already exist (Slice SSS). Adds usage:recorded emit on UsageRecords.afterChange._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `subscriptions` | activate | subscription:activated | _(none)_ |
| 2 | `usage-records` | record | usage:recorded | `subscription:activated` |
| 3 | `invoices` | issue | subscription:invoiced | `usage:recorded` |
| 4 | `payments` | receive | payment:received | `subscription:invoiced` |
| 5 | `invoices` | mark-paid | invoice:completed | `payment:received` |

### Hire-to-Retire — `H2R_HIRE_TO_RETIRE`

JobPosition opened → RecruitingPipeline → Offer accepted → Employee created → TimeEntry posted → ExpenseReport approved → LeaveRequest approved → PerformanceReview → SalesCommission booked → PayrollRun → optional Termination.

**Standards:** IAS-19; GDPR Art.6(1)(b) recruitment; GDPR Art.5(1)(e) PII retention; national labour codes
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/h2r-hire-to-retire.ts`
  **Test file:** `tests/int/chains/h2r-hire-to-retire.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-2. pipeline:hired → employee:created auto-creation TBD; expense → AP integration TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `job-positions` | open | position:opened | _(none)_ |
| 2 | `recruiting-pipeline` | apply | pipeline:applied | `position:opened` |
| 3 | `recruiting-pipeline` | hire | pipeline:hired | `pipeline:applied` |
| 4 | `employees` | create | employee:created | `pipeline:hired` |
| 5 | `time-entries` | post | time:posted | `employee:created` |
| 6 | `expense-reports` | approve | expense:approved | `employee:created` |
| 7 | `leave-requests` | approve | leave:approved | `employee:created` |
| 8 | `performance-reviews` | finalise | review:finalised | `employee:created` |
| 9 | `payroll-runs` | run | payroll:run | `time:posted`, `expense:approved` |

### Manufacturing cycle (IAS-2 + ISA-95) — `MANUFACTURING_CYCLE`

BillOfMaterials versioned → WorkOrder released → MaterialIssue (InventoryMovement out) → ProductionReceipt (FG in at absorbed cost) → CostVariance computed → QualityInspection → finished-goods sale (InventoryMovement out + COGS).

**Standards:** IAS-2 §10-14; IAS-2 §21 variances; ISA-95 §B.5; ISO 9001 §8.7 nonconformance
  **Feature gate:** manufacturing
  **Seed file:** `src/plugins/accounting/seeds/chains/manufacturing-cycle.ts`
  **Test file:** `tests/int/chains/manufacturing-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=no · isStandard=true
  _Cut-2. Manufacturing emits are TODO; Slice KKKK adds wo:released + prod:completed + qc:failed._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `bills-of-materials` | release | bom:released | _(none)_ |
| 2 | `work-orders` | release | wo:released | `bom:released` |
| 3 | `inventory-movements` | issue | inventory:issued | `wo:released` |
| 4 | `production-receipts` | post | prod:completed | `inventory:issued` |
| 5 | `cost-variances` | compute | variance:computed | `prod:completed` |
| 6 | `quality-inspections` | inspect | qc:complete | `prod:completed` |

### Multi-step workflow approval — `WORKFLOW_APPROVAL_CYCLE`

Document submitted → matching workflow-definitions found → workflow-instance spawned → step decisions appended → final outcome approved/rejected → mutate target document accordingly.

**Standards:** ISO/IEC 19510:2013 BPMN-2.0; SOX §404; ISO 27002 §5.4; ISO 19011:2018
  **Feature gate:** workflow_engine
  **Seed file:** `src/plugins/accounting/seeds/chains/workflow-approval-cycle.ts`
  **Test file:** `tests/int/chains/workflow-approval-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-2. Orchestrator shell exists (Slice HHHH); per-collection beforeChange wiring TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `workflow-definitions` | match | _(silent)_ | _(none)_ |
| 2 | `workflow-instances` | spawn | workflow:spawned | _(none)_ |
| 3 | `workflow-instances` | step-decision | workflow:step-decided | `workflow:spawned` |
| 4 | `workflow-instances` | finalise | workflow:finalised | `workflow:step-decided` |

### Bulk import cycle — `BULK_IMPORT_CYCLE`

File uploaded → BulkOperation enqueued → per-row mapper invoked → success rows persisted / failures land in transaction-failures → reprocess loop until clean.

**Standards:** RFC 4180 csv; ISO 20022 camt.053; EN-16931 ubl/cii; SOX §404 TOM-FAIL-01
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/bulk-import-cycle.ts`
  **Test file:** `tests/int/chains/bulk-import-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-2. Contract shipped (Slice IIII); concrete parsers wired for camt-053 + EDIFACT only._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `transaction-failures` | enqueue | bulk:enqueued | _(none)_ |
| 2 | `transaction-failures` | process | bulk:processed | `bulk:enqueued` |
| 3 | `transaction-failures` | reprocess | bulk:reprocessed | `bulk:processed` |

### Order-to-Cash (physical goods) — `O2C_GOODS`

Lead qualified → Opportunity → Quote → Contract signed → Shipment dispatched → Invoice issued at delivery → Payment received → Bank reconciliation. IFRS-15 §38 control transfer at delivery.

**Standards:** IFRS-15 §38 point-in-time; INCOTERMS 2020; IAS-2
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/o2c-goods.ts`
  **Test file:** `tests/int/chains/o2c-goods.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-3. lead/opp stage transitions + contract:signed → shipment auto-create TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `leads` | qualify | lead:qualified | _(none)_ |
| 2 | `opportunities` | close-won | opp:won | `lead:qualified` |
| 3 | `quotes` | send | quote:sent | `opp:won` |
| 4 | `contracts` | sign | contract:signed | `quote:sent` |
| 5 | `shipments` | dispatch | shipment:dispatched | `contract:signed` |
| 6 | `tracking-events` | deliver | shipment:delivered | `shipment:dispatched` |
| 7 | `invoices` | activate | invoice:activated | `shipment:delivered` |
| 8 | `payments` | receive | payment:received | `invoice:activated` |
| 9 | `invoices` | complete | invoice:completed | `payment:received` |

### Order-to-Cash (services / over-time) — `O2C_SERVICES_OVER_TIME`

Opportunity → Contract → PerformanceObligation → Project → ProjectTask + TimeEntry posted → period-end WipSnapshot → MilestoneInvoice → Payment. IFRS-15 §35 over-time + cost-to-cost progress.

**Standards:** IFRS-15 §35; IFRS-15 §B14-B19 cost-to-cost; IFRS-15 §126 milestone-billing
  **Feature gate:** project_accounting
  **Seed file:** `src/plugins/accounting/seeds/chains/o2c-services-over-time.ts`
  **Test file:** `tests/int/chains/o2c-services-over-time.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=no · isStandard=true
  _Cut-3. Slice KKKK adds wip:snapshot:posted + milestone:achieved emits + GL handler._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `opportunities` | close-won | opp:won | _(none)_ |
| 2 | `contracts` | sign | contract:signed | `opp:won` |
| 3 | `performance-obligations` | identify | po-obl:identified | `contract:signed` |
| 4 | `projects` | create | project:created | `po-obl:identified` |
| 5 | `project-tasks` | plan | task:planned | `project:created` |
| 6 | `time-entries` | post | time:posted | `task:planned` |
| 7 | `wip-snapshots` | snapshot | wip:snapshot:posted | `time:posted` |
| 8 | `project-milestones` | achieve | milestone:achieved | `wip:snapshot:posted` |
| 9 | `invoices` | milestone-invoice | invoice:activated | `milestone:achieved` |
| 10 | `payments` | receive | payment:received | `invoice:activated` |

### CRM lead-to-cash — `CRM_LEAD_TO_CASH`

Lead created → Activity logged → MQL → SQL → Opportunity → CloseWon → Customer auto-created → Contract → SalesCommission booked (IFRS-15 §91-94 capitalise vs expense decision).

**Standards:** IFRS-15 §9 contract-existence; IFRS-15 §91-94 incremental-costs; GDPR Art.5 Art.6(1)(f)
  **Feature gate:** crm
  **Seed file:** `src/plugins/accounting/seeds/chains/crm-lead-to-cash.ts`
  **Test file:** `tests/int/chains/crm-lead-to-cash.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=no · isStandard=true
  _Cut-3. Stage-transition emits + opp:won → commission auto-book TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `leads` | create | lead:created | _(none)_ |
| 2 | `activities` | log | activity:logged | `lead:created` |
| 3 | `leads` | qualify-mql | lead:mql | `activity:logged` |
| 4 | `leads` | qualify-sql | lead:sql | `lead:mql` |
| 5 | `opportunities` | create | opp:created | `lead:sql` |
| 6 | `opportunities` | close-won | opp:won | `opp:created` |
| 7 | `customers` | create | customer:created | `opp:won` |
| 8 | `contracts` | sign | contract:signed | `customer:created` |
| 9 | `sales-commissions` | book | commission:booked | `opp:won` |

### Provision lifecycle (IAS-37) — `PROVISION_LIFECYCLE`

Trigger event (audit-finding / litigation / contract become onerous) → Provision recognised at best estimate → periodic remeasurement (movementHistory append) → final Use / Reversal / Reclassification to liability.

**Standards:** IAS-37 §14 §36 §59 §70; ASC 450-20
  **Feature gate:** period_end_closing
  **Seed file:** `src/plugins/accounting/seeds/chains/provision-lifecycle.ts`
  **Test file:** `tests/int/chains/provision-lifecycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=no · isStandard=true
  _Cut-3. audit-finding → provision suggestion + remeasurement scheduler TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `audit-findings` | recognise | finding:recognised | _(none)_ |
| 2 | `provisions` | recognise | provision:recognised | `finding:recognised` |
| 3 | `provisions` | remeasure | provision:remeasured | `provision:recognised` |
| 4 | `provisions` | use | provision:used | `provision:recognised` |
| 5 | `provisions` | reverse | provision:reversed | `provision:recognised` |

### ESG reporting cycle (CSRD) — `ESG_REPORTING_CYCLE`

CarbonEmissions data points (Scope 1/2/3) collected → CsrdDisclosures rollup per ESRS topic → ISAE 3000/3410 assurance engagement → EvidenceAttestation signed (eIDAS) → XBRL filed.

**Standards:** EU CSRD 2022/2464; EU ESRS 1/2/E1; GHG Protocol; ISAE 3000; ISAE 3410; eIDAS Art.28
  **Feature gate:** esg_reporting
  **Seed file:** `src/plugins/accounting/seeds/chains/esg-reporting-cycle.ts`
  **Test file:** `tests/int/chains/esg-reporting-cycle.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=no · isStandard=true
  _Cut-4. Rollup service + ESRS-XBRL filer service are TODO._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `carbon-emissions` | record | ghg:recorded | _(none)_ |
| 2 | `csrd-disclosures` | rollup | csrd:rolled-up | `ghg:recorded` |
| 3 | `csrd-disclosures` | assure | csrd:assured | `csrd:rolled-up` |
| 4 | `evidence-attestations` | sign | evidence:signed | `csrd:assured` |
| 5 | `csrd-disclosures` | file | csrd:filed | `evidence:signed` |

### KYC + sanctions screening — `KYC_SANCTIONS_REVIEW`

Customer/Vendor onboarded → KycCheck initiated → BeneficialOwners registered → AI sanctions screen → human review for high-risk → approval/rejection → periodic re-screen on schedule.

**Standards:** FATF R.10 R.12 R.24; EU AMLD5; EU CFSP sanctions
  **Feature gate:** compliance_aml
  **Seed file:** `src/plugins/accounting/seeds/chains/kyc-sanctions-review.ts`
  **Test file:** `tests/int/chains/kyc-sanctions-review.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-4. AI screen handler exists (Slice XXX); scheduled re-screen + UI human-review queue TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `customers` | onboard | customer:onboard | _(none)_ |
| 2 | `kyc-checks` | initiate | kyc:initiated | `customer:onboard` |
| 3 | `beneficial-owners` | register | ubo:registered | `kyc:initiated` |
| 4 | `ai-suggestions` | screen | sanctions:screened | `ubo:registered` |
| 5 | `kyc-checks` | approve | kyc:approved | `sanctions:screened` |
| 6 | `kyc-checks` | rescreen | kyc:rescreened | `kyc:approved` |

### Notification dispatch — `NOTIFICATION_DISPATCH`

Domain event fired → notification subscriber matches → fan-out to email + in_app + webhook + slack channels per user preferences → audit row written.

**Standards:** RFC 5321/5322; GDPR Art.7 transactional-consent; ISO 19011 §6.4.6
  **Feature gate:** _(core, no gate)_
  **Seed file:** `src/plugins/accounting/seeds/chains/notification-dispatch.ts`
  **Test file:** `tests/int/chains/notification-dispatch.int.spec.ts`

**Socratic check:** canDo=true · makesSense=true · wired=partial · isStandard=true
  _Cut-4. sendNotification() shipped (Slice IIII); event→subscriber wiring TBD._

| # | Collection | Action | Emits | Requires |
|---|---|---|---|---|
| 1 | `audit-events` | observe-domain-event | notify:observed | _(none)_ |
| 2 | `audit-events` | dispatch | notify:dispatched | `notify:observed` |
