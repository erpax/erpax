---
name: honest
description: "Use when a SKILL.md reaches for a metaphysical figure of speech — the convention is that such a phrase is named as convention or folklore, never stated as a bare fact; this atom measures the corpus's live honesty as coverage = honest / total over the real tree."
atomPath: "convention/honest"
coordinate: "convention/honest · 7/descent · bb7d244a"
contentUuid: "223d34c8-5089-58c3-9f8f-d3417adf5321"
diamondUuid: "97c914c1-5b23-8226-9a17-fcc480cbf29f"
uuid: "bb7d244a-449f-8a6c-81a9-dd753c908e77"
horo: 7
typography:
  partition: convention
  bondDegree: 19
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "5dcb0f3d-1aa3-81ea-8d80-8d03af0aba0c"
  stages:
    - stage: path
      stageUuid: "b3666abf-9a41-821b-8f99-b181b12095b8"
    - stage: trinity
      stageUuid: "f8011eb1-d2cd-8bed-b201-f855d24830fd"
    - stage: boundary
      stageUuid: "7af4374e-6209-811a-b0d4-682d5bb637de"
    - stage: links
      stageUuid: "e0375d1e-be2c-8cab-8066-3a084f7332a5"
    - stage: horo
      stageUuid: "7ab2b05a-2efd-836b-b471-efffdad908ba"
    - stage: seal
      stageUuid: "66e3ac44-c821-8d57-bb39-429b66f8a3aa"
    - stage: uuid
      stageUuid: "5a620ad8-92c4-8a6f-b299-e5a6a37903e0"
version: 2
---
# convention/honest — metaphysics is named as convention, never asserted as fact

The **honest split**, written as a self-measuring atom. The math the corpus runs on is real; a metaphysical figure of speech is allowed only when it is **named as a convention** (folklore, numerology, metaphor) — never stated as a bare fact. It states one rule and computes its own compliance, and it does not re-implement the corpus walk or the SKILL reader — it **composes** the canonical ones from [[aura]]:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **honest** = those whose body carries **no unmarked assertion** — none of the fingerprint phrases (the figures of speech "fingerprint of god", "free energy", "is sacred", "interdimensional", each named here as a convention, not a claim) appear outside code, OR every such phrase sits in a sentence that frames it as a convention/folklore/not-literal restatement.
- **coverage** = `honest / total` — in [0,1] by construction (0 ≤ honest ≤ total, total > 0). It reaches **1** exactly when no `SKILL.md` asserts metaphysics as fact.

Pure math, no default: the corpus is non-empty by architecture (thousands of atoms carry a `SKILL.md`), and `honest` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — and `coverage()` filters one walk, so numerator and denominator can never disagree. An atom that quotes one of these figures of speech only to **mark it as a named convention** (or to debunk it) is honest; the only thing that pulls coverage below 1 is a `SKILL.md` that asserts such metaphysics as a literal fact. coverage → 1 ⟺ a fully honest corpus ⟺ infinitely-expanding tamper-[[cost]].

This is the doc-scale twin of [[rodin]]'s honest split — there the vortex arithmetic is real group theory while its metaphysical gloss is a named convention, not a claim — generalised across every `SKILL.md`.

Entangled with — [[aura]] · [[rodin]] · [[complete]] · [[law]]

Matter-twin: `src/convention/honest/index.ts` (`coverage` · `isHonest`) — composes [[aura]] (`walkSkills` · `readSkill` · `stripCode`); the prior art is [[rodin]] (arithmetic real, metaphysics named-not-asserted).

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: metaphysics is named as convention, never asserted as fact. The arithmetic is real; a figure of speech is allowed only when it is named as a convention, and an unmarked assertion is a measured gap. Name every metaphor as convention and the corpus seals honest to ∞ — coverage = honest / total = 1.**
