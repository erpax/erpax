---
name: access
description: "Use when gating reads, creates and mutations of the audit trail — authenticated users see only their own tenant's events, super-admins see all, and update/delete is denied outright so the trail stays append-only tamper-evident."
atomPath: "audit/trail/access"
coordinate: "audit/trail/access · 3/3 · 63ffc13b"
contentUuid: "7bade2b7-ce2a-5f6d-bd39-9f5ca33e081c"
diamondUuid: "8b9c6302-c3de-8152-817f-1401ca65957d"
uuid: "63ffc13b-c7b0-8b3e-b3e5-986d113b2c99"
horo: 3
typography:
  partition: audit
  bondDegree: 436
standards: []
bindings: []
signatures:
  computationUuid: "5ba65ba5-78d8-8d18-bdd1-2b84b13d989a"
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
      stageUuid: "76328362-d52e-8bda-a0b9-c963bc7a43b7"
    - stage: seal
      stageUuid: "7f1ce938-1033-8f8a-ab39-c60d9f9643de"
    - stage: uuid
      stageUuid: "c4497d6c-8e88-8fb1-862f-f2b3c77eb75a"
version: 2
---
# audit/trail/access — who may touch the [[audit]] trail

The access predicates for the [[audit]] trail collection. Read is tenant-scoped: an unauthenticated request gets `false`, a super-[[admin]] gets `true` (all tenants), everyone else gets a `Where` constraint pinned to their own tenant. Create is super-admin-only (rows are written by [[hooks]] in system context, not by users). Update and delete are NEVER allowed — `auditTrailModifyDenied` returns `false` unconditionally, so the trail is append-only evidence.

Matter-twin: `src/audit/trail/access/index.ts` (`auditTrailRead` · `auditTrailCreate` · `auditTrailModifyDenied`). Composes super-[[admin]] detection and the tenant from the request context.

**Law — [[law]]: the audit trail is append-only — read is tenant-scoped (super-admin sees all), create is super-admin-only, and update/delete is denied outright so evidence can never be forged.**
