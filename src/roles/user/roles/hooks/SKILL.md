---
name: hooks
description: "Use when reasoning about hooks — refuses a second grant of a role a user already holds. Without it the same role accumulates rows, and every count of \"who has this\" is wrong by however many times someone clicked."
atomPath: "roles/user/roles/hooks"
coordinate: "roles/user/roles/hooks · 6/6 · 48498ec7"
contentUuid: "015c8098-a4a3-5287-885a-53b5a0c9d724"
diamondUuid: "d44345a8-c15a-83f2-8056-3669d5e3a249"
uuid: "48498ec7-65a1-8d36-85b8-5c4163e05cce"
horo: 6
typography:
  partition: roles
  bondDegree: 288
standards: []
bindings: []
signatures:
  computationUuid: "51e75b90-05d6-8e94-8687-1b1812dc3cc8"
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
      stageUuid: "0a8f9b4e-223a-8353-b50c-fe847049cea0"
    - stage: seal
      stageUuid: "85aff987-a385-81e1-87fb-008e5d8359fd"
    - stage: uuid
      stageUuid: "37e8d736-ea3c-8b8a-8baf-aa9b5f82139b"
version: 2
---
# roles/user/roles/hooks — a role is assigned once, and the hook is what makes "once" true

`preventDuplicateAssignment` refuses a second grant of a role a user already holds. Without it
the same role accumulates rows, and every count of "who has this" is wrong by however many
times someone clicked.

Composes: [[law]].
