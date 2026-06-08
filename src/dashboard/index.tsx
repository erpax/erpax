import type React from 'react';
import type { Payload, PayloadRequest } from 'payload';

import { TrialBalanceWidget, BalanceSheetWidget, IncomeStatementWidget } from '@/widget';

import {
  generateTrialBalance,
  generateBalanceSheet,
  generateIncomeStatement,
} from '@/accounting';
import {
  resolveDashboard,
  selectDashboard,
  projectTrialBalance,
  projectBalanceSheet,
  projectIncomeStatement,
  type DashboardContext,
  type DashboardSpec,
  type ResolvedWidget,
  type AnyWidgetSpec,
} from '@/dashboard/spec';
import { DASHBOARD_REGISTRY, DASHBOARDS } from './dashboards';
import { Nav } from '@/dashboard/nav';

import { getUserContext } from '@/auth';
import { actorCapabilityResolved } from '@/cross';
import type {
  AccountLine,
  BalanceSheetData,
  IncomeStatementData,
  TrialBalanceData,
} from '@/analytics';
import { singularOf } from '@/translate';

/**
 * Accounting Dashboard — the SERVER-rendered top-level renderer for trial
 * balance, balance sheet, and income statement.
 *
 * THE DATA-FLOW FIX (the corpus violation this corrects): the previous shape was
 * a CLIENT component that fetched via the REST `AccountingClient` (a hardcoded
 * `localhost` baseUrl + a Bearer token in the browser + an ad-hoc `userRole`
 * string union gated inline). This is now an async SERVER component (runs in the
 * Cloudflare Worker, where the D1 / Local API binding lives). It reads financial
 * data via the Payload Local API by calling the EXISTING pure services in
 * `@/accounting/reports.service` (generateTrialBalance / BalanceSheet /
 * IncomeStatement), projects the DTOs into the widget view-models, and gates
 * visibility via the access cross (`@/cross`) on the REAL `UserRole` union —
 * never the ad-hoc string union, never the REST client. The widgets stay PURE:
 * they receive a resolved view-model and render it; they never fetch.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-display
 * @standard NIST INCITS-359 role-based-access-control
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @quality ISO-25010 usability dashboard-presentation
 * @see src/dashboard/spec/index.ts  (the WidgetSpec / DataSource / resolver framework)
 * @see src/cross/index.ts           (the access cross — capability + visibility)
 * @see docs/STANDARDS.md §4.2
 */

interface DashboardProps {
  /** The actor's Payload request — its `.payload` is the Local API, its `.user` drives the cross. */
  readonly req: PayloadRequest;
  /** Display name for the active tenant. */
  readonly tenantName: string;
  /** Balance-sheet / trial-balance as-of date (defaults to today). */
  readonly asOfDate?: Date;
}

// ─── The financial statement dashboard — three pure widgets, three
//     localApi DataSources backed by the existing reports.service. ─────

const balanceSheetWidget: AnyWidgetSpec = {
  id: 'balance-sheet',
  Component: BalanceSheetWidget,
  minCapability: 'read',
  title: 'Balance Sheet',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx: DashboardContext): Promise<BalanceSheetData> =>
      projectBalanceSheet(await generateBalanceSheet(ctx.payload, ctx.tenantId, ctx.asOfDate)),
  },
};

const incomeStatementWidget: AnyWidgetSpec = {
  id: 'income-statement',
  Component: IncomeStatementWidget,
  minCapability: 'read',
  title: 'Income Statement',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx: DashboardContext): Promise<IncomeStatementData> =>
      projectIncomeStatement(
        await generateIncomeStatement(ctx.payload, ctx.tenantId, ctx.periodStart, ctx.periodEnd),
      ),
  },
};

const trialBalanceWidget: AnyWidgetSpec = {
  id: 'trial-balance',
  Component: TrialBalanceWidget,
  minCapability: 'read',
  title: 'Trial Balance',
  lane: 'tailwind',
  source: {
    kind: 'localApi',
    load: async (ctx: DashboardContext): Promise<TrialBalanceData> =>
      projectTrialBalance(await generateTrialBalance(ctx.payload, ctx.tenantId, ctx.asOfDate)),
  },
};

/**
 * The Read-only Overview composition (the statement core every tier inherits).
 * Higher tiers add action / audit widgets in their own slices; this slice ships
 * the read foundation, gated at `minCapability: 'read'`. It is the legacy
 * three-statement view kept for the MetricCards header math below; the renderer
 * now SELECTS from the capability-keyed `DASHBOARD_REGISTRY` (the seven role
 * dashboards in `@/dashboard/dashboards`) so each tier gets its full composition
 * (admin / sign / write / read / audit), not just this read base.
 */
export const financialStatementsDashboard: DashboardSpec = {
  id: 'financial-statements',
  title: 'Accounting Dashboard',
  audience: 'read',
  widgets: [trialBalanceWidget, balanceSheetWidget, incomeStatementWidget],
};

/** Build the loader context from the actor's request + the as-of date. */
function dashboardContext(req: PayloadRequest, asOfDate: Date): DashboardContext {
  const ctx = getUserContext(req);
  const tenantId = ctx?.tenant ?? '';
  const periodStart = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 1);
  return {
    payload: req.payload as Payload,
    req,
    tenantId,
    asOfDate,
    periodStart,
    periodEnd: asOfDate,
  };
}

