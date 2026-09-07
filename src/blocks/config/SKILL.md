---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 3/3 · cce513ee"
contentUuid: "d8b6b5ef-3878-5df5-b72e-0a68abe2bb1d"
diamondUuid: "c950c1d6-3b6b-88d2-a9f9-5116584bc4db"
uuid: "cce513ee-c38c-86aa-a700-f76dc197d929"
horo: 3
typography:
  partition: blocks
  bondDegree: 171
standards: []
bindings: []
signatures:
  computationUuid: "459be5b1-0bac-8260-894d-65b78dcd9c66"
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
      stageUuid: "b9cd5b4e-f53c-8978-a89b-d15de532f72b"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "0d4d0371-229e-89f2-9488-10d7e4df8eaa"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
