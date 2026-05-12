# Coordinated Refactor Design: Accounting Gaps → Full Payload Compliance + UI

**Date:** 2026-05-12  
**Status:** APPROVED — Ready for Implementation  
**Duration:** 6 phases, 42 days  
**Scope:** All 5 gap dimensions (standards coverage, type safety, service implementation, access control, plugin architecture) + Type Layer Integration + UI Component Strategy  
**Approach:** Breadth-first coordinated movement (all dimensions simultaneously)

---

## Executive Summary

This design resolves all accounting-related gaps in the ERPax codebase through a single coordinated refactor that:

1. **Complies with Payload v3** — eliminates fictional `req.user` contracts (host/hostId/role)
2. **Extends Payload plugins** — uses @payloadcms/plugin-multi-tenant correctly
3. **Implements canonical type architecture** — wraps Payload-generated types, eliminates all casts
4. **Adds UI components** — fills Payload admin gaps with shadcn/ui
5. **Maintains DRY code** — no backward compatibility, no legacy patterns
6. **One coordinated movement** — no multi-pass thrashing

**Result:** A production-ready plugin architecture with full Payload compliance, strict typing, comprehensive standards citations, and professional UI for financial reporting.

---

## Section 1: Plugin Architecture Blueprint

### Target Folder Structure (All Plugins)

```
src/plugins/<name>/
├── types/
│   ├── index.ts              (barrel)
│   ├── payload.ts            (Payload-generated type wrappers)
│   ├── entities.ts           (domain entity types, extend @/standards)
│   ├── api.ts                (request/response shapes)
│   ├── guards.ts             (type guards, no `as unknown as` casts)
│   └── internal.ts           (service-only types)
├── validators/
│   ├── index.ts
│   ├── entities.ts           (Zod schemas for entities)
│   └── api.ts                (Zod schemas for API payloads)
├── access/
│   ├── index.ts
│   ├── predicates.ts         (collection-level access)
│   ├── field-access.ts       (field-level gating)
│   └── types.ts              (access context shapes)
├── collections/
│   ├── index.ts
│   └── <Collection>.ts       (Payload CollectionConfig)
├── services/
│   ├── index.ts
│   ├── typed-queries.ts      (safe query helpers, replace all casts)
│   └── <Service>.ts          (business logic, uses domain entities)
├── hooks/
│   ├── index.ts
│   └── <Hook>.ts             (factory pattern, collection-specific)
├── components/
│   ├── index.ts
│   └── <Component>.tsx       (React, shadcn/ui + domain logic)
├── middleware/               (sparse, only if needed)
├── plugin.ts                 (compose all layers)
├── index.ts                  (barrel export)
├── README.md                 (plugin charter, standards coverage)
└── PLUGIN_CHANGELOG.md       (per-plugin SemVer log)
```

### Type Flow (Canonical)

```
@/standards/<standard>/types.ts (read-only, immutable reference)
        ↓
src/plugins/<domain>/types/payload.ts (Payload-generated wrapper)
        ↓
src/plugins/<domain>/types/entities.ts (extend, add business state)
        ↓
src/plugins/<domain>/types/api.ts (request/response envelopes)
        ↓
src/plugins/<domain>/types/guards.ts (type guards, no casts)
        ↓
src/plugins/<domain>/validators/*.ts (Zod validation rules)
        ↓
src/plugins/<domain>/services/*.ts (business logic, uses entities)
        ↓
src/plugins/<domain>/hooks/*.ts (data mutation, collection-specific)
        ↓
src/plugins/<domain>/components/*.tsx (UI, imports from types/)
```

### Key Invariant

**No service-level imports between plugins.** Cross-plugin communication only via:
- Payload relationships (foreign keys)
- @payloadcms/plugin-multi-tenant (shared tenant isolation)
- MCP tools (agent-driven logic)
- External services (tax, banking APIs)

---

## Section 2: Access Control & Contracts (Payload-Compliant)

### Current Broken State → Target Clean State

**Broken (current):**
- `req.user.host` — doesn't exist
- `req.user.role` — singular enum, should be array
- `req.user.hostId` — doesn't exist
- `req.payload.services` — never written, referenced
- `req.payload.requestContext` — fictional

