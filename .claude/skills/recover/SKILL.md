---
name: recover
description: Use when a Payload collection/config reorg or rename leaves the build broken — `tsc` crashes with "Maximum call stack size exceeded", hundreds of type errors after moving collections, or `payload generate:types` fails with InvalidFieldRelationship, DuplicateFieldName, "does not provide an export named 'default'", or ERR_MODULE_NOT_FOUND.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# recover — Repair a Payload Build After a Reorg

## Overview
After moving/renaming collections, fields, hooks, or services, errors look catastrophic (1000+) but trace to a handful of **root causes that cascade**. Fix the roots and re-measure; do not fix files one by one. Core loop: make imports resolve → `payload generate:types` (regenerates `payload-types.ts`, which clears hundreds of stale-slug/doc-property errors) → fix the genuine type tail.

## tsc crashes instead of reporting errors
`tsc --noEmit` dies with `RangeError: Maximum call stack size exceeded` (binder recursion, seen on TS 6 beta). It is a stack-depth limit, not a code bug. Run with a bigger Node stack so you can actually SEE the errors:
```bash
TSC=$(find node_modules/.pnpm -path '*typescript@*/typescript/lib/tsc.js' | head -1)
node --stack-size=4000 "$TSC" --noEmit -p tsconfig.typecheck.json 2>&1 | tee /tmp/tsc.txt
grep -cE 'error TS[0-9]+' /tmp/tsc.txt          # total
grep -oE 'error TS[0-9]+' /tmp/tsc.txt | sort | uniq -c | sort -rn   # by code
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

## Common mistakes
- Reading the tsc/generate error from `tail` — the real message is at the **top**; the tail is just the V8 stack.
- Trusting the background-runner "exit 0" — check the actual output (a crashed `tsc` still reported success here).
- Fixing type errors before regenerating `payload-types.ts` — many vanish once the generated types are current.
- Leaving a helper for "some" collections after the plugin replaces it — finish the cleanup, delete the definition (no compat shims).
