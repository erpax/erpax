# Type Hierarchy Examples

**Date**: 2026-05-12  
**Purpose**: Concrete examples of the standards → domain → validator → service → hook → component type flow

---

## Overview

This document shows how types flow from standards through to React components using real ERPax entities.

**Flow**:
```
Standards (read-only)
    ↓
Domain Entity (extends standard)
    ↓
Request/Response Types (API layer)
    ↓
Validators (input validation)
    ↓
Services (business logic)
    ↓
React Hooks (data fetching)
    ↓
Components (UI rendering)
```

---

## Example 1: Invoice (EN-16931 → Receivables)

### 1.1 Standard Type (Read-Only Reference)

**File**: `src/standards/en-16931/types.ts`

```typescript
/**
 * EN-16931:2017 invoice — semantic standard.
 * 
 * All fields are readonly; this is a reference contract.
 * 
 * @standard EN-16931:2017 invoice
 */

export interface En16931Invoice {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly invoiceDate: Date;
  readonly dueDate: Date;
  
  readonly supplierName: string;
  readonly supplierTaxId: string;
  readonly supplierAddress: En16931Address;
  
  readonly buyerName: string;
  readonly buyerTaxId: string;
  readonly buyerAddress: En16931Address;
  
  readonly invoiceLines: readonly En16931InvoiceLine[];
  readonly documentTotal: {
    readonly sumOfInvoiceLineNetAmount: number;
    readonly sumOfAllowancesOnDocumentLevel: number;
    readonly invoiceTotalAmountWithoutVAT: number;
    readonly invoiceTotalVATAmount: number;
    readonly invoiceTotalAmountIncludingVAT: number;
  };
  
  readonly paymentTerms?: string;
  readonly notes?: string;
}

export interface En16931InvoiceLine {
  readonly lineNumber: number;
  readonly itemName: string;
  readonly itemQuantity: number;
  readonly itemUnitOfMeasure: string;
  readonly unitNetAmount: number;
  readonly lineNetAmount: number;
  readonly lineVATAmount: number;
  readonly lineAmountIncludingVAT: number;
  readonly vatRate?: number;
}

export interface En16931Address {
  readonly streetName: string;
  readonly buildingNumber?: string;
  readonly postalZone: string;
  readonly cityName: string;
  readonly countryCode: string;
}
```

### 1.2 Domain Entity Type (Extends Standard)

**File**: `src/plugins/receivables/types/invoice.ts`

```typescript
/**
 * Invoice entity — domain extension of EN-16931.
 * 
 * Adds internal state, audit trail, tenant isolation, workflow.
 * 
 * @standard EN-16931:2017 invoice
 * @accounting IFRS-15 revenue-recognition
 */

import type { En16931Invoice, En16931InvoiceLine } from '../../../standards/en-16931/types';

/**
 * Domain Invoice — what Payload persists.
 */
export interface Invoice extends En16931Invoice {
  // UUID primary key
  readonly id: string;
  
  // Tenant isolation
  readonly tenantId: string;
  
  // Audit trail
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;
  
  // Workflow state
  readonly status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'cancelled';
  readonly paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overpaid';
  readonly paymentDueStatus: 'on-time' | 'overdue';
  
  // Relationship IDs (reference to other collections)
  readonly customerId: string;
  readonly salesOrderId?: string;
  
  // Computed fields
  readonly daysOverdue?: number;
  readonly amountDue?: number;
  
  // Soft references (denormalized for display)
  readonly customerName: string;
  readonly customerEmail: string;
}

/**
 * Invoice line item — domain extension.
 */
export interface InvoiceLine extends En16931InvoiceLine {
  readonly id: string;
  readonly invoiceId: string;
  readonly accountCode?: string; // GL account for revenue recognition
  readonly dimensionCode?: string; // Cost center / project
}
```

### 1.3 Request/Response Types (API Layer)

**File**: `src/plugins/receivables/types/request.ts`

```typescript
/**
 * Invoice request/response types — API layer.
 */

/**
 * Create invoice request (from form submission).
 */
export interface CreateInvoiceRequest {
  readonly customerId: string;
  readonly invoiceDate: Date;
  readonly dueDate: Date;
  readonly lines: readonly CreateInvoiceLineRequest[];
  readonly notes?: string;
}

export interface CreateInvoiceLineRequest {
  readonly itemName: string;
  readonly itemQuantity: number;
  readonly unitNetAmount: number;
  readonly vatRate: number;
  readonly accountCode?: string;
}

/**
 * Update invoice request.
 */
export interface UpdateInvoiceRequest {
  readonly dueDate?: Date;
  readonly notes?: string;
  readonly status?: Invoice['status'];
}

/**
 * Invoice API response.
 */
export interface InvoiceResponse extends Invoice {
  readonly customer?: {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly taxId: string;
  };
  readonly salesOrder?: {
    readonly id: string;
    readonly orderNumber: string;
  };
}

/**
 * List invoices response.
 */
export interface ListInvoicesResponse {
  readonly items: readonly InvoiceResponse[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
```