**Clean (target):**
```typescript
// src/types/payload.ts (generated, never edit)
interface PayloadUser {
  id: string
  tenants: Array<{ tenant: string }>  // array of tenant IDs
  roles: string[]  // plural: ['admin', 'accountant', 'auditor']
  email: string
  // No host, hostId, role (singular)
}

// src/plugins/auth/context/tenant-context.ts (NEW)
export type TenantContext = {
  readonly tenantId: string
  readonly userId: string
  readonly userRoles: readonly string[]
  readonly isSuperAdmin: boolean
}

export const getTenantContext = (req: PayloadRequest): TenantContext => {
  const tenant = req.user?.tenants?.[0]?.tenant
  if (!tenant) throw new PayloadError('ERR_NO_TENANT_ACCESS')
  return {
    tenantId: tenant,
    userId: req.user.id,
    userRoles: req.user.roles ?? [],
    isSuperAdmin: (req.user.roles ?? []).includes('super-admin'),
  }
}

// src/plugins/auth/access/index.ts (CANONICAL HELPERS)
export const isSuperAdmin: Access = ({ req }) => 
  req.user?.roles?.includes('super-admin') ?? false

export const tenantScoped: Access = async ({ req }) => {
  const tenants = req.user?.tenants ?? []
  return tenants.length > 0
    ? { tenant: { in: tenants.map(t => t.tenant) } }
    : false
}

export const authenticated: Access = ({ req }) => !!req.user?.id
```

### Refactor Scope

- **Delete:** `src/plugins/auth/middleware/host-scope.ts` (deprecated, zero callers)
- **Delete:** All `req.payload.services`, `req.payload.requestContext` references
- **Rewrite:** 60 access predicates → use `getTenantContext()` + canonical helpers
- **Rewrite:** 8 hooks → import services directly, remove service-registry indirection
- **Rewrite:** 7 seeds → `role: 'X'` → `roles: ['X']`, `hostId` → `tenant`

**Result:** Zero Payload v3 contract violations; all code uses native Payload patterns.

---

## Section 3: Service Implementation

### Decision: Prune 4 Missing Services

**Current state:** 4 hooks reference services that don't exist:
- `apAging.service.ts` (missing)
- `arAging.service.ts` (missing)
- `cogs.service.ts` (missing)
- `depreciation.service.ts` (missing)

**Decision:** PRUNE. Phase 11 integration has zero invoking code → these are speculative.

**Refactor scope:**
- Delete: `src/services/{apAging,arAging,cogs,depreciation}.service.ts` (4 stubs)
- Delete: `src/hooks/collections/accounting/{apAging,arAging,cogs,depreciation}.hook.ts` (4 hooks)

**Result:** Hook registry now contains only GL-posting hooks with corresponding services.

---

## Section 4: Plugin Architecture (All Plugins Simultaneously)

### Target State Mapping

| Plugin | Current | Target | Collections | Services |
|--------|---------|--------|-------------|----------|
| `accounting` | Partial | Full | 122 | 20 |
| `receivables` | Flat | Plugin folder | 6 | 5 |
| `payables` | Flat | Plugin folder | 5 | 4 |
| `parties` | Flat | Plugin folder | 3 | 3 |
| `dimensions` | Flat | Plugin folder | 5 | 2 |
| `auth` | Minimal | Full | 4 | 3 |
| `mcp` | Partial | Full | 2 | 4 |
| `export` | Seeds only | Plugin folder | 0 | 6 |

### All Plugins Follow Canonical Structure

Every plugin gets:
- `types/` (payload wrappers + entities + guards)
- `validators/` (Zod schemas)
- `access/` (predicates + field-level gating)
- `collections/` (Payload CollectionConfig)
- `services/` (typed queries + business logic)
- `hooks/` (factory pattern, collection-specific)
- `components/` (React, shadcn/ui)

---

## Section 5: Standards Citations (Integrated with Plugin Structure)

**Canon:** Every collection, service, validator, and hook carries JSDoc banner citing standards.

```typescript
/**
 * General Ledger Accounts
 * 
 * Double-entry accounting write-target per IAS-1 § 35–36 (presentation of 
 * comprehensive income).
 * 
 * @standard IAS-1:2021 Presentation of Financial Statements
 * @standard IAS-2:2022 Inventories
 * @standard IFRS-9:2014 Financial Instruments
 * @accounting gl-accounts
 * @audit ISO-19011:2018 § 6.5 audit-evidence-preservation
 * @see src/standards/ifrs/README.md
 */
export const GLAccounts: CollectionConfig = { ... }
```

### Refactor Scope

