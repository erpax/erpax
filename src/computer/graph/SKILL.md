---
name: graph
description: Use when traversing corpus bonds as a directed graph — matrix adjacency under computer; executable not glossary.
atomPath: "computer/graph"
coordinate: "computer/graph · 1/base · c4d46935"
contentUuid: "f0b5ad49-0b8d-5eb9-ac38-434f32d12b0b"
diamondUuid: "4ec29116-1ef4-8ce1-88e9-fe9147fe126d"
uuid: "c4d46935-ee2f-86b8-ad7e-ac675a665766"
horo: 1
typography:
  partition: computer
  bondDegree: 42
standards:
  - directed graph (nodes + edges)
bindings: []
signatures:
  computationUuid: "b961e71e-59d1-8b03-92d9-7d809ff2ff6b"
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
      stageUuid: "07c47857-2d82-8241-bc8a-39190b6b7c4f"
    - stage: seal
      stageUuid: "49e5528a-3e63-8ad3-b687-7d44c8b1590c"
    - stage: uuid
      stageUuid: "02a464f8-fb1e-8705-a63e-2466ebe0d34f"
version: 2
---
# computer/graph — matrix adjacency

`adjacencyFromAtom` · `edgesFromAtom` · `reachableAtoms` derive directed graphs from `@/uuid/matrix` bonds, composed with `@/graph` traversals.

**Law — [[law]]: graph edges are binding-uuid matrix bonds — never hand-maintained adjacency lists.**

@standard directed graph (nodes + edges)
