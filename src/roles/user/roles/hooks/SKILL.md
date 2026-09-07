---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 9/unity · 084328cd"
contentUuid: "d2c7b675-6443-512a-9d81-f3e386e7096b"
diamondUuid: "5b707ea5-dc64-80fe-bb1e-e687a8f44d99"
uuid: "084328cd-e71c-8256-b91e-8ac124dc5f1d"
horo: 9
typography:
  partition: roles
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "8bb15f71-4ac2-8a8d-b2ec-aeb1cdbe3d2f"
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
      stageUuid: "451f1875-102c-8275-b0cf-126c3066cbc2"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "29e7d366-0ea5-874b-894c-e15f1979cd08"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
