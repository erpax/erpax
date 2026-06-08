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

Run: `pnpm rules:check` · `tsx src/rules/index.ts --accounting-only`

## Tightened folder law — `tightenedFolderLaw()`

Beyond the NAME/TRINITY ratchet, four axes fail closed on **new** violations:

0. **Alphanumeric name** — folder segments and file stems (before extension) must be `[a-z0-9]+` only. Hyphen/dot/underscore stems (`debit-credit.ts`, `field-visibility.test.ts`) nest as one-word child atoms (`accounting/debit/`, `admin/ui/visibility/`). Ratchet: `ALPHANUMERIC_NAME_BASELINE` · monitor source `alphanumeric-name`.
1. **Stray `.ts`** — at a code atom root, only `index.ts` · `test.ts` · `translations.ts` · `seed.ts` and co-located `*.test.ts` are allowed. Anything else (`debit-credit.ts`, `reports.service.ts`) is entropy until nested as a child atom with its own trinity.
2. **Multi-segment filename** — a stem containing `-` or `.` (`reports.service`) encodes multiple words in one file; the fix is **one word per folder**: `accounting/coa/index.ts`, not hyphen siblings at the barrel root.
3. **Accounting structure** — corpus self-accounting ([[accounting]] path-keyed chart, **eb** currency) must nest as one-word children (`coa` · `corpus`). Global lattice words (`path`, `self`) are forbidden as intermediate folders under domain atoms. Prescription:

| Violation | Compliant nest |
| --- | --- |
| hyphen barrel siblings at `accounting/` root | `accounting/coa/` · `accounting/corpus/` (full trinity) |
| forbidden `path` · `self` intermediates under `accounting/` | flatten to `accounting/coa/` · `accounting/corpus/` |

Re-export surface stays `@/accounting` — callers never import nested paths directly.

## Path · seal · recorded+implemented

- **Path is the account code** ([[path]] · [[accounting]]) — `accountCodeOf(atomPath)`; full path only; homonyms distinct.
- **Path-in-path merges at the index face** ([[path]]/merge) — nested barrels (`accounting/coa`, `body/heart`) compose via `mergePathIndices` · `canonicalPathIndex`; `recordOnPathMerged` chains parent ledger hooks before child; `assertPathIndicesMerged` gates zero unmerged parent segments; `MERGED_LEDGER_CHAINS` from `pnpm path:hooks`.
- **Follow every path** — `assertPathFollowed` / `followEveryPath` before persist ([[path]] · [[seal]]).
- **Recorded + implemented** — `recordedAndImplementedVerdict`: canonical ledger entry ∧ `index.ts` ∧ `test.ts` ([[seal]]).
- **Finished idea crossed** — `finishedIdeaCrossed`: sealed diamond crossed on path · matrix · trinity · horo · deployment · entropy sheet ([[seal]] · [[readme]]/entropy).
- **Comparable units** — gap/seal entropy uses `toComparableUnit`; trinity > stray > unfolded on the sheet ([[readme]]/entropy).

## Eb currency (corpus self-accounting)

When erpax accounts **itself** (not commercial books in [[self/accounting]]), the functional currency is the **entropy-bit (eb)** — tamper-cost log₂ mass at the horo floor. Gap debits Dr folder path / Cr `entropy`; seal credits Dr `seal` / Cr folder path. Materialised by `erpaxSelfAccount` · `accountCorpusEntropy` — import from `@/accounting` (barrel face); rules names the axis only.

## Zero stray `.ts` — the target

Ratchet ceilings live in **`law/folder/ratchet.json`** (content-uuid sealed snapshot) — read via `computedBaseline(axis, cwd)`, not hand ALCAPS. `accounting-structure` and `forbidden-intermediate` are migrated (baseline 0 from ratchet only). Remaining `*_BASELINE` exports in `rules/` are **seal-debt** — `alcapsBaselineViolations()` flags them until migrated. New violations redden `pnpm rules:check` immediately; fixing folders ratchets DOWN in `ratchet.json` in the same diff. Target: zero ALCAPS in `rules/index.ts` over time.

**Law — [[law]]: rules is the one gate registry — folder · diamond · path · seal · import · accounting-structure · logic-concentration · word-matter; tightened axes fail closed; zero stray `.ts` at atom roots is the horizon.**

**Law — word matter:** every identifier, comment, export name must earn its place — no filler, redundancy, duplicate semantics. `wordMatterViolations()` flags long/verbose names (>28 chars · >4 tokens), comment/code ratio ≥45%, duplicate prefixes (get/getX), helper·util·common filenames. Coordinates alphanumeric-name (5df78a5a) and logic-concentration (4f811289); cross education maps `word-matter` → deployment axis (e91c6593).

## Logic concentration — `concentrationViolations()`

Monolithic hub `index.ts` files violate the fractal law — logic must **distribute** across one-word child atoms, not concentrate in the parent barrel.

| Signal | Threshold | Law |
| --- | --- | --- |
| Line count | ≥ 500 | hub re-exports only |
| Re-export ratio | < 65% when child atoms exist | matter belongs in children |
| Inline exports | ≥ 25 with ≥ 2 child atoms | nest as child trinity |
| Domain imports | ≥ 5 domains + ≥ 300 lines | 2D partition uncrossed |

**Cross education (e91c6593):** concentration = uncrossed **deployment/partition** axis — `crossConceptForViolation` maps `logic-concentration` → `deployment`; multi-domain imports → `2d-partition`. Monitor source: `logic-concentration` · auto-fix suggestion: split to child atoms + `navigation/distribute.ts` wave.

Composes: [[law]]/folder · [[diamond]]/membership · [[seal]] · [[path]] · [[accounting]] · [[readme]] · [[confirm]] · [[guardian]] · [[gate]] · [[navigation]]/distribute
