---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 8/crest · 81926331"
contentUuid: "e9108a85-4404-51f3-bbc1-ec05f6088625"
diamondUuid: "00338cad-8715-8cc5-bbf2-7851da0a8096"
uuid: "81926331-1971-8879-80fc-b3e8fd5289c4"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "26e5b294-a347-8947-99e1-db3a7b973643"
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
      stageUuid: "be6a868d-4a90-8a0a-a57b-b1d565c9746c"
    - stage: seal
      stageUuid: "1260df6a-924e-8176-b3ea-a90bf032c0ed"
    - stage: uuid
      stageUuid: "c4354e8d-69ee-8e17-bcc9-41fb2f5b93b0"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
