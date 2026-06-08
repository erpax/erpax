/**
 * IncomeStatementWidget — IFRS IAS-1 / US-GAAP ASC 220 statement of profit or loss.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 §81A presentation-of-profit-or-loss-and-other-comprehensive-income
 * @accounting US-GAAP ASC-220-10 income-statement-reporting-comprehensive-income
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @compliance SOX §404 internal-controls
 */
import React from 'react';
import { formatCurrency } from '@/dashboard';
import type { IncomeStatementData } from '@/analytics';

interface IncomeStatementWidgetProps {
  data: IncomeStatementData | null;
}

const IncomeStatementWidget: React.FC<IncomeStatementWidgetProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Income Statement</h2>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const getProfitColor = () => {
    return data.netIncome >= 0
      ? 'text-success'
      : 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4 border border-border">
      <h2 className="text-lg font-semibold mb-4">Income Statement</h2>

      <div className="overflow-y-auto max-h-96 text-xs">
        {/* Revenues */}
        <div className="mb-3">
          <div className="font-bold bg-primary/20 px-2 py-1">REVENUES</div>
          {data.revenues.map((item) => (
            <div key={item.accountCode} className="flex justify-between px-2 py-1 border-b">
              <span>{item.accountName}</span>
              <span className="text-right">{formatCurrency(item.balance)}</span>
            </div>
          ))}
          <div className="flex justify-between px-2 py-1 bg-muted font-semibold">
            <span>Total Revenues</span>
            <span>{formatCurrency(data.totalRevenues)}</span>
          </div>
        </div>

        {/* Cost of Goods Sold */}
        <div className="mb-3">
          <div className="font-bold bg-orange-100 px-2 py-1">COST OF GOODS SOLD</div>
          {data.cogs.length > 0 ? (
            <>
              {data.cogs.map((item) => (
                <div key={item.accountCode} className="flex justify-between px-2 py-1 border-b">
                  <span>{item.accountName}</span>
                  <span className="text-right">{formatCurrency(item.balance)}</span>
                </div>
              ))}
              <div className="flex justify-between px-2 py-1 bg-muted font-semibold">
                <span>Total COGS</span>
                <span>{formatCurrency(data.totalCOGS)}</span>
              </div>
            </>
          ) : (
            <div className="px-2 py-1 text-muted-foreground">No COGS items</div>
          )}
        </div>

        {/* Gross Profit */}
        <div className="flex justify-between px-2 py-2 bg-blue-50 font-semibold border-y-2 mb-3">
          <span>Gross Profit</span>
          <span>{formatCurrency(data.grossProfit)}</span>
        </div>

        {/* Operating Expenses */}
        <div className="mb-3">
          <div className="font-bold bg-red-100 px-2 py-1">OPERATING EXPENSES</div>
          {data.operatingExpenses.length > 0 ? (
            <>
              {data.operatingExpenses.map((item) => (
                <div key={item.accountCode} className="flex justify-between px-2 py-1 border-b">
                  <span>{item.accountName}</span>
                  <span className="text-right">{formatCurrency(item.balance)}</span>
                </div>
              ))}
              <div className="flex justify-between px-2 py-1 bg-muted font-semibold">
                <span>Total Op. Expenses</span>
                <span>{formatCurrency(data.totalOperatingExpenses)}</span>
              </div>
            </>
          ) : (
            <div className="px-2 py-1 text-muted-foreground">No operating expenses</div>
          )}
        </div>

        {/* Operating Income */}
        <div className="flex justify-between px-2 py-2 bg-muted font-semibold border-y-2 mb-3">
          <span>Operating Income</span>
          <span>{formatCurrency(data.operatingIncome)}</span>
        </div>

        {/* Gains and Losses */}
        {(data.gains.length > 0 || data.losses.length > 0) && (
          <div className="mb-3">
            <div className="font-bold bg-purple-100 px-2 py-1">OTHER INCOME/EXPENSE</div>
            {data.gains.map((item) => (
              <div key={item.accountCode} className="flex justify-between px-2 py-1 border-b text-success">
                <span>{item.accountName}</span>
                <span className="text-right">{formatCurrency(item.balance)}</span>
              </div>
            ))}
            {data.losses.map((item) => (
              <div key={item.accountCode} className="flex justify-between px-2 py-1 border-b text-error">
                <span>{item.accountName}</span>
                <span className="text-right">({formatCurrency(Math.abs(item.balance))})</span>
              </div>
            ))}
          </div>
        )}

        {/* Net Income */}
        <div className={`flex justify-between px-2 py-3 bg-muted font-bold border-t-2 text-lg ${getProfitColor()}`}>
          <span>NET INCOME</span>
          <span>{formatCurrency(data.netIncome)}</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-3">
        {new Date(data.periodStart).toLocaleDateString()} to{' '}
        {new Date(data.periodEnd).toLocaleDateString()}
      </div>
    </div>
  );
};

export default IncomeStatementWidget;
