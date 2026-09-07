---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 9/unity · ca661df5"
contentUuid: "23316111-e314-5dbc-913a-02e13efaee42"
diamondUuid: "f6cf2937-dae4-806c-9ce5-87e3dc816225"
uuid: "ca661df5-7ee2-8c62-830a-fc993433745e"
horo: 9
typography:
  partition: roles
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "01bf420d-d908-87c9-87d6-dda80603b2fd"
  stages:
    - stage: path
      stageUuid: "2675a9a8-3423-8ade-af8a-64c9e003c524"
    - stage: trinity
      stageUuid: "25edcdc1-1736-83dc-aadd-a3f2804a4944"
    - stage: boundary
      stageUuid: "eb2c3dec-5e08-8277-be91-d704b1a3b51a"
    - stage: links
      stageUuid: "ce2271b1-8d48-8935-9845-ba7d19a37f3b"
    - stage: horo
      stageUuid: "fba53a4d-5f1b-8c8d-9bf0-85dd7ee4868c"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "baaa8a16-04c2-8e63-a36a-71ba284a75f6"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
