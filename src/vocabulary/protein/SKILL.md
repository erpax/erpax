---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: "vocabulary/protein"
coordinate: "vocabulary/protein · 1/base · 690352c9"
contentUuid: "e473d781-b5c7-5b3b-94c4-6732a2b7f590"
diamondUuid: "c2cda83e-7568-8a0d-8075-a11bff1e6569"
uuid: "690352c9-3c96-8150-9c70-4e8a50108bf1"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "117a67dc-3e58-8d74-bd7a-685ff2ec741a"
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
      stageUuid: "0cca65fe-af6c-8f2d-862c-1d57940a78f4"
    - stage: seal
      stageUuid: "7aa2c2be-50a3-822d-b4ff-ff01f9c8d78c"
    - stage: uuid
      stageUuid: "d305308d-4d82-83d3-a426-745a0c0c7cfe"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
