---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 2/share · e4a306e0"
contentUuid: "195c7cba-ce78-59b3-98f4-27f01dd7cd63"
diamondUuid: "aa5cc4bd-a81f-8614-9d96-43f494733b6e"
uuid: "e4a306e0-662c-8a90-9702-46d3222b4681"
horo: 2
typography:
  partition: graph
  bondDegree: 36
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
signatures:
  computationUuid: "95c3f612-f060-8c3f-a570-3ddf20552d16"
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
      stageUuid: "e0e0b971-0b13-8d30-9081-7daef174f3d9"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "87aea7c8-8a19-8e68-87cc-bfc3ce75be6d"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
