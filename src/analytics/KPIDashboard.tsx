import React from 'react';
import { FinancialAnalysisEngine } from '@/accounting/financial-analysis';
import { formatCurrency } from '@/dashboard';
import type { AccountLine, BalanceSheetData, IncomeStatementData } from '@/analytics/types';

/**
 * Top-level KPI grid — derives ratios + health score from balance sheet + income statement.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-display
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @quality ISO-25010 functional-suitability derived-metric
 * @see docs/STANDARDS.md §4.2
 */


interface KPIDashboardProps {
  data: {
    balanceSheet: BalanceSheetData;
    incomeStatement: IncomeStatementData;
  };
}

const KPIDashboard: React.FC<KPIDashboardProps> = ({ data }) => {
  const engine = new FinancialAnalysisEngine();

  if (!data.balanceSheet || !data.incomeStatement) {
    return null;
  }

  // Extract financial data from balance sheet and income statement
  const financialData = {
    asOfDate: data.balanceSheet.asOfDate,
    assets:
      (data.balanceSheet.assets || []).reduce((sum: number, a: AccountLine) => sum + a.balance, 0) * 100,
    currentAssets:
      (data.balanceSheet.assets || [])
        .filter((a: AccountLine) => ['Cash', 'Accounts Receivable', 'Inventory'].includes(a.accountName))
        .reduce((sum: number, a: AccountLine) => sum + a.balance, 0) * 100,
    inventory:
      (data.balanceSheet.assets || [])
        .find((a: AccountLine) => a.accountName === 'Inventory')?.balance || 0 * 100,
    receivables:
      (data.balanceSheet.assets || [])
        .find((a: AccountLine) => a.accountName === 'Accounts Receivable')?.balance || 0 * 100,
    liabilities:
      (data.balanceSheet.liabilities || []).reduce((sum: number, l: AccountLine) => sum + l.balance, 0) *
      100,
    currentLiabilities:
      (data.balanceSheet.liabilities || [])
        .filter((l: AccountLine) => ['Accounts Payable', 'Short-term Debt'].includes(l.accountName))
        .reduce((sum: number, l: AccountLine) => sum + l.balance, 0) * 100,
    payables:
      (data.balanceSheet.liabilities || [])
        .find((l: AccountLine) => l.accountName === 'Accounts Payable')?.balance || 0 * 100,
    equity:
      (data.balanceSheet.equity || []).reduce((sum: number, e: AccountLine) => sum + e.balance, 0) * 100,
    retainedEarnings:
      (data.balanceSheet.equity || [])
        .find((e: AccountLine) => e.accountName === 'Retained Earnings')?.balance || 0 * 100,
    revenue: data.incomeStatement.totalRevenues * 100,
    cogs: data.incomeStatement.totalCOGS * 100,
    grossProfit: data.incomeStatement.grossProfit * 100,
    operatingExpenses: data.incomeStatement.totalOperatingExpenses * 100,
    operatingIncome: data.incomeStatement.operatingIncome * 100,
    netIncome: data.incomeStatement.netIncome * 100,
    cash:
      (data.balanceSheet.assets || [])
        .find((a: AccountLine) => a.accountName === 'Cash in Bank')?.balance || 0 * 100,
    depreciation: 0,
    interestExpense: 0,
  };

  const ratios = engine.calculateFinancialRatios(financialData);
  const kpis = engine.generateKPIs(financialData, ratios);
  const health = engine.getFinancialHealth(ratios);

  const getHealthColor = () => {
    switch (health) {
      case 'excellent':
        return 'bg-green-50 border-green-200';
      case 'good':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
    }
  };

  const getHealthIcon = () => {
    switch (health) {
      case 'excellent':
        return '✓';
      case 'good':
        return '✓';
      case 'warning':
        return '!';
      case 'critical':
        return '✗';
    }
  };

  const getKPIColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'good':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Status */}
      <div className={`rounded-lg shadow p-6 border-2 ${getHealthColor()}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Overall Financial Health</p>
            <p className="text-3xl font-bold text-gray-900 capitalize">{health}</p>
          </div>
          <div className="text-5xl font-bold text-gray-300 opacity-50">
            {getHealthIcon()}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`rounded-lg shadow p-4 border-2 ${getKPIColor(kpi.status)}`}
          >
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
              {kpi.name}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {kpi.value.toFixed(kpi.unit === '%' ? 1 : 2)} {kpi.unit}
            </p>
            {kpi.target && (
              <p className="text-xs text-gray-600">
                Target: {kpi.target} {kpi.unit}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'} {kpi.trend}
              </span>
              {kpi.previousValue !== undefined && (
                <span className="text-xs text-gray-500">
                  vs {kpi.previousValue.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(financialData.revenue)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Period Total</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Net Income</p>
          <p
            className={`text-2xl font-bold ${financialData.netIncome >= 0 ? 'text-green-700' : 'text-red-700'}`}
          >
            {formatCurrency(financialData.netIncome)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Period Profit</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Assets</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(financialData.assets)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Total Company Value</p>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
