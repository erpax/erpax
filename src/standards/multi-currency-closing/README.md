# Multi-Currency Closing Standard

**Publisher:** International Accounting Standards Board (IASB), OECD, ISO  
**Editions Implemented:**
- ISO 4217:2023 (Currency codes)
- IFRS 21:2023 (Translation of foreign operations)
- IFRS 9:2023 (Foreign exchange gains/losses)
- SAF-T 3.0.2 (Standard Audit File for Tax, multi-currency)
- XBRL GL (General Ledger, multi-currency context)
- GDPR Article 32 (Security of processing)
- NIST SP 800-92 (Audit logging)

## Purpose

Multi-currency closing enables:
- Validation that closing is balanced per currency (not just consolidated)
- Automatic computation of unrealized foreign exchange gains/losses at period end
- Exchange rate tracking tied to period-end date (deterministic revaluation)
- Translation of closing entries from transaction currency to reporting currency
- Regulatory compliance with IFRS 21 (foreign operations translation)
- Audit trail for all exchange rate adjustments via chainLeafUuid (Law 60)
- Per-currency balance verification preventing currency mismatches

## In Scope

- ClosingEntries per-currency balance validation
- Exchange rate lookup at period-end date
- Unrealized FX gain/loss computation (IFRS 9)
- Translation of foreign currency closing entries to reporting currency
- ISO 4217 currency code validation (3-letter codes, decimal places)
- Multi-currency reconciliation data storage
- Integration with Phase B2 (period-end closing)
- Integration with Phase A2 (Currency framework, exchange rates)
- Chain leaf UUIDs: Law 60 immutable audit trail per reconciliation

## Out of Scope

- Functional currency determination (belongs in entity setup)
- Consolidated financial statements (belongs in consolidation domain)
- Hedging accounting (belongs in derivatives domain)
- Tax reporting translations (belongs in tax domain)
- Intra-company foreign currency transactions (belongs in transaction domain)

## Technical Details

### CurrencyReconciliation Service

**Purpose:** Validate multi-currency closing and compute exchange rate impacts.

**Methods:**

#### `validateClosingBalanceByCurrency(closingEntriesByCurrency, tolerance = 0.01)`
- Validates each currency has balanced closing entries (revenues = expenses ± tolerance)
- Input: Array of `{ currency, totalRevenuesClosed, totalExpensesClosed }`
- Output: Array of `CurrencyBalance` with per-currency balance status
- Returns: `[{ currency, totalRevenuesClosed, totalExpensesClosed, difference, isBalanced }, ...]`

#### `computeUnrealizedExchangeGainLoss(transactionCurrency, reportingCurrency, periodEndRate, transactionAmount, historicalRate)`
- Computes unrealized FX gain/loss at period end
- Original amount: transactionAmount × historicalRate (in reporting currency)
- Period-end amount: transactionAmount × periodEndRate (in reporting currency)
- Unrealized gain/loss: periodEndAmount - originalAmount
- Returns: `ExchangeRateRevaluation` with:
  - `transactionCurrency`: Original currency
  - `reportingCurrency`: Entity's reporting currency
  - `periodEndRate`: Exchange rate at period close
  - `netAmount`: Original amount in transaction currency
  - `originalAmountReportingCurrency`: Amount at historical rate
  - `unrealizedGainLoss`: Difference (gain if positive, loss if negative)
  - `description`: Narrative of revaluation

#### `reconcileMultiCurrency(closingData, reportingCurrency, exchangeRates, priorChainLeaf = '')`
- Reconciles all closing entries across currencies to reporting currency
- Input:
  - `closingData`: Closing entries with currency breakdown
  - `reportingCurrency`: Entity's functional/reporting currency
  - `exchangeRates`: Map of {transactionCurrency → periodEndRate}
  - `priorChainLeaf`: Prior Law 60 chain leaf UUID
- Output: `MultiCurrencyReconciliation` with:
  - `reportingCurrency`: Entity's reporting currency
  - `balancesByCurrency`: Per-currency balance validation
  - `allBalanced`: Boolean (true if all currencies balanced)
  - `revaluations`: Array of `ExchangeRateRevaluation` for non-reporting currencies
  - `totalUnrealizedGainLoss`: Sum of all FX gains/losses
  - `reconciliationDate`: Period-end date
  - `errors`: Array of validation errors (empty if valid)
  - `chainLeafUuid`: Law 60 chain leaf for audit trail

