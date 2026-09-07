---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 2/share · 356860d4"
contentUuid: "b3b71bca-bee7-52d7-bc8c-171758ee3871"
diamondUuid: "b00ff6cb-1f1e-8512-b8fc-29833922fcb7"
uuid: "356860d4-d9d5-83bf-babd-a1a3b32b81b6"
horo: 2
typography:
  partition: component
  bondDegree: 70
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
signatures:
  computationUuid: "b03fdd45-bbee-816d-b517-1c085dda9e9f"
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
      stageUuid: "93e3a58b-8f3a-865b-9e4e-61f1824dfc63"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "5c471d42-117e-8ac8-8a49-8abfe015e3f8"
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
