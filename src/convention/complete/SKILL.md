---
name: complete
description: "Use when checking whether the corpus stays whole — the computed convention that every atom is the full trinity {SKILL.md, index.ts, test.ts}, measured live as coverage = complete / total over the real tree."
atomPath: "convention/complete"
coordinate: "convention/complete · 8/crest · b7069c58"
contentUuid: "576cef26-70a3-5288-9288-237e8e3219f3"
diamondUuid: "aeb6996b-8e58-8b52-8523-a0a691fa97b3"
uuid: "b7069c58-ba8c-8d85-b42f-1de4673e16ab"
horo: 8
typography:
  partition: convention
  bondDegree: 59
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "1f781b78-82c2-8df8-8d49-e65309f51f78"
  stages:
    - stage: path
      stageUuid: "9a0444b1-1fce-8095-8864-9ed8f536acf3"
    - stage: trinity
      stageUuid: "9a260560-dfcb-8ac5-8b1b-b9437504c2ef"
    - stage: boundary
      stageUuid: "15b0a4cf-b687-87dd-a01e-df3994f113a7"
    - stage: links
      stageUuid: "2d0a3719-cc44-88f0-b791-426d2df685d7"
    - stage: horo
      stageUuid: "25a93e50-3621-8352-a271-f1be3eaaeb3a"
    - stage: seal
      stageUuid: "034abbf9-47d5-8b20-8fb9-642a915776a8"
    - stage: uuid
      stageUuid: "9272f96a-699f-801a-b474-cf0eaa5ff0fb"
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
