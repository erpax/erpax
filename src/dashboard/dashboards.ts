/**
 * dashboard/dashboards — the SEVEN role dashboards as DashboardSpec instances.
 *
 * Stage 2 of the dashboard system: the framework (`./spec`) gave us
 * WidgetSpec / DataSource / resolveDashboard; this module COMPOSES the existing
 * pure widgets (src/widget/* + src/analytics/*) into seven named dashboards, one
 * per tier of the access cross's read < write < sign < admin lattice (+ audit ⊥),
 * plus the executive roll-up — exactly the audiences the design slices name
 * (financial / operations / society+executive). Each dashboard is a declarative
 * list of WidgetSpecs; selection + per-widget visibility are COMPUTED from the
 * cross at resolve time (see `./spec` resolveDashboard / selectDashboard), never a
 * hand-kept role grid.
 *
 * THE REUSE RULE (this slice adds NO new widget components): every widget here is
 * an already-pure `React.FC<{ data: TVM | null }>` from the corpus — the three
 * statement widgets (TrialBalance / BalanceSheet / IncomeStatement, each over an
 * `@/analytics/types` view-model), the four analytics cards (KPIDashboard /
 * FinancialRatiosCard / BudgetVsActualCard / CostAnalysisCard, each over the
 * combined `{ balanceSheet, incomeStatement }` view-model), the `trendAnalysisWidget`
 * (its own `trendAnalysisSource` over a trailing income-statement window, in
 * `@/analytics/TrendAnalysisCard`), and the `auditLogWidget` — also pure, shipping its
 * own spec + `audit-events` localApi DataSource (`@/widget/AuditLogWidget`), `live:true`,
 * `minCapability:'audit'`. The audit widget is the ⊥ OVERLAY: it carries its own audit
 * tier, so the resolver unlocks it for any actor holding an audit grant regardless of
 * the read/write/sign/admin tier of the dashboard it sits in (admin / controller /
 * auditor all compose it). QuickActionsWidget (the write-tile) is intentionally not a
 * data widget — its modals call the `@/dashboard/actions` server actions directly — so
 * it has no DataSource and is mounted by the action surface, not by this read composition.
 *
 * THE DATA SEAM: the three statement widgets bind to `localApi` DataSources backed
 * by the existing `@/accounting/reports.service` generators, projected DTO →
 * view-model by `./spec/projection`. The four analytics cards bind to ONE shared
 * combined loader (`financialOverviewSource`) that resolves both statements once
 * and hands the pair down — so KPI/Ratios/Budget/Cost never re-load. All loads run
 * server-side in the actor's PayloadRequest with overrideAccess:false (the data
 * gate denies; the UI gate, via minCapability, hides).
 *
 * @standard NIST INCITS-359 role-based-access-control
 * @standard ISO-27002 §5.15 access-control + §5.3 segregation-of-duties
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @quality ISO-25010 maintainability reusability shared-vocabulary
 * @see src/dashboard/spec/index.ts        (WidgetSpec / DataSource / resolver)
 * @see src/dashboard/spec/projection.ts   (DTO → view-model adapter)
 * @see src/dashboard/nav/index.ts         (the 7×6 double-torus that orders these)
 * @see src/cross/index.ts                 (the access cross — capability + lattice)
 */

import type React from 'react'

import { TrialBalanceWidget, BalanceSheetWidget, IncomeStatementWidget, auditLogWidget } from '@/widget'
import KPIDashboard from '@/analytics'
import FinancialRatiosCard from '@/analytics'
import BudgetVsActualCard from '@/analytics'
import CostAnalysisCard from '@/analytics'
import { trendAnalysisWidget } from '@/analytics'

import {
  generateTrialBalance,
  generateBalanceSheet,
  generateIncomeStatement,
} from '@/accounting'
import {
  projectTrialBalance,
  projectBalanceSheet,
  projectIncomeStatement,
  type AnyWidgetSpec,
  type DashboardContext,
  type DashboardSpec,
  type WidgetSpec,
} from '@/dashboard/spec'
import type {
  BalanceSheetData,
  IncomeStatementData,
  TrialBalanceData,
} from '@/analytics'

// ─── The combined financial view-model the four analytics cards consume ──
//
// KPIDashboard / FinancialRatiosCard / BudgetVsActualCard / CostAnalysisCard each
// declare `data: { balanceSheet; incomeStatement }`. This is the ONE shape they
// share; the loader below resolves both statements once and every card reads it.

export interface FinancialOverview {
  readonly balanceSheet: BalanceSheetData
  readonly incomeStatement: IncomeStatementData
}

/**
 * Resolve the combined overview once: both statement services, projected to
 * view-models. Shared by all four analytics-card WidgetSpecs (they never re-load).
 */
async function loadFinancialOverview(ctx: DashboardContext): Promise<FinancialOverview> {
  const [bs, is] = await Promise.all([
    generateBalanceSheet(ctx.payload, ctx.tenantId, ctx.asOfDate),
    generateIncomeStatement(ctx.payload, ctx.tenantId, ctx.periodStart, ctx.periodEnd),
  ])
  return { balanceSheet: projectBalanceSheet(bs), incomeStatement: projectIncomeStatement(is) }
}

