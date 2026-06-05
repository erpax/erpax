import React, { useState, useEffect, useCallback } from 'react';
import { AccountingClient } from '@/sdk/accounting-client';
import TrialBalanceWidget from '@/widget/TrialBalanceWidget';
import BalanceSheetWidget from '@/widget/BalanceSheetWidget';
import IncomeStatementWidget from '@/widget/IncomeStatementWidget';
import QuickActionsWidget from '@/widget/QuickActionsWidget';
import AuditLogWidget from '@/widget/AuditLogWidget';

import type { AccountLine, BalanceSheetData, IncomeStatementData, TrialBalanceData } from '@/analytics/types';
import { singularOf } from '@/translate';

/**
 * Accounting Dashboard — top-level renderer for trial balance, balance sheet,
 * income statement, KPIs, audit log, and quick actions.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-display
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @quality ISO-25010 usability dashboard-presentation
 * @see docs/STANDARDS.md §4.2
 */


interface DashboardProps {
  client: AccountingClient;
  userRole: 'admin' | 'accountant' | 'auditor' | 'readonly';
  tenantName: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  client,
  userRole,
  tenantName,
}) => {
  const [trialBalance, setTrialBalance] = useState<TrialBalanceData | null>(null);
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheetData | null>(null);
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load trial balance
      const tbResponse = await client.getTrialBalance(selectedDate);
      if (tbResponse.success) {
        setTrialBalance(tbResponse.data as TrialBalanceData);
      }

      // Load balance sheet
      const bsResponse = await client.getBalanceSheet(selectedDate);
      if (bsResponse.success) {
        setBalanceSheet(bsResponse.data as BalanceSheetData);
      }

      // Load income statement (for current period)
      const today = new Date();
      const periodStart = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      const isResponse = await client.getIncomeStatement(periodStart, selectedDate);
      if (isResponse.success) {
        setIncomeStatement(isResponse.data as IncomeStatementData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [client, selectedDate]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const getMetricCards = () => {
    if (!balanceSheet) return null;

    const assets = balanceSheet.assets?.reduce(
      (sum: number, acc: AccountLine) => sum + acc.balance,
      0
    ) || 0;
    const liabilities = balanceSheet.liabilities?.reduce(
      (sum: number, acc: AccountLine) => sum + acc.balance,
      0
    ) || 0;
    const equity = balanceSheet.equity?.reduce(
      (sum: number, acc: AccountLine) => sum + acc.balance,
      0
    ) || 0;
    const netIncome = incomeStatement?.netIncome || 0;

    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Assets"
          value={formatCurrency(assets)}
          trend="up"
        />
        <MetricCard
          title="Total Liabilities"
          value={formatCurrency(liabilities)}
          trend="down"
        />
        <MetricCard
          title="Total Equity"
          value={formatCurrency(equity)}
          trend="up"
        />
        <MetricCard
          title="Net Income (Period)"
          value={formatCurrency(netIncome)}
          trend={netIncome >= 0 ? 'up' : 'down'}
        />
      </div>
    );
  };

  const canViewAuditLog = userRole === 'admin' || userRole === 'auditor';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {tenantName} - Accounting Dashboard
          </h1>
          <p className="text-gray-600">Role: {userRole}</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Metric Cards */}
          {getMetricCards()}

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Left Column: Trial Balance */}
            <div className="col-span-1">
              <TrialBalanceWidget data={trialBalance} />
            </div>

            {/* Middle Column: Balance Sheet */}
            <div className="col-span-1">
              <BalanceSheetWidget data={balanceSheet} />
            </div>

            {/* Right Column: Income Statement */}
            <div className="col-span-1">
              <IncomeStatementWidget data={incomeStatement} />
            </div>
          </div>

          {/* Quick Actions */}
          {(userRole === 'admin' || userRole === 'accountant') && (
            <QuickActionsWidget client={client} userRole={userRole} />
          )}

          {/* Audit Log - Auditors and Admins Only */}
          {canViewAuditLog && (
            <AuditLogWidget
              client={client}
              startDate={selectedDate}
              endDate={selectedDate}
            />
          )}
        </>
      )}
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
