---
name: field
description: "Use when reasoning about field — builds the field: an internal choice resolves against a collection, an external one takes a URI, and decides how it renders without changing what it means. is that closed set."
atomPath: "link/field"
coordinate: "link/field · 5/round · 49e83cf7"
contentUuid: "2ec848f4-0d19-5b35-a27c-9a7e26b65138"
diamondUuid: "dc48c4d1-10c8-8d94-94c0-d82ed84954fb"
uuid: "49e83cf7-810e-8829-ab80-64caeeb5e118"
horo: 5
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
  computationUuid: "c72771a3-a218-88d7-92c8-9a897f306c35"
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
      stageUuid: "5db67fa0-6fcb-8319-bdfc-c905a7476c07"
    - stage: seal
      stageUuid: "305fbaf8-7932-8718-80b1-6988144530e5"
    - stage: uuid
      stageUuid: "1ce29702-5b41-8ca8-a52b-276409cc2d77"
version: 2
---
# link/field — one field for an internal reference or an external URL

`link` builds the field: an internal choice resolves against a collection, an external one takes
a URI, and `appearanceOptions` decides how it renders without changing what it means.
`LinkAppearances` is that closed set.

Two separate fields for "link to a page" and "link to a site" makes every consumer branch on
which one was filled.


Composes: [[law]].
