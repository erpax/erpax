# Phases 9–11: Finalization & Verification

**Status:** Phase 8 (Import Updates A–G) confirmed complete by user. Proceeding with final three phases.

---

## Phase 9: Update payload.config.ts

**Goal:** Replace plugin-based imports with direct canonical imports. Payload no longer loads custom plugins; all collections, services, and types are imported directly.

### Step 9.1: Backup Original
```bash
cp src/payload.config.ts src/payload.config.ts.backup
```

### Step 9.2: Replace Plugin Imports Section

**Old (plugin-based):**
```typescript
import accountingPlugin from '@/plugins/accounting'
import receivablesPlugin from '@/plugins/receivables'
import payablesPlugin from '@/plugins/payables'
import partiesPlugin from '@/plugins/parties'
import exportPlugin from '@/plugins/export'
import authPlugin from '@/plugins/auth'
import dimensionsPlugin from '@/plugins/dimensions'
import hooksPlugin from '@/plugins/hooks'
import mcpPlugin from '@/plugins/mcp'
```

**New (canonical imports):**
```typescript
// Accounting collections & services
import { accountingCollections } from '@/collections/accounting'
import { defaultAccountingServices } from '@/services/accounting'

// Receivables, Payables, Parties
import { receivablesCollections } from '@/collections/receivables'
import { payablesCollections } from '@/collections/payables'
import { partiesCollections } from '@/collections/parties'

// Export
import { exportCollections } from '@/collections/export'

// Auth & Dimensions
import { authCollections } from '@/collections/auth'
import { dimensionsCollections } from '@/collections/dimensions'

// Shared services (if globally needed)
import { agingService } from '@/services/shared/aging.service'

// Access control
import { multiTenantRead, adminOnly, tenantAdmin } from '@/access/tenant-based'
```

### Step 9.3: Update plugins Array

**Old:**
```typescript
plugins: [
  accountingPlugin,
  receivablesPlugin,
  payablesPlugin,
  partiesPlugin,
  exportPlugin,
  authPlugin,
  dimensionsPlugin,
  hooksPlugin,
  mcpPlugin,
  // + 9 official Payload plugins
]
```

**New:**
```typescript
plugins: [
  // 9 official Payload plugins (unchanged)
  nestedDocsPlugin(...),
  seoPlugin(...),
  // ... etc
  // NO custom plugins—all in canonical src/*
]
```

### Step 9.4: Update collections Array

Add direct collection imports to Payload config:

```typescript
collections: [
  // All domain collections loaded directly (no plugin wrappers)
  ...accountingCollections,
  ...receivablesCollections,
  ...payablesCollections,
  ...partiesCollections,
  ...exportCollections,
  ...authCollections,
  ...dimensionsCollections,
]
```

### Step 9.5: Verify Syntax & Save

- Save file
- Run: `pnpm tsc --noEmit` (local only—check for import errors)
- Expected: 0 errors

---

## Phase 10: Remove Plugin Boilerplate

**Goal:** Delete empty plugin directories and wrapper files. The `src/plugins/` directory should be deleted entirely since all code has been migrated to canonical locations.

### Step 10.1: List Remaining Plugin Files
```bash
find src/plugins -type f -name "*.ts" -o -name "*.tsx" | head -20
```

**Expected:** Should list only plugin wrapper files (`plugin.ts`, `index.ts`) and any config files not yet migrated.

### Step 10.2: Remove Plugin Directories

For each domain that's been fully migrated:
```bash
# Verify directory is empty (no .ts files)
find src/plugins/accounting -name "*.ts" | wc -l  # Should be 0 or only plugin.ts/index.ts

# Delete the entire plugins directory
rm -rf src/plugins/
```

### Step 10.3: Clean Up Any Remaining Refs

Check if any `src/plugins/` imports remain:
```bash
grep -r "from.*src/plugins" src/ --include="*.ts" --include="*.tsx"
```

**Expected:** 0 results (all should have been updated in Phase 8).

### Step 10.4: Verify Git Status
```bash
git status
```

Expected deletions:
- All of `src/plugins/` directory tree
- ~295 files removed
- Modifications to `src/payload.config.ts`, collection indexes, import statements

---

## Phase 11: Verification

**Goal:** Run full type checking, standards compliance, build, and dev server to confirm the refactor is complete and correct.

### Step 11.1: Local Type Check
```bash
pnpm typecheck
```

**Expected:** 0 errors  
**If errors:** Review import paths; ensure all `@/` aliases resolve correctly

### Step 11.2: Standards Compliance
```bash
pnpm standards:check
```

**Expected:** All JSDoc standards present; no new violations  
**If failures:** Review any files that lost their standard annotations during migration

### Step 11.3: Build
```bash
pnpm build
```

**Expected:** Builds successfully; no bundle errors  
**If errors:** Check for missing dependencies or circular imports

### Step 11.4: Dev Server (Runtime Validation)
```bash
pnpm dev
```

**Expected:**
- Server starts without errors
- Admin dashboard loads at `http://localhost:3000/admin`
- Collections appear in sidebar (Accounting, Receivables, Payables, Parties, Export, Auth, Dimensions)
- No 404 errors in console
- Tenant isolation works (test by creating a user in one tenant, verify they can't see other tenant data)

### Step 11.5: Smoke Tests (Optional but Recommended)

If you have integration tests:
```bash
pnpm test:integration
```

Manually verify:
1. **Create Invoice** (Receivables) → should appear in Accounting's AR Aging Report
2. **Create Bill** (Payables) → should appear in Accounting's AP Aging Report
3. **Export to SAF-T** → should include all tenant's data correctly scoped
4. **Multi-tenant isolation** → Log in as User A (Tenant 1), verify can't see Tenant 2 data

---

## Summary of Changes

| Phase | Task | Status |
|-------|------|--------|
| 1–8 | File movement + import updates | ✅ Complete (user confirmed) |
| 9 | payload.config.ts refactor | 🔄 In Progress |
| 10 | Remove plugin boilerplate | ⏳ Pending |
| 11 | Verify build & runtime | ⏳ Pending |

---

## Rollback Plan (If Needed)

If verification fails at any point:
1. `git checkout src/payload.config.ts` (restore backed-up version)
2. `git restore src/` (restore all import changes)
3. `git status` to verify clean state
4. Identify the blocker and fix

---

## Success Criteria

✅ All Phases Complete When:
- `pnpm typecheck` returns 0 errors
- `pnpm standards:check` shows no new violations
- `pnpm build` produces a valid bundle
- `pnpm dev` starts server and collections load
- No `@/plugins/*` imports remain in codebase
- `src/plugins/` directory deleted
- All 295+ collections accessible in canonical locations
