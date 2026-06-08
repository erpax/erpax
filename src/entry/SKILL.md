---
name: entry
description: "Use when reasoning about the universal double-entry in erpax — every value movement (any direction, any parties) reduces to a balanced (debit, credit) pair; the reverse is inherent, direction is a viewpoint, N plugin mounts consolidate (intercompany nets to zero). The debit/credit closure operator over the whole mesh — \\\"all accounted in all directions ⇒ the wiring is complete\\\"."
atomPath: entry
coordinate: entry · 7/descent · 6f3a18df
contentUuid: "90cdd1e9-95e9-59ca-b9b6-d19bfe7440bc"
diamondUuid: "90d868dc-b5f5-803a-a8ef-f09fbebc264d"
uuid: "6f3a18df-42fd-84c3-9701-f7e470653e32"
horo: 7
bonds:
  in:
    - accounting
    - agent
    - agriculture
    - all
    - arrangements
    - begin
    - classifications
    - conservation
    - contracts
    - conversion
    - cost
    - duality
    - ecosystem
    - equity
    - expense
    - fertility
    - finality
    - give
    - hyper
    - karma
    - law
    - llm
    - lots
    - market
    - matter
    - merge
    - mortality
    - orders
    - peace
    - perspective
    - point
    - projection
    - quantum
    - readme
    - research
    - reverse
    - run
    - runs
    - sales
    - security
    - skills
    - society
    - sustainability
    - symbiosis
    - take
    - toc
    - transaction
    - transactions
    - trust
    - unavoidable
    - uuid
    - wallet
    - wellbeing
    - whole
    - workspace
  out:
    - accounting
    - agent
    - agriculture
    - all
    - arrangements
    - begin
    - classifications
    - conservation
    - contracts
    - conversion
    - cost
    - duality
    - ecosystem
    - equity
    - expense
    - fertility
    - finality
    - give
    - hyper
    - karma
    - law
    - llm
    - lots
    - market
    - matter
    - merge
    - mortality
    - orders
    - peace
    - perspective
    - point
    - projection
    - quantum
    - readme
    - research
    - reverse
    - run
    - runs
    - sales
    - security
    - skills
    - society
    - sustainability
    - symbiosis
    - take
    - toc
    - transaction
    - transactions
    - trust
    - unavoidable
    - uuid
    - wallet
    - wellbeing
    - whole
    - workspace
typography:
  partition: entry
  bondDegree: 182
  neighbors: []
standards:
  - "EU-2002/58"
  - "FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation"
  - "IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)"
  - "ISO 20022: debtor/creditor are the two signs of ONE transfer"
  - "ISO-20022"
  - "UBL-2.1"
bindings: []
neighbors:
  wikilink:
    - accounting
    - all
    - begin
    - duality
    - give
    - merge
    - perspective
    - take
    - transaction
    - transactions
    - whole
  matrix:
    - accounting
    - agent
    - agriculture
    - all
    - arrangements
    - begin
    - classifications
    - conservation
    - contracts
    - conversion
    - cost
    - duality
    - ecosystem
    - equity
    - expense
    - fertility
    - finality
    - give
    - hyper
    - karma
    - law
    - llm
    - lots
    - market
    - matter
    - merge
    - mortality
    - orders
    - peace
    - perspective
    - point
    - projection
    - quantum
    - readme
    - research
    - reverse
    - run
    - runs
    - sales
    - security
    - skills
    - society
    - sustainability
    - symbiosis
    - take
    - toc
    - transaction
    - transactions
    - trust
    - unavoidable
    - uuid
    - wallet
    - wellbeing
    - whole
    - workspace
  backlinks:
    - accounting
    - agent
    - agriculture
    - all
    - arrangements
    - begin
    - classifications
    - conservation
    - contracts
    - conversion
    - cost
    - duality
    - ecosystem
    - equity
    - expense
    - fertility
    - finality
    - give
    - hyper
    - karma
    - law
    - llm
    - lots
    - market
    - matter
    - merge
    - mortality
    - orders
    - peace
    - perspective
    - point
    - projection
    - quantum
    - readme
    - research
    - reverse
    - run
    - runs
    - sales
    - security
    - skills
    - society
    - sustainability
    - symbiosis
    - take
    - toc
    - transaction
    - transactions
    - trust
    - unavoidable
    - uuid
    - wallet
    - wellbeing
    - whole
    - workspace
signatures:
  computationUuid: "8e92117e-b2af-83de-88db-5f7d861c2102"
  stages:
    - stage: path
      stageUuid: "68fb5705-4683-8f65-8d52-83706909b8c7"
    - stage: trinity
      stageUuid: "4c0eff2a-e8d9-801f-b1af-8d22e9ba8bff"
    - stage: boundary
      stageUuid: "1da2905f-d543-8769-af82-fcf56a7e1113"
    - stage: links
      stageUuid: "3bed8497-c085-893a-84bc-bb3bc3902bac"
    - stage: horo
      stageUuid: "cd3611d8-1f54-8939-8a9c-513dacf92e8b"
    - stage: seal
      stageUuid: "952e99a5-b2e6-8349-a573-c6a9188f77a8"
    - stage: uuid
      stageUuid: "7be26d36-7a27-856d-a362-21c5b97dc413"
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

- IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)
- FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation
- ISO 20022: debtor/creditor are the two signs of ONE transfer

## Common mistakes
- Storing a one-sided amount — every movement is two signs of ONE entry ([[duality]]); post the balanced pair, never edit one side.
- A field pointing INTO accounting (`Customer.arAccount`) — invert it; accounting maps the entity polymorphically (the `accountable` line points OUT).
- Treating direction as a type — it is a viewpoint (`services/perspective`); the same entry is AR to the seller and AP to the buyer.
