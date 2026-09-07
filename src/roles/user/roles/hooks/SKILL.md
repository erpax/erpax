---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 3/3 · 289c5389"
contentUuid: "e7a0bc50-fc24-5751-a421-68fcefe076e1"
diamondUuid: "8d5e194b-ee1e-8571-94b2-53e632b50b34"
uuid: "289c5389-aa63-868d-919e-3f28489f7cd3"
horo: 3
typography:
  partition: roles
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "2d311d95-3738-8b7c-b801-458d50b7f0eb"
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
      stageUuid: "9070b18b-716a-866c-810d-83e11547a613"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "ac56808a-0c8d-8081-b0d0-232290bb75d8"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
