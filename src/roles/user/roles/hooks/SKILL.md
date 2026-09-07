---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 5b5b91a4"
contentUuid: "4e719b68-7a5f-521e-807b-4d566da2fdac"
diamondUuid: "0dd6dce2-2186-864e-a488-6c4350ae7798"
uuid: "5b5b91a4-8255-8e14-ac5a-382b3d872b6f"
horo: 6
typography:
  partition: roles
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "424d5d8b-3965-88e2-a0a7-a470cb2c8e3f"
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
      stageUuid: "56f94101-a5b7-8796-8732-abef30553a9a"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "3df8a069-ae86-8705-8ec8-d9e57a9e1e4a"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
