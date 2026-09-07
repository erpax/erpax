---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: "vocabulary/protein"
coordinate: "vocabulary/protein · 1/base · 839d7b48"
contentUuid: "b07651b8-9cf5-5130-a637-a309deae4f6a"
diamondUuid: "9daf7125-1294-8152-87e9-3572cfcab321"
uuid: "839d7b48-a597-8db9-8a9d-44ac926dabc2"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "f40c14fe-e5db-8f77-95c5-9f809a7ae3fa"
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
      stageUuid: "dae67e2c-db53-8ed1-ab45-129370667c55"
    - stage: seal
      stageUuid: "7aa2c2be-50a3-822d-b4ff-ff01f9c8d78c"
    - stage: uuid
      stageUuid: "f66e60e4-dba7-85ea-92a9-1a0d207669e7"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
