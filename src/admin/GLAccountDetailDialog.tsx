/**
 * GL Account Detail Dialog
 * Read-only view of full account details
 */

'use client';

import React from 'react';
import { GLAccount } from '@/types/gl-account';
import { Edit2 } from 'lucide-react';

interface GLAccountDetailDialogProps {
  open: boolean;
  account: GLAccount;
  onClose: () => void;
  onEdit: () => void;
}

export default function GLAccountDetailDialog({
  open,
  account,
  onClose,
  onEdit,
}: GLAccountDetailDialogProps) {
  if (!open) return null;

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    locked: 'bg-red-100 text-red-800',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{account.code}</h2>
              <p className="text-gray-600">{account.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status & Type */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[account.status]} mt-2`}>
                {account.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Type</p>
              <p className="text-lg font-semibold text-gray-900 mt-2 capitalize">
                {account.type.replace(/_/g, ' ')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Normal Balance</p>
              <p className="text-lg font-semibold text-gray-900 mt-2 capitalize">
                {account.normalBalance}
              </p>
            </div>
          </div>

          {/* Description */}
          {account.description && (
            <div>
              <p className="text-sm font-medium text-gray-600">Description</p>
              <p className="text-gray-900 mt-2">{account.description}</p>
            </div>
          )}

          {/* Hierarchy Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hierarchy</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-gray-900 mt-1">{account.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Type</p>
                <p className="text-gray-900 mt-1">{account.isLeaf ? 'Leaf' : 'Parent'}</p>
              </div>
              {account.parentId && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Parent Account</p>
                  <p className="text-gray-900 mt-1 font-mono">{account.parentId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Configuration */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Financial Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Currency</p>
                <p className="text-gray-900 mt-1 font-mono">{account.currencyCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Multi-Currency</p>
                <p className="text-gray-900 mt-1">
                  {account.allowMultiCurrency ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Allow Postings</p>
                <p className="text-gray-900 mt-1">
                  {account.allowPostings ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Requires Approval</p>
                <p className="text-gray-900 mt-1">
                  {account.requiresApproval ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Configuration */}
          {account.analyticType !== 'none' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Analytics Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Analytic Type</p>
                  <p className="text-gray-900 mt-1 capitalize">
                    {account.analyticType.replace(/_/g, ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Requires Dimension</p>
                  <p className="text-gray-900 mt-1">
                    {account.requiresAnalyticDimension ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tax Configuration */}
          {account.isTaxable && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tax Configuration</h3>
              <div>
                <p className="text-sm font-medium text-gray-600">Tax Code</p>
                <p className="text-gray-900 mt-1 font-mono">
                  {account.taxCode || 'Not specified'}
                </p>
              </div>
            </div>
          )}

          {/* Control & Audit */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Control & Audit</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">Created</p>
                <p className="text-gray-900 mt-1">
                  {new Date(account.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">by {account.createdBy}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Updated</p>
                <p className="text-gray-900 mt-1">
                  {new Date(account.updatedAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">by {account.updatedBy}</p>
              </div>
            </div>
          </div>

          {/* Display Order */}
          <div>
            <p className="text-sm font-medium text-gray-600">Display Order</p>
            <p className="text-gray-900 mt-1">{account.displayOrder}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            <Edit2 size={18} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
