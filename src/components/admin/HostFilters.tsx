/**
 * Host Filters Component
 * Provides filtering options similar to Ruby ERPAX scopes
 */

'use client';

import React, { useState } from 'react';
import { HostFilterOptions, HOST_STATUS_LABELS, COUNTRY_TO_STANDARD } from '@/types/host';

interface HostFiltersProps {
  onFilterChange: (filters: HostFilterOptions) => void;
}

const COUNTRIES = Object.keys(COUNTRY_TO_STANDARD).sort();
const STANDARDS = Array.from(new Set(Object.values(COUNTRY_TO_STANDARD))).sort();
const STATUSES = Object.keys(HOST_STATUS_LABELS) as Array<keyof typeof HOST_STATUS_LABELS>;

export default function HostFilters({ onFilterChange }: HostFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [standard, setStandard] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApplyFilters = () => {
    const filters: HostFilterOptions = {};

    if (status.length > 0) filters.status = status as any;
    if (country.length > 0) filters.country = country;
    if (standard.length > 0) filters.accountingStandard = standard as any;
    if (searchTerm) filters.searchTerm = searchTerm;

    onFilterChange(filters);
    setShowFilters(false);
  };

  const handleReset = () => {
    setStatus([]);
    setCountry([]);
    setStandard([]);
    setSearchTerm('');
    onFilterChange({});
  };

  const activeFilterCount = status.length + country.length + standard.length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Quick filters (like Ruby ERPAX scopes) */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setStatus([]);
            setCountry([]);
            setStandard([]);
            setSearchTerm('');
            onFilterChange({});
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          All
        </button>
        <button
          onClick={() => {
            onFilterChange({ status: 'active' });
            setStatus(['active']);
            setShowFilters(false);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Active
        </button>
        <button
          onClick={() => {
            onFilterChange({ status: 'suspended' });
            setStatus(['suspended']);
            setShowFilters(false);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Suspended
        </button>
        <button
          onClick={() => {
            onFilterChange({ status: 'draft' });
            setStatus(['draft']);
            setShowFilters(false);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Draft
        </button>

        {/* Advanced filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map((st) => (
                <label key={st} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={status.includes(st)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStatus([...status, st]);
                      } else {
                        setStatus(status.filter((s) => s !== st));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{HOST_STATUS_LABELS[st]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Country filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Country</label>
            <select
              multiple
              value={country}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                setCountry(selected);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              size={5}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>

          {/* Accounting Standard filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Accounting Standard
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STANDARDS.map((st) => (
                <label key={st} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={standard.includes(st)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStandard([...standard, st]);
                      } else {
                        setStandard(standard.filter((s) => s !== st));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
