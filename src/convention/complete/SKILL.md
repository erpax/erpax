---
name: complete
description: Use when checking whether the corpus stays whole — the computed convention that every atom is the full trinity {SKILL.md, index.ts, test.ts}, measured live as coverage = complete / total over the real tree.
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
