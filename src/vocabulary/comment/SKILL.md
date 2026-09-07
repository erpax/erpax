---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 2/share · 2b491d74"
contentUuid: "753457f5-bae8-529c-93c2-da13be02d64f"
diamondUuid: "645844c9-7754-8080-9573-5ec4fafd76c1"
uuid: "2b491d74-362f-86ea-8888-35b4f2a27173"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "7c3f407b-a9ae-8c3e-a47a-30eb67f501b4"
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
      stageUuid: "e48b5037-8957-8636-9869-891b6af2946c"
    - stage: seal
      stageUuid: "1260df6a-924e-8176-b3ea-a90bf032c0ed"
    - stage: uuid
      stageUuid: "98e7082f-df3c-8861-9679-746a0f07598a"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
