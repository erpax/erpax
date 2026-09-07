---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: "design · 8/crest · c80d8995"
contentUuid: "55fe2dc8-705e-5c8f-8657-d545178a2aca"
diamondUuid: "c8e347c2-7269-8a44-bc83-91371bc4094f"
uuid: "c80d8995-1279-87a2-9219-05c3960883fa"
horo: 8
typography:
  partition: design
  bondDegree: 60
standards:
  - "the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)"
bindings: []
signatures:
  computationUuid: "b4d6f3f6-a654-8c1b-b3d8-c30883966e5c"
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
      stageUuid: "68196a7b-cd16-84ea-a26f-999b58fb1a93"
    - stage: seal
      stageUuid: "73ec4986-5c4f-887f-91a8-9634a27080c6"
    - stage: uuid
      stageUuid: "4d14d0d2-930a-88fb-8adf-81b6c93e5b57"
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
