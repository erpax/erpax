/**
 * Canonical IFRS 15 / ASC 606 revenue-recognition types — the five-step
 * model + the balance-sheet artefacts it produces.
 *
 * Money is integer cents per the project's `_money` standard.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail
 * @see ./README.md
 */

// ─── Step 5 — recognition timing + measurement method ──────────────────

/**
 * IFRS 15 §32: revenue is recognized either at a point in time (most
 * common for goods) or over time (services that meet the §35 criteria:
 * customer simultaneously receives and consumes; entity creates an
 * asset the customer controls; or no alternative use + enforceable
 * right to payment for performance to date).
 *
 * @accounting IFRS IFRS-15 §32 recognition-timing
 * @accounting US-GAAP ASC-606-10-25-30 recognition-timing
 */
export type RecognitionTiming = 'point_in_time' | 'over_time'

/**
 * IFRS 15 §41-§43 — methods for measuring progress over time.
 *
 * @accounting IFRS IFRS-15 §41-§43 progress-measurement
 * @accounting US-GAAP ASC-606-10-25-31 progress-measurement
 */
export type OverTimeMeasurement = 'output_method' | 'input_method'

/**
 * Output methods (IFRS 15 §B15-B17): direct measurements of value
 * transferred to the customer.
 */
export type OutputMethodKind =
  | 'units_delivered'
  | 'units_produced'
  | 'milestones'
  | 'time_elapsed'      // straight-line over the contract term — most common for SaaS subs
  | 'survey_of_work'

/**
 * Input methods (IFRS 15 §B18-B19): inputs consumed relative to
 * total expected inputs.
 */
export type InputMethodKind =
  | 'cost_to_cost'      // costs incurred / total expected costs (most common for construction)
  | 'labor_hours'
  | 'machine_hours'
  | 'resources_consumed'
  | 'time_passed'

/**
 * Estimation method for variable consideration (IFRS 15 §53).
 *
 * @accounting IFRS IFRS-15 §53 variable-consideration-estimation
 */
export type VariableConsiderationMethod = 'expected_value' | 'most_likely_amount'

// ─── Step 1 — Contract ─────────────────────────────────────────────────

/**
 * IFRS 15 §10: a contract exists when the parties have approved the
 * contract, identified rights and payment terms, the contract has
 * commercial substance, and collection is probable.
 *
 * Note: an entity COMBINES contracts (IFRS 15 §17) when entered at or
 * near the same time with the same customer if (a) negotiated as a
 * package, or (b) consideration is interdependent, or (c) goods/services
 * promised form a single performance obligation.
 *
 * @accounting IFRS IFRS-15 §10 contract-identification
 * @accounting IFRS IFRS-15 §17 contract-combination
 */
export interface Contract {
  /** Contract identifier (your entity's ref). */
  id: string
  /** Customer / counterparty id. */
  customerId: string
  /** Contract effective date (date approved by both parties). */
  effectiveDate: Date | string
  /** Contract end date — null for indefinite (e.g. month-to-month subscription). */
  endDate?: Date | string | null
  /** Functional currency (ISO 4217). */
  currency: string
  /**
   * Contract status — drives recognition gating. Recognition is
   * suspended for `pending_approval` and `cancelled`.
   */
  status:
    | 'pending_approval'
    | 'active'
    | 'modified'
    | 'cancelled'
    | 'completed'
  /**
   * Combined-contract group — when this contract is part of a multi-
   * contract bundle that's accounted for as one. Empty for a stand-alone
   * contract.
   */
  combinedWithContractIds?: string[]
}

// ─── Step 2 — Performance Obligation ───────────────────────────────────

/**
 * IFRS 15 §22: a performance obligation is a promise to transfer to
 * the customer either (a) a distinct good or service, or (b) a series
 * of distinct goods/services that are substantially the same and have
 * the same pattern of transfer (IFRS 15 §22(b)).
 *
 * Distinct (IFRS 15 §27) requires the customer can benefit from the
 * good/service either on its own or with readily available resources,
 * AND the entity's promise is separately identifiable from other
 * promises in the contract.
 *
 * @accounting IFRS IFRS-15 §22 performance-obligation
 * @accounting IFRS IFRS-15 §27 distinct-criteria
 * @accounting US-GAAP ASC-606-10-25-14 performance-obligation
 */
