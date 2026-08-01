---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 5/round · 3fa855e7"
contentUuid: "08c341ee-6808-56c6-839c-6262cf72d489"
diamondUuid: "5d6347b9-5719-84dc-9b9a-e18fddee68fe"
uuid: "3fa855e7-e31c-8ef9-b7bb-42db8a8648a5"
horo: 5
typography:
  partition: skill
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c503b39b-d86c-8a9d-9747-6e851d41b223"
  stages:
    - stage: path
      stageUuid: "f426d175-3210-8c5b-b9c1-c9755ff3e58b"
    - stage: trinity
      stageUuid: "cbe695c1-c6e8-8351-ad93-de09baadc5ad"
    - stage: boundary
      stageUuid: "9cf136c4-3ec0-86d8-a2cf-4a6120d07b7b"
    - stage: links
      stageUuid: "dae37b2f-77c1-8359-9c44-1b2eebdc0d52"
    - stage: horo
      stageUuid: "8ab59efb-f7c5-88be-925b-12e33de8332f"
    - stage: seal
      stageUuid: "a211a290-a849-87fb-b7bd-a85eaab10cc9"
    - stage: uuid
      stageUuid: "05877722-2ca8-84b4-b364-8dce205fbd0b"
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
