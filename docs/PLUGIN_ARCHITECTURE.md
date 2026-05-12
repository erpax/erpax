# ERPax Plugin Architecture Specification

**Date**: 2026-05-12  
**Status**: Specification for Implementation  
**Author**: Claude (Agent)  
**References**: Payload CMS Plugin Architecture, User Requirements

---

## Executive Summary

This document specifies how plugins in ERPax are organized, structured, and orchestrated. The architecture follows Payload CMS's published plugin conventions while adapting for ERPax's standards-driven domain model and React UI layer.

**Core Principle**: Everything that isn't routing or top-level layout lives in a plugin. Standards types are read-only reference material. Payload implements standards (data/schema/business rules). shadcn implements UI components not built into Payload.

---

## 1. Plugin Philosophy

### 1.1 Plugin as Bounded Domain

Each plugin represents a cohesive business domain:

| Plugin | Domain | Examples |
|--------|--------|----------|
| `accounting` | General ledger, financial statements, closing | GL accounts, journals, statements, tax |
| `receivables` | Order-to-cash, AR | Invoices, customers, aging, disputes |
| `payables` | Procure-to-pay, AP | Purchase orders, vendors, payment mgmt |
| `parties` | Master data (parties, locations) | Customers, vendors, suppliers, contacts |
| `export` | SAF-T audit file export | Export services, manifest building |
| `auth` | Authentication & authorization | Roles, permissions, access control |
| `dimensions` | Cost centers, projects, dimensions | Cost centers, dimensions, hierarchies |
| `mcp` | MCP/API tools & endpoints | API clients, tool definitions, agent runtime |
| `hooks` | Shared Payload collection hooks | Global collection lifecycle hooks |

### 1.2 Plugin Autonomy

Each plugin is **self-contained** within `src/plugins/<name>/`:

- Owns its collections
- Owns its business logic (services, validators, utilities)
- Owns its Payload hooks (beforeChange, afterChange, etc.)
- Owns its React hooks (useInvoice, usePayments, etc.)
- Owns its components (shadcn-based UI)
- Owns its access control rules
- Exports a clean public API via `index.ts`

**No cross-plugin imports at the service/collection level.** Cross-plugin coordination happens only through:
- Payload's collection relationships (references)
- Shared Payload hooks (in `hooks/` plugin)
- Async agents/MCP tools
- External API services

### 1.3 Standards as Reference

`src/standards/` is **read-only reference material**, not a plugin:

- Defines the semantic shapes that collections implement
- Provides a contract that domain logic must satisfy
- Contains no business logic, no services, no hooks
- Read-only types with full `readonly` coverage
- Organized by standard (UN-EDIFACT, ISO-20022, SAF-T, EN-16931)

Example: `SafTInvoice` (in standards) → `src/plugins/receivables/types.ts` (extends with domain rules) → `Invoice` collection (implements with Payload schema)

---

## 2. Plugin Directory Structure

### 2.1 Standard Layout

Every plugin follows this structure:

```
src/plugins/<domain>/
├── collections/          # Payload collection definitions
│   ├── index.ts         # Export { Collection1, Collection2, ... }
│   ├── collection-1.ts  # Payload CollectionConfig
│   └── collection-2.ts  # Payload CollectionConfig
├── types/               # Domain entity types, extending standards
│   ├── index.ts         # Export all types
│   ├── entity.ts        # Domain entity (extends standards type)
│   ├── request.ts       # API request types
│   ├── response.ts      # API response types
│   └── errors.ts        # Domain-specific error types
├── validators/          # Validation functions (used by collections + services)
│   ├── index.ts         # Export all validators
│   ├── entity.ts        # Entity-level validation
│   └── business-rules.ts # Business rule validation
├── services/            # Business logic, pure functions
│   ├── index.ts         # Export all services
│   ├── entity.service.ts # Entity CRUD logic
│   └── domain.service.ts # Domain-specific workflows
├── fields/              # Custom Payload field implementations
│   ├── index.ts         # Export all field types
│   └── custom-field.ts  # Custom field definition
├── hooks/               # Both Payload + React hooks (co-located)
│   ├── index.ts         # Export all hooks
│   ├── use-entity.ts    # React hook: fetch/manage entity
│   ├── use-entities.ts  # React hook: list entities
│   └── payload.ts       # Payload hooks (beforeChange, afterChange, etc.)
├── components/          # shadcn-based React UI components
│   ├── index.ts         # Export all components
│   ├── entity-form.tsx  # Form component (shadcn inputs)
│   ├── entity-table.tsx # Table component (shadcn table)
│   └── entity-card.tsx  # Card component (shadcn card)
├── access/              # Access control (Payload access property)
│   ├── index.ts         # Export all access rules
│   ├── entity.ts        # Collection-level access
│   └── field-level.ts   # Field-level access
├── middleware/          # Custom Payload middleware
│   ├── index.ts         # Export all middleware
│   └── auth.ts          # Auth middleware
├── plugin.ts            # Payload plugin factory
├── index.ts             # Public API (what callers can import)
└── README.md            # Domain documentation, data model diagram
```

