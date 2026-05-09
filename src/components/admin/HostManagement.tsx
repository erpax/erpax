/**
 * Host Management Component
 * Admin interface for managing hosts (ERPAX instances)
 * Learned from Ruby ERPAX app/admin/system/domains.rb
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Host,
  HostStatusLabel,
  HostStatusColors,
  HOST_STATUS_TRANSITIONS,
  HostFilterOptions,
} from '@/types/host';
import { hostService } from '@/services/host.service';
import HostTable from './HostTable';
import HostFilters from './HostFilters';
import HostDialog from './HostDialog';
import BatchActionsBar from './BatchActionsBar';

interface HostManagementProps {
  onHostCreated?: (host: Host) => void;
  onHostUpdated?: (host: Host) => void;
}

/**
 * HostManagement - Main admin interface for host management
 * Features:
 * - List all hosts with filtering and pagination
 * - Create new hosts
 * - View host details
 * - Edit host configuration
 * - Batch actions (activate, suspend, reset, enable/disable SSL)
 * - Host statistics and status tracking
 */
export default function HostManagement({ onHostCreated, onHostUpdated }: HostManagementProps) {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selection state for batch operations
  const [selectedHostIds, setSelectedHostIds] = useState<Set<string>>(new Set());

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(20);

  // Filter state
  const [filters, setFilters] = useState<HostFilterOptions>({});
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'status' | 'country'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Dialog state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Batch operation state
  const [batchLoading, setBatchLoading] = useState(false);

  /**
   * Load hosts from API
   */
  const loadHosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await hostService.listHosts(filters, {
        page,
        pageSize,
        sortBy,
        sortOrder,
      });

      setHosts(response.hosts);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hosts');
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
  const handleFilterChange = (newFilters: HostFilterOptions) => {
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
      setSortBy(field as any);
      setSortOrder('asc');
    }
  };

  /**
   * Handle row selection
   */
  const handleSelectHost = (hostId: string, selected: boolean) => {
    const newSelected = new Set(selectedHostIds);
    if (selected) {
      newSelected.add(hostId);
    } else {
      newSelected.delete(hostId);
    }
    setSelectedHostIds(newSelected);
  };

  /**
   * Handle select all
   */
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedHostIds(new Set(hosts.map(h => h.id)));
    } else {
      setSelectedHostIds(new Set());
    }
  };

  /**
   * Handle host action
   */
  const handleHostAction = async (hostId: string, action: string) => {
    try {
      let updatedHost: Host;

      switch (action) {
        case 'activate':
          updatedHost = await hostService.activateHost(hostId);
          break;
        case 'suspend':
          updatedHost = await hostService.suspendHost(hostId);
          break;
        case 'reset':
          updatedHost = await hostService.resetHostStatus(hostId);
          break;
        case 'archive':
          updatedHost = await hostService.archiveHost(hostId);
          break;
        case 'enableSSL':
          updatedHost = await hostService.enableSSL(hostId);
          break;
        case 'disableSSL':
          updatedHost = await hostService.disableSSL(hostId);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      // Update local state
      setHosts(hosts.map(h => (h.id === hostId ? updatedHost : h)));
      onHostUpdated?.(updatedHost);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    }
  };

  /**
   * Handle batch action
   */
  const handleBatchAction = async (action: string) => {
    if (selectedHostIds.size === 0) {
      setError('Please select at least one host');
      return;
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedHostIds.size} host(s)?`)) {
      return;
    }

    try {
      setBatchLoading(true);
      const response = await hostService.batchAction({
        hostIds: Array.from(selectedHostIds),
        action: action as any,
      });

      // Reload hosts
      await loadHosts();
      setSelectedHostIds(new Set());

      if (response.failed > 0) {
        setError(`${response.failed} host(s) failed to ${action}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Batch action failed');
    } finally {
      setBatchLoading(false);
    }
  };

  /**
   * Handle create host
   */
  const handleCreateHost = async (newHost: Host) => {
    setShowCreateDialog(false);
    await loadHosts();
    onHostCreated?.(newHost);
  };

  /**
   * Handle update host
   */
  const handleUpdateHost = async (updatedHost: Host) => {
    setShowEditDialog(false);
    setSelectedHost(null);
    await loadHosts();
    onHostUpdated?.(updatedHost);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Host Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage independent ERPAX instances configured for different countries and accounting standards
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Host
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

      {/* Host table */}
      <HostTable
        hosts={hosts}
        selectedHostIds={selectedHostIds}
        loading={loading}
        onSelectHost={handleSelectHost}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
        onHostAction={handleHostAction}
        onViewDetails={(host) => {
          setSelectedHost(host);
          setShowDetailDialog(true);
        }}
        onEdit={(host) => {
          setSelectedHost(host);
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
        onSave={handleCreateHost}
      />

      {/* Edit dialog */}
      {selectedHost && (
        <HostDialog
          open={showEditDialog}
          mode="edit"
          host={selectedHost}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedHost(null);
          }}
          onSave={handleUpdateHost}
        />
      )}

      {/* Detail dialog */}
      {selectedHost && (
        <HostDetailDialog
          open={showDetailDialog}
          host={selectedHost}
          onClose={() => {
            setShowDetailDialog(false);
            setSelectedHost(null);
          }}
          onEdit={() => setShowEditDialog(true)}
          onAction={handleHostAction}
        />
      )}
    </div>
  );
}

/**
 * Host Detail Dialog Component
 */
function HostDetailDialog({
  open,
  host,
  onClose,
  onEdit,
  onAction,
}: {
  open: boolean;
  host: Host;
  onClose: () => void;
  onEdit: () => void;
  onAction: (hostId: string, action: string) => Promise<void>;
}) {
  if (!open) return null;

  const validActions = HOST_STATUS_TRANSITIONS[host.status] || [];
  const statusColor = HostStatusColors[host.status];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{host.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{host.slug}</p>
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
                {HostStatusLabel[host.status]}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Country</h4>
              <p className="text-gray-600 mt-1">{host.country}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Accounting Standard</h4>
              <p className="text-gray-600 mt-1">{host.accountingStandard}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Currency</h4>
              <p className="text-gray-600 mt-1">{host.currency}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Locale</h4>
              <p className="text-gray-600 mt-1">{host.locale}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Fiscal Year End</h4>
              <p className="text-gray-600 mt-1">{host.fiscalYearEnd}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Default Tax Rate</h4>
              <p className="text-gray-600 mt-1">{host.defaultTaxRate}%</p>
            </div>
            {host.domainName && (
              <div className="col-span-2">
                <h4 className="text-sm font-semibold text-gray-900">Domain</h4>
                <p className="text-gray-600 mt-1">{host.domainName}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">SSL</h4>
              <p className="text-gray-600 mt-1">{host.sslEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Created</h4>
              <p className="text-gray-600 mt-1">{new Date(host.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {host.description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Description</h4>
              <p className="text-gray-600 mt-2">{host.description}</p>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex gap-2">
            {validActions.includes('activate') && (
              <button
                onClick={() => onAction(host.id, 'activate')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Activate
              </button>
            )}
            {validActions.includes('suspend') && (
              <button
                onClick={() => onAction(host.id, 'suspend')}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
              >
                Suspend
              </button>
            )}
            {validActions.includes('archived') && (
              <button
                onClick={() => onAction(host.id, 'archive')}
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
