---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 7/descent · 0a87eda7"
contentUuid: "48dc679b-415e-5149-a100-89e7e99d2716"
diamondUuid: "2a3483d5-33ed-82a4-b614-5f67972de669"
uuid: "0a87eda7-27a4-8954-94fe-f8832b369b74"
horo: 7
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "a9705e71-43bb-804f-8fda-88917060b217"
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
      stageUuid: "5f05fdcf-5837-8305-b00f-3dad82725484"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "9e67d6ab-f283-860b-bf8a-0385bd609213"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
