---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 8ea70b10"
contentUuid: "1bee49de-9e8c-5740-8fab-dfa5f7589969"
diamondUuid: "fc6dea26-9386-89af-89ad-4c273fd7b9f2"
uuid: "8ea70b10-ea8b-895e-a9b0-fa5bf2e0dcfb"
horo: 6
typography:
  partition: roles
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "8d16a196-1aec-8639-aba5-729ec012a214"
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
      stageUuid: "0d56f937-ee0d-8f71-a46e-1663bedf5f9d"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "1e0b685d-af21-84b9-80ba-39b71a99a1f3"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
