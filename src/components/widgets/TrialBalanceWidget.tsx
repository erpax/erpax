/**
 * TrialBalanceWidget — pre-statement debit/credit symmetry evidence.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 §54 statement-of-financial-position
 * @accounting US-GAAP ASC-205-10 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail debit-credit-symmetry
 * @compliance SOX §404 internal-controls trial-balance-evidence
 */
import React from 'react';
import { formatCurrency } from '../Dashboard';
import type { TrialBalanceData } from '../analytics/types';

interface TrialBalanceWidgetProps {
  data: TrialBalanceData | null;
}

const TrialBalanceWidget: React.FC<TrialBalanceWidgetProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Trial Balance</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const getStatusColor = () => {
    return data.isBalanced
      ? 'bg-green-50 border-green-200'
      : 'bg-red-50 border-red-200';
  };

  const getStatusText = () => {
    return data.isBalanced ? (
      <span className="text-green-700 font-semibold">✓ Balanced</span>
    ) : (
      <span className="text-red-700 font-semibold">✗ Unbalanced</span>
    );
  };

  return (
    <div className={`${getStatusColor()} rounded-lg shadow p-4 border`}>
      <h2 className="text-lg font-semibold mb-4">Trial Balance</h2>

      {/* Status */}
      <div className="mb-4 p-3 bg-white rounded border">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Status:</span>
          {getStatusText()}
        </div>
      </div>

      {/* Accounts Table */}
      <div className="overflow-y-auto max-h-96">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="text-left px-2 py-2">Account</th>
              <th className="text-right px-2 py-2">Debit</th>
              <th className="text-right px-2 py-2">Credit</th>
            </tr>
          </thead>
          <tbody>
            {data.accounts.map((account) => (
              <tr key={account.accountCode} className="border-b hover:bg-gray-50">
                <td className="px-2 py-2">
                  <div className="font-medium text-gray-900">
                    {account.accountCode}
                  </div>
                  <div className="text-gray-600">{account.accountName}</div>
                </td>
                <td className="text-right px-2 py-2 text-gray-700">
                  {account.debitBalance ? formatCurrency(account.debitBalance) : '-'}
                </td>
                <td className="text-right px-2 py-2 text-gray-700">
                  {account.creditBalance ? formatCurrency(account.creditBalance) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 font-semibold border-t-2">
            <tr>
              <td className="px-2 py-2">TOTALS</td>
              <td className="text-right px-2 py-2">
                {formatCurrency(data.totalDebits)}
              </td>
              <td className="text-right px-2 py-2">
                {formatCurrency(data.totalCredits)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-500 mt-3">
        As of {new Date(data.asOfDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TrialBalanceWidget;
