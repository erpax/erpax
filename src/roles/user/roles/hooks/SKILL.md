---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 41257d2e"
contentUuid: "facf14d5-be81-5a18-a906-bf7771587856"
diamondUuid: "78900f48-9b6c-8225-9ad8-e7008766d0a8"
uuid: "41257d2e-3ae0-87c1-95f1-1a5acf9c2818"
horo: 6
typography:
  partition: roles
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "040f8c98-4631-8d05-81c0-c40cf9a8ae43"
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
      stageUuid: "1622275a-7cce-832b-a807-3347272e9ea9"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "7f5af858-e94e-88d5-97d7-f227b60a98ad"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
