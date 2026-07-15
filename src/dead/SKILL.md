---
name: dead
description: "Use when checking the corpus for dead weight without re-deriving it by hand — deadScripts lists non-TS scripts (.mjs/.js) that nothing references (invokers live in package.json, hooks, imports). A file is live iff something names it; else it is entropy. The partner skill: the reference graph is a fact src already holds, handed back as one call, so keeping healthy is a READ not a grep-assembled pass."
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
