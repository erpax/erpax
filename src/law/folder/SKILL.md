---
name: folder
description: "Use when reasoning about folder — The user's standing command, made a gate: **every atom is ONE generic lowercase word, and a code folder holds only its trinity** — (the word), (the matter), (the proof) — plus the"
atomPath: "law/folder"
coordinate: "law/folder · 2/share · a4c581e9"
contentUuid: "9eb61ccc-b1d2-5a8c-bee0-4d41ea08d945"
diamondUuid: "e91d13a1-6db0-8904-8054-68043f08d83e"
uuid: "a4c581e9-0132-8bfc-b085-2b1aab750b4f"
horo: 2
typography:
  partition: law
  bondDegree: 35
standards:
  - "ISO/IEC 25010:2023 §5.1 functional-completeness §5.5 testability"
  - "ISO/IEC 25010:2023 §5.1 functional-completeness §5.5 testability`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2e3ef4bb-5600-862d-a228-c95ac8aa19bb"
  stages:
    - stage: path
      stageUuid: "f28108c6-1ce0-8589-b842-ae6753d414dd"
    - stage: trinity
      stageUuid: "0c625db2-736f-89c5-885d-5a3968c1c49e"
    - stage: boundary
      stageUuid: "2aeacf60-9b30-8363-a5c6-cfd448582454"
    - stage: links
      stageUuid: "2a6fc7b1-bcea-82c2-b112-11a19f08cf0a"
    - stage: horo
      stageUuid: "d0c902ac-343f-800d-a4c9-c217482fefb9"
    - stage: seal
      stageUuid: "153e3840-0d88-89c5-8878-a67dbb4d19fd"
    - stage: uuid
      stageUuid: "58a67cba-601c-8b64-a7e7-9a8e17ed03ca"
version: 2
---
# folder — the folder-shape law

The user's standing command, made a gate: **every atom is ONE generic lowercase word, and a code folder holds only its trinity** — `SKILL.md` (the word), `index.ts` (the matter), `test.ts` (the proof) — plus the allowed per-folder `translations.ts` / `seed.ts`. This is the [[law]] projected onto the filesystem: a folder that is one true word with a balanced trinity adds no free parameter; it is determined by, and checked against, the wired whole.

## The two ways a folder breaks the law (both computed in `index.ts`)

- **NAME** — the folder is not one word: a hyphen (`trading-apis`), camelCase (`appCollections`), or a `.suffix` (`account.service`). The generic-naming law: name by the generic data-type in one concatenated word; regulation refs live only in [[standards]] and banners, never in a folder name. **Agents must not mint hyphenated paths** (`linear-logic`, `linear-gap`, …) — fold logic belongs in parent `index.ts` matter or a single-word child atom (`gap`, `fold`, …).
- **ALPHANUMERIC** — every folder segment and every file stem (before extension) must match `[a-z0-9]+` only — no hyphens, underscores, or dot-encoded words (`field-visibility.test.ts`, `reports.service.ts`). Fix: nest as one-word child atoms (`accounting/debit/`, `admin/ui/visibility/`). Computed faces (`SKILL.md`, `README.md`, `LLM.md`, `diamond.json`) are exempt. Ratchet: `alphanumericNameViolations()` · `ALPHANUMERIC_NAME_BASELINE` · `pnpm rules:check`.
- **TRINITY** — a *code* folder (one holding `index.ts` or `test.ts`) is missing any of `SKILL.md` / `index.ts` / `test.ts`. A folder holding **only** a `SKILL.md` is a legal vocabulary word (antimatter-only) — the trinity is required only once matter appears.
- **SEAL** — empty or incomplete folders are **not sealed**: no `SKILL.md` and no `index.ts` ⇒ empty; partial trinity or stray matter without a nested child atom ⇒ incomplete. `deriveFolderModel` and the diamond membership audit both fail closed; an unsealed parent forbids sealed descendants ([[seal]] propagation).

## Why `src/trading/api/index.ts` was a violation

It breaks **both**: `trading-apis` is two hyphenated words, and the folder holds only `index.ts` — no `SKILL.md`, no `test.ts`. It passed every existing gate because the file-purity sibling law ([[quaternary]]) flags only *disallowed* files — it never checks the folder **name** and never a **missing** trinity member. This law closes that gap: `folderViolations()` now reports `config/trading-apis` under **both** name and trinity, and `test.ts` asserts that detection.

The prescribed fix was to relocate the catalogue to the one-word home its own header already names for its clients — `src/trading/api/index.ts` (with the full trinity), updating importers from `@/config/trading-apis` to `@/trading/api`. **Done** — the NAME and TRINITY guardians ratcheted down by one each.

## The gate is a ratchet, not zero — but it still fails on every new violation

