---
name: field
description: "Use when reasoning about field — builds the field: an internal choice resolves against a collection, an external one takes a URI, and decides how it renders without changing what it means. is that closed set."
atomPath: "link/field"
coordinate: "link/field · 8/crest · 4aad83bf"
contentUuid: "1d242c61-0ff2-51fe-bb79-f9cc94f39af7"
diamondUuid: "7665361e-ae3e-8895-960f-eabb27d79863"
uuid: "4aad83bf-bb49-8052-9e76-5e682ce2ef9f"
horo: 8
typography:
  partition: link
  bondDegree: 358
standards:
  - "3986 uniform-resource-identifier"
  - "BCP-47 language-tag locale-aware"
  - "W3C HTML5 anchor-element"
  - W3C URL Living Standard
  - "WCAG-2.1 §2.4.4 link-purpose-in-context"
bindings: []
signatures:
  computationUuid: "1fc56b12-c3b4-8fe5-bd41-f7b6ebd22451"
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
      stageUuid: "8dffc417-6d00-897c-b4d8-6e9b5b1c7ca5"
    - stage: seal
      stageUuid: "305fbaf8-7932-8718-80b1-6988144530e5"
    - stage: uuid
      stageUuid: "8741d5b0-c613-80ed-9be8-38cffd3b3dbd"
version: 2
---
# link/field — one field for an internal reference or an external URL

`link` builds the field: an internal choice resolves against a collection, an external one takes
a URI, and `appearanceOptions` decides how it renders without changing what it means.
`LinkAppearances` is that closed set.

Two separate fields for "link to a page" and "link to a site" makes every consumer branch on
which one was filled.


Composes: [[law]].
