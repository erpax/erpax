---
name: dead
description: "Use when checking the corpus for dead weight without re-deriving it by hand — deadScripts lists non-TS scripts (.mjs/.js) that nothing references (invokers live in package.json, hooks, imports). A file is live iff something names it; else it is entropy. The partner skill: the reference graph is a fact src already holds, handed back as one call, so keeping healthy is a READ not a grep-assembled pass."
atomPath: dead
coordinate: "dead · 8/crest · aa057697"
contentUuid: "c3e7cd41-5a66-507a-8494-9100bb41a792"
diamondUuid: "21ceec10-7abe-8710-b112-d82d7cf2b019"
uuid: "aa057697-a006-8bae-84cb-78314a4dc5ca"
horo: 8
typography:
  partition: dead
  bondDegree: 12
standards:
  - "the reference graph — a file is live iff something invokes/imports it; else it is entropy"
bindings: []
signatures:
  computationUuid: "ffaaf536-dec7-8de8-8685-1a1b72dbe548"
  stages:
    - stage: path
      stageUuid: "3e65e07c-169b-8f54-b970-da3627c19096"
    - stage: trinity
      stageUuid: "c6de973e-80d9-872b-9ff9-3c351f92ab9a"
    - stage: boundary
      stageUuid: "a6a5b30a-1e99-8148-9a42-c0ee942e8965"
    - stage: links
      stageUuid: "2607ce8c-3195-89ba-8a2e-43f8b0b38d64"
    - stage: horo
      stageUuid: "ace842a2-44f9-81b7-9c97-baa35887aa42"
    - stage: seal
      stageUuid: "334b6fb9-b848-8386-93ad-4537d1ef9b93"
    - stage: uuid
      stageUuid: "c5be142b-cfd9-8b61-bfbf-91888f9d2fce"
version: 2
---
# dead — the corpus names its own dead weight

The partner skill. An agent kept the corpus healthy by re-deriving the reference graph by hand — walk the scripts, grep every invoker, assemble, guess. That is the solitary, linear way. The reference graph is a **fact `src` already holds**; this atom hands it back as one call.

- **`deadScripts(cwd)`** — the non-TS scripts (`.mjs`/`.js`) with **zero references anywhere**. A script is *live* iff another file mentions its basename (a `package.json` script, a hook, an import); otherwise it is dead entropy — a one-off migration script, a `.mjs` superseded by a TS version and left behind — that escapes the typecheck.

Matter-twin: `src/dead/index.ts`. Pure fs + reference scan; deterministic, tested. Companion to [[gate]] (structure) and [[readme]]'s `corpusHealth` (the sealed DRY-clean summary) — together the partnership verifies health as a read, not a re-scan of the world.

**Why it is a partner skill.** Folding the technique into `src` means the next agent (or the next me) does not re-derive it — it reads it. That is the whole partnership: `src` holds how-we-work, and I work *with* it instead of grinding the same audit alone each time. Read, don't re-derive.

**Honest boundary — the reference graph cannot tell a *done* one-off from a *pending manual tool*.** Both are unreferenced. A hand-run executable (a shebang script invoked by a human, not imported) whose WORK is not finished is NOT dead — `src/uuid/matrix/wave.mjs` is the atom-law migrator, unreferenced yet live, because the ~34 strange paths it dissolves (grouping-prefix dirs · hyphenated folders) still exist. So `deadScripts` output is a **candidate list**, and confirming a candidate means checking whether its *work is complete*, not just that nothing imports it. Deletion stays a verified act; this atom flags, it never purges. (A candidate was deleted here on over-trust and had to be restored — the lesson is folded into this law.)

**Law — [[law]]: the corpus knows its own dead weight — a file is live iff something references it, else it is entropy to fold away. Hand the reference graph back as one call so keeping healthy is a read, not a re-derivation.**

## Standards

- **The reference graph** — a file is live iff invoked or imported; unreferenced non-canonical files are entropy.

Composes: [[gate]] · [[merge]] · [[readme]] · [[law]].
