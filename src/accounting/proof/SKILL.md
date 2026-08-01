---
name: proof
description: "Use when reasoning about proof — Use to see the corpus accounting itself in realtime — every claim (@invariant · @standard · @compliance · @audit) is a DEBIT, every proof (a test beside it) the CREDIT, and the ledger balances iff all is proven. The residual is the unproven surface, computed at read. Run: tsx src/accounting/proof/index.ts"
atomPath: "accounting/proof"
coordinate: "accounting/proof · 2/share · 690976bf"
contentUuid: "d8ea925f-fc67-55ae-9de4-04068f1400e2"
diamondUuid: "0f4c24bd-7dc3-88f5-ade3-7fc37e7ee7ac"
uuid: "690976bf-a590-8d02-9ba3-0e9607d18f1f"
horo: 2
typography:
  partition: accounting
  bondDegree: 589
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
  computationUuid: "7574186e-bc23-842f-841e-aa037b45b32a"
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
      stageUuid: "ab833415-87b2-8dae-b438-303c9d2ab93c"
    - stage: seal
      stageUuid: "26af9697-41e9-87b9-b519-a4c6a6a4a644"
    - stage: uuid
      stageUuid: "67acbdc2-2160-8d8c-a37a-6341c0ccf50b"
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
