---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: "vocabulary/protein"
coordinate: "vocabulary/protein · 1/base · 3a1fc03b"
contentUuid: "c4a700fb-9b52-575f-9b5c-fef56f5b380d"
diamondUuid: "7aac6587-fa7c-8437-8638-637ad76e2893"
uuid: "3a1fc03b-cd66-843d-9f1d-167c05097f9b"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "a32bf13d-315d-892a-bc04-e380703718c3"
  stages:
    - stage: path
      stageUuid: "2904aa77-9a62-8870-959a-535f417dccab"
    - stage: trinity
      stageUuid: "c8daec6d-397b-8bab-8535-998a1fec8167"
    - stage: boundary
      stageUuid: "3927ab64-c6cc-8f38-8576-f096cff16d2c"
    - stage: links
      stageUuid: "0f4b71b9-fad4-8f50-845f-f9f7e10cb47b"
    - stage: horo
      stageUuid: "9f0ab8d1-e11e-8a97-983a-873ac50e6940"
    - stage: seal
      stageUuid: "7aa2c2be-50a3-822d-b4ff-ff01f9c8d78c"
    - stage: uuid
      stageUuid: "284a018f-4845-86bc-b0e6-84f08ddc6cae"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