export interface PerformanceObligation {
  /** PO identifier. */
  id: string
  /** Parent contract. */
  contractId: string
  /** Description of the promised good/service. */
  description: string
  /** Distinct (§22(a) one-shot) or series (§22(b) continuous identical units). */
  kind: 'distinct' | 'series'
  /** Recognition timing. */
  recognitionTiming: RecognitionTiming
  /**
   * Over-time measurement method. Required when recognitionTiming is
   * 'over_time'; null otherwise.
   */
  overTimeMeasurement?: OverTimeMeasurement
  /**
   * Specific kind under output/input methods. Set together with
   * overTimeMeasurement.
   */
  measurementKind?: OutputMethodKind | InputMethodKind

  /**
   * Standalone selling price (SSP), integer cents — the amount the
   * entity would charge for this PO if sold separately. Drives the
   * §73-§86 allocation. May be observable or estimated (§78-§80:
   * adjusted market assessment, expected cost plus margin, residual
   * approach where allowed).
   */
  standaloneSellingPrice: number

  /**
   * Allocated transaction price — set by the allocation step (§73).
   * Updated when the contract is modified or the transaction price
   * changes.
   */
  allocatedAmount: number

  /**
   * Cumulative recognized amount to date — drives "what's left to
   * recognize" computations.
   */
  recognizedAmount: number

  /** Status of this specific PO. */
  status:
    | 'pending'
    | 'in_progress'
    | 'satisfied'
    | 'cancelled'

  /** Date the PO was satisfied (point-in-time) or completed (over-time). */
  satisfiedAt?: Date | string
}

// ─── Step 3 — Transaction Price ────────────────────────────────────────

/**
 * IFRS 15 §47: the transaction price is the amount of consideration
 * the entity expects to be entitled to in exchange for transferring
 * the goods/services. Excludes amounts collected on behalf of third
 * parties (e.g. sales taxes).
 *
 * Components: fixed + variable + significant financing (§60-§65) +
 * non-cash (§66-§69) + consideration payable to the customer (§70-§72).
 *
 * @accounting IFRS IFRS-15 §47 transaction-price
 * @accounting US-GAAP ASC-606-10-32 transaction-price
 */
export interface TransactionPrice {
  contractId: string
  currency: string
  /** Fixed consideration component. */
  fixed: number
  /** Variable consideration estimate (IFRS 15 §50-§59). */
  variable?: VariableConsideration
  /**
   * Significant financing component (IFRS 15 §60-§65) — interest
   * adjustment when payment timing differs materially from delivery.
   * Positive when the entity acts as a financier (advance payments to
   * the entity); negative when the customer is financed (deferred
   * payment terms).
   */
  significantFinancingComponent?: number
  /**
   * Consideration payable to the customer (IFRS 15 §70) — reduces
   * transaction price unless paid for a distinct good/service.
   */
  considerationPayableToCustomer?: number
  /** Total = fixed + variable.estimate + financing − payableToCustomer. */
  total: number
}

/**
 * IFRS 15 §50-§59: variable consideration covers discounts, rebates,
 * refunds, credits, performance bonuses, penalties. Estimated at
 * inception and updated each reporting period.
 *
 * Constraint (IFRS 15 §56): only include variable consideration to
 * the extent that it's highly probable a significant revenue reversal
 * will not occur when the uncertainty resolves.
 *
 * @accounting IFRS IFRS-15 §50-§59 variable-consideration
 * @accounting IFRS IFRS-15 §56 constraint
 */
export interface VariableConsideration {
  method: VariableConsiderationMethod
  /** Best estimate per chosen method, integer cents. */
  estimate: number
  /** Constraint applied — the amount NOT recognized due to §56. */
  constraint?: number
  /** Notes / basis of estimation for audit. */
  basis?: string
}

// ─── Step 4 — Allocation ───────────────────────────────────────────────

