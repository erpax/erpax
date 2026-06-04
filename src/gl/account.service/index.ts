/**
 * GL Account Service — API client for managing GL accounts and hierarchy.
 *
 * @standard ISO-4217:2015 currency-codes account-currency
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @accounting OECD SAF-T §2 general-ledger-accounts
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */

import {
  GLAccount,
  GLAccountNode,
  CreateGLAccountRequest,
  UpdateGLAccountRequest,
  GLAccountStatistics,
  AccountScope,
  GLTemplate,
} from '@/types/gl-account';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class GLAccountService {
  /**
   * CRUD Operations
   */

  async listAccounts(tenantId: string, scope?: AccountScope): Promise<GLAccount[]> {
    const params = new URLSearchParams();
    if (scope) params.append('scope', scope);

    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts?${params}`,
      {
        method: 'GET',
        headers: this.getHeaders(tenantId),
      }
    );

    if (!response.ok) throw new Error(`Failed to list GL accounts: ${response.statusText}`);
    return response.json();
  }

  async getAccount(tenantId: string, accountId: string): Promise<GLAccount> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/${accountId}`, {
      method: 'GET',
      headers: this.getHeaders(tenantId),
    });

    if (!response.ok) throw new Error(`Failed to get GL account: ${response.statusText}`);
    return response.json();
  }

  async createAccount(
    tenantId: string,
    request: CreateGLAccountRequest
  ): Promise<GLAccount> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts`, {
      method: 'POST',
      headers: this.getHeaders(tenantId),
      body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error(`Failed to create GL account: ${response.statusText}`);
    return response.json();
  }

  async updateAccount(
    tenantId: string,
    accountId: string,
    request: UpdateGLAccountRequest
  ): Promise<GLAccount> {
    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/${accountId}`,
      {
        method: 'PATCH',
        headers: this.getHeaders(tenantId),
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) throw new Error(`Failed to update GL account: ${response.statusText}`);
    return response.json();
  }

  async deleteAccount(tenantId: string, accountId: string): Promise<void> {
    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/${accountId}`,
      {
        method: 'DELETE',
        headers: this.getHeaders(tenantId),
      }
    );

    if (!response.ok) throw new Error(`Failed to delete GL account: ${response.statusText}`);
  }

  /**
   * Hierarchy Operations
   */

  async getAccountTree(tenantId: string): Promise<GLAccountNode[]> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/tree`, {
      method: 'GET',
      headers: this.getHeaders(tenantId),
    });

    if (!response.ok) throw new Error(`Failed to get account tree: ${response.statusText}`);
    return response.json();
  }

  async getRootAccounts(tenantId: string): Promise<GLAccount[]> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts?level=0`, {
      method: 'GET',
      headers: this.getHeaders(tenantId),
    });

    if (!response.ok) throw new Error(`Failed to get root accounts: ${response.statusText}`);
    return response.json();
  }

  async getAccountChildren(tenantId: string, parentId: string): Promise<GLAccount[]> {
    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/${parentId}/children`,
      {
        method: 'GET',
        headers: this.getHeaders(tenantId),
      }
    );

    if (!response.ok) throw new Error(`Failed to get account children: ${response.statusText}`);
    return response.json();
  }

  /**
   * Account Actions (Domain operations, not CRUD)
   */

  async lockAccounts(
    tenantId: string,
    accountIds: string[],
    reason?: string
  ): Promise<GLAccount[]> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/lock`, {
      method: 'POST',
      headers: this.getHeaders(tenantId),
      body: JSON.stringify({ accountIds, reason }),
    });

    if (!response.ok) throw new Error(`Failed to lock accounts: ${response.statusText}`);
    return response.json();
  }

  async unlockAccounts(tenantId: string, accountIds: string[]): Promise<GLAccount[]> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/unlock`, {
      method: 'POST',
      headers: this.getHeaders(tenantId),
      body: JSON.stringify({ accountIds }),
    });

    if (!response.ok) throw new Error(`Failed to unlock accounts: ${response.statusText}`);
    return response.json();
  }

  async mergeAccounts(
    tenantId: string,
    sourceId: string,
    targetId: string,
    transferBalance: boolean = true
  ): Promise<GLAccount> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/merge`, {
      method: 'POST',
      headers: this.getHeaders(tenantId),
      body: JSON.stringify({ sourceId, targetId, transferBalance }),
    });

    if (!response.ok) throw new Error(`Failed to merge accounts: ${response.statusText}`);
    return response.json();
  }

  /**
   * GL Templates (per accounting standard)
   */

  async listTemplates(): Promise<GLTemplate[]> {
    const response = await fetch(`${API_BASE}/admin/gl-templates`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Failed to list GL templates: ${response.statusText}`);
    return response.json();
  }

  async getTemplate(templateId: string): Promise<GLTemplate> {
    const response = await fetch(`${API_BASE}/admin/gl-templates/${templateId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Failed to get GL template: ${response.statusText}`);
    return response.json();
  }

  async applyTemplate(tenantId: string, templateId: string): Promise<GLAccount[]> {
    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/apply-template`,
      {
        method: 'POST',
        headers: this.getHeaders(tenantId),
        body: JSON.stringify({ templateId }),
      }
    );

    if (!response.ok) throw new Error(`Failed to apply GL template: ${response.statusText}`);
    return response.json();
  }

  /**
   * Statistics & Analytics
   */

  async getAccountStatistics(tenantId: string): Promise<GLAccountStatistics> {
    const response = await fetch(`${API_BASE}/admin/tenants/${tenantId}/gl-accounts/statistics`, {
      method: 'GET',
      headers: this.getHeaders(tenantId),
    });

    if (!response.ok) throw new Error(`Failed to get account statistics: ${response.statusText}`);
    return response.json();
  }

  async getAccountBalances(tenantId: string, asOfDate?: Date): Promise<Map<string, number>> {
    const params = new URLSearchParams();
    if (asOfDate) params.append('asOfDate', asOfDate.toISOString());

    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/balances?${params}`,
      {
        method: 'GET',
        headers: this.getHeaders(tenantId),
      }
    );

    if (!response.ok) throw new Error(`Failed to get account balances: ${response.statusText}`);
    const data = (await response.json()) as Record<string, number>;
    return new Map(Object.entries(data));
  }

  /**
   * Validation
   */

  async validateAccountCode(tenantId: string, code: string): Promise<boolean> {
    const response = await fetch(
      `${API_BASE}/admin/tenants/${tenantId}/gl-accounts/validate-code`,
      {
        method: 'POST',
        headers: this.getHeaders(tenantId),
        body: JSON.stringify({ code }),
      }
    );

    if (!response.ok) return false;
    const data = (await response.json()) as { valid?: boolean };
    return data.valid === true;
  }

  /**
   * Helper: Get auth headers with tenant context
   */
  private getHeaders(tenantId: string): Record<string, string> {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'x-tenant-id': tenantId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private getAuthToken(): string | null {
    // In browser: retrieve from localStorage, sessionStorage, or cookie
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
    return null;
  }
}

export const glAccountService = new GLAccountService();
