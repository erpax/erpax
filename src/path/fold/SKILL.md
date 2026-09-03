---
name: fold
description: "Use when folding any address surface to the one canonical atom path — pure string work, with none of the 4.2 MB corpus matrix its parent barrel loads for the ring walk."
atomPath: path/fold
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
