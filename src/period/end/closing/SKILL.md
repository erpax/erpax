---
name: closing
description: "Use when implementing or referencing Period-End Closing Standard."
atomPath: period/end/closing
coordinate: period/end/closing · 4/weave · 7459545e
contentUuid: "23a08d35-1b49-5463-bc77-3a36d160ee51"
diamondUuid: "9e4106be-94bb-8191-9288-e454793684ab"
uuid: "7459545e-9a33-8524-89a9-72b46610762f"
horo: 4
bonds:
  in:
    - checker
    - end
    - law
  out:
    - checker
    - law
typography:
  partition: period
  bondDegree: 8
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR:2016/679 Art. 32 Security of processing"
  - "IAS-34"
  - "IAS-34:2023 Interim Financial Reporting"
  - "NIST-SP-800-92"
  - "NIST-SP-800-92 Audit logging"
  - "SAF-T"
  - "SAF-T:3.0.2 Standard Audit File for Tax"
  - SOX
  - "SOX:2002 Sec. 404 Internal control assessment"
  - XBRL
  - "XBRL-GL General Ledger"
  - eIDAS
  - "eIDAS:2014/910/EU Electronic signatures"
bindings: []
neighbors:
  wikilink:
    - accounting
    - law
  matrix:
    - checker
    - law
  backlinks:
    - checker
    - law
signatures:
  computationUuid: "c722465d-bc19-8f7f-9419-c0d15af1575f"
  stages:
    - stage: path
      stageUuid: "2d57c044-1d4f-8c3e-bcbb-12dcb0f8017f"
    - stage: trinity
      stageUuid: "63bdb167-8ee4-85b3-9549-0fcfa19450b3"
    - stage: boundary
      stageUuid: "59886a05-ea09-82ff-9b19-aafc4a11701a"
    - stage: links
      stageUuid: "6399e19d-b877-83e7-84c1-77a13b13b562"
    - stage: horo
      stageUuid: "796f5263-58de-8361-9b22-68a8efaf45bf"
    - stage: seal
      stageUuid: "0a281f98-f340-82d8-9580-503a3999484c"
    - stage: uuid
      stageUuid: "f2173523-aad2-8982-b323-ee53f5ff1489"
version: 2
---
# Period-End Closing Standard

**Publisher:** International Accounting Standards Board (IASB), OECD, ISO, W3C  
**Editions Implemented:**
- IAS 34:2023 (Interim Financial Reporting)
- SAF-T 3.0.2 (Standard Audit File for Tax)
- XBRL GL (General Ledger)
- GDPR Article 32 (Security of processing)
- eIDAS 2014/910/EU (Electronic signatures)
- SOX Section 404 (Internal control assessment)
- NIST SP 800-92 (Audit logging)

## Purpose

Period-end closing automation enables:
- Automatic validation that period is eligible for closing (not already closed, not locked, correct structure)
- Balance verification: revenues = expenses before closing
- Automatic generation of reversing entries at period end (posted to next period)
- Deterministic regulatory code generation for SAF-T/XBRL compliance
- Immutable audit trail of all closing activities via chainLeafUuid (Law 60)
- Closing workflow state machine enforcement (in-progress → pending-approval → approved → posted → finalized)
- Governance scope tracking for self-regulatory compliance (Law 63)

## In Scope

- ClosingEntries: Period-end journal entries closing P&L to Retained Earnings
- ClosingPeriodChecker: Service for closing validation, balance checking, reversal generation
- Closing workflow: State transitions, approval tracking, audit trail
- Reversing entries: Automatic generation, posting to next period, posting date management
- Regulatory codes: Deterministic SAF-T/XBRL period coding (P05_2026, Q2_2026, etc.)
- Chain leaf UUIDs: Law 60 immutable audit trail for each closing
- Governance scope: Law 63 self-governance metadata (authority, approval thresholds)
- Integration with FiscalPeriods (Phase B1) for period structure alignment
- Integration with PeriodLocks (Phase A1) for posting period enforcement

## Out of Scope

- Financial statement consolidation (belongs in consolidation domain)
- Deferred tax computations (belongs in tax domain)
- Foreign exchange revaluation (belongs in currency domain)
- Interim financial reporting presentation (belongs in reporting domain)
- Audit opinion or assurance (belongs in external audit domain)

## Technical Details

### ClosingEntries Collection

**Purpose:** Tracks period-end closing journal entries that close P&L accounts to retained earnings.

