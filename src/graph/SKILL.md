---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 7/descent · 04970655"
contentUuid: "27d43694-8414-54ae-889f-16b8be456a59"
diamondUuid: "6d7aa599-f3d0-88ab-b185-bf5c6b316d49"
uuid: "04970655-02d8-8f74-af59-c7dc934195c7"
horo: 7
typography:
  partition: graph
  bondDegree: 42
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
signatures:
  computationUuid: "88e8e4f1-b60e-8a08-b05b-219802b8d414"
  stages:
    - stage: path
      stageUuid: "ab1058b9-2637-8838-af3b-b7feacc34c17"
    - stage: trinity
      stageUuid: "86ea7765-34a0-8231-9590-814983f61b24"
    - stage: boundary
      stageUuid: "04aab8d6-b23b-86d9-99ef-08165746d431"
    - stage: links
      stageUuid: "27a611f2-bd84-8c6a-9c00-ed373492741d"
    - stage: horo
      stageUuid: "a7a85f73-15f8-88ba-83f7-b9be6ca388e0"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "872706e3-1100-8638-b753-b98d2a2891f1"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
