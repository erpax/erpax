/**
 * Tenant Table Component
 * Display tenants in a filterable, sortable table with inline actions
 */

'use client';

import React from 'react';
import { Tenant, TENANT_STATUS_LABELS, TENANT_STATUS_COLORS } from '@/types/tenant';
import { ChevronDown, Edit2, MoreVertical, Eye } from 'lucide-react';

interface HostTableProps {
  tenants: Tenant[];
  selectedHostIds: Set<string>;
  loading: boolean;
  sortBy: 'name' | 'createdAt' | 'status' | 'country';
  sortOrder: 'asc' | 'desc';
  onSelectTenant: (tenantId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onSort: (field: string) => void;
  onViewDetails: (tenant: Tenant) => void;
  onEdit: (tenant: Tenant) => void;
  onTenantAction: (tenantId: string, action: string) => Promise<void>;
}

type SortField = 'name' | 'createdAt' | 'status' | 'country';

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  field: SortField;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}) {
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 hover:text-blue-600 font-semibold text-gray-900"
    >
      {label}
      {sortBy === field && (
        <ChevronDown
          size={16}
          className={`transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
        />
      )}
    </button>
  );
}

export default function HostTable({
  tenants,
  selectedHostIds,
  loading,
  sortBy,
  sortOrder,
  onSelectTenant,
  onSelectAll,
  onSort,
  onViewDetails,
  onEdit,
  onTenantAction,
}: HostTableProps) {
  const allSelected = tenants.length > 0 && selectedHostIds.size === tenants.length;
  const someSelected = selectedHostIds.size > 0 && !allSelected;

  if (loading && tenants.length === 0) {
    return <div className="text-center py-12 text-gray-500">Loading tenants...</div>;
  }

  if (tenants.length === 0) {
    return <div className="text-center py-12 text-gray-500">No tenants found</div>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
            </th>
            <th className="px-6 py-3 text-left">
              <SortableHeader label="Name" field="name" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-6 py-3 text-left">
              <SortableHeader label="Country" field="country" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-6 py-3 text-left">Accounting Standard</th>
            <th className="px-6 py-3 text-left">Currency</th>
            <th className="px-6 py-3 text-left">
              <SortableHeader label="Status" field="status" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-6 py-3 text-left">
              <SortableHeader label="Created" field="createdAt" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant, index) => (
            <tr
              key={tenant.id}
              className={`border-b ${selectedHostIds.has(tenant.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedHostIds.has(tenant.id)}
                  onChange={(e) => onSelectTenant(tenant.id, e.target.checked)}
                  className="rounded border-gray-300"
                />
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                    {tenant.name}
                  </p>
                  <p className="text-sm text-gray-500">{tenant.slug}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{tenant.country}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{tenant.accountingStandard}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{tenant.currency}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${TENANT_STATUS_COLORS[tenant.status]}-600`}
                >
                  {TENANT_STATUS_LABELS[tenant.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(tenant.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <HostActionsMenu
                  tenant={tenant}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onAction={onTenantAction}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Tenant Actions Menu Component
 */
function HostActionsMenu({
  tenant,
  onViewDetails,
  onEdit,
  onAction,
}: {
  tenant: Tenant;
  onViewDetails: (tenant: Tenant) => void;
  onEdit: (tenant: Tenant) => void;
  onAction: (tenantId: string, action: string) => Promise<void>;
}) {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-200 rounded-lg"
      >
        <MoreVertical size={18} className="text-gray-600" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              onViewDetails(tenant);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            onClick={() => {
              onEdit(tenant);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <div className="border-t my-1" />
          {tenant.status === 'draft' && (
            <button
              onClick={() => {
                onAction(tenant.id, 'activate');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-green-50 text-green-700"
            >
              Activate
            </button>
          )}
          {tenant.status === 'active' && (
            <button
              onClick={() => {
                onAction(tenant.id, 'suspend');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-yellow-50 text-yellow-700"
            >
              Suspend
            </button>
          )}
          {tenant.status === 'suspended' && (
            <button
              onClick={() => {
                onAction(tenant.id, 'reset');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700"
            >
              Reset Status
            </button>
          )}
          <button
            onClick={() => {
              const action = tenant.sslEnabled ? 'disableSSL' : 'enableSSL';
              onAction(tenant.id, action);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
          >
            {tenant.sslEnabled ? 'Disable' : 'Enable'} SSL
          </button>
        </div>
      )}
    </div>
  );
}
