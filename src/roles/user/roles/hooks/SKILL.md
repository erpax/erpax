---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 48498ec7"
contentUuid: "c6c720d0-f864-5ff5-acd8-b99eadd16ac4"
diamondUuid: "6707b843-dfac-8db6-9293-e2fb422df522"
uuid: "48498ec7-65a1-8d36-85b8-5c4163e05cce"
horo: 6
typography:
  partition: roles
  bondDegree: 345
standards: []
bindings: []
signatures:
  computationUuid: "52b4bb1c-63f5-8efc-8501-fba47b9f98e6"
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
      stageUuid: "476f0048-ad28-805d-b7af-a5a8d4f0c6f7"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "95ced85d-7d21-8f57-83fa-50e00d4b811f"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
