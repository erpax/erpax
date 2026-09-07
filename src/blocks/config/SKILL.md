---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 9/unity · 6a4070d7"
contentUuid: "34ae8f53-dd37-5f51-b6e5-4c9c834ea152"
diamondUuid: "1000c9b4-f78d-89d4-8411-dbf896ea7dab"
uuid: "6a4070d7-4d1a-80b2-9973-ac5dd9573eab"
horo: 9
typography:
  partition: blocks
  bondDegree: 171
standards: []
bindings: []
signatures:
  computationUuid: "7dd73b1a-d488-82eb-8af5-570c5a465800"
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
      stageUuid: "e42aab81-5878-886d-bd46-e998a7e20b16"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "075a4938-3ea4-831e-901b-f17e2450cc5e"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
