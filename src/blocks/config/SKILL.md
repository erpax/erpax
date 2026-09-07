---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 6/6 · c0bf46c5"
contentUuid: "56d1f29a-ee7c-526b-964f-361904356daa"
diamondUuid: "d5044a4d-6cfc-803c-af9f-4bc12731809f"
uuid: "c0bf46c5-a345-870c-a911-afe904aee112"
horo: 6
typography:
  partition: blocks
  bondDegree: 171
standards: []
bindings: []
signatures:
  computationUuid: "0694a43b-4c67-8488-a00d-5ae504a843d4"
  stages:
    - stage: path
      stageUuid: "e41192cd-5585-80f2-84f6-84a45829107a"
    - stage: trinity
      stageUuid: "6becebad-6679-82b2-9a3b-b6a07f5c5632"
    - stage: boundary
      stageUuid: "5d3f00cb-54b6-8e67-a752-7bfd53230e36"
    - stage: links
      stageUuid: "de1eb53a-2d61-8b04-b1dc-de03583aa1e7"
    - stage: horo
      stageUuid: "19e79fcd-9a55-8632-b553-53d9e4617ef8"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "dee5da13-8608-83e7-b952-5cb6056129f5"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
