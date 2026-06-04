import React from 'react';
import { FinancialAnalysisEngine } from '@/accounting/financial-analysis';
import { formatCurrency } from '@/components/Dashboard';

import type { IncomeStatementData } from '@/analytics/types';

/**
 * Cost structure card — fixed vs variable cost split, contribution margin.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-2 inventories cost-of-inventories
 * @accounting US-GAAP ASC-330 inventory cost-of-goods-sold
 * @see docs/STANDARDS.md §4.2
 */


interface CostAnalysisCardProps {
  data: {
    balanceSheet?: unknown;
    incomeStatement: IncomeStatementData;
  };
}

const CostAnalysisCard: React.FC<CostAnalysisCardProps> = ({ data }) => {
  const engine = new FinancialAnalysisEngine();

  if (!data.incomeStatement) {
    return null;
  }

  const incomeStatement = data.incomeStatement;

  // Mock cost structure for demo
  const totalCosts = (incomeStatement.totalCOGS + incomeStatement.totalOperatingExpenses) * 100;
  const fixedCosts = (incomeStatement.totalOperatingExpenses * 0.7) * 100; // Assume 70% of op exp are fixed
  const variableCosts = totalCosts - fixedCosts;

  const _costAnalysis = engine.analyzeCosts(
    totalCosts,
    fixedCosts,
    1000 // Mock units
  );

  const calculatePercentages = () => {
    const cogsPercent = (incomeStatement.totalCOGS / incomeStatement.totalRevenues) * 100;
    const opExpPercent = (incomeStatement.totalOperatingExpenses / incomeStatement.totalRevenues) * 100;
    const profitPercent = 100 - cogsPercent - opExpPercent;

    return {
      cogs: cogsPercent,
      opExp: opExpPercent,
      profit: profitPercent,
    };
  };

  const percentages = calculatePercentages();

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Structure Analysis</h3>

      {/* Cost Breakdown Pie Chart (simplified bar chart) */}
      <div className="mb-6">
        <div className="space-y-2">
          {/* COGS */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">Cost of Goods Sold</span>
              <span className="text-sm font-semibold text-gray-900">
                {percentages.cogs.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full"
                style={{ width: `${percentages.cogs}%` }}
              ></div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">Operating Expenses</span>
              <span className="text-sm font-semibold text-gray-900">
                {percentages.opExp.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full"
                style={{ width: `${percentages.opExp}%` }}
              ></div>
            </div>
          </div>

          {/* Profit */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">Profit Margin</span>
              <span className="text-sm font-semibold text-green-700">
                {percentages.profit.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${percentages.profit}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown Table */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Categories</h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Total COGS</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(incomeStatement.totalCOGS * 100)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Operating Expenses</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(incomeStatement.totalOperatingExpenses * 100)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Fixed Costs (Est.)</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(fixedCosts)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Variable Costs (Est.)</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(variableCosts)}
            </span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 px-2 rounded font-semibold">
            <span className="text-gray-900">Total Costs</span>
            <span className="text-gray-900">
              {formatCurrency(totalCosts)}
            </span>
          </div>
        </div>
      </div>

      {/* Cost Insights */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Insights</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">→</span>
            <span className="text-gray-700">
              Fixed costs represent{' '}
              <span className="font-semibold">
                {((fixedCosts / totalCosts) * 100).toFixed(0)}%
              </span>{' '}
              of total costs
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">→</span>
            <span className="text-gray-700">
              Variable costs represent{' '}
              <span className="font-semibold">
                {((variableCosts / totalCosts) * 100).toFixed(0)}%
              </span>{' '}
              of total costs
            </span>
          </li>
          {percentages.cogs > 50 && (
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">!</span>
              <span className="text-gray-700">
                COGS is high at{' '}
                <span className="font-semibold">{percentages.cogs.toFixed(1)}%</span> of revenue.
                Consider cost optimization
              </span>
            </li>
          )}
          {percentages.profit > 20 && (
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">
                Healthy profit margin of{' '}
                <span className="font-semibold">{percentages.profit.toFixed(1)}%</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CostAnalysisCard;
