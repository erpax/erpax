---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 8/crest · 00963f08"
contentUuid: "7b36a17c-f36b-518e-a962-1ef5dd66b7a0"
diamondUuid: "5c087bb6-8857-86a5-ad85-83765b66bf10"
uuid: "00963f08-ac56-8f66-b5df-d0ff3c08e2fe"
horo: 8
typography:
  partition: skill
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "7c7c1945-83c1-8f98-8128-e48533bc001c"
  stages:
    - stage: path
      stageUuid: "f426d175-3210-8c5b-b9c1-c9755ff3e58b"
    - stage: trinity
      stageUuid: "cbe695c1-c6e8-8351-ad93-de09baadc5ad"
    - stage: boundary
      stageUuid: "4736a4fd-becb-812d-b51a-98c6b323be7d"
    - stage: links
      stageUuid: "dae37b2f-77c1-8359-9c44-1b2eebdc0d52"
    - stage: horo
      stageUuid: "30d60e17-3d14-8c88-9ffb-5ca20d644d63"
    - stage: seal
      stageUuid: "5cc624a5-9d0c-8082-94e6-425e4c90c9a4"
    - stage: uuid
      stageUuid: "55fec0c1-3a7f-8022-81f2-32606b9ab847"
version: 2
---
# build — skill index · installed catalogue emit

Child atom of [[router]] — compiles `src/**/SKILL.md` into `skills.index.ts` (the catch-all router expert pool) and optionally loads installed Claude domain skills into `installed.catalogue.ts`. Matter lives here; `pnpm erpax corpus skill` invokes this module.

## Exports

| Function | Role |
| --- | --- |
| `buildSkillIndex` | Walk src corpus → `skills.index.ts` (full; local research) |
| `buildSkillIndexStub` | Empty pool for CI/deploy (fits Worker 3MB) |
| `buildInstalledCatalogue` | Walk Claude plugins → `installed.catalogue.ts` |
| `relatedOf` | Derive [[links]] from SKILL body |

**Law — [[law]]: build emit is computed — regenerate from live corpus; never hand-edit generated index files. CI/deploy uses `--stub` so the Worker stays under the hardware limit.**

@see ../index.ts · ../merge · ../upgrade · [[navigation]]
