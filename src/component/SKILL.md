---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: "component · 8/crest · f99c710b"
contentUuid: "395b550b-0cb6-5512-b2d1-32b5fdef15f7"
diamondUuid: "02f2f12d-1b1a-82de-bdd4-7b62f44c2039"
uuid: "f99c710b-7d6f-8488-92b8-5f7e55dec488"
horo: 8
bonds:
  in:
    - accessibility
    - archive
    - atom
    - component
    - components
    - computer
    - css
    - design
    - diamond
    - enumeration
    - interactive
    - law
    - pixel
    - price
    - primitive
    - render
    - standard
    - theme
    - token
    - ui
    - uuid
  out:
    - accessibility
    - archive
    - atom
    - component
    - components
    - computer
    - css
    - design
    - diamond
    - enumeration
    - interactive
    - law
    - pixel
    - price
    - primitive
    - render
    - standard
    - theme
    - token
    - ui
    - uuid
typography:
  partition: component
  bondDegree: 70
  neighbors: []
standards:
  - "WAI-ARIA semantics on a render whose identity is the content-uuid"
bindings: []
neighbors:
  wikilink:
    - accessibility
    - atom
    - design
    - law
    - pixel
    - standard
    - theme
    - uuid
  matrix:
    - accessibility
    - archive
    - atom
    - component
    - components
    - computer
    - css
    - design
    - diamond
    - enumeration
    - interactive
    - law
    - pixel
    - price
    - primitive
    - render
    - standard
    - theme
    - token
    - ui
    - uuid
  backlinks:
    - accessibility
    - archive
    - atom
    - component
    - components
    - computer
    - css
    - design
    - diamond
    - enumeration
    - interactive
    - law
    - pixel
    - price
    - primitive
    - render
    - standard
    - theme
    - token
    - ui
    - uuid
signatures:
  computationUuid: "31352eed-2e5c-884c-aa65-1fa5d2a91723"
  stages:
    - stage: path
      stageUuid: "e1ef97d9-1bf4-8d59-8c82-0fce0f7ed3bc"
    - stage: trinity
      stageUuid: "9d78c89c-c816-8624-a0f7-92e100164874"
    - stage: boundary
      stageUuid: "00aaccec-5721-8eff-8530-13776fbfcffb"
    - stage: links
      stageUuid: "efeb6f55-ad7d-88f5-97f4-e901a41620ed"
    - stage: horo
      stageUuid: "f55bfe34-d893-8eb9-b643-3ff5f24fc997"
    - stage: seal
      stageUuid: "b3c3e737-d41d-8e21-a31c-0d5ed14fec00"
    - stage: uuid
      stageUuid: "6f612c9a-9938-8867-a7d1-57512004faac"
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
