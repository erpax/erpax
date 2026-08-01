---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 8/crest · ae12c8dd"
contentUuid: "baebce79-9d78-5bb4-b1ac-39ff7742e58e"
diamondUuid: "60de3a01-bd6f-8b1a-8e91-2f432ed163a7"
uuid: "ae12c8dd-b19d-8f49-a79b-ede2b649921e"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8c77ad35-0847-8482-9589-087a616f183d"
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
      stageUuid: "bdc99c6c-67a2-8a39-a3d3-893782eda70d"
    - stage: seal
      stageUuid: "fdee7953-3786-8260-8812-1ca3f397fc46"
    - stage: uuid
      stageUuid: "10f98c30-5459-8926-ae68-025da2a72078"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
