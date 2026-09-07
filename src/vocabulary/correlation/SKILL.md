---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: "vocabulary/correlation"
coordinate: "vocabulary/correlation · 1/base · 375c58b8"
contentUuid: "ccbffc0f-beb2-5ede-9525-b2a5fc55d2e3"
diamondUuid: "90cb608f-1026-8878-baac-86ab47c7a6eb"
uuid: "375c58b8-69c2-864b-ba9a-9d02c71635ca"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "a055e559-a92d-8c4e-9f5b-4b64df3b4ea9"
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
      stageUuid: "36973d2d-0294-8b10-a281-b29d40447b36"
    - stage: seal
      stageUuid: "1f64f92d-9c0b-8144-ab68-03cd8c5e7292"
    - stage: uuid
      stageUuid: "0d1d89db-5dbe-861e-b168-37b389b494bb"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
