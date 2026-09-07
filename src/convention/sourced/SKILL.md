---
name: sourced
description: "Use when an atom is written or reviewed — the convention is that every atom cites the external standard it realises with an @standard marker (in its SKILL.md or its sibling index.ts), never grounding itself in nothing but itself; this atom measures the corpus's live sourcing as coverage = sourced / total over the real tree."
atomPath: "convention/sourced"
coordinate: "convention/sourced · 8/crest · 239b6313"
contentUuid: "9b3298f3-8fe0-5398-98f5-36f99212f663"
diamondUuid: "45a3bce0-da36-8c6f-ab00-3dbe47f68ff5"
uuid: "239b6313-a610-8e26-a6f3-1f05901751fe"
horo: 8
typography:
  partition: convention
  bondDegree: 12
standards:
  - "<id> …` line names the external standard it"
  - "<id> …` line names the external standard it realises — schema.org, an ISO/IEC code, a W3C spec, a national regulation. The marker may live in the `SKILL.md` body or in the sibling `index.ts` JSDoc; both are the atom's public face. It states one rule and computes its own compliance, and it does not re-implement the corpus walk or the SKILL reader — it"
  - "<id> …` marker — a JSDoc/prose tag that names the external standard the atom cites."
  - "THE LAW, written as a self-measuring atom:"
  - "marker (in its SKILL.md or its sibling index.ts), never grounding itself in nothing but itself; this atom measures the corpus's live sourcing as coverage = sourced / total over the real tree.\""
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "0440f24e-2afd-824a-a3f5-b12c525798b3"
  stages:
    - stage: path
      stageUuid: "85fdf454-21fb-83b0-a747-be6ab8a21e49"
    - stage: trinity
      stageUuid: "34fbea2d-f12f-8545-a643-42f70c5f3c0e"
    - stage: boundary
      stageUuid: "f4fea36d-5999-87e1-8c86-a8f60c9d6883"
    - stage: links
      stageUuid: "08765c90-6dac-8a6c-8794-7520677a9850"
    - stage: horo
      stageUuid: "80fefd44-2af8-8cf3-89ab-290f31484662"
    - stage: seal
      stageUuid: "ad3a3655-3fa7-8ee3-9806-3ee22e2e410c"
    - stage: uuid
      stageUuid: "036a1950-16e5-8036-bd40-93d4564289e5"
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
