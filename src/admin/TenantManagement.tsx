/**
 * Admin tenant (tenant) management — CRUD table, filters, batch actions.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation admin-CRUD
 * @security ISO-27002 §5.15 access-control admin-interface
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @audit ISO-19011:2018 audit-trail admin-actions
 * @see docs/STANDARDS.md §4.4
 */

/**
 * Tenant Management Component
 * Admin interface for managing tenants (ERPAX instances)
 * Learned from Ruby ERPAX app/admin/system/domains.rb
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Tenant,
  TENANT_STATUS_LABELS,
  TENANT_STATUS_COLORS,
  TENANT_STATUS_TRANSITIONS,
  TenantFilterOptions,
  BatchTenantActionRequest,
} from '@/types/tenant';
import { tenantService } from '@/tenant.service';
import HostTable from '@/admin/TenantTable';
import HostFilters from '@/admin/TenantFilters';
import HostDialog from '@/admin/TenantDialog';
import BatchActionsBar from '@/admin/BatchActionsBar';

interface HostManagementProps {
  onTenantCreated?: (tenant: Tenant) => void;
  onTenantUpdated?: (tenant: Tenant) => void;
}

/**
 * HostManagement - Main admin interface for tenant management
 * Features:
 * - List all tenants with filtering and pagination
 * - Create new tenants
 * - View tenant details
 * - Edit tenant configuration
 * - Batch actions (activate, suspend, reset, enable/disable SSL)
 * - Tenant statistics and status tracking
 */
export default function HostManagement({ onTenantCreated, onTenantUpdated }: HostManagementProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selection state for batch operations
  const [selectedHostIds, setSelectedHostIds] = useState<Set<string>>(new Set());

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(20);

  // Filter state
  const [filters, setFilters] = useState<TenantFilterOptions>({});
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'status' | 'country'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Dialog state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Batch operation state
  const [batchLoading, setBatchLoading] = useState(false);

  /**
   * Load tenants from API
   */
  const loadHosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await tenantService.listTenants(filters, {
        page,
        pageSize,
        sortBy,
        sortOrder,
      });

      setTenants(response.tenants);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tenants');
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize, sortBy, sortOrder]);

  useEffect(() => {
    loadHosts();
  }, [loadHosts]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = (newFilters: TenantFilterOptions) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page
  };

  /**
   * Handle sorting
   */
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field as 'name' | 'createdAt' | 'status' | 'country');
      setSortOrder('asc');
    }
  };

  /**
   * Handle row selection
   */
  const handleSelectTenant = (tenantId: string, selected: boolean) => {
    const newSelected = new Set(selectedHostIds);
    if (selected) {
      newSelected.add(tenantId);
    } else {
      newSelected.delete(tenantId);
    }
    setSelectedHostIds(newSelected);
  };

  /**
   * Handle select all
   */
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedHostIds(new Set(tenants.map(h => h.id)));
    } else {
      setSelectedHostIds(new Set());
    }
  };

  /**
   * Handle tenant action
   */
  const handleTenantAction = async (tenantId: string, action: string) => {
    try {
      let updatedTenant: Tenant;

      switch (action) {
        case 'activate':
          updatedTenant = await tenantService.activateTenant(tenantId);
          break;
        case 'suspend':
          updatedTenant = await tenantService.suspendTenant(tenantId);
          break;
        case 'reset':
          updatedTenant = await tenantService.resetTenantStatus(tenantId);
          break;
        case 'archive':
          updatedTenant = await tenantService.archiveTenant(tenantId);
          break;
        case 'enableSSL':
          updatedTenant = await tenantService.enableSSL(tenantId);
          break;
        case 'disableSSL':
          updatedTenant = await tenantService.disableSSL(tenantId);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      // Update local state
      setTenants(tenants.map(h => (h.id === tenantId ? updatedTenant : h)));
      onTenantUpdated?.(updatedTenant);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    }
  };

  /**
   * Handle batch action
   */
  const handleBatchAction = async (action: string) => {
    if (selectedHostIds.size === 0) {
      setError('Please select at least one tenant');
      return;
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedHostIds.size} tenant(s)?`)) {
      return;
    }

    try {
      setBatchLoading(true);
      const response = await tenantService.batchAction({
        // Slice CCC: API/type rename tenant→tenant. selectedHostIds keeps the
        // legacy variable name for callsite stability; on the wire it is
        // `tenantIds` per BatchTenantActionRequest.
        tenantIds: Array.from(selectedHostIds),
        action: action as BatchTenantActionRequest['action'],
      });

      // Reload tenants
      await loadHosts();
      setSelectedHostIds(new Set());

      if (response.failed > 0) {
        setError(`${response.failed} tenant(s) failed to ${action}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Batch action failed');
    } finally {
      setBatchLoading(false);
    }
  };

  /**
   * Handle create tenant
   */
  const handleCreateTenant = async (newTenant: Tenant) => {
    setShowCreateDialog(false);
    await loadHosts();
    onTenantCreated?.(newTenant);
  };

  /**
   * Handle update tenant
   */
  const handleUpdateTenant = async (updatedTenant: Tenant) => {
    setShowEditDialog(false);
    setSelectedTenant(null);
    await loadHosts();
    onTenantUpdated?.(updatedTenant);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage independent ERPAX instances configured for different countries and accounting standards
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Tenant
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Filters */}
      <HostFilters onFilterChange={handleFilterChange} />

      {/* Batch actions bar */}
      {selectedHostIds.size > 0 && (
        <BatchActionsBar
          selectedCount={selectedHostIds.size}
          onAction={handleBatchAction}
          loading={batchLoading}
        />
      )}

      {/* Tenant table */}
      <HostTable
        tenants={tenants}
        selectedHostIds={selectedHostIds}
        loading={loading}
        onSelectTenant={handleSelectTenant}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
        onTenantAction={handleTenantAction}
        onViewDetails={(tenant) => {
          setSelectedTenant(tenant);
          setShowDetailDialog(true);
        }}
        onEdit={(tenant) => {
          setSelectedTenant(tenant);
          setShowEditDialog(true);
        }}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * pageSize >= total || loading}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Create dialog */}
      <HostDialog
        open={showCreateDialog}
        mode="create"
        onClose={() => setShowCreateDialog(false)}
        onSave={handleCreateTenant}
      />

      {/* Edit dialog */}
      {selectedTenant && (
        <HostDialog
          open={showEditDialog}
          mode="edit"
          tenant={selectedTenant}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedTenant(null);
          }}
          onSave={handleUpdateTenant}
        />
      )}

      {/* Detail dialog */}
      {selectedTenant && (
        <HostDetailDialog
          open={showDetailDialog}
          tenant={selectedTenant}
          onClose={() => {
            setShowDetailDialog(false);
            setSelectedTenant(null);
          }}
          onEdit={() => setShowEditDialog(true)}
          onAction={handleTenantAction}
        />
      )}
    </div>
  );
}

