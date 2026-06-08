---
name: folder
description: "Use when reasoning about folder — The user's standing command, made a gate: **every atom is ONE generic lowercase word, and a code folder holds only its trinity** — (the word), (the matter), (the proof) — plus the"
atomPath: law/folder
coordinate: law/folder · 5/round · e32186ab
contentUuid: "26200c13-483f-5c3a-b688-0191ec8ef8a2"
diamondUuid: "40272e30-fea3-80a5-bfc8-f84bc320dd28"
uuid: "e32186ab-b2c9-80cd-90cc-d1d40dc613e1"
horo: 5
bonds:
  in:
    - collapse
    - confirm
    - convention
    - cost
    - law
    - merge
    - path
    - pivot
    - purity
    - quaternary
    - seal
    - standards
    - test
  out:
    - collapse
    - confirm
    - convention
    - cost
    - law
    - merge
    - path
    - pivot
    - purity
    - quaternary
    - seal
    - standards
    - test
typography:
  partition: law
  bondDegree: 40
  neighbors: []
standards:
  - "ISO/IEC 25010:2023 §5.1 functional-completeness §5.5 testability"
  - the law is computed from the live tree; the ratchet decision is a pure fn (test.ts)
bindings: []
neighbors:
  wikilink:
    - collapse
    - confirm
    - convention
    - cost
    - law
    - merge
    - quaternary
    - seal
    - standards
    - test
  matrix:
    - collapse
    - confirm
    - convention
    - cost
    - law
    - merge
    - path
    - pivot
    - purity
    - quaternary
    - seal
    - standards
    - test
  backlinks:
    - collapse
    - confirm
    - convention
    - cost
    - law
    - merge
    - path
    - pivot
    - purity
    - quaternary
    - seal
    - standards
    - test
signatures:
  computationUuid: "fd62ae91-66cd-8eba-b256-9efd5f03eaea"
  stages:
    - stage: path
      stageUuid: "f28108c6-1ce0-8589-b842-ae6753d414dd"
    - stage: trinity
      stageUuid: "0c625db2-736f-89c5-885d-5a3968c1c49e"
    - stage: boundary
      stageUuid: "84e09ad3-9c63-8789-b509-f04dea170b46"
    - stage: links
      stageUuid: "b8ab8700-0720-82b5-a71e-d47a20f3b923"
    - stage: horo
      stageUuid: "6a11f36e-16a6-80a6-8260-6d4300024a4b"
    - stage: seal
      stageUuid: "e4ccd024-b171-8858-8cbe-48f017a6fdbf"
    - stage: uuid
      stageUuid: "c3ab6077-2d10-83c4-b7a0-cebb46380ac8"
version: 2
---
# folder — the folder-shape law

The user's standing command, made a gate: **every atom is ONE generic lowercase word, and a code folder holds only its trinity** — `SKILL.md` (the word), `index.ts` (the matter), `test.ts` (the proof) — plus the allowed per-folder `translations.ts` / `seed.ts`. This is the [[law]] projected onto the filesystem: a folder that is one true word with a balanced trinity adds no free parameter; it is determined by, and checked against, the wired whole.

## The two ways a folder breaks the law (both computed in `index.ts`)

- **NAME** — the folder is not one word: a hyphen (`trading-apis`), camelCase (`appCollections`), or a `.suffix` (`account.service`). The generic-naming law: name by the generic data-type in one concatenated word; regulation refs live only in [[standards]] and banners, never in a folder name.
- **ALPHANUMERIC** — every folder segment and every file stem (before extension) must match `[a-z0-9]+` only — no hyphens, underscores, or dot-encoded words (`field-visibility.test.ts`, `reports.service.ts`). Fix: nest as one-word child atoms (`accounting/debit/`, `admin/ui/visibility/`). Computed faces (`SKILL.md`, `README.md`, `LLM.md`, `diamond.json`) are exempt. Ratchet: `alphanumericNameViolations()` · `ALPHANUMERIC_NAME_BASELINE` · `pnpm rules:check`.
- **TRINITY** — a *code* folder (one holding `index.ts` or `test.ts`) is missing any of `SKILL.md` / `index.ts` / `test.ts`. A folder holding **only** a `SKILL.md` is a legal vocabulary word (antimatter-only) — the trinity is required only once matter appears.
- **SEAL** — empty or incomplete folders are **not sealed**: no `SKILL.md` and no `index.ts` ⇒ empty; partial trinity or stray matter without a nested child atom ⇒ incomplete. `deriveFolderModel` and the diamond membership audit both fail closed; an unsealed parent forbids sealed descendants ([[seal]] propagation).

## Why `src/config/trading-apis/index.ts` was a violation

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

Sibling laws: [[quaternary]] (file purity — only canonical files), [[convention]] (the import ratchet), [[merge]] · [[collapse]] (how entropy folds away). **Tightened axes** (alphanumeric stems, stray `.ts`, multi-segment filenames, accounting structure, word-without-code) live in [[rules]] — `pnpm rules:check`. Owner of the canonical command set: [[law]] · [[rules]].
