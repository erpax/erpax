---
name: pricing
description: "Use when reaching the pricing side of commerce — tiers, subscriptions, metered usage — through its own namespace; the face re-exports the commerce barrel while the matter is still being lifted out of the hub."
atomPath: "commerce/pricing"
coordinate: "commerce/pricing · 8/crest · 8069ac6c"
contentUuid: "5521197c-5b96-5e9d-87e7-09256855e6db"
diamondUuid: "933b8b37-893c-8ab7-b2a7-d4614e95e1a1"
uuid: "8069ac6c-ab93-89ab-bb37-343adbf8692e"
horo: 8
typography:
  partition: commerce
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "14955cb7-a5d5-8bdc-8e86-1df1cb155686"
  stages:
    - stage: path
      stageUuid: "2e1bdb9d-c5fa-8b17-9176-0c056bcc68f5"
    - stage: trinity
      stageUuid: "3a9d3731-303e-87fe-89e5-80ebeca02a3c"
    - stage: boundary
      stageUuid: "293b55d9-c4a3-81fd-9fef-fe0b7af6b760"
    - stage: links
      stageUuid: "f7d5a487-0494-8c6f-a9bb-f6d43bd24710"
    - stage: horo
      stageUuid: "8e9520f8-7fc3-88b1-9cfc-4ea309458cd7"
    - stage: seal
      stageUuid: "887b0e7f-336c-88dc-af23-187714c19217"
    - stage: uuid
      stageUuid: "e5ccaa56-83d5-8d8e-bd16-6cbbb4b55724"
version: 2
---
# commerce/pricing — the pricing face of [[commerce]]

`index.ts` re-exports the parent barrel, so `@/commerce/pricing` offers exactly what `@/commerce`
offers today. **The matter has not moved yet**: this atom is the namespace a hub split named for
the price side of commerce — tiers, subscriptions and metered usage, and its own `test.ts` pins the FACE so a caller importing through this path keeps
working while the extraction is finished.

Stated rather than dressed up: until the pricing matter is lifted out of the parent, this is a
namespaced view, not a separate implementation ([[rules]]/concentration — matter belongs in the
child, and here it still sits in the hub).

Composes: [[commerce]].

Composes: [[money]].
