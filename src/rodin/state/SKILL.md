---
name: state
description: "Use when asking which content-uuids carry each vortex state — the one rodin function that needs the live matrix, kept off the arithmetic that everyone else imports."
atomPath: "rodin/state"
coordinate: "rodin/state · 1/base · 849abcfb"
contentUuid: "867f59cf-84ff-5299-91f5-67ce018c6168"
diamondUuid: "e011b4b3-6a02-84e3-ab56-42eb6081e147"
uuid: "849abcfb-787e-80e1-83af-454d7bd07700"
horo: 1
typography:
  partition: rodin
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "33d886e5-072d-8860-b5b0-dfb92ba7ae19"
  stages:
    - stage: path
      stageUuid: "0723db78-7a39-886e-865e-ca4f0a4cb745"
    - stage: trinity
      stageUuid: "942ad82e-3ce9-8e38-bce9-4c2427ad661d"
    - stage: boundary
      stageUuid: "65ed2f4c-d202-886a-9648-8ee86ac96fa1"
    - stage: links
      stageUuid: "16f443bf-69b8-87cb-9b48-5bee20cf88be"
    - stage: horo
      stageUuid: "aea5bdb2-3571-81eb-8c47-c80cde6f2955"
    - stage: seal
      stageUuid: "4bbc37b7-6a06-8853-aa6a-85eaa169c905"
    - stage: uuid
      stageUuid: "06dab57d-471e-88d0-89ff-d87d803d1fe0"
version: 2
---
# rodin/state — the question that needs the matrix, and only it

`../index` is arithmetic on residues mod 9: `orbit`, `composeSteps`, `compositionMatrix`, `cayleyIsCyclic`. Pure, small, and what every caller of this atom actually wants.

`stateUuids` asks a different question — *which content-uuids carry each state* — and to answer it reads `UUID_MATRIX_NODES`: **4.2 MB, one node per atom in the corpus**. One import, one function, and every consumer of the arithmetic paid for it:

```
cloudflare/seal → nist/sp/800/108 → rodin → @/uuid/matrix → a node literal per atom in the corpus
```

A key-derivation function reached `orbit`, and got the whole corpus with it.

**The third time this shape appeared in one cut** — after `cloudflare/bindings → @/diamond` and `path → @/uuid/matrix`. A heavy import serving a minority of a file's functions, with every consumer of the majority paying: `@erpax/cloudflare` went **5,879 KB → 100 KB** once all three were separated.

**Honest boundary.** The arithmetic in `../index` is unchanged and still proven there; this only moves the one function whose answer lives in the matrix. Its own CLI no longer prints the populated-digit count, because that count is this atom's to report.

Composes: [[rodin]] · [[uuid]]/matrix · [[digit]].
