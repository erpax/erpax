---
name: transaction
description: "Use when reasoning about transaction — A **transaction** is the atom of business: a balance|balanced flow of value between party|parties — two sides (give/take, debit/credit, seller/buyer) that sum to zero. It is the pr"
atomPath: transaction
coordinate: "transaction · 5/round · 0729448f"
contentUuid: "7bbb7a83-3fa0-58ed-88a7-54c07e6a7199"
diamondUuid: "4d474b0b-90f2-8c98-8ab2-02cc3e456364"
uuid: "0729448f-5071-83ae-ac99-f893569f98b1"
horo: 5
typography:
  partition: transaction
  bondDegree: 281
standards: []
bindings: []
signatures:
  computationUuid: "5cab91aa-38f5-8c01-9e77-003a40154b9b"
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
      stageUuid: "1982c81f-bbc2-8d1f-a770-a7ce96936bc5"
    - stage: seal
      stageUuid: "98754e3c-b2af-843b-adcc-38ea475d5bd1"
    - stage: uuid
      stageUuid: "9748dfde-e203-8f9e-874f-ec91820f0ee2"
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