The live tree carries a known backlog of pre-law folders; driving it to zero is a tree-wide rename + trinity-authoring migration (separate scope). So, exactly like [[convention]]/import, the law is a **ratchet** — but split into **two independent guardians**, never one sum: `folderGuardians(v)` runs the NAME ratchet (`name ≤ NAME_BASELINE`) and the TRINITY ratchet (`trinity ≤ TRINITY_BASELINE`) and is green only when BOTH hold. This is the user's command — *naming violations are caught at the gates by the guardians*: a single summed ceiling let a name violation (name +1) hide behind a trinity fix (gap −1), netting zero and PASSING; two guardians close that, each ratcheting DOWN on its own. There is **no backward-compatible summed baseline** (a shim is tamper-surface, not safety). The folder law therefore **cannot get worse on either axis** — every new malformed folder is a red gate in the live [[confirm]] hook, in pre-push, and in CI [[test]] — so no agent can introduce one in any session. Each baseline moves only DOWN, in the same diff that removes folders. Zero ⇒ tamper-[[cost]] → ∞.

Generated / framework trees are skipped (they are not atoms): `src/app/` (Next.js route segments are URLs, kebab-case by web convention) and `src/migrations/` (disposable greenfield output). Framework path segments (`(group)`, `[slug]`, `@slot`) and numeric standard ids (`4217`, `16931`) are exempt from the one-word rule — structural, not names.

## Allowed faces per atom (trinity · computed · generated · framework)

Each atom folder may hold **only** these basename classes — everything else is stray matter ([[diamond]] membership · [[rules]] stray-ts · [[quaternary]] merge queue):

| Class | Files / pattern | Gate |
| --- | --- | --- |
| **Trinity** | `SKILL.md` · `index.ts` · `test.ts` | Required once matter appears |
| **Co-located** | `translations.ts` · `seed.ts` · `index.tsx` · co-located `*.test.ts(x)` | Per-folder slots in `diamond/membership` COLOCATED |
| **Computed faces** | `README.md` · `LLM.md` · `diamond.json` | Emitted by `readme:waves` — drift verified, never hand-edited |
| **Generated emit** | `*.generated.ts` · `*.generated.json` | Emit scripts only (`pnpm rules:ratchet` · `pnpm apply:efficiency-emit`) — **never** hand JSON sidecars |
| **Framework** | Next/Payload route names · `*.mjs` CLI entry · `*.tsx` UI facets · asset ext (`.scss` · `.webp` · …) | Aligned with [[quaternary]] FRAMEWORK / ASSET_EXT |

**Bypass-math axis** (coordinate b2f75a6f): hand `ratchet.json` · hand `efficiency.json` · committed ceiling above Landauer×horo or below live scan — `bypassMathViolations()` fails closed at 0. Prefer **nest child atoms** or **fold into `index.ts`** over widening the allowlist.

## Ratchet artifact — computed emit (not hand ALCAPS · not hand JSON)

Guardian ceilings are **computed** from live corpus scans — `mathCeiling(axis, V) = ceil(V / (LANDAUER_BIT × horoRatio(d, 10)))` — then **emitted** to `ratchet.generated.ts` (`pnpm rules:ratchet`). Hand `ratchet.json` is **bypass-math** (coordinate b2f75a6f). Read gate ceilings with `computedBaseline(axis)` from `./baseline.ts`; ratchet DOWN only via emit in the same diff that fixes violations. `bypassMathViolations()` + `alcapsBaselineViolations()` in [[seal]] audit hand literals (b576a290).

## Word folder — every referenced word holds code (`word.ts`)

Extends the folder law: **every word** in bonds or wikilinks must be a folder with executable matter — `index.ts` + `test.ts` minimum — not form-only SKILL. Vocabulary-only atoms are violations until matter lands or a hub pivot nests the word under [[medical]] · [[computer]] · [[body]] (`matterForWord` · `applyTopHubWordPivots`). `wordFolderViolations()` scans the live corpus; axis **`word-without-code`** in `pnpm rules:check`; ratchet `WORD_WITHOUT_CODE_BASELINE`.

**Law — literary word:** a word without code is noise; a word without use case is fiction. `wordWithoutLogicViolations()` · `useCaseOf(atomPath)` gate form-only · orphan-export · prose-heavy · no-importers atoms; axis **`word-without-logic`** in `pnpm rules:check`; report `pnpm erpax corpus words`. Human-gate escape: `vocabularyException: true` in SKILL frontmatter. Fix: add `index.ts` matter OR fold into parent OR human-gate delete.

**Law — user words are not saved until the diamond is complete and proven.** Taking conversation phrases without `SKILL.md` + `index.ts` + `test.ts` + sealed README + `recordOnPath` + passing vitest in the **same pass** is axis **`phrase-without-diamond`** — strict violation. `userWordUnprovenViolations()` · `proveDiamondOrRevert(path)` · `phraseWithoutDiamondChangesetGate(files)` fail closed; hyphenated phrase folders are **deleted**.

Sibling laws: [[quaternary]] (file purity — only canonical files), [[convention]] (the import ratchet), [[merge]] · [[collapse]] (how entropy folds away). **Tightened axes** (alphanumeric stems, stray `.ts`, multi-segment filenames, accounting structure, word-without-code) live in [[rules]] — `pnpm rules:check`. Owner of the canonical command set: [[law]] · [[rules]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.1 functional-completeness §5.5 testability`
