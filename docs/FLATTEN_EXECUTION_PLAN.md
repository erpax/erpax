# Full Flatten Execution Plan: src/plugins/* → src/*

**Scope**: Complete reorganization of 295 custom .ts files into canonical Payload app structure  
**Duration**: 5–6 days (can be parallelized)  
**Start Date**: 2026-05-12  
**Goal**: Single canonical src/* with zero plugin boilerplate, duplicates consolidated, ready for ecommerce/multi-tenant/import-export composition

---

## File Mapping (Exact Moves)

### Accounting Plugin (232 files → src/collections/accounting/, src/services/accounting/, etc.)

```
src/plugins/accounting/
├── collections/
│   ├── *.ts (78 files) → src/collections/accounting/
├── services/
│   ├── *.ts → src/services/accounting/
├── fields.ts → src/fields/accounting.ts
├── fields/
│   ├── *.ts → src/fields/accounting/
├── hooks/
│   ├── *.ts → src/hooks/collections/accounting.ts (Payload beforeChange/afterChange)
├── access/
│   ├── *.ts → src/access/accounting.ts
├── utilities/
│   ├── *.ts → src/services/accounting/utilities/
├── factories/
│   ├── *.ts → src/services/accounting/factories/
├── middleware/
│   ├── *.ts → src/hooks/middleware/accounting.ts
├── seeds/
│   ├── *.ts → src/seeds/accounting.ts
├── agents/
│   ├── *.ts → src/agents/accounting/

# Leave behind (remove)
├── plugin.ts (no longer needed)
├── index.ts (no longer needed)
└── debit-credit.ts, fields-money-fix.ts, financial-analysis.ts (move to services/accounting/)
```

### Receivables Plugin (10 files → src/collections/receivables/, src/services/receivables/)

```
src/plugins/receivables/
├── aging.ts → src/services/shared/aging.service.ts (CONSOLIDATED)
├── allowance.ts → src/services/receivables/allowance.service.ts
├── analytics.ts → src/services/shared/analytics.service.ts (CONSOLIDATED)
├── fields.ts → src/fields/receivables.ts (or fold into src/fields/shared.ts)
├── types.ts → src/types/receivables/
├── workflow.ts → src/services/shared/workflow.service.ts (CONSOLIDATED)
├── index.ts (remove)
└── *.test.ts → preserve in same location as source

# Create
└── src/collections/receivables/invoices.ts (infer from types)
```

### Payables Plugin (7 files)

```
src/plugins/payables/
├── aging.ts → src/services/shared/aging.service.ts (CONSOLIDATED, skip)
├── analytics.ts → src/services/shared/analytics.service.ts (CONSOLIDATED, skip)
├── discounts.ts → src/services/payables/discounts.service.ts
├── fields.ts → src/fields/shared.ts (merge with receivables/fields.ts)
├── types.ts → src/types/payables/
├── workflow.ts → src/services/shared/workflow.service.ts (CONSOLIDATED, skip)
└── index.ts (remove)

# Create
└── src/collections/payables/purchase-orders.ts (infer from types)
```

### Parties Plugin (6 files)

```
src/plugins/parties/
├── aging.ts → src/services/shared/aging.service.ts (CONSOLIDATED, skip)
├── types.ts → src/types/parties/
├── workflow.ts → src/services/shared/workflow.service.ts (CONSOLIDATED, skip)
├── index.ts (remove)
└── *.test.ts → preserve

# Note: Consider folding parties into ecommerce's contacts/customers
# For now, keep as src/collections/parties/
└── src/collections/parties/{customers.ts, vendors.ts, contacts.ts}
```

### Export Plugin (22 files)

```
src/plugins/export/
├── api.ts → src/services/export/api.service.ts
├── excel.ts → src/services/export/excel.service.ts
├── pdf.ts → src/services/export/pdf.service.ts
├── standards-export.ts → src/services/export/standards.service.ts
├── import-collection-projection.ts → src/services/export/import.service.ts
├── integration.test.ts → src/services/export/export.service.test.ts
├── seeds/ → src/seeds/export/
└── index.ts (remove)

# Create
└── src/collections/export/{saf-t-exports.ts, audit-files.ts}
```

### Auth Plugin (3 files)

```
src/plugins/auth/
├── access.ts → src/access/auth.ts
├── types.ts → src/types/auth/
└── index.ts (remove)

# Create
└── src/collections/auth/{users.ts, roles.ts, permissions.ts}
```

### Dimensions Plugin (1 file)

```
src/plugins/dimensions/
└── index.ts → src/types/dimensions/ (or just remove if empty)

# Create
└── src/collections/dimensions/{cost-centers.ts, projects.ts}
```

### MCP Plugin (11 files)

```
src/plugins/mcp/
├── components/ → src/components/mcp/
├── endpoints/ → src/api/mcp/ (or src/services/mcp/)
├── globals/ → src/services/mcp/globals.ts
└── plugin.test.ts → src/services/mcp/mcp.service.test.ts

# Keep as-is or fold into src/services/mcp/
```

### Hooks Plugin (3 files, Shared Payload Hooks)

```
src/plugins/hooks/
├── address-validation.hook.ts → src/hooks/collections/address-validation.ts
├── common.ts → src/hooks/collections/common.ts
└── index.ts (update to export from new locations)

# Keep as infrastructure (not domain-specific)
```

---

## Consolidated Services (Duplicates Merged)

### src/services/shared/aging.service.ts

```typescript
/**
 * Aging analysis — shared across receivables, payables, dimensions.
 * 
 * Merged from:
 * - src/plugins/receivables/aging.ts
 * - src/plugins/payables/aging.ts
 * - src/plugins/parties/aging.ts
 */

