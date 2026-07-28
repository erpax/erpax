---
name: dead
description: "Use when checking the corpus for dead weight without re-deriving it by hand — deadScripts lists non-TS scripts (.mjs/.js) that nothing references (invokers live in package.json, hooks, imports). A file is live iff something names it; else it is entropy. The partner skill: the reference graph is a fact src already holds, handed back as one call, so keeping healthy is a READ not a grep-assembled pass."
atomPath: dead
coordinate: "dead · 1/base · fe5d372b"
contentUuid: "45582748-44f3-5d22-9595-93759bfe6e74"
diamondUuid: "46ed60dd-d2e2-888c-8ca8-242cf8ba2eb3"
uuid: "fe5d372b-a244-8a19-80bc-4950f07e7aef"
horo: 1
bonds:
  in:
    - gate
    - law
    - merge
    - readme
  out:
    - gate
    - law
    - merge
    - readme
typography:
  partition: dead
  bondDegree: 12
  neighbors: []
standards:
  - "the reference graph — a file is live iff something invokes/imports it; else it is entropy"
bindings: []
neighbors:
  wikilink:
    - gate
    - law
    - merge
    - readme
  matrix:
    - gate
    - law
    - merge
    - readme
  backlinks:
    - gate
    - law
    - merge
    - readme
signatures:
  computationUuid: "e8375357-b175-8ade-be79-71d26efd5d6f"
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
      stageUuid: "d9eb554f-7fc9-8dad-8bdd-57085c2c187a"
    - stage: seal
      stageUuid: "334b6fb9-b848-8386-93ad-4537d1ef9b93"
    - stage: uuid
      stageUuid: "0bb33820-58bd-8e73-acab-969fe2bb16a6"
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