#### `validateCurrencyCode(currencyCode)`
- Validates 3-letter ISO 4217 currency code (e.g., USD, EUR, BGN)
- Returns: `{ isValid, decimals, errors[] }`
- Decimals per ISO 4217: USD/EUR/BGN/GBP = 2, JPY = 0, BHD/KWD/OMR/TND = 3, etc.

#### `computeChainLeaf(reconciliationData, priorChainLeaf = '')`
- Computes Law 60 chain leaf UUID for multi-currency reconciliation
- Hash: sha256(JCS-canonical(reconciliationData) || priorChainLeaf)
- Enables immutable audit chain for all reconciliations

All methods are **pure** (no mutation, deterministic, JSON-serializable).

### Hook: validateMultiCurrencyClosing (beforeValidate on ClosingEntries)

**Workflow:**
1. Check if ClosingEntries contain multiple currencies
2. If single currency, skip (delegated to validateClosingPeriod)
3. If multi-currency:
   - Query entity to get reportingCurrency
   - Query ExchangeRate collection for all transaction currencies at period-end date
   - Call `CurrencyReconciliation.reconcileMultiCurrency()`
   - Validate all currencies balanced; throw if not
   - Store reconciliation data in multiCurrencyReconciliation field
   - Update chainLeafUuid with multi-currency reconciliation included
   - Log unrealized FX gains/losses

**Invariants:**
- Closing balanced per currency (not consolidated)
- Exchange rates tied to period-end date
- All currencies must balance before posting
- Unrealized gains/losses computed per currency pair

### ClosingEntries Field Addition

**multiCurrencyReconciliation** (json type):
- Auto-populated by validateMultiCurrencyClosing hook
- Stores reconciliation results: balances per currency, revaluations, total FX gain/loss
- Enables downstream reporting on currency-specific closing impacts
- Immutable once set (part of closing record)

## Regulatory Compliance

### ISO 4217 Currency Codes
- All currencies represented in ClosingEntries must be valid ISO 4217 3-letter codes
- validateCurrencyCode() checks format + returns decimal places per standard
- Enables consistent currency representation across federation

### IFRS 21 Translation of Foreign Operations
- Foreign operations closing entries must be translated to reporting currency using period-end rates
- Unrealized gains/losses from translation recorded (IFRS 9 treatment)
- Closing reconciliation tracks all translation differences
- Exchange rates tied to period-end date for reproducibility

### IFRS 9 Foreign Exchange Gains/Losses
- Unrealized FX gains/losses computed on non-reporting-currency closing entries
- Gain/loss = revalued amount (at period-end rate) - original amount (at historical rate)
- Recorded separately for financial statement presentation
- Example: EUR closing entry of €1,000,000 originally recorded at 1.10 USD/EUR, revalued at 1.12 USD/EUR at period end
  - Original: €1M × 1.10 = $1.1M
  - Period-end: €1M × 1.12 = $1.12M
  - Unrealized gain: $20,000

### SAF-T 3.0.2 Multi-Currency
- Period coding extended for multi-currency: P05_2026_USD, P05_2026_EUR (per currency variant)
- Closing audit trail tracks currency-specific codes for each transaction currency
- Exchange rate data included in reconciliation for audit file generation

### XBRL GL Multi-Currency Context
- GL context embedded in posting records includes currency instance
- Closing entries linked to currency context (transaction currency + reporting currency)
- Enables XBRL GL envelope generation with proper currency segmentation

### GDPR Article 32 (Security of processing)
- Exchange rate data access controlled (read to finance/accountant, update to superadmin)
- Reconciliation audit trail (auditTrail field) logs all revaluation computations
- chainLeafUuid (Law 60) proves no hidden exchange rate changes

## UUID Family Integration (Laws 8–64)

### Law 8: Content UUID
- MultiCurrencyReconciliation data hashed via sha256(JCS-canonical(...))
- Enables content-addressability for forensic analysis

### Law 60: Chain
- Each MultiCurrencyReconciliation includes chainLeafUuid
- Computed: sha256(JCS-canonical(reconciliationData) || priorChainLeafUuid)
- Creates immutable audit chain proving no exchange rate adjustments were hidden
- Links to ClosingEntries.chainLeafUuid for complete audit trail

