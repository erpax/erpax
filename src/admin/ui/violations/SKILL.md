---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 7/descent · 38dfbbaf"
contentUuid: "aadb3cdc-e9ad-58de-bdf9-1d4a8e4c5ee3"
diamondUuid: "8e99fda4-8c6e-8126-9672-5d9b035e187a"
uuid: "38dfbbaf-fef8-8760-8e82-7ee8898b5494"
horo: 7
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "1c4bbf25-2b94-8bd3-99d1-60ebfea4ab5c"
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
      stageUuid: "33cc8477-c1f3-8371-861e-a1d3c329501c"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "52df8a56-aaa9-8768-b55f-2d252f0c0e0b"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
