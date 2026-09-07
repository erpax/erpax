---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 1/base · 790e80b6"
contentUuid: "09963294-eb9e-5952-a09f-a3b52820acd5"
diamondUuid: "ad46d6a1-bf91-8c20-a068-eb690770e99c"
uuid: "790e80b6-e6c1-81b9-89df-1d51e0bdd532"
horo: 1
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "699d9d5f-1faa-8c19-aff5-384f6b7fcd8a"
  stages:
    - stage: path
      stageUuid: "8cce2a5b-0983-8d5f-b9e3-493086310c2f"
    - stage: trinity
      stageUuid: "b9d71d14-9e83-82e5-847e-7f34cb4a78f0"
    - stage: boundary
      stageUuid: "467cc9d8-6ce3-8c22-8d7d-d9f8011f10f7"
    - stage: links
      stageUuid: "fd946254-4cd5-8a70-bf7a-534469a24635"
    - stage: horo
      stageUuid: "ff59ae25-9471-8cb4-9c44-a71ec5552da6"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "f4c478df-730d-8999-a94c-36360fb90e12"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
