---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: "design · 4/weave · 892556a9"
contentUuid: "52118d0f-c537-58cd-9f17-677ba2948860"
diamondUuid: "c061b26d-4217-8f4a-93da-80fd78db9f16"
uuid: "892556a9-76c7-8fb0-a34a-dfd022dbd799"
horo: 4
typography:
  partition: design
  bondDegree: 60
standards:
  - "the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)"
bindings: []
signatures:
  computationUuid: "34baf0da-fe4a-8fe9-a00b-9b707c040844"
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
      stageUuid: "1550a572-d358-872b-b81c-6e4ad052b404"
    - stage: seal
      stageUuid: "73ec4986-5c4f-887f-91a8-9634a27080c6"
    - stage: uuid
      stageUuid: "6707533b-3877-8f51-aca0-b02c7e65f01b"
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