export interface AgingBucket {
  current: number;
  days30: number;
  days60: number;
  days90plus: number;
}

export function calculateAging(items, asOfDate) { /* single impl */ }
export function getAgingReport(tenantId, type: 'ar' | 'ap') { /* shared */ }
```

### src/services/shared/analytics.service.ts

```typescript
/**
 * Analytics — shared across receivables, payables.
 * 
 * Merged from:
 * - src/plugins/receivables/analytics.ts
 * - src/plugins/payables/analytics.ts
 */

export function calculateMetrics(data) { /* single impl */ }
export function getTrendAnalysis(tenantId, period) { /* shared */ }
```

### src/services/shared/workflow.service.ts

```typescript
/**
 * Workflow orchestration — shared across domains.
 * 
 * Merged from:
 * - src/plugins/receivables/workflow.ts
 * - src/plugins/payables/workflow.ts
 * - src/plugins/parties/workflow.ts
 */

export function transitionStatus(entity, newStatus) { /* single impl */ }
export function getNextActions(entity) { /* shared */ }
```

### src/fields/shared.ts or src/fields/index.ts

```typescript
/**
 * Shared field definitions.
 * 
 * Merged from:
 * - src/plugins/accounting/fields.ts
 * - src/plugins/receivables/fields.ts
 * - src/plugins/payables/fields.ts
 */

export const moneyField = { /* ... */ };
export const currencyField = { /* ... */ };
export const tenantField = { /* ... */ };
```

### src/access/tenant-based.ts

```typescript
/**
 * Multi-tenant access control — used everywhere.
 * 
 * Extracted patterns from all plugins.
 */

export const tenantScoped = (fieldName = 'tenantId') => ({
  create: ({ req }) => ({ [fieldName]: { equals: req.user?.tenantId } }),
  read: ({ req }) => ({ [fieldName]: { equals: req.user?.tenantId } }),
  // ...
});
```

---

## Directory Creation Order

```bash
# 1. Create top-level dirs
mkdir -p src/{collections,fields,access,hooks/{collections,middleware},services/{shared,accounting,receivables,payables,export,mcp},types/{accounting,receivables,payables,export,auth,parties},validators,components,agents,api,seeds}

