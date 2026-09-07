---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: "vocabulary/protein"
coordinate: "vocabulary/protein · 7/descent · 0aca9bf9"
contentUuid: "889d748d-0b9a-5654-aa01-0fccb633d0cd"
diamondUuid: "6f4835cd-c883-89e6-b940-2d7bd8bbf648"
uuid: "0aca9bf9-b22d-8f01-bf6f-d9d06ec55520"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 9
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "ac89a23d-d06f-89e7-820a-3efa1251f1a0"
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
      stageUuid: "8fd48b16-6f04-8f57-b23f-a5f8db5ef93c"
    - stage: seal
      stageUuid: "7aa2c2be-50a3-822d-b4ff-ff01f9c8d78c"
    - stage: uuid
      stageUuid: "88f526b7-8e33-8567-8357-1ee0f601d64a"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
