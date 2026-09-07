---
name: triggered
description: "Use when checking whether every skill leads with its Use-when trigger — the computed convention that a SKILL.md frontmatter description starts with \"Use when\", measured live as coverage = triggered / total over the real tree."
atomPath: "convention/triggered"
coordinate: "convention/triggered · 1/base · 00eca16a"
contentUuid: "58ee666c-73af-5471-b088-6e3ba207834a"
diamondUuid: "8467dd4a-759d-8d93-a61b-e644a903f239"
uuid: "00eca16a-ff8b-84e3-8f01-adc14b7377a9"
horo: 1
typography:
  partition: convention
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "fa217904-8cab-8ac0-8fd1-3e8a7acb3557"
  stages:
    - stage: path
      stageUuid: "50fbb304-aea5-83aa-ae03-10ca7788f7e9"
    - stage: trinity
      stageUuid: "9a07a3d6-5528-8d05-aad7-153d04ebcab3"
    - stage: boundary
      stageUuid: "47ad4c48-3f29-8173-a0da-aeb15f8fd082"
    - stage: links
      stageUuid: "8e91103a-fa1b-8c16-b343-db128e24801b"
    - stage: horo
      stageUuid: "b85e2205-ba5a-81c6-b39d-2bacfc7a6707"
    - stage: seal
      stageUuid: "1d71eec3-8245-8476-89c6-d86e2b52c825"
    - stage: uuid
      stageUuid: "8276d2cb-0c10-80db-b0ad-4dd0fc3a48b6"
version: 2
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