/**
 * IFRS 15 §73-§80: allocate the transaction price to each performance
 * obligation in proportion to its standalone selling price (the
 * "relative SSP method"). Allocation includes any variable consideration
 * to a specific PO if (§85): the variable terms relate specifically to
 * that PO.
 *
 * @accounting IFRS IFRS-15 §73-§86 allocation
 * @accounting US-GAAP ASC-606-10-32-28 allocation
 */
export interface Allocation {
  contractId: string
  /** Total transaction price allocated. */
  totalTransactionPrice: number
  /** Per-PO allocation (sums to totalTransactionPrice). */
  byObligation: Array<{
    obligationId: string
    standaloneSellingPrice: number
    /** Allocation method — usually 'relative_ssp'; 'specific' when §85 applies. */
    method: 'relative_ssp' | 'specific'
    /** Allocated amount in cents. */
    allocatedAmount: number
  }>
  /** Computed at the time of allocation. */
  allocatedAt: Date | string
}

// ─── Step 5 — Revenue Recognition Event ────────────────────────────────

/**
 * A single recognition event — one row per period × performance-obligation
 * combination for over-time POs, or a single row for point-in-time POs.
 * Drives the JE that posts revenue.
 *
 * @accounting IFRS IFRS-15 §31-§38 recognition
 * @accounting US-GAAP ASC-606-10-25 recognition
 * @audit ISO-19011:2018 audit-trail revenue-evidence
 */
export interface RevenueRecognition {
  /** Event id. */
  id: string
  contractId: string
  obligationId: string
  /** Recognition period (period end). */
  periodEnd: Date | string
  /** Amount recognized this period, integer cents. */
  amount: number
  /** Cumulative amount recognized through this period. */
  cumulativeRecognized: number
  /**
   * Progress percentage (0..1) for over-time POs at this event.
   * Null for point-in-time recognition.
   */
  progress?: number
  /** Source — `'periodic_run'` for the close job, `'manual'` for ad-hoc. */
  source: 'periodic_run' | 'manual' | 'modification' | 'cancellation'
  /**
   * Linked journal entry id created by the GL handler:
   *   point-in-time: Dr AR / Cr Revenue
   *   over-time:     Dr Contract Asset (or Dr AR) / Cr Revenue
   *   from deferred: Dr Contract Liability / Cr Revenue
   */
  journalEntryId?: string
}

// ─── Balance-sheet artefacts ───────────────────────────────────────────

/**
 * IFRS 15 §107: contract asset — recognized when the entity has
 * performed but the right to consideration is conditional on something
 * other than the passage of time.
 *
 * Distinguished from a receivable (IFRS 15 §108) which is unconditional.
 *
 * @accounting IFRS IFRS-15 §107 contract-asset
 * @accounting US-GAAP ASC-606-10-45-3 contract-asset
 */
export interface ContractAsset {
  contractId: string
  obligationId: string
  amount: number
  currency: string
  recognizedAt: Date | string
  /** Date the right becomes unconditional → reclass to AR. */
  expectedReclassDate?: Date | string
}

/**
 * IFRS 15 §106: contract liability (deferred revenue) — consideration
 * received before the entity has transferred goods/services.
 *
 * @accounting IFRS IFRS-15 §106 contract-liability
 * @accounting US-GAAP ASC-606-10-45-2 contract-liability
 */
export interface ContractLiability {
  contractId: string
  obligationId?: string
  amount: number
  currency: string
  receivedAt: Date | string
  /** Expected period of recognition — drives the maturity disclosure. */
  expectedRecognitionPeriod?: { from: Date | string; to: Date | string }
}

/**
 * IFRS 15 §B22: refund liability — recognized when consideration has
 * been received and the entity expects to refund part to the customer
 * (variable consideration constraint or explicit right of return).
 *
 * @accounting IFRS IFRS-15 §B22 refund-liability
 * @accounting US-GAAP ASC-606-10-32-10 refund-liability
 */
export interface RefundLiability {
  contractId: string
  amount: number
  currency: string
  basis:
    | 'variable_consideration_constraint'
    | 'right_of_return'
    | 'price_protection'
    | 'rebate_program'
  recognizedAt: Date | string
}
