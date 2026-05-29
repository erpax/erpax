# Flatten Custom Plugins → Canonical Payload App Structure

**Date**: 2026-05-12  
**Status**: Migration Strategy (Ready for Implementation)  
**Trigger**: Activate all 9 official Payload plugins; flatten custom domain code to reveal redundancy

---

## Directive

1. **Activate all 9 official Payload plugins** ✓ (Done: multiTenantPlugin, ecommercePlugin, importExportPlugin, mcpPlugin added to plugins array)
2. **Move custom domain code** from `src/plugins/*` (receivables, payables, parties, export, auth, dimensions, mcp) → `src/*` as canonical Payload collections
3. **Find and eliminate** redundancy + noise

---

## Why This Approach

Current state: Custom code scattered in `src/plugins/<domain>/` with plugin factory boilerplate.  
Problem: Plugin wrapping adds ceremony without benefit for internal domains. 9 official Payload plugins handle cross-cutting concerns; our domain code should be collections + services.

Goal: Flatten to see what's actually shared/duplicated (e.g., aging logic across receivables/payables/dimensions).

---

## Target Canonical Structure

```
src/
├── collections/
│   ├── accounting/
│   │   ├── gl-accounts.ts
│   │   ├── journals.ts
│   │   ├── financial-statements.ts
│   │   └── ... (78 total from accounting plugin)
│   ├── receivables/
│   │   ├── invoices.ts
│   │   ├── customers.ts
│   │   ├── disputes.ts
│   │   └── ...
│   ├── payables/
│   │   ├── purchase-orders.ts
│   │   ├── vendors.ts
│   │   └── ...
│   ├── export/
│   │   ├── saf-t-exports.ts
│   │   ├── audit-files.ts
│   │   └── ...
│   ├── auth-config/
│   │   ├── users.ts
│   │   ├── roles.ts
│   │   └── ...
│   ├── dimensions/
│   │   ├── cost-centers.ts
│   │   ├── projects.ts
│   │   └── ...
│   ├── parties/ (or fold into contacts from ecommerce)
│   │   ├── customers.ts
│   │   ├── vendors.ts
│   │   └── ...
│   └── ... (any additional collections)
│
├── fields/
│   ├── money.ts           (extracted from accounting/fields)
│   ├── currency.ts        (shared across domains)
│   ├── tenant-scoped.ts   (multi-tenant field)
│   └── ...
│
├── access/
│   ├── accounting.ts      (extracted from accounting/access)
│   ├── receivables.ts     (extracted from receivables)
│   ├── payables.ts
│   ├── tenant-based.ts    (multi-tenant access control)
│   └── ...
│
├── hooks/
│   ├── collections/
│   │   ├── before-change.ts  (Payload beforeChange hooks)
│   │   ├── after-change.ts   (Payload afterChange hooks)
│   │   └── ...
│   ├── validation.ts         (shared validation hooks)
│   └── ...
│
├── services/
│   ├── accounting/
│   │   ├── gl.service.ts      (extracted from accounting/services)
│   │   ├── journal.service.ts
│   │   └── ...
│   ├── receivables/
│   │   ├── invoice.service.ts (extracted from receivables/services)
│   │   ├── aging.service.ts
│   │   └── ...
│   ├── payables/
│   │   ├── po.service.ts
│   │   ├── aging.service.ts   ← DUPLICATE DETECTED
│   │   └── ...
│   ├── export/
│   │   ├── saf-t.service.ts
│   │   └── ...
│   └── shared/
│       ├── aging.service.ts   ← CONSOLIDATED (used by AR, AP, inventory)
│       ├── currency.service.ts
│       └── ...
│
├── types/
│   ├── accounting/
│   │   ├── gl-account.ts  (extends standards)
│   │   └── ...
│   ├── receivables/
│   │   ├── invoice.ts     (extends EN-16931)
│   │   └── ...
│   └── ...
│
├── validators/
│   ├── accounting/
│   │   ├── gl-account.ts
│   │   └── ...
│   ├── receivables/
│   │   ├── invoice.ts
│   │   └── ...
│   └── shared/
│       ├── date.ts
│       ├── currency.ts
│       └── ...
│
├── components/
│   ├── accounting/
│   │   ├── gl-account-form.tsx
│   │   └── ...
│   ├── receivables/
│   │   ├── invoice-form.tsx
│   │   └── ...
│   └── ... (all React components)
│
├── api/
│   ├── [[...slug]].ts       (Payload API pass-through)
│   └── webhooks/
│
├── app/
│   ├── layout.tsx           (Root layout, minimal)
│   ├── (routes)/
│   │   ├── dashboard/
│   │   ├── invoices/
│   │   └── ... (thin routing only)
│   └── ...
│
├── agents/
│   ├── accounting.agent.ts  (extracted from accounting/agents)
│   └── ...
│
├── standards/               (read-only reference, unchanged)
│   ├── en-16931/
│   ├── saf-t/
│   ├── iso-20022/
│   └── un-edifact/
│
├── migrations/
├── seeds/
├── payload.config.ts
└── server.ts
```

