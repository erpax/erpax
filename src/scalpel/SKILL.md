---
name: scalpel
description: "Use when many agents must edit in thousands without fabricating — read-only researchers emit op manifests (file · find · replace · reason); one executor cuts in ≤30-file batches, unique-match-or-refuse, ring-verified, red rolls back to the byte."
atomPath: scalpel
---

# scalpel — coordinated surgical edits in thousands

The coordination law as an engine. Researchers are READ-ONLY — an agent that writes fabricates (measured; the fill-agents lesson), so it emits a **manifest** of operations instead: file · find · replace · **reason** (the evidence a reviewer reads; reasonless ops refuse). `mergeManifests()` joins any number of researchers; `planScalpel()` names every refusal before a byte moves — **a find matching zero times is aimed at matter that is not there, two-plus is ambiguity, both refuse; exactly once cuts**. Two researchers claiming the same bytes is a collision, surfaced, never silently last-wins.

`applyScalpel()` executes sequentially in batches of ≤30 files (the corpus's seal-batch bound), re-verifying uniqueness against the **current** bytes of each file, running the caller's verifier (the [[cli]] ring) after each batch — **a red batch restores every touched file to its pre-batch bytes and stops with the batch named**. Dry-run is the default and the contract.

**Honest boundary.** The scalpel proves each cut landed where it was aimed and that the batch verified — never that the manifest is *wise*: a well-formed op can encode a bad idea, and the reason line is where a human catches it. Moves/renames are git's (`git mv` + [[rules]]/reference followers), not the scalpel's; it cuts bytes in place.

**Law — [[law]]: mass change is many read-only researchers and ONE executor — every cut unique-match-or-refuse with its reason attached, every batch verified or rolled back to the byte, and a collision named before anything is touched.**

Composes: [[mesh]] · [[timeout]] · [[rules]] · [[law]].
