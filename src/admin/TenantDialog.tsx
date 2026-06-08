/**
 * Tenant Dialog Component
 * Modal for creating or editing tenants
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
  COUNTRY_TO_STANDARD,
  COUNTRY_TO_CURRENCY,
  COUNTRY_TO_LOCALE,
  FiscalYearEnd,
} from '@/types/tenant';
import { tenantService } from '@/tenant.service';
import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui';

interface HostDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  tenant?: Tenant;
  onClose: () => void;
  onSave: (tenant: Tenant) => void;
}

const MONTHS: FiscalYearEnd[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const COUNTRIES = Object.keys(COUNTRY_TO_STANDARD).sort();

export default function HostDialog({ open, mode, tenant, onClose, onSave }: HostDialogProps) {
  const [formData, setFormData] = useState<
    CreateTenantRequest & { slug?: string; domainName?: string }
  >({
    name: '',
    country: 'BG',
    currency: 'EUR',
    locale: 'bg-BG',
    fiscalYearEnd: 'December',
    defaultTaxRate: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && tenant) {
      setFormData({
        name: tenant.name,
        slug: tenant.slug,
        description: tenant.description,
        country: tenant.country,
        currency: tenant.currency,
        locale: tenant.locale,
        fiscalYearEnd: tenant.fiscalYearEnd,
        defaultTaxRate: tenant.defaultTaxRate,
        domainName: tenant.domainName,
      });
    }
  }, [mode, tenant, open]);

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      country,
      currency: COUNTRY_TO_CURRENCY[country] || 'EUR',
      locale: COUNTRY_TO_LOCALE[country] || 'bg-BG',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let savedTenant: Tenant;

      if (mode === 'create') {
        const request: CreateTenantRequest = {
          name: formData.name,
          country: formData.country,
          currency: formData.currency,
          locale: formData.locale,
          fiscalYearEnd: formData.fiscalYearEnd,
          defaultTaxRate: formData.defaultTaxRate,
        };
        if (formData.slug) request.slug = formData.slug;
        if (formData.description) request.description = formData.description;
        if (formData.domainName) request.domainName = formData.domainName;

        savedTenant = await tenantService.createTenant(request);
      } else if (tenant) {
        const request: UpdateTenantRequest = {
          currency: formData.currency,
          locale: formData.locale,
          fiscalYearEnd: formData.fiscalYearEnd,
          defaultTaxRate: formData.defaultTaxRate,
        };
        if (formData.name !== tenant.name) request.name = formData.name;
        if (formData.description !== tenant.description) request.description = formData.description;
        if (formData.domainName !== tenant.domainName) request.domainName = formData.domainName;

        savedTenant = await tenantService.updateTenant(tenant.id, request);
      } else {
        throw new Error('Invalid state');
      }

      onSave(savedTenant);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tenant');
    } finally {
      setLoading(false);
    }
  };

  const standard = COUNTRY_TO_STANDARD[formData.country] || 'N/A';

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'create' ? 'Create Tenant' : 'Edit Tenant'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Tenant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Beijing Trading Co."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {mode === 'create' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., beijing-trading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional. Auto-generated if not provided.</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Location & Standards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Accounting</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Accounting Standard
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                  {standard}
                </div>
                <p className="text-xs text-gray-500 mt-1">Auto-determined by country</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Currency <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="e.g., USD"
                  maxLength={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Locale <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.locale}
                  onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
                  placeholder="e.g., en-US"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Financial Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Fiscal Year End <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.fiscalYearEnd}
                  onChange={(e) =>
                    setFormData({ ...formData, fiscalYearEnd: e.target.value as FiscalYearEnd })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.defaultTaxRate}
                  onChange={(e) =>
                    setFormData({ ...formData, defaultTaxRate: parseFloat(e.target.value) })
                  }
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="e.g., 8.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Domain Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Domain Name</label>
              <input
                type="text"
                value={formData.domainName || ''}
                onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                placeholder="e.g., beijing.erpax.app"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Optional. Custom domain for this tenant.</p>
            </div>
          </div>

          <DialogFooter className="gap-4 border-t pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : mode === 'create' ? 'Create Tenant' : 'Update Tenant'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
