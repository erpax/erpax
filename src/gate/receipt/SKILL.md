---
name: receipt
description: "Use when the push gate must not be an hour-long monolith — green suite verdicts sealed content-addressed by their parsed import closure + schema surface; only changed suites re-run, a failure costs one named batch."
atomPath: "gate/receipt"
coordinate: "gate/receipt · 5/round · eed248ed"
contentUuid: "7885db77-b95f-5d02-96af-c1dcf5b83748"
diamondUuid: "fa1e34ab-e5f7-8aa7-a461-a7851c6d98c8"
uuid: "eed248ed-c6cc-8baa-a05f-a245815ca9f1"
horo: 5
typography:
  partition: gate
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "0db10c77-5db8-8f1f-8fad-7c162b0f2a76"
  stages:
    - stage: path
      stageUuid: "f178bb35-a2d1-8dd6-b553-60ce2326c2ea"
    - stage: trinity
      stageUuid: "226a3bbd-d096-8596-8449-c60781c9603e"
    - stage: boundary
      stageUuid: "c223cfb4-4edc-8ad4-b74d-73a490c224c7"
    - stage: links
      stageUuid: "f040f95d-228c-8baf-b72d-7c6ca77718e4"
    - stage: horo
      stageUuid: "faeea42b-7796-81da-b3c9-9cd6d14f03c9"
    - stage: seal
      stageUuid: "6cc79d23-0240-8af8-8e6d-1af1ed6c61c7"
    - stage: uuid
      stageUuid: "4b87ffd3-54ed-8dc7-b7d8-ecacbb4e9c31"
version: 2
---
# gate/receipt — the push failure fixed at its core

Every push failure this corpus paid had the same shape: a ~1-hour all-or-nothing vitest monolith where one red — or one killed worker — voided the hour. That is a command past every rung, and the ladder says split. The split is the fold's own theorem: **same content ⇒ same verdict.** `suiteClosureHash` addresses a suite's inputs (the suite file + its transitive import closure, edges PARSED via [[rules]]/cycle, + the schema surface); a green run seals a receipt at that address; `planSuites` splits the roster into changed (re-run) and covered (cited, never re-derived).

**Honest boundary.** The closure covers code and schema, never DATA — integration suites share the live D1, so a verdict depending on rows another suite wrote can drift green under a standing hash. The receipts are the LOCAL incremental gate; a clean-environment full run (CI) stays the final arbiter, and forcing the full roster is one flag away whenever doubt outweighs the hour.

## The same theorem, pointed at the corpus — `corpusScanFold`

The 21-axis corpus scan behind every ratchet cost **45,950 ms**. Folding everything it can read costs **954 ms** — 20,933 files, 67.9 MiB, all measured on this tree. So the gate paid 48× its own answer, every run, to re-derive a verdict that had not changed.

| | before | after | |
| --- | ---: | ---: | --- |
| `liveViolationCounts`, fresh process | 47,059 ms | **865 ms** | 54× |
| `tsx src/rules/index.ts --check` | ~10 min | **98 s** | |
| `tsx src/law/folder/index.ts --check` (the push gate) | ~50 s | **1–2 s** | |

**What it replaced was worse than slow — it was a clock.** The previous cache was a 60-second wall-clock TTL, wrong in both directions at once: it served a stale verdict for a minute after an edit, and threw a perfectly valid one away at 61 seconds. A clock knows nothing about content. The address does.

**The fold binds the path, not only the bytes.** Each file contributes `sha256(relative-path ‖ bytes)`, XOR-folded so the address is order-invariant — a `readdir` returning the same files in a different order, on a different filesystem or machine, folds to the same 128 bits. Binding the path matters because this corpus's most common edit is a **move**: 72 files changed folder in one campaign without a byte changing, and a fold over bytes alone would have called that corpus unchanged.

