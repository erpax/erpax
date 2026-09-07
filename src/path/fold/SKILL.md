---
name: fold
description: "Use when folding any address surface to the one canonical atom path — pure string work, with none of the 4.2 MB corpus matrix its parent barrel loads for the ring walk."
atomPath: "path/fold"
coordinate: "path/fold · 5/round · 8c5c147c"
contentUuid: "1e90656d-0ed2-5e1e-9dd7-515a5a622d7a"
diamondUuid: "3c088106-d789-829a-ae9e-164c7a944b5c"
uuid: "8c5c147c-1fae-8d94-8d0d-9f87d08d1a40"
horo: 5
typography:
  partition: path
  bondDegree: 87
standards: []
bindings: []
signatures:
  computationUuid: "1aaf44ac-4019-88b6-b590-ea090d924d62"
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
      stageUuid: "eb0b5d87-eed5-86f3-8074-8795fe239e02"
    - stage: seal
      stageUuid: "c56bcd48-f3ee-8b08-864e-8e7752d933c0"
    - stage: uuid
      stageUuid: "6ce5b917-af8d-8ee1-aa5d-167a859caa04"
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
