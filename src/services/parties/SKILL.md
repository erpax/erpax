---
name: parties
description: Use when computing the counterparty side of a financial document — aging open balances into day-buckets (A/R and A/P share one algorithm), or validating a status-lifecycle transition on the document's directed graph; receivable and payable are one shape seen from two sides.
---

# parties — one document, two sides of the same debt

FORM: **receivable and payable are the SAME document seen from opposite ends of a relationship.** A customer owing us and us owing a supplier differ only in sign and direction — both are a `PartyDocument`: dated, balanced, status-lifecycled. This organ is the single source of truth for the two algorithms that act on that shape, so the receivables and payables services never restate them ([[duality]] — the [[merge]] of the two ledgers into one [[balance]]). Pure (no I/O) ⇒ testable.

- **aging** — bucketize open balances by days-past-due against an as-of date; same buckets for both sides (`current | aging | overdue | stale`). The day-thresholds are the bands every outstanding item ages along, a closed [[horo]] ring of staleness. `computeAgingBuckets`, `filterOpenDocuments`, `DEFAULT_AGING_BUCKETS`.
- **workflow** — a directed graph of legal status transitions; assert legality before applying a status change, or throw with the allowed set. `canTransition`, `transitionOrThrow`, `reachableStates`, `terminalStates`.

The aging math is shared with bank-reconciliation via the canonical `AgingBucketKey`; the day-arithmetic (`daysBetween`) is borrowed from [[accounting]], not re-typed — the filesystem is the only source ([[akashic]]). The workflow validator is the same impossibility [[anti-corruption]] enforces (no illegal jump, terminal states final), one law at every scale ([[fractal]]). Value moving between [[parties]] is the universal document chain ([[flow]]).

This is the counterparty organ of the [[society]] — the shape both sides of every relationship share; the standards a document cites are external law incorporated by reference (see [[standard]]).

Sequence position: **8** (crest — the value transfer between two parties carried to its document), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

## Standards

- **EN-16931:2017** — invoice-and-credit-note; the common party-side document shape (`PartyDocument`).
- **IFRS-9 / US-GAAP ASC-326** — expected-credit-loss aging-buckets; `computeAgingBuckets` is the executable bucketization.
- **US-GAAP ASC-310 receivables / ASC-405 liabilities** — the two sides the one algorithm serves.
- **ISO-8601-1:2019** — date-time days-between-arithmetic; `daysBetween` over `dueDate`.
- **SOX §404 / ISO-27002 §5.4** — segregation-of-duties on status-transitions; the workflow graph forbids the illegal jump.
- **ISO-19011:2018** — audit-trail of state-transitions and aging-of-outstanding-items.
