---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 8/crest · e061231c"
contentUuid: "d21352f4-f215-50ef-a280-5c30f474ad4d"
diamondUuid: "55f97200-741b-8011-8186-70558756ab24"
uuid: "e061231c-2d95-8580-9f07-8af70a0c78c7"
horo: 8
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "931951a7-e2ec-80aa-869d-839724ba119d"
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
      stageUuid: "6e705657-2898-8006-a051-6744f1025daa"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "43910e4b-532d-80ad-ab3d-07469623cc3d"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
