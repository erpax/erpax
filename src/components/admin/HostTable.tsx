/**
 * Host Table Component
 * Display hosts in a filterable, sortable table with inline actions
 */

'use client';

import React from 'react';
import { Host, HostStatusLabel, HostStatusColors } from '@/types/host';
import { ChevronDown, Edit2, MoreVertical, Eye } from 'lucide-react';

interface HostTableProps {
  hosts: Host[];
  selectedHostIds: Set<string>;
  loading: boolean;
  sortBy: 'name' | 'createdAt' | 'status' | 'country';
  sortOrder: 'asc' | 'desc';
  onSelectHost: (hostId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onSort: (field: string) => void;
  onViewDetails: (host: Host) => void;
  onEdit: (host: Host) => void;
  onHostAction: (hostId: string, action: string) => Promise<void>;
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
  hosts,
  selectedHostIds,
  loading,
  sortBy,
  sortOrder,
  onSelectHost,
  onSelectAll,
  onSort,
  onViewDetails,
  onEdit,
  onHostAction,
}: HostTableProps) {
  const allSelected = hosts.length > 0 && selectedHostIds.size === hosts.length;
  const someSelected = selectedHostIds.size > 0 && !allSelected;

  if (loading && hosts.length === 0) {
    return <div className="text-center py-12 text-gray-500">Loading hosts...</div>;
  }

  if (hosts.length === 0) {
    return <div className="text-center py-12 text-gray-500">No hosts found</div>;
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
          {hosts.map((host, index) => (
            <tr
              key={host.id}
              className={`border-b ${selectedHostIds.has(host.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedHostIds.has(host.id)}
                  onChange={(e) => onSelectHost(host.id, e.target.checked)}
                  className="rounded border-gray-300"
                />
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                    {host.name}
                  </p>
                  <p className="text-sm text-gray-500">{host.slug}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{host.country}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{host.accountingStandard}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{host.currency}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${HostStatusColors[host.status]}-600`}
                >
                  {HostStatusLabel[host.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(host.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <HostActionsMenu
                  host={host}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onAction={onHostAction}
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
 * Host Actions Menu Component
 */
function HostActionsMenu({
  host,
  onViewDetails,
  onEdit,
  onAction,
}: {
  host: Host;
  onViewDetails: (host: Host) => void;
  onEdit: (host: Host) => void;
  onAction: (hostId: string, action: string) => Promise<void>;
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
              onViewDetails(host);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            onClick={() => {
              onEdit(host);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <div className="border-t my-1" />
          {host.status === 'draft' && (
            <button
              onClick={() => {
                onAction(host.id, 'activate');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-green-50 text-green-700"
            >
              Activate
            </button>
          )}
          {host.status === 'active' && (
            <button
              onClick={() => {
                onAction(host.id, 'suspend');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-yellow-50 text-yellow-700"
            >
              Suspend
            </button>
          )}
          {host.status === 'suspended' && (
            <button
              onClick={() => {
                onAction(host.id, 'reset');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700"
            >
              Reset Status
            </button>
          )}
          <button
            onClick={() => {
              const action = host.sslEnabled ? 'disableSSL' : 'enableSSL';
              onAction(host.id, action);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
          >
            {host.sslEnabled ? 'Disable' : 'Enable'} SSL
          </button>
        </div>
      )}
    </div>
  );
}
