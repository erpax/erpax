---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 4/weave · 66fa4a16"
contentUuid: "9eb1e613-e17d-5411-abad-9545d70678d7"
diamondUuid: "1eddd93c-7c55-8099-b1e9-d8cc05574964"
uuid: "66fa4a16-6b49-88ea-a283-39515221a824"
horo: 4
typography:
  partition: component
  bondDegree: 70
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
signatures:
  computationUuid: "2292fa6c-8f4d-8827-9e26-55b03ee84a14"
  stages:
    - stage: path
      stageUuid: "e1ef97d9-1bf4-8d59-8c82-0fce0f7ed3bc"
    - stage: trinity
      stageUuid: "9d78c89c-c816-8624-a0f7-92e100164874"
    - stage: boundary
      stageUuid: "00aaccec-5721-8eff-8530-13776fbfcffb"
    - stage: links
      stageUuid: "f8b1c5fe-f546-8e2b-bced-1dca1e60f051"
    - stage: horo
      stageUuid: "eac37627-22ae-84c6-9bc0-1db80643e953"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "2be21124-b924-8add-b5ac-7d529057ccb7"
version: 2
---
# component

Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility.

Composes: [[accessibility]] · [[theme]] · [[design]] · [[standard]] · [[pixel]] · [[atom]].

A component is an [[atom]] rendered as a reusable on-screen unit, so its visible identity is its content-[[uuid]] [[pixel]]: `componentPixel(uuid) = pixel(uuid)`. Matter-twin `src/component/index.ts` (`componentPixel` · `sameComponent`) reads the look off the identity — never hand-styles it.

## Standards
- design-system pattern libraries
- WAI-ARIA for semantics

**Law — [[law]]: a component is an atom rendered as a reusable unit, so its visible identity is exactly its content-uuid pixel; two components built from the same content are the same component on screen (sameComponent), because render is read off identity, never assigned.**

@audit a component's render is its atom-uuid pixel (via [[pixel]]) — computed, deterministic, never hand-styled
@standard WAI-ARIA semantics on a render whose identity is the content-uuid
