---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 5/round · f6a374a9"
contentUuid: "32a96d14-3527-597f-bac4-18be8c1a178c"
diamondUuid: "d8feca8d-0784-8baf-bcae-e65ecdddce16"
uuid: "f6a374a9-0da3-8fc7-a9c9-948313e9b581"
horo: 5
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "662baf9f-3496-8bd7-9c3a-e96e49c9528d"
  stages:
    - stage: path
      stageUuid: "5d1f0380-5707-8442-877c-b9bd0bfa7447"
    - stage: trinity
      stageUuid: "f526cfc2-fe65-8725-837e-019b7fc99398"
    - stage: boundary
      stageUuid: "e2f9fbad-9470-81dd-94c8-e1674a8eb241"
    - stage: links
      stageUuid: "17fa06dc-96ef-8310-985d-3418469b7441"
    - stage: horo
      stageUuid: "704711a1-a9a9-86c1-84ad-f17c2b57a789"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "3915fa1c-ce46-8356-bfcf-76da72c68eed"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
