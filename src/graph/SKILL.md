---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: graph · 5/round · 650470cb
contentUuid: "7e69d8a6-c80b-5454-a74e-97a4efccbcd1"
diamondUuid: "c86827c3-dc90-820d-94f3-0602288b54b0"
uuid: "650470cb-b5ed-8c28-8eae-02d9ed572aba"
horo: 5
bonds:
  in:
    - atom
    - entanglement
    - graph
    - law
    - link
    - links
    - matrix
    - merge
    - node
    - quantum
  out:
    - atom
    - entanglement
    - graph
    - law
    - link
    - links
    - matrix
    - merge
    - node
    - quantum
typography:
  partition: graph
  bondDegree: 35
  neighbors: []
standards:
  - "directed graph (nodes + edges), breadth-first reachability"
bindings: []
neighbors:
  wikilink:
    - atom
    - entanglement
    - law
    - link
    - links
    - matrix
    - merge
    - node
    - quantum
  matrix:
    - atom
    - entanglement
    - graph
    - law
    - link
    - links
    - matrix
    - merge
    - node
    - quantum
  backlinks:
    - atom
    - entanglement
    - graph
    - law
    - link
    - links
    - matrix
    - merge
    - node
    - quantum
signatures:
  computationUuid: "dc2711b5-89cf-8734-ae00-b191e57db22e"
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
      stageUuid: "fc30caf9-3e62-8424-bb9f-4b23d7d0e446"
    - stage: seal
      stageUuid: "26e68a01-7f7a-82b9-97c1-b9bbb52eaf47"
    - stage: uuid
      stageUuid: "e8a6139d-e9bc-817b-bb1c-76692e190bcf"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