- Audit: 120+ collections → add/verify JSDoc banners
- Audit: 20 services → add/verify JSDoc banners
- Audit: All hooks → add/verify JSDoc banners
- Audit: receivables, payables, parties, dimensions → add JSDoc banners
- Gate: `pnpm standards:check --required` passes (2000+ citations)

---

## Section 6: Type Safety (Canonical Readonly + Cast Removal)

### Payload-Generated Types (Auto-Generated on Build)

On `pnpm build`, Payload generates `src/payload-types.ts` with all collection types:
```typescript
export type Invoices = { id: string; number: string; tenant: string; ... }
export type GLAccounts = { id: string; accountCode: string; ... }
// ... 120+ collection types
```

### Type Layer: Wrapping Payload Types

**Each plugin creates type wrappers:**

```typescript
// src/plugins/receivables/types/payload.ts (NEW)
/**
 * Payload-generated type wrappers scoped to receivables plugin.
 * Auto-generated on build; re-export with domain context.
 */
export type {
  Invoices as InvoiceDocument,
  InvoiceLines as InvoiceLineDocument,
  Payments as PaymentDocument,
  Customers as CustomerDocument,
} from '@/payload-types'

// src/plugins/receivables/types/entities.ts (REFACTORED)
/**
 * Domain entity types — extend Payload-generated types.
 * DO NOT shadow Payload types; extend them.
 */
import type { InvoiceDocument } from './payload'
import type { Invoice as StandardsInvoice } from '@/standards/en-16931'

export interface Invoice extends InvoiceDocument {
  // Extends Payload storage type with business properties
  readonly agingDays: number
  readonly isOverdue: boolean
  readonly allowanceRequired: boolean
}

// src/plugins/receivables/types/guards.ts (NEW)
/**
 * Type guards — narrow unknown to Payload types safely.
 * REPLACES all `as unknown as X` casts.
 */
export const isInvoiceDocument = (value: unknown): value is InvoiceDocument => {
  return (
    value &&
    typeof value === 'object' &&
    'id' in value &&
    'tenant' in value &&
    'number' in value
  )
}

export const isPayloadUser = (user: unknown): user is {
  readonly id: string
  readonly tenants: readonly Array<{ readonly tenant: string }>
  readonly roles: readonly string[]
} => {
  if (!user || typeof user !== 'object') return false
  if (!('id' in user && 'tenants' in user && 'roles' in user)) return false
  return Array.isArray((user as any).tenants) && Array.isArray((user as any).roles)
}
```

### Typed Query Helpers (Replace All Casts)

```typescript
// src/plugins/receivables/services/typed-queries.ts (NEW)
/**
 * Typed query helpers — replace all `as unknown as X` casts.
 */
import type { Payload, PayloadRequest } from 'payload'
import type { InvoiceDocument } from '../types/payload'
import { isInvoiceDocument } from '../types/guards'

export const findInvoicesForTenant = async (
  payload: Payload,
  req: PayloadRequest,
  filters?: Record<string, unknown>,
): Promise<InvoiceDocument[]> => {
  const { tenantId } = getTenantContext(req) // type-safe
  const results = await payload.find({
    collection: 'invoices',
    where: { tenant: { equals: tenantId }, ...(filters ?? {}) },
    user: req.user,
  })
  return results.filter(isInvoiceDocument) // type-guarded
}

export const findInvoiceById = async (
  payload: Payload,
  req: PayloadRequest,
  invoiceId: string,
): Promise<InvoiceDocument | null> => {
  const invoices = await findInvoicesForTenant(payload, req, { id: { equals: invoiceId } })
  return invoices[0] ?? null
}
```

### Scope: Remove All `as unknown as` Casts

- **10 casts** in `src/services/saf-t-export.service.ts` → use `findTenantScoped<TSlug>()`
- **1 cast** in `src/services/event-emitter.service.ts:263` → discriminated union narrowing
- **1 cast** in `src/services/period-end-adjustment.service.ts:446` → type narrowing
- **2 casts** in `src/services/bank-reconciliation.service.ts:150,347` → type narrowing

**Result:** Zero unsafe casts in production code.

---

## Section 7: UI Component Architecture (Payload Gaps → shadcn/ui)

### Gap Analysis: Payload Admin vs. Custom UI Needs

