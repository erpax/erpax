---
name: comment
description: Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit.
atomPath: comment
coordinate: comment · 2/share · 8765b3df
contentUuid: "a6910fe5-00bc-5d15-8b90-18fb00a19aa5"
diamondUuid: "81dfed49-3884-8b68-a13d-ff81395b0291"
uuid: "8765b3df-5649-8bb2-afac-5ed9967c42a3"
horo: 2
bonds:
  in:
    - access
    - accounting
    - action
    - all
    - correction
    - count
    - escalation
    - feedback
    - fields
    - identity
    - interview
    - messages
    - plugins
    - resolution
    - result
    - satisfaction
    - sentiment
    - tags
    - ticket
  out:
    - access
    - accounting
    - action
    - all
    - correction
    - count
    - escalation
    - feedback
    - fields
    - identity
    - interview
    - messages
    - plugins
    - resolution
    - result
    - satisfaction
    - sentiment
    - tags
    - ticket
typography:
  partition: comment
  bondDegree: 57
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - fields
    - identity
    - messages
    - plugins
    - tags
  matrix:
    - access
    - accounting
    - action
    - all
    - correction
    - count
    - escalation
    - feedback
    - fields
    - identity
    - interview
    - messages
    - plugins
    - resolution
    - result
    - satisfaction
    - sentiment
    - tags
    - ticket
  backlinks:
    - access
    - accounting
    - action
    - all
    - correction
    - count
    - escalation
    - feedback
    - fields
    - identity
    - interview
    - messages
    - plugins
    - resolution
    - result
    - satisfaction
    - sentiment
    - tags
    - ticket
signatures:
  computationUuid: "7b660e0e-9875-81f0-bf8d-895bf7262c17"
  stages:
    - stage: path
      stageUuid: "613445b6-a4e1-882c-a171-e924b8a18b1c"
    - stage: trinity
      stageUuid: "84a41b5b-ec1f-837e-8be5-2d81becb30e9"
    - stage: boundary
      stageUuid: "8fb2f403-7471-85b0-94f4-bd6f1279743d"
    - stage: links
      stageUuid: "2d53b719-f055-8132-906a-4b10fbca1a0f"
    - stage: horo
      stageUuid: "2693a45d-9a09-8a07-a3b0-d259f31272f4"
    - stage: seal
      stageUuid: "99d0a288-fa5a-8f4f-9af2-778bbe13ff80"
    - stage: uuid
      stageUuid: "4cf3fcba-59f3-82b0-9dd7-5fe35a96a923"
version: 2
---
# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[fields]]).

Composes: [[plugins]] (injector), [[fields]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]] · [[Messages]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
