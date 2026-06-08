---
name: folder
description: "The folder-shape law — every atom is ONE generic lowercase word holding only its SKILL.md / index.ts / test.ts trinity (translations.ts / seed.ts allowed). Computed from the live tree and gated as a ratchet so no agent can add a malformed folder in any session."
---

# folder — the folder-shape law

The user's standing command, made a gate: **every atom is ONE generic lowercase word, and a code folder holds only its trinity** — `SKILL.md` (the word), `index.ts` (the matter), `test.ts` (the proof) — plus the allowed per-folder `translations.ts` / `seed.ts`. This is the [[law]] projected onto the filesystem: a folder that is one true word with a balanced trinity adds no free parameter; it is determined by, and checked against, the wired whole.

## The two ways a folder breaks the law (both computed in `index.ts`)

- **NAME** — the folder is not one word: a hyphen (`trading-apis`), camelCase (`appCollections`), or a `.suffix` (`account.service`). The generic-naming law: name by the generic data-type in one concatenated word; regulation refs live only in [[standards]] and banners, never in a folder name.
- **TRINITY** — a *code* folder (one holding `index.ts` or `test.ts`) is missing any of `SKILL.md` / `index.ts` / `test.ts`. A folder holding **only** a `SKILL.md` is a legal vocabulary word (antimatter-only) — the trinity is required only once matter appears.
- **SEAL** — empty or incomplete folders are **not sealed**: no `SKILL.md` and no `index.ts` ⇒ empty; partial trinity or stray matter without a nested child atom ⇒ incomplete. `deriveFolderModel` and the diamond membership audit both fail closed; an unsealed parent forbids sealed descendants ([[seal]] propagation).

## Why `src/config/trading-apis/index.ts` was a violation

It breaks **both**: `trading-apis` is two hyphenated words, and the folder holds only `index.ts` — no `SKILL.md`, no `test.ts`. It passed every existing gate because the file-purity sibling law ([[quaternary]]) flags only *disallowed* files — it never checks the folder **name** and never a **missing** trinity member. This law closes that gap: `folderViolations()` now reports `config/trading-apis` under **both** name and trinity, and `test.ts` asserts that detection.

The prescribed fix was to relocate the catalogue to the one-word home its own header already names for its clients — `src/trading/api/index.ts` (with the full trinity), updating importers from `@/config/trading-apis` to `@/trading/api`. **Done** — the NAME and TRINITY guardians ratcheted down by one each.

## The gate is a ratchet, not zero — but it still fails on every new violation

The live tree carries a known backlog of pre-law folders; driving it to zero is a tree-wide rename + trinity-authoring migration (separate scope). So, exactly like [[convention]]/import, the law is a **ratchet** — but split into **two independent guardians**, never one sum: `folderGuardians(v)` runs the NAME ratchet (`name ≤ NAME_BASELINE`) and the TRINITY ratchet (`trinity ≤ TRINITY_BASELINE`) and is green only when BOTH hold. This is the user's command — *naming violations are caught at the gates by the guardians*: a single summed ceiling let a name violation (name +1) hide behind a trinity fix (gap −1), netting zero and PASSING; two guardians close that, each ratcheting DOWN on its own. There is **no backward-compatible summed baseline** (a shim is tamper-surface, not safety). The folder law therefore **cannot get worse on either axis** — every new malformed folder is a red gate in the live [[confirm]] hook, in pre-push, and in CI [[test]] — so no agent can introduce one in any session. Each baseline moves only DOWN, in the same diff that removes folders. Zero ⇒ tamper-[[cost]] → ∞.

Generated / framework trees are skipped (they are not atoms): `src/app/` (Next.js route segments are URLs, kebab-case by web convention) and `src/migrations/` (disposable greenfield output). Framework path segments (`(group)`, `[slug]`, `@slot`) and numeric standard ids (`4217`, `16931`) are exempt from the one-word rule — structural, not names.

Sibling laws: [[quaternary]] (file purity — only canonical files), [[convention]] (the import ratchet), [[merge]] · [[collapse]] (how entropy folds away). Owner of the canonical command set: [[law]].