### 1.4 Validators

**File**: `src/plugins/receivables/validators/invoice.ts`

```typescript
/**
 * Invoice validation — business rules.
 * 
 * @standard EN-16931:2017 validation
 * @compliance VAT Directive 2006/112/EC
 */

import type {
  Invoice,
  InvoiceLine,
  CreateInvoiceRequest,
} from '../types';

export interface ValidationError {
  readonly field: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly ValidationError[];
}

/**
 * Validate invoice before persistence.
 * 
 * Used by Payload beforeChange hook.
 */
export async function validateInvoice(
  invoice: Invoice
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  
  // EN-16931 compliance
  if (!invoice.invoiceNumber || invoice.invoiceNumber.trim() === '') {
    errors.push({
      field: 'invoiceNumber',
      message: 'Invoice number is required',
    });
  }
  
  if (invoice.invoiceDate > new Date()) {
    errors.push({
      field: 'invoiceDate',
      message: 'Invoice date cannot be in the future',
    });
  }
  
  if (invoice.dueDate < invoice.invoiceDate) {
    errors.push({
      field: 'dueDate',
      message: 'Due date must be after invoice date',
    });
  }
  
  // VAT compliance (varies by country)
  const totalVat = invoice.invoiceLines.reduce(
    (sum, line) => sum + (line.lineVATAmount || 0),
    0
  );
  
  const expectedVat = invoice.documentTotal.invoiceTotalVATAmount;
  
  if (Math.abs(totalVat - expectedVat) > 0.01) {
    errors.push({
      field: 'documentTotal',
      message: `VAT mismatch: calculated ${totalVat}, expected ${expectedVat}`,
    });
  }
  
  // Business rules
  if (invoice.status === 'sent' && !invoice.customerEmail) {
    errors.push({
      field: 'customerEmail',
      message: 'Cannot send invoice without customer email',
    });
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate invoice creation request (API input).
 */
export async function validateCreateInvoiceRequest(
  req: CreateInvoiceRequest
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  
  if (!req.customerId) {
    errors.push({
      field: 'customerId',
      message: 'Customer is required',
    });
  }
  
  if (!req.lines || req.lines.length === 0) {
    errors.push({
      field: 'lines',
      message: 'Invoice must have at least one line',
    });
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
```

### 1.5 Services

**File**: `src/plugins/receivables/services/invoice.service.ts`

```typescript
/**
 * Invoice service — business logic.
 * 
 * CRUD operations, calculations, workflows.
 * 
 * @standard EN-16931:2017 invoice
 * @accounting IFRS-15 revenue-recognition
 */

import type {
  Invoice,
  InvoiceLine,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceResponse,
} from '../types';
import { validateCreateInvoiceRequest, validateInvoice } from '../validators';

export interface ServiceContext {
  readonly userId: string;
  readonly tenantId: string;
  readonly now: Date;
}

/**
 * Create invoice (orchestrated by API handler, form submission).
 */
export async function createInvoice(
  req: CreateInvoiceRequest,
  context: ServiceContext
): Promise<Invoice> {
  // Validate input
  const validation = await validateCreateInvoiceRequest(req);
  if (!validation.valid) {
    throw new ValidationError('Invalid invoice request', validation.errors);
  }
  
  // Calculate totals (EN-16931 format)
  const lines = req.lines.map((line) => ({
    ...line,
    lineVATAmount: line.itemQuantity * line.unitNetAmount * (line.vatRate / 100),
    lineAmountIncludingVAT:
      line.itemQuantity * line.unitNetAmount * (1 + line.vatRate / 100),
  }));
  
  const sumOfLineNetAmount = lines.reduce(
    (sum, line) => sum + line.itemQuantity * line.unitNetAmount,
    0
  );
  
  const sumOfVAT = lines.reduce((sum, line) => sum + line.lineVATAmount, 0);
  
  // Build invoice object
  const invoice: Invoice = {
    id: generateUuid(),
    tenantId: context.tenantId,
    
    invoiceNumber: generateInvoiceNumber(context.tenantId),
    invoiceDate: req.invoiceDate,
    dueDate: req.dueDate,
    
    // Customer data (would be fetched from customers collection)
    supplierName: 'Acme Corp',
    supplierTaxId: 'DE123456789',
    supplierAddress: { /* ... */ },
    
    buyerName: '', // Fetch from customer
    buyerTaxId: '', // Fetch from customer
    buyerAddress: { /* ... */ },
    
    invoiceLines: lines,
    documentTotal: {
      sumOfInvoiceLineNetAmount: sumOfLineNetAmount,
      sumOfAllowancesOnDocumentLevel: 0,
      invoiceTotalAmountWithoutVAT: sumOfLineNetAmount,
      invoiceTotalVATAmount: sumOfVAT,
      invoiceTotalAmountIncludingVAT: sumOfLineNetAmount + sumOfVAT,
    },
    
    customerId: req.customerId,
    status: 'draft',
    paymentStatus: 'unpaid',
    
    createdAt: context.now,
    updatedAt: context.now,
    createdBy: context.userId,
    updatedBy: context.userId,
  };
  
  // Validate computed object
  const invoiceValidation = await validateInvoice(invoice);
  if (!invoiceValidation.valid) {
    throw new ValidationError('Invalid invoice', invoiceValidation.errors);
  }
  
  // Return (caller persists via Payload)
  return invoice;
}

/**
 * Calculate payment due.
 */
export function calculateAmountDue(invoice: Invoice): number {
  const totalAmount = invoice.documentTotal.invoiceTotalAmountIncludingVAT;
  // In real system, sum paid amounts
  return totalAmount;
}

/**
 * Calculate days overdue.
 */
export function calculateDaysOverdue(invoice: Invoice, now: Date): number | undefined {
  if (invoice.paymentStatus === 'paid') return undefined;
  
  const daysOverdue = Math.floor(
    (now.getTime() - invoice.dueDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return daysOverdue > 0 ? daysOverdue : undefined;
}
```

