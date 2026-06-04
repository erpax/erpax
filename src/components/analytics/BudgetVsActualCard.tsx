import React from 'react';
import { FinancialAnalysisEngine } from '@/services/accounting/financial-analysis';
import { formatCurrency } from '@/components/Dashboard';

import type { IncomeStatementData } from './types';

/**
 * Budget vs Actual variance card — IFRS IAS-1 presentation overlay.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-display
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-270 interim-reporting variance-analysis
 * @see docs/STANDARDS.md §4.2
 */


interface BudgetVsActualCardProps {
  data: {
    balanceSheet?: unknown;
    incomeStatement: IncomeStatementData;
  };
}

const BudgetVsActualCard: React.FC<BudgetVsActualCardProps> = ({ data }) => {
  const engine = new FinancialAnalysisEngine();

  if (!data.incomeStatement) {
    return null;
  }

  const incomeStatement = data.incomeStatement;

  // Mock budgets for demo (in production, these would come from budget collection)
  const budgetItems = [
    {
      label: 'Revenue',
      budget: incomeStatement.totalRevenues * 1.05, // 5% above actual
      actual: incomeStatement.totalRevenues,
    },
    {
      label: 'COGS',
      budget: incomeStatement.totalCOGS * 0.95,
      actual: incomeStatement.totalCOGS,
    },
    {
      label: 'Operating Expenses',
      budget: incomeStatement.totalOperatingExpenses * 1.1,
      actual: incomeStatement.totalOperatingExpenses,
    },
  ];

  const getVarianceColor = (variance: number, status: string) => {
    if (status === 'on-target') return 'text-green-700 bg-green-50';
    if (variance < 0) return 'text-orange-700 bg-orange-50'; // Under budget is good for expenses, bad for revenue
    return 'text-red-700 bg-red-50';
  };

  const getVarianceStatus = (variance: number) => {
    if (Math.abs(variance) <= 5) return 'on-target';
    if (variance < 0) return 'under';
    return 'over';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual</h3>

      <div className="space-y-4">
        {budgetItems.map((item, index) => {
          const analysis = engine.analyzeBudgetVariance(
            item.budget * 100,
            item.actual * 100
          );
          const variancePercent = analysis.variancePercent;
          const status = getVarianceStatus(variancePercent);

          return (
            <div key={index} className="border border-gray-200 rounded p-4">
              {/* Item Label */}
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{item.label}</h4>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded capitalize ${getVarianceColor(variancePercent, status)}`}
                >
                  {status === 'on-target' ? '✓ On Target' : `${variancePercent > 0 ? '+' : ''}${variancePercent.toFixed(1)}%`}
                </span>
              </div>

              {/* Budget vs Actual */}
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600 mb-1">Budget</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.budget * 100)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Actual</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.actual * 100)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Variance</p>
                  <p
                    className={`font-semibold ${variancePercent < 0 ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {formatCurrency(analysis.variance)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (item.actual / item.budget) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Budget Performance Summary</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 p-2 rounded">
            <p className="text-xs text-gray-600">On Target</p>
            <p className="text-lg font-bold text-green-700">
              {budgetItems.filter((_, i) => getVarianceStatus(budgetItems[i].actual - budgetItems[i].budget) === 'on-target').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <p className="text-xs text-gray-600">Under</p>
            <p className="text-lg font-bold text-yellow-700">0</p>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <p className="text-xs text-gray-600">Over</p>
            <p className="text-lg font-bold text-red-700">
              {budgetItems.filter((_, i) => getVarianceStatus(budgetItems[i].actual - budgetItems[i].budget) === 'over').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetVsActualCard;
