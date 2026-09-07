---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: "legal/entities/management/certifications"
coordinate: "legal/entities/management/certifications · 2/share · cf268048"
contentUuid: "6c08adc6-d96b-5300-a252-22283d6bff87"
diamondUuid: "7e5fb69b-cff0-8bb9-848a-61368b3e8333"
uuid: "cf268048-e3b1-837f-b5d0-4589fec63cc1"
horo: 2
typography:
  partition: legal
  bondDegree: 3
standards:
  - "SOX §302 corporate-responsibility"
  - "SOX §906 criminal-certification"
bindings: []
signatures:
  computationUuid: "55dd6354-613c-873c-a7b7-e792a6725403"
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
      stageUuid: "dbe92208-52bd-8172-bb4e-ae0b590cfbde"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "8f8bd69b-d22d-8341-b536-6633c4ccc179"
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
