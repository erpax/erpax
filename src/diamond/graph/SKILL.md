---
name: graph
description: "Use when reaching the diamond as a GRAPH — atoms and the bonds between them — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/graph"
coordinate: "diamond/graph · 2/share · ce0a5743"
contentUuid: "7b0e7a92-856b-5def-8667-b5dd08193bdc"
diamondUuid: "e79f856c-7137-80d5-8cf0-d172e8a85122"
uuid: "ce0a5743-d979-8eb6-91cf-b527876d5275"
horo: 2
typography:
  partition: diamond
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "857c1e63-30f9-8e83-98e3-511914bbb3b3"
  stages:
    - stage: path
      stageUuid: "3f20a1eb-be55-82cf-9420-bb5ee752da1f"
    - stage: trinity
      stageUuid: "b389dbe8-fff8-8e46-af78-e1bab2257e21"
    - stage: boundary
      stageUuid: "e32e7f71-cb58-8419-acac-f43c669f9dca"
    - stage: links
      stageUuid: "b99f07d9-7c8e-876f-b190-47850625c816"
    - stage: horo
      stageUuid: "0880a8c1-650f-852f-9807-5a599ffae073"
    - stage: seal
      stageUuid: "ecd99946-6efe-8ea6-a356-3f68868352e0"
    - stage: uuid
      stageUuid: "5428a3b1-aa21-8ef0-972a-a9525e960d4a"
version: 2
---
# diamond/graph — the graph face of [[diamond]]

`index.ts` re-exports the parent barrel, so `@/diamond/graph` offers exactly what `@/diamond`
offers today. **The matter has not moved yet**: this atom is the namespace a hub split named for
the diamond read as a graph of atoms and their bonds, and its own `test.ts` pins the FACE so a caller importing through this path keeps
working while the extraction is finished.

Stated rather than dressed up: until the graph matter is lifted out of the parent, this is a
namespaced view, not a separate implementation ([[rules]]/concentration — matter belongs in the
child, and here it still sits in the hub).

Composes: [[diamond]].