**Why this is not an optimisation.** A gate that can be skipped is prose ([[rules]]), and a gate that costs ten minutes *is* skipped — `--no-verify` was found on every push in one session, and three working tools were found disabled. Cost is what turns a law into a suggestion. Minting the address is free and forging one is not, which is the whole economy the corpus runs on ([[uuid]]).

**Honest boundary.** The fold proves the SCANNED SET is byte-identical, never that a scan is deterministic. An axis that reads the clock, the network, or a file outside `roots` can move under a standing fold — so the receipt keys a pure content scan and nothing else, and a lost or unreadable receipt only means the scan runs again. It never means a stale answer: `sealedScan` returns the verdict at THIS fold or `null`, with no notion of "old but probably fine".

## Five verdicts now, one store

The theorem does not care what produced the verdict. Everything a CI lane asserts is a function of
its inputs, so everything gets an address and a receipt — and the same store, never a second
mechanism beside the first.

| verdict | address | recompute | cite |
| --- | --- | ---: | ---: |
| a test suite | `suiteClosureHash` — suite ⊗ parsed closure ⊗ schema | — | — |
| the production build | `buildClosureHash` — payload config ⊗ every `src/app` route ⊗ CSS ⊗ root config | 172s | **4.7s** |
| `tsc -p x` | `typecheckClosureHash` — `src/**/*.ts(x)` ⊗ every tsconfig ⊗ the lockfile | 165s | **2.4s** |
| `payload verify-types` | `payloadTypesClosureHash` — config closure ⊗ `payload-types.ts` ⊗ `importMap.js` | 29s | **2.7s** |
| `eslint src` | `lintClosureHash` — the same sources ⊗ `eslint.config.mjs` ⊗ tsconfigs ⊗ the lockfile | 95s | **2.1s** |

`suiteClosureHash` is the one-entry case of `closureHashOf(entries)`; `typecheckClosureHash` and
`lintClosureHash` are one `sourceVerdictHash(key, binds)`. One walk, five callers.

**A lint and a typecheck over identical bytes are two verdicts, never one receipt.** They read the
same sources and ask different questions, so the KEY is part of the address — sharing one would let
a green typecheck cite a lint that never ran. What binds beyond the sources is what can change each
answer: the tsconfigs for one, `eslint.config.mjs` for the other, the lockfile for both.

**An address is only as honest as what it folds, and the two ways to get that wrong are opposite.**
Fold too little and the citation is a false GREEN: the build address covers `src/**/*.css` because
`import './x.css'` resolves in TS extensions, so the parsed walk never reaches a stylesheet, and a
broken one would be cited green. `payloadTypesClosureHash` binds BOTH artefacts the check compares
— an address covering only `payload-types.ts` cites green over a stale importmap. Fold too much and
the citation stops citing: the typecheck address deliberately excludes the prose beside the code,
because a comma in a SKILL.md cannot change a type and re-running 165s for one is how a receipt
becomes decoration.

**And when every verdict cites, SETUP is the run.** Measured phase by phase from a CI job log:
`pnpm install` 9.4s and the 330MB store restore 7.5s are the real work; `apt-get install ripgrep`
9.2s was a binary the job never called (one consumer in the tree — [[standards]]/emit shells out to
`rg`), and 6.3s went to writing 265 fixed bytes through an emitter that imports [[aura]] and
[[navigation]] at module top level. Both are gone: ripgrep is opt-in, the stub has its own atom
importing `node:fs` and nothing else. **33.5s → 20–26s.**

**Where the recompute is unavoidable, parallelise it.** `test waves --shard i/n` splits the roster
across sixteen runners, assigned by a hash of the suite PATH — never its index, which shifts every
suite after an insertion and strands the receipts each shard has cached. Measured end to end on
main: **123 min → 3 min 26 s.**

**Law — [[law]]: a gate verdict is content-addressed — while a suite's closure stands its green receipt stands, only what changed re-runs, and a failure names one batch instead of voiding the hour.**

Composes: [[rules]]/cycle · [[merge]] · [[timeout]] · [[law]].
