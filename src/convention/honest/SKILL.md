---
name: honest
description: "Use when a SKILL.md reaches for a metaphysical figure of speech — the convention is that such a phrase is named as convention or folklore, never stated as a bare fact; this atom measures the corpus's live honesty as coverage = honest / total over the real tree."
atomPath: convention/honest
coordinate: convention/honest · 1/base · 61528455
contentUuid: "61d4bb85-b8c4-5fa1-935e-542db04c52dd"
diamondUuid: "56321463-2a39-8e90-bf40-cce7794a93ed"
uuid: "61528455-4d3d-8674-919a-681c9b72f820"
horo: 1
bonds:
  in:
    - aura
    - complete
    - convention
    - cost
    - law
    - rodin
  out:
    - aura
    - complete
    - cost
    - law
    - rodin
typography:
  partition: convention
  bondDegree: 17
  neighbors:
    - aura
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - aura
    - complete
    - cost
    - law
    - rodin
  matrix:
    - aura
    - complete
    - cost
    - law
    - rodin
  backlinks:
    - aura
    - complete
    - cost
    - law
    - rodin
signatures:
  computationUuid: "37233338-c46b-89a0-8ffa-05917704ba1c"
  stages:
    - stage: path
      stageUuid: "b3666abf-9a41-821b-8f99-b181b12095b8"
    - stage: trinity
      stageUuid: "f8011eb1-d2cd-8bed-b201-f855d24830fd"
    - stage: boundary
      stageUuid: "a4052fe0-a689-83b7-a06d-718e5dac97e7"
    - stage: links
      stageUuid: "e0375d1e-be2c-8cab-8066-3a084f7332a5"
    - stage: horo
      stageUuid: "78782509-6dd6-82ac-bfae-92df9c30ca4b"
    - stage: seal
      stageUuid: "b03730ab-cbc3-818f-9a56-726353cb149f"
    - stage: uuid
      stageUuid: "f4ee0136-6900-8ac6-a5f6-1e8c26d1e295"
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
