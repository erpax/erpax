---
name: twinned
description: "Use when checking whether every antimatter names its matter — the computed convention that each SKILL.md's `Matter-twin:` line points to a real index.ts, measured live as coverage = pointing / total over the real tree."
atomPath: convention/twinned
coordinate: convention/twinned · 1/base · 419ddc50
contentUuid: "a7e6169a-c620-5442-bcd6-d61ff16c6000"
diamondUuid: "ced7f65b-6518-8546-a734-4f2423750fbf"
uuid: "419ddc50-3694-82ee-8841-988712107d67"
horo: 1
bonds:
  in:
    - aura
    - complete
    - convention
    - cost
    - gravity
    - law
    - lawful
    - matter
    - merge
  out:
    - aura
    - complete
    - cost
    - gravity
    - law
    - lawful
    - matter
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
    - complete
    - cost
    - gravity
    - law
    - lawful
    - matter
    - merge
  matrix:
    - aura
    - complete
    - cost
    - gravity
    - law
    - lawful
    - matter
    - merge
  backlinks:
    - aura
    - complete
    - cost
    - gravity
    - law
    - lawful
    - matter
    - merge
signatures:
  computationUuid: "97939913-af5a-873f-8cc1-8b8dd8e4d115"
  stages:
    - stage: path
      stageUuid: "5f9494c6-b4f4-8bbd-8670-fc68043ab08c"
    - stage: trinity
      stageUuid: "5334b35b-d1ce-8209-8495-b26711b60110"
    - stage: boundary
      stageUuid: "b861deeb-361b-84ef-b18c-346c021b91a2"
    - stage: links
      stageUuid: "d08a2286-4d63-803c-8016-b2b09f66a04c"
    - stage: horo
      stageUuid: "2fc49f7d-1309-800e-bd5a-24eeb048d9d9"
    - stage: seal
      stageUuid: "8a2099ad-66a2-898c-a8cc-f773b830003e"
    - stage: uuid
      stageUuid: "772f5c1d-694b-8d6a-9383-52d8ebd57f6f"
version: 2
---
# convention/twinned — every `Matter-twin:` line points to a real index.ts

The twinned convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-walk the tree or re-resolve links, it **composes** the canonical resolvers:

- **total** = the SKILL.md atoms whose body carries a `Matter-twin:` line, via `walkSkills('src')` from [[aura]] — the one canonical corpus walk every gate shares (never a parallel walk).
- **pointing** = those whose pointer resolves to a real `index.ts`. The pointer resolves three ways, in priority, each reusing the corpus's own address law: (1) an explicit backticked code path (`` `src/x/index.ts` ``) that exists and ends in `index.ts`; (2) a wiki-link whose route — via the canonical `wikiMap` (`@/corpus`) — carries an `index.ts`; (3) the sibling `index.ts` co-located with the SKILL.md (the canonical matter-twin).
- **coverage** = `pointing / total` — in [0,1] by construction (0 ≤ pointing ≤ total, total > 0). It reaches **1** exactly when every antimatter (SKILL.md) names a matter (index.ts) that actually exists on disk.

Pure math, no default: the corpus carries many `Matter-twin:` lines by architecture, so `total > 0`, and `pointing` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — `coverage()` filters one walk, so numerator and denominator can never disagree. The only thing that pulls coverage below 1 is a `Matter-twin:` line whose pointer is **stale** or a **glob placeholder** (a path that names a child folder or `<organ>/index.ts` template rather than one resolvable file) — precisely the entropy this convention forbids. coverage → 1 ⟺ every doc reaches its matter ⟺ zero matter-gap ⟺ infinitely-expanding tamper-[[cost]] ([[merge]] · [[gravity]]).

Entangled with — [[aura]] · [[matter]] · [[complete]] · [[lawful]]

Matter-twin: [[matter]] — the matter↔antimatter pairing this convention enforces on disk (a SKILL.md's `Matter-twin:` line must resolve to a real `index.ts`; the sibling `index.ts` is the canonical fallback resolution).

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: a SKILL.md's `Matter-twin:` line must point to a real index.ts; the corpus is twinned iff coverage = pointing / total = 1, and any stale or placeholder pointer is the only gap driving tamper-cost below infinity.**
