---
name: packs
description: "Use when modeling a shipping carton — the dispatch unit packed from a production lot, with mass balance (gross = net + tare), rollup counts, and a derived horo lifecycle. Evolved from 118,716 rows of etrima packs."
atomPath: packs
coordinate: packs · 1/base · 0ab22bcc
contentUuid: "c368c7e3-d2f0-5a3d-88da-689fa00f8010"
diamondUuid: "7f20c892-0aa1-8a07-9f95-4aca4e20449d"
uuid: "0ab22bcc-e92b-8ff2-80ef-85e20f5d523a"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - choice
    - coordinate
    - grade
    - horo
    - items
    - lots
    - orders
    - pack
    - pickup
    - postharvest
  out:
    - accounting
    - balance
    - choice
    - coordinate
    - grade
    - horo
    - items
    - lots
    - orders
    - pack
    - pickup
    - postharvest
typography:
  partition: packs
  bondDegree: 40
  neighbors: []
standards:
  - "GS1 logistics SSCC carton-identity (the `number` / `barcode`)"
  - "IFRS IAS-2 §10 finished-goods carried to dispatch"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-operations dispatch"
  - "ISO-19011:2018 audit-trail dispatch"
  - "ISO/IEC-29119"
  - "UN-CEFACT"
  - "UN/CEFACT Rec20 weight (kilogram) · volume (cubic-metre)"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - coordinate
    - horo
    - items
    - lots
    - orders
  matrix:
    - accounting
    - balance
    - choice
    - coordinate
    - grade
    - horo
    - items
    - lots
    - orders
    - pack
    - pickup
    - postharvest
  backlinks:
    - accounting
    - balance
    - choice
    - coordinate
    - grade
    - horo
    - items
    - lots
    - orders
    - pack
    - pickup
    - postharvest
signatures:
  computationUuid: "90f1377c-cd54-868e-87aa-b0b05b9d4461"
  stages:
    - stage: path
      stageUuid: "e5c22266-1d75-8e8a-ae9f-8e06e46a4dab"
    - stage: trinity
      stageUuid: "606ab9b4-0fac-8a7c-9218-59c4964f5128"
    - stage: boundary
      stageUuid: "febe7d5f-db23-8109-b6d5-778e98395444"
    - stage: links
      stageUuid: "896a9210-1def-89cf-bb7b-7c74522adde1"
    - stage: horo
      stageUuid: "8368d445-b725-8e74-9271-b98db11cc5e9"
    - stage: seal
      stageUuid: "f6a78ac5-a64f-8090-8dcf-81d3abe73c07"
    - stage: uuid
      stageUuid: "5d980032-76fd-8f9e-8f68-3a2b839b2bcb"
version: 2
---
# packs — the dispatch carton

One pack is one carton of dispatch, packed from a production [[lots|lot]] — the end of the manufacturing flow ([[work/orders]] → [[lots]] → pack → ship). Evolved from 118,716 rows of the 20-year etrima `packs` ledger; the model below is the **data-true** encoding, the Rails accidents dropped.

**Lifecycle is DERIVED, never stored.** AUDIT: `status` was NULL in 100% of rows — the carton's state lived in its unit and weight watermarks. `derivePackState` (afterRead) reads the seven-position [[horo]] ring `open · packing · packed · weighed · shipped · delivered · closed` from packing progress + the seal timestamps. The ring is harmony-checked at build time (off-ring throws).

**Mass balance — the carton's double-entry of weight.** `grossWeight = netWeight + tareWeight` ([[balance]]): when net and tare are both given the gross is derived as their sum, so the three masses can never drift; a standalone weigh-bridge gross stands alone. AUDIT: weight populated on ~42% of rows (weighed when weighed). Units roll up from the lines: `unitsPacked = Σ` [[pack/items]]`.unitsPacked` (>0 on 99.99% of rows).

**The cross.** `lot` → [[lots]] is a real relationship (AUDIT: 0.02% null — effectively required). The not-yet-minted dispatch siblings (pallet, packaging, packing-list, client) are content-addressed CODES so the leaf stays merge-safe ([[coordinate]]) — they wire to real relationships once those collections land. DEAD columns dropped: `order_id` (100% null), `tracking_number` (0% populated).

Matter-twin: `src/packs/index.ts`. Composes [[lots]] · [[pack/items]] · [[horo]] · [[balance]] · [[coordinate]] · [[accounting]].
