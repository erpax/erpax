---
name: correlation
description: "Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection."
atomPath: correlation
coordinate: correlation · 5/round · 0b4cf3c6
contentUuid: "b9304071-aa77-56b9-87e3-3cee0595b9ee"
diamondUuid: "a8491f9c-71e6-892a-8339-d9804c4152c2"
uuid: "0b4cf3c6-ad37-8b4c-998a-7c2b85bd05c1"
horo: 5
bonds:
  in:
    - calculate
    - law
  out:
    - calculate
    - law
typography:
  partition: correlation
  bondDegree: 6
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculate
    - law
  matrix:
    - calculate
    - law
  backlinks:
    - calculate
    - law
signatures:
  computationUuid: "521f8f91-84bd-8b68-b49d-068a0edefe58"
  stages:
    - stage: path
      stageUuid: "049ffc90-5ac2-8f33-84f7-7d2e6bc07344"
    - stage: trinity
      stageUuid: "7347977f-2770-80d5-92c4-d19631830066"
    - stage: boundary
      stageUuid: "189e3846-1bf2-810d-94f5-5676584743f8"
    - stage: links
      stageUuid: "ef42c509-9e2c-8fea-932a-cfd1f08ed2ba"
    - stage: horo
      stageUuid: "9c448526-4c30-889c-af83-f9719a95adfb"
    - stage: seal
      stageUuid: "385359b6-851b-8f22-b744-1996c709d711"
    - stage: uuid
      stageUuid: "f556d29d-d441-8e3d-a523-75a7b1039021"
version: 2
---
# correlation

Use when analyzing variable relationships — Pearson/Spearman correlation, multicollinearity detection, correlation matrices, spurious vs causal correlation, correlation thresholds in feature selection.

Composes: [[calculate]].

## Standards
- Statistics (ISO 3534-1)
- Feature correlation in ML

**Law — [[law]]: correlation measures a variable relationship, never asserts cause — spurious correlation and multicollinearity are detected, not trusted; it composes [[calculate]].**
