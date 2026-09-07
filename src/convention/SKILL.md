---
name: convention
description: "Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy)."
atomPath: convention
coordinate: "convention · 1/base · 13b0ba44"
contentUuid: "bb61b93b-c153-58cb-8d7d-8d67e99d187a"
diamondUuid: "212e1aca-f42d-88b1-ad9d-2f6e9bf2a339"
uuid: "13b0ba44-ac81-8d14-881a-7930d7c401b0"
horo: 1
typography:
  partition: convention
  bondDegree: 87
standards:
  - "UBL-2.1"
  - "each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)"
bindings: []
signatures:
  computationUuid: "f6c4f009-f07a-8389-a595-a55c2045039e"
  stages:
    - stage: path
      stageUuid: "48c3e91b-9781-81dc-93c6-1ecf52313477"
    - stage: trinity
      stageUuid: "e75245f7-d4f3-8fd5-80db-6ffc92c2c2b6"
    - stage: boundary
      stageUuid: "0fad0f95-1a20-83dc-9652-ba4410d4186f"
    - stage: links
      stageUuid: "39d9560a-b0ce-84e0-a848-acb969ff494b"
    - stage: horo
      stageUuid: "d33d4303-1bf6-82a3-af92-b333b9773480"
    - stage: seal
      stageUuid: "94d8b8e7-8102-8814-a492-29667c6caaaa"
    - stage: uuid
      stageUuid: "16b81b39-9c1d-8bb0-a934-e22f848dea10"
version: 2
---
# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
