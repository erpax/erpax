---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: "internal/policies/policy/acknowledgments"
coordinate: "internal/policies/policy/acknowledgments · 7/descent · 7db1ba9c"
contentUuid: "f976a00b-aeb5-5ed5-a333-cd0fd8af88dc"
diamondUuid: "0677552a-5259-8654-95e3-68ce50253e7a"
uuid: "7db1ba9c-fe3e-8e89-8a4d-2ba9a4f6eef6"
horo: 7
typography:
  partition: internal
  bondDegree: 9
standards:
  - "SOX §404 control-attestation"
bindings: []
signatures:
  computationUuid: "e122021d-00d4-8f8f-bc5d-7ae0cd918e0d"
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
      stageUuid: "51e50fd0-1694-850b-9c41-0a131f5663cb"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "25fe0fd0-5972-85b3-8215-349598c2b2b3"
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
