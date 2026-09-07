---
name: lawful
description: "Use when checking whether every atom is accountable — the computed convention that each SKILL.md states its own **Law (the invariant), measured live as coverage = lawful / total over the real corpus tree."
atomPath: "convention/lawful"
coordinate: "convention/lawful · 7/descent · de621f3d"
contentUuid: "d02b2181-9307-54b4-95c9-231c6fbafb10"
diamondUuid: "d4b9afb4-55da-84d7-85f7-d61b543b88f5"
uuid: "de621f3d-58f7-8604-a0b5-4d2641133acf"
horo: 7
typography:
  partition: convention
  bondDegree: 34
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "81a9b1ae-2f94-8e5f-8d7e-14bf04f1f8ea"
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
      stageUuid: "39f2cd05-d248-8c06-b34f-dbd028dcb8d0"
    - stage: seal
      stageUuid: "0c265969-1b21-8725-a20b-7a4867437662"
    - stage: uuid
      stageUuid: "95f6f745-8dcb-813c-9ef2-480784bee326"
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