### 2.2 Minimal/Growing Plugins

Not every plugin needs every folder at day one. Minimal structure:

```
src/plugins/<domain>/
├── collections/
│   └── index.ts
├── types/
│   └── index.ts
├── plugin.ts
└── index.ts
```

Add folders as the plugin grows. The structure scales from MVP to full-featured.

### 2.3 Existing Plugin Adjustments

Current plugins that have partial structure will be extended:

| Plugin | Current | Target |
|--------|---------|--------|
| `accounting` | collections/, fields/, hooks/, services/, utilities/, agents/, factories/, seeds/, middleware/ | + types/, validators/, access/, components/ |
| `receivables` | Flat (root-level .ts files) | → Directory structure with collections/, types/, services/, etc. |
| `payables` | Flat (root-level .ts files) | → Directory structure |
| `parties` | Flat (root-level .ts files) | → Directory structure |
| `export` | seeds/ only | → Full structure |
| `auth` | hooks/ only | → Full structure with access/ |
| `dimensions` | Flat | → Full structure |
| `mcp` | components/, endpoints/, globals/ | + types/, services/, validators/ |
| `hooks` | Shared hooks | Keep as-is (global Payload lifecycle hooks) |

---

## 3. Plugin File Anatomy

### 3.1 Collections

**File**: `collections/invoice.ts`

```typescript
/**
 * Invoice collection — implements EN-16931 / SAF-T invoice semantics.
 * 
 * @standard EN-16931:2017 invoice
 * @standard SAF-T 2.0 invoice
 * @accounting IFRS-15 revenue-recognition
 */

import type { CollectionConfig } from 'payload';
import { validateInvoice } from '../validators';
import { InvoiceAccess } from '../access';

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  labels: { singular: 'Invoice', plural: 'Invoices' },
  
  // Data model
  fields: [
    { name: 'id', type: 'text', required: true, unique: true },
    { name: 'number', type: 'text', required: true, index: true },
    { name: 'date', type: 'date', required: true },
    { name: 'customerId', type: 'relationship', relationTo: 'customers' },
    // ... more fields matching EN-16931 + SAF-T
  ],
  
  // Access control
  access: InvoiceAccess,
  
  // Hooks
  hooks: {
    beforeChange: [validateInvoice],
  },
};

export default Invoices;
```

### 3.2 Types

**File**: `types/invoice.ts`

```typescript
/**
 * Invoice entity — extends EN-16931 with domain rules.
 * 
 * @standard EN-16931:2017 invoice
 */

import type { En16931Invoice } from '../../../standards/en-16931/types';

/**
 * Domain Invoice (what Payload stores).
 * Extends EN-16931 with internal state + audit fields.
 */
export interface Invoice extends En16931Invoice {
  // Internal ID (UUID)
  readonly id: string;
  
  // Audit trail
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  
  // Workflow state
  readonly status: 'draft' | 'sent' | 'paid' | 'cancelled';
  readonly paymentStatus: 'unpaid' | 'partial' | 'paid';
  
  // Relationships
  readonly customerId: string;
  readonly tenantId: string;
}

/**
 * Invoice creation request (API layer).
 */
export interface CreateInvoiceRequest {
  readonly customerId: string;
  readonly lines: readonly InvoiceLine[];
  readonly notes?: string;
}

/**
 * Invoice API response.
 */
export interface InvoiceResponse extends Invoice {
  readonly customer?: Customer;
}
```

### 3.3 Validators

**File**: `validators/invoice.ts`

