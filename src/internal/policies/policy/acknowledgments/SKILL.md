---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: "internal/policies/policy/acknowledgments"
coordinate: "internal/policies/policy/acknowledgments · 1/base · 66e2d386"
contentUuid: "95505ef2-2e14-5a8e-b457-44adac13d7e5"
diamondUuid: "acaf1467-7a39-86bd-ae40-3c612afd2e12"
uuid: "66e2d386-3fee-8f0f-b39f-400e74786ba1"
horo: 1
typography:
  partition: internal
  bondDegree: 9
standards:
  - "SOX §404 control-attestation"
bindings: []
signatures:
  computationUuid: "7bc9fcbf-c003-8022-9580-97326e94b1bc"
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
      stageUuid: "3deeeaa9-3e1c-8c75-a871-56d8dd3987bd"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "dce0bd22-a037-8c48-afa6-68a62ccb3ff3"
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
