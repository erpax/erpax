import React, { useState } from 'react';
import { AccountingClient } from '@/sdk/accounting-client';
import Modal from '@/modal/Modal';

/**
 * Modal for creating a balanced journal entry (debits = credits).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-amount
 * @standard ISO-8601-1:2019 date-time entry-date
 * @accounting IFRS double-entry-bookkeeping
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail journal-entry-creation
 * @see docs/STANDARDS.md §4.2
 */


interface CreateJournalEntryModalProps {
  client: AccountingClient;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

interface _JournalLine {
  accountCode: string;
  debit: string;
  credit: string;
  description: string;
}

const CreateJournalEntryModal: React.FC<CreateJournalEntryModalProps> = ({
  client,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    lines: [
      { accountCode: '', debit: '', credit: '', description: '' },
      { accountCode: '', debit: '', credit: '', description: '' },
    ],
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      transactionDate: e.target.value,
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleLineChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newLines = [...formData.lines];
    (newLines[index] as Record<string, unknown>)[field] = value;
    setFormData((prev) => ({
      ...prev,
      lines: newLines,
    }));
  };

  const addLine = () => {
    setFormData((prev) => ({
      ...prev,
      lines: [
        ...prev.lines,
        { accountCode: '', debit: '', credit: '', description: '' },
      ],
    }));
  };

  const removeLine = (index: number) => {
    if (formData.lines.length > 2) {
      const newLines = formData.lines.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        lines: newLines,
      }));
    }
  };

  const calculateTotals = () => {
    let totalDebit = 0;
    let totalCredit = 0;

    formData.lines.forEach((line) => {
      if (line.debit) totalDebit += parseFloat(line.debit) || 0;
      if (line.credit) totalCredit += parseFloat(line.credit) || 0;
    });

    return { totalDebit, totalCredit };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.description || formData.lines.length < 2) {
      setError('Please provide a description and at least 2 lines');
      return;
    }

    const totals = calculateTotals();
    if (Math.abs(totals.totalDebit - totals.totalCredit) > 0.01) {
      setError(
        `Debits (${totals.totalDebit.toFixed(2)}) must equal Credits (${totals.totalCredit.toFixed(2)})`
      );
      return;
    }

    // Validate all lines have required fields
    const invalidLine = formData.lines.find(
      (line) => !line.accountCode || (!line.debit && !line.credit)
    );
    if (invalidLine) {
      setError(
        'All lines must have account code and either debit or credit amount'
      );
      return;
    }

    try {
      setLoading(true);

      const lines = formData.lines.map((line) => ({
        accountCode: line.accountCode,
        debit: line.debit ? Math.round(parseFloat(line.debit) * 100) : undefined,
        credit: line.credit ? Math.round(parseFloat(line.credit) * 100) : undefined,
        description: line.description,
      }));

      const response = await client.createJournalEntry({
        transactionDate: formData.transactionDate,
        description: formData.description,
        lines,
      });

      if (response.success) {
        onSuccess('Journal entry created successfully');
      } else {
        setError(response.message || 'Failed to create journal entry');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();
  const isBalanced = Math.abs(totals.totalDebit - totals.totalCredit) < 0.01;

  return (
    <Modal title="Create Journal Entry" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Date *
          </label>
          <input
            type="date"
            value={formData.transactionDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="E.g., Monthly depreciation"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lines */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Journal Lines
            </label>
            <button
              type="button"
              onClick={addLine}
              className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
            >
              + Add Line
            </button>
          </div>

          <div className="space-y-2">
            {formData.lines.map((line, index) => (
              <div key={index} className="p-2 border border-gray-200 rounded">
                <div className="grid grid-cols-12 gap-1 text-xs">
                  <input
                    type="text"
                    value={line.accountCode}
                    onChange={(e) =>
                      handleLineChange(index, 'accountCode', e.target.value)
                    }
                    placeholder="Account Code"
                    className="col-span-3 px-2 py-1 border border-gray-200 rounded"
                  />
                  <input
                    type="number"
                    value={line.debit}
                    onChange={(e) =>
                      handleLineChange(index, 'debit', e.target.value)
                    }
                    placeholder="Debit"
                    step="0.01"
                    className="col-span-3 px-2 py-1 border border-gray-200 rounded"
                  />
                  <input
                    type="number"
                    value={line.credit}
                    onChange={(e) =>
                      handleLineChange(index, 'credit', e.target.value)
                    }
                    placeholder="Credit"
                    step="0.01"
                    className="col-span-3 px-2 py-1 border border-gray-200 rounded"
                  />
                  {formData.lines.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      className="col-span-3 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={line.description}
                  onChange={(e) =>
                    handleLineChange(index, 'description', e.target.value)
                  }
                  placeholder="Line description"
                  className="w-full px-2 py-1 border border-gray-200 rounded mt-1 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div
          className={`p-2 rounded text-xs font-semibold ${isBalanced ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
        >
          <div className="flex justify-between">
            <span>Total Debits: ${totals.totalDebit.toFixed(2)}</span>
            <span>Total Credits: ${totals.totalCredit.toFixed(2)}</span>
            <span>{isBalanced ? '✓ Balanced' : '✗ Unbalanced'}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isBalanced}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Entry'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateJournalEntryModal;
