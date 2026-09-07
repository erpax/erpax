---
name: config
description: "Use when reasoning about config — Payload's typegen and the server config both need every block's shape. Importing the block COMPONENTS to get them drags React into a context that cannot run it."
atomPath: "blocks/config"
coordinate: "blocks/config · 3/3 · ced0e451"
contentUuid: "23d53a40-3eba-5803-81f8-50e18d13af0b"
diamondUuid: "c2b2fa7d-b105-8941-8d04-50bc48dd6619"
uuid: "ced0e451-f978-8063-9f83-8fde0f4d192d"
horo: 3
typography:
  partition: blocks
  bondDegree: 171
standards: []
bindings: []
signatures:
  computationUuid: "f40529cd-50b5-8fd9-bb1a-229d2b7b62a2"
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
      stageUuid: "fa22bcd7-b4ac-83e5-8adf-9abc597bf84b"
    - stage: seal
      stageUuid: "b195b1be-32dc-8e4c-8049-f650908ae903"
    - stage: uuid
      stageUuid: "ffdc7933-0edc-8ee4-91c4-2ea03512cbb0"
version: 2
---
# blocks/config — the block definitions, with no React in the import graph

Payload's typegen and the server config both need every block's shape. Importing the block
COMPONENTS to get them drags React into a context that cannot run it.

So the definitions are re-exported here alone — `Banner`, `Code`, `Content`, `CallToAction`,
`FormBlock`, `MediaBlock`, `Archive` — each from its own `config` sibling. The component lives
next to its config; only the config crosses this barrel.

Composes: [[law]].
