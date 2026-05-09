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
import { formatCurrency } from '../Dashboard';

interface BalanceSheetAccount {
  accountCode: string;
  accountName: string;
  balance: number;
}

interface BalanceSheetData {
  asOfDate: string;
  assets: BalanceSheetAccount[];
  liabilities: BalanceSheetAccount[];
  equity: BalanceSheetAccount[];
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  isBalanced: boolean;
}

interface BalanceSheetWidgetProps {
  data: BalanceSheetData | null;
}

const BalanceSheetWidget: React.FC<BalanceSheetWidgetProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Balance Sheet</h2>
        <p className="text-gray-500">Loading...</p>
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
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Balance Sheet</h2>

      {/* Accounting Equation Status */}
      <div className="mb-4 p-2 bg-blue-50 rounded text-xs">
        <div className="flex justify-between">
          <span className="text-gray-700">Equation A = L + E:</span>
          <span className={status.isBalanced ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
            {status.isBalanced ? '✓ Balanced' : `✗ Off by ${formatCurrency(status.difference)}`}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto max-h-96 text-xs">
        {/* Assets Section */}
        <div className="mb-4">
          <div className="font-bold bg-blue-100 px-2 py-2 mb-1">ASSETS</div>
          {data.assets.map((account) => (
            <div key={account.accountCode} className="flex justify-between px-2 py-1 border-b hover:bg-gray-50">
              <span>{account.accountName}</span>
              <span className="text-right">{formatCurrency(account.balance)}</span>
            </div>
          ))}
          <div className="flex justify-between px-2 py-2 bg-gray-100 font-semibold border-t-2">
            <span>Total Assets</span>
            <span>{formatCurrency(data.totalAssets)}</span>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="mb-4">
          <div className="font-bold bg-orange-100 px-2 py-2 mb-1">LIABILITIES</div>
          {data.liabilities.map((account) => (
            <div key={account.accountCode} className="flex justify-between px-2 py-1 border-b hover:bg-gray-50">
              <span>{account.accountName}</span>
              <span className="text-right">{formatCurrency(account.balance)}</span>
            </div>
          ))}
          <div className="flex justify-between px-2 py-2 bg-gray-100 font-semibold border-t-2">
            <span>Total Liabilities</span>
            <span>{formatCurrency(data.totalLiabilities)}</span>
          </div>
        </div>

        {/* Equity Section */}
        <div className="mb-4">
          <div className="font-bold bg-green-100 px-2 py-2 mb-1">EQUITY</div>
          {data.equity.map((account) => (
            <div key={account.accountCode} className="flex justify-between px-2 py-1 border-b hover:bg-gray-50">
              <span>{account.accountName}</span>
              <span className="text-right">{formatCurrency(account.balance)}</span>
            </div>
          ))}
          <div className="flex justify-between px-2 py-2 bg-gray-100 font-semibold border-t-2">
            <span>Total Equity</span>
            <span>{formatCurrency(data.totalEquity)}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-3">
        As of {new Date(data.asOfDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BalanceSheetWidget;
