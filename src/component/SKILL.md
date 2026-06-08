---
name: component
description: "Use when defining a reusable UI building block — button, card, modal, form field, input. The atomic UI element with consistent design, behavior, and accessibility."
atomPath: component
coordinate: component · 8/crest · 85b1a023
contentUuid: "47827d9b-ac2e-5131-8382-a19876dde253"
diamondUuid: "4742aeac-8dc7-82ae-89ce-dabe77f035c5"
uuid: "85b1a023-006a-8cf0-aa59-7404cb80553b"
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
  - "a component's render is its atom-uuid pixel (via [[pixel]]) — computed, deterministic, never hand-styled"
  - "a component's visible identity IS its atom-uuid pixel — computed, never hand-styled"
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
  computationUuid: "a390e810-5c3f-8d93-aeed-8aca99d49615"
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
      stageUuid: "64105485-e1e0-8f47-ab9c-d38a3f020056"
    - stage: seal
      stageUuid: "44896f06-0e2e-8921-af8d-e9c1df4ac227"
    - stage: uuid
      stageUuid: "ce23c151-4529-85a1-80ee-50c2e85b1a7c"
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
