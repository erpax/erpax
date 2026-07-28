---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: "internal/policies/policy/acknowledgments"
coordinate: "internal/policies/policy/acknowledgments · 8/crest · f06a89cf"
contentUuid: "310d74f9-7d34-558e-8705-3e2f891919e0"
diamondUuid: "e45cecd4-c9f9-86ea-9965-fb312fd98ac2"
uuid: "f06a89cf-3e30-8ce0-a0bd-f4ee2e333b1e"
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
  computationUuid: "ad3d64b7-d299-87ce-b9c9-eaf3c8263315"
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
      stageUuid: "8581dec2-a316-8a54-83ab-90f52f41b008"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "01349078-1216-8d40-bd59-7d4b4e03dffc"
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