| Feature | Payload Admin | Custom UI Needed? | Solution |
|---------|--------------|-------------------|----------|
| Collection CRUD | ✓ Auto-generated | No | Keep Payload admin |
| Field Rendering | ✓ Text, select, date | No (Payload custom field type) | Keep Payload |
| GL Posting Reconciliation | ✗ None | **Yes** | shadcn/ui Table + diff viewer |
| AR/AP Aging Reports | ✗ None | **Yes** | shadcn/ui Table + Recharts chart |
| Cash Flow Forecast | ✗ None | **Yes** | Recharts line chart + table |
| Trial Balance View | ✗ None | **Yes** | shadcn/ui Table + drill-down |
| Period-End Checklist | ✗ None | **Yes** | shadcn/ui Checkbox list + progress |
| Invoice Approval Workflow | ✗ None | **Yes** | shadcn/ui Dialog + custom logic |
| Payment Allocation Wizard | ✗ None | **Yes** | shadcn/ui Stepper + form |
| Audit Trail Viewer | ✗ None | **Yes** | shadcn/ui Table + timeline |
| Tenant Switcher (Super-admin) | ✗ None | **Yes** | shadcn/ui Select + logic |
| Currency Display | ✗ None | **Yes** | `<MoneyField>` wrapper |
| Invoice PDF Preview | ✗ None | **Yes** | shadcn/ui Sheet + PDF viewer |

### Component Architecture

**All components live in `src/plugins/<domain>/components/`:**

```
src/plugins/receivables/components/
├── index.ts
├── MoneyField.tsx                    (currency input with ISO-4217 formatting)
├── ARAgingReport.tsx                 (Table + Recharts line chart)
├── InvoiceApprovalWorkflow.tsx       (Dialog + approval logic)
├── PaymentAllocationWizard.tsx       (Stepper + form)
├── InvoicePDFPreview.tsx             (Sheet + PDF viewer)
└── ...

src/plugins/accounting/components/
├── index.ts
├── TrialBalance.tsx                  (Table + Recharts)
├── GLPostingReconciliation.tsx       (Table + diff viewer)
├── PeriodEndChecklist.tsx            (Checkbox list + progress)
├── AuditTrailViewer.tsx              (Table + timeline)
└── ...

src/plugins/auth/components/
├── index.ts
├── TenantSwitcher.tsx                (Select + switch logic)
├── UserRoleManager.tsx               (multiselect)
└── AccessControlPanel.tsx            (Tables + custom logic)
```

### Component Typing Pattern

**All components typed from domain entities:**

