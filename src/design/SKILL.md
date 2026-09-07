---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: "design · 8/crest · cc314e73"
contentUuid: "c53b64a2-7b46-513e-9a1f-cd041712e19a"
diamondUuid: "1c76d175-8068-8a6b-8482-6ae3349d2082"
uuid: "cc314e73-fb05-886a-96db-3ffc9ee1ce8a"
horo: 8
typography:
  partition: design
  bondDegree: 60
standards:
  - "the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)"
bindings: []
signatures:
  computationUuid: "a13edfbf-3e60-80d2-9ee9-a385107f7b4a"
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
      stageUuid: "ec4c96cb-2433-8e15-ba28-aaba871e158d"
    - stage: seal
      stageUuid: "73ec4986-5c4f-887f-91a8-9634a27080c6"
    - stage: uuid
      stageUuid: "6c26e9ef-31d9-86f2-8dd3-ce74513d3e0d"
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
