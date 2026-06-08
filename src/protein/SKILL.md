---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: protein
coordinate: protein · 2/share · 2c898a1b
contentUuid: "f02a20e2-a31a-5536-9e1c-2f311735f258"
diamondUuid: "10fad050-5644-8630-9adb-dde3592fe847"
uuid: "2c898a1b-dbeb-8717-a024-25862850100a"
horo: 2
bonds:
  in:
    - content
    - law
  out:
    - content
    - law
typography:
  partition: protein
  bondDegree: 7
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - content
    - law
  matrix:
    - content
    - law
  backlinks:
    - content
    - law
signatures:
  computationUuid: "9be71fdb-caa7-8d55-9416-9e5da267e2a5"
  stages:
    - stage: path
      stageUuid: "dc52ccbc-9dfd-8502-8ae9-14418cd4f1e0"
    - stage: trinity
      stageUuid: "2f054f9f-7034-8a8b-9243-9ba0ecff09df"
    - stage: boundary
      stageUuid: "7f9043f6-f5b7-884c-b5fe-98b9c2b1f6f4"
    - stage: links
      stageUuid: "b3ccd502-7c54-8916-9d12-e85ffb824219"
    - stage: horo
      stageUuid: "420cf0da-0c6c-82f7-a41e-1df0acacc4a9"
    - stage: seal
      stageUuid: "71275e8b-c5c7-8602-a133-3c5a06110c02"
    - stage: uuid
      stageUuid: "be0c7b87-dc00-85be-b4e1-f6447342a70f"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
