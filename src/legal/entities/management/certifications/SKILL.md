---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: legal/entities/management/certifications
coordinate: legal/entities/management/certifications · 8/crest · b7b5fe37
contentUuid: "6d3878ce-a858-5772-8216-bf29679143e1"
diamondUuid: "6121f672-200a-8231-8a2f-e520d765d31c"
uuid: "b7b5fe37-18c7-85ae-8932-7e66d3dda83b"
horo: 8
bonds:
  in:
    - entities
  out:
    - entities
typography:
  partition: legal
  bondDegree: 3
  neighbors: []
standards:
  - "SOX §302 corporate-responsibility"
  - "SOX §906 criminal-certification"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - entities
  backlinks:
    - entities
signatures:
  computationUuid: "d95c338c-ffdf-8c17-a92b-0b4dc0346fbe"
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
      stageUuid: "db2d0932-6ced-80ef-873d-2c1856ab8b7f"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "84ef202f-006f-848c-83bb-4192e953da21"
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
