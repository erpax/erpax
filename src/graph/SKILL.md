---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 5/round · a64bf428"
contentUuid: "6fc5001e-3669-50e3-a972-a3c45cabd8b8"
diamondUuid: "82f37ffb-edae-815a-a390-e076b270fe43"
uuid: "a64bf428-2f75-8762-8030-97564f1f604e"
horo: 5
typography:
  partition: graph
  bondDegree: 42
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
signatures:
  computationUuid: "2c093a35-d11f-8415-9944-b57f9aee7f70"
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
      stageUuid: "cd82932c-5402-80c0-970f-0d8a4c62f72d"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "746ce4bb-7321-8d0a-aea6-d9496045e678"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
