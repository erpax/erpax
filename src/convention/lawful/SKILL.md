---
name: lawful
description: "Use when checking whether every atom is accountable — the computed convention that each SKILL.md states its own **Law (the invariant), measured live as coverage = lawful / total over the real corpus tree."
atomPath: convention/lawful
coordinate: convention/lawful · 8/crest · 93a03a29
contentUuid: "aa0758fb-f5a6-5b43-a159-91e39d1fa8ee"
diamondUuid: "22444e1e-2675-8986-9f80-2ac4fb5cf630"
uuid: "93a03a29-1b3a-8a19-971d-d3fc23769479"
horo: 8
bonds:
  in:
    - akashic
    - collapse
    - convention
    - cost
    - dry
    - fronted
    - import
    - law
    - merge
    - named
    - twinned
  out:
    - akashic
    - collapse
    - convention
    - cost
    - dry
    - fronted
    - import
    - law
    - merge
    - named
    - twinned
typography:
  partition: convention
  bondDegree: 34
  neighbors:
    - tamper/import
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - akashic
    - collapse
    - cost
    - dry
    - import
    - law
    - merge
  matrix:
    - akashic
    - collapse
    - convention
    - cost
    - dry
    - fronted
    - import
    - law
    - merge
    - named
    - twinned
  backlinks:
    - akashic
    - collapse
    - convention
    - cost
    - dry
    - fronted
    - import
    - law
    - merge
    - named
    - twinned
signatures:
  computationUuid: "fd75404e-15e4-85f9-bf3c-62f76923fd14"
  stages:
    - stage: path
      stageUuid: "25037c3e-b998-8eb2-bb18-657119de0d9d"
    - stage: trinity
      stageUuid: "2096cc46-d938-8b01-a153-d7d39357739c"
    - stage: boundary
      stageUuid: "ae95c0af-38a5-84db-9db9-ee4d30bef6c1"
    - stage: links
      stageUuid: "7c37a422-781a-8982-abb0-dffb02c7b74e"
    - stage: horo
      stageUuid: "03cc91c6-023c-8829-b980-f3defeb0051b"
    - stage: seal
      stageUuid: "9ee5e7d6-93b1-8a3d-a04c-39c22d2def65"
    - stage: uuid
      stageUuid: "870f912f-6b9f-8075-bf65-2af064bc5911"
version: 2
---
# convention/lawful — every SKILL.md states its **Law (the invariant)

The lawful convention, written as a self-measuring atom. An atom that does not name its law is unaccountable: its SKILL.md describes what it does without declaring the one rule that must hold, so there is nothing to gate and nothing the audit can verify. This is the meta-convention that closes that gap — every atom carries a `**Law` line, the single invariant from which the rest of the atom emerges ([[law]]).

It does not re-walk the filesystem — that would duplicate the corpus walker and double-count the `.claude → src` symlink (a raw `find -L` reports the tree twice). It **composes** the one canonical walk:

- **total** = `loadCorpus().length` from the [[akashic]] record — every routable atom, the deduped corpus (each real node enumerated once by realpath, the symlink collapsed).
- **lawful** = the bodies matching `/\*\*Law/` — the atoms that state their invariant.
- **coverage** = `lawful / total` — in [0,1] by construction (0 ≤ lawful ≤ total, total > 0). It reaches **1** exactly when every atom states its law.

Pure math, no default: the corpus is non-empty by architecture (a tree of SKILL.md by construction), and lawful is a subset count, so the ratio never needs a clamp or a fallback. The only thing that pulls coverage below 1 is a law-less SKILL.md — precisely what this convention forbids. coverage → 1 ⟺ every atom is accountable ⟺ the convention holds with zero entropy and infinitely-expanding tamper-[[cost]] ([[law]] · [[collapse]] · [[merge]]).

Entangled with — [[law]] · [[akashic]] · [[import]] · [[dry]]

Matter-twin: [[law]] — the one law every atom's invariant is an instance of.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every atom states its own invariant — a SKILL.md without a `**Law` line is unaccountable; the corpus is lawful iff coverage = lawful / total = 1, and any law-less atom is a gap driving tamper-cost below infinity.**
