---
name: field
description: "Use when reasoning about field — builds the field: an internal choice resolves against a collection, an external one takes a URI, and decides how it renders without changing what it means. is that closed set."
atomPath: "link/field"
coordinate: "link/field · 1/base · 2d8dd9f3"
contentUuid: "82a34101-454a-5488-9ac1-3ddfdd9e9206"
diamondUuid: "db7da9f4-11c0-8d4c-9c86-a7c77e8785ca"
uuid: "2d8dd9f3-f5b8-8457-9026-ca6bffab9720"
horo: 1
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
  computationUuid: "ed7591b9-2021-84f3-aa8f-23d9495e9a3f"
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
      stageUuid: "570824cb-8629-8a41-bf4f-c993fb9a9cc1"
    - stage: seal
      stageUuid: "305fbaf8-7932-8718-80b1-6988144530e5"
    - stage: uuid
      stageUuid: "8183fb3e-e44c-8841-993c-f5b9444e39dc"
version: 2
---
# link/field — one field for an internal reference or an external URL

`link` builds the field: an internal choice resolves against a collection, an external one takes
a URI, and `appearanceOptions` decides how it renders without changing what it means.
`LinkAppearances` is that closed set.

Two separate fields for "link to a page" and "link to a site" makes every consumer branch on
which one was filled.


Composes: [[law]].
