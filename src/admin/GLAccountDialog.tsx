/**
 * GL Account Dialog Component
 * Modal for creating or editing GL accounts
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  GLAccount,
  CreateGLAccountRequest,
  UpdateGLAccountRequest,
  AccountType,
  AnalyticType,
  GL_ACCOUNT_RULES,
} from '@/types/gl-account';
import { glAccountService } from '@/gl/account.service';

interface GLAccountDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  tenantId: string;
  account?: GLAccount;
  parentId?: string;
  onClose: () => void;
  onSave: (account: GLAccount) => void;
}

const ACCOUNT_TYPES: AccountType[] = [
  'asset',
  'liability',
  'equity',
  'revenue',
  'cogs',
  'expense',
  'other_income',
  'other_expense',
];

const ANALYTIC_TYPES: AnalyticType[] = [
  'none',
  'cost_center',
  'department',
  'location',
  'customer',
  'project',
];

export default function GLAccountDialog({
  open,
  mode,
  tenantId,
  account,
  parentId,
  onClose,
  onSave,
}: GLAccountDialogProps) {
  const [formData, setFormData] = useState<
    CreateGLAccountRequest & { id?: string; status?: string }
  >({
    code: '',
    name: '',
    type: 'asset',
    normalBalance: 'debit',
    currencyCode: 'EUR',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && account) {
      setFormData({
        id: account.id,
        code: account.code,
        name: account.name,
        description: account.description,
        type: account.type,
        normalBalance: account.normalBalance,
        currencyCode: account.currencyCode,
        analyticType: account.analyticType,
        requiresAnalyticDimension: account.requiresAnalyticDimension,
        isTaxable: account.isTaxable,
        taxCode: account.taxCode,
        displayOrder: account.displayOrder,
      });
    } else {
      setFormData({
        code: '',
        name: '',
        type: 'asset',
        normalBalance: 'debit',
        currencyCode: 'EUR',
        parentId,
      });
    }
    setError(null);
    setCodeError(null);
  }, [mode, account, open, parentId]);

  const validateCode = async () => {
    if (!formData.code) {
      setCodeError('Account code is required');
      return false;
    }

    if (formData.code.length < GL_ACCOUNT_RULES.minCodeLength) {
      setCodeError(`Code must be at least ${GL_ACCOUNT_RULES.minCodeLength} characters`);
      return false;
    }

    if (formData.code.length > GL_ACCOUNT_RULES.maxCodeLength) {
      setCodeError(`Code must not exceed ${GL_ACCOUNT_RULES.maxCodeLength} characters`);
      return false;
    }

    if (!GL_ACCOUNT_RULES.codePattern.test(formData.code)) {
      setCodeError('Code can only contain numbers, dots, hyphens, and underscores');
      return false;
    }

    // Check uniqueness in backend
    try {
      const isValid = await glAccountService.validateAccountCode(tenantId, formData.code);
      if (!isValid && mode === 'create') {
        setCodeError('This account code already exists');
        return false;
      }
    } catch (_err) {
      // Continue if validation service fails
    }

    setCodeError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate code first
    if (!(await validateCode())) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let savedAccount: GLAccount;

      if (mode === 'create') {
        const request: CreateGLAccountRequest = {
          code: formData.code,
          name: formData.name,
          type: formData.type,
          normalBalance: formData.normalBalance,
          currencyCode: formData.currencyCode,
        };

        if (formData.description) request.description = formData.description;
        if (parentId) request.parentId = parentId;
        if (formData.analyticType) request.analyticType = formData.analyticType;
        if (formData.requiresAnalyticDimension !== undefined)
          request.requiresAnalyticDimension = formData.requiresAnalyticDimension;
        if (formData.isTaxable !== undefined) request.isTaxable = formData.isTaxable;
        if (formData.taxCode) request.taxCode = formData.taxCode;
        if (formData.displayOrder !== undefined) request.displayOrder = formData.displayOrder;

        savedAccount = await glAccountService.createAccount(tenantId, request);
      } else if (account) {
        const request: UpdateGLAccountRequest = {};

        if (formData.name !== account.name) request.name = formData.name;
        if (formData.description !== account.description) request.description = formData.description;
        if (formData.normalBalance !== account.normalBalance)
          request.normalBalance = formData.normalBalance;
        if (formData.analyticType !== account.analyticType)
          request.analyticType = formData.analyticType;
        if (formData.requiresAnalyticDimension !== account.requiresAnalyticDimension)
          request.requiresAnalyticDimension = formData.requiresAnalyticDimension;
        if (formData.isTaxable !== account.isTaxable) request.isTaxable = formData.isTaxable;
        if (formData.taxCode !== account.taxCode) request.taxCode = formData.taxCode;
        if (formData.displayOrder !== account.displayOrder)
          request.displayOrder = formData.displayOrder;

        savedAccount = await glAccountService.updateAccount(tenantId, account.id, request);
      } else {
        throw new Error('Invalid state');
      }

      onSave(savedAccount);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save account');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create GL Account' : 'Edit GL Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Account Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  onBlur={validateCode}
                  placeholder="e.g., 1000, 1010.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    codeError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={mode === 'edit'}
                  required
                />
                {codeError && <p className="text-sm text-red-600 mt-1">{codeError}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier. {mode === 'edit' ? 'Cannot be changed.' : 'Required.'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Cash on Hand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Account Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as AccountType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={mode === 'edit'}
                  required
                >
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Normal Balance <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.normalBalance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      normalBalance: e.target.value as 'debit' | 'credit',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Currency <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.currencyCode}
                  onChange={(e) => setFormData({ ...formData, currencyCode: e.target.value })}
                  maxLength={3}
                  placeholder="USD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Analytic Type
                </label>
                <select
                  value={formData.analyticType || 'none'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      analyticType: e.target.value as AnalyticType,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ANALYTIC_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.requiresAnalyticDimension || false}
                  onChange={(e) =>
                    setFormData({ ...formData, requiresAnalyticDimension: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-900">Requires Analytic Dimension</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isTaxable || false}
                  onChange={(e) => setFormData({ ...formData, isTaxable: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-900">Taxable Account</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Account' : 'Update Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
