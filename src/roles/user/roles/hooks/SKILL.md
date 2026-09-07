---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · d54e53c6"
contentUuid: "c00fa093-5e73-5594-bb28-0de7336bae5f"
diamondUuid: "fe6cb6d5-438d-8d0b-bca6-86a5492fec08"
uuid: "d54e53c6-6f0d-8eea-9e85-7590f3cb208f"
horo: 6
typography:
  partition: roles
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "f930282a-1373-8ecb-9684-1e815568d4a2"
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
      stageUuid: "e063a3a6-1a1c-87a3-9826-52c66c48709b"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "a3f267db-4987-8029-996d-705d24b967a3"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
