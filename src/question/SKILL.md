---
name: question
description: "Use when reasoning about question — A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document."
atomPath: question
coordinate: question · 5/round · 15cd3315
contentUuid: "e13bc4f3-a6c8-5622-9ea7-cb31c901eb50"
diamondUuid: "5ee9006e-7141-8b23-ab64-9a88b36f1edb"
uuid: "15cd3315-d51a-8381-a87c-77cfbdecf0af"
horo: 5
bonds:
  in:
    - answer
    - command
    - concatenate
    - edu
    - law
    - step
    - type
    - workflow
  out:
    - answer
    - command
    - concatenate
    - edu
    - law
    - step
    - type
    - workflow
typography:
  partition: question
  bondDegree: 29
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - answer
    - command
    - concatenate
    - edu
    - law
    - step
    - type
  matrix:
    - answer
    - command
    - concatenate
    - edu
    - law
    - step
    - type
    - workflow
  backlinks:
    - answer
    - command
    - concatenate
    - edu
    - law
    - step
    - type
    - workflow
signatures:
  computationUuid: "f6508b6f-6f32-8e70-bbb5-6c78a3714f96"
  stages:
    - stage: path
      stageUuid: "463c6894-300d-872b-b204-a3125ae7770f"
    - stage: trinity
      stageUuid: "c450dd43-9879-83b6-b79d-b9369e282f90"
    - stage: boundary
      stageUuid: "252e7644-b577-8925-973e-81b5bc1a0505"
    - stage: links
      stageUuid: "ab10bf7f-e01e-8f32-af56-ef64c24e70e9"
    - stage: horo
      stageUuid: "4da4783a-601c-89a9-a491-bc3edd2fbeda"
    - stage: seal
      stageUuid: "927c671d-3883-89b0-a67e-43c110b7ba01"
    - stage: uuid
      stageUuid: "e0e7f3c4-fd5c-81d7-8948-38c57f7de5db"
version: 2
---
# question

A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document.

Entangled with — [[edu]] · [[type]]

In an autonomous workflow — a **question** is the yes/no **gate** a [[step]] asks after its [[command]]; on NO the computed [[answer]] is applied and the question re-asked until YES ([[concatenate]]).

Attested in schema.org — Question · eduQuestionType · question

**Law — [[law]]: question is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
