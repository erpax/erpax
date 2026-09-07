---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 6/6 · 9cf26d1a"
contentUuid: "53f21169-683a-5b4f-a720-9d5c10d05bda"
diamondUuid: "c0fa5468-d504-8ff4-a152-4428c76e8c49"
uuid: "9cf26d1a-1299-81b9-9c1c-38948caa3379"
horo: 6
typography:
  partition: blocks
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "784bac0c-b9b9-8d08-8260-8b8d00f0b221"
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
      stageUuid: "96c33141-18ef-8594-9051-582df1ba2144"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "9eeeb92c-80f6-82f3-9574-add558be007e"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
