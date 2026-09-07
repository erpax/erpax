---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 6/6 · 88e483ef"
contentUuid: "782a7a9f-f87c-56a0-b061-c2338c748d51"
diamondUuid: "5fd5779f-15cf-84d9-8057-7070f3f5f89f"
uuid: "88e483ef-d7da-8ced-ac30-65702316a345"
horo: 6
typography:
  partition: blocks
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "eede50ca-6b3a-8e16-80a0-4108462015be"
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
      stageUuid: "b9367bbc-f325-897a-a218-2f8f45595cfc"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "b42405cc-9d9c-855d-8d63-db5c4286168b"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
