---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 1/base · a407f908"
contentUuid: "e495003d-30d2-55f6-9bba-c6e345a940b3"
diamondUuid: "a737c8c6-2727-8b67-9fe4-1352eb7c612f"
uuid: "a407f908-cb9f-8b91-a968-b0764f054cd7"
horo: 1
typography:
  partition: component
  bondDegree: 37
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
signatures:
  computationUuid: "82f88f5a-2f21-804a-8438-f78e75b06b64"
  stages:
    - stage: path
      stageUuid: "e1ef97d9-1bf4-8d59-8c82-0fce0f7ed3bc"
    - stage: trinity
      stageUuid: "9d78c89c-c816-8624-a0f7-92e100164874"
    - stage: boundary
      stageUuid: "00aaccec-5721-8eff-8530-13776fbfcffb"
    - stage: links
      stageUuid: "bf18b8ce-b883-87b7-b4a3-0b21df129b25"
    - stage: horo
      stageUuid: "f87fd796-e4ca-8404-914a-7e0807c61219"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "42b87dd3-56b3-8113-928b-5f8bdee3aca9"
version: 2
---
# component

Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility.

Composes: accessibility · theme · design · [[standard]] · [[pixel]] · [[atom]].

A component is an [[atom]] rendered as a reusable on-screen unit, so its visible identity is its content-[[uuid]] [[pixel]]: `componentPixel(uuid) = pixel(uuid)`. Matter-twin `src/component/index.ts` (`componentPixel` · `sameComponent`) reads the look off the identity — never hand-styles it.

## Standards
- design-system pattern libraries
- WAI-ARIA for semantics

**Law — [[law]]: a component is an atom rendered as a reusable unit, so its visible identity is exactly its content-uuid pixel; two components built from the same content are the same component on screen (sameComponent), because render is read off identity, never assigned.**

@audit a component's render is its atom-uuid pixel (via [[pixel]]) — computed, deterministic, never hand-styled
@standard WAI-ARIA semantics on a render whose identity is the content-uuid
