---
name: acknowledgments
description: "Use when recording or tracking employee acknowledgement of a policy version — signed-document upload, acknowledged date, status pending/overdue/expired; SOX §404 control-attestation evidence per employee per policy. The policy-acknowledgments collection."
atomPath: "internal/policies/policy/acknowledgments"
coordinate: "internal/policies/policy/acknowledgments · 4/weave · ad795113"
contentUuid: "412f1982-247a-5acd-bed5-6bc934c82979"
diamondUuid: "4e492bfe-0b05-8c18-a820-eee9cda229e0"
uuid: "ad795113-0309-8d85-a819-caf76e37ea39"
horo: 4
typography:
  partition: internal
  bondDegree: 9
standards:
  - "SOX §404 control-attestation"
bindings: []
signatures:
  computationUuid: "a8459d50-1496-82b0-8569-bccd880927f2"
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
      stageUuid: "3e806540-3ccc-8345-ad9f-5c7088e2711f"
    - stage: seal
      stageUuid: "e2269f75-90ec-8ee7-b60b-e2d2f2f89796"
    - stage: uuid
      stageUuid: "3911ae4f-f838-87e7-8b10-3d7954db3bbe"
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