### 1.6 React Hooks

**File**: `src/plugins/receivables/hooks/use-invoice.ts`

```typescript
/**
 * React hook — fetch & manage a single invoice.
 * 
 * Usage in component:
 *   const { invoice, loading, error, refetch } = useInvoice('invoice-id');
 */

import { useState, useEffect } from 'react';
import type { InvoiceResponse } from '../types';

export interface UseInvoiceResult {
  readonly invoice: InvoiceResponse | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<void>;
}

export function useInvoice(invoiceId: string): UseInvoiceResult {
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/invoices/${invoiceId}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch invoice: HTTP ${res.status}`);
      }
      
      const data = await res.json();
      setInvoice(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setInvoice(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);
  
  return { invoice, loading, error, refetch: fetchInvoice };
}
```

**File**: `src/plugins/receivables/hooks/use-invoices.ts`

```typescript
/**
 * React hook — list invoices with pagination & filters.
 * 
 * Usage:
 *   const { invoices, total, loading, error, setPage } = useInvoices({
 *     customerId: 'cust-123',
 *     status: 'unpaid',
 *     page: 1,
 *     limit: 20,
 *   });
 */

import { useState, useEffect } from 'react';
import type { ListInvoicesResponse, Invoice } from '../types';

export interface UseInvoicesOptions {
  readonly customerId?: string;
  readonly status?: Invoice['status'];
  readonly page?: number;
  readonly limit?: number;
}

