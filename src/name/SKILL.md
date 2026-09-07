---
name: name
description: "Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope)."
atomPath: name
coordinate: "name · 4/weave · 28f2af9b"
contentUuid: "81d73289-8950-546e-ae7b-4b86a46e2216"
diamondUuid: "65296b90-e1d5-8fca-af1f-f6ea8fe35114"
uuid: "28f2af9b-0ca5-8c60-a040-41edbcfb902e"
horo: 4
typography:
  partition: name
  bondDegree: 132
standards:
  - "EN-16931`"
bindings: []
signatures:
  computationUuid: "a54ae60c-b5b8-8e9f-9932-dbf6367a1fe3"
  stages:
    - stage: path
      stageUuid: "dae99ed6-4f92-8101-b9e1-a3f5b37efae8"
    - stage: trinity
      stageUuid: "ad07e419-e09e-8d82-8d5d-88fc5bb7aa49"
    - stage: boundary
      stageUuid: "506b575a-e8ad-8ff3-b8ad-f1fbe824fab4"
    - stage: links
      stageUuid: "1b2e57cc-24fc-8c3b-8dd9-ba7bd527a930"
    - stage: horo
      stageUuid: "e96b4f52-1df3-8539-b3e0-8c196a7ceb12"
    - stage: seal
      stageUuid: "85abac57-56d6-8da1-b924-9b81580c76e4"
    - stage: uuid
      stageUuid: "f066d48b-0364-8d2e-9c3f-8520fde7dadf"
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
