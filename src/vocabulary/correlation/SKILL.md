---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 2/share · cb015e67"
contentUuid: "f88bdf6a-45ad-5939-aa22-933211d0d297"
diamondUuid: "942fc683-9487-873a-abc6-7dfc067603c1"
uuid: "cb015e67-6852-894c-9642-bfe829758745"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8a34729b-79a6-8989-8efd-6b4f98105e36"
  stages:
    - stage: path
      stageUuid: "f39d5832-6abe-881e-9aad-51dae0ca61f8"
    - stage: trinity
      stageUuid: "620a02a6-524a-87a1-9ede-74330409d9c7"
    - stage: boundary
      stageUuid: "0c596073-ee18-84cc-bb8c-39d193414855"
    - stage: links
      stageUuid: "e34bf967-ac1b-8185-8811-341af32bc205"
    - stage: horo
      stageUuid: "d3875cd7-cc0f-89b2-a19e-0c2f09d1773a"
    - stage: seal
      stageUuid: "1f64f92d-9c0b-8144-ab68-03cd8c5e7292"
    - stage: uuid
      stageUuid: "cc40bee3-7b94-8b63-b1ae-9beb932edacc"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
