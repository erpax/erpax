---
name: complete
description: "Use when checking whether the corpus stays whole — the computed convention that every atom is the full trinity {SKILL.md, index.ts, test.ts}, measured live as coverage = complete / total over the real tree."
atomPath: convention/complete
coordinate: convention/complete · 2/share · f57f2c6a
contentUuid: "affa25ab-fbfd-5078-8356-d494b34b2860"
diamondUuid: "d75b273c-637f-844e-8a58-26572267cf54"
uuid: "f57f2c6a-a5a2-837a-a895-5bdb0665f946"
horo: 2
bonds:
  in:
    - collapse
    - convention
    - data
    - feed
    - folded
    - fronted
    - honest
    - law
    - merge
    - named
    - sti
    - time
    - triggered
    - twinned
  out:
    - collapse
    - data
    - feed
    - folded
    - fronted
    - honest
    - law
    - merge
    - named
    - sti
    - time
    - triggered
    - twinned
typography:
  partition: convention
  bondDegree: 50
  neighbors:
    - aura
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - aura
    - collapse
    - cost
    - dry
    - gravity
    - law
    - merge
    - trinity
  matrix:
    - collapse
    - data
    - feed
    - folded
    - fronted
    - honest
    - law
    - merge
    - named
    - sti
    - time
    - triggered
    - twinned
  backlinks:
    - collapse
    - data
    - feed
    - folded
    - fronted
    - honest
    - law
    - merge
    - named
    - sti
    - time
    - triggered
    - twinned
signatures:
  computationUuid: "18a7443b-ce4e-852b-981a-fbeb7930737d"
  stages:
    - stage: path
      stageUuid: "9a0444b1-1fce-8095-8864-9ed8f536acf3"
    - stage: trinity
      stageUuid: "9a260560-dfcb-8ac5-8b1b-b9437504c2ef"
    - stage: boundary
      stageUuid: "1ff60921-e61e-879a-a971-f62ccda039de"
    - stage: links
      stageUuid: "2d0a3719-cc44-88f0-b791-426d2df685d7"
    - stage: horo
      stageUuid: "34620ef3-ba0f-8b27-ac91-359beeac8ff7"
    - stage: seal
      stageUuid: "7679672e-0fc5-8ff5-9667-428baded47e7"
    - stage: uuid
      stageUuid: "ee8966b1-0d6e-8052-a794-98d11900ff95"
version: 2
---
# convention/complete — every atom is the full trinity {SKILL.md, index.ts, test.ts}

The completeness convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the corpus walk, it **composes** the canonical one:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **complete** = those whose folder ALSO carries `index.ts` AND `test.ts` — the matter-twin and its proof, the antimatter ([[trinity]]) made whole.
- **coverage** = `complete / total` — in [0,1] by construction (0 ≤ complete ≤ total, total > 0). It reaches **1** exactly when every `SKILL.md` atom is a full trinity: antimatter (`SKILL.md`) · matter (`index.ts`) · proof (`test.ts`), told three times and rendered once.

Pure math, no default: the corpus is non-empty by architecture (many atoms carry a `SKILL.md`), and `complete` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — and `coverage()` filters one walk, so numerator and denominator can never disagree. A **pure-skill atom** — a bare schema.org component word with no matter-twin — legitimately lacks `index.ts`/`test.ts`, and is the only thing that pulls coverage below 1. coverage → 1 ⟺ a whole corpus ⟺ infinitely-expanding tamper-[[cost]] ([[collapse]] · [[merge]] · [[gravity]]).

Entangled with — [[aura]] · [[trinity]] · [[dry]] · [[merge]]

Matter-twin: [[aura]] — the one corpus walk (`walkSkills`) this convention measures over; and [[trinity]] — the doc-scale three-told-once law this convention enforces on disk.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: an atom is the trinity {SKILL.md, index.ts, test.ts}; the corpus is complete iff coverage = complete / total = 1, and any pure-skill atom missing its matter-twin is the only gap driving tamper-cost below infinity.**
