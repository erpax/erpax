---
name: rules
description: "Use when tightening or auditing erpax gates — the canonical home for folder, diamond, path, seal, import, and accounting-structure law. Aggregates live-tree violations into rulesOf() and fail-closed assertRulesHold(); tightened axes catch hyphen barrel siblings, stray .ts at atom roots, and corpus modules that must nest as one-word child atoms (accounting/coa · accounting/corpus)."
atomPath: rules
coordinate: rules · 2/share · 335e5fa7
contentUuid: "a02f991f-ea0d-8237-9d76-64cc6bd7c955"
diamondUuid: "f07080b7-70bf-8860-b639-797acb2c4905"
uuid: "335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c"
horo: 2
bonds:
  in:
    - accounting
    - confirm
    - diamond
    - gate
    - guardian
    - law
    - path
    - readme
    - seal
  out:
    - accounting
    - confirm
    - diamond
    - gate
    - guardian
    - law
    - path
    - readme
    - seal
standards:
  - "ISO/IEC 25010:2023 §5.5 testability"
  - "pnpm rules:check — tightened gate cross (fail-closed)"
bindings: []
version: 1
---
# rules — the tightened erpax gate corpus

The canonical home for every **live-tree law** the corpus enforces. Ratchet gates ([[law]]/folder · [[convention]]/import · [[diamond]]/files) hold the tree from getting **worse**; this atom adds **tightened** axes that name what must eventually reach zero: stray `.ts` at atom roots, multi-segment filenames, and corpus accounting modules that must **nest** as one-word child atoms.

## The registry — `rulesOf()`

| Axis | Source | Law |
| --- | --- | --- |
| `folder-name` | [[law]]/folder | one generic lowercase word per folder |
| `folder-trinity` | [[law]]/folder | SKILL · index · test once matter appears |
| `alphanumeric-name` | [[law]]/folder | folder segments + file stems `[a-z0-9]+` only — nest hyphen/dot siblings |
| `stray-ts` | [[rules]] | no barrel-sibling `.ts` at code atom root — nest or fold into index |
| `multi-segment-file` | [[rules]] | no hyphen/dot stems at root (nest `accounting/coa/` not hyphen siblings) |
| `accounting-structure` | [[rules]] | corpus self-accounting nests under `accounting/coa` · `accounting/corpus` — no `path` · `self` intermediates |
| `diamond-membership` | [[diamond]]/membership | stray dirs · dotfiles · unregistered matter |
| `import-purity` | [[convention]]/import | `@/atom` index face only — no deep `@/accounting/coa` |
| `logic-concentration` | [[rules]]/concentration | hub `index.ts` re-exports only — matter in child atoms; score ≥ 1.0 or ≥500 lines |
| `word-matter` | [[rules]]/word-matter | every identifier and comment earns its place — no verbose names, comment bloat, duplicate get/getX, helper/util filenames |
| `word-without-logic` | [[rules]]/word-without-logic | literary atoms — prose without executable matter or use case; `pnpm erpax corpus words` |
| `canonical` | [[rules]]/canonical | installed package never called — use its API or drop it; `tsx src/rules/canonical/index.ts` |
| `reference` | [[rules]]/reference | dead `src/…` pointer — the statute→code trace must resolve (statutory ceiling **0**); `tsx src/rules/reference/index.ts` |
| `unfolded` | [[rules]]/unfolded | export with ≤1 call site — inline it, delete it, or reuse it; `tsx src/rules/unfolded/index.ts` |
| `ask` | [[rules]]/ask | required field with nothing computed — if law/tenant/sequence/clock determines it, the user CONFIRMS; `tsx src/rules/ask/index.ts` |

Run: `pnpm rules:check` · `tsx src/rules/index.ts --accounting-only`

Ceilings live in `law/folder/ratchet.json` (read via `computedBaseline(axis)`), never hand ALCAPS. Corpus self-accounting is **eb** (entropy-bit) via `@/accounting`.

**Law — [[law]]: rules is the one gate registry — folder · diamond · path · seal · import · accounting-structure · logic-concentration · word-matter; tightened axes fail closed; zero stray `.ts` at atom roots is the horizon.**


## Agent laws — the working discipline (loaded as mandatory instructions)

This file is in every agent's system prompt, so these bind the next agent as law, not memory:

- **Reuse the computed answer, never re-derive.** Read the receipt — `erpax verify <atom>` (targeted, skips the DB boot), `erpax doctor corpus` (sealed audit), the LLM.md face — before writing a fresh derivation. A hand-rolled harness or a re-explained realization is the O(n²) medium cost: a word written early is re-billed every turn (measured 2026-07-15: 97% of a session's tokens were context re-sent). Terseness is the fold applied to the dialogue.
- **Derivable content is not stored.** The computed faces (LLM.md · README.md · diamond.json) are gitignored and regenerated on demand; the [[readme]] `corpusFoldRoot` seal proves regenerability. Storing what the fold computes is entropy — never re-commit them.
- **The rosetta basis.** A new collection is warranted only by a NEW signature (`collectionSignature` over the closed 9-axis basis); otherwise it is a row, not a table. `erpax doctor corpus` reports collapse clusters + compression headroom. **Enforcement PAID:** `shapeRatchetVerdict` fails closed against `ROSETTA_BASELINE` inside `erpax doctor corpus`, which is the `corpus` lane of `cli/gate.ts` — CI/pre-push blocks basis growth; both ceilings ratchet DOWN in the same diff that folds a collection away.
- **Verify with the tool, not the reflex.** `erpax verify <atom>` for pure atoms; `pnpm check` for integration. Never a full vitest run to self-check.
- **Single-use code is entropy.** A script or function called once is un-folded — inline it, delete it, or make it a reused command. Never write a throwaway to work around a problem already fixed (the tsx assert-harness was folded into `erpax verify`; a scratchpad regen script is just the existing `erpax readme` command un-reused). Generated content is the same law: a table of count-1 rows (raw scatter, not a basis axis) is useless detail — purge it, do not cap it (capping hides entropy; the rosetta decode says what is signal vs noise).
- **A law here is a command, not prose.** Prose is read and maybe obeyed; a gate is executed and cannot be violated. Two laws proved it: "use packages canonically" is now `tsx src/rules/canonical/index.ts` ([[rules]]/canonical — 3 real hand-rolls beside installed packages), and "research the real app+data" is now `tsx src/port/index.ts <schema.rb> <db>` ([[port]] — running it IS the research). Prose that could be a command is entropy billed on every turn of every session.

## Enforcement — why a law here is obeyed

A law is obeyed only when a **gate blocks its violation** ([[confirm]] hook · pre-push · this registry), not when it is written down. The confirm hook proves it: it refused every trinity-incomplete or dead-link edit this session. Behavioral laws that are not yet a blocking axis (above) are ENFORCEMENT DEBT — the horizon is to wire each into `rulesOf` so `pnpm rules:check` fails closed.

Composes: [[law]]/folder · [[diamond]]/membership · [[seal]] · [[path]] · [[accounting]] · [[readme]] · [[confirm]] · [[guardian]] · [[gate]] · [[navigation]]/distribute
