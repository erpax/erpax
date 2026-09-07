---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 8/crest · a4455ac7"
contentUuid: "c597543b-4c37-5d7a-a329-db96c026b0ff"
diamondUuid: "5918958c-2790-8446-a777-3f80d834fc71"
uuid: "a4455ac7-c566-8e32-98a3-7e3c9c235357"
horo: 8
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "f8b3e3b9-d955-82b9-8c38-8456ed3906bf"
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
      stageUuid: "bdc63471-1781-8e50-ae52-7a2ced36b6f7"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "26fe2dcb-c8a1-8001-99a1-a4070e160222"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
