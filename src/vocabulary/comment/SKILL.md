---
name: comment
description: "Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit."
atomPath: "vocabulary/comment"
coordinate: "vocabulary/comment · 8/crest · 4e9aa7a9"
contentUuid: "f1412227-2d85-5a54-b96d-ba0ac731b26b"
diamondUuid: "55a89e09-6a55-85a8-99a8-d4bf0e1273c1"
uuid: "4e9aa7a9-24a9-874b-8811-210c3436feb2"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "02ebb093-7d08-8066-8ad6-f94675295f4e"
  stages:
    - stage: path
      stageUuid: "9f624062-5ec7-804e-993c-843a83231d65"
    - stage: trinity
      stageUuid: "9e0f0a5f-86bc-82aa-8a0f-124daa0af52d"
    - stage: boundary
      stageUuid: "e8df35ba-6ffb-8928-ba86-2c189fc7073c"
    - stage: links
      stageUuid: "cc32051c-5a4f-8a27-92d0-bb349d9d2db2"
    - stage: horo
      stageUuid: "15e9ae94-6be2-886f-99bd-1ead538cb401"
    - stage: seal
      stageUuid: "4fb6aee8-cad7-86ec-ba71-93b3890a700a"
    - stage: uuid
      stageUuid: "21cefd68-1455-8d43-aac4-cb326c1b7663"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[field]]).

Composes: [[plugins]] (injector), [[field]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