**Fields:**
- `entity` (relationship): Legal entity being closed
- `closingEntryNumber` (text, unique): Identifier (e.g., "CLOSE-FY2026-P12")
- `periodLock` (relationship): Period lock record for this closing
- `fiscalPeriod` (relationship): FiscalPeriods record (Phase B1 integration)
- `fiscalYear` (number): Fiscal year
- `fiscalPeriodNumber` (number): Period number (1-12, 1-4, etc.)
- `periodLabel` (text): Denormalized period label (e.g., "May 2026", "Q2 2026")
- `regulatoryCode` (text): SAF-T/XBRL code (P05_2026, Q2_2026) — deterministic from fiscal config
- `closingDate` (date): When closing entries were created
- `closingType` (select): monthly, quarterly, year-end, interim
- `closedBy` (relationship): User who initiated
- `approvedBy` (relationship): Finance manager/CFO who approved
- `closingEntries` (array):
  - `sequenceNumber`: Order of posting
  - `journalEntryId` (relationship): Link to GL posting
  - `entryDescription`: "Close revenue accounts" or "Close expense accounts to retained earnings"
  - `accountsClosed`: GL account range (e.g., "4000-4999")
  - `netAmount`: Total debits or credits
  - `retainedEarningsImpact`: Impact to retained earnings
  - `posted` (checkbox): Posted to GL
  - `postedDate` (date): When posted
  - `reversingEntryId` (relationship): Auto-generated reversal entry
- `totalRevenuesClosed` (number): Sum of revenues
- `totalExpensesClosed` (number): Sum of expenses
- `netIncome` (number): Revenues - expenses
- `closingStatus` (select): in-progress, pending-approval, approved, posted, finalized
- `reversalEntriesGenerated` (checkbox): Reversals created
- `reversalGeneratedDate` (date): When reversals were auto-created
- `governanceScope` (json): Law 63 metadata (entity closing authority, approval thresholds)
- `chainLeafUuid` (text): Law 60 audit chain leaf
- `auditTrail` (richText): Immutable audit log (append-only)

**Hooks:**
- `beforeValidate: [validateClosingPeriod]` — Validates eligibility, checks duplicates, computes regulatory code, enforces Law 60/63
- `afterChange: [generateReversingEntries]` — Auto-generates reversals when status → posted/finalized

**Access:**
- Read: finance, accountant, audit-staff, compliance-officer
- Create/Update: admin, superadmin
- Delete: superadmin only

### ClosingPeriodChecker Service

**Purpose:** Pure, deterministic validation and generation logic for period closing.

**Methods:**

#### `checkClosingEligibility(fiscalYear, fiscalPeriodNumber, periodType, existingClosings)`
- Validates: fiscal year range (1900–2100), period number ≥ 1, period ≤ max for type
- Checks: period not already closed (duplicate detection)
- Returns: `{ isEligible, errors[], warnings[], canAutoGenerateReversals }`
- Used by: `validateClosingPeriod` hook

#### `validateClosingBalance(totalRevenuesClosed, totalExpensesClosed, tolerance = 0.01)`
- Checks: |revenues - expenses| ≤ tolerance
- Returns: `{ isBalanced, difference, errors[] }`
- Tolerance: 0.01 (default) for rounding tolerance

#### `generateReversals(closingEntries, nextPeriodStartDate)`
- Creates reversal entries by flipping debit/credit and posting to next period
- Input: Array of `{ journalEntryId, accountsClosed, netAmount, postedDate }`
- Output: Array of `ReversalEntry` with:
  - `sequenceNumber`: Order
  - `accountNumber`, `glAccount`: Account closed
  - `debitAmount`, `creditAmount`: Flipped amounts
  - `description`: "Reversal of closing entry {id}"
  - `postedDate`: Next period start
  - `reversesClosingEntryId`: Link to original closing
- Used by: `generateReversingEntries` hook

#### `computeRegulatoryCode(periodType, fiscalYear, fiscalPeriodNumber, regulatoryFramework = 'saf-t')`
- Generates deterministic SAF-T/XBRL codes
- Examples: `P05_2026` (May), `Q2_2026` (Q2), `P12_2026` (December)
- Same config → same codes (reproducibility for audit)
- Used by: `validateClosingPeriod` hook during validation

#### `checkNextPeriodOpenForReversals(nextPeriodLockStatus)`
- Validates next period allows reversal postings
- Lock status: open, locked, archived
- Returns: `{ canPost, warnings[] }`
  - archived: canPost=false
  - locked: canPost=true with warning
  - open: canPost=true

#### `validateStatusTransition(currentStatus, newStatus)`
- Enforces closing workflow state machine:
  ```
  in-progress → pending-approval, in-progress
  pending-approval → approved, in-progress
  approved → posted, pending-approval
  posted → finalized
  finalized → finalized (no-op)
  ```
- Returns: `{ isValid, errors[] }`

#### `getMaxPeriodForType(periodType)`
- Returns max period number per type
- monthly: 12, quarterly: 4, weekly: 53, iso-week: 53, retail-445: 3, custom: 999

