---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 4/weave · e11ea554"
contentUuid: "0652b22d-8329-5cd5-9481-7ff1368002f3"
diamondUuid: "0183306d-b7bd-8efe-9274-4c8b7e6b7f00"
uuid: "e11ea554-c060-8497-b167-8971af0e3521"
horo: 4
typography:
  partition: skill
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "fe2f5742-b6f2-8b2a-bdec-ab43c830fa9f"
  stages:
    - stage: path
      stageUuid: "f426d175-3210-8c5b-b9c1-c9755ff3e58b"
    - stage: trinity
      stageUuid: "cbe695c1-c6e8-8351-ad93-de09baadc5ad"
    - stage: boundary
      stageUuid: "4736a4fd-becb-812d-b51a-98c6b323be7d"
    - stage: links
      stageUuid: "195657e1-0d28-8840-9b51-4d880e6035e1"
    - stage: horo
      stageUuid: "3bdf0c7b-2aeb-8add-9df1-372746d6b075"
    - stage: seal
      stageUuid: "5cc624a5-9d0c-8082-94e6-425e4c90c9a4"
    - stage: uuid
      stageUuid: "a7206540-e85b-83e0-895b-b94aa1a72252"
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
| `relatedOf` | Derive links from SKILL body |

**Law — [[law]]: build emit is computed — regenerate from live corpus; never hand-edit generated index files. CI/deploy uses `--stub` so the Worker stays under the hardware limit.**

@see ../index.ts · ../merge · ../upgrade · [[navigation]]
