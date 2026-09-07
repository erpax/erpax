---
name: state
description: "Use when asking which content-uuids carry each vortex state — the one rodin function that needs the live matrix, kept off the arithmetic that everyone else imports."
atomPath: "rodin/state"
coordinate: "rodin/state · 4/weave · 960fff94"
contentUuid: "6ad0800b-eb91-59b2-97e4-4845a1938aaa"
diamondUuid: "c6bad9f4-7d84-8087-a4d2-6c03e66eb0a5"
uuid: "960fff94-e322-8666-aa6f-49b36488ff73"
horo: 4
typography:
  partition: rodin
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "ecb5b327-664e-81f5-a0b9-33ed6d3b5256"
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
      stageUuid: "71e203a5-bab9-83fc-b19d-6f484ec81017"
    - stage: seal
      stageUuid: "4bbc37b7-6a06-8853-aa6a-85eaa169c905"
    - stage: uuid
      stageUuid: "f61efb8d-6938-8de4-968d-babe3bf44823"
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
