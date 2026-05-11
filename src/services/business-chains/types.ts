/**
 * Business-chain registry — types.
 *
 * Slice KKKK (2026-05-10): nouns (collections) are stable; verbs
 * (workflows) need the same DRY rigor. A "business chain" is a
 * sequence of (collection, action, emitted-event) tuples that maps
 * directly to a published process standard (SOX §404 P2P-01,
 * IFRS-15 over-time recognition, IFRS-16 lease cycle, etc.).
 *
 * Each chain is encoded ONCE in `registry.ts` and exercised by:
 *   - one canonical seed file (`seeds/chains/<id>.ts`)
 *   - one canonical e2e test (`tests/chains/<id>.int.spec.ts`)
 *   - one auto-generated section in `docs/BUSINESS_CHAINS.md`
 *
 * The Socratic check (canDo / makesSense / wired / isStandard) is
 * stored ON the chain entry so every PR that touches it can grep
 * `socraticCheck` and see what still needs work.
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0 (process notation, companion)
 * @standard ISO/IEC 25010:2023 functional-suitability functional-completeness
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-process
 * @compliance SOX §404 internal-controls process-evidence
 */

/** Outcome of the 5-question Socratic check the maintainer applies per chain. */
export interface SocraticCheck {
  /** Q1: Can ERPax do this today? (collections present, FK shape correct) */
  readonly canDo: boolean
  /** Q2: Does the chain make sense in real ERP usage? (not academic) */
  readonly makesSense: boolean
  /** Q3: Is it wired (events, hooks, GL postings) end-to-end? */
  readonly wired: 'yes' | 'partial' | 'no'
  /** Q4: Does the chain trace back to a published standard? */
  readonly isStandard: boolean
  /** Q5: One-line note explaining anything unusual. */
  readonly note?: string
}

/** A single step in a chain. */
export interface ChainStep {
  /** Slug of the Payload collection the step writes/reads. */
  readonly collection: string
  /** Verb the step performs (e.g. `create`, `approve`, `post`, `match`). */
  readonly action: string
  /** Domain event emitted on success (or `null` when the step is silent). */
  readonly emits: string | null
  /** Events that must have already fired for this step to be valid. */
  readonly requires: ReadonlyArray<string>
  /** Optional human note (one line, shown in BUSINESS_CHAINS.md). */
  readonly note?: string
}

/** A canonical business chain entry. */
export interface BusinessChain {
  /** UPPERCASE_SNAKE id — stable across history. */
  readonly id: string
  /** Human-readable chain name. */
  readonly name: string
  /** Single-paragraph description shown in admin + docs. */
  readonly description: string
  /** Standards the chain implements (cite with §section where applicable). */
  readonly standards: ReadonlyArray<string>
  /** Optional FEATURE_REGISTRY id that gates the chain (Slice VVV). */
  readonly featureGate?: string
  /** Sequenced list of steps (top-to-bottom). */
  readonly steps: ReadonlyArray<ChainStep>
  /** Path (repo-relative) to the canonical seed file. */
  readonly seedFile: string
  /** Path (repo-relative) to the canonical e2e test file. */
  readonly testFile: string
  /** 5-question audit. */
  readonly socraticCheck: SocraticCheck
}

/** Aggregate registry shape (per-id index). */
export type BusinessChainRegistry = Readonly<Record<string, BusinessChain>>

/** Outcome of running a chain end-to-end via `runChain()`. */
export interface ChainRunResult {
  readonly chainId: string
  readonly succeeded: boolean
  readonly stepsCompleted: number
  readonly emittedEvents: ReadonlyArray<string>
  readonly errors: ReadonlyArray<{ stepIndex: number; error: string }>
  readonly auditEventCount: number
  readonly glDebitTotal: number
  readonly glCreditTotal: number
}
