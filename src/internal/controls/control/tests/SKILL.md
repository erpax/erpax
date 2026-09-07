---
name: tests
description: "Use when designing or executing SOX §404 control-effectiveness tests — sampling methodology (statistical/stratified/judgmental/census), assertion, sample size, tolerance, deviation count/rate, conclusion on effectiveness; links to the tested internal-control. The control-tests ISO-19011 sampling-evidence collection."
atomPath: "internal/controls/control/tests"
coordinate: "internal/controls/control/tests · 7/descent · 98f38572"
contentUuid: "aa91b2e8-e31f-5590-bb96-9c3b8a31c864"
diamondUuid: "6f357a45-05fe-8bc9-9b02-0f4331c6bf08"
uuid: "98f38572-e4b2-8c03-bc32-c292c99ce28e"
horo: 7
typography:
  partition: internal
  bondDegree: 10
standards:
  - "ISA-530"
  - "ISO-19011:2018 audit-sampling"
  - "ISO-19011:2018 audit-sampling`"
  - "SOX §404 internal-controls testing-evidence"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a404b7fd-368b-85ed-a25e-673fb6adf1dc"
  stages:
    - stage: path
      stageUuid: "f27657c4-a5b7-8723-9061-dc88d72add76"
    - stage: trinity
      stageUuid: "d43bcad6-3dc4-8a5a-8e53-df5fc2ff5f8f"
    - stage: boundary
      stageUuid: "32357db7-7fa5-8720-b5d0-ea39228bbf32"
    - stage: links
      stageUuid: "f3b4c5c8-5c38-8c89-8779-ca53fd9ce811"
    - stage: horo
      stageUuid: "45dcd89b-4e09-836a-9236-dd5848cf4888"
    - stage: seal
      stageUuid: "d4145970-8513-8137-9240-78eda1d17250"
    - stage: uuid
      stageUuid: "5a907ff7-8859-8630-824d-4b572e9ad837"
version: 2
---
# control-tests

Control Tests — SOX §404 testing evidence (sampling, assertion, results).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 audit-sampling`

- ISO-19011:2018 audit-sampling
- SOX §404 internal-controls testing-evidence
- ISO-19011:2018 audit-trail

**Law — [[law]]: a control test records its sampling method, assertion, sample size, tolerance and deviation count/rate, and concludes on the tested control's effectiveness — the evidence linking a SOX §404 control to its verdict.**
