---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 48498ec7"
contentUuid: "c03b1ac2-19f1-5016-bef3-298bab8b1a8c"
diamondUuid: "917591af-9a47-87f1-b6e3-b85218689391"
uuid: "48498ec7-65a1-8d36-85b8-5c4163e05cce"
horo: 6
typography:
  partition: roles
  bondDegree: 297
standards: []
bindings: []
signatures:
  computationUuid: "e68458b8-94eb-8227-a04a-60159f1558cc"
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
      stageUuid: "3a850fe3-a4af-84f1-8772-237d681444eb"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "e918b9eb-9b29-8232-b207-329bd905ce05"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
