---
name: graph
description: "Use when modeling a directed graph of nodes and edges — neighbors and breadth-first reachability over an edge list; the shape of the corpus itself, atoms as nodes and links as edges."
atomPath: graph
coordinate: "graph · 1/base · 34b7e55d"
contentUuid: "3e48a7d5-7071-55e8-bafd-ae2f5640192d"
diamondUuid: "4eddd081-d0e7-8c09-8a34-84e0f55f5534"
uuid: "34b7e55d-8187-8ff4-aa79-00ea586ea51c"
horo: 1
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
  bondDegree: 36
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
  computationUuid: "fcf53d54-0f8d-8bf0-b597-15b1baf0f76a"
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
      stageUuid: "1ebe7ac9-388f-8890-b449-b2e49ed262c2"
    - stage: seal
      stageUuid: "d150bff1-de31-8132-9a63-e6f530a0bd27"
    - stage: uuid
      stageUuid: "52b5d6a8-2d1e-8c69-964c-864235e85cf5"
version: 2
---
# graph — nodes and edges

A directed graph of nodes and edges: the **shape of the corpus itself**, where [[atom]]s are nodes and [[link]]s ([[links]]) are edges. `neighbors` gives the direct successors; `reachable` is the breadth-first transitive closure from a node. Pure, derived entirely from the edge list.

Its quantum facet, `quantum/graph`, reads the edges as [[entanglement]]: entanglement is symmetric, so a whole corpus reciprocates every edge in both directions.

Matter-twin: `src/graph/index.ts` (`graph` · `neighbors` · `reachable`). Composes [[node]] · [[link]] · [[matrix]] · [[merge]].

**Law — [[law]]: a graph is the shape of the corpus itself — [[atom]]s as nodes, [[links]] as edges; neighbors and breadth-first reachability derived purely from the edge list, the [[quantum]] facet reading the edges as [[entanglement]].**

@standard directed graph (nodes + edges), breadth-first reachability
