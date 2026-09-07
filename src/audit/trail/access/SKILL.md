---
name: access
description: "Use when gating reads, creates and mutations of the audit trail — authenticated users see only their own tenant's events, super-admins see all, and update/delete is denied outright so the trail stays append-only tamper-evident."
atomPath: "audit/trail/access"
coordinate: "audit/trail/access · 6/6 · e8cd256c"
contentUuid: "af144735-3fdf-5ba4-8264-c555b180cb7f"
diamondUuid: "f5e529ef-3cc6-80dd-9168-9f70dd304bf8"
uuid: "e8cd256c-4a35-827e-b6ac-6b80a893ef23"
horo: 6
typography:
  partition: audit
  bondDegree: 416
standards: []
bindings: []
signatures:
  computationUuid: "1f295e4f-8b22-889b-b160-8858b242d311"
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
      stageUuid: "18586748-9fc9-8f5c-984f-9cd501cbbad9"
    - stage: seal
      stageUuid: "7f1ce938-1033-8f8a-ab39-c60d9f9643de"
    - stage: uuid
      stageUuid: "a7d5e9e4-9b00-82a4-8ffe-651ba60205f9"
version: 2
---
# audit/trail/access — who may touch the [[audit]] trail

The access predicates for the [[audit]] trail collection. Read is tenant-scoped: an unauthenticated request gets `false`, a super-[[admin]] gets `true` (all tenants), everyone else gets a `Where` constraint pinned to their own tenant. Create is super-admin-only (rows are written by [[hooks]] in system context, not by users). Update and delete are NEVER allowed — `auditTrailModifyDenied` returns `false` unconditionally, so the trail is append-only evidence.

Matter-twin: `src/audit/trail/access/index.ts` (`auditTrailRead` · `auditTrailCreate` · `auditTrailModifyDenied`). Composes super-[[admin]] detection and the tenant from the request context.

**Law — [[law]]: the audit trail is append-only — read is tenant-scoped (super-admin sees all), create is super-admin-only, and update/delete is denied outright so evidence can never be forged.**