/** Render one resolved widget with its (typed) view-model. */
function renderWidget(rw: ResolvedWidget): React.ReactElement {
  const Component = rw.spec.Component;
  return (
    <div className="col-span-1" key={rw.spec.id}>
      <Component data={rw.data} />
    </div>
  );
}

/**
 * The server-rendered dashboard. Resolves the actor's capability via the access
 * cross, SELECTS the dashboard for that tier, RESOLVES every visible widget's
 * data in parallel (overrideAccess:false at the data layer), and paints the pure
 * widgets. No client data client, no Bearer token, no `localhost` baseUrl.
 */
const Dashboard = async ({
  req,
  tenantName,
  asOfDate = new Date(),
}: DashboardProps): Promise<React.ReactElement> => {
  const capability = await actorCapabilityResolved(req);
  const spec = selectDashboard(capability, DASHBOARD_REGISTRY);

  if (!spec) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <p className="text-gray-600">No dashboard available for your access level.</p>
      </div>
    );
  }

  const ctx = dashboardContext(req, asOfDate);
  const resolved = await resolveDashboard(spec, ctx);

  // The nav's active row is the selected dashboard's position on the double-torus
  // (one row per section in DASHBOARDS); a section not in the canonical seven wraps
  // onto the surface (the torus has no edge), so a negative index lands on row 0.
  const activeRow = DASHBOARDS.indexOf(spec);

  const balanceSheet = resolved.find((r) => r.spec.id === 'balance-sheet')?.data as
    | BalanceSheetData
    | null
    | undefined;
  const incomeStatement = resolved.find((r) => r.spec.id === 'income-statement')?.data as
    | IncomeStatementData
    | null
    | undefined;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {tenantName} - {spec.title}
          </h1>
          <p className="text-gray-600">Access: {capability ?? 'none'}</p>
        </div>
        <p className="text-gray-600 text-sm">
          As of {asOfDate.toISOString().split('T')[0]}
        </p>
      </div>

      {/* The 7×6 double-torus navigation — the active row is this dashboard's
          section; the access cross gates which cells are reachable. */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <Nav activeRow={activeRow} />
      </div>

      {/* Metric Cards (computed server-side from the resolved balance sheet) */}
      <MetricCards balanceSheet={balanceSheet ?? null} incomeStatement={incomeStatement ?? null} />

      {/* Statement widgets — pure, fed the resolved view-models */}
      <div className="grid grid-cols-3 gap-6 mb-6">{resolved.map(renderWidget)}</div>
    </div>
  );
};

interface MetricCardsProps {
  readonly balanceSheet: BalanceSheetData | null;
  readonly incomeStatement: IncomeStatementData | null;
}

const sumBalances = (lines: AccountLine[] | undefined): number =>
  (lines ?? []).reduce((sum, acc) => sum + acc.balance, 0);

const MetricCards: React.FC<MetricCardsProps> = ({ balanceSheet, incomeStatement }) => {
  if (!balanceSheet) return null;
  const assets = sumBalances(balanceSheet.assets);
  const liabilities = sumBalances(balanceSheet.liabilities);
  const equity = sumBalances(balanceSheet.equity);
  const netIncome = incomeStatement?.netIncome ?? 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard title="Total Assets" value={formatCurrency(assets)} trend="up" />
      <MetricCard title="Total Liabilities" value={formatCurrency(liabilities)} trend="down" />
      <MetricCard title="Total Equity" value={formatCurrency(equity)} trend="up" />
      <MetricCard
        title="Net Income (Period)"
        value={formatCurrency(netIncome)}
        trend={netIncome >= 0 ? 'up' : 'down'}
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend }) => {
  const bgColor =
    trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-blue-50';
  const textColor =
    trend === 'up'
      ? 'text-green-700'
      : trend === 'down'
        ? 'text-red-700'
        : 'text-blue-700';

  return (
    <div className={`${bgColor} rounded-lg p-4 border border-gray-200`}>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className={`${textColor} text-2xl font-bold`}>{value}</p>
    </div>
  );
};

export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default Dashboard;

// ── each model's computed dashboard: its related links partitioned into collections (plural) + models (singular) ──

/** A related-collection card: the collection slug (plural) + its model (singular). */
export interface RelatedCollection {
  readonly collection: string;
  readonly model: string;
}

/** A model's computed dashboard — the related collections + models it links to. */
export interface ModelDashboard {
  readonly model: string;
  readonly relatedCollections: readonly RelatedCollection[];
  readonly relatedModels: readonly string[];
}

/**
 * Compute a model's dashboard from its links: partition the outbound [[links]] into
 * the registered COLLECTIONS (plural) — each paired with its model — and the
 * MODELS/atoms (everything else). Self-links are dropped; order is preserved.
 */
export function modelDashboard(args: {
  model: string;
  links: readonly string[];
  collectionSlugs: readonly string[];
}): ModelDashboard {
  const collections = new Set(args.collectionSlugs);
  const related = [...new Set(args.links)].filter((l) => l !== args.model);
  const relatedCollections = related
    .filter((l) => collections.has(l))
    .map((collection) => ({ collection, model: singularOf(collection) }));
  const relatedModels = related.filter((l) => !collections.has(l));
  return { model: args.model, relatedCollections, relatedModels };
}
