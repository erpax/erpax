# Architecture Delivery Summary

**Date**: 2026-05-12  
**Status**: Specification Complete, Ready for Implementation  
**Deliverables**: 3 specification documents + memory entry

---

## What Was Delivered

### 1. PLUGIN_ARCHITECTURE.md (Core Specification)

**Location**: `docs/PLUGIN_ARCHITECTURE.md`  
**Length**: ~800 lines  
**Purpose**: Authoritative specification for how ERPax plugins are organized and structured

**Covers**:
- Plugin philosophy (bounded domains, autonomy, standards as reference)
- Standard directory structure for all plugins
- File anatomy for each layer (collections, types, validators, services, fields, hooks, components, access, middleware, plugin.ts, index.ts)
- Type hierarchy and flow (standards → domain → request/response → validators → services → hooks → components)
- Cross-plugin communication patterns (allowed: relationships, shared hooks, MCP tools; forbidden: direct service imports)
- Standards integration and citation via JSDoc
- UUID wiring strategy
- App layer minimalism (src/app/ is routing/layout only)
- Implementation roadmap (5 phases, 7 weeks)
- Checklists for creating plugins and implementing collections/hooks/components
- Standards mapping matrix

**Key Sections**:
- § 2: Standard layout with folder structure and brief descriptions
- § 4: Type hierarchy visual + code examples
- § 5: Cross-plugin communication patterns
- § 9: Implementation roadmap with specific Phase 1–5 breakdown

**When to Use**: Reference this when:
- Creating a new plugin
- Refactoring existing plugin structure
- Deciding where to put code (service vs. component vs. validator)
- Understanding type layering
- Planning cross-plugin coordination

---

### 2. PLUGIN_MIGRATION_GUIDE.md (Step-by-Step Instructions)

**Location**: `docs/PLUGIN_MIGRATION_GUIDE.md`  
**Length**: ~600 lines  
**Purpose**: Concrete step-by-step instructions for migrating plugins to standard structure

**Covers**:
- Phase 1: accounting/ plugin reorganization (as template)
  - Creating directories (types/, validators/, access/, components/)
  - Creating domain entity types extending standards
  - Creating validators (validation logic)
  - Creating access control rules
  - Creating components
  - Creating React hooks
  - Updating collections to use validators + access
  - Updating index.ts (public API)

- Phase 2: Migrating flat plugins (receivables/, payables/, parties/)
  - Pattern walkthrough for receivables/
  - Creating collections/, types/, validators/, services/, components/, hooks/, plugin.ts, index.ts

- Phase 3: Minimal plugins (auth/, dimensions/, mcp/)
  - Expanding from current state to full structure

- Phase 4: Verification (typecheck, standards:check, standards:required)

**Checklists**: Per-plugin and project-wide completion checklist

**When to Use**: Follow this when:
- Starting to reorganize a plugin (e.g., "I'm reorganizing receivables/, what's the first step?")
- Creating a new plugin from scratch
- Migrating code from one folder structure to another

---

### 3. TYPE_HIERARCHY_EXAMPLES.md (Working Examples)

**Location**: `docs/TYPE_HIERARCHY_EXAMPLES.md`  
**Length**: ~700 lines  
**Purpose**: Concrete working examples showing the full type flow from standards to React components

**Example 1: Invoice (EN-16931 → Receivables)**

1. Standard Type (en-16931/types.ts) — Read-only `En16931Invoice` interface
2. Domain Entity (receivables/types/invoice.ts) — Extends `En16931Invoice` with tenant, status, audit fields
3. Request/Response Types (types/request.ts) — `CreateInvoiceRequest`, `UpdateInvoiceRequest`, `InvoiceResponse`
4. Validators (validators/invoice.ts) — `validateInvoice()`, `validateCreateInvoiceRequest()`
5. Services (services/invoice.service.ts) — `createInvoice()`, `calculateInvoiceTotals()`, etc.
6. React Hook (hooks/use-invoice.ts, use-invoices.ts) — `useInvoice(id)`, `useInvoices(options)`
7. shadcn Component (components/invoice-form.tsx) — Renders form with typed props

**Example 2: GL Account (IFRS → Accounting)**

Same flow but for chart of accounts.

**Each Example Shows**:
- Exact TypeScript code (copy-paste ready)
- How standard is read-only
- How domain entity extends standard
- How validators enforce rules
- How services calculate
- How hooks fetch data
- How components render with full type safety

**When to Use**: Reference when:
- Implementing a new entity type
- Uncertain about how types flow from standards to components
- Need a working template to copy

---

## Standards Referenced

### EN-16931:2017 (Invoice)
- Types: `src/standards/en-16931/types.ts` (already fixed with readonly)
- Collections: `Invoices` (receivables plugin)
- Components: `InvoiceForm`, `InvoiceTable`
- JSDoc: `@standard EN-16931:2017 invoice`

### SAF-T 2.0 (Audit File)
- Types: `src/standards/saf-t/types.ts` (already fixed with readonly)
- Collections: Accounting GL, journal exports
- Services: SAF-T export generator
- JSDoc: `@standard SAF-T 2.0 standard-audit-file-tax`

### ISO-20022 (Financial Industry Messages)
- Types: `src/standards/iso-20022/types.ts` (already fixed with readonly)
- Collections: Payment transfers, statements, returns
- JSDoc: `@standard ISO-20022:2022 universal-financial-industry-message-scheme`

