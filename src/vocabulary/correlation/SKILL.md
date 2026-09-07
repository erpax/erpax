---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 8/crest · 4e96c426"
contentUuid: "432f85a6-5048-56d2-9b30-68cad15f86b7"
diamondUuid: "e0abf921-0d63-8d31-85ac-21d5da66c691"
uuid: "4e96c426-a830-8f3e-b05d-4b1229661b04"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "b9357d62-c7e3-8a20-8064-e10bbf419186"
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
      stageUuid: "096d4641-2d70-8fa6-942d-0bc23edd70b8"
    - stage: seal
      stageUuid: "1f64f92d-9c0b-8144-ab68-03cd8c5e7292"
    - stage: uuid
      stageUuid: "b4041dee-bffd-856a-988a-7962172d6dc7"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
