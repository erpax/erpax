---
name: build
description: "Use when the skill router index or installed catalogue must emit — buildSkillIndex and buildInstalledCatalogue compile the corpus for fs-less Workers."
atomPath: skill/router/build
horo: 8
version: 1
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
