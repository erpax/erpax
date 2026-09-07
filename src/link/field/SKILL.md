---
name: field
description: "Use when reasoning about field — builds the field: an internal choice resolves against a collection, an external one takes a URI, and decides how it renders without changing what it means. is that closed set."
atomPath: "link/field"
coordinate: "link/field · 1/base · f0024629"
contentUuid: "d22a8fb7-01ee-5036-9645-f52f5eae5890"
diamondUuid: "68e0cba6-dfd0-8b31-8800-30cd9a04cca4"
uuid: "f0024629-83a8-88ab-869e-f69cc0f841aa"
horo: 1
typography:
  partition: link
  bondDegree: 322
standards:
  - "3986 uniform-resource-identifier"
  - "BCP-47 language-tag locale-aware"
  - "W3C HTML5 anchor-element"
  - W3C URL Living Standard
  - "WCAG-2.1 §2.4.4 link-purpose-in-context"
bindings: []
signatures:
  computationUuid: "cf2b229d-c4be-8486-8926-977c637d6ed3"
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
      stageUuid: "3be4fff9-a320-819c-b1e9-16f9cecee970"
    - stage: seal
      stageUuid: "305fbaf8-7932-8718-80b1-6988144530e5"
    - stage: uuid
      stageUuid: "e4e77e30-195f-864d-b089-ff76049a8f88"
version: 2
---
# link/field — one field for an internal reference or an external URL

`link` builds the field: an internal choice resolves against a collection, an external one takes
a URI, and `appearanceOptions` decides how it renders without changing what it means.
`LinkAppearances` is that closed set.

Two separate fields for "link to a page" and "link to a site" makes every consumer branch on
which one was filled.


Composes: [[law]].