```typescript
/**
 * Invoice validation — business rules.
 * 
 * @standard EN-16931:2017 validation
 * @compliance VAT VAT-directive-2006-112-EC
 */

import type { Invoice, CreateInvoiceRequest } from '../types';
import type { ValidatorResult } from '../../../types';

/**
 * Validate invoice state before persistence (Payload hook).
 */
export async function validateInvoice(
  invoice: Invoice
): Promise<ValidatorResult> {
  const errors: string[] = [];
  
  // Business rules
  if (invoice.total < 0) {
    errors.push('Total cannot be negative');
  }
  
  if (invoice.date > new Date()) {
    errors.push('Invoice date cannot be in the future');
  }
  
  // Standards compliance
  if (!invoice.taxId && invoice.country === 'DE') {
    errors.push('German invoices must have taxId (GST)');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Validate creation request (API layer).
 */
export async function validateCreateInvoice(
  req: CreateInvoiceRequest
): Promise<ValidatorResult> {
  // Validate request shape + business rules
}
```

### 3.4 Services

**File**: `services/invoice.service.ts`

```typescript
/**
 * Invoice service — business logic (CRUD, workflows, calculations).
 */

import type { Invoice, CreateInvoiceRequest } from '../types';
import { validateInvoice, validateCreateInvoice } from '../validators';

/**
 * Create invoice (used by API handler, React form submission).
 */
export async function createInvoice(
  req: CreateInvoiceRequest,
  context: ServiceContext
): Promise<Invoice> {
  // Validate
  const validation = await validateCreateInvoice(req);
  if (!validation.valid) {
    throw new ValidationError(validation.errors);
  }
  
  // Apply business logic (calculate totals, apply discounts, etc.)
  const invoice = applyInvoiceRules(req);
  
  // Persist (via Payload)
  // NOTE: Service doesn't call Payload directly; caller orchestrates.
  return invoice;
}

/**
 * Calculate invoice totals (net, tax, gross).
 */
export function calculateInvoiceTotals(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceTotals {
  // Pure calculation logic
}
```

### 3.5 React Hooks

**File**: `hooks/use-invoice.ts`

```typescript
/**
 * React hook — fetch & manage a single invoice.
 * 
 * Usage:
 *   const { invoice, loading, error, refetch } = useInvoice(id);
 *   if (error) return <Error message={error.message} />;
 */

import { useState, useEffect } from 'react';
import type { Invoice } from '../types';

export function useInvoice(id: string) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setInvoice(await res.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  
  return { invoice, loading, error, refetch };
}
```

### 3.6 Components

**File**: `components/invoice-form.tsx`

```typescript
/**
 * Invoice form component (shadcn inputs).
 */

'use client';

import { useInvoice } from '../hooks';
import { Form, FormField, Input, Button } from '@/components/ui';

export function InvoiceForm({ invoiceId }: { invoiceId: string }) {
  const { invoice, loading } = useInvoice(invoiceId);
  
  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Not found</div>;
  
  return (
    <Form>
      <FormField name="number" label="Invoice Number">
        <Input defaultValue={invoice.number} />
      </FormField>
      {/* More fields */}
      <Button type="submit">Save</Button>
    </Form>
  );
}
```

### 3.7 Plugin Factory

**File**: `plugin.ts`

```typescript
/**
 * Receivables plugin — registration layer.
 * 
 * @standard EN-16931:2017 invoice
 * @standard SAF-T 2.0 invoice
 */

import type { Plugin } from 'payload';
import {
  Invoices,
  Customers,
  Disputes,
  // ... more collections
} from './collections';

export const receivablesPlugin = (): Plugin => ({
  name: 'receivables',
  collections: [
    Invoices,
    Customers,
    Disputes,
    // ... more
  ],
});

export default receivablesPlugin;
```

### 3.8 Public API (index.ts)

**File**: `index.ts`

```typescript
/**
 * Receivables plugin — public API.
 * 
 * This is what external code imports. Everything else is internal.
 */

// Collections (for Payload schema inspection)
export { Invoices, Customers, Disputes } from './collections';

// Types (for app-level type safety)
export type { Invoice, Customer, Dispute } from './types';

// Services (for business logic orchestration)
export {
  createInvoice,
  calculateInvoiceTotals,
  // ... more
} from './services';

// React hooks (for component consumption)
export { useInvoice, useInvoices } from './hooks';

// Components (for UI rendering)
export { InvoiceForm, InvoiceTable } from './components';

// Plugin factory
export { receivablesPlugin } from './plugin';
```

---

## 4. Type Hierarchy & Flow