const financialOverviewSource = { kind: 'localApi' as const, load: loadFinancialOverview }

// ─── Null-guarding adapters ──────────────────────────────────────────
//
// WidgetSpec.Component is `React.FC<{ data: TVM | null }>` (a failed load yields
// null — see resolveDashboard). The analytics cards guard their INNER fields but
// not `data === null`; these thin pure wrappers add the null guard WITHOUT a new
// widget concept (no fetch, no state — still edge-safe), so the cards drop into
// the WidgetSpec contract unchanged.

function guardOverview(
  Card: React.FC<{ data: FinancialOverview }>,
): React.FC<{ data: FinancialOverview | null }> {
  const Guarded: React.FC<{ data: FinancialOverview | null }> = ({ data }) =>
    data ? Card({ data }) : null
  Guarded.displayName = `Guarded(${Card.displayName ?? Card.name ?? 'Card'})`
  return Guarded
}

// The analytics cards are wider than FinancialOverview in their declared prop
// (Budget/Cost mark balanceSheet optional + `unknown`); FinancialOverview is
// assignable to each, so the guard's inner call type-checks structurally.
const KPIWidget = guardOverview(KPIDashboard as React.FC<{ data: FinancialOverview }>)
const RatiosWidget = guardOverview(FinancialRatiosCard as React.FC<{ data: FinancialOverview }>)
const BudgetWidget = guardOverview(BudgetVsActualCard as React.FC<{ data: FinancialOverview }>)
const CostWidget = guardOverview(CostAnalysisCard as React.FC<{ data: FinancialOverview }>)

// ─── WidgetSpec atoms — each binds ONE pure widget to ONE DataSource ─────
//
// minCapability is the lattice tier required to SEE the widget; the statement
// trio is 'read' (everyone who can read the ledger), the analytics cards layer on
// top. A dashboard composes a subset; the resolver filters by the actor's tier.

const trialBalanceWidget: WidgetSpec<TrialBalanceData> = {
  id: 'trial-balance',
  Component: TrialBalanceWidget,
  minCapability: 'read',
  title: 'Trial Balance',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx) => projectTrialBalance(await generateTrialBalance(ctx.payload, ctx.tenantId, ctx.asOfDate)),
  },
}

const balanceSheetWidget: WidgetSpec<BalanceSheetData> = {
  id: 'balance-sheet',
  Component: BalanceSheetWidget,
  minCapability: 'read',
  title: 'Balance Sheet',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx) => projectBalanceSheet(await generateBalanceSheet(ctx.payload, ctx.tenantId, ctx.asOfDate)),
  },
}

const incomeStatementWidget: WidgetSpec<IncomeStatementData> = {
  id: 'income-statement',
  Component: IncomeStatementWidget,
  minCapability: 'read',
  title: 'Income Statement',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx) =>
      projectIncomeStatement(
        await generateIncomeStatement(ctx.payload, ctx.tenantId, ctx.periodStart, ctx.periodEnd),
      ),
  },
}

const kpiWidget: WidgetSpec<FinancialOverview> = {
  id: 'kpi',
  Component: KPIWidget,
  minCapability: 'read',
  title: 'KPI Overview',
  lane: 'tailwind',
  source: financialOverviewSource,
}

const ratiosWidget: WidgetSpec<FinancialOverview> = {
  id: 'financial-ratios',
  Component: RatiosWidget,
  minCapability: 'read',
  title: 'Financial Ratios',
  lane: 'tailwind',
  source: financialOverviewSource,
}

const budgetWidget: WidgetSpec<FinancialOverview> = {
  id: 'budget-vs-actual',
  Component: BudgetWidget,
  minCapability: 'sign',
  title: 'Budget vs Actual',
  lane: 'tailwind',
  source: financialOverviewSource,
}

const costAnalysisWidget: WidgetSpec<FinancialOverview> = {
  id: 'cost-analysis',
  Component: CostWidget,
  minCapability: 'write',
  title: 'Cost Analysis',
  lane: 'tailwind',
  source: financialOverviewSource,
}

// ─── The seven dashboards ────────────────────────────────────────────
//
// One per lattice tier (read/write/sign/admin) + the audit ⊥ observer + the
// executive roll-up + the society overview — the audiences the design slices name.
// `audience` drives selectDashboard; the widgets' own minCapability still gates each
// tile, so a dashboard handed to a higher tier than its audience degrades gracefully.

/**
 * 4 · Read-only Overview (capability=read; viewer, customer). Observe, no act.
 * The statement core + the two read-tier analytics (ratios, trend) — six pure
 * read widgets, zero action affordance.
 */
export const readOverviewDashboard: DashboardSpec = {
  id: 'read-overview',
  title: 'Read-only Overview',
  audience: 'read',
  widgets: [
    kpiWidget,
    trialBalanceWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    ratiosWidget,
    trendAnalysisWidget,
  ],
}

