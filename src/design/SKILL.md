---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: design · 4/weave · 20b4b76c
contentUuid: "fdf18591-7945-5ecb-8622-96d57d0555ed"
diamondUuid: "080e74f5-17a5-8b6a-8d3b-22a6c6abbedc"
uuid: "20b4b76c-cbfc-85f8-afe7-326ee760b3bd"
horo: 4
bonds:
  in:
    - accessibility
    - atom
    - color
    - component
    - components
    - law
    - medical
    - observational
    - pixel
    - research
    - standard
    - study
    - theme
    - token
    - trial
    - ui
    - uncertainty
    - uuid
  out:
    - accessibility
    - atom
    - color
    - component
    - components
    - law
    - medical
    - observational
    - pixel
    - research
    - standard
    - study
    - theme
    - token
    - trial
    - ui
    - uncertainty
    - uuid
typography:
  partition: design
  bondDegree: 57
  neighbors: []
standards:
  - "every token/palette entry is computed from an atom's uuid via pixel(); no hardcoded hex"
  - every token/palette/role colour computed via pixel(uuid); zero hardcoded hex in the design system
  - "the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)"
bindings: []
neighbors:
  wikilink:
    - accessibility
    - atom
    - color
    - component
    - law
    - pixel
    - research
    - standard
    - theme
    - uuid
  matrix:
    - accessibility
    - atom
    - color
    - component
    - components
    - law
    - medical
    - observational
    - pixel
    - research
    - standard
    - study
    - theme
    - token
    - trial
    - ui
    - uncertainty
    - uuid
  backlinks:
    - accessibility
    - atom
    - color
    - component
    - components
    - law
    - medical
    - observational
    - pixel
    - research
    - standard
    - study
    - theme
    - token
    - trial
    - ui
    - uncertainty
    - uuid
signatures:
  computationUuid: "86d38ccc-beb4-8fa0-a9f5-9c56c2eedfb6"
  stages:
    - stage: path
      stageUuid: "62cc72ba-9cae-8220-9ff9-2651c1b2a207"
    - stage: trinity
      stageUuid: "89197ad0-23d3-86aa-ba4d-f430ef8e2c81"
    - stage: boundary
      stageUuid: "9cb6cca3-c90d-87dd-b6fc-97b4f571993b"
    - stage: links
      stageUuid: "bba72066-651c-878a-a767-40a7a319d91d"
    - stage: horo
      stageUuid: "36199524-320f-84da-a089-7a41df9ad3a8"
    - stage: seal
      stageUuid: "b9d97b1e-315c-8bbf-a25b-f1875908883a"
    - stage: uuid
      stageUuid: "b5f52864-5e90-865d-93a4-46da9f85b730"
version: 2
---
# design

Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form.

Composes: [[component]] · [[theme]] · [[accessibility]] · [[research]] · [[standard]] · [[pixel]] · [[color]].

The design **system** is computed, not curated: every UI colour is some [[atom]]'s [[pixel]] — its content-[[uuid]] rendered (digit → A432 [[color]]). `token(uuid)` returns that atom's pixel colour, `palette(uuids)` the deduped colour set, `tokens({role: uuid})` the named role map. Matter-twin: `src/design/index.ts`.

## Standards
- design-thinking process
- WCAG accessibility
- usability heuristics

**Law — [[law]]: the design system holds no colour of its own — every token, palette entry and semantic role is read off an atom's [[pixel]] (`token(uuid) = pixel(uuid).color`), so not one hardcoded hex exists in it; to recolour a token is to recontent its atom (and change its identity), and the system can never drift from the corpus it renders.**

@audit every token/palette/role colour computed via pixel(uuid); zero hardcoded hex in the design system
@standard the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)