---

## Migration Steps

### Phase 1: Audit & Inventory (1 day)

Before moving files, document:
- [ ] All 78 accounting collections (already in collections/ folder)
- [ ] All service files in receivables/, payables(), parties/, export/ (which are duplicated? e.g., aging)
- [ ] All field definitions (accounting/fields.ts — any reused elsewhere?)
- [ ] All validators (which are shared?)
- [ ] All access control rules (any patterns?)
- [ ] All React hooks (useInvoice, useGLAccount, etc.)
- [ ] All React components (where are they?)

**Output**: Spreadsheet showing:
- File path
- Lines of code
- Purpose (e.g., "aging calculation logic")
- Reused by (e.g., "receivables, payables, inventory")

### Phase 2: Create src/* Structure (1 day)

```bash
mkdir -p src/{collections,fields,access,hooks/collections,services,types,validators,components,agents}

# Move accounting/collections/ to src/collections/accounting/
# Move accounting/services/ to src/services/accounting/
# Move accounting/fields/ to src/fields/accounting/
# etc.
```

### Phase 3: Consolidate Duplicates (1–2 days)

From the audit, consolidate:

**Example: Aging Logic**

Currently:
- `receivables/aging.ts` — AR aging report
- `payables/aging.ts` — AP aging report
- `parties/aging.ts` — Party aging

Consolidation:
```typescript
// src/services/shared/aging.service.ts
/**
 * Aging analysis — used by AR, AP, and party management.
 * 
 * @standard ISO-20022 aging classification
 */

export interface AgingBucket {
  readonly current: number;
  readonly days30: number;
  readonly days60: number;
  readonly days90plus: number;
}

export function calculateAging(
  items: readonly { dueDate: Date; amount: number }[],
  asOfDate: Date = new Date()
): AgingBucket {
  // Single implementation
}
```

Update receivables/payables/parties to import:
```typescript
import { calculateAging } from '@/services/shared/aging.service';
```

**Example: Money Field**

Currently:
- `accounting/fields/money.ts`
- `receivables/fields.ts` (duplicates money logic)
- `export/fields.ts` (duplicates)

Consolidation:
```bash
# Move accounting/fields.ts to src/fields/money.ts (the canonical version)
# Update all imports: @/services/accounting/fields → @/fields
```

### Phase 4: Update Collection Exports (1 day)

Create `src/payload.config.ts` that imports all collections canonically:

```typescript
/**
 * Payload Config — all collections imported from src/collections/*
 */

import { GLAccounts, Journals, ... } from '@/collections/accounting'
import { Invoices, Customers, ... } from '@/collections/receivables'
import { PurchaseOrders, Vendors, ... } from '@/collections/payables'
import { ... } from '@/collections/export'
// etc.

export const collections: CollectionConfig[] = [
  GLAccounts,
  Journals,
  Invoices,
  Customers,
  // ...
]
```

### Phase 5: Remove src/plugins/* (1 day)

