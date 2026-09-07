---
name: access
description: "Use when gating reads, creates and mutations of the audit trail — authenticated users see only their own tenant's events, super-admins see all, and update/delete is denied outright so the trail stays append-only tamper-evident."
atomPath: "audit/trail/access"
coordinate: "audit/trail/access · 9/unity · a7beb73a"
contentUuid: "4fca9e76-4ef3-5704-861b-b1ea246f5623"
diamondUuid: "f7da14d9-6698-89c8-9f4b-9d89e28ac7e0"
uuid: "a7beb73a-b8f4-8388-b33b-4065643ae102"
horo: 9
typography:
  partition: audit
  bondDegree: 436
standards: []
bindings: []
signatures:
  computationUuid: "8f429130-bb51-83f1-bfa5-e945efb7b924"
  stages:
    - stage: path
      stageUuid: "ea69bffd-2f68-8074-8e10-720ffa07d9e6"
    - stage: trinity
      stageUuid: "c964e9da-428e-8440-be49-b174236d6715"
    - stage: boundary
      stageUuid: "524ccead-365c-8ae6-849a-5ff8c94b145a"
    - stage: links
      stageUuid: "4e61fa24-30fe-893d-bc11-85bbd43aa8bf"
    - stage: horo
      stageUuid: "765a18fa-b7a1-8bb1-a3d4-8f69ef58c208"
    - stage: seal
      stageUuid: "7f1ce938-1033-8f8a-ab39-c60d9f9643de"
    - stage: uuid
      stageUuid: "8dd7e31b-d4e9-8be7-bf4c-faa5c14e93c6"
version: 2
---
# audit/trail/access — who may touch the [[audit]] trail

The access predicates for the [[audit]] trail collection. Read is tenant-scoped: an unauthenticated request gets `false`, a super-[[admin]] gets `true` (all tenants), everyone else gets a `Where` constraint pinned to their own tenant. Create is super-admin-only (rows are written by [[hooks]] in system context, not by users). Update and delete are NEVER allowed — `auditTrailModifyDenied` returns `false` unconditionally, so the trail is append-only evidence.

Matter-twin: `src/audit/trail/access/index.ts` (`auditTrailRead` · `auditTrailCreate` · `auditTrailModifyDenied`). Composes super-[[admin]] detection and the tenant from the request context.

**Law — [[law]]: the audit trail is append-only — read is tenant-scoped (super-admin sees all), create is super-admin-only, and update/delete is denied outright so evidence can never be forged.**