# 2. Create domain-specific service dirs
mkdir -p src/services/{accounting,receivables,payables,export,auth,dimensions,mcp}/utilities
mkdir -p src/services/{accounting,receivables,payables}/factories

# 3. Create collection dirs
mkdir -p src/collections/{accounting,receivables,payables,export,auth,dimensions,parties}

# 4. Create type dirs
mkdir -p src/types/{accounting,receivables,payables,export,auth,parties,shared}

# 5. Create field dirs
mkdir -p src/fields/{accounting,shared}

# 6. Create seed dirs
mkdir -p src/seeds/{accounting,export}

# 7. Create agent dirs
mkdir -p src/agents/{accounting,shared}

# 8. Create component dirs
mkdir -p src/components/{accounting,receivables,payables,export,mcp}
```

---

## Move Order (Dependencies Matter)

### Step 1: Shared Infrastructure (No Dependencies)

```bash
# Move shared fields
mv src/plugins/accounting/fields.ts → src/fields/accounting.ts
mv src/plugins/accounting/fields/ → src/fields/accounting/
mv src/plugins/receivables/fields.ts → src/fields/receivables.ts
mv src/plugins/payables/fields.ts → src/fields/payables.ts

# Consolidate into src/fields/shared.ts (merge receivables + payables into accounting's impl)
# Create src/fields/index.ts that exports from shared + domain-specific

# Move shared access control
mv src/plugins/accounting/access/ → src/access/accounting.ts
mv src/plugins/auth/access.ts → src/access/auth.ts
# Create src/access/tenant-based.ts (extract patterns)
# Create src/access/index.ts that exports all
```

### Step 2: Shared Services (No Collection Dependencies)

```bash
# Create src/services/shared/aging.service.ts
# Merge: receivables/aging.ts + payables/aging.ts + parties/aging.ts
cat src/plugins/receivables/aging.ts src/plugins/payables/aging.ts src/plugins/parties/aging.ts \
  > src/services/shared/aging.service.ts.draft
# Manually deduplicate and consolidate

# Create src/services/shared/analytics.service.ts
# Merge: receivables/analytics.ts + payables/analytics.ts

# Create src/services/shared/workflow.service.ts
# Merge: receivables/workflow.ts + payables/workflow.ts + parties/workflow.ts

# Create src/services/shared/currency.service.ts
# Extract: from accounting, receivables, export (find currency logic)

# Create src/services/shared/index.ts
# Export all shared services
```

### Step 3: Types (Organize by Standard)

```bash
# Move types, organize by standard they extend
mv src/plugins/accounting/types.ts → src/types/accounting/index.ts
mv src/plugins/receivables/types.ts → src/types/receivables/index.ts
# Within each, organize by entity:
#   src/types/receivables/invoice.ts
#   src/types/receivables/customer.ts
#   etc.

mv src/plugins/payables/types.ts → src/types/payables/
mv src/plugins/export/types.ts → src/types/export/
mv src/plugins/auth/types.ts → src/types/auth/
mv src/plugins/parties/types.ts → src/types/parties/

# Create src/types/index.ts that re-exports all
```

### Step 4: Collections (Depends on Types + Fields)

```bash
# Move accounting collections (already organized)
mv src/plugins/accounting/collections/ → src/collections/accounting/

