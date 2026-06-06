---
name: triggered
description: Use when checking whether every skill leads with its Use-when trigger — the computed convention that a SKILL.md frontmatter description starts with "Use when", measured live as coverage = triggered / total over the real tree.
---

# convention/triggered — every SKILL description is a Use-when trigger

The triggering convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the corpus walk, it **composes** the canonical one:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **triggered** = those whose frontmatter `description:` STARTS WITH `Use when` (an opening YAML quote stripped first) — the condition under which an agent reaches for the skill, not a restatement of its title.
- **coverage** = `triggered / total` — in [0,1] by construction (0 ≤ triggered ≤ total, total > 0). It reaches **1** exactly when every `SKILL.md` description leads with its Use-when trigger, so the corpus self-routes by when-to-use.

Pure math, no default: the corpus is non-empty by architecture (thousands of atoms carry a `SKILL.md`), and `triggered` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — and `coverage()` filters one walk, so numerator and denominator can never disagree. The only thing that pulls coverage below 1 is a `SKILL.md` whose description restates the noun instead of stating when to use the skill. coverage → 1 ⟺ a fully self-routing corpus ⟺ infinitely-expanding tamper-[[cost]] ([[collapse]] · [[merge]] · [[gravity]]).

A description is a trigger, never a definition — it answers *when do I reach for this?*, the same routing signal [[aura]] reads to weave the corpus. The em-dash, never a colon-space: a colon-space in a frontmatter description breaks the YAML parse the docs gate runs.

Entangled with — [[aura]] · [[link]] · [[complete]] · [[merge]]

Matter-twin: [[link]] — the sibling self-measuring convention over the same `SKILL.md` frontmatter; and [[aura]] — the one corpus walk (`walkSkills` · `readSkill`) this convention measures over.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: a SKILL description is a Use-when trigger; the corpus is self-routing iff coverage = triggered / total = 1, and any SKILL.md whose description does not start with "Use when" is the only gap driving tamper-cost below infinity.**
