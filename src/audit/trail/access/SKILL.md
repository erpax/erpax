---
name: access
description: "Use when gating reads, creates and mutations of the audit trail — authenticated users see only their own tenant's events, super-admins see all, and update/delete is denied outright so the trail stays append-only tamper-evident."
atomPath: "audit/trail/access"
coordinate: "audit/trail/access · 6/6 · 0084a12e"
contentUuid: "b17e159f-f2bf-5f11-a7a4-a400b2e3f632"
diamondUuid: "5993959a-b07e-86df-855b-c415a209f93e"
uuid: "0084a12e-5611-8625-86f4-548eb0ab9dfb"
horo: 6
typography:
  partition: audit
  bondDegree: 408
standards: []
bindings: []
signatures:
  computationUuid: "a09d2eee-d75c-8fd1-b3d7-9ea07268d391"
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
      stageUuid: "ddf301c8-6b74-8744-ad60-d2e646be5985"
    - stage: seal
      stageUuid: "d79da033-4c24-8277-9963-9da249441c08"
    - stage: uuid
      stageUuid: "cdfe806c-6a92-88e1-ae94-7c8d9e69acf1"
version: 2
---
# audit/trail/access — who may touch the [[audit]] trail

The access predicates for the [[audit]] trail collection. Read is tenant-scoped: an unauthenticated request gets `false`, a super-[[admin]] gets `true` (all tenants), everyone else gets a `Where` constraint pinned to their own tenant. Create is super-admin-only (rows are written by [[hooks]] in system context, not by users). Update and delete are NEVER allowed — `auditTrailModifyDenied` returns `false` unconditionally, so the trail is append-only evidence.

Matter-twin: `src/audit/trail/access/index.ts` (`auditTrailRead` · `auditTrailCreate` · `auditTrailModifyDenied`). Composes super-[[admin]] detection and the tenant from the request context.

**Law — [[law]]: the audit trail is append-only — read is tenant-scoped (super-admin sees all), create is super-admin-only, and update/delete is denied outright so evidence can never be forged.**