```typescript
// src/plugins/receivables/components/MoneyField.tsx
/**
 * Currency input field — extends shadcn/ui Input.
 * Handles display (e.g., "1,234.56") ↔ storage (123456 cents) conversion.
 * 
 * @standard ISO-4217:2015 currency-codes
 * @quality shadcn/ui accessibility (WCAG 2.1 AA)
 */
import { Input } from '@/components/ui/input'

interface MoneyFieldProps {
  readonly value: number // cents
  readonly onChange: (cents: number) => void
  readonly currencyCode: string // ISO-4217
  readonly disabled?: boolean
}

export const MoneyField: React.FC<MoneyFieldProps> = ({
  value,
  onChange,
  currencyCode,
  disabled,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
  
  return (
    <Input
      type="text"
      value={formatter.format(value / 100)}
      onChange={(e) => onChange(Math.round(parseFloat(e.target.value) * 100))}
      disabled={disabled}
    />
  )
}

// src/plugins/accounting/components/TrialBalance.tsx
/**
 * Trial Balance — financial position dashboard.
 * 
 * @standard IFRS-1 Presentation of Financial Statements
 * @standard US-GAAP ASC-210 Balance Sheet
 * @quality shadcn/ui + Recharts
 */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { TrialBalanceReport } from '../types/entities'

interface TrialBalanceProps {
  readonly report: TrialBalanceReport
  readonly onAccountClick?: (accountId: string) => void
}

export const TrialBalance: React.FC<TrialBalanceProps> = ({ report, onAccountClick }) => {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={report.accounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="accountCode" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.accounts.map((account) => (
            <TableRow key={account.id} onClick={() => onAccountClick?.(account.id)}>
              <TableCell>{account.accountCode}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell className="text-right">{account.debits / 100}</TableCell>
              <TableCell className="text-right">{account.credits / 100}</TableCell>
              <TableCell className="text-right">{account.balance / 100}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

### Dependencies

- **shadcn/ui** — UI components (Button, Table, Dialog, Sheet, Select, Form, Checkbox, etc.)
- **Recharts** — financial charts (already installed)
- **Zod** — form validation + type guards
- **PDF Viewer** — invoice preview (pdfjs or similar)

---

## Section 8: Implementation Phases (42 Days)

### Phase 1: Groundwork (Days 1–7)

**Deliverables:**
- Plugin folder structure for all 9 plugins (types/, validators/, access/, collections/, services/, hooks/, components/)
- `src/plugins/auth/context/tenant-context.ts` + canonical type guards + `getTenantContext()`
- `src/plugins/auth/access/index.ts` with `isSuperAdmin`, `tenantScoped`, `authenticated` helpers
- `src/plugins/auth/hooks/` hook factories (factory pattern)
- Type wrappers + guards + typed-queries for auth plugin
- shadcn/ui installed + configured in payload.config.ts
- All 9 plugin.ts files (stubs)

**Commits:**
- "Phase 1: Plugin architecture scaffolding"
- "Phase 1: Payload type wrappers + auth context"
- "Phase 1: shadcn/ui integration + hook factories"

---

### Phase 2: Accounting Plugin (Days 8–20)

**Deliverables:**
- Migrate 122 collections → `src/plugins/accounting/collections/`
- Create `src/plugins/accounting/types/` (payload.ts, entities.ts, guards.ts, api.ts)
- Create `src/plugins/accounting/validators/` (Zod schemas)
- Create `src/plugins/accounting/services/typed-queries.ts` + rewrite all services
- Rewrite 4 hooks with factory pattern + collection-specific types
- Delete 4 missing service stubs + 4 deprecated hooks
- Delete `src/plugins/auth/middleware/host-scope.ts`
- Create `src/plugins/accounting/access/` (access predicates)
- Create `src/plugins/accounting/components/` (TrialBalance, GLPostingReconciliation, PeriodEndChecklist, AuditTrailViewer)
- Add JSDoc banners to all 120+ collections + 20 services + 4 hooks
- Rewrite `src/plugins/accounting/plugin.ts` to compose all layers

**Commits:**
- "Phase 2: Accounting collections migrated + types/validators/access"
- "Phase 2: Accounting services refactored + typed queries (zero casts)"
- "Phase 2: Accounting hooks + components + JSDoc banners"

---

### Phase 3: Receivables/Payables/Parties Plugins (Days 21–30)

**Deliverables (per plugin):**
- Migrate collections → plugin folder
- Create types/ (payload.ts, entities.ts, guards.ts)
- Create validators/ (Zod schemas)
- Create services/ (typed-queries.ts)
- Create access/ (predicates)
- Create components/ (AR/AP aging, payment allocation wizard, etc.)
- Add JSDoc banners
- Rewrite plugin.ts

**Components:**
- Receivables: ARAgingReport, InvoiceApprovalWorkflow, PaymentAllocationWizard, InvoicePDFPreview, MoneyField
- Payables: APAgingReport, BillApprovalWorkflow, PurchaseOrderWizard
- Parties: CustomerLookup, VendorManager

**Commits (per plugin):**
- "Phase 3: Receivables plugin refactored"
- "Phase 3: Payables plugin refactored"
- "Phase 3: Parties plugin refactored"

---

### Phase 4: Auth + MCP Plugins (Days 31–35)

**Deliverables:**

**Auth:**
- Create types/ (payload.ts, entities.ts, guards.ts)
- Create validators/ (Zod schemas for User, Role, Tenant, UserRole)
- Rewrite access/ folder (access predicates)
- Create components/ (TenantSwitcher, UserRoleManager, AccessControlPanel)
- Add JSDoc banners

**MCP:**
- Create types/ (domain entity types)
- Create validators/ (tool parameter schemas)
- Create services/ (typed query helpers for MCP tools)
- Extend components/ (tool invoker UI, tool browser)
- Add JSDoc banners

**Commits:**
- "Phase 4: Auth plugin refactored + TenantSwitcher component"
- "Phase 4: MCP plugin refactored + typed tool services"

---

### Phase 5: Dimensions + Export Plugins (Days 36–40)

**Deliverables (per plugin):**
- Migrate → plugin folder
- Create types/, validators/, services/, access/, components/
- Add JSDoc banners
- Rewrite plugin.ts

**Commits (per plugin):**
- "Phase 5: Dimensions plugin refactored"
- "Phase 5: Export plugin refactored"

---

### Phase 6: Type Safety + Verification (Days 41–42)

**Deliverables:**
- Local: `pnpm typecheck --noEmit` passes
- Local: `pnpm standards:check --required` passes (2000+ citations verified)
- Local: `pnpm build` generates payload-types.ts with all 120+ collections + migrations
- Local: `pnpm vitest run` all tests green
- Final commit with full build verification

**Commits:**
- "Phase 6: Type safety verified + standards audit clean"
- "Phase 6: Full coordinated refactor complete + ready for production"

---

## Section 9: Verification Gates (Complete)

### Per-Phase Success Criteria

| Phase | Gate | Success Criteria |
|-------|------|-----------------|
| 1 | Folder structure | All 9 plugins have types/, validators/, access/, services/, hooks/, components/ |
| 1 | Type guards | `getTenantContext()`, `isPayloadUser()`, `isInvoiceDocument()` all exported + tested |
| 1 | shadcn setup | `@/components/ui/*` imports resolve; Button, Table, Dialog, Select available |
| 1 | Hook factories | Factory pattern tested; hooks return collection-specific types |
| 2 | Accounting collections | 122 collections in plugin folder with CollectionConfig |
| 2 | Type wrappers | payload.ts, entities.ts, guards.ts created + exports verified |
| 2 | Typed queries | Zero `as unknown as` casts in accounting services |
| 2 | Hooks | All 4 hooks use factory pattern + `getTenantContext()` |
| 2 | Components | TrialBalance, GLPostingReconciliation, PeriodEndChecklist render without errors |
| 2 | JSDoc banners | All 120+ collections + 20 services cite standards (pnpm standards:check passes) |
| 3 | Receivables/Payables/Parties | Same as Phase 2 applied to each plugin |
| 4 | Auth plugin | types/, access/, TenantSwitcher component working |
| 4 | MCP plugin | Typed tool services + tool invoker component |
| 5 | Dimensions + Export | Plugins fully refactored |
| 6 | typecheck | `pnpm typecheck --noEmit` — zero errors, zero warnings |
| 6 | standards | `pnpm standards:check --required` — 2000+ citations verified, zero malformed banners |
| 6 | build | `pnpm build` — migrations generated, payload-types.ts contains all 120+ collections |
| 6 | tests | `pnpm vitest run` — all tests pass, zero failures |

---

## Conservative Design Decisions

### Why Approach 3 (Coordinated Breadth-First)?

1. **Design decisions block everything** — Slices PP–UU cluster unblocks all downstream refactors
2. **One movement prevents thrashing** — Multi-pass refactoring creates churn; one pass creates momentum
3. **Type safety from day 1** — Build types/, guards.ts, typed-queries.ts in Phase 1; every service afterward uses safe patterns
4. **Standards integration throughout** — JSDoc banners added during each phase; not deferred

### Why DRY Code Without Backward Compatibility?

1. **Phase 11 is complete** — All 122 collections imported, registered, multi-tenant wired
2. **No callers of old patterns** — `host`/`hostId` fields being replaced; nothing in code references old names
3. **Payload v3 is canonical** — `req.user.tenants[]` and `roles[]` are Payload standards; old patterns were Phase 9 workarounds
4. **Clean slate faster** — Backward compatibility branches increase complexity; single path is fastest

### Why shadcn/ui for Financial Reporting?

1. **Payload admin is for CRUD** — Collection list/detail views work perfectly
2. **Financial dashboards need custom logic** — Aging reports, trial balance, cash flow forecasts are bespoke
3. **shadcn/ui is accessible + typed** — WCAG 2.1 AA compliant; React + TypeScript integrated
4. **Recharts integrates seamlessly** — Already installed; financial charts (line, bar, etc.) are 10-line components
5. **No external dependencies** — shadcn/ui uses Tailwind (already in stack); no new runtime cost

---

## Success Criteria (Design Complete)

- [x] Plugin architecture clearly specified with folder structure
- [x] Access control & contracts fully resolved (no fictional req.user)
- [x] Service implementation decision made (prune 4 missing services)
- [x] Type layer integration designed (payload wrappers + guards + typed queries)
- [x] UI component strategy defined (shadcn/ui for Payload gaps)
- [x] Standards citations integrated into every plugin
- [x] Implementation phases broken into 6 clear chunks (42 days)
- [x] Verification gates specified for each phase
- [x] No backward compatibility constraints
- [x] Coordinated one-batch approach avoids thrashing

---

## Design Document Approval

**Approved:** 2026-05-12  
**By:** Tsvetan (ceci@psg.bg)  
**Status:** READY FOR IMPLEMENTATION

This design document is frozen. Implementation proceeds per the 6-phase plan with daily commits per phase milestone.

---

**Next Step:** Implementation Plan (via writing-plans skill)
