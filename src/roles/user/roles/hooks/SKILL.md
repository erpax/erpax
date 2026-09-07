---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 9/unity · 2c539ac6"
contentUuid: "d37b4963-eafb-5be3-81bd-4b4ddbbbf26d"
diamondUuid: "98ec6e2e-e4b0-8b2d-9254-3eaeeea315b8"
uuid: "2c539ac6-62a5-81ee-a171-f0de7e37c60d"
horo: 9
typography:
  partition: roles
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "d6d888db-f55b-871b-b0df-10a2d733872c"
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
      stageUuid: "837fdf84-4474-88fa-88a5-1ed65ae1d41d"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "e4755428-7be7-8688-a219-739793d842d0"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
