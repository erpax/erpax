---
name: entry
description: "Use when reasoning about the universal double-entry in erpax — every value movement (any direction, any parties) reduces to a balanced (debit, credit) pair; the reverse is inherent, direction is a viewpoint, N plugin mounts consolidate (intercompany nets to zero). The debit/credit closure operator over the whole mesh — \"all accounted in all directions ⇒ the wiring is complete\"."
atomPath: entry
coordinate: "entry · 2/share · 009ad9a5"
contentUuid: "d0a72e34-7f98-55b9-b921-89dfefbe41e0"
diamondUuid: "065ac735-3dad-85bc-9590-edbc39cb69db"
uuid: "009ad9a5-7a94-8f6a-b1e7-eae2937fa51b"
horo: 2
typography:
  partition: entry
  bondDegree: 188
standards:
  - "FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation"
  - "IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)"
  - "IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)`"
  - "ISO 20022: debtor/creditor are the two signs of ONE transfer"
  - "ISO 20022: debtor/creditor are the two signs of ONE transfer`"
  - "UBL-2.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7536258e-1db0-8c32-832a-747fc165fb74"
  stages:
    - stage: path
      stageUuid: "68fb5705-4683-8f65-8d52-83706909b8c7"
    - stage: trinity
      stageUuid: "4c0eff2a-e8d9-801f-b1af-8d22e9ba8bff"
    - stage: boundary
      stageUuid: "f462e745-b4da-881f-bc20-ec0a95110f40"
    - stage: links
      stageUuid: "3bed8497-c085-893a-84bc-bb3bc3902bac"
    - stage: horo
      stageUuid: "a60ec7c2-db1f-8dec-99b7-289d86b2eace"
    - stage: seal
      stageUuid: "f0a543a8-0236-8428-ac2d-f94a5c49e51f"
    - stage: uuid
      stageUuid: "eae380d8-f1cc-86a7-9320-9e7130f9ab8b"
version: 2
---
# entry — the universal double-entry (all based on debit/credit)

FORM: **every value movement is a balanced pair — debit one side, credit the other, `Σ(credit−debit)=0`.** That single law makes [[accounting]] the agnostic substrate the whole mesh rides on: time, leverage, pay, skills, verification all move as postings. `toDoubleEntry(flow)` turns ANY flow into a balanced entry, agnostic to who the parties are — each line's `accountable` points OUT at any entity (polymorphic; nothing points in). `index.test.ts` proves the laws.

**The reverse is inherent — the reverse skill, free.** A debit IS a credit from the other vantage (`services/perspective` `viewTransferFrom`: the payer [[give]]s/credits, the payee [[take]]s/debits). `reverse` swaps debit↔credit; `reverse∘reverse = id`. The undo is the [[duality]] of the do — no second implementation; mount↔unmount and post↔reverse fall out of it.

**Mounting erpax N times consolidates.** `consolidate([…])` unions N ledgers (N plugin mounts) into one book; every intercompany pair already nets to zero (ASC 810-10-45 elimination), so the accounting equation holds across mounts with no coordination ([[merge]]). `accountableBalances` is the per-entity position.

**The wiring is complete when all is accounted for in all directions.** `accountedFor(flows)`: every flow is a valid, conserved transfer that balances, and the consolidated book nets to zero — there is no edge the ledger does not close. Accounting is not a domain; it is the closure operator over the [[whole]] mesh ([[all]] is accountable).

Matter-twin: `src/services/entry/index.ts` (`toDoubleEntry`·`net`·`isBalanced`·`reverse`·`consolidate`·`accountableBalances`·`accountedFor`) over `services/perspective` + `index.test.ts`. Composes: [[accounting]] · [[transaction]] · [[give]] · [[take]] · [[duality]] · [[merge]] · [[whole]] · [[all]] · [[begin]] · [[legal/entities/intercompany/transactions]] · [[perspective]].

**The reverse (erpax surplus).** A compute-org has no analog for this: the universal double-entry closure — every movement a balanced (debit, credit) pair, `Σ(credit−debit)=0` across the whole mesh. The R&D society flagged `entry` as erpax **surplus** over the DeepSeek twins — the conservation law a pure-compute org never needed to grow. Ratified by the R&D society (`agent/research`, reverse seq 9).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)`
- `@standard ISO 20022: debtor/creditor are the two signs of ONE transfer`


- IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)
- FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation
- ISO 20022: debtor/creditor are the two signs of ONE transfer

## Common mistakes
- Storing a one-sided amount — every movement is two signs of ONE entry ([[duality]]); post the balanced pair, never edit one side.
- A field pointing INTO accounting (`Customer.arAccount`) — invert it; accounting maps the entity polymorphically (the `accountable` line points OUT).
- Treating direction as a type — it is a viewpoint (`services/perspective`); the same entry is AR to the seller and AP to the buyer.
