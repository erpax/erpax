---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: "skill/router/build"
coordinate: "skill/router/build · 5/round · 12067d60"
contentUuid: "2b383310-8245-5ef3-8a47-ee963b78ce8f"
diamondUuid: "01b4860c-f167-853e-9835-2089087b651b"
uuid: "12067d60-095a-89e3-a461-04ae63be7275"
horo: 5
typography:
  partition: skill
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "acad835e-af7b-8486-ba79-c0c15343dee8"
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
      stageUuid: "b96f042a-7345-8b30-bd09-9a7c4a564830"
    - stage: seal
      stageUuid: "5cc624a5-9d0c-8082-94e6-425e4c90c9a4"
    - stage: uuid
      stageUuid: "fc79a6f0-7bf5-869e-b147-ceeef02b0551"
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
