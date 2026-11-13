---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: "internal/policies/policy/acknowledgments"
coordinate: "internal/policies/policy/acknowledgments · 4/weave · d7f94f91"
contentUuid: "a1d82f38-eecc-5915-9aac-ea8974d95b7b"
diamondUuid: "4864118b-5ee5-8def-9e91-d9d0ccdfa188"
uuid: "d7f94f91-4bba-81c4-a921-181abdf099de"
horo: 4
typography:
  partition: internal
  bondDegree: 6
standards:
  - "SOX §404 control-attestation"
bindings: []
signatures:
  computationUuid: "76b6de13-ff83-8fc8-885a-69119ac25b09"
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
      stageUuid: "14226163-5472-8bc2-82ea-a38313bea8e5"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "fbbd4340-2371-8abe-a8c7-6a00b082673a"
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
