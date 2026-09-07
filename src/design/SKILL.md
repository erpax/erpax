---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
atomPath: design
coordinate: "design · 7/descent · dff1636d"
contentUuid: "aa277042-66d4-56ba-843f-ec4cd8da2883"
diamondUuid: "b756805a-67b0-89eb-81fa-4d1d5da8fcea"
uuid: "dff1636d-764a-85ad-acdf-939477098d65"
horo: 7
typography:
  partition: design
  bondDegree: 60
standards:
  - "the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)"
bindings: []
signatures:
  computationUuid: "9db8241a-3f1a-8942-9384-335f99583d11"
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
      stageUuid: "902fd0c0-bccb-83e2-8a1c-f6b67b9a777a"
    - stage: seal
      stageUuid: "73ec4986-5c4f-887f-91a8-9634a27080c6"
    - stage: uuid
      stageUuid: "dfe2f8f8-3515-8e3e-8159-49758bd641f4"
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
