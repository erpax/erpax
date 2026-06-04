/**
 * GL Account Filters Component
 * Scope-based filtering like Ruby ERPAX scopes
 */

'use client';

import React from 'react';
import { AccountScope } from '@/types/gl-account';
import { Search } from 'lucide-react';

interface GLAccountFiltersProps {
  scope: AccountScope;
  onScopeChange: (scope: AccountScope) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
}

const SCOPES: { id: AccountScope; label: string }[] = [
  { id: 'all', label: 'All Accounts' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'locked', label: 'Locked' },
];

const TYPE_SCOPES: { id: AccountScope; label: string }[] = [
  { id: 'assets', label: 'Assets' },
  { id: 'liabilities', label: 'Liabilities' },
  { id: 'equity', label: 'Equity' },
  { id: 'revenues', label: 'Revenues' },
  { id: 'expenses', label: 'Expenses' },
];

export default function GLAccountFilters({
  scope,
  onScopeChange,
  searchText,
  onSearchChange,
}: GLAccountFiltersProps) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by code or name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quick Filters */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">Status</p>
        <div className="flex flex-wrap gap-2">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              onClick={() => onScopeChange(s.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                scope === s.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type Scopes */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">Account Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPE_SCOPES.map((s) => (
            <button
              key={s.id}
              onClick={() => onScopeChange(s.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                scope === s.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Special Filters */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">View</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onScopeChange('leaf_only')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              scope === 'leaf_only'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Leaf Accounts Only
          </button>
          <button
            onClick={() => onScopeChange('with_analytics')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              scope === 'with_analytics'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            With Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
