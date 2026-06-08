---
name: convention
description: "Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy)."
atomPath: convention
coordinate: convention · 8/crest · a0a94343
contentUuid: "a68d2fc1-0b41-5138-8d74-7288cd49b919"
diamondUuid: "4e4d1575-7df3-80a8-a58d-ef6e27d86f21"
uuid: "a0a94343-8762-84ac-8669-4221b6ac06e1"
horo: 8
bonds:
  in:
    - boundary
    - collider
    - dry
    - export
    - folder
    - guardian
    - import
    - law
    - lawful
    - link
    - named
    - purity
    - sealed
    - tamper
  out:
    - boundary
    - collider
    - dry
    - export
    - folder
    - guardian
    - import
    - law
    - lawful
    - link
    - named
    - purity
    - sealed
    - tamper
typography:
  partition: convention
  bondDegree: 42
  neighbors: []
standards:
  - "RFC-9562"
  - "UBL-2.1"
  - "conventionChecks runs every convention's live coverage; the registry only collects, no logic"
  - "each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)"
  - "each coverage is a live computation in its atom; this file only collects them, no logic"
bindings: []
neighbors:
  wikilink:
    - collider
    - dry
    - law
    - lawful
    - link
    - named
    - sealed
    - tamper
  matrix:
    - boundary
    - collider
    - dry
    - export
    - folder
    - guardian
    - import
    - law
    - lawful
    - link
    - named
    - purity
    - sealed
    - tamper
  backlinks:
    - boundary
    - collider
    - dry
    - export
    - folder
    - guardian
    - import
    - law
    - lawful
    - link
    - named
    - purity
    - sealed
    - tamper
signatures:
  computationUuid: "98801b44-ad46-8942-b094-14151bb45d49"
  stages:
    - stage: path
      stageUuid: "48c3e91b-9781-81dc-93c6-1ecf52313477"
    - stage: trinity
      stageUuid: "e75245f7-d4f3-8fd5-80db-6ffc92c2c2b6"
    - stage: boundary
      stageUuid: "c030a042-14a1-8e83-81db-db03f3ffdeab"
    - stage: links
      stageUuid: "39d9560a-b0ce-84e0-a848-acb969ff494b"
    - stage: horo
      stageUuid: "99571804-a10a-86ba-91eb-a1208aa445a3"
    - stage: seal
      stageUuid: "90e91365-d5a7-8b1f-8183-5bee0079b969"
    - stage: uuid
      stageUuid: "cd00fe91-2c71-8fb0-bb90-cd4f2ce71c34"
version: 2
---
# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
