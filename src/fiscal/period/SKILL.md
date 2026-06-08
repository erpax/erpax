---
name: period
description: Use when implementing or referencing Fiscal Period Standard.
atomPath: fiscal/period
coordinate: fiscal/period · 1/base · 86a77c31
contentUuid: "fbeddd06-0130-5f06-9ae0-01e3dea5e2b8"
diamondUuid: "af561fe7-4593-8254-a824-55b3b194a370"
uuid: "86a77c31-a345-8618-a651-5dd2a4015483"
horo: 1
bonds:
  in:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
  out:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
typography:
  partition: fiscal
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR:2016/679 Art. 32 Security of processing"
  - "IAS-34"
  - "IAS-34:2023 Interim Financial Reporting"
  - "ISO-4217:2023 Currency codes"
  - "ISO-8601:2019 Date/Time representation"
  - "NIST-SP-800-63"
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
    - law
  matrix:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
  backlinks:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
signatures:
  computationUuid: "f83c3cb9-561f-8e0f-b7c7-b07f32b1534a"
  stages:
    - stage: path
      stageUuid: "43d2a82b-4cc1-8c35-98fd-4b088ad6b0dc"
    - stage: trinity
      stageUuid: "2d2c753a-b1ae-894e-908b-02e162b3b593"
    - stage: boundary
      stageUuid: "ba8ae51b-6df7-8689-b62b-7ea709e2682c"
    - stage: links
      stageUuid: "e0a2eb50-ddcf-8b0a-b156-a3644b939b67"
    - stage: horo
      stageUuid: "914175df-9706-80d9-8c71-b89bedef7943"
    - stage: seal
      stageUuid: "e088a7d9-7200-8e03-9a8b-3dd6e3ab2989"
    - stage: uuid
      stageUuid: "b8d36a6a-7640-8a90-9888-f8a7613ffb19"
version: 2
---
# Fiscal Period Standard

**Publisher:** International Accounting Standards Board (IASB), OECD, ISO, W3C  
**Editions Implemented:**
- IAS 34:2023 (Interim Financial Reporting)
- ISO 8601:2019 (Date and time representation)
- ISO 4217:2023 (Currency codes)
- SAF-T 3.0.2 (Standard Audit File for Tax)
- XBRL GL (General Ledger)
- NIST SP 800-92 (Audit logging)
- GDPR Article 32 (Security of processing)
- eIDAS 2014/910/EU (Electronic signatures)
- SOX Section 404 (Internal control assessment)

## Purpose

Fiscal period flexibility enables tenants to:
- Define custom fiscal year start dates (not January 1)
- Support multiple period structures: monthly, quarterly, weekly, ISO-week, retail 4/4/5, custom
- Align with regulatory frameworks: IAS/IFRS, US GAAP, SAF-T, XBRL
- Handle non-gregorian calendars (Islamic, Hebrew)
- Trace all configuration amendments via immutable chain

## In Scope

- FiscalPeriods: Fiscal year structure configuration
- FiscalCalendars: Pre-computed lookup table (date → fiscal year/period)
- FiscalPeriodSnapshots: Audit snapshots at configuration change moments
- FiscalPeriodResolver: Service for period resolution + calendar generation
- Hooks: Period validation on GL postings, calendar regeneration on amendment
- Chain leaf UUIDs: Law 60 immutable audit trail for each fiscal configuration
- Governance scope: Law 63 self-governance metadata
- Regulatory codes: SAF-T period coding (P01_2026, Q2_2026, etc.)

## Out of Scope

- Period-specific financial statement generation (belongs in reporting domain)
- Foreign exchange revaluation timing (belongs in currency domain)
- Tax period alignment (belongs in tax domain, may reference fiscal periods)
- ISO 27001 certification (data security framework, not fiscal periods)
- Non-gregorian calendar computation libraries (use existing libraries, we provide extension points)

## Technical Details

### FiscalPeriods Collection
- Stores fiscal configuration per entity
- Fields: fiscalYearStartMonth, fiscalYearStartDay, periodType, regulatoryFramework, governanceScope, chainLeafUuid
- Hooks: beforeChange validates boundaries, computes chainLeafUuid
- Access: Read to finance/accountant/audit-staff, create/update to admin, delete to superadmin

### FiscalCalendars Collection
- Denormalized lookup table: one row per calendar date
- Fields: calendarDate (indexed), fiscalYear, fiscalPeriod, periodLabel, regulatoryCode, weekNumber, quarterNumber, monthNumber, dayOfWeek, isLeapAdjusted, chainLeafUuid
- Generated by FiscalPeriodResolver.generateCalendar() based on FiscalPeriods config
- Used by GL posting validation for O(1) period resolution
- Immutable after generation; regenerate via FiscalPeriods amendment

