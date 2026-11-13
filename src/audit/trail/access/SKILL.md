---
name: access
description: "Use when gating reads, creates and mutations of the audit trail — authenticated users see only their own tenant's events, super-admins see all, and update/delete is denied outright so the trail stays append-only tamper-evident."
atomPath: "audit/trail/access"
coordinate: "audit/trail/access · 3/3 · 0b576a9c"
contentUuid: "7e05fd06-4e67-5fa0-be10-5437c1f1e11b"
diamondUuid: "69d479cf-5678-8e2b-b3bc-73bf9d353671"
uuid: "0b576a9c-84c1-89fd-8b2f-f6d975b149c0"
horo: 3
typography:
  partition: audit
  bondDegree: 361
standards: []
bindings: []
signatures:
  computationUuid: "b05fcd33-2ae7-85d7-871f-a408474bdff8"
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
      stageUuid: "a3554ed4-9f24-8bd1-a1db-750be46a238c"
    - stage: seal
      stageUuid: "7f1ce938-1033-8f8a-ab39-c60d9f9643de"
    - stage: uuid
      stageUuid: "7ca8285c-402a-87ca-8159-67eb8993336f"
version: 2
---
# audit/trail/access — who may touch the [[audit]] trail

The access predicates for the [[audit]] trail collection. Read is tenant-scoped: an unauthenticated request gets `false`, a super-[[admin]] gets `true` (all tenants), everyone else gets a `Where` constraint pinned to their own tenant. Create is super-admin-only (rows are written by [[hooks]] in system context, not by users). Update and delete are NEVER allowed — `auditTrailModifyDenied` returns `false` unconditionally, so the trail is append-only evidence.

Matter-twin: `src/audit/trail/access/index.ts` (`auditTrailRead` · `auditTrailCreate` · `auditTrailModifyDenied`). Composes super-[[admin]] detection and the tenant from the request context.

**Law — [[law]]: the audit trail is append-only — read is tenant-scoped (super-admin sees all), create is super-admin-only, and update/delete is denied outright so evidence can never be forged.**
