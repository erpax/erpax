---
name: transaction
description: "Use when reasoning about transaction — A **transaction** is the atom of business: a balance|balanced flow of value between party|parties — two sides (give/take, debit/credit, seller/buyer) that sum to zero. It is the pr"
atomPath: transaction
coordinate: "transaction · 2/share · 4fc81d9e"
contentUuid: "62432c94-856c-51a0-ad86-ca5caf7d2e2e"
diamondUuid: "ef4c65ec-2cb5-82cb-bb9b-beaaebaeaa96"
uuid: "4fc81d9e-4bcc-821f-844b-70e900c5a6dc"
horo: 2
typography:
  partition: transaction
  bondDegree: 281
standards: []
bindings: []
signatures:
  computationUuid: "ea45ca96-5a4f-8c25-991c-3ebd920d8a16"
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
      stageUuid: "ded07c57-01b0-8f14-846b-aa31a171356d"
    - stage: seal
      stageUuid: "98754e3c-b2af-843b-adcc-38ea475d5bd1"
    - stage: uuid
      stageUuid: "90892ecd-75bc-89d6-ac3c-658614704b3b"
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
