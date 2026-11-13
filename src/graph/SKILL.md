---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 4/weave · 8b21ad53"
contentUuid: "85f9753a-8ace-5d1c-853f-d7b2ca48de79"
diamondUuid: "1eaeea6e-9032-8a97-8d3e-f712429703d9"
uuid: "8b21ad53-c9b6-87e4-bc21-1811e83791b4"
horo: 4
typography:
  partition: graph
  bondDegree: 35
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
signatures:
  computationUuid: "39ca8259-aba2-85f0-beef-6384953eefb5"
  stages:
    - stage: path
      stageUuid: "ab1058b9-2637-8838-af3b-b7feacc34c17"
    - stage: trinity
      stageUuid: "86ea7765-34a0-8231-9590-814983f61b24"
    - stage: boundary
      stageUuid: "04aab8d6-b23b-86d9-99ef-08165746d431"
    - stage: links
      stageUuid: "537aea56-c48c-807a-b5eb-235b1a8e4c87"
    - stage: horo
      stageUuid: "4aa61ef7-c30f-88e1-8048-3e02af9b40e5"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "1ce5e55c-73f8-8532-a39f-3137e2f2f487"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s (links) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes node · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, links as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
