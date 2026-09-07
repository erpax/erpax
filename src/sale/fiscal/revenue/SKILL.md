---
name: revenue
description: "Use when recognising the revenue of a fiscalised sale — turns a closed sale into the accounting fact, and reverses it through the reverse path rather than deleting anything."
atomPath: "sale/fiscal/revenue"
coordinate: "sale/fiscal/revenue · 8/crest · 1126d51e"
contentUuid: "df7f4078-93d6-5e39-9261-f26e6cd49aa7"
diamondUuid: "d020de55-20a7-814d-aec6-95e619bc3f8f"
uuid: "1126d51e-8f7e-8d2b-ac5c-fe95755d7825"
horo: 8
typography:
  partition: sale
  bondDegree: 42
standards:
  - "BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 fiscalization-scope"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "870b1537-087a-831e-be5b-cb2c0a224a03"
  stages:
    - stage: path
      stageUuid: "61acffc3-b56a-8e09-a4ee-0523ced75356"
    - stage: trinity
      stageUuid: "a28d62d4-42c4-8d57-93d7-54b7c0f6d8ee"
    - stage: boundary
      stageUuid: "08437e9f-8a52-88f4-9196-8c1e40a48ab0"
    - stage: links
      stageUuid: "170599cd-229a-8427-92ef-ca9f4afbec78"
    - stage: horo
      stageUuid: "8f3dd217-fcaa-87a4-9f17-cd16950f0581"
    - stage: seal
      stageUuid: "62910cc0-15a0-81a3-af76-92a6194d83f2"
    - stage: uuid
      stageUuid: "842fe142-011c-8c3a-b188-5df73dd5b5e7"
version: 2
---
# revenue

Recognises the revenue of a fiscalised sale. It composes [[sale/fiscal/context]] for the device and [[sale/reverse]] for the correction path — because a fiscal sale is never deleted: it is **reversed**, and both entries stay.

## One membrane, many sources

Every source-specific bridge — `order-fiscalization`, `subscription-fiscalization`,
and any future POS or invoice path — is a **thin adapter** that maps its event payload
into a `RevenueInput` and delegates here. That is deliberate: the no-bypass invariant,
the **чл. 3 ал. 1** fiscalisation-scope rule, ФУ resolution, idempotency and the сторно
logic then exist in exactly ONE place. A second implementation of any of them is the
duplication this corpus treats as camouflage — while one rule is stated twice, nothing
can show a third caller is missing it.

A sale records its origin in a polymorphic `source` group (`{type, ref}` — the STI
discriminator), and that pair is what keys both idempotency and сторно.

**The two records are not the same kind of thing.** The source document is the
*mutable* commercial record; the fiscal sale is the *immutable*, gapless-УНП register
entry ([[sale/immutability]]). This membrane is the join, and it is the only lawful
crossing.

Composes: [[sale]] · [[sale/fiscal/context]] · [[sale/reverse]] · [[law]].
