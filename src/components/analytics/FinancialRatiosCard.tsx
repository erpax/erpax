import React from 'react';
import { FinancialAnalysisEngine } from '@/services/accounting/financial-analysis';
import type { AccountLine, BalanceSheetData, IncomeStatementData } from './types';

/**
 * Financial ratios card — liquidity, profitability, solvency.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @quality ISO-25010 functional-suitability derived-metric
 * @see docs/STANDARDS.md §4.2
 */


interface FinancialRatiosCardProps {
  data: {
    balanceSheet: BalanceSheetData;
    incomeStatement: IncomeStatementData;
  };
}

function RatioRow({
  label,
  value,
  unit,
  status,
}: {
  label: string;
  value: number;
  unit: string;
  status: string;
}) {
  const statusColor =
    status === 'excellent'
      ? 'text-green-700'
      : status === 'good'
        ? 'text-blue-700'
        : status === 'warning'
          ? 'text-yellow-700'
          : 'text-red-700';

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-semibold text-sm ${statusColor}`}>
          {value.toFixed(2)} {unit}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 capitalize">
          {status}
        </span>
      </div>
    </div>
  );
}

const FinancialRatiosCard: React.FC<FinancialRatiosCardProps> = ({ data }) => {
  const engine = new FinancialAnalysisEngine();

  if (!data.balanceSheet || !data.incomeStatement) {
    return null;
  }

  // Extract financial data
  const assets =
    (data.balanceSheet.assets || []).reduce((sum: number, a: AccountLine) => sum + a.balance, 0) * 100;
  const currentAssets =
    (data.balanceSheet.assets || [])
      .filter((a: AccountLine) => ['Cash', 'Accounts Receivable', 'Inventory'].includes(a.accountName))
      .reduce((sum: number, a: AccountLine) => sum + a.balance, 0) * 100;
  const inventory =
    ((data.balanceSheet.assets || []).find((a: AccountLine) => a.accountName === 'Inventory')?.balance ||
      0) * 100;
  const receivables =
    ((data.balanceSheet.assets || []).find((a: AccountLine) => a.accountName === 'Accounts Receivable')
      ?.balance || 0) * 100;
  const liabilities =
    (data.balanceSheet.liabilities || []).reduce((sum: number, l: AccountLine) => sum + l.balance, 0) *
    100;
  const currentLiabilities =
    (data.balanceSheet.liabilities || [])
      .filter((l: AccountLine) => ['Accounts Payable', 'Short-term Debt'].includes(l.accountName))
      .reduce((sum: number, l: AccountLine) => sum + l.balance, 0) * 100;
  const payables =
    ((data.balanceSheet.liabilities || []).find((l: AccountLine) => l.accountName === 'Accounts Payable')
      ?.balance || 0) * 100;
  const equity =
    (data.balanceSheet.equity || []).reduce((sum: number, e: AccountLine) => sum + e.balance, 0) * 100;
  const cash =
    ((data.balanceSheet.assets || []).find((a: AccountLine) => a.accountName === 'Cash in Bank')
      ?.balance || 0) * 100;

  const financialData = {
    asOfDate: data.balanceSheet.asOfDate,
    assets,
    currentAssets,
    inventory,
    receivables,
    liabilities,
    currentLiabilities,
    payables,
    equity,
    retainedEarnings: 0,
    revenue: data.incomeStatement.totalRevenues * 100,
    cogs: data.incomeStatement.totalCOGS * 100,
    grossProfit: data.incomeStatement.grossProfit * 100,
    operatingExpenses: data.incomeStatement.totalOperatingExpenses * 100,
    operatingIncome: data.incomeStatement.operatingIncome * 100,
    netIncome: data.incomeStatement.netIncome * 100,
    cash,
    depreciation: 0,
    interestExpense: 0,
  };

  const ratios = engine.calculateFinancialRatios(financialData);

  const getRatioStatus = (value: number, type: string): 'excellent' | 'good' | 'warning' | 'critical' => {
    switch (type) {
      case 'currentRatio':
        if (value >= 2) return 'excellent';
        if (value >= 1.5) return 'good';
        if (value >= 1) return 'warning';
        return 'critical';
      case 'quickRatio':
        if (value >= 1) return 'excellent';
        if (value >= 0.8) return 'good';
        if (value >= 0.5) return 'warning';
        return 'critical';
      case 'debtToEquity':
        if (value <= 1) return 'excellent';
        if (value <= 2) return 'good';
        if (value <= 3) return 'warning';
        return 'critical';
      case 'roireturn':
        if (value >= 15) return 'excellent';
        if (value >= 10) return 'good';
        if (value >= 0) return 'warning';
        return 'critical';
      default:
        return 'good';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Ratios</h3>

      {/* Liquidity Ratios */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Liquidity Ratios
        </h4>
        <RatioRow
          label="Current Ratio"
          value={ratios.liquidity.currentRatio}
          unit="x"
          status={getRatioStatus(ratios.liquidity.currentRatio, 'currentRatio')}
        />
        <RatioRow
          label="Quick Ratio"
          value={ratios.liquidity.quickRatio}
          unit="x"
          status={getRatioStatus(ratios.liquidity.quickRatio, 'quickRatio')}
        />
        <RatioRow
          label="Cash Ratio"
          value={ratios.liquidity.cashRatio}
          unit="x"
          status="good"
        />
      </div>

      {/* Profitability Ratios */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Profitability Ratios
        </h4>
        <RatioRow
          label="Gross Profit Margin"
          value={ratios.profitability.grossProfitMargin}
          unit="%"
          status="good"
        />
        <RatioRow
          label="Operating Margin"
          value={ratios.profitability.operatingMargin}
          unit="%"
          status="good"
        />
        <RatioRow
          label="Net Profit Margin"
          value={ratios.profitability.netProfitMargin}
          unit="%"
          status="good"
        />
        <RatioRow
          label="Return on Assets"
          value={ratios.profitability.returnOnAssets}
          unit="%"
          status="good"
        />
        <RatioRow
          label="Return on Equity"
          value={ratios.profitability.returnOnEquity}
          unit="%"
          status={getRatioStatus(ratios.profitability.returnOnEquity, 'roireturn')}
        />
      </div>

      {/* Solvency Ratios */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Solvency Ratios
        </h4>
        <RatioRow
          label="Debt-to-Equity"
          value={ratios.solvency.debtToEquity}
          unit="x"
          status={getRatioStatus(ratios.solvency.debtToEquity, 'debtToEquity')}
        />
        <RatioRow
          label="Debt-to-Assets"
          value={ratios.solvency.debtToAssets}
          unit="x"
          status="good"
        />
        <RatioRow
          label="Equity Ratio"
          value={ratios.solvency.equityRatio}
          unit="x"
          status="good"
        />
      </div>
    </div>
  );
};

export default FinancialRatiosCard;
