---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 9/unity · e7e64b87"
contentUuid: "ec5e99d6-8bc0-5d99-9e2a-660f987b7972"
diamondUuid: "a7ae2621-131a-80e1-bdc5-213402342e41"
uuid: "e7e64b87-fa81-8600-bf87-f155d2ee732a"
horo: 9
typography:
  partition: blocks
  bondDegree: 168
standards: []
bindings: []
signatures:
  computationUuid: "0063120f-78b9-8a79-9a93-0e7d1fd1aab4"
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
      stageUuid: "fae47e25-6658-869d-99ad-eca18d547be5"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "b8351758-228e-8834-bc86-c906fdc2d94f"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
