---
name: sourced
description: "Use when an atom is written or reviewed — the convention is that every atom cites the external standard it realises with an @standard marker (in its SKILL.md or its sibling index.ts), never grounding itself in nothing but itself; this atom measures the corpus's live sourcing as coverage = sourced / total over the real tree."
atomPath: "convention/sourced"
coordinate: "convention/sourced · 5/round · d0d5f7ee"
contentUuid: "7b2c2323-8db5-57d9-ac5c-f90f47e4a8b4"
diamondUuid: "ffcdc0de-3958-8375-a605-50fdedc20be1"
uuid: "d0d5f7ee-5b24-80b5-a840-3cea4f3822aa"
horo: 5
bonds:
  in:
    - convention
    - law
    - thing
  out:
    - law
    - thing
typography:
  partition: convention
  bondDegree: 12
  neighbors:
    - aura
standards:
  - "<id> …` line names the external standard it"
  - "<id> …` line names the external standard it realises — schema.org, an ISO/IEC code, a W3C spec, a national regulation. The marker may live in the `SKILL.md` body or in the sibling `index.ts` JSDoc; both are the atom's public face. It states one rule and computes its own compliance, and it does not re-implement the corpus walk or the SKILL reader — it"
  - "<id> …` marker — a JSDoc/prose tag that names the external standard the atom cites."
  - "THE LAW, written as a self-measuring atom:"
  - "marker (in its SKILL.md or its sibling index.ts), never grounding itself in nothing but itself; this atom measures the corpus's live sourcing as coverage = sourced / total over the real tree.\""
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - aura
    - cost
    - honest
    - law
    - standards
  matrix:
    - law
    - thing
  backlinks:
    - law
    - thing
signatures:
  computationUuid: "cc9ffd95-5099-8b43-9a9a-71d6c99d03e5"
  stages:
    - stage: path
      stageUuid: "85fdf454-21fb-83b0-a747-be6ab8a21e49"
    - stage: trinity
      stageUuid: "34fbea2d-f12f-8545-a643-42f70c5f3c0e"
    - stage: boundary
      stageUuid: "7075dfbd-11da-810e-9222-142e29bc1c14"
    - stage: links
      stageUuid: "7f63a4b2-b25d-87c8-a6d4-46da07600773"
    - stage: horo
      stageUuid: "ecfc1eb3-50cd-8d43-b06e-d5e964c9eb19"
    - stage: seal
      stageUuid: "ad3a3655-3fa7-8ee3-9806-3ee22e2e410c"
    - stage: uuid
      stageUuid: "c9d0bed7-61ab-88fa-86a2-3efe27e9dc16"
version: 2
---
# convention/sourced — every atom cites its @standard

THE LAW, written as a self-measuring atom: **an atom cites its `@standard`**. An atom (a folder that carries a `SKILL.md`) is **sourced** when an `@standard <id> …` line names the external standard it realises — schema.org, an ISO/IEC code, a W3C spec, a national regulation. The marker may live in the `SKILL.md` body or in the sibling `index.ts` JSDoc; both are the atom's public face. It states one rule and computes its own compliance, and it does not re-implement the corpus walk or the SKILL reader — it **composes** the canonical ones from [[aura]]:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **sourced** = those whose `SKILL.md` or sibling `index.ts` carries an `@standard` marker. The `@standard` line is prose or a JSDoc tag, never inside a code fence, so it is read raw — no code-stripping, which would wrongly hide it.
- **coverage** = `sourced / total` — in [0,1] by construction (0 ≤ sourced ≤ total, total > 0). It reaches **1** exactly when every atom cites an `@standard`.

Pure math, no default: the corpus is non-empty by architecture (thousands of atoms carry a `SKILL.md`), and `sourced` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — and `coverage()` filters one walk, so numerator and denominator can never disagree. The only thing that pulls coverage below 1 is an atom grounded in nothing but itself: no `@standard` in its `SKILL.md` and none in its `index.ts`. A citation borrows the external standard's mass into the atom, so an unsourced atom is cheaper to forge — coverage → 1 ⟺ a fully sourced corpus ⟺ infinitely-expanding tamper-[[cost]].

This is the sourcing twin of [[honest]] — there a metaphysical figure of speech must be named as a convention; here every atom's claim must be anchored to a named external standard.

Entangled with — [[aura]] · [[standards]] · [[honest]] · [[cost]] · [[law]]

Matter-twin: `src/convention/sourced/index.ts` (`coverage` · `isSourced`) — composes [[aura]] (`walkSkills` · `readSkill`); the shared standard registry it measures against is [[standards]].

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every atom cites its @standard. An atom's claim is anchored to a named external standard in its SKILL.md or its index.ts, and an uncited atom is a measured gap that lowers tamper-cost. Cite the standard in every atom and the corpus seals sourced to ∞ — coverage = sourced / total = 1.**
