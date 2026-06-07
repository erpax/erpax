import React from 'react';
import { FinancialAnalysisEngine, generateIncomeStatement } from '@/accounting';
import {
  projectIncomeStatement,
  type DashboardContext,
  type LocalApiSource,
  type WidgetSpec,
} from '@/dashboard/spec';

/**
 * Trend / forecast card — historical line + 3-month projection.
 *
 * PURE WIDGET (the dashboard/spec contract): it receives a resolved
 * `TrendAnalysisData` view-model and renders it; it NEVER fetches. The previous
 * shape self-fetched via the REST `AccountingClient.getIncomeStatement` (then in
 * fact fell back to hardcoded mock data). The series now comes from the REAL
 * ledger: the `trendAnalysisSource` localApi DataSource composes
 * `generateIncomeStatement` + `projectIncomeStatement` over a trailing window of
 * periods (SERVER-side, under the actor's request, `overrideAccess:false`) and
 * runs the same `FinancialAnalysisEngine.calculateTrend` over the resulting
 * revenue / net-income / margin series.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-8601-1:2019 date-time period
 * @audit ISO-19011:2018 audit-trail trend-analysis
 * @quality ISO-25010 functional-suitability historical-projection
 * @see src/dashboard/spec/index.ts            (WIDGETS ARE PURE — the DataSource/resolver framework)
 * @see src/accounting/reports.service.ts      (generateIncomeStatement — the per-period source)
 * @see src/dashboard/spec/projection.ts       (projectIncomeStatement — DTO → view-model)
 */

function getTrendIcon(trendType: string) {
  switch (trendType) {
    case 'increasing':
      return '📈';
    case 'decreasing':
      return '📉';
    case 'stable':
      return '➡️';
    default:
      return '—';
  }
}

interface TrendData {
  trend: string;
  trendStrength: number;
  forecast?: number[];
}

/** The resolved view-model this pure widget renders. */
export interface TrendAnalysisData {
  revenue: TrendData;
  netIncome: TrendData;
  margin: TrendData;
}

function TrendRow({ label, data }: { label: string; data: TrendData }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-3">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="text-lg">{getTrendIcon(data.trend)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 capitalize">{data.trend} trend</span>
        <span className="text-gray-700 font-semibold">
          Strength: {(data.trendStrength * 100).toFixed(0)}%
        </span>
      </div>
      {data.forecast && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <p className="text-gray-600">3-Month Forecast: </p>
          <p className="font-semibold text-gray-900">
            {data.forecast.map((f: number) => f.toFixed(0)).join(' → ')}
          </p>
        </div>
      )}
    </div>
  );
}

/** First day of the month `offset` months before `from` (offset 0 = `from`'s month). */
function monthStart(from: Date, offset: number): Date {
  return new Date(from.getFullYear(), from.getMonth() - offset, 1);
}

/** Last day of the month that `start` opens. */
function monthEnd(start: Date): Date {
  return new Date(start.getFullYear(), start.getMonth() + 1, 0);
}

/**
 * The localApi DataSource backing the trend card — composes the income statement
 * over a trailing 6-month window (ending at the context's `asOfDate`), projects
 * each period's DTO into the view-model, then derives the revenue / net-income /
 * net-margin trend + 3-month forecast via the `FinancialAnalysisEngine`. Reads
 * the ledger through the existing pure `generateIncomeStatement` service, so it
 * runs in the actor's request (`overrideAccess:false`).
 */
export const trendAnalysisSource: LocalApiSource<TrendAnalysisData> = {
  kind: 'localApi',
  load: async (ctx: DashboardContext): Promise<TrendAnalysisData> => {
    const MONTHS = 6;
    // Oldest → newest so the series reads forward in time for the trend fit.
    const starts = Array.from({ length: MONTHS }, (_, i) => monthStart(ctx.asOfDate, MONTHS - 1 - i));

    const statements = await Promise.all(
      starts.map(async (start) =>
        projectIncomeStatement(
          await generateIncomeStatement(ctx.payload, ctx.tenantId, start, monthEnd(start)),
        ),
      ),
    );

    const labels = starts.map((s) => s.toLocaleString('en', { month: 'short' }));
    const revenue = statements.map((s) => s.totalRevenues);
    const netIncome = statements.map((s) => s.netIncome);
    const margin = statements.map((s) => (s.totalRevenues ? (s.netIncome / s.totalRevenues) * 100 : 0));

    const engine = new FinancialAnalysisEngine();
    return {
      revenue: engine.calculateTrend('Revenue', labels, revenue),
      netIncome: engine.calculateTrend('Net Income', labels, netIncome),
      margin: engine.calculateTrend('Net Margin %', labels, margin),
    };
  },
};

const TrendAnalysisCard: React.FC<{ data: TrendAnalysisData | null }> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
        <p className="text-gray-500">No trend data available for this period.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>

      <div className="space-y-2">
        <TrendRow label="Revenue" data={data.revenue} />
        <TrendRow label="Net Income" data={data.netIncome} />
        <TrendRow label="Net Margin %" data={data.margin} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Key Observations</p>
        <ul className="space-y-1 text-sm">
          {data.revenue.trend === 'increasing' && (
            <li className="text-green-700">✓ Revenue showing upward trend</li>
          )}
          {data.margin.trend === 'increasing' && (
            <li className="text-green-700">✓ Profit margins improving</li>
          )}
          {data.netIncome.trend === 'stable' && (
            <li className="text-blue-700">→ Earnings stable</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TrendAnalysisCard;

/** Composable spec: a read-tier trend card (cached by default). */
export const trendAnalysisWidget: WidgetSpec<TrendAnalysisData> = {
  id: 'trend-analysis',
  Component: TrendAnalysisCard,
  source: trendAnalysisSource,
  minCapability: 'read',
  title: 'Trend Analysis',
  lane: 'tailwind',
};
