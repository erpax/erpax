---
name: convention
description: "Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy)."
atomPath: convention
coordinate: "convention · 7/descent · df686cdd"
contentUuid: "c5157aaa-d826-5f28-9448-7fe3d57ca847"
diamondUuid: "2e67dab1-265b-888d-88a9-7c311b370e42"
uuid: "df686cdd-8f86-8254-bbc8-28f43464c57b"
horo: 7
typography:
  partition: convention
  bondDegree: 87
standards:
  - "UBL-2.1"
  - "each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)"
bindings: []
signatures:
  computationUuid: "8bbb5f7b-49a1-8c43-a86e-35d2fb3671ca"
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
      stageUuid: "ab449a78-8585-8d72-8181-fb27ed2a7947"
    - stage: seal
      stageUuid: "94d8b8e7-8102-8814-a492-29667c6caaaa"
    - stage: uuid
      stageUuid: "e604874c-b8bd-8b12-b6d3-9443b0654752"
version: 2
---
# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
