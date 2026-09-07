---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 8/crest · 1d02963d"
contentUuid: "0f0725cd-f694-5327-9dd4-824f38421fb7"
diamondUuid: "91e5cf3a-afed-8882-977e-3a8c77ba60b0"
uuid: "1d02963d-384b-844f-945a-9cd7984e7820"
horo: 8
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "b142b56e-5e83-8fb3-9734-1d5d0c5e0719"
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
      stageUuid: "6a94b628-3f81-847b-b575-7c6016f8decb"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "7eaea466-eb35-8119-bb8a-b5902ace81e9"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
