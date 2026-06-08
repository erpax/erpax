---
name: tests
description: "Use when designing or executing SOX §404 control-effectiveness tests — sampling methodology (statistical/stratified/judgmental/census), assertion, sample size, tolerance, deviation count/rate, conclusion on effectiveness; links to the tested internal-control. The control-tests ISO-19011 sampling-evidence collection."
atomPath: internal/controls/control/tests
coordinate: internal/controls/control/tests · 7/descent · f77d73e2
contentUuid: "5720cb1a-17e1-5684-bdaa-deb6b1a83211"
diamondUuid: "ef70c7a6-db17-8147-a46a-e9fedce7103a"
uuid: "f77d73e2-0f81-8b07-a674-237d8e71dca6"
horo: 7
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
  - "ISO-19011"
  - "ISO-19011:2018 audit-sampling"
  - "ISO-19011:2018 audit-trail"
  - "SOX §404 internal-controls testing-evidence"
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
  computationUuid: "f196320f-a6a8-8ad6-aa79-d361b7d6dc38"
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
      stageUuid: "d47c3564-a6c5-81e9-8203-152427b5fb4a"
    - stage: seal
      stageUuid: "d4145970-8513-8137-9240-78eda1d17250"
    - stage: uuid
      stageUuid: "e70adc96-275d-86e1-ad7f-c93d0fec74c4"
version: 2
---
# control-tests

Control Tests — SOX §404 testing evidence (sampling, assertion, results).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-19011:2018 audit-sampling
- SOX §404 internal-controls testing-evidence
- ISO-19011:2018 audit-trail

**Law — [[law]]: a control test records its sampling method, assertion, sample size, tolerance and deviation count/rate, and concludes on the tested control's effectiveness — the evidence linking a SOX §404 control to its verdict.**
