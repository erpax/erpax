---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 48498ec7"
contentUuid: "2136bc1d-0049-5995-b3d8-829d5b83ca0b"
diamondUuid: "a7034372-78f4-8989-bf6f-c60893e96de0"
uuid: "48498ec7-65a1-8d36-85b8-5c4163e05cce"
horo: 6
typography:
  partition: roles
  bondDegree: 333
standards: []
bindings: []
signatures:
  computationUuid: "413e0b81-cd8d-8735-9c19-47b7f6306833"
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
      stageUuid: "cc80f8df-7fa7-8918-9e36-9627f4f51918"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "38f85985-2a3b-8759-ae4b-fbfeacdc23d5"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
