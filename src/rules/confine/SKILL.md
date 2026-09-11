---
name: confine
description: "Use when reasoning about confine — Use to keep the boot from collapsing again — 231 collections are handled by the FIELD (req.payload), never by a static `import * as … from '@/collections'` outside the config. That materialisation is what caused the TDZ. Parsed, not matched. Run: tsx src/rules/confine/index.ts"
atomPath: "rules/confine"
coordinate: "rules/confine · 1/base · 3d576c75"
contentUuid: "afddeebe-d5a7-52db-a8b9-c5bd6ad925cc"
diamondUuid: "165fa2c9-a0c6-89fe-b430-241488c71f78"
uuid: "3d576c75-9995-8056-9995-7f8668a1f5f6"
horo: 1
typography:
  partition: rules
  bondDegree: 12
standards:
  - "ISO/IEC 25010:2023 §5.6.2 — modularity: the whole is confined, not held"
bindings: []
signatures:
  computationUuid: "d78f182e-b1bf-8081-b779-bb195ba91be6"
  stages:
    - stage: path
      stageUuid: "e214230a-1369-8a0c-a483-cf372328fbf6"
    - stage: trinity
      stageUuid: "107dd4ac-7a5a-8ab5-8ddb-fb349c6a8567"
    - stage: boundary
      stageUuid: "371223f7-7744-8d85-a5b0-74f4cf43173c"
    - stage: links
      stageUuid: "8c835a55-f092-893a-9c80-7f2e901ec44e"
    - stage: horo
      stageUuid: "22ee5c74-2744-859b-aa28-3369d5d3685d"
    - stage: seal
      stageUuid: "c03d4d9e-d2d2-8d0f-8821-afbe046fbbfc"
    - stage: uuid
      stageUuid: "5aab7f12-a295-8e6d-a5ac-8a71c592504e"
version: 2
---
# confine — 231 collections are handled like plasma: by the field, never by holding every particle

You do not handle plasma by touching it — you confine it in a magnetic field. You do not handle 231 collections by materialising all of them: a static `import * as x from '@/collections'`, then `Object.values(x)` at module scope. That is holding every particle, and it is **exactly what collapsed the boot** ([[run]]/load): the collection factory reached the agent's tool-defs, which materialised every collection, which imported the factory — so `fixed/assets:34` ran `createAccountingCollection(...)` at module top level while the factory was still initialising ([[rules]]/cycle). TDZ, in every loader.

The fix was **confinement**: read the running instance — `req.payload.config.collections`, the field that already contains them — instead of importing each. This gate makes that permanent: hand-written code may not materialise the whole registry outside the config. **Handle the field, not the particles.**

## The bottle, not a touch

The payload config and the barrel it registers (`payload.config.ts`, `config/app/collections`, `collections/index`) **are** the confinement — they are allowed to hold every collection, because that is their one job. A barrel's own test is allowed too. Everything else reads the field.

## Parsed, not matched

The throwaway detector this replaces flagged a **comment** in `tool-defs` describing the old code (`import * as allCollections` inside a docstring). A comment is data ([[syntax]]); only a real `ts.ImportDeclaration` namespace-importing `@/collections` is a touch. The gate reads the grammar — the same law that separated `225` from the regex's `152`.

**Honest boundary.** This forbids the STATIC materialisation of the whole registry; it does not forbid reading it at RUNTIME (`req.payload`), which is the confinement itself. A single named import (`import { Invoices }`) is one particle, not the plasma, and passes. The gate proves the boot-failure class cannot return by this door — it does not prove no other cycle exists ([[rules]]/cycle measures the whole graph; this closes the one edge that was fatal).

**Law — [[law]]: the collection registry is confined by the field, never held by hand. Materialising all 231 outside the config is touching the plasma — it collapsed the boot once, and this gate keeps it from doing so again.**

## Standards

- **ISO/IEC 25010:2023 §5.6.2** — modularity: the whole is confined, not held.

Composes: [[rules]]/cycle · [[syntax]] · [[law]].
