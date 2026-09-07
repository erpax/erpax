---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 4/weave · cf43a194"
contentUuid: "47330642-7715-5270-8b79-4c8f78a6c449"
diamondUuid: "e7bf3bb3-05b0-80da-bfe2-4bcaca385d03"
uuid: "cf43a194-12c2-8557-8e9f-2cda64e411a7"
horo: 4
typography:
  partition: skill
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "a8d95f56-df41-8720-ad23-5a848f8e5894"
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
      stageUuid: "e38d973b-35f5-87db-ac4a-9e8f3bb18a64"
    - stage: seal
      stageUuid: "5cc624a5-9d0c-8082-94e6-425e4c90c9a4"
    - stage: uuid
      stageUuid: "e7f16770-6600-830b-a84f-8d369d148f82"
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
