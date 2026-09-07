---
name: graph
description: "Use when traversing corpus bonds as a directed graph — matrix adjacency under [[computer]]; executable not glossary."
atomPath: "computer/graph"
coordinate: "computer/graph · 5/round · f6a374a9"
contentUuid: "925a53af-2bd5-57a5-aa33-959fd4ed2dc9"
diamondUuid: "1cc3c0e6-2566-8551-a63e-05db3fe6d648"
uuid: "f6a374a9-0da3-8fc7-a9c9-948313e9b581"
horo: 5
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "6df7fd18-82ba-8479-8b66-41e4669c0e97"
  stages:
    - stage: path
      stageUuid: "5d1f0380-5707-8442-877c-b9bd0bfa7447"
    - stage: trinity
      stageUuid: "f526cfc2-fe65-8725-837e-019b7fc99398"
    - stage: boundary
      stageUuid: "e2f9fbad-9470-81dd-94c8-e1674a8eb241"
    - stage: links
      stageUuid: "41ce8865-6e16-84ec-9878-f2edc34eb64a"
    - stage: horo
      stageUuid: "704711a1-a9a9-86c1-84ad-f17c2b57a789"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "2d82bdb1-a06e-8456-90ff-eb817d60b8ec"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