### 4.1 Type Layers

```
┌─────────────────────────────────────────────────────────────┐
│ Standards (read-only, reference)                            │
│ src/standards/en-16931/types.ts                             │
│ - En16931Invoice (all fields readonly)                      │
│ - Focus: semantic correctness per standard                  │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Domain Entity Types (extends standards)                      │
│ src/plugins/receivables/types/invoice.ts                    │
│ - Invoice extends En16931Invoice                            │
│ - Adds: internal ID, timestamps, tenant, status, etc.       │
│ - Focus: what Payload persists                              │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Validator Types (input validation)                          │
│ src/plugins/receivables/types/request.ts                    │
│ - CreateInvoiceRequest                                      │
│ - Focus: what callers can pass in                           │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Service Return Types (business logic output)                │
│ src/plugins/receivables/types/response.ts                   │
│ - InvoiceResponse                                           │
│ - Focus: what services return                               │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Hook Types (React hook shape)                               │
│ src/plugins/receivables/hooks/use-invoice.ts               │
│ - Returns { invoice, loading, error, refetch }              │
│ - Focus: what components receive                            │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Component Props (UI presentation)                           │
│ src/plugins/receivables/components/invoice-form.tsx         │
│ - { invoiceId, onSave, disabled, ... }                      │
│ - Focus: what users interact with                           │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Example: Invoice Type Flow

```typescript
// 1. Standard (read-only reference)
interface En16931Invoice {
  readonly id: string;
  readonly number: string;
  readonly date: Date;
  // ... ISO fields
}

// 2. Domain entity (extends standard)
interface Invoice extends En16931Invoice {
  readonly tenantId: string;
  readonly status: 'draft' | 'sent' | 'paid' | 'cancelled';
}

// 3. Validator input
interface CreateInvoiceRequest {
  customerId: string;
  lines: InvoiceLine[];
}

// 4. Service return
async function createInvoice(req: CreateInvoiceRequest): Promise<Invoice> {
  // Business logic
}

// 5. Hook return
function useInvoice(id: string): {
  invoice: Invoice | null;
  loading: boolean;
  error: Error | null;
} { /* ... */ }

// 6. Component props
function InvoiceForm({ invoiceId }: { invoiceId: string }) {
  const { invoice } = useInvoice(invoiceId);
  return <form>{/* render invoice */}</form>;
}
```

---

## 5. Cross-Plugin Communication

### 5.1 Allowed Patterns

**Pattern 1: Payload Collection References**

Plugins reference each other via Payload's `relationTo`:

```typescript
// In receivables plugin
export const Invoices: CollectionConfig = {
  slug: 'invoices',
  fields: [
    { name: 'customerId', type: 'relationship', relationTo: 'customers' },
    // Payload resolves 'customers' to parties plugin
  ],
};

// Payload handles the join; caller just populates customerId
```

**Pattern 2: Shared Payload Hooks**

Global lifecycle hooks live in `src/plugins/hooks/`:

```typescript
// hooks/plugin.ts — shared across all plugins
export const hooksPlugin = (): Plugin => ({
  hooks: {
    beforeChange: [globalBeforeChangeHook],
    afterChange: [globalAfterChangeHook],
  },
});
```

**Pattern 3: MCP Tools / Async Agents**

Complex workflows use MCP tools or agents that orchestrate across plugins:

```typescript
// mcp/tools/create-invoice.ts
// This tool calls receivables.createInvoice + accounting.postJournal
export async function createInvoiceWithAccounting(req) {
  const invoice = await receivablesService.createInvoice(req);
  await accountingService.postInvoice(invoice);
  return invoice;
}
```

**Pattern 4: External API Services**

Shared business logic in separate service modules (not plugins):

```typescript
// src/services/tax-calculation.service.ts
// Used by accounting, receivables, payables plugins
export async function calculateTax(amount, jurisdiction) { /* ... */ }
```

### 5.2 Forbidden Patterns

**Do NOT**:
- Import services from one plugin into another
- Import types from another plugin's types/ folder (use standards instead)
- Call another plugin's validateX function directly
- Assume internal folder structure of another plugin

**Do instead**:
- Export via public API (index.ts)
- Use standards types as the contract
- Use Payload relationships for data linking
- Use MCP tools for orchestration

---

## 6. Standards Integration

### 6.1 Using Standards Types

```typescript
// In receivables/types/invoice.ts
import type { En16931Invoice } from '../../../standards/en-16931/types';

