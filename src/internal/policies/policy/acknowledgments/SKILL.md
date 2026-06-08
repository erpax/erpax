---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: internal/policies/policy/acknowledgments
coordinate: internal/policies/policy/acknowledgments · 8/crest · ca21edde
contentUuid: "7453f7d1-6a1d-5e47-96ce-8ae230a9e329"
diamondUuid: "a3eb3264-0f95-823b-9e77-d3747c61a524"
uuid: "ca21edde-2ec1-841a-b32c-be4c89f3119c"
horo: 8
bonds:
  in:
    - acknowledgment
    - law
    - policies
    - policy
  out:
    - acknowledgment
    - law
    - policies
typography:
  partition: internal
  bondDegree: 9
  neighbors: []
standards:
  - "SOX §404 control-attestation"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - acknowledgment
    - law
    - policies
  backlinks:
    - acknowledgment
    - law
    - policies
signatures:
  computationUuid: "db9f29ed-a0bf-84e2-8aa6-efe916c9754a"
  stages:
    - stage: path
      stageUuid: "d0e34220-6c13-86ce-a255-6f752d7ce4a9"
    - stage: trinity
      stageUuid: "4c182cd1-536a-8968-ae99-b1b51da4b4d3"
    - stage: boundary
      stageUuid: "30da9945-30ba-804a-a361-9277c7bda42a"
    - stage: links
      stageUuid: "c3c7eea8-09ec-85e2-9ca1-7102476ac742"
    - stage: horo
      stageUuid: "a10519ba-1017-85bb-b55c-2c75c46d800a"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "52741590-a989-8472-8c6b-6e63a102a0ba"
version: 2
---
# policy-acknowledgments

PolicyAcknowledgments.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-27001 A.5.1 policy-acknowledgement
- SOX §404 control-attestation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a policy acknowledgment is the per-employee-per-policy-version attestation — signed-document upload, acknowledged date and status (pending/overdue/expired) — the SOX §404 evidence that a specific person accepted a specific policy version.**
