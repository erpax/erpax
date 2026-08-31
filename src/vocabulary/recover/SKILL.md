---
name: recover
description: "Use when a Payload collection/config reorg or rename leaves the build broken — `tsc` crashes with \"Maximum call stack size exceeded\", hundreds of type errors after moving collections, or `payload generate:types` fails with InvalidFieldRelationship, DuplicateFieldName, \"does not provide an export named 'default'\", or ERR_MODULE_NOT_FOUND."
atomPath: "vocabulary/recover"
coordinate: "vocabulary/recover · 2/share · 9f55af3f"
contentUuid: "7bbf516e-a8aa-5fb1-91c7-f35c35187795"
diamondUuid: "af1bc599-9349-86e9-815c-6ed019e28c71"
uuid: "9f55af3f-4ec0-8b0a-8269-6c9e9630d227"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "2a43d9f2-e055-8c74-b20e-b00678d961e3"
  stages:
    - stage: path
      stageUuid: "bb2ae903-6d29-8697-855b-d82478fc9b11"
    - stage: trinity
      stageUuid: "66d9d338-827c-87b9-af79-79559aedb62f"
    - stage: boundary
      stageUuid: "4bf48230-cac9-897b-8368-99a4de710890"
    - stage: links
      stageUuid: "604840d6-f4bc-84e6-b8cf-215f6cfeb241"
    - stage: horo
      stageUuid: "b36d1883-9518-868f-b31d-6f5a5e2191cf"
    - stage: seal
      stageUuid: "85b76e20-24d8-86c3-a451-0229a56483e2"
    - stage: uuid
      stageUuid: "17c54d3b-c80a-8ed3-933c-e5133b2e6c56"
version: 2
---
# recover — Repair a Payload Build After a Reorg

## Overview
After moving/renaming collections, fields, hooks, or services, errors look catastrophic (1000+) but trace to a handful of **root causes that cascade**. Fix the roots and re-measure; do not fix files one by one. Core loop: make imports resolve → `payload generate:types` (regenerates `payload-types.ts`, which clears hundreds of stale-slug/doc-property errors) → fix the genuine type tail.

## tsc crashes instead of reporting errors
`tsc --noEmit` dying with `RangeError: Maximum call stack size exceeded` is the classical
monolith binder — **not** fixed by raising `--stack-size`. Invert + quantumise (FTL only in
[[quantum]]/[[ftl]]):

1. **Invert** the cycle — child atoms never climb the parent barrel (host injects deps;
   types live on the leaf `map`).
2. **Quantumise** the check — `pnpm erpax lint typecheck` runs waves: uuid substrate first
   (`tsconfig.uuid.json`, includes `src/quantum/**`), then the full project. Local lanes use
   `--uuid` (reuse the sealed substrate). Past the ladder, split further — never raise the ceiling.

```bash
pnpm erpax lint typecheck --uuid    # wave 0 only — quantum substrate
pnpm erpax lint typecheck           # wave 0 + full project
```

To triage errors once a wave is green enough to print them:
```bash
pnpm erpax lint typecheck --uuid 2>&1 | tee /tmp/tsc-uuid.txt
grep -cE 'error TS[0-9]+' /tmp/tsc-uuid.txt
grep -oE 'error TS[0-9]+' /tmp/tsc-uuid.txt | sort | uniq -c | sort -rn
```

## Triage by root cause, biggest lever first
```bash
grep -oE "Cannot find module '[^']+'" /tmp/tsc.txt | sort | uniq -c | sort -rn
```
| Symptom | Root cause | Fix |
|---|---|---|
| One module missing in 100+ errors | A moved/renamed shared module (e.g. a fields helper) | Restore at the new path (`git show HEAD:old/path > new/path`) or fix the import path; one fix clears all |
| `../../../x` not found in dir-collections | Collection moved up a level, import depth stale | Correct the `../` depth to the real `src/x` |
| `'payload' has no exported member 'BeforeChangeHook'` | Payload v4 renamed hook types | Prefix with `Collection*` (`CollectionBeforeChangeHook`, etc.) |
| `Cannot find module 'zod'` etc. | Dep used but undeclared (often already in pnpm store) | Add to package.json, `pnpm install --offline` |

## The `payload generate:types` unblock loop
`tsc` (bundler resolution) is looser than Node ESM, so `generate:types` surfaces real config breakage tsc missed. It fails on the FIRST bad import/config, so iterate: run → read top of error → fix → repeat. The shell here lacks `cross-env`/`timeout`/`sed`; set env inline and use `node`/`perl` for edits.
```bash
NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" pnpm exec payload generate:types > /tmp/gen.txt 2>&1
head -40 /tmp/gen.txt   # the message is at the TOP; tail shows only stack
```
| generate:types error | Meaning | Fix |
|---|---|---|
| `does not provide an export named 'default'` | index re-exports `default as X` but collection exports `const X` | Flip to `export { X }`. Audit ALL at once (see below) — Node ESM catches cases tsc allowed |
| `InvalidFieldRelationship: Field F has invalid relationship 's'` | `relationTo: 's'` slug doesn't match any collection's `slug` (or a plugin collection isn't registered) | Fix the slug, or enable the plugin that provides it |
| `DuplicateFieldName: 'tenant'` | A collection both is in `multiTenantPlugin.collections` AND adds `tenant` manually | Strict Payload: the plugin owns `tenant`; remove the manual field |

## Audit in bulk, don't discover one-at-a-time
Write a throwaway Node script to find ALL instances of a class of bug, instead of one generate:types crash per fix. Examples that paid off:
- **Slug audit:** collect every `slug: '...'` (+ known plugin slugs) into a Set, collect every `relationTo: '...'`/`[...]`, report refs not in the Set.
- **Export audit:** for each `export { default as X } from './p'`, resolve `p`(.ts|/index.ts), flip to `export { X }` when the file has no `export default`.
- **Field cleanup:** strip a removed helper's usages + imports (single-line and multi-line specifier forms) across all collections, then delete its definition(s).

Composes: [[collections]] · [[config]] · [[types]] · [[database]] · [[port]].

## Common mistakes
- Reading the tsc/generate error from `tail` — the real message is at the **top**; the tail is just the V8 stack.
- Trusting the background-runner "exit 0" — check the actual output (a crashed `tsc` still reported success here).
- Fixing type errors before regenerating `payload-types.ts` — many vanish once the generated types are current.
- Leaving a helper for "some" collections after the plugin replaces it — finish the cleanup, delete the definition (no compat shims).
