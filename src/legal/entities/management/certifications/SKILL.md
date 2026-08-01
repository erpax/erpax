---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: "legal/entities/management/certifications"
coordinate: "legal/entities/management/certifications · 1/base · 6b659ccd"
contentUuid: "3693b3da-1833-5e08-9aa5-f9ba2c6f93e4"
diamondUuid: "1c142f7f-5317-85d8-b471-4f85d02f83e5"
uuid: "6b659ccd-68c7-8ea4-9746-3f6bff3ad7e1"
horo: 1
typography:
  partition: legal
  bondDegree: 3
standards:
  - "SOX §302 corporate-responsibility"
  - "SOX §906 criminal-certification"
bindings: []
signatures:
  computationUuid: "7fc2e43b-3241-8253-ba7d-e46c8e6581eb"
  stages:
    - stage: path
      stageUuid: "317d5bcc-b5a3-835f-929a-0fc64fbee4e8"
    - stage: trinity
      stageUuid: "4b424934-db8e-836f-88c3-236bcd47e7c1"
    - stage: boundary
      stageUuid: "0db20092-174c-8fb1-891f-d74f7b07b202"
    - stage: links
      stageUuid: "e8c0c553-2876-8af8-817d-8b42d1c683d7"
    - stage: horo
      stageUuid: "832a85fe-869b-8086-9b8a-dd0478822920"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "e92310a5-03bf-8ea8-8696-3db899da06b5"
version: 2
---
# management-certifications

ManagementCertifications.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §302 corporate-responsibility
- SOX §906 criminal-certification
- ISO-27001 A.5.23 cloud-service-tenant-isolation
