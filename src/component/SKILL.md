---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 4/weave · 7cb3065b"
contentUuid: "b71a3464-1313-51ce-b7cf-e5720b72506b"
diamondUuid: "28e8bfb3-9c7e-8d74-9ded-8d5c0e678977"
uuid: "7cb3065b-a5cf-8b75-a976-9c480738f24a"
horo: 4
typography:
  partition: component
  bondDegree: 56
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
signatures:
  computationUuid: "7e1d274d-ca5e-8760-9e56-1df86e4d0794"
  stages:
    - stage: path
      stageUuid: "e1ef97d9-1bf4-8d59-8c82-0fce0f7ed3bc"
    - stage: trinity
      stageUuid: "9d78c89c-c816-8624-a0f7-92e100164874"
    - stage: boundary
      stageUuid: "00aaccec-5721-8eff-8530-13776fbfcffb"
    - stage: links
      stageUuid: "68baddcc-bbfd-8eb8-9f5f-091a59aefc5d"
    - stage: horo
      stageUuid: "cbf24ca2-f28a-8c69-ab5a-4b748932f01f"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "2494138d-ba8b-8828-a4d5-ac03f9bf003d"
version: 2
---
# component

Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility.

Composes: [[accessibility]] · theme · design · [[standard]] · [[pixel]] · [[atom]].

A component is an [[atom]] rendered as a reusable on-screen unit, so its visible identity is its content-[[uuid]] [[pixel]]: `componentPixel(uuid) = pixel(uuid)`. Matter-twin `src/component/index.ts` (`componentPixel` · `sameComponent`) reads the look off the identity — never hand-styles it.

## Standards
- design-system pattern libraries
- WAI-ARIA for semantics

**Law — [[law]]: a component is an atom rendered as a reusable unit, so its visible identity is exactly its content-uuid pixel; two components built from the same content are the same component on screen (sameComponent), because render is read off identity, never assigned.**

@audit a component's render is its atom-uuid pixel (via [[pixel]]) — computed, deterministic, never hand-styled
@standard WAI-ARIA semantics on a render whose identity is the content-uuid
