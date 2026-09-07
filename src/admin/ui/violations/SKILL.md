---
name: violations
description: Use when reasoning about violations — The provider streams live violations and the panel and dashboard render them.
atomPath: "admin/ui/violations"
coordinate: "admin/ui/violations · 8/crest · 99a6f21e"
contentUuid: "c7ad0045-4c79-5d91-b274-b8dc24bfca03"
diamondUuid: "3d1375bf-4e01-8e6c-a216-11a2a46cf205"
uuid: "99a6f21e-32c5-841d-81c0-37b02c26582e"
horo: 8
typography:
  partition: admin
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "00ca1ce3-ece7-867a-820d-f28de2756833"
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
      stageUuid: "36be6d02-fc98-8a61-ac6f-4fc11dc8e792"
    - stage: seal
      stageUuid: "a2fff21b-0825-8987-98e6-259933fea58a"
    - stage: uuid
      stageUuid: "5cdaf841-b292-8e15-b285-2a6c290426e9"
version: 2
---
# admin/ui/violations — the gate's findings, where the person who can fix them is already working

The provider streams live violations and the panel and dashboard render them. A red gate reported
only in CI is read by whoever looks at CI; the same red in the admin panel is read by the person
holding the record that caused it.

Composes: [[law]].