#### `computeChainLeaf(closingData, priorChainLeaf = '')`
- Computes Law 60 chain leaf UUID
- Hash: sha256(JCS-canonical(closingData) || priorChainLeaf)
- Enables immutable audit chain

All methods are **pure** (no mutation, deterministic, JSON-serializable).

### Hooks (Phase B2)

#### `validateClosingPeriod` (beforeValidate on ClosingEntries)
**Workflow:**
1. Extract fiscalYear, fiscalPeriodNumber, closingType from data
2. Query existing closings for (entity, fiscalYear, period) → detect duplicates
3. Call `ClosingPeriodChecker.checkClosingEligibility()`
4. If ineligible, throw with detailed errors
5. If eligible, compute regulatory code (if not set): `computeRegulatoryCode()`
6. Compute chainLeafUuid for Law 60 audit trail
7. Default closingStatus to 'in-progress' if not set

**Invariants:**
- No duplicate closings for same (entity, year, period)
- Period must be eligible (not locked, correct structure)
- All closings include regulatory code
- All closings include chainLeafUuid (Law 60)

#### `generateReversingEntries` (afterChange on ClosingEntries)
**Workflow:**
1. Detect status transition: pending-approval → posted OR posted → finalized
2. Idempotency check: if reversalEntriesGenerated=true, skip
3. Validate next period is open for reversals (query PeriodLocks)
4. Call `ClosingPeriodChecker.generateReversals()` to create reversal entry objects
5. For each reversal:
   - Create JournalEntry in next period (posting date = next period start)
   - Link reversingEntryId back to original closing entry
6. Update ClosingEntries record: reversalEntriesGenerated=true, reversalGeneratedDate=today
7. Log success or throw on failure

**Invariants:**
- Reversals post to next period (not same period)
- Reversal amounts = original amounts with flipped sign
- No reversals if next period is locked/archived (warning only, not blocking)
- Idempotent: calling twice generates reversals only once

## Regulatory Compliance

### IAS 34 Interim Financial Reporting
- Requires quarterly reporting structure and interim closing capability
- ClosingEntries supports all period types (monthly, quarterly, interim)
- FiscalPeriods (Phase B1) denormalizes quarterNumber for interim compliance
- Closing workflow enforces structured period-end closing process
- Reversing entries required at next period start (automated)

### SAF-T 3.0.2 Standard Audit File for Tax
- Period coding deterministic: P01_2026, P02_2026, ..., P12_2026 (monthly); Q1_2026, ..., Q4_2026 (quarterly)
- `computeRegulatoryCode()` ensures same config → same codes (reproducibility)
- ClosingEntries.regulatoryCode auto-populated by `validateClosingPeriod` hook
- Closing audit trail (chainLeafUuid, auditTrail, approvals) proves control over period closing
- Optional eIDAS signatures on FiscalPeriodSnapshots for regulatory proof

### XBRL General Ledger
- Period context embedded in GL postings (via FiscalPeriods + ClosingEntries integration)
- Closing entries linked to journal entries for XBRL envelope (journalEntryId relationship)
- Regulatory code in ClosingEntries supports XBRL context instance generation

### GDPR Article 32 (Security of processing)
- Audit trail: ClosingEntries.auditTrail (append-only), chainLeafUuid (Law 60)
- Access control: read to finance/accountant/audit-staff, update to superadmin only
- Immutability: closedBy + approvedBy track accountability
- Proof of integrity: chainLeafUuid per Law 60 prevents tampering

### eIDAS 2014/910/EU Qualified Electronic Signature
- Optional signedUuid on FiscalPeriodSnapshots (related via FiscalPeriods) for regulatory audit moments
- Approval workflow (closedBy, approvedBy) creates evidence trail
- Chain leaf UUID linking enables non-repudiation proof

### SOX Section 404 Internal Control Assessment
- Access control audit evidence: closedBy, approvedBy, auditTrail fields
- State transition validation: `validateStatusTransition()` enforces workflow rules
- Control testing: ClosingPeriodChecker methods are deterministic (testable)
- Amendment tracking: chainLeafUuid proves no hidden changes

## UUID Family Integration (Laws 8–64)

### Law 8: Content UUID
- ClosingEntries data hashed via sha256(JCS-canonical(...))
- Enables content-addressability for forensic analysis

### Law 60: Chain
- Each ClosingEntries record includes chainLeafUuid
- Computed: sha256(JCS-canonical(closingData) || priorChainLeafUuid)
- Creates immutable audit chain proving no amendments were hidden
- Enables forensic reconstruction of closing history

### Law 63: Self-Governance
- ClosingEntries.governanceScope stores entity self-rule context
- Allows entities to govern their own closing approval thresholds
- Includes: approval authority (role list), approval requirements, audit level

