---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 2/share · 1f1ce05a"
contentUuid: "9e1f75bf-5815-5e5e-96f3-9b3a742ccd9a"
diamondUuid: "1f3f8887-e975-8e64-a5bd-a369ba2ffbaa"
uuid: "1f1ce05a-2a09-8185-84b3-e77057700a8a"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "b8cfc7e9-5994-8430-86bc-fc6c1cd5f999"
  stages:
    - stage: path
      stageUuid: "9f624062-5ec7-804e-993c-843a83231d65"
    - stage: trinity
      stageUuid: "9e0f0a5f-86bc-82aa-8a0f-124daa0af52d"
    - stage: boundary
      stageUuid: "da298e03-fced-877b-8197-39d18d9ecc4c"
    - stage: links
      stageUuid: "7f45f1b7-b7f9-8190-a2fd-d94a2bd45a8c"
    - stage: horo
      stageUuid: "1f6133c9-0e2b-830c-b8b1-e9451c55686a"
    - stage: seal
      stageUuid: "1260df6a-924e-8176-b3ea-a90bf032c0ed"
    - stage: uuid
      stageUuid: "03875242-f3db-85a6-8d7f-b8fec14aa7a7"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
