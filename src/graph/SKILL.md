---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 7/descent · 68b2b8e2"
contentUuid: "cb0259f4-d99e-544d-b47b-86bfb641a584"
diamondUuid: "038d6b16-c500-8fc7-bcde-d8b0a490c882"
uuid: "68b2b8e2-514f-8671-bcc6-79a5bf64e3bb"
horo: 7
typography:
  partition: graph
  bondDegree: 42
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
signatures:
  computationUuid: "71991662-6b38-87d1-a964-a04586e3ff71"
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
      stageUuid: "9f7ff0dd-334d-8b4d-a166-458cbc107442"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "8f901214-b3eb-849c-adf9-c17077654649"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
