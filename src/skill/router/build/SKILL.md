---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 1/base · 925aa2ef"
contentUuid: "b84998bd-6790-594f-837e-d791427830f9"
diamondUuid: "16149bed-ea40-8cc7-acbd-d667ae80b377"
uuid: "925aa2ef-4fbc-85be-b920-d04903cdf3b0"
horo: 1
typography:
  partition: skill
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "024211d2-3e38-8657-8aed-b85887d4e52f"
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
      stageUuid: "b0221df3-ee49-8d84-8a96-33599c6f72c2"
    - stage: seal
      stageUuid: "5cc624a5-9d0c-8082-94e6-425e4c90c9a4"
    - stage: uuid
      stageUuid: "9d98c3c1-2e39-875a-ad5d-404c30548c02"
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
