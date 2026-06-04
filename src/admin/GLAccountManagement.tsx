/**
 * GL Account Management Component
 * Hierarchical chart of accounts per tenant with tree visualization
 * Patterns learned from Ruby ERPAX GL management
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  GLAccount,
  GLAccountNode,
  AccountScope,
  GLAccountStatistics,
} from '@/types/gl-account';
import { glAccountService } from '@/gl/account.service';
import { Plus, Edit2, Lock, Unlock, Trash2 } from 'lucide-react';
import GLAccountTree from '@/admin/GLAccountTree';
import GLAccountDialog from '@/admin/GLAccountDialog';
import GLAccountFilters from '@/admin/GLAccountFilters';
import GLAccountDetailDialog from '@/admin/GLAccountDetailDialog';

interface GLAccountManagementProps {
  tenantId: string;
  onAccountCreated?: (account: GLAccount) => void;
  onAccountUpdated?: (account: GLAccount) => void;
}

export default function GLAccountManagement({
  tenantId,
  onAccountCreated,
  onAccountUpdated,
}: GLAccountManagementProps) {
  const [accounts, setAccounts] = useState<GLAccount[]>([]);
  const [tree, setTree] = useState<GLAccountNode[]>([]);
  const [statistics, setStatistics] = useState<GLAccountStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [scope, setScope] = useState<AccountScope>('all');
  const [selectedAccount, setSelectedAccount] = useState<GLAccount | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Load accounts and tree
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [accountsData, treeData, statsData] = await Promise.all([
        glAccountService.listAccounts(tenantId, scope),
        glAccountService.getAccountTree(tenantId),
        glAccountService.getAccountStatistics(tenantId),
      ]);

      setAccounts(accountsData);
      setTree(treeData);
      setStatistics(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load GL accounts');
    } finally {
      setLoading(false);
    }
  }, [tenantId, scope]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle create account
  const handleCreateAccount = (_parentId?: string) => {
    setSelectedAccount(null);
    setDialogMode('create');
    // Pass parentId context via state
    setDialogOpen(true);
  };

  // Handle edit account
  const handleEditAccount = (account: GLAccount) => {
    setSelectedAccount(account);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  // Handle view details
  const handleViewDetails = (account: GLAccount) => {
    setSelectedAccount(account);
    setDetailDialogOpen(true);
  };

  // Handle save (create/edit)
  const handleSave = async (account: GLAccount) => {
    setDialogOpen(false);

    if (dialogMode === 'create') {
      onAccountCreated?.(account);
    } else {
      onAccountUpdated?.(account);
    }

    // Reload data
    await loadData();
  };

  // Handle lock/unlock
  const handleToggleLock = async (account: GLAccount) => {
    try {
      if (account.locked) {
        await glAccountService.unlockAccounts(tenantId, [account.id]);
      } else {
        await glAccountService.lockAccounts(tenantId, [account.id], 'Locked via UI');
      }

      // Reload data
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle lock');
    }
  };

  // Handle delete
  const handleDelete = async (account: GLAccount) => {
    if (!window.confirm(`Delete account ${account.code} - ${account.name}?`)) {
      return;
    }

    try {
      await glAccountService.deleteAccount(tenantId, account.id);

      // Reload data
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    }
  };

  // Filter accounts by search
  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.code.toLowerCase().includes(searchText.toLowerCase()) ||
      acc.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">GL Chart of Accounts</h2>
          <p className="text-gray-600 mt-1">Manage hierarchical account structure</p>
        </div>

        <button
          onClick={() => handleCreateAccount()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <Plus size={20} />
          New Account
        </button>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-gray-600 text-sm">Total Accounts</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.totalAccounts}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-gray-600 text-sm">Active</p>
            <p className="text-2xl font-bold text-green-600">{statistics.activeAccounts}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-gray-600 text-sm">Last Modified</p>
            <p className="text-sm font-medium text-gray-900">
              {statistics.lastModified
                ? new Date(statistics.lastModified).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-gray-600 text-sm">Chart Status</p>
            <p className="text-sm font-medium text-blue-600">
              {statistics.totalAccounts > 0 ? 'Ready' : 'Empty'}
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Filters */}
      <GLAccountFilters scope={scope} onScopeChange={setScope} searchText={searchText} onSearchChange={setSearchText} />

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading GL accounts...</p>
          </div>
        </div>
      ) : tree.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed p-12 text-center">
          <p className="text-gray-600">No GL accounts found</p>
          <button
            onClick={() => handleCreateAccount()}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create the first account
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          {/* Tree view of accounts */}
          <GLAccountTree
            nodes={tree.filter(
              (node) =>
                node.code.toLowerCase().includes(searchText.toLowerCase()) ||
                node.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            onSelectAccount={handleViewDetails}
            onEditAccount={handleEditAccount}
            onDeleteAccount={handleDelete}
            onToggleLock={handleToggleLock}
            onCreateChild={handleCreateAccount}
          />

          {/* Table view (alternative to tree) */}
          <div className="border-t">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Code</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Balance</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.slice(0, 10).map((account) => (
                    <tr key={account.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-gray-900">{account.code}</td>
                      <td className="px-4 py-3">{account.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {account.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            account.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : account.status === 'locked'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {account.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">-</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditAccount(account)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleLock(account)}
                            className={`${
                              account.locked ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-600 hover:text-gray-700'
                            }`}
                            title={account.locked ? 'Unlock' : 'Lock'}
                          >
                            {account.locked ? <Unlock size={16} /> : <Lock size={16} />}
                          </button>
                          <button
                            onClick={() => handleDelete(account)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredAccounts.length > 10 && (
                <div className="px-4 py-3 text-sm text-gray-600">
                  Showing 10 of {filteredAccounts.length} accounts
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <GLAccountDialog
        open={dialogOpen}
        mode={dialogMode}
        tenantId={tenantId}
        account={selectedAccount || undefined}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      {selectedAccount && (
        <GLAccountDetailDialog
          open={detailDialogOpen}
          account={selectedAccount}
          onClose={() => setDetailDialogOpen(false)}
          onEdit={() => {
            setDetailDialogOpen(false);
            handleEditAccount(selectedAccount);
          }}
        />
      )}
    </div>
  );
}
