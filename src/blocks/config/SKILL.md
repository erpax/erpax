---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 9/unity · e7e64b87"
contentUuid: "d3a38007-0e24-5486-b975-1e6b1ea87b05"
diamondUuid: "3b7f033d-5c28-815b-974d-0acc0a5f3573"
uuid: "e7e64b87-fa81-8600-bf87-f155d2ee732a"
horo: 9
typography:
  partition: blocks
  bondDegree: 123
standards: []
bindings: []
signatures:
  computationUuid: "784fbd13-bf9a-879d-a1ac-ad4facc30e34"
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
      stageUuid: "a0b4aae3-779d-80d1-84f4-add9a06301ed"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "0f936831-5634-82d3-b4e1-e2f4ffbfac5c"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
