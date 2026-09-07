---
name: transaction
description: "Use when reasoning about transaction — A **transaction** is the atom of business: a balance|balanced flow of value between party|parties — two sides (give/take, debit/credit, seller/buyer) that sum to zero. It is the pr"
atomPath: transaction
coordinate: "transaction · 5/round · 26ef7ba5"
contentUuid: "f1d09fdc-66dc-514a-99ba-4b9564de6209"
diamondUuid: "cce4da76-c3af-8e4c-9820-e54e1d5ab3b1"
uuid: "26ef7ba5-054d-8e84-97e0-5feea84945be"
horo: 5
typography:
  partition: transaction
  bondDegree: 269
standards: []
bindings: []
signatures:
  computationUuid: "b42db892-a0e6-87ca-a07c-c445bb8b4c83"
  stages:
    - stage: path
      stageUuid: "7efb4835-90cc-8b5f-bbe5-08297e570eba"
    - stage: trinity
      stageUuid: "e229a58f-2d1b-88c2-b84d-0c7dad0b59e0"
    - stage: boundary
      stageUuid: "62132dfc-dfd3-8fba-9f12-513a258d913c"
    - stage: links
      stageUuid: "a68abc6d-083b-8ee1-b7bd-1653b11f4a6c"
    - stage: horo
      stageUuid: "3b4474a2-a0c9-81e0-b17e-842cf7b63dd6"
    - stage: seal
      stageUuid: "98754e3c-b2af-843b-adcc-38ea475d5bd1"
    - stage: uuid
      stageUuid: "6657be92-39bc-859e-90af-3be74acc11c1"
version: 2
---
# transaction — the universal exchange: a balanced flow between parties

A **transaction** is the atom of business: a [[balance|balanced]] [[flow]] of value between [[party|parties]] — two sides ([[give]]/[[take]], debit/credit, seller/buyer) that sum to zero. It is the prefix-free [[dimension|coordinate]] every exchange shares: `bank`·`fx`·`intercompany`·trade are *kinds* on one [[dimension]] axis of a single `transactions`, not separate collections. This is where *trades-vs-transactions* resolves — the exact standard root is `SupplyChainTradeTransaction` (UN/CEFACT CII), a **trade·transaction**: both words, one node. Sequence position **8** ([[queries]] — flows merge) wired by **6** ([[hooks]] — the posting).

Two faces, [[duality|dual]] not identical:
- **commercial** — the trade document (`typeCode` UN/CEFACT-1001: 380 invoice · 381 credit-note · order · quotation; [[party]] roles seller/buyer/ship-to; [[tax]]·[[currency]]·[[rate]]; lines as [[part|parts]]; the self-ref chain cart→order→invoice→note). It *is accountable* and points OUT to —
- **ledger** — the [[accounting]] journal entry (debit/credit lines that [[balance]]).

The physical↔metaphysical pair ([[duality]]); the [[number]] is its human handle, the content-[[identity|uuid]] its machine identity, and it is whole-bearing in every part ([[holographic]]).

Composes: [[give]]/[[take]] (sides) · [[balance]] (Σ=0) · [[flow]] (value moving) · [[party]] (between whom) · [[dimension]]/[[sti]] (the kind axis) · [[accounting]] (ledger face) · [[tax]]/[[currency]] (settlement) · [[duality]] (document↔entry) · [[number]] · [[identity]] · [[fx/transactions]] · [[transaction/failures]] · [[bank]] · [[hedge]].

## Common mistakes
- A collection per kind (`bank-transactions`, `fx-transactions`) — one `transactions`, kind as a [[dimension]] axis.
- Storing only one side — a transaction is dual; the other side [[balance|balances]] / posts.
- Conflating the commercial document with its ledger entry — they are [[duality|duals]] linked by *accountable*, not one row.

**Law — [[law]]: every transaction is two-sided and sums to zero — its debit and credit faces must both be recorded so the exchange balances, and no single side may stand alone.**
