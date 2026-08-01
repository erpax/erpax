---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 2/share · 30048856"
contentUuid: "1a1af0f3-6c41-5141-84e4-2309e38a0eb1"
diamondUuid: "2c27e29f-8d19-80d1-804f-a4594c5ec228"
uuid: "30048856-5cab-84e2-b955-33a8e221d73f"
horo: 2
typography:
  partition: component
  bondDegree: 70
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
signatures:
  computationUuid: "ed116dde-d0ef-81c3-bdcd-3ed4d4a04e5c"
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
      stageUuid: "853c2009-fef2-8040-a89a-a9953dc7c765"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "bca2a16b-1afa-878d-9003-0a3804ce9760"
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
