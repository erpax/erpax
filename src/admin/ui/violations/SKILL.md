---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 5/round · b794b1c5"
contentUuid: "21f86a7f-c385-5204-b0df-ad2f3c076bb0"
diamondUuid: "6d5d4c2d-ad5a-8deb-8750-c1cf5df2c1ca"
uuid: "b794b1c5-7d81-8bc8-84d0-c5c0c28f6845"
horo: 5
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "741f85fa-9f65-8583-981b-bce5b90bbdf7"
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
      stageUuid: "89b16e05-df72-8cae-bcb7-51e87298fef6"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "578b4cea-bcbc-883d-95c7-b4774e75b0eb"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
