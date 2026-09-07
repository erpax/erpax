---
name: pricing
description: "Use when reaching the pricing side of commerce — tiers, subscriptions, metered usage — through its own namespace; the face re-exports the commerce barrel while the matter is still being lifted out of the hub."
atomPath: "commerce/pricing"
coordinate: "commerce/pricing · 5/round · 56544456"
contentUuid: "b4540b6a-ea52-5caa-9e21-14b4867e04ee"
diamondUuid: "ddbdafbf-857d-83a0-9805-974dcfc67699"
uuid: "56544456-3835-8a29-b78b-f2361f506008"
horo: 5
typography:
  partition: commerce
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "961f89a4-d4a1-817a-b26f-5fac2bf72028"
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
      stageUuid: "c2128cba-e84a-8d11-9cba-15fae73100a5"
    - stage: seal
      stageUuid: "887b0e7f-336c-88dc-af23-187714c19217"
    - stage: uuid
      stageUuid: "cdcba965-a43c-871f-b2dd-2469cb8e2ebb"
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
