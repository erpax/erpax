---
name: complete
description: "Use when checking whether the corpus stays whole — the computed convention that every atom is the full trinity {SKILL.md, index.ts, test.ts}, measured live as coverage = complete / total over the real tree."
atomPath: "convention/complete"
coordinate: "convention/complete · 7/descent · 56a36906"
contentUuid: "b4e68ffd-d61f-50c4-afe6-fcf428b76c52"
diamondUuid: "deab4fd7-9a6a-8596-ab38-af7d712a8f31"
uuid: "56a36906-3d1a-8e8a-bac6-fa1e73f9041b"
horo: 7
typography:
  partition: convention
  bondDegree: 59
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "3c4bf9b0-d932-8c3e-a442-ef6a7992fe3f"
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
      stageUuid: "ac9a0363-a978-8443-810d-b2bf0227eb65"
    - stage: seal
      stageUuid: "034abbf9-47d5-8b20-8fb9-642a915776a8"
    - stage: uuid
      stageUuid: "893c6306-f7fc-8567-a836-2138d540dc53"
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
