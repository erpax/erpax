---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 4/weave · 5c9b47fc"
contentUuid: "cfa12364-1b57-59b7-88b0-cd169a77f1d7"
diamondUuid: "e032341a-7706-8339-9e74-0f2ec297cf6a"
uuid: "5c9b47fc-cb0f-81df-b384-8f006c0e7757"
horo: 4
typography:
  partition: computer
  bondDegree: 35
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "d79d608d-ecee-808a-8566-1af8e29184ab"
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
      stageUuid: "72b41675-f94c-82c7-947c-a39e2305ad4e"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "e29ef6a8-6090-8f50-9313-fc2b7c646acc"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
