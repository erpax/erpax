---
name: tests
description: "Use when designing or executing SOX §404 control-effectiveness tests — sampling methodology (statistical/stratified/judgmental/census), assertion, sample size, tolerance, deviation count/rate, conclusion on effectiveness; links to the tested internal-control. The control-tests ISO-19011 sampling-evidence collection."
atomPath: "internal/controls/control/tests"
coordinate: "internal/controls/control/tests · 8/crest · 478fc88a"
contentUuid: "98ef1aae-3a6d-5d97-9137-6cf7fcc3ad79"
diamondUuid: "9349a7bf-8972-8adc-a5fc-2fa854ba8961"
uuid: "478fc88a-497e-8f59-a4ae-f4d49dc2a2dd"
horo: 8
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
  computationUuid: "ba962b9e-aa14-89e1-9eb3-deb6a4495f41"
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
      stageUuid: "dba8816b-6c86-89cb-871c-71d50848b6f6"
    - stage: seal
      stageUuid: "d4145970-8513-8137-9240-78eda1d17250"
    - stage: uuid
      stageUuid: "85a4d0a9-5998-873a-ac2b-a16421d59dac"
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
