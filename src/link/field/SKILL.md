---
name: field
description: "Use when reasoning about field — builds the field: an internal choice resolves against a collection, an external one takes a URI, and decides how it renders without changing what it means. is that closed set."
atomPath: "link/field"
coordinate: "link/field · 4/weave · 6bb8c080"
contentUuid: "087b5d03-0f55-598e-ae1e-69917091caa3"
diamondUuid: "6310d9f4-86e2-82fb-bb10-93e66b2ff1b3"
uuid: "6bb8c080-f3f6-8b95-85de-b020a428c63d"
horo: 4
typography:
  partition: link
  bondDegree: 361
standards:
  - "3986 uniform-resource-identifier"
  - "BCP-47 language-tag locale-aware"
  - "W3C HTML5 anchor-element"
  - W3C URL Living Standard
  - "WCAG-2.1 §2.4.4 link-purpose-in-context"
bindings: []
signatures:
  computationUuid: "cf683daf-7186-8f1c-940a-a1622b6acdd9"
  stages:
    - stage: path
      stageUuid: "955f5aab-a7a6-8004-a46d-f35968ee7647"
    - stage: trinity
      stageUuid: "8c2c95d3-f884-8ada-b5fc-550a4775205d"
    - stage: boundary
      stageUuid: "8d8b653c-7f40-8677-88a3-4fb09dbdb5ee"
    - stage: links
      stageUuid: "dbbdb86d-9d04-833f-bea4-20aa359fc11a"
    - stage: horo
      stageUuid: "283bbe48-6e9b-8057-b8fc-e8778b085c95"
    - stage: seal
      stageUuid: "305fbaf8-7932-8718-80b1-6988144530e5"
    - stage: uuid
      stageUuid: "de622058-711c-8f52-a448-9efc52fae1c8"
version: 2
---
# link/field — one field for an internal reference or an external URL

`link` builds the field: an internal choice resolves against a collection, an external one takes
a URI, and `appearanceOptions` decides how it renders without changing what it means.
`LinkAppearances` is that closed set.

Two separate fields for "link to a page" and "link to a site" makes every consumer branch on
which one was filled.


Composes: [[law]].
