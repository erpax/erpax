---
name: packs
description: "Use when modeling a shipping carton — the dispatch unit packed from a production lot, with mass balance (gross = net + tare), rollup counts, and a derived horo lifecycle. Evolved from 118,716 rows of etrima packs."
atomPath: packs
coordinate: "packs · 2/share · 2b46cdd8"
contentUuid: "bc3db4c6-b1e8-586f-a58d-e05e2477b35d"
diamondUuid: "d3a1769e-f38f-8bfb-b9ab-046757e54d31"
uuid: "2b46cdd8-73c2-8c13-bb5a-f8a7d071975b"
horo: 2
typography:
  partition: packs
  bondDegree: 43
standards:
  - "GS1 logistics SSCC carton-identity (the `number` / `barcode`)"
  - "IFRS IAS-2 §10 finished-goods carried to dispatch"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-operations dispatch"
  - "UN-CEFACT"
  - "UN/CEFACT Rec20 weight (kilogram) · volume (cubic-metre)"
bindings: []
signatures:
  computationUuid: "f68c810e-a6c7-8968-8c40-a7fbc64654c6"
  stages:
    - stage: path
      stageUuid: "e5c22266-1d75-8e8a-ae9f-8e06e46a4dab"
    - stage: trinity
      stageUuid: "606ab9b4-0fac-8a7c-9218-59c4964f5128"
    - stage: boundary
      stageUuid: "2b3d37b7-c928-8953-bb1c-2373bf4f97db"
    - stage: links
      stageUuid: "896a9210-1def-89cf-bb7b-7c74522adde1"
    - stage: horo
      stageUuid: "0e6e99d1-398d-87f2-a5a4-5debd7d0a6d1"
    - stage: seal
      stageUuid: "1a697082-17a7-82cc-a5d1-173cd83ee2f6"
    - stage: uuid
      stageUuid: "7cc51491-78b1-8e98-b9eb-8e57c2e2e4a1"
version: 2
---
# packs — the dispatch carton

One pack is one carton of dispatch, packed from a production [[lots|lot]] — the end of the manufacturing flow ([[work/orders]] → [[lots]] → pack → ship). Evolved from 118,716 rows of the 20-year etrima `packs` ledger; the model below is the **data-true** encoding, the Rails accidents dropped.

**Lifecycle is DERIVED, never stored.** AUDIT: `status` was NULL in 100% of rows — the carton's state lived in its unit and weight watermarks. `derivePackState` (afterRead) reads the seven-position [[horo]] ring `open · packing · packed · weighed · shipped · delivered · closed` from packing progress + the seal timestamps. The ring is harmony-checked at build time (off-ring throws).

**Mass balance — the carton's double-entry of weight.** `grossWeight = netWeight + tareWeight` ([[balance]]): when net and tare are both given the gross is derived as their sum, so the three masses can never drift; a standalone weigh-bridge gross stands alone. AUDIT: weight populated on ~42% of rows (weighed when weighed). Units roll up from the lines: `unitsPacked = Σ` [[pack/items]]`.unitsPacked` (>0 on 99.99% of rows).

**The cross.** `lot` → [[lots]] is a real relationship (AUDIT: 0.02% null — effectively required). The not-yet-minted dispatch siblings (pallet, packaging, packing-list, client) are content-addressed CODES so the leaf stays merge-safe ([[coordinate]]) — they wire to real relationships once those collections land. DEAD columns dropped: `order_id` (100% null), `tracking_number` (0% populated).

Matter-twin: `src/packs/index.ts`. Composes [[lots]] · [[pack/items]] · [[horo]] · [[balance]] · [[coordinate]] · [[accounting]].
