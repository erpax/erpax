---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 9/unity · e7e64b87"
contentUuid: "e60977a1-abd0-51eb-8949-1c61fa6ab8ec"
diamondUuid: "69c938ee-210d-8578-aac9-537290c6cb8a"
uuid: "e7e64b87-fa81-8600-bf87-f155d2ee732a"
horo: 9
typography:
  partition: blocks
  bondDegree: 165
standards: []
bindings: []
signatures:
  computationUuid: "941c7355-9809-8daf-a876-f4d4341476f5"
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
      stageUuid: "dc23df9f-bea8-8667-8298-3bdf85540bf5"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "68e98642-d3b8-83f5-a7d4-654215fe5855"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