### Law 62: Coverage
- Security through feature coverage: as multi-currency automation → 100%, tamper-cost → ∞
- Phase B3 covers: all currencies, all period types, complete exchange rate tracking
- Coverage = complete multi-currency closing automation → provably tamper-resistant

### Law 63: Self-Governance
- Entity's reportingCurrency (queried from legal-entities) enables self-determined reporting
- Allows each entity to govern its own currency translation without central authority

## Integration with Phase A2 & B2

### Phase A2 (Currency Framework)
- ClosingEntries.entity → LegalEntities.currencyCode (reportingCurrency)
- ExchangeRate collection stores period-end rates: {transactionCurrency, reportingCurrency, effectiveDate, rate}
- validateMultiCurrencyClosing queries ExchangeRates for all transaction currencies

### Phase B2 (Period-End Closing)
- validateMultiCurrencyClosing runs after validateClosingPeriod in beforeValidate hook chain
- Adds per-currency balance checks on top of consolidated balance validation
- Stores reconciliation results in multiCurrencyReconciliation field for reporting
- Updates chainLeafUuid to include multi-currency reconciliation

## Audit Trail & Reproducibility

1. ClosingEntries.multiCurrencyReconciliation: immutable reconciliation results
2. ClosingEntries.chainLeafUuid: includes multi-currency reconciliation hash
3. ClosingEntries.auditTrail: logs unrealized FX gains/losses computation
4. ExchangeRate records: immutable period-end rates used in reconciliation
5. Replayability: given ClosingEntries config + ExchangeRate data + chainLeafUuid chain, multi-currency reconciliation is reproducible

## Example Usage

```typescript
// Validate multi-currency closing (automatic via hook)
// Input: ClosingEntries with 3 currencies (USD, EUR, BGN)
// - USD: revenues $1M, expenses $1M (balanced)
// - EUR: revenues €500K, expenses €500K (balanced)
// - BGN: revenues 1M BGN, expenses 1M BGN (balanced)

// Query entity for reportingCurrency: USD
// Query exchange rates at period end:
// - USD: 1.0
// - EUR: 1.12 USD/EUR
// - BGN: 0.56 USD/BGN

// Reconciliation:
const closingData = {
  closingEntries: [
    { currency: 'USD', totalRevenuesClosed: 1000000, totalExpensesClosed: 1000000, netAmount: 0 },
    { currency: 'EUR', totalRevenuesClosed: 500000, totalExpensesClosed: 500000, netAmount: 0 },
    { currency: 'BGN', totalRevenuesClosed: 1000000, totalExpensesClosed: 1000000, netAmount: 0 },
  ],
  reconciliationDate: '2026-05-31'
}

const reconciliation = CurrencyReconciliation.reconcileMultiCurrency(
  closingData,
  'USD',
  { USD: 1.0, EUR: 1.12, BGN: 0.56 }
)

// Result:
// balancesByCurrency: [
//   { currency: 'USD', isBalanced: true, ... },
//   { currency: 'EUR', isBalanced: true, ... },
//   { currency: 'BGN', isBalanced: true, ... }
// ]
// allBalanced: true
// revaluations: []  (no revaluation if amounts were already at period-end rate)
// totalUnrealizedGainLoss: 0
// errors: []
```

## Testing & Verification

See `tests/standards/multi-currency-closing/` for:
- Per-currency balance validation (all currencies balanced)
- Exchange rate lookup (period-end date, currency pair)
- Unrealized FX gain/loss computation (IFRS 9 treatment)
- Currency code validation (ISO 4217 format + decimals)
- Multi-currency reconciliation data structure
- Hook integration (ClosingEntries denormalization)
- Audit trail verification (chainLeafUuid computation, auditTrail append)
- Reproducibility (same config → same reconciliation results)

## References

- [ISO 4217:2023](https://www.iso.org/standard/64758.html) – Currency codes and decimal places
- [IFRS 21:2023](https://www.ifrs.org/content/dam/ifrssite/standards/ias21.pdf) – Translation of foreign operations
- [IFRS 9:2023](https://www.ifrs.org/content/dam/ifrssite/standards/ifrs9.pdf) – Financial instruments: recognition and measurement
- [SAF-T 3.0.2](https://www.oecd.org/tax/administration/standard-audit-file-for-tax.htm) – Standard Audit File for Tax
- [GDPR Article 32](https://gdpr-info.eu/art-32-gdpr/) – Security of processing
- [NIST SP 800-92](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf) – Guide to Computer Security Log Management
