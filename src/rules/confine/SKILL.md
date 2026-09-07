---
name: confine
description: "Use when reasoning about confine — Use to keep the boot from collapsing again — 231 collections are handled by the FIELD (req.payload), never by a static `import * as … from '@/collections'` outside the config. That materialisation is what caused the TDZ. Parsed, not matched. Run: tsx src/rules/confine/index.ts"
atomPath: "rules/confine"
coordinate: "rules/confine · 2/share · db85e256"
contentUuid: "986382b7-70e0-5b97-8a8f-f9454c44cf35"
diamondUuid: "34348421-942e-83fd-a36e-9a1536f977a7"
uuid: "db85e256-7c12-86ba-ab85-dd955e6367a1"
horo: 2
typography:
  partition: rules
  bondDegree: 12
standards:
  - "ISO/IEC 25010:2023 §5.6.2 — modularity: the whole is confined, not held"
bindings: []
signatures:
  computationUuid: "36b44872-b8ae-8714-ad57-f4c146dc1d06"
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
      stageUuid: "d216a86e-b2ab-8474-b11b-f0514656db03"
    - stage: seal
      stageUuid: "c03d4d9e-d2d2-8d0f-8821-afbe046fbbfc"
    - stage: uuid
      stageUuid: "4b1c1dcd-310b-8f2e-b906-be68fb32c5dd"
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
