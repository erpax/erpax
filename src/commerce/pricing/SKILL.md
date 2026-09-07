---
name: pricing
description: "Use when reaching the pricing side of commerce — tiers, subscriptions, metered usage — through its own namespace; the face re-exports the commerce barrel while the matter is still being lifted out of the hub."
atomPath: "commerce/pricing"
coordinate: "commerce/pricing · 4/weave · d0027a11"
contentUuid: "ec178f0a-c453-592a-9043-5e4f99344796"
diamondUuid: "da5ddf11-f76a-8a59-ad9e-1729b924fda5"
uuid: "d0027a11-4288-8e34-9d08-10ce6a56b422"
horo: 4
typography:
  partition: commerce
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "7ed0b52d-7086-8c70-9b22-76aa25d74e53"
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
      stageUuid: "15fd8273-1983-80aa-9a68-c94626751fc9"
    - stage: seal
      stageUuid: "887b0e7f-336c-88dc-af23-187714c19217"
    - stage: uuid
      stageUuid: "e533d58a-0b2d-8b6b-81f1-a9ddd74c8ff3"
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
