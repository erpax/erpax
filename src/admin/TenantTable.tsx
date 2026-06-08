/**
 * Tenant Table Component
 * Display tenants in a filterable, sortable table with inline actions
 */

'use client';

import React from 'react';
import { Tenant, TENANT_STATUS_LABELS } from '@/types/tenant';
import {
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui';
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

const STATUS_BADGE_CLASS: Record<Tenant['status'], string> = {
  draft: 'bg-muted text-muted-foreground',
  active: 'bg-green-600 text-white border-transparent',
  suspended: 'bg-yellow-500 text-white border-transparent',
  archived: 'bg-destructive text-white border-transparent',
};

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
      type="button"
      onClick={() => onSort(field)}
      className="flex items-center gap-1 font-semibold hover:text-primary"
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
    return <div className="py-12 text-center text-muted-foreground">Loading tenants...</div>;
  }

  if (tenants.length === 0) {
    return <div className="py-12 text-center text-muted-foreground">No tenants found</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 px-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                onCheckedChange={(checked) => onSelectAll(checked === true)}
                aria-label="Select all tenants"
              />
            </TableHead>
            <TableHead className="px-4">
              <SortableHeader label="Name" field="name" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </TableHead>
            <TableHead className="px-4">
              <SortableHeader label="Country" field="country" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </TableHead>
            <TableHead className="px-4">Accounting Standard</TableHead>
            <TableHead className="px-4">Currency</TableHead>
            <TableHead className="px-4">
              <SortableHeader label="Status" field="status" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </TableHead>
            <TableHead className="px-4">
              <SortableHeader label="Created" field="createdAt" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </TableHead>
            <TableHead className="px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow
              key={tenant.id}
              data-state={selectedHostIds.has(tenant.id) ? 'selected' : undefined}
            >
              <TableCell className="px-4">
                <Checkbox
                  checked={selectedHostIds.has(tenant.id)}
                  onCheckedChange={(checked) => onSelectTenant(tenant.id, checked === true)}
                  aria-label={`Select ${tenant.name}`}
                />
              </TableCell>
              <TableCell className="px-4">
                <div>
                  <p className="cursor-pointer font-medium hover:text-primary">{tenant.name}</p>
                  <p className="text-sm text-muted-foreground">{tenant.slug}</p>
                </div>
              </TableCell>
              <TableCell className="px-4 text-sm">{tenant.country}</TableCell>
              <TableCell className="px-4 text-sm">{tenant.accountingStandard}</TableCell>
              <TableCell className="px-4 text-sm">{tenant.currency}</TableCell>
              <TableCell className="px-4">
                <Badge className={STATUS_BADGE_CLASS[tenant.status]}>
                  {TENANT_STATUS_LABELS[tenant.status]}
                </Badge>
              </TableCell>
              <TableCell className="px-4 text-sm">
                {new Date(tenant.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-4 text-right">
                <HostActionsMenu
                  tenant={tenant}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onAction={onTenantAction}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="rounded-lg p-2 hover:bg-muted"
      >
        <MoreVertical size={18} className="text-muted-foreground" />
      </button>

      {showMenu && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border bg-background shadow-lg">
          <button
            type="button"
            onClick={() => {
              onViewDetails(tenant);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-muted"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            type="button"
            onClick={() => {
              onEdit(tenant);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-muted"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <div className="my-1 border-t" />
          {tenant.status === 'draft' && (
            <button
              type="button"
              onClick={() => {
                onAction(tenant.id, 'activate');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-green-700 hover:bg-green-50"
            >
              Activate
            </button>
          )}
          {tenant.status === 'active' && (
            <button
              type="button"
              onClick={() => {
                onAction(tenant.id, 'suspend');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-yellow-700 hover:bg-yellow-50"
            >
              Suspend
            </button>
          )}
          {tenant.status === 'suspended' && (
            <button
              type="button"
              onClick={() => {
                onAction(tenant.id, 'reset');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-blue-700 hover:bg-blue-50"
            >
              Reset Status
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              const action = tenant.sslEnabled ? 'disableSSL' : 'enableSSL';
              onAction(tenant.id, action);
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-muted"
          >
            {tenant.sslEnabled ? 'Disable' : 'Enable'} SSL
          </button>
        </div>
      )}
    </div>
  );
}
