---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 7/descent · fc1d25eb"
contentUuid: "c0aa6969-d338-544b-9894-c9130843ead9"
diamondUuid: "0a6a9610-47e1-8892-8a6b-cf698903d105"
uuid: "fc1d25eb-12c5-8cc7-a0d6-26534b9537c7"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8f42565e-3986-80ba-9287-0355448c667d"
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
      stageUuid: "e6cafba1-aff1-8429-a0c0-b601720a20bc"
    - stage: seal
      stageUuid: "1f64f92d-9c0b-8144-ab68-03cd8c5e7292"
    - stage: uuid
      stageUuid: "479eb075-b71e-8ac9-b664-9100b2edea82"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