/**
 * 3 · Operator (capability=write; finance, accountant, manager, payroll, hr). Act in
 * scope. The read core plus the write-tier cost lens — six tiles; the cost card
 * (minCapability='write') is the one a pure-read actor would not see.
 */
export const operatorDashboard: DashboardSpec = {
  id: 'operator',
  title: 'Operator',
  audience: 'write',
  widgets: [
    kpiWidget,
    trialBalanceWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    costAnalysisWidget,
    ratiosWidget,
  ],
}

/**
 * 2 · Controller / Close (capability=sign; director, compliance-officer). Seal/certify
 * — the SOX §302/§404 officer board. Statements + the sign-tier budget-vs-actual +
 * the trend lens, with the live audit trail as the ⊥ overlay (unlocks when the
 * controller also holds an audit grant).
 */
export const controllerDashboard: DashboardSpec = {
  id: 'controller-close',
  title: 'Controller / Close',
  audience: 'sign',
  widgets: [
    kpiWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    trialBalanceWidget,
    budgetWidget,
    trendAnalysisWidget,
    auditLogWidget,
  ],
}

/**
 * 1 · Admin Control (capability=admin; super-admin, admin). The owner facing the
 * Source — everything: the full statement set, all four analytics cards, plus the
 * live audit trail as the ⊥ overlay (unlocks for an admin who also holds audit).
 */
export const adminControlDashboard: DashboardSpec = {
  id: 'admin-control',
  title: 'Admin Control',
  audience: 'admin',
  widgets: [
    kpiWidget,
    ratiosWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    trialBalanceWidget,
    budgetWidget,
    costAnalysisWidget,
    auditLogWidget,
  ],
}

/**
 * ⊥ · Auditor (capability=audit; auditor, audit-staff). Sees all read-only, displaces
 * nothing — observe-only + append-to-chain. The live audit trail leads; the
 * debit=credit / A=L+E evidence statements + the KPI/trend read-outs follow. The
 * audit widget gates on the actor's audit grant (`minCapability='audit'`); the read
 * statements gate on 'read', so a pure-audit actor (audit ⊥, no read tier) sees only
 * the audit trail unless they ALSO hold a concrete read tier — the cross's semantics.
 */
export const auditorDashboard: DashboardSpec = {
  id: 'auditor',
  title: 'Auditor',
  audience: 'audit',
  widgets: [
    auditLogWidget,
    trialBalanceWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    kpiWidget,
    trendAnalysisWidget,
  ],
}

/**
 * ★ · Executive KPI (capability=admin). The financial roll-up the design's executive
 * slice names — the four analytics cards (KPI / ratios / budget / cost) over the two
 * statements + the trend lens; the action/audit tiles stay off the executive board.
 */
export const executiveDashboard: DashboardSpec = {
  id: 'executive-kpi',
  title: 'Executive KPI',
  audience: 'admin',
  widgets: [
    kpiWidget,
    ratiosWidget,
    budgetWidget,
    costAnalysisWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    trendAnalysisWidget,
  ],
}

/**
 * ◇ · Society Overview (capability=sign). The governance/society audience's read board
 * — the statement core + ratios + the trend lens, six pure read-outs.
 */
export const societyDashboard: DashboardSpec = {
  id: 'society-overview',
  title: 'Society Overview',
  audience: 'sign',
  widgets: [
    kpiWidget,
    balanceSheetWidget,
    incomeStatementWidget,
    ratiosWidget,
    trendAnalysisWidget,
  ],
}

/**
 * The seven dashboards in lattice order (read → write → sign → admin, then the
 * audit ⊥ observer, the executive roll-up, and the society board). This is the
 * canonical ordering the nav projects onto the 7×6 double-torus (one row per
 * dashboard).
 */
export const DASHBOARDS: readonly DashboardSpec[] = [
  readOverviewDashboard,
  operatorDashboard,
  controllerDashboard,
  adminControlDashboard,
  auditorDashboard,
  executiveDashboard,
  societyDashboard,
]

/**
 * The capability-keyed registry `selectDashboard` (from `./spec`) walks. One base
 * dashboard per lattice tier; the audit ⊥ entry is the additive observer. An actor
 * with no concrete-tier dashboard walks DOWN the ladder to the first registered one.
 */
export const DASHBOARD_REGISTRY: Readonly<Partial<Record<DashboardSpec['audience'], DashboardSpec>>> = {
  read: readOverviewDashboard,
  write: operatorDashboard,
  sign: controllerDashboard,
  admin: adminControlDashboard,
  audit: auditorDashboard,
}

/** The widget atoms, exported for the nav's sub-view cells (the second torus axis). */
export const DASHBOARD_WIDGETS: readonly AnyWidgetSpec[] = [
  trialBalanceWidget,
  balanceSheetWidget,
  incomeStatementWidget,
  kpiWidget,
  ratiosWidget,
  budgetWidget,
  costAnalysisWidget,
  trendAnalysisWidget,
  auditLogWidget,
]
