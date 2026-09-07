---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 1/base · 89cddd03"
contentUuid: "c7f6b678-a3e5-585d-884d-f5571b10cf18"
diamondUuid: "9b0d6453-c994-8289-a4b3-8c614556f75b"
uuid: "89cddd03-8a62-8c07-8e19-277882f1d012"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "19243270-eeee-8e12-b7f6-cff7bb433157"
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
      stageUuid: "ec30f52b-6fab-8c91-bcb2-9048b18d357f"
    - stage: seal
      stageUuid: "1260df6a-924e-8176-b3ea-a90bf032c0ed"
    - stage: uuid
      stageUuid: "f92dabbf-9ca1-89f6-9bd4-b0749a23354f"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
