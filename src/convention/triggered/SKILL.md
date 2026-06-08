---
name: triggered
description: "Use when checking whether every skill leads with its Use-when trigger — the computed convention that a SKILL.md frontmatter description starts with \\\"Use when\\\", measured live as coverage = triggered / total over the real tree."
atomPath: convention/triggered
coordinate: convention/triggered · 4/weave · d159844c
contentUuid: "e4ce42bb-c108-51c3-969b-135722a02a91"
diamondUuid: "954b3bad-78f5-80a9-b04a-0ba51591e86f"
uuid: "d159844c-ca25-8956-a198-469e13cdd90e"
horo: 4
bonds:
  in:
    - aura
    - collapse
    - complete
    - convention
    - cost
    - gravity
    - law
    - link
    - merge
  out:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - link
    - merge
typography:
  partition: convention
  bondDegree: 25
  neighbors:
    - aura
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - link
    - merge
  matrix:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - link
    - merge
  backlinks:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - link
    - merge
signatures:
  computationUuid: "08ee094b-2cc3-876f-b28f-86fd82b9ddb1"
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
      stageUuid: "32ba565d-12bf-8fad-85bc-749c032803cb"
    - stage: seal
      stageUuid: "0b490e51-6c5b-8395-846d-8e97f73206d0"
    - stage: uuid
      stageUuid: "2cff9691-6eec-8e25-ba5c-516495d88251"
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
