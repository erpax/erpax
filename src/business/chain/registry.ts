/**
 * Business-chain registry — all 15 canonical chains.
 *
 * Adding a new chain:
 *   1. Add an entry here with id + name + standards + steps.
 *   2. Author the seed at the declared `seedFile` path.
 *   3. Author the test at the declared `testFile` path.
 *   4. If the chain emits a previously-unfired event, add an
 *      `emitDomainEvent()` call in the matching collection hook AND
 *      a `gl-posting.service.ts` subscription when GL is affected.
 *   5. Update `socraticCheck.wired` from `partial` → `yes` once the
 *      seed + test pair pass locally.
 *
 * @see ./types.ts
 * @see docs/BUSINESS_CHAINS.md (auto-generated from this registry)
 */

import type { BusinessChainRegistry } from '@/business/chain/types'

export const BUSINESS_CHAINS: BusinessChainRegistry = {
  // ─── Cut 1 — closest-to-shippable ───────────────────────────────────
  P2P_THREE_WAY_MATCH: {
    id: 'P2P_THREE_WAY_MATCH',
    workflowSlug: 'procure-to-pay',
    name: 'Procure-to-Pay (3-way match)',
    description:
      'PR → RFQ → PO → GR → AP → Payment. Each step is gated by the prior; the SOX §404 ITGC P2P-01 control test walks PR → PO → GR → Bill matching quantities + price.',
    standards: ['SOX §404 P2P-01', 'IAS-2 §10', 'IFRS-15 §38', 'ISO 27002 §5.4 segregation-of-duties'],
    featureGate: undefined, // core
    steps: [
      { collection: 'purchase-requisitions', action: 'submit',   emits: 'pr:submitted',   requires: [], producer: { onStatus: 'submitted', aggregate: 'order' } },
      { collection: 'purchase-requisitions', action: 'approve',  emits: 'pr:approved',    requires: ['pr:submitted'], producer: { onStatus: 'approved', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'receive',  emits: 'rfq:received',   requires: ['pr:approved'], producer: { onStatus: 'received', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'award',    emits: 'rfq:awarded',    requires: ['rfq:received'], producer: { onStatus: 'awarded', aggregate: 'order' } },
      { collection: 'purchase-orders',       action: 'create',   emits: 'po:created',     requires: ['rfq:awarded'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'goods-receipts',        action: 'post',     emits: 'gr:posted',      requires: ['po:created'], producer: { onStatus: 'posted', aggregate: 'inventory_transfer' } },
      { collection: 'invoices',              action: 'activate', emits: 'bill:activated', requires: ['gr:posted'], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'invoices',              action: 'three-way-match', emits: 'bill:matched', requires: ['bill:activated', 'gr:posted', 'po:created'], producer: { onStatus: 'matched', aggregate: 'invoice' } },
      { collection: 'payments',              action: 'send',     emits: 'payment:sent',   requires: ['bill:matched'], producer: { onStatus: 'sent', aggregate: 'payment' } },
      { collection: 'invoices',              action: 'mark-paid', emits: 'bill:paid',     requires: ['payment:sent'], producer: { onStatus: 'paid', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/p2p-three-way-match.ts',
    testFile: 'src/plugins/accounting/seeds/chains/p2p-three-way-match.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-1 worked example shipped (KKKK seed+test + emitters). 3-way-match step is read-only assertion; existing invoice/payment GL handlers cover money movement.' },
  },

  R2R_PERIOD_CLOSE: {
    id: 'R2R_PERIOD_CLOSE',
    workflowSlug: 'record-to-report',
    name: 'Record-to-Report (period close)',
    description:
      'RecurringJournal materialisation → AccrualJE → Depreciation → LeasePeriodPosting → WipSnapshot → FxRevaluation → BankReconciliation → AccountReconciliation → IntercompanyTx → ConsolidationElim → RoundingAdjustment → PriorPeriodAdjustment → FinancialStatements. Orchestrated by `period:close:requested`.',
    standards: ['SOX §404', 'IAS-1 §27', 'IAS-8 §42', 'IAS-21 §28-29', 'IFRS-10 §B86'],
    featureGate: 'period_end_closing',
    steps: [
      // Slice BBBBBBBB (2026-05-11) — producer wiring populated. Every
      // step's `(collection, action)` deterministically maps to a
      // (status, aggregate) tuple; the factory's `wireChainProducersFor`
      // helper consumes this to register the matching afterChange hook.
      // Closes 13 Class J orphan emits in one chain.
      { collection: 'recurring-journals',          action: 'materialise',          emits: 'recur:materialised',  requires: [],
        producer: { onStatus: 'materialised', aggregate: 'invoice' } },
      { collection: 'period-end-adjustments',      action: 'post',                 emits: 'pea:posted',          requires: [],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'depreciation-schedules',      action: 'post',                 emits: 'depreciation:posted', requires: [],
        producer: { onStatus: 'posted', aggregate: 'fixed_asset' } },
      { collection: 'lease-period-postings',       action: 'post',                 emits: 'lpp:posted',          requires: [],
        producer: { onStatus: 'posted', aggregate: 'fixed_asset' } },
      { collection: 'wip-snapshots',               action: 'snapshot',             emits: 'wip:snapshot:posted', requires: [],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'fx-transactions',             action: 'revalue',              emits: 'fx:revalued',         requires: [],
        producer: { onStatus: 'revalued', aggregate: 'invoice' } },
      { collection: 'bank-reconciliations',        action: 'reconcile',            emits: 'bank:reconciled',     requires: [],
        producer: { onStatus: 'reconciled', aggregate: 'bank_statement' } },
      { collection: 'account-reconciliations',     action: 'reconcile',            emits: 'acct:reconciled',     requires: [],
        producer: { onStatus: 'reconciled', aggregate: 'bank_statement' } },
      { collection: 'intercompany-transactions',   action: 'post',                 emits: 'ic:posted',           requires: [],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'consolidation-eliminations',  action: 'post',                 emits: 'consol:elim:posted',  requires: ['ic:posted'],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'rounding-adjustments',        action: 'post',                 emits: 'round:posted',        requires: [],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'prior-period-adjustments',    action: 'post',                 emits: 'ppa:posted',          requires: [],
        producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'fiscal-periods',              action: 'lock',                 emits: 'period:locked',       requires: ['recur:materialised', 'pea:posted', 'depreciation:posted', 'lpp:posted', 'wip:snapshot:posted', 'fx:revalued', 'bank:reconciled', 'acct:reconciled', 'consol:elim:posted', 'round:posted'],
        producer: { onStatus: 'locked', aggregate: 'invoice' } },
      { collection: 'financial-statements',        action: 'generate',             emits: 'fs:generated',        requires: ['period:locked'],
        producer: { onStatus: 'generated', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/r2r-period-close.ts',
    testFile: 'src/plugins/accounting/seeds/chains/r2r-period-close.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-1 worked example shipped (KKKK seed+test). Per-step GL postings already covered by depreciation-posted, lease-period-postings, fx-revaluation, etc. handlers; orchestrator-level emits are bookkeeping (no money movement).' },
  },

  IFRS16_LEASE_CYCLE: {
    id: 'IFRS16_LEASE_CYCLE',
    name: 'IFRS-16 lease cycle',
    description:
      'LeaseAgreement → InitialJE (Dr ROU / Cr LeaseLiability) → periodic LeasePeriodPosting (interest accretion + ROU amortisation) → optional LeaseModification (remeasure liability + ROU adjust) → final Termination.',
    standards: ['IFRS-16', 'ASC-842', 'IFRS-16 §44-46 modifications', 'IFRS-16 §22 commencement'],
    featureGate: 'leasing',
    steps: [
      { collection: 'leases',                action: 'commence', emits: 'lease:commenced',     requires: [], producer: { onStatus: 'commenced', aggregate: 'fixed_asset' } },
      { collection: 'lease-period-postings', action: 'post',     emits: 'lpp:posted',          requires: ['lease:commenced'], producer: { onStatus: 'posted', aggregate: 'fixed_asset' } },
      { collection: 'lease-modifications',   action: 'remeasure', emits: 'lease:remeasured',   requires: ['lease:commenced'], producer: { onStatus: 'remeasured', aggregate: 'fixed_asset' } },
      { collection: 'lease-period-postings', action: 'post-after-mod', emits: 'lpp:posted',    requires: ['lease:remeasured'], producer: { onStatus: 'posted', aggregate: 'fixed_asset' } },
      { collection: 'leases',                action: 'terminate', emits: 'lease:terminated',   requires: ['lease:commenced'], producer: { onStatus: 'terminated', aggregate: 'fixed_asset' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/ifrs16-lease-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/ifrs16-lease-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-1 worked example shipped (KKKK); GL handler for lease:remeasured shipped in Slice NNNN per IFRS-16 §44-46.' },
  },

  SUBSCRIPTION_BILLING_CYCLE: {
    id: 'SUBSCRIPTION_BILLING_CYCLE',
    name: 'Subscription billing cycle (IFRS-15 §35 + B16)',
    description:
      'SubscriptionPlan → Subscription activated → UsageRecord events accumulate → BillingRun aggregates by (tenant, feature, billingPeriod) → Invoice issued → Payment received. IFRS-15 §B16 metered + §35 over-time recognition.',
    standards: ['IFRS-15 §35', 'IFRS-15 §B16-B19', 'ASC 606-10-32-40'],
    featureGate: undefined, // core
    steps: [
      { collection: 'subscriptions',     action: 'activate',  emits: 'subscription:activated', requires: [], producer: { onStatus: 'activated', aggregate: 'subscription' } },
      { collection: 'usage-records',     action: 'record',    emits: 'usage:recorded',         requires: ['subscription:activated'], producer: { onStatus: 'recorded', aggregate: 'subscription' } },
      { collection: 'invoices',          action: 'issue',     emits: 'subscription:invoiced',  requires: ['usage:recorded'], producer: { onStatus: 'issued', aggregate: 'invoice' } },
      { collection: 'payments',          action: 'receive',   emits: 'payment:received',       requires: ['subscription:invoiced'], producer: { onStatus: 'received', aggregate: 'payment' } },
      { collection: 'invoices',          action: 'mark-paid', emits: 'invoice:completed',      requires: ['payment:received'], producer: { onStatus: 'paid', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/subscription-billing-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/subscription-billing-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-1. All emits already exist (Slice SSS). Adds usage:recorded emit on UsageRecords.afterChange.' },
  },

  // ─── Cut 2 — partial-but-meaningful ─────────────────────────────────
  H2R_HIRE_TO_RETIRE: {
    id: 'H2R_HIRE_TO_RETIRE',
    name: 'Hire-to-Retire',
    description:
      'JobPosition opened → RecruitingPipeline → Offer accepted → Employee created → TimeEntry posted → ExpenseReport approved → LeaveRequest approved → PerformanceReview → SalesCommission booked → PayrollRun → optional Termination.',
    standards: ['IAS-19', 'GDPR Art.6(1)(b) recruitment', 'GDPR Art.5(1)(e) PII retention', 'national labour codes'],
    featureGate: undefined, // core HR
    steps: [
      { collection: 'job-positions',         action: 'open',     emits: 'position:opened',   requires: [], producer: { onStatus: 'opened', aggregate: 'order' } },
      { collection: 'recruiting-pipeline',   action: 'apply',    emits: 'pipeline:applied',  requires: ['position:opened'], producer: { onStatus: 'applied', aggregate: 'order' } },
      { collection: 'recruiting-pipeline',   action: 'hire',     emits: 'pipeline:hired',    requires: ['pipeline:applied'], producer: { onStatus: 'hired', aggregate: 'order' } },
      { collection: 'employees',             action: 'create',   emits: 'employee:created',  requires: ['pipeline:hired'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'time-entries',          action: 'post',     emits: 'time:posted',       requires: ['employee:created'], producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'expense-reports',       action: 'approve',  emits: 'expense:approved',  requires: ['employee:created'], producer: { onStatus: 'approved', aggregate: 'invoice' } },
      { collection: 'leave-requests',        action: 'approve',  emits: 'leave:approved',    requires: ['employee:created'], producer: { onStatus: 'approved', aggregate: 'order' } },
      { collection: 'performance-reviews',   action: 'finalise', emits: 'review:finalised',  requires: ['employee:created'], producer: { onStatus: 'finalised', aggregate: 'order' } },
      { collection: 'payroll-runs',          action: 'run',      emits: 'payroll:run',       requires: ['time:posted', 'expense:approved'], producer: { onStatus: 'run', aggregate: 'payment' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/h2r-hire-to-retire.ts',
    testFile: 'src/plugins/accounting/seeds/chains/h2r-hire-to-retire.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-2 worked example shipped in Slice NNNN. Optional auto-creation pipeline:hired → employee:created can land in a follow-up slice.' },
  },

  MANUFACTURING_CYCLE: {
    id: 'MANUFACTURING_CYCLE',
    name: 'Manufacturing cycle (IAS-2 + ISA-95)',
    description:
      'BillOfMaterials versioned → WorkOrder released → MaterialIssue (InventoryMovement out) → ProductionReceipt (FG in at absorbed cost) → CostVariance computed → QualityInspection → finished-goods sale (InventoryMovement out + COGS).',
    standards: ['IAS-2 §10-14', 'IAS-2 §21 variances', 'ISA-95 §B.5', 'ISO 9001 §8.7 nonconformance'],
    featureGate: 'manufacturing',
    steps: [
      { collection: 'bills-of-materials',   action: 'release',  emits: 'bom:released',    requires: [], producer: { onStatus: 'released', aggregate: 'inventory_transfer' } },
      { collection: 'work-orders',          action: 'release',  emits: 'wo:released',     requires: ['bom:released'], producer: { onStatus: 'released', aggregate: 'inventory_transfer' } },
      { collection: 'inventory-movements',  action: 'issue',    emits: 'inventory:issued', requires: ['wo:released'], producer: { onStatus: 'issued', aggregate: 'inventory_transfer' } },
      { collection: 'production-receipts',  action: 'post',     emits: 'prod:completed',  requires: ['inventory:issued'], producer: { onStatus: 'posted', aggregate: 'inventory_transfer' } },
      { collection: 'cost-variances',       action: 'compute',  emits: 'variance:computed', requires: ['prod:completed'], producer: { onStatus: 'computed', aggregate: 'invoice' } },
      { collection: 'quality-inspections',  action: 'inspect',  emits: 'qc:complete',     requires: ['prod:completed'], producer: { onStatus: 'inspected', aggregate: 'inventory_transfer' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/manufacturing-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/manufacturing-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-2 worked example shipped in Slice MMMM. GL handlers for prod:completed (FG receipt) + variance:computed (variance JE) shipped in Slice NNNN.' },
  },

  WORKFLOW_APPROVAL_CYCLE: {
    id: 'WORKFLOW_APPROVAL_CYCLE',
    name: 'Multi-step workflow approval',
    description:
      'Document submitted → matching workflow-definitions found → workflow-instance spawned → step decisions appended → final outcome approved/rejected → mutate target document accordingly.',
    standards: ['ISO/IEC 19510:2013 BPMN-2.0', 'SOX §404', 'ISO 27002 §5.4', 'ISO 19011:2018'],
    featureGate: 'workflow_engine',
    steps: [
      { collection: 'workflow-definitions', action: 'match',          emits: null,                       requires: [] },
      { collection: 'workflow-instances',   action: 'spawn',          emits: 'workflow:spawned',         requires: [], producer: { onStatus: 'spawned', aggregate: 'order' } },
      { collection: 'workflow-instances',   action: 'step-decision',  emits: 'workflow:step-decided',    requires: ['workflow:spawned'] },
      { collection: 'workflow-instances',   action: 'finalise',       emits: 'workflow:finalised',       requires: ['workflow:step-decided'], producer: { onStatus: 'finalised', aggregate: 'order' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/workflow-approval-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/workflow-approval-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-2 worked example shipped in Slice OOOO. Orchestrator (HHHH) + chain seed/test live; per-collection beforeChange wiring (auto-spawn on doc submit) can land in a follow-up slice.' },
  },

  BULK_IMPORT_CYCLE: {
    id: 'BULK_IMPORT_CYCLE',
    name: 'Bulk import cycle',
    description:
      'File uploaded → BulkOperation enqueued → per-row mapper invoked → success rows persisted / failures land in transaction-failures → reprocess loop until clean.',
    standards: ['RFC 4180 csv', 'ISO 20022 camt.053', 'EN-16931 ubl/cii', 'SOX §404 TOM-FAIL-01'],
    featureGate: undefined, // core
    steps: [
      { collection: 'transaction-failures',  action: 'enqueue', emits: 'bulk:enqueued',  requires: [], producer: { onStatus: 'enqueued', aggregate: 'invoice' } },
      { collection: 'transaction-failures',  action: 'process', emits: 'bulk:processed', requires: ['bulk:enqueued'], producer: { onStatus: 'processed', aggregate: 'invoice' } },
      { collection: 'transaction-failures',  action: 'reprocess', emits: 'bulk:reprocessed', requires: ['bulk:processed'], producer: { onStatus: 'reprocessed', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/bulk-import-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/bulk-import-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Worked example shipped in Slice TTTT (3-step enqueue → process → reprocess; demonstrates row-failure → resolution). Concrete CSV / UBL parsers still queued — orthogonal to chain framework correctness.' },
  },

  // ─── Cut 3 — most wiring needed ─────────────────────────────────────
  O2C_GOODS: {
    id: 'O2C_GOODS',
    name: 'Order-to-Cash (physical goods)',
    description:
      'Lead qualified → Opportunity → Quote → Contract signed → Shipment dispatched → Invoice issued at delivery → Payment received → Bank reconciliation. IFRS-15 §38 control transfer at delivery.',
    standards: ['IFRS-15 §38 point-in-time', 'INCOTERMS 2020', 'IAS-2'],
    featureGate: undefined, // core
    steps: [
      { collection: 'leads',                  action: 'qualify',     emits: 'lead:qualified',    requires: [], producer: { onStatus: 'qualified', aggregate: 'order' } },
      { collection: 'opportunities',          action: 'close-won',   emits: 'opp:won',           requires: ['lead:qualified'], producer: { onStatus: 'won', aggregate: 'order' } },
      { collection: 'quotes',                 action: 'send',        emits: 'quote:sent',        requires: ['opp:won'], producer: { onStatus: 'sent', aggregate: 'order' } },
      { collection: 'contracts',              action: 'sign',        emits: 'contract:signed',   requires: ['quote:sent'], producer: { onStatus: 'signed', aggregate: 'order' } },
      { collection: 'shipments',              action: 'dispatch',    emits: 'shipment:dispatched', requires: ['contract:signed'], producer: { onStatus: 'dispatched', aggregate: 'inventory_transfer' } },
      { collection: 'tracking-events',        action: 'deliver',     emits: 'shipment:delivered', requires: ['shipment:dispatched'], producer: { onStatus: 'delivered', aggregate: 'inventory_transfer' } },
      { collection: 'invoices',               action: 'activate',    emits: 'invoice:activated', requires: ['shipment:delivered'], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'payments',               action: 'receive',     emits: 'payment:received',  requires: ['invoice:activated'], producer: { onStatus: 'received', aggregate: 'payment' } },
      { collection: 'invoices',               action: 'complete',    emits: 'invoice:completed', requires: ['payment:received'], producer: { onStatus: 'completed', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/o2c-goods.ts',
    testFile: 'src/plugins/accounting/seeds/chains/o2c-goods.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-3 worked example shipped in Slice NNNN. lead/opp emits live (KKKK); contract:signed → shipment auto-create can land in a follow-up slice.' },
  },

  O2C_SERVICES_OVER_TIME: {
    id: 'O2C_SERVICES_OVER_TIME',
    name: 'Order-to-Cash (services / over-time)',
    description:
      'Opportunity → Contract → PerformanceObligation → Project → ProjectTask + TimeEntry posted → period-end WipSnapshot → MilestoneInvoice → Payment. IFRS-15 §35 over-time + cost-to-cost progress.',
    standards: ['IFRS-15 §35', 'IFRS-15 §B14-B19 cost-to-cost', 'IFRS-15 §126 milestone-billing'],
    featureGate: 'project_accounting',
    steps: [
      { collection: 'opportunities',           action: 'close-won',  emits: 'opp:won',           requires: [], producer: { onStatus: 'won', aggregate: 'order' } },
      { collection: 'contracts',               action: 'sign',       emits: 'contract:signed',   requires: ['opp:won'], producer: { onStatus: 'signed', aggregate: 'order' } },
      { collection: 'performance-obligations', action: 'identify',   emits: 'po-obl:identified', requires: ['contract:signed'] },
      { collection: 'projects',                action: 'create',     emits: 'project:created',   requires: ['po-obl:identified'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'project-tasks',           action: 'plan',       emits: 'task:planned',      requires: ['project:created'], producer: { onStatus: 'planned', aggregate: 'order' } },
      { collection: 'time-entries',            action: 'post',       emits: 'time:posted',       requires: ['task:planned'], producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'wip-snapshots',           action: 'snapshot',   emits: 'wip:snapshot:posted', requires: ['time:posted'] },
      { collection: 'project-milestones',      action: 'achieve',    emits: 'milestone:achieved', requires: ['wip:snapshot:posted'], producer: { onStatus: 'achieved', aggregate: 'invoice' } },
      { collection: 'invoices',                action: 'milestone-invoice', emits: 'invoice:activated', requires: ['milestone:achieved'], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'payments',                action: 'receive',    emits: 'payment:received',  requires: ['invoice:activated'], producer: { onStatus: 'received', aggregate: 'payment' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/o2c-services-over-time.ts',
    testFile: 'src/plugins/accounting/seeds/chains/o2c-services-over-time.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-3 worked example shipped in Slice PPPP. Emits + GL handlers + seed/test pair all live; full IFRS-15 §B18 cost-to-cost + §126 milestone billing flow exercised end-to-end.' },
  },

  CRM_LEAD_TO_CASH: {
    id: 'CRM_LEAD_TO_CASH',
    name: 'CRM lead-to-cash',
    description:
      'Lead created → Activity logged → MQL → SQL → Opportunity → CloseWon → Customer auto-created → Contract → SalesCommission booked (IFRS-15 §91-94 capitalise vs expense decision).',
    standards: ['IFRS-15 §9 contract-existence', 'IFRS-15 §91-94 incremental-costs', 'GDPR Art.5 Art.6(1)(f)'],
    featureGate: 'crm',
    steps: [
      { collection: 'leads',         action: 'create',       emits: 'lead:created',      requires: [], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'activities',    action: 'log',          emits: 'activity:logged',   requires: ['lead:created'], producer: { onStatus: 'logged', aggregate: 'order' } },
      { collection: 'leads',         action: 'qualify-mql',  emits: 'lead:mql',          requires: ['activity:logged'], producer: { onStatus: 'mql', aggregate: 'order' } },
      { collection: 'leads',         action: 'qualify-sql',  emits: 'lead:sql',          requires: ['lead:mql'], producer: { onStatus: 'sql', aggregate: 'order' } },
      { collection: 'opportunities', action: 'create',       emits: 'opp:created',       requires: ['lead:sql'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'opportunities', action: 'close-won',    emits: 'opp:won',           requires: ['opp:created'], producer: { onStatus: 'won', aggregate: 'order' } },
      { collection: 'customers',     action: 'create',       emits: 'customer:created',  requires: ['opp:won'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'contracts',     action: 'sign',         emits: 'contract:signed',   requires: ['customer:created'], producer: { onStatus: 'signed', aggregate: 'order' } },
      { collection: 'sales-commissions', action: 'book',     emits: 'commission:booked', requires: ['opp:won'], producer: { onStatus: 'booked', aggregate: 'payment' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/crm-lead-to-cash.ts',
    testFile: 'src/plugins/accounting/seeds/chains/crm-lead-to-cash.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-3 worked example shipped in Slice NNNN. Stage transitions live (KKKK); opp:won → commission auto-book can land in a follow-up slice.' },
  },

  PROVISION_LIFECYCLE: {
    id: 'PROVISION_LIFECYCLE',
    name: 'Provision lifecycle (IAS-37)',
    description:
      'Trigger event (audit-finding / litigation / contract become onerous) → Provision recognised at best estimate → periodic remeasurement (movementHistory append) → final Use / Reversal / Reclassification to liability.',
    standards: ['IAS-37 §14 §36 §59 §70', 'ASC 450-20'],
    featureGate: 'period_end_closing',
    steps: [
      { collection: 'audit-findings',  action: 'recognise',  emits: 'finding:recognised', requires: [], producer: { onStatus: 'recognised', aggregate: 'order' } },
      { collection: 'provisions',      action: 'recognise',  emits: 'provision:recognised', requires: ['finding:recognised'], producer: { onStatus: 'recognised', aggregate: 'invoice' } },
      { collection: 'provisions',      action: 'remeasure',  emits: 'provision:remeasured', requires: ['provision:recognised'], producer: { onStatus: 'remeasured', aggregate: 'invoice' } },
      { collection: 'provisions',      action: 'use',        emits: 'provision:used',     requires: ['provision:recognised'], producer: { onStatus: 'used', aggregate: 'invoice' } },
      { collection: 'provisions',      action: 'reverse',    emits: 'provision:reversed', requires: ['provision:recognised'], producer: { onStatus: 'reversed', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/provision-lifecycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/provision-lifecycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-3 worked example shipped in Slice OOOO. audit-finding → provision auto-suggester + remeasurement scheduler can land in a follow-up slice.' },
  },

  // ─── Cut 4 — most service work ──────────────────────────────────────
  ESG_REPORTING_CYCLE: {
    id: 'ESG_REPORTING_CYCLE',
    name: 'ESG reporting cycle (CSRD)',
    description:
      'CarbonEmissions data points (Scope 1/2/3) collected → CsrdDisclosures rollup per ESRS topic → ISAE 3000/3410 assurance engagement → EvidenceAttestation signed (eIDAS) → XBRL filed.',
    standards: ['EU CSRD 2022/2464', 'EU ESRS 1/2/E1', 'GHG Protocol', 'ISAE 3000', 'ISAE 3410', 'eIDAS Art.28'],
    featureGate: 'esg_reporting',
    steps: [
      { collection: 'carbon-emissions',     action: 'record',     emits: 'ghg:recorded',      requires: [], producer: { onStatus: 'recorded', aggregate: 'invoice' } },
      { collection: 'csrd-disclosures',     action: 'rollup',     emits: 'csrd:rolled-up',    requires: ['ghg:recorded'] },
      { collection: 'csrd-disclosures',     action: 'assure',     emits: 'csrd:assured',      requires: ['csrd:rolled-up'], producer: { onStatus: 'assured', aggregate: 'invoice' } },
      { collection: 'evidence-attestations', action: 'sign',      emits: 'evidence:signed',   requires: ['csrd:assured'], producer: { onStatus: 'signed', aggregate: 'order' } },
      { collection: 'csrd-disclosures',     action: 'file',       emits: 'csrd:filed',        requires: ['evidence:signed'], producer: { onStatus: 'filed', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/esg-reporting-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/esg-reporting-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Worked example shipped in Slice TTTT (5-step 3-Scope GHG → CSRD rollup → ISAE 3000 assure → eIDAS sign → file). ESRS-XBRL filer service still queued — orthogonal to chain framework correctness.' },
  },

  KYC_SANCTIONS_REVIEW: {
    id: 'KYC_SANCTIONS_REVIEW',
    name: 'KYC + sanctions screening',
    description:
      'Customer/Vendor onboarded → KycCheck initiated → BeneficialOwners registered → AI sanctions screen → human review for high-risk → approval/rejection → periodic re-screen on schedule.',
    standards: ['FATF R.10 R.12 R.24', 'EU AMLD5', 'EU CFSP sanctions'],
    featureGate: 'compliance_aml',
    steps: [
      { collection: 'customers',         action: 'onboard',      emits: 'customer:onboard',     requires: [], producer: { onStatus: 'onboarded', aggregate: 'order' } },
      { collection: 'kyc-checks',        action: 'initiate',     emits: 'kyc:initiated',        requires: ['customer:onboard'], producer: { onStatus: 'initiated', aggregate: 'order' } },
      { collection: 'beneficial-owners', action: 'register',     emits: 'ubo:registered',       requires: ['kyc:initiated'], producer: { onStatus: 'registered', aggregate: 'order' } },
      { collection: 'ai-suggestions',    action: 'screen',       emits: 'sanctions:screened',   requires: ['ubo:registered'], producer: { onStatus: 'screened', aggregate: 'order' } },
      { collection: 'kyc-checks',        action: 'approve',      emits: 'kyc:approved',         requires: ['sanctions:screened'], producer: { onStatus: 'approved', aggregate: 'order' } },
      { collection: 'kyc-checks',        action: 'rescreen',     emits: 'kyc:rescreened',       requires: ['kyc:approved'], producer: { onStatus: 'rescreened', aggregate: 'order' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/kyc-sanctions-review.ts',
    testFile: 'src/plugins/accounting/seeds/chains/kyc-sanctions-review.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Worked example shipped in Slice TTTT (6-step onboard → KYC → UBO → AI screen → approve → scheduled re-screen). Both AI rows are EU AI Act high-risk, never auto-accepting at initial screen per Annex III. Scheduler entry KYC_RESCREEN_SWEEP already in scheduled-tasks/registry.ts.' },
  },

  // ─── Cut 5 — multi-relation business cases (Slice RRRR) ────────────
  MULTI_INVOICE_PAYMENT_ALLOCATION: {
    id: 'MULTI_INVOICE_PAYMENT_ALLOCATION',
    name: 'Multi-invoice payment allocation',
    description:
      'Customer settles 3 outstanding invoices in one wire transfer. PaymentAllocations bridge splits the single payment across the three invoices; each allocation triggers per-invoice `invoice:completed` when its allocated amount fully settles. SOX §404 TOM-AR-02 walks Σ(allocations) → payment.amount.',
    standards: ['SOX §404 TOM-AR-02', 'IFRS-15 §47 transaction-price-allocation', 'IAS-7 §6 cash-flow-classification'],
    featureGate: undefined, // core
    steps: [
      { collection: 'invoices',            action: 'activate-1', emits: 'invoice:activated', requires: [], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'invoices',            action: 'activate-2', emits: 'invoice:activated', requires: [], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'invoices',            action: 'activate-3', emits: 'invoice:activated', requires: [], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'payments',            action: 'receive-bulk', emits: 'payment:received', requires: ['invoice:activated'], producer: { onStatus: 'received', aggregate: 'payment' } },
      { collection: 'payment-allocations', action: 'allocate-1', emits: 'allocation:posted', requires: ['payment:received'], producer: { onStatus: 'posted', aggregate: 'payment' } },
      { collection: 'payment-allocations', action: 'allocate-2', emits: 'allocation:posted', requires: ['payment:received'], producer: { onStatus: 'posted', aggregate: 'payment' } },
      { collection: 'payment-allocations', action: 'allocate-3', emits: 'allocation:posted', requires: ['payment:received'], producer: { onStatus: 'posted', aggregate: 'payment' } },
      { collection: 'invoices',            action: 'complete-1', emits: 'invoice:completed', requires: ['allocation:posted'], producer: { onStatus: 'completed', aggregate: 'invoice' } },
      { collection: 'invoices',            action: 'complete-2', emits: 'invoice:completed', requires: ['allocation:posted'], producer: { onStatus: 'completed', aggregate: 'invoice' } },
      { collection: 'invoices',            action: 'complete-3', emits: 'invoice:completed', requires: ['allocation:posted'], producer: { onStatus: 'completed', aggregate: 'invoice' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/multi-invoice-payment-allocation.ts',
    testFile: 'src/plugins/accounting/seeds/chains/multi-invoice-payment-allocation.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Multi-relation cut-5. Exercises PaymentAllocations 1:N bridge. Asserts Σ(allocations.allocatedAmount) == payment.amount and each invoice individually fires invoice:completed.' },
  },

  INTERCOMPANY_CONSOLIDATION: {
    id: 'INTERCOMPANY_CONSOLIDATION',
    name: 'Intercompany transaction with consolidation elimination',
    description:
      'Sub-A (DE) sells to Sub-B (BG) within the same group. Each entity books its own JE (Sub-A: AR + Revenue; Sub-B: Inventory + AP). At consolidation, the matched IntercompanyTransactions pair triggers a ConsolidationElimination JE that removes both legs from the group P&L per IFRS-10 §B86(c).',
    standards: ['IFRS-10 §B86 consolidation-procedures', 'IFRS-10 §B86(c) eliminate-intra-group', 'ASC-810-10-45', 'OECD BEPS Action 13'],
    featureGate: 'consolidation',
    steps: [
      { collection: 'legal-entities',              action: 'register-sub-a',  emits: 'entity:registered', requires: [], producer: { onStatus: 'registered', aggregate: 'order' } },
      { collection: 'legal-entities',              action: 'register-sub-b',  emits: 'entity:registered', requires: [], producer: { onStatus: 'registered', aggregate: 'order' } },
      { collection: 'intercompany-transactions',   action: 'post-leg-a',      emits: 'ic:posted', requires: ['entity:registered'], producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'intercompany-transactions',   action: 'post-leg-b',      emits: 'ic:posted', requires: ['entity:registered'], producer: { onStatus: 'posted', aggregate: 'invoice' } },
      { collection: 'intercompany-transactions',   action: 'reconcile-pair',  emits: 'ic:reconciled', requires: ['ic:posted'], producer: { onStatus: 'reconciled', aggregate: 'invoice' } },
      { collection: 'consolidation-eliminations',  action: 'post-elimination', emits: 'consol:elim:posted', requires: ['ic:reconciled'] },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/intercompany-consolidation.ts',
    testFile: 'src/plugins/accounting/seeds/chains/intercompany-consolidation.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Multi-relation cut-5. Exercises 2 legal-entities + IntercompanyTransactions paired legs + ConsolidationEliminations. Asserts pair-reconciliation invariant: leg-a.amount == leg-b.amount and elim cancels both.' },
  },

  MULTI_VENDOR_PR_SPLIT_AWARD: {
    id: 'MULTI_VENDOR_PR_SPLIT_AWARD',
    name: 'Multi-vendor PR split award',
    description:
      'Single purchase requisition for 100 units; 3 vendor quotes returned (best price, best lead-time, certified vendor). Award split: 60 units to lowest-price vendor, 40 units to fastest. Two separate POs created. SOX §404 + OECD BEPS Action 13 — split rationale captured per quote.',
    standards: ['SOX §404 P2P-01', 'ISO 9001:2015 §8.4 vendor-evaluation', 'OECD BEPS Action 13 procurement-evidence'],
    featureGate: undefined, // core
    steps: [
      { collection: 'purchase-requisitions', action: 'submit',       emits: 'pr:submitted', requires: [], producer: { onStatus: 'submitted', aggregate: 'order' } },
      { collection: 'purchase-requisitions', action: 'approve',      emits: 'pr:approved',  requires: ['pr:submitted'], producer: { onStatus: 'approved', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'receive-q1',   emits: 'rfq:received', requires: ['pr:approved'], producer: { onStatus: 'received', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'receive-q2',   emits: 'rfq:received', requires: ['pr:approved'], producer: { onStatus: 'received', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'receive-q3',   emits: 'rfq:received', requires: ['pr:approved'], producer: { onStatus: 'received', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'award-q1',     emits: 'rfq:awarded',  requires: ['rfq:received'], producer: { onStatus: 'awarded', aggregate: 'order' } },
      { collection: 'vendor-quotes',         action: 'award-q2',     emits: 'rfq:awarded',  requires: ['rfq:received'], producer: { onStatus: 'awarded', aggregate: 'order' } },
      { collection: 'purchase-orders',       action: 'create-po-1',  emits: 'po:created',   requires: ['rfq:awarded'], producer: { onCreate: true, aggregate: 'order' } },
      { collection: 'purchase-orders',       action: 'create-po-2',  emits: 'po:created',   requires: ['rfq:awarded'], producer: { onCreate: true, aggregate: 'order' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/multi-vendor-pr-split-award.ts',
    testFile: 'src/plugins/accounting/seeds/chains/multi-vendor-pr-split-award.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Multi-relation cut-5. Worked example shipped in Slice SSSS — exercises 1 PR → 3 RFQs → 2 awards (with rationale per OECD BEPS Action 13) → 2 POs with quote backlinks. Asserts 3 quotes share single requisition FK + 2 awarded with rationale + 2 POs backlinked.' },
  },

  NOTIFICATION_DISPATCH: {
    id: 'NOTIFICATION_DISPATCH',
    name: 'Notification dispatch',
    description:
      'Domain event fired → notification subscriber matches → fan-out to email + in_app + webhook + slack channels per user preferences → audit row written.',
    standards: ['RFC 5321/5322', 'GDPR Art.7 transactional-consent', 'ISO 19011 §6.4.6'],
    featureGate: undefined, // core
    steps: [
      { collection: 'audit-events',  action: 'observe-domain-event', emits: 'notify:observed', requires: [], producer: { onStatus: 'observed', aggregate: 'order' } },
      { collection: 'audit-events',  action: 'dispatch',             emits: 'notify:dispatched', requires: ['notify:observed'], producer: { onStatus: 'dispatched', aggregate: 'order' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/notification-dispatch.ts',
    testFile: 'src/plugins/accounting/seeds/chains/notification-dispatch.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Cut-4 worked example shipped in Slice PPPP. wireNotificationSubscriber() now subscribes 9 domain events (invoice/bill/subscription/milestone/lease/sanctions/workflow) to declarative templates → fan-out via sendNotification(). Idempotent + best-effort (never blocks GL).' },
  },

  // ─── Slice ZZZZ — consignations + bookings + facility-management ─────
  CONSIGNMENT_CYCLE: {
    id: 'CONSIGNMENT_CYCLE',
    name: 'Consignment cycle',
    description:
      'Consignment arrangement signed → goods shipped to consignee → on-hand balance maintained at consignee location → consignee reports sale to end-customer → consignor recognises revenue + COGS + commission expense (control transfers per IFRS-15 §B78).',
    standards: ['IFRS IFRS-15 §B77-B78 consignment-arrangements', 'IFRS IFRS-15 §38 point-in-time-control-transfer', 'IFRS IAS-2 §6 inventories-held-at-other-location', 'US-GAAP ASC-606-10-55-79 consignment-indicators', 'INCOTERMS 2020', 'SOX §404 TOM-AR-04 revenue-deferral'],
    featureGate: 'consignment_inventory',
    steps: [
      { collection: 'consignment-arrangements', action: 'sign',           emits: 'consignment:arranged', requires: [], producer: { onStatus: 'signed', aggregate: 'order' } },
      { collection: 'inventory-movements',      action: 'ship-to-consignee', emits: 'inventory:issued',  requires: ['consignment:arranged'], producer: { onStatus: 'issued', aggregate: 'inventory_transfer' } },
      { collection: 'consignment-inventory',    action: 'open-balance',   emits: 'consignment:on-hand', requires: ['inventory:issued'] },
      { collection: 'consignment-sales',        action: 'report-sale',    emits: 'consignment:sold',    requires: ['consignment:on-hand'], producer: { onStatus: 'sold', aggregate: 'invoice' } },
      { collection: 'invoices',                 action: 'invoice-consignee', emits: 'invoice:activated', requires: ['consignment:sold'], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'payments',                 action: 'receive-payment', emits: 'payment:received',   requires: ['invoice:activated'], producer: { onStatus: 'received', aggregate: 'payment' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/consignment-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/consignment-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Slice ZZZZ. Asserts on-hand decrement = quantitySold and revenue posts only on consignee-reported sale per IFRS-15 §B78.' },
  },

  RESOURCE_BOOKING_CYCLE: {
    id: 'RESOURCE_BOOKING_CYCLE',
    name: 'Resource booking cycle',
    description:
      'Bookable-resource catalogued → booking requested → confirmed → check-in → check-out → invoice + payment. Drives IFRS-15 §35 over-time recognition for multi-night/multi-day bookings and §38 point-in-time for one-off uses.',
    standards: ['ISO 18513:2021 tourism-services-vocabulary', 'IFRS IFRS-15 §35 over-time-recognition', 'IFRS IFRS-15 §38 point-in-time-recognition', 'IFRS IFRS-15 §B40-B43 cancellation-policy-breakage', 'rfc-5545 icalendar-rrule', 'GDPR Art.6(1)(b) lawful-basis-contract'],
    featureGate: 'resource_bookings',
    steps: [
      { collection: 'bookable-resources', action: 'catalogue',  emits: 'resource:catalogued', requires: [], producer: { onStatus: 'catalogued', aggregate: 'order' } },
      { collection: 'bookings',           action: 'request',    emits: 'booking:requested',   requires: ['resource:catalogued'], producer: { onStatus: 'requested', aggregate: 'order' } },
      { collection: 'bookings',           action: 'confirm',    emits: 'booking:confirmed',   requires: ['booking:requested'], producer: { onStatus: 'confirmed', aggregate: 'order' } },
      { collection: 'bookings',           action: 'check-in',   emits: 'booking:checked_in',  requires: ['booking:confirmed'], producer: { onStatus: 'checked_in', aggregate: 'order' } },
      { collection: 'bookings',           action: 'check-out',  emits: 'booking:checked_out', requires: ['booking:checked_in'], producer: { onStatus: 'checked_out', aggregate: 'order' } },
      { collection: 'invoices',           action: 'invoice',    emits: 'invoice:activated',   requires: ['booking:checked_out'], producer: { onStatus: 'activated', aggregate: 'invoice' } },
      { collection: 'payments',           action: 'pay',        emits: 'payment:received',    requires: ['invoice:activated'], producer: { onStatus: 'paid', aggregate: 'payment' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/resource-booking-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/resource-booking-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Slice ZZZZ. Generic booking primitive serves hospitality / fleet / equipment / meeting-room / field-service via the kind discriminator. ISO 18513 drives the hotel-room semantics; rfc-5545 drives recurrence.' },
  },

  FACILITY_MAINTENANCE_CYCLE: {
    id: 'FACILITY_MAINTENANCE_CYCLE',
    name: 'Facility maintenance cycle',
    description:
      'Property + space catalogued → user / sensor raises maintenance request → triaged → work order issued → parts issued (inventory) + labour booked (time-entries) → completed → quality-inspected → cost posted as expense (IAS-16 §12) or capitalised (IAS-16 §13). Closes the ISO 41001 / ISO 55000 / ISO 14224 IWMS+CMMS loop.',
    standards: ['ISO 41001:2018 §8.1 facility-management-operational-control', 'ISO 41011:2017 vocabulary', 'ISO 55000:2014 asset-management', 'ISO 14224:2016 reliability-and-maintenance-data', 'EN 13306:2017 maintenance-terminology', 'IFRS IAS-16 §12 §13 capitalisable-vs-expense', 'SOX §404 capex-vs-opex-classification'],
    featureGate: 'facility_management',
    steps: [
      { collection: 'properties',               action: 'register-property', emits: 'property:registered', requires: [], producer: { onStatus: 'registered', aggregate: 'fixed_asset' } },
      { collection: 'spaces',                   action: 'register-space',    emits: 'space:registered',    requires: ['property:registered'], producer: { onStatus: 'registered', aggregate: 'fixed_asset' } },
      { collection: 'maintenance-requests',     action: 'raise',             emits: 'mr:raised',           requires: ['space:registered'], producer: { onStatus: 'raised', aggregate: 'order' } },
      { collection: 'maintenance-requests',     action: 'triage',            emits: 'mr:triaged',          requires: ['mr:raised'], producer: { onStatus: 'triaged', aggregate: 'order' } },
      { collection: 'maintenance-work-orders',  action: 'issue',             emits: 'wo:issued',           requires: ['mr:triaged'], producer: { onStatus: 'issued', aggregate: 'order' } },
      { collection: 'inventory-movements',      action: 'issue-parts',       emits: 'inventory:issued',    requires: ['wo:issued'], producer: { onStatus: 'issued', aggregate: 'inventory_transfer' } },
      { collection: 'time-entries',             action: 'book-labour',       emits: 'time:posted',         requires: ['wo:issued'], producer: { onStatus: 'booked', aggregate: 'invoice' } },
      { collection: 'maintenance-work-orders',  action: 'complete',          emits: 'wo:completed',        requires: ['inventory:issued', 'time:posted'], producer: { onStatus: 'completed', aggregate: 'order' } },
      { collection: 'quality-inspections',      action: 'inspect',           emits: 'qc:complete',         requires: ['wo:completed'], producer: { onStatus: 'inspected', aggregate: 'inventory_transfer' } },
      { collection: 'maintenance-work-orders',  action: 'close-and-post',    emits: 'wo:closed',           requires: ['qc:complete'], producer: { onStatus: 'closed', aggregate: 'order' } },
    ],
    seedFile: 'src/plugins/accounting/seeds/chains/facility-maintenance-cycle.ts',
    testFile: 'src/plugins/accounting/seeds/chains/facility-maintenance-cycle.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Slice ZZZZ. End-to-end IWMS / CMMS — covers property + space FM master, ticket-to-work-order promotion, parts + labour roll-up, capex-vs-opex classification per IAS-16 §12 vs §13.' },
  },
} as const

/** Convenience: all chain ids. */
export const BUSINESS_CHAIN_IDS = Object.keys(BUSINESS_CHAINS) as ReadonlyArray<keyof typeof BUSINESS_CHAINS>

/** Convenience: chains touching a given collection. */
export function chainsForCollection(slug: string): ReadonlyArray<typeof BUSINESS_CHAINS[keyof typeof BUSINESS_CHAINS]> {
  return Object.values(BUSINESS_CHAINS).filter((c) => c.steps.some((s) => s.collection === slug))
}

/** Convenience: chains gated by a given feature id. */
export function chainsForFeature(feature: string): ReadonlyArray<typeof BUSINESS_CHAINS[keyof typeof BUSINESS_CHAINS]> {
  return Object.values(BUSINESS_CHAINS).filter((c) => c.featureGate === feature)
}
