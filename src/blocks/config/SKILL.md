---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 6/6 · 1436f028"
contentUuid: "a4de5514-0d8d-53e3-831d-f3853b7b8777"
diamondUuid: "3ec728e8-17c8-876d-81e5-f213fad35036"
uuid: "1436f028-bae7-8eeb-9789-2aed08598ed8"
horo: 6
typography:
  partition: blocks
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "353f9cbd-7f16-8f90-a37e-b24bb6da32bf"
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
      stageUuid: "a97537a1-d6d1-852a-b2d5-5067664de36e"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "ac2d11c1-efbe-855d-864d-14c716337b2d"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
