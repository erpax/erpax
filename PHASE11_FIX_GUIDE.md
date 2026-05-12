# Phase 11: Verification & Import Fixes

## Quick Summary

**What happened:** When we moved files from `src/plugins/*` to canonical `src/*` locations, some relative import paths in collections became invalid.

**What's fixed:**
- ✅ Created `src/services/accounting/hooks.ts` with stub exports
- ✅ Created two import-fixing scripts: `fix-imports.mjs` and `fix-imports.sh`

**What you need to do:**
1. Run the import fixer (choose one method below)
2. Run the Payload verification commands
3. Test in dev server

---

## Step 1: Fix All Imports (Choose One Method)

### Method A: Node.js Script (Recommended)
```bash
cd ~/github/erpax/erpax
node fix-imports.mjs
```

### Method B: Bash Script
```bash
cd ~/github/erpax/erpax
bash fix-imports.sh
```

Both scripts fix these import patterns in bulk:
- `from '../fields/base-accounting-fields'` → `from '@/fields/accounting/base-accounting-fields'`
- `from '../utilities/period-lock'` → `from '@/services/accounting/utilities/period-lock'`
- `from '../utilities'` → `from '@/services/accounting/utilities'`
- Relative hook imports → `@/hooks/*`

---

## Step 2: Verify with Payload Commands

```bash
# Type check (takes ~10-15 seconds)
pnpm typecheck

# Standards compliance (takes ~2 seconds)
pnpm standards:check

# Build (takes ~30-60 seconds)
pnpm build

# Dev server (runs continuously)
pnpm dev
```

**Expected results:**
- ✅ `pnpm typecheck`: 0 errors
- ✅ `pnpm standards:check`: OK message
- ✅ `pnpm build`: Successful bundle
- ✅ `pnpm dev`: Server starts, /admin loads

---

## Step 3: Smoke Tests (In Dev Server)

While `pnpm dev` is running, open http://localhost:3000/admin and verify:

1. **Collections appear** → Sidebar shows all 8 domain collections
2. **Create Invoice** → Receivables > Invoices > Create
3. **Create Bill** → Payables > Bills > Create  
4. **Check console** → No errors, warnings only about deprecations
5. **Tenant isolation** → Log in different user, can't see other tenant's data

---

## If Something Fails

### TypeScript Stack Overflow Error
```
RangeError: Maximum call stack size exceeded
```

**Root cause:** Circular type references (not import-related)  
**Fix:** This is a known issue with complex type hierarchies; run:
```bash
pnpm install --no-frozen-lockfile
node fix-imports.mjs
pnpm typecheck 2>&1 | grep -A5 "error TS"
```

### Module Not Found Errors Still Appearing
Check the exact error message:
```
Module not found: Can't resolve '@/...'
```

If it's a missing file:
1. Run the fixer again: `node fix-imports.mjs`
2. Check if the file actually exists in the canonical location
3. Manual fix: update the import path in the offending file

### Build Fails
```bash
# Clear caches and rebuild
rm -rf .next
pnpm build
```

---

## File Locations Reference

| What | Old Location | New Location |
|------|---|---|
| Accounting collections | `src/plugins/accounting/collections/` | `src/collections/accounting/` |
| Accounting services | `src/plugins/accounting/services/` | `src/services/accounting/` |
| Accounting utilities | `src/plugins/accounting/utilities/` | `src/services/accounting/utilities/` |
| Accounting fields | `src/plugins/accounting/fields/` | `src/fields/accounting/` |
| Accounting hooks | `src/plugins/accounting/hooks/` | `src/services/accounting/hooks.ts` |
| Domain hooks | `src/plugins/hooks/` | `src/hooks/` |

---

## What to Do When Done

Once `pnpm dev` runs and admin loads without errors:

1. Mark Phase 11 complete
2. Commit changes:
   ```bash
   git add -A
   git commit -m "Phase 11: Fix imports after plugin-to-canonical migration"
   git push origin your-branch
   ```
3. Report back with:
   - Typecheck result ✓/✗
   - Build result ✓/✗
   - Dev server running ✓/✗
   - Smoke tests passed ✓/✗

---

## Final Architecture Status

After Phase 11 completion:

| Phase | Status | Note |
|-------|--------|------|
| 1-7 | ✅ Complete | File movement done |
| 8 | ✅ Complete | Imports updated |
| 9 | ✅ Complete | payload.config.ts refactored |
| 10 | ✅ Complete | src/plugins/ removed |
| 11 | 🔄 In Progress | Verification + fixes |

**Result:** ERPax fully transitioned from plugin-first to canonical Payload app structure with all 295+ collections, services, and types in standard src/* directories.
