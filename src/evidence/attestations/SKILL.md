---
name: attestations
description: "Use when assembling SOX §404 audit-pack evidence — indexing PDF/A-2b + PDF/UA-1 attestation cover sheets per completed e2e walk-through, with optional eIDAS PAdES qualified signature (CMS blob, certificate chain, SHA-256 digest). The durable evidence-attestation index."
atomPath: "evidence/attestations"
coordinate: "evidence/attestations · 2/share · 5edcee98"
contentUuid: "1f558088-f63c-5d42-937f-ef40e6452e91"
diamondUuid: "0d80a03d-3428-8159-8203-395a973d2212"
uuid: "5edcee98-2a44-87dc-b66b-bbc8dd520847"
horo: 2
typography:
  partition: evidence
  bondDegree: 30
standards:
  - "ETSI-EN-319-142"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields`"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile`"
  - "EU 910/2014 eidas Art.28 qualified-electronic-signature"
  - "EU 910/2014 eidas qualified-electronic-signature"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-14289-1"
  - "ISO-14289-1:2014 pdf-ua-1"
  - "ISO-14289-1:2014 pdf-ua-1`"
  - "ISO-19005"
  - "ISO-19005-2:2011 pdf-a-2"
  - "ISO-19005-2:2011 pdf-a-2`"
  - "ISO-19011:2018 audit-trail visual-evidence"
  - "ISO-19011:2018 audit-trail visual-evidence`"
  - "NIST FIPS-180-4 sha-256 message-digest"
  - "NIST FIPS-180-4 sha-256 message-digest`"
  - "NIST-FIPS-180-4"
  - "RFC-5652"
  - "SOX §404 internal-controls process-walk-through"
  - "rfc-5652 cms-detached-signature"
  - "rfc-5652 cms-detached-signature`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "86719b37-a0f4-854d-8974-1be0129b9555"
  stages:
    - stage: path
      stageUuid: "43386994-5954-8894-b558-2260f4ccd0bf"
    - stage: trinity
      stageUuid: "7bcb23b5-591d-831f-a0a5-17ea5e35c935"
    - stage: boundary
      stageUuid: "311ed648-efe9-8baa-9572-1c8ea8907ea9"
    - stage: links
      stageUuid: "872f4dc9-8441-8f63-854a-6b35234acd69"
    - stage: horo
      stageUuid: "4feaf19d-2d7a-8cc1-b4d5-261464b4444c"
    - stage: seal
      stageUuid: "b7704ba9-8e21-81da-9621-ec7912b5db22"
    - stage: uuid
      stageUuid: "0a2cacd5-4dc3-8da3-8f6d-fda28cdcc73d"
version: 2
---
# evidence-attestations

Evidence Attestations — signed PDF cover sheets produced by.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one durable index row per SOX §404 attestation — a PDF/A cover sheet per completed e2e walk-through, optionally bearing an eIDAS PAdES qualified signature with its certificate chain and SHA-256 digest as tamper-evident [[proof]]; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19005-2:2011 pdf-a-2`
- `@standard ISO-14289-1:2014 pdf-ua-1`
- `@standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile`
- `@standard ISO-19011:2018 audit-trail visual-evidence`
- `@standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields`
- `@standard rfc-5652 cms-detached-signature`
- `@standard NIST FIPS-180-4 sha-256 message-digest`

- ISO-19005-2:2011 pdf-a-2
- ISO-14289-1:2014 pdf-ua-1
- ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
- ISO-19011:2018 audit-trail visual-evidence
- ISO-19011:2018 audit-trail attestation-evidence
- SOX §404 internal-controls process-walk-through
- EU 910/2014 eidas qualified-electronic-signature
- ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields
- rfc-5652 cms-detached-signature
- NIST FIPS-180-4 sha-256 message-digest
- EU 910/2014 eidas Art.28 qualified-electronic-signature

Composes: [[proof]] · [[identity]] · [[party]] · [[horo]] · [[standard]].
