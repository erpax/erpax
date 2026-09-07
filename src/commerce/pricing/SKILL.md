---
name: pricing
description: "Use when reaching the pricing side of commerce — tiers, subscriptions, metered usage — through its own namespace; the face re-exports the commerce barrel while the matter is still being lifted out of the hub."
atomPath: "commerce/pricing"
coordinate: "commerce/pricing · 7/descent · 1bfa1085"
contentUuid: "7d381e96-f7b2-5f07-89d6-e75bf54625bf"
diamondUuid: "e8c638ce-432e-8067-9249-738f1c567f4e"
uuid: "1bfa1085-5b4c-886e-8bd0-508781f23569"
horo: 7
typography:
  partition: commerce
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "bd4bdd17-b7a9-82f6-b042-3ff4225f3281"
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
      stageUuid: "2cfe34ac-9d72-814b-b54a-bba98885cb96"
    - stage: seal
      stageUuid: "887b0e7f-336c-88dc-af23-187714c19217"
    - stage: uuid
      stageUuid: "b41915a1-0b0b-8743-b1d9-ec9a18b24e4a"
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