### FiscalPeriodSnapshots Collection
- Immutable audit snapshots at configuration change moments
- Fields: snapshotData (JSON), eventType (creation, amendment, validation, closing, regulatory-audit), changes (JSON diff), signedUuid (optional eIDAS signature)
- Used to prove fiscal config state at audit moments
- Creates chain link to prior snapshot for diff analysis

### FiscalPeriodResolver Service
Methods:
- `resolvePeriod(config, calendarDate)` → PeriodResolution (fiscalYear, fiscalPeriod, periodLabel, regulatoryCode, chainLeafUuid, etc.)
- `generateCalendar(config, startYear, endYear)` → CalendarEntry[] (bulk-generate fiscal calendar)
- `validatePeriodBoundary(boundaries)` → {isValid, errors[], warnings[]} (contiguity, non-overlap, sorting)
- `amendConfiguration(config, amendments, priorChainLeaf)` → amended config with new chainLeafUuid
- `validateConfiguration(config)` → {isValid, errors[]} (internal consistency)
- `registeredPeriodTypes()` → array of {type, label, description}
- `standards(periodType, countryCode, regulatoryFramework)` → {basis, regulations[], leapYearHandling}

All methods are pure (no mutation, deterministic, JSON-serializable).

### Hooks

**updateFiscalCalendarOnPeriodChange** (beforeChange on FiscalPeriods)
1. Detect if periodType, customPeriodBoundaries, or period structure changed
2. Validate configuration + boundaries
3. Prepare amendment metadata (supercedes link, notes)
4. Compute new chainLeafUuid with Law 60 audit chain
5. Set governanceScope with Law 63 metadata

**validateFiscalPeriodPosting** (beforeValidate on GLPostings)
1. Extract postingDate from GLPostings or parent JournalEntry
2. Query FiscalCalendars for (entity, calendarDate)
3. Denormalize fiscalYear, fiscalPeriod, regularoryCode, quarterNumber into posting
4. Validate against PeriodLocks: check if period locked/archived
5. Enforce period lock rules: locked → reversals/adjustments only; archived → deny
6. Compute chainLeafUuid linked to fiscal calendar chain

## Regulatory Compliance

### IAS 34 Interim Financial Reporting
- Requires quarterly reporting structure
- FiscalPeriods supports periodType=quarterly
- FiscalCalendars denormalizes quarterNumber for interim compliance
- ClosingEntries (Phase A1) integrates with fiscal periods for period-end closing

### ISO 8601 Date/Time
- All dates RFC 3339 (YYYY-MM-DDTHH:mm:ssZ)
- Week numbering: ISO 8601 week 1 = first week with Thursday
- Leap year handling: standard Gregorian; shifted (Feb 29 added to final period); custom
- FiscalCalendars.weekNumber computed per ISO 8601:2019

### ISO 4217 Currency Codes
- FiscalPeriods.currencyCode stores currency context
- FiscalCalendars inherits currency from FiscalPeriods
- GL posting validation (Phase A1) uses denormalized currency for multi-currency reconciliation

### SAF-T 3.0.2 Standard Audit File for Tax
- Period coding: P01_2026, P02_2026, ..., P12_2026 (monthly); Q1_2026, ..., Q4_2026 (quarterly)
- FiscalCalendars.regulatoryCode auto-computed from periodType + fiscalYear + fiscalPeriod
- Deterministic: same config → same regulatory codes (auditability)
- eIDAS-signed SAF-T export includes FiscalPeriodSnapshots chain for regulatory proof

### XBRL General Ledger
- Period context embedded in GL postings
- FiscalCalendars denormalizes period metadata (periodLabel, regulatoryCode) for XBRL envelope
- XBRL context instance = {periodLabel, quarterNumber, localeCode, countryCode}

### GDPR Article 32 (Security of processing)
- Audit trail: FiscalPeriodSnapshots + chainLeafUuid creates immutable record
- Access control: read to finance/accountant/audit-staff; update to superadmin only
- Encryption: all changes require createdBy/updatedBy for user accountability
- Proof of integrity: chainLeafUuid per Law 60 prevents tampering

### eIDAS 2014/910/EU Qualified Electronic Signature
- Optional signedUuid on FiscalPeriodSnapshots for regulatory audit moments
- SignedUuid envelope: {hash, signature (ECDSA), cert chain, timestamp}
- QES proof: regulatory submission of FiscalPeriodSnapshots with signed chainLeafUuid

