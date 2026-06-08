---
name: answer
description: "Use when reasoning about answer — An answer offered to a question; perhaps correct, perhaps opinionated or wrong."
atomPath: answer
coordinate: answer · 5/round · 2406832e
contentUuid: "1c3513dc-dc0e-57a9-b335-72704335b31c"
diamondUuid: "eb1e2b41-ca9f-8fb1-a774-50ddd42bb205"
uuid: "2406832e-7ce0-81cc-bd9f-d6a27d3d7297"
horo: 5
bonds:
  in:
    - accepted
    - command
    - concatenate
    - count
    - explanation
    - law
    - question
    - self
    - step
    - suggested
    - workflow
  out:
    - accepted
    - command
    - concatenate
    - count
    - explanation
    - law
    - question
    - self
    - step
    - suggested
    - workflow
typography:
  partition: answer
  bondDegree: 40
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - accepted
    - concatenate
    - count
    - explanation
    - law
    - question
    - self
    - step
    - suggested
  matrix:
    - accepted
    - command
    - concatenate
    - count
    - explanation
    - law
    - question
    - self
    - step
    - suggested
    - workflow
  backlinks:
    - accepted
    - command
    - concatenate
    - count
    - explanation
    - law
    - question
    - self
    - step
    - suggested
    - workflow
signatures:
  computationUuid: "5821ec03-6af4-8b74-86ad-f00f28a5f563"
  stages:
    - stage: path
      stageUuid: "bc62524c-c252-8414-82b9-718c5ba1a351"
    - stage: trinity
      stageUuid: "b68c33cc-8835-8143-b1ee-751e3976a669"
    - stage: boundary
      stageUuid: "a0f1edfc-73f8-82fc-8fee-8385603204bb"
    - stage: links
      stageUuid: "ac7b5f9d-da38-87ef-b42c-437f381165b1"
    - stage: horo
      stageUuid: "20e5e750-4979-820d-8af2-dfcef72690fa"
    - stage: seal
      stageUuid: "79a9883e-bd98-869c-8ec8-896421931150"
    - stage: uuid
      stageUuid: "003efffe-41bd-80f0-a72c-e2079565a5df"
version: 2
---
# answer

An answer offered to a question; perhaps correct, perhaps opinionated or wrong.

Entangled with — [[accepted]] · [[count]] · [[explanation]] · [[suggested]]

In an autonomous workflow — an **answer** is the **computed resolution** a [[step]] applies when its [[question]] gate is NO, re-applied until the gate is YES ([[concatenate]]); it is computed, never asked of a human ([[self]]).

Attested in schema.org — Answer · acceptedAnswer · answerCount · answerExplanation · suggestedAnswer

**Law — [[law]]: answer is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
