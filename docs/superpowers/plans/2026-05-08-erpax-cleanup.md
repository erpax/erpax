# ERPAX Codebase Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce codebase file count by 25-30% while maintaining 100% functionality and test coverage through intelligent consolidation of redundant files and shared infrastructure.

**Architecture:** Phase-based cleanup starting with infrastructure (lowest-risk), moving through plugins (accounting→inventory→hr/reporting/export), ending with verification. Each phase maintains passing tests and git history.

**Tech Stack:** TypeScript, Vitest, Payload CMS, existing seed/validator infrastructure

---

## Phase 1: Testing Infrastructure Consolidation

### Task 1: Merge Config Discovery Types into Config Discovery

**Files:**
- Modify: `src/testing/config-discovery.ts`
- Delete: `src/testing/config-discovery-types.ts`
- Update: `src/testing/index.ts` (exports)

**Exact Task Description:**
Merge type definitions from config-discovery-types.ts into config-discovery.ts at the top of the file, then delete the now-redundant types file. Update src/testing/index.ts to remove the config-discovery-types export. Run tests to verify no breakage.

**Context:**
Currently config-discovery has types scattered in a separate file. This creates unnecessary file splitting. Consolidating them reduces file count by 1 and improves discoverability.

---

### Task 2: Extract Validators into Dedicated Module

**Files:**
- Create: `src/testing/validators.ts`
- Modify: `src/testing/config-discovery.ts` (import validators)
- Modify: `src/testing/test-seed-factory.ts` (import validators)

**Exact Task Description:**
Create new src/testing/validators.ts with all 8 field validators (text, email, number, integer, date, boolean, select, relationship), type coercion rules, relationship constraint validation, enum validation, and access control validation. Update config-discovery.ts to import and use validateAndCoerce. Update test-seed-factory.ts imports. Verify tests pass.

**Context:**
Validation logic is scattered across config-discovery and test-seed-factory. Extracting to dedicated module makes it reusable and follows DRY principle. All validators share common patterns that should be centralized.

---

### Task 3: Create Shared Test Fixtures

**Files:**
- Create: `tests/testing/fixtures.ts`
- Modify: Plugin test files (import fixtures, optional)

**Exact Task Description:**
Create tests/testing/fixtures.ts with fixture constants for users, currencies, GL accounts, companies, departments, locations, vendors, items. Include helper functions: createUniqueId (for parallel test execution), createDateRange (for test periods), createBalancedEntry (for GL transactions). These fixtures should be imported and used by seed classes and tests to eliminate duplicate data definitions.

**Context:**
Test data is duplicated across seeds and tests. Fixtures module provides single source of truth, making it easier to maintain consistent test data and reduce code duplication across all plugins.

---

### Task 4: Update src/testing Index Exports

**Files:**
- Modify: `src/testing/index.ts`

**Exact Task Description:**
Update src/testing/index.ts to export from the consolidated config-discovery (includes types), validators, and test-seed-factory. Remove config-discovery-types export. Verify imports still work across entire codebase.

**Context:**
After merging config-discovery-types and extracting validators, index exports need to reflect new module structure.

---

## Phase 2: Accounting Plugin Consolidation

### Task 5: Consolidate Level 1 Accounting Seeds

**Files:**
- Create: `plugins/accounting/seeds/level-1/level-1.ts` (consolidate all classes)
- Delete: `plugins/accounting/seeds/level-1/minimal-*.ts` (all minimal seed files)
- Modify: `plugins/accounting/seeds/level-1/index.ts`

**Exact Task Description:**
Consolidate all Level 1 seed classes (MinimalHostSeed, MinimalGLAccountsSeed, MinimalUsersSeed, MinimalCurrencyRatesSeed) and Level1SeedSuite into single level-1.ts file. Each class maintains its own responsibility but lives in one file. Delete all individual minimal-*.ts files. Update index.ts to export from level-1.ts. Run level-1 tests and verify all pass.

**Context:**
Level 1 seeds are scattered across 4-5 individual files. Consolidating into one file per level reduces file count by 80% while maintaining logical separation between level 1, 2, and 3. Setup is <500ms per seed.

---

### Task 6: Consolidate Level 2 Accounting Seeds

**Files:**
- Create: `plugins/accounting/seeds/level-2/level-2.ts`
- Delete: Existing split Level 2 files (if any)
- Modify: `plugins/accounting/seeds/level-2/index.ts`

**Exact Task Description:**
Consolidate all Level 2 seed classes (JournalEntrySeed, AccountingCycleSeed, MultiCurrencySeed, RoleScopedDataSeed) and Level2SeedSuite into single level-2.ts file. Delete individual seed files. Update index.ts. Run level-2 tests (20+ tests) and verify all pass.

**Context:**
Similar consolidation as Level 1. Level 2 has 2-5s setup time with realistic workflows.

---