/**
 * Tenant Detail Dialog Component
 */
function HostDetailDialog({
  open,
  tenant,
  onClose,
  onEdit,
  onAction,
}: {
  open: boolean;
  tenant: Tenant;
  onClose: () => void;
  onEdit: () => void;
  onAction: (tenantId: string, action: string) => Promise<void>;
}) {
  if (!open) return null;

  const validActions = TENANT_STATUS_TRANSITIONS[tenant.status] || [];
  const statusColor = TENANT_STATUS_COLORS[tenant.status];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tenant.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{tenant.slug}</p>
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
          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Status</h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${statusColor}-600`}
              >
                {TENANT_STATUS_LABELS[tenant.status]}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Country</h4>
              <p className="text-gray-600 mt-1">{tenant.country}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Accounting Standard</h4>
              <p className="text-gray-600 mt-1">{tenant.accountingStandard}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Currency</h4>
              <p className="text-gray-600 mt-1">{tenant.currency}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Locale</h4>
              <p className="text-gray-600 mt-1">{tenant.locale}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Fiscal Year End</h4>
              <p className="text-gray-600 mt-1">{tenant.fiscalYearEnd}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Default Tax Rate</h4>
              <p className="text-gray-600 mt-1">{tenant.defaultTaxRate}%</p>
            </div>
            {tenant.domainName && (
              <div className="col-span-2">
                <h4 className="text-sm font-semibold text-gray-900">Domain</h4>
                <p className="text-gray-600 mt-1">{tenant.domainName}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">SSL</h4>
              <p className="text-gray-600 mt-1">{tenant.sslEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Created</h4>
              <p className="text-gray-600 mt-1">{new Date(tenant.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {tenant.description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Description</h4>
              <p className="text-gray-600 mt-2">{tenant.description}</p>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex gap-2">
            {validActions.includes('active') && (
              <button
                onClick={() => onAction(tenant.id, 'activate')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Activate
              </button>
            )}
            {validActions.includes('suspended') && (
              <button
                onClick={() => onAction(tenant.id, 'suspend')}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
              >
                Suspend
              </button>
            )}
            {validActions.includes('archived') && (
              <button
                onClick={() => onAction(tenant.id, 'archive')}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Archive
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
