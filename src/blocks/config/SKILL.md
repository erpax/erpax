---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 9/unity · 12a0aca5"
contentUuid: "1189c735-723d-53ac-8782-d0f00b6b3149"
diamondUuid: "3cdfb395-e622-8954-8177-4d413c97ad67"
uuid: "12a0aca5-4b4e-8539-9ba5-b0689e6d7e4a"
horo: 9
typography:
  partition: blocks
  bondDegree: 171
standards: []
bindings: []
signatures:
  computationUuid: "afffac5f-57fd-8fd5-99d9-83732826308d"
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
      stageUuid: "22ccd3c5-a4ea-80b4-9713-ae4b4a6d1e9f"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "351593f9-4904-82af-991d-ac65706c2881"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
