/**
 * Tenant Service — multi-tenant management API client.
 *
 * Slice HHH (2026-05-10): renamed from `HostService` → `TenantService`,
 * URL prefix flipped from `/api/admin/hosts` → `/api/admin/tenants`,
 * methods renamed `*Host` → `*Tenant`. No backward compat — the legacy
 * `host` alias coined in the Ruby ERPAX port is fully retired in favour
 * of the canonical "tenant" term.
 *
 * @security ISO-27001 A.5.23 information-security-for-cloud-services
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.30 outsourced-development
 * @compliance GDPR Art.28 processor
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @rfc 9110 http-semantics
 * @see docs/STANDARDS.md §4.4
 */

import {
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
  BatchTenantActionRequest,
  BatchTenantActionResponse,
  TenantListResponse,
  TenantFilterOptions,
  TenantPaginationOptions,
  TenantStatistics,
} from '@/types/tenant';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * TenantService — handles all tenant-related API operations.
 */
export class TenantService {
  private baseUrl = `${API_BASE}/admin/tenants`;

  /** List all tenants with filtering and pagination. */
  async listTenants(
    filters?: TenantFilterOptions,
    pagination?: TenantPaginationOptions,
  ): Promise<TenantListResponse> {
    const params = new URLSearchParams();

    if (filters?.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      params.append('status', statuses.join(','));
    }

    if (filters?.country) {
      const countries = Array.isArray(filters.country) ? filters.country : [filters.country];
      params.append('country', countries.join(','));
    }

    if (filters?.accountingStandard) {
      const standards = Array.isArray(filters.accountingStandard)
        ? filters.accountingStandard
        : [filters.accountingStandard];
      params.append('standard', standards.join(','));
    }

    if (filters?.searchTerm) {
      params.append('search', filters.searchTerm);
    }

    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());
    if (pagination?.sortBy) params.append('sortBy', pagination.sortBy);
    if (pagination?.sortOrder) params.append('sortOrder', pagination.sortOrder);

    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    if (!response.ok) throw new Error(`Failed to list tenants: ${response.statusText}`);
    return response.json();
  }

  /** Get a specific tenant by ID. */
  async getTenant(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`);
    if (!response.ok) throw new Error(`Failed to get tenant: ${response.statusText}`);
    return response.json();
  }

  /** Create a new tenant. */
  async createTenant(request: CreateTenantRequest): Promise<Tenant> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to create tenant: ${response.statusText}`);
    return response.json();
  }

  /** Update an existing tenant. */
  async updateTenant(tenantId: string, request: UpdateTenantRequest): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to update tenant: ${response.statusText}`);
    return response.json();
  }

  /** Activate a tenant. */
  async activateTenant(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/activate`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to activate tenant: ${response.statusText}`);
    return response.json();
  }

  /** Suspend a tenant (with optional reason captured for audit). */
  async suspendTenant(tenantId: string, reason?: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/suspend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    if (!response.ok) throw new Error(`Failed to suspend tenant: ${response.statusText}`);
    return response.json();
  }

  /** Reset a tenant's status to active. */
  async resetTenantStatus(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/reset`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to reset tenant status: ${response.statusText}`);
    return response.json();
  }

  /** Archive a tenant (terminal state). */
  async archiveTenant(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/archive`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to archive tenant: ${response.statusText}`);
    return response.json();
  }

  /** Enable SSL for a tenant. */
  async enableSSL(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/ssl/enable`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to enable SSL: ${response.statusText}`);
    return response.json();
  }

  /** Disable SSL for a tenant. */
  async disableSSL(tenantId: string): Promise<Tenant> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/ssl/disable`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to disable SSL: ${response.statusText}`);
    return response.json();
  }

  /** Perform a batch action on multiple tenants. */
  async batchAction(request: BatchTenantActionRequest): Promise<BatchTenantActionResponse> {
    const response = await fetch(`${this.baseUrl}/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to perform batch action: ${response.statusText}`);
    return response.json();
  }

  /** Get tenant-level statistics. */
  async getTenantStatistics(tenantId: string): Promise<TenantStatistics> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/statistics`);
    if (!response.ok) throw new Error(`Failed to get tenant statistics: ${response.statusText}`);
    return response.json();
  }

  /** Delete a tenant (only if in draft status). */
  async deleteTenant(tenantId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete tenant: ${response.statusText}`);
  }
}

// Singleton instance
export const tenantService = new TenantService();