### SOX Section 404 Internal Control Assessment
- Access control audit evidence: FiscalPeriodSnapshots with triggeredBy + triggeredAt
- Chain of evidence: priorSnapshot links create tamper-proof amendment log
- Control testing: validate that no amendments bypass approval + signature

## UUID Family Integration (Laws 8-64)

### Law 8: Content UUID
- FiscalPeriodSnapshots.snapshotData hashed via sha256(JCS-canonical(...))
- Deterministic hash enables content-addressability across federation

### Law 60: Chain
- Each FiscalCalendars + FiscalPeriodSnapshots entry has chainLeafUuid
- Computed: sha256(JCS-canonical(entry) || priorChainLeafUuid)
- Creates immutable audit chain proving no amendments were hidden

### Law 63: Self-Governance
- FiscalPeriods.governanceScope stores entity self-rule context
- Allows entities to govern themselves without central authority
- Includes: amendment authority (role list), approval requirements, audit level

### Law 62: Coverage
- Security through feature coverage: as implementation completeness → 100%, tamper-cost → ∞
- Phase B1 covers: all period structures, all regulatory frameworks, full audit trail, all standards
- Coverage = complete fiscal automation → provably tamper-resistant

## Audit Trail & Reproducibility

1. FiscalPeriods.chainLeafUuid: immutable hash of configuration
2. FiscalCalendars.chainLeafUuid: immutable hash of each calendar entry
3. FiscalPeriodSnapshots.priorSnapshot: links to previous snapshot (diff analysis possible)
4. FiscalPeriodSnapshots.signedUuid: optional eIDAS signature for regulatory proof
5. Replayability: given FiscalPeriods config + snapshot chain, fiscal calendar is reproducible

## Example Usage

```typescript
// Configure a US entity with calendar-year fiscal reporting
const config = {
  fiscalYearStartMonth: 1,
  fiscalYearStartDay: 1,
  periodType: 'monthly',
  regulatoryFramework: 'us-gaap',
  leapYearAdjustment: 'none',
  localeCode: 'en-US',
  countryCode: 'US',
}

// Resolve a posting date to its fiscal period
const resolution = FiscalPeriodResolver.resolvePeriod(
  config,
  '2026-05-12',  // May 12, 2026
)
// Result: { fiscalYear: 2026, fiscalPeriod: 5, periodLabel: 'May 2026', regulatoryCode: 'P05_2026', ... }

// Generate calendar for FY2024-2028
const calendar = FiscalPeriodResolver.generateCalendar(config, 2024, 2028)
// Result: array of 1,826+ CalendarEntry records (one per day)

// GL posting validation auto-denormalizes fiscal context
// (validateFiscalPeriodPosting hook populates: fiscalYear, fiscalPeriod, regulatoryCode, chainLeafUuid)

// Amendment: change to quarterly reporting
const amended = FiscalPeriodResolver.amendConfiguration(config, { periodType: 'quarterly' }, priorChainLeaf)
// Result: new config + new chainLeafUuid proving amendment
```

## Testing & Verification

See `tests/standards/fiscal-period/` for:
- Period resolution tests (all period types)
- Calendar generation (leap years, non-gregorian)
- Boundary validation (contiguity, non-overlap)
- Amendment chain verification (chainLeafUuid computation)
- Regulatory code determinism (SAF-T, XBRL formatting)
- Hook integration (GL posting denormalization, period lock enforcement)

## References

- [IAS 34:2023](https://www.ifrs.org/content/dam/ifrssite/standards/ias34.pdf) – Interim Financial Reporting
- [ISO 8601:2019](https://www.iso.org/standard/70908.html) – Date and time representation
- [ISO 4217:2023](https://www.iso.org/standard/64758.html) – Currency codes
- [SAF-T 3.0.2](https://www.oecd.org/tax/administration/standard-audit-file-for-tax.htm) – Standard Audit File for Tax
- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) – Internet Date/Time Format
- [NIST SP 800-92](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf) – Guide to Computer Security Log Management
- [GDPR Article 32](https://gdpr-info.eu/art-32-gdpr/) – Security of processing
- [eIDAS 2014/910/EU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014R0910) – Electronic signatures regulation
- [SOX Section 404](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001018724&type=&dateb=&owner=exclude&count=100) – Management assessment of internal controls

**Law — [[law]]: the fiscal calendar is fully reproducible from its configuration plus the immutable snapshot chain — same config yields the same regulatory codes deterministically, and every amendment is captured by a chainLeafUuid so no period change can be hidden.**