export interface Invoice extends En16931Invoice {
  // Domain extensions only
  readonly tenantId: string;
  readonly status: 'draft' | 'sent' | 'paid';
}
```

### 6.2 Standards Citation in JSDoc

Every collection/service/validator **must cite the standards it implements**:

```typescript
/**
 * Invoice collection — implements EN-16931 invoice semantics.
 * 
 * @standard EN-16931:2017 invoice
 * @standard EN-16931:2017 invoice-lines
 * @accounting IFRS-15 revenue-recognition
 * @audit ISO-19011:2018 audit-trail
 */
export const Invoices: CollectionConfig = { /* ... */ };
```

The standards citation index (`bash scripts/standards-citation-index.sh`) validates that all code cites the standards it implements.

### 6.3 Gap Analysis

When a standard has requirements not yet implemented:

```typescript
// Mark as reserved
/**
 * RESERVED for future phase: Discount Line Items
 * 
 * @standard EN-16931:2017 discount-line-items
 * @see RFC 001: Discount phase (Q3 2026)
 */
```

Run `pnpm standards:required` to fail CI if a src/standards/ file lacks citations.

---

## 7. UUID Wiring

### 7.1 Primary Keys

Every collection uses UUIDs as primary keys:

```typescript
// All collections follow this pattern
export const Invoices: CollectionConfig = {
  slug: 'invoices',
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      // Or use a UUID field type if Payload supports it
    },
    // ...
  ],
};
```

### 7.2 Type-Safe UUIDs (Future)

For stronger type safety, consider a branded UUID type:

```typescript
/**
 * Branded UUID — stronger type safety.
 * 
 * Usage: const id: InvoiceId = uuidv4() as InvoiceId;
 */
export type InvoiceId = string & { readonly __brand: 'InvoiceId' };

export interface Invoice {
  readonly id: InvoiceId;
  readonly customerId: CustomerId;
}
```

This prevents accidentally passing a CustomerId where an InvoiceId is expected.

### 7.3 Relationships

Payload handles the joins:

```typescript
// receivables plugin
const Invoices: CollectionConfig = {
  fields: [
    { name: 'customerId', type: 'relationship', relationTo: 'customers' },
  ],
};

// parties plugin
const Customers: CollectionConfig = {
  slug: 'customers',
  // ...
};

// When querying invoices, Payload populates the customer reference
```

---

## 8. App Layer Minimalism

### 8.1 App Structure

```
src/app/
├── layout.tsx          # Root layout, import plugins
├── (routes)/
│   ├── dashboard/
│   │   ├── layout.tsx  # Thin layout
│   │   └── page.tsx    # Routes to Dashboard component (from mcp plugin)
│   ├── invoices/
│   │   ├── page.tsx    # Routes to InvoiceList component (from receivables plugin)
│   │   └── [id]/
│   │       └── page.tsx # Routes to InvoiceDetail component
│   └── ...
└── api/
    └── [...slug].ts    # API pass-through (calls plugin handlers)
```

### 8.2 Page as Router Only

**File**: `src/app/(routes)/invoices/page.tsx`

```typescript
/**
 * Invoices list route — thin wrapper.
 * 
 * All logic lives in plugins; this is just routing + layout.
 */

import { InvoiceList } from '@/plugins/receivables/components';

export default function InvoicesPage() {
  return <InvoiceList />;
}
```

**NOT**:
```typescript
// ❌ DON'T do this at app level
import { Invoice } from '@/plugins/receivables/types';
import { fetchInvoices } from '@/plugins/receivables/services';

// Services + types belong in plugins, not app
```

### 8.3 App Layout

**File**: `src/app/layout.tsx`

```typescript
/**
 * Root layout — imports plugins, sets up providers.
 */

import { receivablesPlugin } from '@/plugins/receivables';
import { accountingPlugin } from '@/plugins/accounting';
// ... import all plugins

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Plugins provide providers/context if needed */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 9. Implementation Roadmap

### Phase 1: Structure Refactor (Week 1)

- [ ] Move existing accounting/ collections/ files into subdirectories
- [ ] Create types/, validators/, services/, components/ folders in each plugin
- [ ] Organize receivables/, payables/, parties/ into directory structure

### Phase 2: Type Coverage (Week 2–3)