# Move others (may need to infer from types)
mv src/plugins/receivables/ (infer collections from types) → src/collections/receivables/
mv src/plugins/payables/ (infer collections) → src/collections/payables/
mv src/plugins/export/ (infer collections) → src/collections/export/
mv src/plugins/auth/ (infer collections) → src/collections/auth/
mv src/plugins/parties/ (infer collections) → src/collections/parties/
mv src/plugins/dimensions/ (infer collections) → src/collections/dimensions/
```

### Step 5: Domain Services (Depends on Collections + Types)

```bash
# Move domain-specific services
mv src/plugins/accounting/services/ → src/services/accounting/
mv src/plugins/receivables/allowance.ts → src/services/receivables/allowance.service.ts
mv src/plugins/payables/discounts.ts → src/services/payables/discounts.service.ts
mv src/plugins/export/api.ts → src/services/export/api.service.ts
# etc.
```

### Step 6: Hooks, Access, Agents, Seeds

```bash
mv src/plugins/accounting/hooks/ → src/hooks/collections/accounting/
mv src/plugins/accounting/agents/ → src/agents/accounting/
mv src/plugins/accounting/middleware/ → src/hooks/middleware/accounting/
mv src/plugins/accounting/seeds/ → src/seeds/accounting/
mv src/plugins/export/seeds/ → src/seeds/export/
```

### Step 7: MCP & Components

```bash
mv src/plugins/mcp/components/ → src/components/mcp/
mv src/plugins/mcp/endpoints/ → src/api/mcp/
# All other React components → src/components/<domain>/
```

### Step 8: Update Imports Across Codebase

```bash
# Before removing src/plugins/, update all imports:
# @/plugins/accounting/services → @/services/accounting
# @/plugins/receivables/aging → @/services/shared/aging
# @/plugins/*/fields → @/fields/<domain>
# @/plugins/*/access → @/access/<domain>
# @/plugins/*/types → @/types/<domain>

# Use codemod or sed to bulk-replace:
find src -name "*.ts" -o -name "*.tsx" | \
  xargs sed -i "s|@/plugins/accounting|@/services/accounting|g"
# etc.
```

### Step 9: Update payload.config.ts

```typescript
// FROM (plugin-based):
import { accountingPlugin } from '@/plugins/accounting'
export const plugins = [accountingPlugin(), ...]

// TO (collection-based):
import {
  GLAccounts, Journals, Statements, ...
} from '@/collections/accounting'
import {
  Invoices, Customers, ...
} from '@/collections/receivables'
// etc.

export const collections = [
  GLAccounts, Journals, Statements,
  Invoices, Customers,
  // ... (all collections flattened)
]
```

### Step 10: Remove Boilerplate

```bash
rm -rf src/plugins/accounting/plugin.ts
rm -rf src/plugins/accounting/index.ts
rm -rf src/plugins/receivables/
rm -rf src/plugins/payables/
rm -rf src/plugins/parties/
rm -rf src/plugins/export/
rm -rf src/plugins/auth/
rm -rf src/plugins/dimensions/
# Keep only official plugins in node_modules
```

### Step 11: Verify

```bash
pnpm typecheck
pnpm standards:check
pnpm standards:required
pnpm standards:verify-index
pnpm lint
pnpm build
pnpm dev
```

---

## Parallelization

Can be done in parallel (no cross-dependencies):
- Step 1 (Fields + Access) ← independent
- Step 2 (Shared Services) ← independent
- Step 3 (Types) ← independent

Then sequential:
- Step 4 (Collections) ← depends on Step 1, 3
- Step 5 (Domain Services) ← depends on Step 1, 3, 4
- Steps 6–11 ← sequential (import updates)

**Parallel timeline: 2–3 days instead of 5–6**

---

## Verification Checkpoints

After each major step:

```bash
# Type safety
pnpm typecheck

# Standards citations
pnpm standards:check

# Build
pnpm build

# Dev server
pnpm dev (open localhost:3000, verify no errors)
```

---

## Rollback Plan

Before starting, commit to git:
```bash
git add -A && git commit -m "Pre-flatten backup before src/plugins/* -> src/* migration"
git branch flatten-backup
```

If anything breaks:
```bash
git checkout main
git reset --hard flatten-backup
```

---

## Success Criteria

✅ All 295 .ts files moved from src/plugins/* to src/*  
✅ Duplicates consolidated (aging, analytics, workflow, fields)  
✅ Zero code in src/plugins/ (except official plugins via package.json)  
✅ pnpm typecheck — no errors  
✅ pnpm standards:verify-index — fresh  
✅ pnpm build — succeeds  
✅ pnpm dev — no runtime errors  
✅ payload.config.ts imports directly from src/collections/, src/services/, etc.  
✅ All imports updated (@/plugins/* → @/collections/*, @/services/*, etc.)  

---
