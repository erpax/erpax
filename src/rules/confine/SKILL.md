---
name: confine
description: "Use to keep the boot from collapsing again — 231 collections are handled by the FIELD (req.payload), never by a static `import * as … from '@/collections'` outside the config. That materialisation is what caused the TDZ. Parsed, not matched. Run: tsx src/rules/confine/index.ts"
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
