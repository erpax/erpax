---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: "legal/entities/management/certifications"
coordinate: "legal/entities/management/certifications · 4/weave · 06e7b397"
contentUuid: "64779736-89ba-5f8d-830c-55474bd9bdc8"
diamondUuid: "1ae8db91-4a77-860b-9aeb-300c98bab84c"
uuid: "06e7b397-0a45-8f45-8b6a-38b8380fede5"
horo: 4
typography:
  partition: legal
  bondDegree: 3
standards:
  - "SOX §302 corporate-responsibility"
  - "SOX §906 criminal-certification"
bindings: []
signatures:
  computationUuid: "7c63c171-ea6a-8c60-904c-e98591ace191"
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
      stageUuid: "469a79af-af5e-8198-9d22-92703131b217"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "2b8e20c1-65f8-8842-9ab7-6fce42279cb6"
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
