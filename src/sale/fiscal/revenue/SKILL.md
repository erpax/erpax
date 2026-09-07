---
name: revenue
description: "Use when recognising the revenue of a fiscalised sale — turns a closed sale into the accounting fact, and reverses it through the reverse path rather than deleting anything."
atomPath: "sale/fiscal/revenue"
coordinate: "sale/fiscal/revenue · 2/share · 316e495d"
contentUuid: "f5583eb1-34f9-5e94-a411-5ae8d23d17b1"
diamondUuid: "9f79d788-565c-8de1-abe3-083ef1879787"
uuid: "316e495d-9757-8921-bc07-8ed6ad41906f"
horo: 2
typography:
  partition: sale
  bondDegree: 42
standards:
  - "BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 fiscalization-scope"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "aad3869f-dc7d-81d6-903d-0069742526dd"
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
      stageUuid: "19ac0225-b78f-8355-8686-a2a30ecb2cf1"
    - stage: seal
      stageUuid: "62910cc0-15a0-81a3-af76-92a6194d83f2"
    - stage: uuid
      stageUuid: "72da9f19-3fe7-8ae3-9c99-4d3f7d1a6f7a"
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