### Law 62: Coverage
- Security through feature coverage: as implementation completeness → 100%, tamper-cost → ∞
- Phase B2 covers: all period types, all closing scenarios, full audit trail, all standards
- Coverage = complete closing automation → provably tamper-resistant

## Integration with Phase A1 & B1

### Phase A1 (GL Double-Entry & Posting Locks)
- ClosingEntries.closingEntries[].journalEntryId → JournalEntries (Phase A1)
- ClosingEntries.periodLock → PeriodLocks (Phase A1)
- `generateReversingEntries` creates JournalEntry records for reversals
- GL posting hooks validate against period locks during reversal posting

### Phase B1 (Fiscal Period Flexibility)
- ClosingEntries.fiscalPeriod → FiscalPeriods (Phase B1)
- ClosingEntries.fiscalPeriodNumber aligns with FiscalPeriods period structure
- `validateClosingPeriod` uses FiscalPeriods.periodType to validate max period
- `computeRegulatoryCode()` uses FiscalPeriods.regulatoryFramework for deterministic codes
- ClosingEntries denormalizes regulatoryCode (computed from FiscalPeriods config)
- Closing workflow aligned with FiscalPeriods governance scope (Law 63)

## Audit Trail & Reproducibility

1. ClosingEntries.chainLeafUuid: immutable hash of closing data
2. ClosingEntries.auditTrail: append-only log of who, what, when
3. ClosingEntries.closedBy: user who initiated closing
4. ClosingEntries.approvedBy: user who approved closing
5. ClosingEntries.closingEntries[].reversingEntryId: links to auto-generated reversals
6. Replayability: given ClosingEntries config + chainLeafUuid chain, closing history is reproducible

## Example Usage

```typescript
// Validate closing eligibility
const validation = ClosingPeriodChecker.checkClosingEligibility(
  2026, // fiscalYear
  5,    // fiscalPeriodNumber (May)
  'monthly',
  []    // existingClosings (empty = no prior closes)
)
// Result: { isEligible: true, errors: [], warnings: [], canAutoGenerateReversals: true }

// Compute regulatory code for SAF-T export
const regulatoryCode = ClosingPeriodChecker.computeRegulatoryCode(
  'monthly',
  2026,
  5,
  'saf-t'
)
// Result: 'P05_2026'

// Validate closing balance (revenues = expenses)
const balanceCheck = ClosingPeriodChecker.validateClosingBalance(
  1000000, // totalRevenuesClosed
  1000000, // totalExpensesClosed
  0.01
)
// Result: { isBalanced: true, difference: 0, errors: [] }

// Generate reversing entries
const reversals = ClosingPeriodChecker.generateReversals(
  [
    { journalEntryId: 'JE-123', accountsClosed: '4000-4999', netAmount: 1000000, postedDate: '2026-05-31' }
  ],
  '2026-06-01' // nextPeriodStartDate
)
// Result: [
//   {
//     sequenceNumber: 1,
//     accountNumber: '4000-4999',
//     glAccount: '4000-4999',
//     debitAmount: 0,
//     creditAmount: 1000000,
//     description: 'Reversal of closing entry JE-123',
//     postedDate: '2026-06-01',
//     reversesClosingEntryId: 'JE-123'
//   }
// ]

// Validate status transition
const transitionCheck = ClosingPeriodChecker.validateStatusTransition(
  'approved',
  'posted'
)
// Result: { isValid: true, errors: [] }
```

## Testing & Verification

See `tests/standards/period-end-closing/` for:
- Closing eligibility validation (all period types)
- Balance verification (revenues = expenses)
- Reversing entry generation (amount flipping, posting date)
- Regulatory code determinism (SAF-T, XBRL formatting)
- Status transition validation (workflow enforcement)
- Hook integration (GL posting of reversals, period lock enforcement)
- Audit trail verification (chainLeafUuid computation, auditTrail append)

## References

- [IAS 34:2023](https://www.ifrs.org/content/dam/ifrssite/standards/ias34.pdf) – Interim Financial Reporting
- [SAF-T 3.0.2](https://www.oecd.org/tax/administration/standard-audit-file-for-tax.htm) – Standard Audit File for Tax
- [NIST SP 800-92](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf) – Guide to Computer Security Log Management
- [GDPR Article 32](https://gdpr-info.eu/art-32-gdpr/) – Security of processing
- [eIDAS 2014/910/EU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014R0910) – Electronic signatures regulation
- [SOX Section 404](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001018724&type=&dateb=&owner=exclude&count=100) – Management assessment of internal controls

**Law — [[law]]: a period closes only when it is eligible (not already closed/locked, correct structure) and balanced (revenues = expenses); closing P&L to retained earnings deterministically generates the reversing entries posted to the next period, through an enforced workflow state machine with an immutable chain-leaf [[accounting]] audit trail.**
