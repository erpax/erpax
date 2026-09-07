---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 2/share · 1008c397"
contentUuid: "b074127b-ccc4-57bf-902e-02078e310e97"
diamondUuid: "a4716a70-3436-8091-a78d-aa4ef2b9482e"
uuid: "1008c397-8721-8def-a935-c9f7396df146"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "b1ca7db7-1a5a-889d-9739-549a94ffe601"
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
      stageUuid: "9faeb0a8-2bcd-850a-a775-3618d1a7974f"
    - stage: seal
      stageUuid: "1f64f92d-9c0b-8144-ab68-03cd8c5e7292"
    - stage: uuid
      stageUuid: "2c1039a2-3020-8d8c-b2d9-9b2ed85542fe"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
