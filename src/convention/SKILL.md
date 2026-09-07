---
name: convention
description: "Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy)."
atomPath: convention
coordinate: "convention · 5/round · e3b528a1"
contentUuid: "90d401f1-2a50-576c-bc14-3681527a1405"
diamondUuid: "2838ba67-d600-8cd2-a452-15aeb4639f78"
uuid: "e3b528a1-dc99-8e1e-9346-39a236c8976e"
horo: 5
typography:
  partition: convention
  bondDegree: 87
standards:
  - "UBL-2.1"
  - "each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)"
bindings: []
signatures:
  computationUuid: "56232f39-6be9-8fe7-b9e9-84c75f0e253d"
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
      stageUuid: "3e5c42e3-0ab4-880e-93e9-2af48e9586fe"
    - stage: seal
      stageUuid: "94d8b8e7-8102-8814-a492-29667c6caaaa"
    - stage: uuid
      stageUuid: "b947e11b-5d27-88a4-b90b-9fbbdd7d531d"
version: 2
---
# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
