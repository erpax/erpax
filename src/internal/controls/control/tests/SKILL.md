---
name: tests
description: "Use when designing or executing SOX §404 control-effectiveness tests — sampling methodology (statistical/stratified/judgmental/census), assertion, sample size, tolerance, deviation count/rate, conclusion on effectiveness; links to the tested internal-control. The control-tests ISO-19011 sampling-evidence collection."
atomPath: "internal/controls/control/tests"
coordinate: "internal/controls/control/tests · 1/base · a67ea8ff"
contentUuid: "67cc19d9-396f-5fe6-b10a-3bded52bb6a2"
diamondUuid: "7f81a2b9-5ed6-8ffd-8c9a-534afc27afb1"
uuid: "a67ea8ff-57cf-8168-94d8-33c0d2edfaee"
horo: 1
bonds:
  in:
    - control
    - controls
    - law
    - proof
  out:
    - controls
    - law
    - proof
typography:
  partition: internal
  bondDegree: 0
  neighbors: []
standards:
  - "ISA-530"
  - "ISO-19011:2018 audit-sampling"
  - "ISO-19011:2018 audit-sampling`"
  - "SOX §404 internal-controls testing-evidence"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - controls
    - law
    - proof
  backlinks:
    - controls
    - law
    - proof
signatures:
  computationUuid: "0c4cb305-9a22-88d5-a762-ed5ff15f8504"
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
      stageUuid: "35840702-f030-8d04-a4ca-1a1314381a18"
    - stage: seal
      stageUuid: "d4145970-8513-8137-9240-78eda1d17250"
    - stage: uuid
      stageUuid: "8370c2f9-1b8b-8b18-bd1e-354093e16d04"
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
