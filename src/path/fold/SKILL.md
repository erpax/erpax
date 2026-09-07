---
name: fold
description: "Use when folding any address surface to the one canonical atom path — pure string work, with none of the 4.2 MB corpus matrix its parent barrel loads for the ring walk."
atomPath: "path/fold"
coordinate: "path/fold · 5/round · 38a248a5"
contentUuid: "a79bfebd-019b-53c0-8caa-74d9ae120e2d"
diamondUuid: "f8b6e18d-7d2f-88d7-9b7c-31bea77992ea"
uuid: "38a248a5-a2c9-8248-80c3-0ea226edcb96"
horo: 5
typography:
  partition: path
  bondDegree: 89
standards: []
bindings: []
signatures:
  computationUuid: "e9636d76-7bcd-8be7-aa32-3533f746df34"
  stages:
    - stage: path
      stageUuid: "61f58d64-b65f-8e75-9ab2-3548efafbc90"
    - stage: trinity
      stageUuid: "25989b7f-7e25-8421-8f14-d5bb8a6ce0ef"
    - stage: boundary
      stageUuid: "fc4c79ca-0bbd-8dd7-8478-b94ef9719598"
    - stage: links
      stageUuid: "bbfa2525-bfce-8276-8e16-ee7856e27775"
    - stage: horo
      stageUuid: "6e5b98f2-ce40-860f-8b69-4907d929f544"
    - stage: seal
      stageUuid: "c56bcd48-f3ee-8b08-864e-8e7752d933c0"
    - stage: uuid
      stageUuid: "88d8439d-c5d2-83cf-b422-57bf4720ee64"
version: 2
---
# path/fold — folding a string should not load the corpus

Every address surface — fs, url, github, mcp, api, http, cloudflare — peels to one canonical atom path. That is **pure string work**: peel the surface, drop the leaf file, canonicalise the segments, fold the vocabulary alias.

It lived in `../index`, whose barrel imports `@/uuid/matrix` for the ring walk — `nodeOf`, `childrenOf`, `prevOf`, `nextOf`. That table is **4.2 MB and one node per atom in the corpus**, so every consumer of `toAtomPath` was loading the entire corpus matrix to fold a string.

Measured on the published Worker package, which reaches this through `cloudflare/bindings`:

| | |
| --- | ---: |
| before the cut | 5,879 KB · 73 atoms |
| corpus tooling off the face | 4,701 KB · 17 atoms |
| **the address fold split out** | **100 KB · 15 atoms** |

## The parent keeps its whole face

`../index` re-exports everything moved here, so no caller anywhere loses a name ([[rules]]/face). The ones that need only the fold say `@/path/fold` and stop paying for navigation they never use.

One thing stayed behind: `toAtomPath`'s `surroundings` branch calls `revealPathFromSurroundings`, which belongs to the reveal machinery in `../index`. The parent wraps this function to add it — because a fold that could reach the reveal would import the matrix back through the front door, which is the whole point of the cut.

**Honest boundary.** This is a partition of matter, not a change of behaviour: the same functions, the same results, reachable by the same names from `@/path`. What changed is what a consumer must LOAD to call them.

Composes: [[path]] · [[navigation]] · [[integrity]].
