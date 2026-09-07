---
name: name
description: "Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope)."
atomPath: name
coordinate: "name · 4/weave · 38ab40f9"
contentUuid: "448ef1f6-ac41-5b5a-bede-da251e61d54a"
diamondUuid: "846a0576-7572-8cad-9b39-173c14404ee3"
uuid: "38ab40f9-ad2a-8d65-9e79-58aac6433930"
horo: 4
typography:
  partition: name
  bondDegree: 132
standards:
  - "EN-16931`"
bindings: []
signatures:
  computationUuid: "50e060ea-5311-895b-af39-9676a80d6937"
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
      stageUuid: "7d0ca2f7-9fa0-8546-8f36-43fa9520a5a8"
    - stage: seal
      stageUuid: "85abac57-56d6-8da1-b924-9b81580c76e4"
    - stage: uuid
      stageUuid: "13083603-4019-8d42-a8a3-c2a85bf4dabf"
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
