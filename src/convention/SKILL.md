---
name: convention
description: "Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy)."
atomPath: convention
coordinate: "convention · 7/descent · e21e67d2"
contentUuid: "2144ba05-2ccf-5f3d-8771-27fb5fda9a36"
diamondUuid: "ea15c9c7-f971-82b1-a382-07b6acc91497"
uuid: "e21e67d2-6a22-8dad-9ee2-36340ad31aec"
horo: 7
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
    - rules
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
    - rules
    - sealed
    - tamper
typography:
  partition: convention
  bondDegree: 45
  neighbors: []
standards:
  - "UBL-2.1"
  - "each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)"
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
    - rules
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
    - rules
    - sealed
    - tamper
signatures:
  computationUuid: "234c947d-3a24-85a1-b54f-66eaacacd092"
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
      stageUuid: "a504a548-dd05-80e1-a292-1dfac5c6cf75"
    - stage: seal
      stageUuid: "94d8b8e7-8102-8814-a492-29667c6caaaa"
    - stage: uuid
      stageUuid: "d0a8c92c-2b9e-8e51-9964-96ba6e354af6"
version: 2
---
# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
