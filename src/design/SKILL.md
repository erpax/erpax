---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: "design · 5/round · b3b15465"
contentUuid: "4106035f-7c0a-5b48-a6ae-210fc4898a52"
diamondUuid: "3739290f-e148-81ce-9432-99f47fcd61e9"
uuid: "b3b15465-d392-805a-b6ab-8656cedd6d96"
horo: 5
bonds:
  in:
    - accessibility
    - atom
    - color
    - component
    - components
    - css
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
    - css
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
  bondDegree: 60
  neighbors: []
standards:
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
    - css
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
    - css
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
  computationUuid: "faba1ab3-ec5e-8820-9b9c-68aae25f2c57"
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
      stageUuid: "cbf5a842-d8da-8b5d-82b5-687ea5f5eee2"
    - stage: seal
      stageUuid: "73ec4986-5c4f-887f-91a8-9634a27080c6"
    - stage: uuid
      stageUuid: "10f01cb5-656b-8742-8d9f-9ee61f991036"
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
