# Accounting Plugin

**Domain**: General ledger, financial statements, closing, tax, cost centers.

**Status**: Foundational structure (Phase 1.1) — minimal barrel exports, full implementation in Phases 2–5.

---

## Purpose

The Accounting plugin implements the complete financial ledger and reporting domain. It provides:

- **GL Master Data**: Chart of accounts (GL accounts, expense types, revenue types)
- **Journal Entries**: Recording, reversal, and audit trail of transactions
- **Financial Statements**: Period closing, consolidation, reporting
- **Tax Compliance**: Tax calculations, withholding, reporting per jurisdiction
- **Cost Centers**: Cost allocation, profit center analysis, budgeting
- **Audit Trail**: Complete immutable record of all changes (SOX §404)

---

## Type Hierarchy

Standards (read-only) → Domain Entity → Request/Response → Validators → Services → Hooks → Components

### Standards

- **SAF-T 2.0** (`src/standards/saf-t/`) — Master data, journals, GL accounts
- **ISO-20022:2013** (`src/standards/iso-20022/`) — Payment workflows, statements
- **IFRS-16** (referenced) — Financial reporting, revenue recognition, lease accounting
- **ISO-8601** (referenced) — Date/time formatting
- **ISO-4217** (referenced) — Currency codes

### Domain Entities

- `GLAccount` — Chart of accounts (extends SAF-T master account)
- `Journal` — Journal register (extends SAF-T journal)
- `JournalLine` — Journal entry line (extends SAF-T line)
- `FinancialStatement` — Period financial statement (extends IFRS formats)
- `TaxStatement` — Tax filing (extends jurisdiction-specific rules)
- `CostCenter` — Cost allocation dimension

### Request/Response Types

- `CreateGLAccountRequest` → `GLAccountResponse`
- `CreateJournalRequest` → `JournalResponse`
- `PostJournalEntryRequest` → `PostJournalEntryResponse`
- `ClosePeriodRequest` → `ClosePeriodResponse`

### Validators

- `validateGLAccount()` — GL account structure + compliance
- `validateJournal()` — Journal structure, balance, audit rules
- `validatePostJournal()` — Journal posting pre-conditions
- `validateClosePeriod()` — Period closing pre-conditions

### Services

- `glAccountService.create()` — Create GL account
- `journalService.post()` — Post journal entry (debit/credit balance check)
- `journalService.reverse()` — Reverse posted entry
- `statementService.generate()` — Generate financial statement
- `closingService.closePeriod()` — Close accounting period

### Hooks

**Payload Hooks** (collection lifecycle):
- `beforeChange` — Validate + apply business rules before DB write
- `afterChange` — Trigger downstream events (post to GL, recalculate statements)
- `afterRead` — Enrich GL account with period balances, cost center names

**React Hooks**:
- `useGLAccount(id)` — Fetch single GL account with balances
- `useGLAccounts()` — List GL accounts with filtering
- `useJournal(id)` — Fetch single journal entry with audit trail
- `useJournals(filter)` — List journal entries
- `useStatement(id)` — Fetch financial statement

### Components

- `GLAccountForm` — Create/edit GL account (shadcn inputs)
- `GLAccountTable` — List GL accounts with status + balance
- `JournalForm` — Create/post journal entry
- `JournalTable` — List journal entries with audit trail
- `StatementViewer` — Display financial statement

---

## Folder Structure

```
src/plugins/accounting/
├── collections/          # Payload collection definitions
│   └── index.ts         # Export { GLAccounts, Journals, ... }
├── types/               # Domain entity types (extend standards)
│   ├── index.ts         # Export all types
│   ├── gl-account.ts    # GLAccount domain entity
│   ├── journal.ts       # Journal domain entity
│   └── errors.ts        # Domain-specific error types
├── validators/          # Business rule validation
│   ├── index.ts         # Export all validators
│   ├── gl-account.ts    # GL account validation
│   └── journal.ts       # Journal validation
├── services/            # Business logic
│   ├── index.ts         # Export all services
│   ├── gl-account.service.ts  # GL account CRUD
│   └── journal.service.ts     # Journal posting/reversal
├── access/              # Payload access control
│   ├── index.ts         # Export all access rules
│   ├── gl-account.ts    # GL account collection access
│   └── journal.ts       # Journal collection access
├── hooks/               # Payload + React hooks
│   ├── index.ts         # Export all hooks
│   ├── payload.ts       # Payload beforeChange, afterChange
│   ├── use-gl-account.ts # React: fetch GL account
│   └── use-journal.ts   # React: fetch journal entry
├── components/          # shadcn React components
│   ├── index.ts         # Export all components
│   ├── gl-account-form.tsx  # Create/edit GL account
│   └── journal-form.tsx     # Create/post journal entry
├── plugin.ts            # Payload plugin factory
├── index.ts             # Public API
└── README.md            # This file
```

---

## Standards Citations

All files in this plugin cite the standards they implement:

```typescript
/**
 * GL Account collection.
 * 
 * @standard SAF-T:2.0 master-account-list
 * @standard ISO-20022:2013 account-structure
 * @accounting IFRS-16 chart-of-accounts
 */
```

Run `pnpm standards:check` to validate all citations.

---

## Cross-Plugin Communication

The Accounting plugin **does not import** from Receivables, Payables, or other plugins.

Instead, cross-domain flows use:

1. **Payload Relationships** — Invoices reference GL accounts via `relationTo: 'gl-accounts'`
2. **MCP Tools** — Orchestrate workflows: `createInvoiceWithAccounting()` calls both receivables + accounting services
3. **Shared Hooks** — Global `beforeChange` in `src/plugins/hooks/` coordinates multi-domain state

Example: When an invoice posts in Receivables, a shared hook (not accounting code) calls `accountingService.postInvoice()`.

---

## Phase Roadmap

**Phase 1.1** (THIS TASK): Create folder structure + barrel exports  
**Phase 2**: Add domain entity types (GLAccount, Journal) extending SAF-T  
**Phase 3**: Add React hooks + shadcn components  
**Phase 4**: Add access control + middleware  
**Phase 5**: Add tests + documentation  

---

## References

- **Payload CMS Plugins**: https://payloadcms.com/docs/plugins
- **SAF-T Specification**: https://www.oecd.org/en/publications/standard-audit-file-tax-saft_5bf58ab7-en.html
- **ISO-20022**: https://www.iso.org/standard/81090.html
- **IFRS-16**: https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/
- **ERPax Architecture**: `docs/PLUGIN_ARCHITECTURE.md`
- **ERPax Standards**: `docs/STANDARDS.md`

---

**Last Updated**: 2026-05-12  
**Owner**: Claude (Agent)  
**Status**: Ready for Phase 2 (Type Coverage)
