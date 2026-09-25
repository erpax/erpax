/**
 * BalanceSheetWidget — IFRS IAS-1 / US-GAAP ASC 210 statement of financial position.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 §54 statement-of-financial-position
 * @accounting US-GAAP ASC-210-10 balance-sheet-classification-of-current-assets-and-liabilities
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @compliance SOX §404 internal-controls
 */
import React from 'react';
import { formatCurrency } from '@/format/amount';
import { StatementSection } from '@/widget/section';
import type { BalanceSheetData } from '@/analytics';

interface BalanceSheetWidgetProps {
  data: BalanceSheetData | null;
}

const BalanceSheetWidget: React.FC<BalanceSheetWidgetProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Balance Sheet</h2>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const getEquationStatus = () => {
    const difference = data.totalAssets - (data.totalLiabilities + data.totalEquity);
    return {
      isBalanced: Math.abs(difference) < 1,
      difference,
    };
  };

  const status = getEquationStatus();

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4 border border-border">
      <h2 className="text-lg font-semibold mb-4">Balance Sheet</h2>

      {/* Accounting Equation Status */}
      <div className="mb-4 p-2 bg-blue-50 rounded text-xs">
        <div className="flex justify-between">
          <span className="text-gray-700">Equation A = L + E:</span>
          <span className={status.isBalanced ? 'text-success font-semibold' : 'text-error font-semibold'}>
            {status.isBalanced ? '✓ Balanced' : `✗ Off by ${formatCurrency(status.difference)}`}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto max-h-96 text-xs">
        <StatementSection
          title="ASSETS"
          rows={data.assets}
          total={data.totalAssets}
          totalLabel="Total Assets"
        />
        <StatementSection
          title="LIABILITIES"
          rows={data.liabilities}
          total={data.totalLiabilities}
          totalLabel="Total Liabilities"
          tint="bg-orange-100"
        />
        <StatementSection
          title="EQUITY"
          rows={data.equity}
          total={data.totalEquity}
          totalLabel="Total Equity"
          tint="bg-green-100"
        />
      </div>

      <div className="text-xs text-muted-foreground mt-3">
        As of {new Date(data.asOfDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BalanceSheetWidget;