Once all code is moved to src/*:

```bash
rm -rf src/plugins/receivables
rm -rf src/plugins/payables
rm -rf src/plugins/parties
rm -rf src/plugins/export
rm -rf src/plugins/auth
rm -rf src/plugins/dimensions
# Keep mcp/ if it's infrastructure; otherwise move endpoints to src/api/
# Keep hooks/ for shared Payload hooks
# accounting/ is now irrelevant (its collections are in src/collections/accounting/)
```

### Phase 6: Verify (1 day)

```bash
pnpm typecheck
pnpm standards:check
pnpm standards:required
pnpm standards:verify-index
pnpm build
pnpm dev
```

---

## What This Reveals

### Redundancy

Once flattened, you'll see:
- **Aging logic** used by AR, AP, inventory (consolidate to src/services/shared/)
- **Currency handling** scattered across accounting, receivables, export (consolidate)
- **Tenant scoping** in every access rule (extract to src/access/tenant-based.ts)
- **Validation patterns** repeated (consolidate to src/validators/shared/)

### Noise

Once flattened, you'll see:
- **Unnecessary plugin factory boilerplate** (plugin.ts files that just export collections)
- **Redundant index.ts exports** (each plugin exports the same collections twice)
- **Duplicate types/validator definitions**
- **Unused files** (code that's been superseded)

### Opportunities

Once flattened:
- Official Payload plugins (ecommerce, multi-tenant, import-export) will compose cleanly with your collections
- Multi-tenancy can be enforced uniformly (not per-plugin)
- Shared services (aging, currency, tax calculation) can be reused anywhere
- New domains (inventory, projects, procurement) can be added as new collection folders, not plugins

---

## Immediate Action Items

### Now (Today)

- [x] Activate ecommercePlugin, importExportPlugin, mcpPlugin, multiTenantPlugin
- [ ] Run audit script (below) to identify duplicates

### Tomorrow

```bash
# Audit script: find duplicate logic across plugins
bash scripts/audit-plugin-duplicates.sh
```

**Output**: CSV of duplicated files/functions:
```
aging.ts,receivables,payables,parties
money.ts,accounting,receivables
tenant-access.ts,accounting,receivables,payables
```

### This Week

- [ ] Move accounting/ collections to src/collections/accounting/
- [ ] Move receivables/ to src/collections/receivables/, src/services/receivables/, etc.
- [ ] Consolidate aging, money, currency, tenant-access into src/shared/
- [ ] Update all imports
- [ ] Remove src/plugins/*
- [ ] Verify: pnpm typecheck && pnpm standards:verify-index && pnpm build

---

## Comparison: Plugin-First vs. App-First

| Aspect | Plugin-First | App-First (Canonical) |
|--------|-------------|-------------------|
| Structure | `src/plugins/<domain>/plugin.ts`, collections/, services/ | `src/collections/<domain>/`, `src/services/<domain>/` |
| Boilerplate | plugin.ts factory, index.ts exports | Direct collection imports in payload.config.ts |
| Duplication | Aging logic in 3 plugins | Aging in src/services/shared/ |
| Official Plugins | Wrap as side-plugins | Compose directly with collections |
| Multi-tenancy | Per-plugin rules | Uniform src/access/tenant-based.ts |
| Reusability | Service imports cross-plugin forbidden | Direct imports, no ceremony |
| Scalability | Each plugin is 10+ files | Each domain is 5–10 collection files + services folder |
| Discovery | "Which plugin owns this?" | "Which folder? src/collections/receivables/" |

---

## Success Criteria

✓ All 9 official Payload plugins active  
✓ Zero code in src/plugins/* (only official plugins remain via package.json)  
✓ All collections importable from `src/collections/<domain>`  
✓ All services importable from `src/services/<domain>` or src/services/shared/  
✓ pnpm typecheck — no errors  
✓ pnpm standards:verify-index — fresh  
✓ pnpm build — succeeds  
✓ Identified and consolidated duplicates (aging, money, currency, tenant-access)  

---

## References

- **Active Payload Plugins**: src/plugins/index.ts (lines 1–10 imports, line 164 plugins array)
- **Plugin Architecture Spec** (now superseded): docs/PLUGIN_ARCHITECTURE.md
- **Standards**: docs/STANDARDS.md

---

## Timeline Estimate

| Phase | Days | Notes |
|-------|------|-------|
| Audit & Inventory | 1 | Spreadsheet of duplicates |
| Create src/* | 1 | mkdir + basic structure |
| Consolidate Dups | 1–2 | Merge aging, money, currency, tenant logic |
| Update Imports | 1 | Change @/plugins/x to @/services/x, @/collections/x |
| Remove src/plugins/* | 0.5 | rm -rf (don't delete, just move out) |
| Verify | 1 | Tests, type checks, build |
| **Total** | **5–6 days** | One sprint |

---