- [ ] Add domain entity types extending standards (types/entity.ts per plugin)
- [ ] Add request/response types (types/request.ts, types/response.ts)
- [ ] Add error types (types/errors.ts)
- [ ] Add validators (validators/entity.ts, validators/business-rules.ts)

### Phase 3: React Hooks & Components (Week 4–5)

- [ ] Add React hooks (hooks/use-entity.ts, hooks/use-entities.ts)
- [ ] Build shadcn components (components/entity-form.tsx, components/entity-table.tsx)
- [ ] Test hooks + components in dev mode

### Phase 4: Access Control & Middleware (Week 6)

- [ ] Add access/ folder with role-based rules
- [ ] Add middleware/ folder with custom logic
- [ ] Wire access control into collections

### Phase 5: Testing & Documentation (Week 7)

- [ ] Add tests for validators, services, hooks
- [ ] Update README.md in each plugin with data model diagram
- [ ] Document plugin-to-plugin communication patterns
- [ ] Run `pnpm standards:verify-index` to ensure all standards are cited

---

## 10. Checklists

### Plugin Creation Checklist

When creating a new plugin:

- [ ] Create `src/plugins/<name>/` directory
- [ ] Add `collections/` folder with `index.ts`
- [ ] Add `types/` folder with `index.ts`, `entity.ts`
- [ ] Add `plugin.ts` (Payload factory)
- [ ] Add `index.ts` (public API)
- [ ] Add JSDoc citations (`@standard`, `@accounting`, `@audit`, etc.)
- [ ] Test collection registration in `src/payload.config.ts`
- [ ] Run `pnpm standards:check` to verify citations

### Collection Implementation Checklist

For each collection:

- [ ] Define CollectionConfig (slug, fields, access, hooks)
- [ ] Create corresponding type in `types/entity.ts`
- [ ] Create validator in `validators/entity.ts`
- [ ] Create service function in `services/entity.service.ts`
- [ ] Add JSDoc with `@standard` citations
- [ ] Test with `pnpm dev` and Payload admin UI
- [ ] Add test file (`.test.ts`) with 80%+ coverage

### React Hook Checklist

For each hook:

- [ ] Named `use<Entity>` (useInvoice, useInvoices)
- [ ] Returns object with `data`, `loading`, `error`, `refetch`
- [ ] Uses standard fetch / SWR / React Query pattern
- [ ] Handles loading + error states
- [ ] Has TypeScript types for return value
- [ ] Tested with React Testing Library

### Component Checklist

For each shadcn component:

- [ ] Uses shadcn/ui primitives (Input, Button, Form, etc.)
- [ ] Accepts data via hook or prop
- [ ] Manages form state (react-hook-form + shadcn Form)
- [ ] Has clear error + loading states
- [ ] Styled consistently (Tailwind CVA)
- [ ] Accessible (ARIA labels, semantic HTML)

---

## 11. Standards Mapping

### Existing Standards

| Standard | File | Plugin | Collections |
|----------|------|--------|-------------|
| EN-16931 | `src/standards/en-16931/` | receivables | Invoices, CreditMemos |
| SAF-T 2.0 | `src/standards/saf-t/` | export, accounting | Export, GLAccounts, ... |
| ISO-20022 | `src/standards/iso-20022/` | accounting, export | CreditTransfers, Statements, ... |
| UN-EDIFACT | `src/standards/un-edifact/` | export | Interchange, InvoicMessage, ... |
| ISO-4217 | referenced | all | Currency fields |
| ISO-8601 | referenced | all | Date/time fields |
| IFRS | referenced | accounting | Financial statements, ledgers |
| SOX §404 | referenced | accounting | Audit events, control tests |

### Gap Coverage

Ensure every collection cites at least one standard:

```bash
# Check for citations
pnpm standards:required

# Get citation counts
pnpm standards:counts

# Verify index is fresh
pnpm standards:verify-index
```

---

## 12. References

- **Payload CMS Plugin Docs**: https://payloadcms.com/docs/plugins
- **Project Standards Guide**: `docs/STANDARDS.md`
- **ERPax Architectural Decisions**: `docs/architecture/`
- **UUID Strategy**: `docs/uuid-strategy.md` (future)
- **Type Safety**: `docs/type-safety.md` (future)

---

## Approval & Status

**Status**: Ready for implementation  
**Last Updated**: 2026-05-12  
**Approved By**: (Pending user review)  
**Implementation Owner**: (TBD)

---
