---
name: "15"
description: "Use when implementing or referencing IFRS 15 / ASC 606 — Revenue from Contracts with Customers."
atomPath: "ifrs/15"
coordinate: "ifrs/15 · 1/base · 73664f2b"
contentUuid: "fcfb4a23-6cf7-5b06-a168-4666051158c0"
diamondUuid: "d802f887-728c-8cce-9f83-776f185294aa"
uuid: "73664f2b-4b9e-8e9c-8b33-7cd18c9b4eee"
horo: 1
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: ifrs
  bondDegree: 3
  neighbors: []
standards:
  - "ECMA-262"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "IFRS IFRS-15` / `@accounting US-GAAP ASC-606`. Plus `gl-posting.service.ts` has four subscription-lifecycle handlers. Before this module, each defined its own ad-hoc types for the same concepts (performance obligation, transaction price, allocation). Now they all reference the canonical shapes here."
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "US-GAAP ASC-606`. Plus `gl-posting.service.ts` has four subscription-lifecycle handlers. Before this module, each defined its own ad-hoc types for the same concepts (performance obligation, transaction price, allocation). Now they all reference the canonical shapes here.\""
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "02d48686-d1cd-844d-b5b8-a1bd20159968"
  stages:
    - stage: path
      stageUuid: "03eb7d08-176e-810b-822b-498e0ffb0b49"
    - stage: trinity
      stageUuid: "64ccbc2f-04b5-85c1-b2c8-57dec62d6412"
    - stage: boundary
      stageUuid: "c71c487f-1f91-8f05-9225-745b6c55a178"
    - stage: links
      stageUuid: "2a5cd49b-61af-87ed-9128-be6f3b8e41ef"
    - stage: horo
      stageUuid: "561d594b-6422-897c-b302-9102d93a54be"
    - stage: seal
      stageUuid: "36a951c0-1cef-81c8-828b-02fcf0245ec5"
    - stage: uuid
      stageUuid: "d7309c30-a8c4-84a1-8e17-b4af10cf6590"
version: 2
---
# IFRS 15 / ASC 606 — Revenue from Contracts with Customers

**IFRS edition:** IFRS 15 (May 2014, effective 2018), with annual amendments through 2022.
**US-GAAP edition:** ASC 606 (FASB ASU 2014-09, converged with IFRS 15), effective 2018 (public) / 2019 (private).
**Publishers:**
- IASB <https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/>
- FASB <https://asc.fasb.org/topic&trid=49130388>

## What's here

Canonical types implementing the IFRS 15 / ASC 606 five-step model:

1. **Identify the contract** — `Contract`
2. **Identify the performance obligations** — `PerformanceObligation`
3. **Determine the transaction price** — `TransactionPrice`, `VariableConsideration`
4. **Allocate the transaction price** — `Allocation`, `StandaloneSellingPrice`
5. **Recognize revenue** — `RevenueRecognition`, `RecognitionTiming`, `OverTimeMeasurement`

Plus the balance-sheet artefacts the model produces:

- `ContractAsset` — IFRS 15 §107: revenue recognized in advance of an unconditional right to consideration
- `ContractLiability` (deferred revenue) — IFRS 15 §106: consideration received in advance of recognition
- `RefundLiability` — IFRS 15 §B22: expected refunds under variable consideration / right of return

Files:

- `types.ts` — semantic types.
- `validate.ts` — runtime guards (`isRecognitionTiming`, `isOverTimeMeasurement`).
- `index.ts` — barrel.

## Why a canonical types module

`Contracts`, `PerformanceObligations`, `Subscriptions`, `SubscriptionPlans`, `Refunds`, and `CreditMemos` collections all cite `@accounting IFRS IFRS-15` / `@accounting US-GAAP ASC-606`. Plus `gl-posting.service.ts` has four subscription-lifecycle handlers. Before this module, each defined its own ad-hoc types for the same concepts (performance obligation, transaction price, allocation). Now they all reference the canonical shapes here.

## Out of scope

- Industry-specific application guidance (construction contracts, software licensing, real estate, telecoms) — separate modules if needed.
- Full XBRL disclosure taxonomy mapping — IFRS 15 §110-§129 disclosure requirements live in the financial-reporting service.
- ASC 340-40 incremental-costs-of-obtaining-a-contract treatment — separate `asc-340-40/` module if/when consumer arrives.

## Used by

- `src/plugins/accounting/collections/Contracts.ts` — top-level master.
- `src/plugins/accounting/collections/PerformanceObligations.ts` — distinct POs.
- `src/collections/Subscriptions/index.ts` — recurring revenue contracts.
- `src/collections/SubscriptionPlans/index.ts` — SSP catalog.
- `src/services/gl-posting.service.ts` — `postSubscriptionActivated/Invoiced/Cancelled/Refunded` handlers.
- `src/plugins/accounting/services/reports.ts` — IFRS 15 disclosure block in financial statements.

## References

- IFRS 15 — Revenue from Contracts with Customers (IASB).
- ASC 606 — Revenue from Contracts with Customers (FASB).
- ASC 340-40 — Other Assets and Deferred Costs — Contracts with Customers.
- IFRS 15 §31, §35, §38 — point-in-time vs over-time recognition criteria.
- IFRS 15 §73-§86 — allocation of the transaction price.
- IFRS 15 §B14-B33 — variable consideration including refunds and rights of return.

**Law — [[law]]: IFRS 15 / ASC 606 owns the canonical types for the five-step revenue model (identify contract → obligations → transaction price → allocate → recognize) plus its balance-sheet artefacts (ContractAsset/Liability, RefundLiability) — the one shape every revenue collection and posting service projects onto, so the obligation enums cannot drift.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
