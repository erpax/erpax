---
name: pricing
description: "Use when reaching the pricing side of commerce — tiers, subscriptions, metered usage — through its own namespace; the face re-exports the commerce barrel while the matter is still being lifted out of the hub."
atomPath: "commerce/pricing"
coordinate: "commerce/pricing · 4/weave · af45494b"
contentUuid: "924469df-6ed8-5ef6-9619-2dc4b30aef92"
diamondUuid: "bdef9275-70f2-8ee7-9cf9-542470c94844"
uuid: "af45494b-1da3-8154-9aa2-bce89c493832"
horo: 4
typography:
  partition: commerce
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "e417642b-85d7-8bfd-aed2-d83b4a14c75e"
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
      stageUuid: "43d87bd7-5137-8479-a738-fb1195d9b46b"
    - stage: seal
      stageUuid: "887b0e7f-336c-88dc-af23-187714c19217"
    - stage: uuid
      stageUuid: "cf8d5c99-6d1d-89c5-8063-fe01335443a2"
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
