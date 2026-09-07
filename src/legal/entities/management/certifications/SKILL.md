---
name: certifications
description: "Use when recording or auditing officer certifications — SOX 302 / 906 corporate-responsibility and criminal certifications, internal-control and financial-statement sign-offs, with certifying officer, assertions, and certification level per SOX §302 / SOX §906. The management-certification sign-off collection."
atomPath: "legal/entities/management/certifications"
coordinate: "legal/entities/management/certifications · 4/weave · 18bf7554"
contentUuid: "2cc60283-c345-5199-8aa7-ba2daccefb99"
diamondUuid: "6deed7cf-e684-83b3-91da-2d2f8f3acff2"
uuid: "18bf7554-0b36-817e-b236-ff7110a5aa2b"
horo: 4
typography:
  partition: legal
  bondDegree: 3
standards:
  - "SOX §302 corporate-responsibility"
  - "SOX §906 criminal-certification"
bindings: []
signatures:
  computationUuid: "b63432a3-de9a-8b0c-9c5e-efacdcac1d37"
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
      stageUuid: "125047b1-1cbd-8d3e-a6ad-f18d017a1cf4"
    - stage: seal
      stageUuid: "2c864055-8186-81dc-b40b-ab28ec5b536d"
    - stage: uuid
      stageUuid: "ed27190e-b7d5-8df4-973a-817e45eae9da"
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
