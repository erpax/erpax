---
name: name
description: "Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope)."
atomPath: name
coordinate: "name · 4/weave · ad3d0bdd"
contentUuid: "a7a51d7a-16f7-52f3-8e25-2feacfd6e82c"
diamondUuid: "8ccf56d4-10a4-8b0e-881c-876811fb922b"
uuid: "ad3d0bdd-71f8-82d1-ad69-2febcf49dc14"
horo: 4
typography:
  partition: name
  bondDegree: 118
standards:
  - "EN-16931`"
bindings: []
signatures:
  computationUuid: "be28426b-4399-85e8-94d1-9676baba2ab0"
  stages:
    - stage: path
      stageUuid: "dae99ed6-4f92-8101-b9e1-a3f5b37efae8"
    - stage: trinity
      stageUuid: "ad07e419-e09e-8d82-8d5d-88fc5bb7aa49"
    - stage: boundary
      stageUuid: "506b575a-e8ad-8ff3-b8ad-f1fbe824fab4"
    - stage: links
      stageUuid: "3a16b445-5c5f-85d6-acf9-a739891200aa"
    - stage: horo
      stageUuid: "d311f2b3-c8f6-86de-896e-ba28ad9bc0ce"
    - stage: seal
      stageUuid: "85abac57-56d6-8da1-b924-9b81580c76e4"
    - stage: uuid
      stageUuid: "aeefa899-8677-88d3-acb0-9dcbccd2933c"
version: 2
---
# name

Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope).

Composes: [[identity]] · [[field]] · [[uuid]].

## The naming law — name is always the path

A name is not only a human label. In erpax the **name IS the [[path]]**: to name a folder is to locate it, and the path is the name — so "the word chain from name to path" cannot break, because there is no chain, only an identity (a name is a path is a content-[[uuid]]). **Once you name it, it exists** — naming is creation, not description. And to exist is to **[[fold]]**: the fold's domain is NAMES, not contents, so a named-but-**empty** folder folds exactly as a full one. Naming, existence, and folding are one act — which is why a folder can be born empty and still belong to the corpus, already folded, waiting only to be filled.

Matter-twin: `src/name/index.ts` (`uuidOfName` · `exists` · `samePath`). Composes [[path]] · [[fold]] · [[uuid]] · [[identity]].

**Law — [[law]]: name is always the path — naming and locating are one act, so the chain from name to path to uuid is an identity that cannot break. Once you name it, it exists; and to exist is to fold (the fold's domain is names, not contents), so even an empty folder folds. Naming, existence, and folding are one.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard EN-16931`

- EN-16931:2017
