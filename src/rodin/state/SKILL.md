---
name: state
description: "Use when asking which content-uuids carry each vortex state — the one rodin function that needs the live matrix, kept off the arithmetic that everyone else imports."
atomPath: "rodin/state"
coordinate: "rodin/state · 2/share · 907806be"
contentUuid: "7b23354d-114b-52f6-893a-e9e70f086632"
diamondUuid: "e335e0c1-4bf5-87af-933c-707be5d5c519"
uuid: "907806be-e0fb-828f-9483-c67cf869dcaf"
horo: 2
typography:
  partition: rodin
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "3e09d964-b9e3-8270-b0eb-dc2c481322c1"
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
      stageUuid: "d2194f68-f09a-8cea-bfde-c717267c074a"
    - stage: seal
      stageUuid: "4bbc37b7-6a06-8853-aa6a-85eaa169c905"
    - stage: uuid
      stageUuid: "bf2f0afb-6308-8445-b140-51d6f4ebdcb5"
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