### UN-EDIFACT (EDI)
- Types: `src/standards/un-edifact/types.ts` (already fixed with readonly)
- Collections: Interchange, invoice messages
- JSDoc: `@standard UN-EDIFACT D.96A invoice-message`

All standards types are **read-only** (595+ fields with `readonly` modifier).

---

## Implementation Roadmap (5 Phases, 7 Weeks)

### Phase 1: Structure Refactor (Week 1)
- Move accounting/ collections/ files into subdirectories
- Create types/, validators/, services/, components/ folders in each plugin
- Organize receivables/, payables/, parties/ into directory structure

### Phase 2: Type Coverage (Week 2–3)
- Add domain entity types extending standards
- Add request/response types
- Add error types
- Add validators for each entity

### Phase 3: React Hooks & Components (Week 4–5)
- Add React hooks (useEntity, useEntities)
- Build shadcn components
- Test hooks + components in dev

### Phase 4: Access Control & Middleware (Week 6)
- Add access/ folder with role-based rules
- Add middleware/ folder
- Wire access control into collections

### Phase 5: Testing & Documentation (Week 7)
- Add tests for validators, services, hooks
- Update README.md in each plugin
- Document plugin-to-plugin patterns
- Verify standards citations

---

## Immediate Next Steps (For User)

### Step 1: Review Architecture Docs (30 min)

Read in this order:
1. `docs/PLUGIN_ARCHITECTURE.md` § 1–3 (philosophy + structure + anatomy)
2. `docs/TYPE_HIERARCHY_EXAMPLES.md` (working example: Invoice)
3. `docs/PLUGIN_MIGRATION_GUIDE.md` (Phase 1: accounting/)

### Step 2: Decide Scope

Choose one of:
- **Option A**: Migrate accounting/ plugin first (full template)
- **Option B**: Start with receivables/ (flat → structured)
- **Option C**: Create a new minimal plugin first (to test pattern)

Recommendation: **Option A** (accounting/ as template, then apply to others)

### Step 3: Execute Phase 1 (Structure Refactor)

Following `docs/PLUGIN_MIGRATION_GUIDE.md` § Phase 1:

1. Create `src/plugins/accounting/{types,validators,access,components}` directories
2. Create `types/index.ts` with domain entity type extensions
3. Create `validators/index.ts` with validation functions
4. Create `access/index.ts` with access control rules
5. Create `components/index.ts` with shadcn components
6. Update collections to use validators + access
7. Update `accounting/index.ts` (public API)
8. Run `pnpm typecheck` to verify

### Step 4: Verify

```bash
# Verify structure
find src/plugins/accounting -maxdepth 1 -type d | sort

# Verify types
pnpm typecheck

# Verify standards citations
pnpm standards:check
pnpm standards:required
pnpm standards:verify-index

# Test in dev
pnpm dev
```

### Step 5: Apply Pattern to Other Plugins

Once accounting/ is done, apply same pattern to:
- receivables/ (Week 1–2)
- payables/ (Week 2)
- parties/ (Week 2)
- auth/, dimensions/, mcp/ (Week 3)

---

## Success Criteria

✓ All plugins follow `PLUGIN_ARCHITECTURE.md` § 2.1 folder structure  
✓ All entities have domain types extending standards  
✓ All collections cite standards via `@standard` JSDoc  
✓ `pnpm standards:verify-index` passes  
✓ `pnpm typecheck` passes with no errors  
✓ All React hooks return typed objects with `{ data, loading, error, refetch }`  
✓ All shadcn components accept typed props  
✓ App layer (`src/app/`) is 100% thin routing/layout (no business logic)  
✓ No direct service imports between plugins  

---

## Files to Keep Nearby

During implementation, reference these in order:

1. **docs/PLUGIN_ARCHITECTURE.md** — "Where do I put this code?"
2. **docs/PLUGIN_MIGRATION_GUIDE.md** — "How do I organize this plugin?"
3. **docs/TYPE_HIERARCHY_EXAMPLES.md** — "What should this type look like?"
4. **docs/STANDARDS.md** — "Which standard applies here?"

---

## Key Decisions Captured

**Q: Why split standards from domain?**  
A: Standards are immutable reference contracts (read-only, no business logic). Domain plugins extend them, never duplicate.

**Q: Why full type hierarchy (standards → entity → request → validator → service → hook → component)?**  
A: Type safety at every layer prevents bugs. Compile-time enforcement beats runtime checks.

**Q: Why no direct service imports between plugins?**  
A: Maintains plugin autonomy. Cross-plugin coordination goes through Payload relationships, shared hooks, or MCP tools.

**Q: Why keep app/ minimal?**  
A: Keeps codebase navigable. Plugins can grow independently without bloating app layer.

**Q: Why JSDoc citations?**  
A: Standards become part of version control. `bash scripts/standards-citation-index.sh` verifies all code cites the standards it implements.

---

## References

- **Payload Plugin Architecture**: https://payloadcms.com/docs/plugins
- **Project Standards**: `docs/STANDARDS.md`
- **Memory Entry**: `memory/erpax_plugin_architecture_2026-05-12.md`

---

## Approval

**Status**: Ready for implementation  
**Last Updated**: 2026-05-12  
**Prepared By**: Claude (Agent)  
**Awaiting**: User review and implementation kickoff

---
