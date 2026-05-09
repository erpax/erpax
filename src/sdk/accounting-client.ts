/**
 * ERPAX Accounting REST API Client (TypeScript SDK)
 * Provides strongly-typed access to all accounting endpoints
 */

interface RequestOptions {
  tenantId: string;
  token: string;
  baseUrl?: string;
}

interface JournalEntryLine {
  accountCode: string;
  debit?: number;
  credit?: number;
  description: string;
}

interface JournalEntryRequest {
  transactionDate: string;
  description: string;
  lines: JournalEntryLine[];
  approvalRequired?: boolean;
}

interface SalesInvoiceRequest {
  invoiceNumber: string;
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  amount: number; // in cents
  taxableAmount?: number;
  items?: Array<{ description: string; quantity: number; unitPrice: number }>;
}

interface VendorBillRequest {
  billNumber: string;
  vendorName: string;
  billDate: string;
  dueDate: string;
  amount: number; // in cents
  items?: Array<{ description: string; quantity: number; unitPrice: number }>;
}

interface PaymentRequest {
  paymentDate: string;
  amount: number; // in cents
  paymentMethod: 'cash' | 'check' | 'ach' | 'credit_card';
  referenceNumber?: string;
}

interface VendorPaymentRequest extends PaymentRequest {
  discountTaken?: number; // in cents
  discountDate?: string;
}

interface BankReconciliationRequest {
  bankStatementDate: string;
  bankStatementBalance: number; // in cents
  bankAccountCode: string;
}

interface ClosingRequest {
  periodStart: string;
  periodEnd: string;
  periodType: 'monthly' | 'quarterly' | 'annual';
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class AccountingClient {
  private baseUrl: string;
  private tenantId: string;
  private token: string;

  constructor(options: RequestOptions) {
    this.baseUrl = options.baseUrl || 'http://localhost:3000';
    this.tenantId = options.tenantId;
    this.token = options.token;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-tenant-id': this.tenantId,
      Authorization: `Bearer ${this.token}`,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${path}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${response.status}: ${error.message || error.error}`);
    }

    return response.json();
  }

  // Journal Entries
  async createJournalEntry(
    entry: JournalEntryRequest
  ): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/journal-entries', entry);
  }

  async getJournalEntry(id: string): Promise<ApiResponse<any>> {
    return this.request('GET', `/api/accounting/journal-entries/${id}`);
  }

  async reverseJournalEntry(id: string): Promise<ApiResponse<any>> {
    return this.request('POST', `/api/accounting/journal-entries/${id}/reverse`);
  }

  // Sales Invoices
  async createSalesInvoice(invoice: SalesInvoiceRequest): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/sales-invoices', invoice);
  }

  async recordInvoicePayment(
    invoiceId: string,
    payment: PaymentRequest
  ): Promise<ApiResponse<any>> {
    return this.request(
      'POST',
      `/api/accounting/sales-invoices/${invoiceId}/payment`,
      payment
    );
  }

  async writeOffInvoice(invoiceId: string): Promise<ApiResponse<any>> {
    return this.request(
      'POST',
      `/api/accounting/sales-invoices/${invoiceId}/write-off`
    );
  }

  // Vendor Bills
  async createVendorBill(bill: VendorBillRequest): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/vendor-bills', bill);
  }

  async recordVendorPayment(
    billId: string,
    payment: VendorPaymentRequest
  ): Promise<ApiResponse<any>> {
    return this.request(
      'POST',
      `/api/accounting/vendor-bills/${billId}/payment`,
      payment
    );
  }

  // Reports
  async getTrialBalance(asOfDate: string): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/reports/trial-balance?asOfDate=${asOfDate}`
    );
  }

  async getBalanceSheet(asOfDate: string): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/reports/balance-sheet?asOfDate=${asOfDate}`
    );
  }

  async getIncomeStatement(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/reports/income-statement?startDate=${startDate}&endDate=${endDate}`
    );
  }

  async getCashFlowStatement(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/reports/cash-flow?startDate=${startDate}&endDate=${endDate}`
    );
  }

  async getAccountBalance(
    accountCode: string,
    asOfDate: string
  ): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/accounts/${accountCode}/balance?asOfDate=${asOfDate}`
    );
  }

  // Bank Reconciliation
  async performBankReconciliation(
    request: BankReconciliationRequest
  ): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/reconciliation/bank', request);
  }

  // Period Closing
  async getClosingChecklist(
    periodStart: string,
    periodEnd: string,
    periodType: string
  ): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/closing/checklist?periodStart=${periodStart}&periodEnd=${periodEnd}&periodType=${periodType}`
    );
  }

  async generateClosingEntries(
    request: ClosingRequest
  ): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/closing/entries', request);
  }

  // Audit Trail
  async getAuditTrail(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<any>> {
    return this.request(
      'GET',
      `/api/accounting/audit-trail?startDate=${startDate}&endDate=${endDate}`
    );
  }

  async exportAuditTrail(
    startDate: string,
    endDate: string,
    format: 'json' | 'csv' = 'json'
  ): Promise<ApiResponse<any>> {
    return this.request('POST', '/api/accounting/audit-trail/export', {
      startDate,
      endDate,
      format,
    });
  }
}