### Task 7: Consolidate Level 3 Accounting Seeds

**Files:**
- Rename: `plugins/accounting/seeds/level-3/e2e-accounting-seeds.ts` → `plugins/accounting/seeds/level-3/level-3.ts`
- Modify: `plugins/accounting/seeds/level-3/index.ts`

**Exact Task Description:**
Rename e2e-accounting-seeds.ts to level-3.ts for naming consistency with Levels 1-2. Update level-3/index.ts. Run level-3 tests (40+ tests) and verify all pass.

**Context:**
Level 3 is already consolidated in e2e-accounting-seeds.ts. Just rename for consistency.

---

### Task 8: Update Accounting Seeds Root Index

**Files:**
- Modify: `plugins/accounting/seeds/index.ts`

**Exact Task Description:**
Update plugins/accounting/seeds/index.ts to export all Level 1, 2, 3 seed classes from consolidated files. Verify all imports resolve. Run all accounting tests (100+ total) and confirm all pass.

**Context:**
Root index needs to reference new consolidated files.

---

## Phase 3: Inventory, HR, Reporting, Export Plugins

### Task 9: Consolidate Inventory Seeds

**Files:**
- Consolidate: `plugins/inventory/seeds/level-1/`, level-2/, level-3/
- Follow same pattern as accounting

**Exact Task Description:**
Following the exact same consolidation pattern as accounting: Consolidate level-1/* files into level-1.ts, level-2/* into level-2.ts, level-3/* into level-3.ts. Update inventory/seeds/index.ts. Delete redundant index files. Run inventory tests (75+ total) and verify all pass.

**Context:**
Inventory uses optimal-* naming convention. Consolidate while preserving semantic meaning.

---

### Task 10: Consolidate HR Seeds

**Files:**
- Consolidate: `plugins/hr/seeds/level-1/`, level-2/, level-3/

**Exact Task Description:**
Same consolidation pattern: level-1.ts, level-2.ts, level-3.ts. Update index. Run hr tests (65+ tests) and verify all pass.

**Context:**
HR plugin has 20+ employees, 5+ departments, payroll cycles, benefits.

---

### Task 11: Consolidate Reporting Seeds

**Files:**
- Consolidate: `plugins/reporting/seeds/level-1/`, level-2/, level-3/

**Exact Task Description:**
Same consolidation pattern: level-1.ts, level-2.ts, level-3.ts. Update index. Run reporting tests (75+ tests) and verify all pass.

**Context:**
Reporting has 6 templates, multi-format exports, consolidated statements.

---

### Task 12: Consolidate Export Seeds

**Files:**
- Consolidate: `plugins/export/seeds/level-1/`, level-2/, level-3/

**Exact Task Description:**
Same consolidation pattern: level-1.ts, level-2.ts, level-3.ts. Update index. Run export tests (80+ tests) and verify all pass.

**Context:**
Export plugin covers PDF, Excel, CSV, JSON, HTML, XML formats plus 8 API types.

---

## Phase 4: Final Cleanup & Verification

### Task 13: Remove Redundant Index Files

**Files:**
- Delete: All redundant level-*/index.ts in seed directories

**Exact Task Description:**
Remove all level-*/index.ts files that are now redundant after consolidating into level-*.ts files. Keep only plugin-root seeds/index.ts that exports all levels. Verify imports still resolve. Run full test suite on all plugins.

**Context:**
After consolidation, individual level index files are redundant. Only root plugin seeds/index.ts is needed.

---

### Task 14: Run Full Test Suite

**Files:**
- All test files across entire codebase

**Exact Task Description:**
Run complete test suite: `npm run test:int` covering infrastructure (120+ tests), accounting (100+ tests), inventory (75+ tests), hr (65+ tests), reporting (75+ tests), export (80+ tests). Verify all 400+ tests pass. Check for no skipped tests. Capture coverage summary.

**Context:**
Final verification that all 400+ tests pass and no functionality is broken. This is the key checkpoint for cleanup success.

---

### Task 15: Generate Cleanup Summary & Documentation

**Files:**
- Create: `docs/CLEANUP_SUMMARY.md`

**Exact Task Description:**
Create comprehensive cleanup summary document showing file reduction stats, consolidation details, test results, changes made, files deleted/created, verification checklist. Document the before/after file counts and percent reduction achieved. Include next steps.

**Context:**
Documentation of work completed for future reference and verification.

---

## Summary

**Complete cleanup plan:**
- Phase 1: 4 tasks (infrastructure)
- Phase 2: 4 tasks (accounting plugin)
- Phase 3: 4 tasks (inventory/hr/reporting/export plugins)
- Phase 4: 3 tasks (final verification)
- **Total: 15 tasks**

**Target Results:**
- File count: ~35 → ~22 (37% reduction)
- Test coverage: 400+ tests, all passing
- Functionality: 100% maintained
- Code quality: DRY, consolidated, cleaner

