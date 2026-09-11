---
name: items
description: "Use when modeling a pack line — the units of one produced lot-variant packed into one carton; header-primary with an optional option breakdown whose double-entry holds when supplied. Evolved from 200,993 rows of etrima pack_items."
atomPath: "pack/items"
coordinate: "pack/items · 8/crest · e16f5f12"
contentUuid: "8a53e596-ddf9-5a44-8de7-412ac345cbef"
diamondUuid: "250e39f7-934f-8b33-a57f-dfdfb4a36eae"
uuid: "e16f5f12-52e0-8bda-8769-bb849e3289ff"
horo: 8
typography:
  partition: pack
  bondDegree: 116
standards:
  - "IFRS IAS-2 §10 finished-goods at dispatch"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-operations dispatch line"
  - "UN-CEFACT"
  - "UN/CEFACT Rec20 mass (gram) per-unit"
bindings: []
signatures:
  computationUuid: "925b240d-c8d4-8bd0-8f8b-ffa7ffbc9c7f"
  stages:
    - stage: path
      stageUuid: "2d61d636-2b0d-8b4f-8144-c1aba7d389c3"
    - stage: trinity
      stageUuid: "28cfe5f8-cced-8893-9a24-07e003ee4541"
    - stage: boundary
      stageUuid: "b2093f39-a1a6-880f-a40a-8ab4bcc66104"
    - stage: links
      stageUuid: "50602e12-e6fd-85b5-9c91-c75c7ad1a730"
    - stage: horo
      stageUuid: "213c5668-4a59-83ab-a430-ee004041741c"
    - stage: seal
      stageUuid: "3a93a549-a764-85bc-be3f-cd3d1e70751b"
    - stage: uuid
      stageUuid: "b24265bd-fa04-8ac0-b51c-ab38ea76b840"
version: 2
---
# pack/items — the pack line

One pack line is the units of one produced [[lot/variants|lot-variant]] packed into one [[packs|pack]] — the entry the carton's `unitsPacked` total rolls up from. Evolved from 200,993 rows of etrima `pack_items`.

**Header-primary, options optional.** AUDIT: the header `unitsPacked` carries the quantity on 99.92% of rows; the 12 fixed `option_N` slots are used on only 0.17%. So `options[]` is an OPTIONAL fine-grained breakdown ([[field|discriminator]] — many columns ⇒ one array). `rollUpOptions` (beforeChange) enforces the law: **options present ⇒ header = Σ options** (the double-entry held at 100.0000% in the data); options absent ⇒ the recorded header stands. Always `unitsBackordered = max(0, ordered − packed)` — the unpacked remainder ([[balance]]).

**The cross is `pack` ⊕ `lotVariant`, both real relationships** now those collections are minted. AUDIT dropped the DEAD `item_id` (NULL in 100% of rows): the line does not point at the catalog item — it points at the produced [[lot/variants|lot-variant]] (0% null). Per-option grams (`unitGrams` / `netUnitGrams`) ride the option line for the rare weighed breakdown, feeding the [[packs|pack]] mass balance.

Matter-twin: `src/pack/items/index.ts`. Composes [[packs]] · [[lot/variants]] · [[balance]] · [[field|discriminator]] · [[coordinate]] · [[accounting]].

**Law — [[law]]: a pack line is the units of one produced [[lot/variants|lot-variant]] packed into one [[packs|pack]] — header-primary with an optional option breakdown whose double-entry holds when supplied (options present ⇒ header = Σ options; `unitsBackordered = max(0, ordered − packed)`).**
