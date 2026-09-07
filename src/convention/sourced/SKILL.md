---
name: sourced
description: "Use when an atom is written or reviewed — the convention is that every atom cites the external standard it realises with an @standard marker (in its SKILL.md or its sibling index.ts), never grounding itself in nothing but itself; this atom measures the corpus's live sourcing as coverage = sourced / total over the real tree."
atomPath: "convention/sourced"
coordinate: "convention/sourced · 5/round · b9ddfa88"
contentUuid: "e87f17d1-6c25-5f15-9497-f866fda8e48a"
diamondUuid: "b0615f3d-b730-8fa5-a4ef-af6e34e5c62c"
uuid: "b9ddfa88-1a12-8d92-9138-2c7303c43ccf"
horo: 5
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
  computationUuid: "f10ffb41-4d34-8a1c-856e-830bd93ea501"
  stages:
    - stage: path
      stageUuid: "85fdf454-21fb-83b0-a747-be6ab8a21e49"
    - stage: trinity
      stageUuid: "34fbea2d-f12f-8545-a643-42f70c5f3c0e"
    - stage: boundary
      stageUuid: "f4fea36d-5999-87e1-8c86-a8f60c9d6883"
    - stage: links
      stageUuid: "7f63a4b2-b25d-87c8-a6d4-46da07600773"
    - stage: horo
      stageUuid: "4e8638fa-99a2-85d2-9274-cd690477e521"
    - stage: seal
      stageUuid: "ad3a3655-3fa7-8ee3-9806-3ee22e2e410c"
    - stage: uuid
      stageUuid: "88c6ade0-1c29-80b2-9e7d-e4755b5191fd"
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
