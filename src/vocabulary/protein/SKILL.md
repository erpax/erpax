---
name: protein
description: "Use when reasoning about protein — Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group)"
atomPath: "vocabulary/protein"
coordinate: "vocabulary/protein · 1/base · 4845ba42"
contentUuid: "d2e917e0-e3cb-5b9e-96cf-d45317e9f2ed"
diamondUuid: "0aed9f11-2db5-84cd-81d8-aaa9c1f7aa3c"
uuid: "4845ba42-52ce-879a-8c04-bf8f02df65c8"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "f0fad17c-3236-8ce9-bd02-75d1146561d3"
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
      stageUuid: "f33a44b8-006a-88a0-b2cb-c979f44bd6ba"
    - stage: seal
      stageUuid: "7aa2c2be-50a3-822d-b4ff-ff01f9c8d78c"
    - stage: uuid
      stageUuid: "7016b027-5324-8359-809b-f7dd59c1d37d"
version: 2
---
# protein

Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type :Protein. A protein can thus be a subclass of another protein, e.g. :Protein as a UniProt record can have multiple isoforms inside it which would also be :Protein. They can be imagined, synthetic, hypothetical or naturally occurring.

Entangled with — [[content]]

Attested in schema.org — Protein · proteinContent

**Law — [[law]]: protein is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
