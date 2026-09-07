---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 3/3 · f621cf6d"
contentUuid: "65abaf93-5763-58e9-9885-462cb4995bf6"
diamondUuid: "8dce6ff6-2e45-88d3-81a2-c8b52110b5f3"
uuid: "f621cf6d-3cc9-8326-a7f6-a6065488a8c3"
horo: 3
typography:
  partition: roles
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "6c652e37-d6b5-86ad-b9b6-c0bb73e55b7b"
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
      stageUuid: "90bbe714-ad8c-8fc4-9dc9-893ec0f12bdd"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "963b97d9-623d-825b-981d-09b1f0c2c51d"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
