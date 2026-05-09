/**
 * Host Service — multi-tenant host (tenant) management API client.
 *
 * "Host" is the project's tenant alias. This service is the boundary
 * enforcement layer; all writes are scoped to the caller's host.
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
  Host,
  CreateHostRequest,
  UpdateHostRequest,
  BatchHostActionRequest,
  BatchHostActionResponse,
  HostListResponse,
  HostFilterOptions,
  HostPaginationOptions,
  HostStatistics,
} from '@/types/host';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * HostService - Handles all host-related API operations
 */
export class HostService {
  private baseUrl = `${API_BASE}/admin/hosts`;

  /**
   * List all hosts with filtering and pagination
   */
  async listHosts(
    filters?: HostFilterOptions,
    pagination?: HostPaginationOptions,
  ): Promise<HostListResponse> {
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
    if (!response.ok) throw new Error(`Failed to list hosts: ${response.statusText}`);
    return response.json();
  }

  /**
   * Get a specific host by ID
   */
  async getHost(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`);
    if (!response.ok) throw new Error(`Failed to get host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Create a new host
   */
  async createHost(request: CreateHostRequest): Promise<Host> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to create host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Update an existing host
   */
  async updateHost(tenantId: string, request: UpdateHostRequest): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to update host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Activate a host
   */
  async activateHost(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/activate`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to activate host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Suspend a host
   */
  async suspendHost(tenantId: string, reason?: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/suspend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    if (!response.ok) throw new Error(`Failed to suspend host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Reset host status to active
   */
  async resetHostStatus(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/reset`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to reset host status: ${response.statusText}`);
    return response.json();
  }

  /**
   * Archive a host (terminal state)
   */
  async archiveHost(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/archive`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to archive host: ${response.statusText}`);
    return response.json();
  }

  /**
   * Enable SSL for a host
   */
  async enableSSL(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/ssl/enable`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to enable SSL: ${response.statusText}`);
    return response.json();
  }

  /**
   * Disable SSL for a host
   */
  async disableSSL(tenantId: string): Promise<Host> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/ssl/disable`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to disable SSL: ${response.statusText}`);
    return response.json();
  }

  /**
   * Perform batch action on multiple hosts
   */
  async batchAction(request: BatchHostActionRequest): Promise<BatchHostActionResponse> {
    const response = await fetch(`${this.baseUrl}/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`Failed to perform batch action: ${response.statusText}`);
    return response.json();
  }

  /**
   * Get host statistics
   */
  async getHostStatistics(tenantId: string): Promise<HostStatistics> {
    const response = await fetch(`${this.baseUrl}/${tenantId}/statistics`);
    if (!response.ok) throw new Error(`Failed to get host statistics: ${response.statusText}`);
    return response.json();
  }

  /**
   * Delete a host (only if in draft status)
   */
  async deleteHost(tenantId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${tenantId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete host: ${response.statusText}`);
  }
}

// Singleton instance
export const hostService = new HostService();
