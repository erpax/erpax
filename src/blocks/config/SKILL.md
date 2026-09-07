---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 3/3 · 5644c936"
contentUuid: "f703f012-970d-5934-9674-2405ef6a61db"
diamondUuid: "25dccd8f-258a-85f8-a103-d574837a07a5"
uuid: "5644c936-f70f-8e73-9e36-53e167b0da98"
horo: 3
typography:
  partition: blocks
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "41dd347b-bb9f-8fb4-952f-8edffc84bdf6"
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
      stageUuid: "0884de37-e0e6-807e-81cb-ac923182f9a9"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "0e696910-29a0-8349-a33c-4f6dfd1fb930"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
