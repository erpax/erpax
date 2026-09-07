---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 4/weave · 11c8d1d3"
contentUuid: "6956642d-1e38-5ab7-8829-8f16dd2a3708"
diamondUuid: "b84ed44f-60c1-8521-ad3b-f019b626eefe"
uuid: "11c8d1d3-bf86-8fab-897d-2be81709b87f"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "e1d94161-403c-8d02-bd32-b2e9896a7e3e"
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
      stageUuid: "1f9afa34-111c-8b71-b8c9-67a1e9847b38"
    - stage: seal
      stageUuid: "1260df6a-924e-8176-b3ea-a90bf032c0ed"
    - stage: uuid
      stageUuid: "6650d113-fbfb-84e9-830e-678683bd524f"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
