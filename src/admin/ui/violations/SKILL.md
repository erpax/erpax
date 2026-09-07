---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 4/weave · dabc4a44"
contentUuid: "9eabc9c1-72ea-5430-8fc7-826734693d10"
diamondUuid: "f520c2a4-a69f-87f3-ad89-5f25bd0b24a6"
uuid: "dabc4a44-a3a3-8314-bac1-ec58d6f5b4ef"
horo: 4
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "0eb8663a-29fe-8e14-b605-35ebd2a1105b"
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
      stageUuid: "fcea7ff6-8fae-8c30-a097-9a5dcf927ae8"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "1d102285-fdf1-86d3-9c75-3da9bdad20cf"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
