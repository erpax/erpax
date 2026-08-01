---
name: tests
description: "Use when designing or executing SOX §404 control-effectiveness tests — sampling methodology (statistical/stratified/judgmental/census), assertion, sample size, tolerance, deviation count/rate, conclusion on effectiveness; links to the tested internal-control. The control-tests ISO-19011 sampling-evidence collection."
atomPath: "internal/controls/control/tests"
coordinate: "internal/controls/control/tests · 7/descent · d160b844"
contentUuid: "6c9269a8-5ffa-51ad-be9f-430ff8d6534d"
diamondUuid: "adaef354-7551-89db-9889-06ea018554a5"
uuid: "d160b844-62ed-838c-bbd7-e9eab4f50889"
horo: 7
typography:
  partition: internal
  bondDegree: 0
standards:
  - "ISA-530"
  - "ISO-19011:2018 audit-sampling"
  - "ISO-19011:2018 audit-sampling`"
  - "SOX §404 internal-controls testing-evidence"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b2161f28-fefe-803d-a743-f20223509146"
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
      stageUuid: "0fcfb8cb-3b16-8df5-a8db-9d5465463d83"
    - stage: seal
      stageUuid: "d4145970-8513-8137-9240-78eda1d17250"
    - stage: uuid
      stageUuid: "4d01cafd-6922-817c-9713-91698ada299a"
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
