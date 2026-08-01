---
name: graph
description: "Use when traversing corpus bonds as a directed graph — matrix adjacency under [[computer]]; executable not glossary."
atomPath: "computer/graph"
coordinate: "computer/graph · 7/descent · 0960131d"
contentUuid: "43fc563c-99c3-5382-8bb5-17855fb6415f"
diamondUuid: "9df25390-8606-889e-a11f-568182f721ec"
uuid: "0960131d-5bd5-848e-ba3e-50c5e5c1b18d"
horo: 7
typography:
  partition: computer
  bondDegree: 36
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "7e285e76-6e90-891f-b27f-83804faaf949"
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
      stageUuid: "589c29cd-aafd-841a-af80-07a655e7f896"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "b57e1a58-c4dd-8901-87a0-8150da5d07c1"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
