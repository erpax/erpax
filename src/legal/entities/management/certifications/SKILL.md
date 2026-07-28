---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: "legal/entities/management/certifications"
coordinate: "legal/entities/management/certifications · 7/descent · 2942fd51"
contentUuid: "ae0b026b-fdbf-570d-a3af-d26266ef0f33"
diamondUuid: "b1db3b78-6910-8729-b6de-877d5e53e2b0"
uuid: "2942fd51-57d5-82d5-8b1f-a9033b39b1c7"
horo: 7
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
  computationUuid: "5993c611-20b7-835f-9588-45f87096c3db"
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
      stageUuid: "f881e70b-036d-82b1-95d2-fd0f2389d6b3"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "bb996ff0-e438-8988-9bfc-6d00985061d6"
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