export interface UseInvoicesResult {
  readonly invoices: readonly Invoice[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly setPage: (page: number) => Promise<void>;
}

export function useInvoices(
  options?: UseInvoicesOptions
): UseInvoicesResult {
  const [result, setResult] = useState<ListInvoicesResponse>({
    items: [],
    total: 0,
    page: options?.page ?? 1,
    limit: options?.limit ?? 20,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchInvoices = async (page: number) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(options?.limit ?? 20));
      if (options?.customerId) params.set('customerId', options.customerId);
      if (options?.status) params.set('status', options.status);
      
      const res = await fetch(`/api/invoices?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvoices(options?.page ?? 1);
  }, [options?.customerId, options?.status, options?.page, options?.limit]);
  
  return {
    invoices: result.items,
    total: result.total,
    page: result.page,
    limit: result.limit,
    loading,
    error,
    setPage: (page: number) => fetchInvoices(page),
  };
}
```

### 1.7 shadcn Component

**File**: `src/plugins/receivables/components/invoice-form.tsx`

```typescript
/**
 * Invoice form component — create/edit with shadcn inputs.
 * 
 * Demonstrates:
 * - Using React hook (useInvoice)
 * - Accepting typed props
 * - Rendering shadcn form fields
 * - Handling submission
 */

'use client';

import { useState } from 'react';
import { useInvoice } from '../hooks';
import type { Invoice, CreateInvoiceRequest } from '../types';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  Input,
  Select,
  Button,
  Textarea,
} from '@/components/ui';

export interface InvoiceFormProps {
  readonly invoiceId?: string; // For edit mode
  readonly customerId?: string; // For create mode
  readonly onSuccess?: (invoice: Invoice) => void;
  readonly onError?: (error: Error) => void;
}

export function InvoiceForm({
  invoiceId,
  customerId,
  onSuccess,
  onError,
}: InvoiceFormProps) {
  const { invoice, loading } = useInvoice(invoiceId ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setErrors({});
      
      const formData = new FormData(e.currentTarget);
      const req: CreateInvoiceRequest = {
        customerId: customerId || '',
        invoiceDate: new Date(formData.get('invoiceDate') as string),
        dueDate: new Date(formData.get('dueDate') as string),
        lines: [], // Parse from form
        notes: (formData.get('notes') as string) || undefined,
      };
      
      const res = await fetch(
        invoiceId ? `/api/invoices/${invoiceId}` : '/api/invoices',
        {
          method: invoiceId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req),
        }
      );
      
      if (!res.ok) {
        const data = await res.json();
        setErrors(
          data.errors?.reduce(
            (acc: Record<string, string>, err: any) => ({
              ...acc,
              [err.field]: err.message,
            }),
            {}
          ) || {}
        );
        throw new Error(data.message || 'Failed to save invoice');
      }
      
      const result = await res.json();
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setErrors({ _form: error.message });
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (invoiceId && !invoice) return <div>Invoice not found</div>;
  
  return (
    <Form onSubmit={handleSubmit}>
      {errors._form && <FormError message={errors._form} />}
      
      <FormField label="Invoice Date">
        <FormControl>
          <Input
            type="date"
            name="invoiceDate"
            defaultValue={
              invoice
                ? new Date(invoice.invoiceDate).toISOString().split('T')[0]
                : ''
            }
            required
          />
        </FormControl>
        {errors.invoiceDate && <FormError message={errors.invoiceDate} />}
      </FormField>
      
      <FormField label="Due Date">
        <FormControl>
          <Input
            type="date"
            name="dueDate"
            defaultValue={
              invoice
                ? new Date(invoice.dueDate).toISOString().split('T')[0]
                : ''
            }
            required
          />
        </FormControl>
        {errors.dueDate && <FormError message={errors.dueDate} />}
      </FormField>
      
      <FormField label="Notes">
        <FormControl>
          <Textarea
            name="notes"
            defaultValue={invoice?.notes ?? ''}
            placeholder="Invoice notes..."
          />
        </FormControl>
      </FormField>
      
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Invoice'}
      </Button>
    </Form>
  );
}
```

---

## Example 2: GL Account (IFRS → Accounting)

### 2.1 Standard Type

**File**: `src/standards/accounting/types.ts`

```typescript
/**
 * Accounting standards — chart of accounts semantics.
 * 
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 */

export interface IFRSChartOfAccounts {
  readonly accounts: readonly IFRSAccount[];
}

export interface IFRSAccount {
  readonly number: string; // e.g., '1010'
  readonly description: string;
  readonly classification: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  readonly category?: string; // Detailed classification
}
```

### 2.2 Domain Entity

**File**: `src/plugins/accounting/types/gl-account.ts`

```typescript
/**
 * GL Account — domain extension of IFRS.
 * 
 * @accounting IFRS IAS-1 chart-of-accounts
 */

import type { IFRSAccount } from '../../../standards/accounting/types';

export interface GlAccount extends IFRSAccount {
  readonly id: string;
  readonly tenantId: string;
  readonly currency: string; // ISO-4217
  readonly isActive: boolean;
  readonly debitBalance?: number; // Running balance
  readonly creditBalance?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### 2.3 Validator

```typescript
export function validateGlAccount(account: GlAccount): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!/^\d{4}$/.test(account.number)) {
    errors.push({
      field: 'number',
      message: 'Account number must be 4 digits per IFRS IAS-1',
    });
  }
  
  return { valid: errors.length === 0, errors };
}
```

### 2.4 React Hook

```typescript
export function useGlAccount(id: string) {
  const [account, setAccount] = useState<GlAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/gl-accounts/${id}`);
      setAccount(await res.json());
      setLoading(false);
    })();
  }, [id]);
  
  return { account, loading, error };
}
```

---

## Summary: Type Flow

For **any entity**:

1. **Standards** (read-only) — define semantic contract
2. **Domain Entity** (extends standard) — add internal state
3. **Request/Response** (API layer) — define input/output
4. **Validators** (input validation) — enforce rules
5. **Services** (business logic) — compute + orchestrate
6. **Hooks** (React) — fetch + manage state
7. **Components** (UI) — render with types

**Key principles**:

- Standards are immutable reference material
- Domain entities extend (not replace) standards
- Type safety flows all the way to components
- Validators enforce business rules before persistence
- Services calculate derived fields
- Hooks bridge Payload data to React
- Components receive fully-typed props

---
