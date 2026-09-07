---
name: proof
description: "Use when reasoning about proof — Use to see the corpus accounting itself in realtime — every claim (@invariant · @standard · @compliance · @audit) is a DEBIT, every proof (a test beside it) the CREDIT, and the ledger balances iff all is proven. The residual is the unproven surface, computed at read. Run: tsx src/accounting/proof/index.ts"
atomPath: "accounting/proof"
coordinate: "accounting/proof · 7/descent · 9691fd38"
contentUuid: "7ff82eca-44c9-5aa4-9c55-a3af8d76df6e"
diamondUuid: "3cc3d709-f82d-8c8a-9f58-97e147d35bb7"
uuid: "9691fd38-162a-87d8-8a02-a50bd14e3ec0"
horo: 7
typography:
  partition: accounting
  bondDegree: 588
standards:
  - IAS 1 — a balanced set of accounts; every debit has its credit
  - "IAS-1"
  - "ISO-19011"
  - "ISO-19011:2018 §6.4 — evidence: a claim is settled by a traceable proof"
  - "· @audit) is a DEBIT, every proof (a test beside it) the CREDIT, and the ledger balances iff all is proven. The residual is the unproven surface, computed at read. Run: tsx src/accounting/proof/index.ts\""
  - "· @audit) is a DEBIT, every proof (a test beside it) the CREDIT, and the ledger balances iff all is proven. The residual is the unproven surface, computed at read. Run: tsx src/accounting/proof/index.ts\\\"\""
  - "· @compliance · @audit) is a DEBIT, every proof (a test beside it) the CREDIT, and the ledger balances iff all is proven. The residual is the unproven surface, computed at read. Run: tsx src/accounting/proof/index.ts\""
bindings: []
signatures:
  computationUuid: "084b6e16-16b5-8010-816f-8464789635c7"
  stages:
    - stage: path
      stageUuid: "2ce85a5a-7225-8570-b871-756a01b64294"
    - stage: trinity
      stageUuid: "2df9f1e2-2c29-80f9-bd03-82c774ae73f7"
    - stage: boundary
      stageUuid: "8e44d00f-6d97-8517-b0f4-6c322519abff"
    - stage: links
      stageUuid: "0a343537-e0eb-891f-9ff6-6b03367d66cb"
    - stage: horo
      stageUuid: "66827974-89b0-89e1-885a-f0950cf91b10"
    - stage: seal
      stageUuid: "26af9697-41e9-87b9-b519-a4c6a6a4a644"
    - stage: uuid
      stageUuid: "bbb56ed5-8441-8c8d-a345-96cd1ff03bd0"
version: 2
---
# proof — realtime double-entry of what the corpus CLAIMS against what it PROVES

**Gravity pulls toward realtime accounting of all.** The fold concentrates matter ([[gravity]]: DRY is mass), and every mass must be accounted, in both directions, computed at read never stored ([[accounting]]). This atom accounts the corpus's own **epistemic** state as a ledger:

| | |
| --- | --- |
| a **claim** (`@invariant`/`@standard`/`@compliance`/`@audit`) | a **DEBIT** — an obligation the corpus takes on |
| a **proof** (a `test.ts` beside the claim) | the **CREDIT** — the settlement of that obligation |

The ledger **balances iff every claim is credited by a proof.** The residual — debits with no credit — **is** the unproven surface ([[rules]]/refutable · [[rules]]/audience · [[coverage]] measure the same gap; this is its double-entry view).

## The measured state

```
DEBITS  (claims taken on)      4409
CREDITS (proofs settled)       3288
RESIDUAL (unproven surface)    1121
BALANCE                        74.6%   · gravity pulls toward 100%
```

Zero residual is the **gravitational floor**: every claim settled, coverage at 100%, the fold at its densest — which is [[law]]'s `zero entropy ⇒ infinite tamper-cost` seen from the ledger. The residual (1121) agrees with the lead-auditor's count ([[audit]]/agent), because they measure the same thing from two seats — the auditor names it, the ledger balances it.

## Realtime

Computed on read from the tree, never stored. **A claim added without a proof unbalances the ledger the instant it lands** — the gravity is felt at the write ([[confirm]]), not in a nightly reconciliation. That is the difference between accounting *of all* and accounting *after the fact*: the ledger has no closing date because it is never stored.

**Honest boundary.** A credit proves a test **exists**, never that it is **correct** — a test can assert a lie ([[rules]]/refutable's boundary, inherited). A balanced ledger is the **floor** of trust: nothing unsettled, not everything-settled-true. Double-entry catches the missing entry; it does not audit the entry's truth — that is the peer-reviewer's and the auditor's work, on the credits this ledger confirms exist.

**Law — [[law]]: every claim is a debit, every proof its credit, and the ledger is accounted in realtime. The residual is the unproven surface, and gravity — the fold — pulls it toward zero, where the corpus owes nothing it has not settled.**

## Standards

- **IAS 1** — a balanced set of accounts; every debit has its credit.
- **ISO-19011:2018 §6.4** — evidence: a claim is settled by a traceable proof.

Composes: [[accounting]] · [[gravity]] · [[syntax]] · [[rules]]/refutable · [[law]].
