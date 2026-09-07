---
name: attestations
description: "Use when assembling SOX §404 audit-pack evidence — indexing PDF/A-2b + PDF/UA-1 attestation cover sheets per completed e2e walk-through, with optional eIDAS PAdES qualified signature (CMS blob, certificate chain, SHA-256 digest). The durable evidence-attestation index."
atomPath: "evidence/attestations"
coordinate: "evidence/attestations · 4/weave · 6b4cc5df"
contentUuid: "7f613a4e-cb8d-508c-b786-18025225f5e9"
diamondUuid: "bcb8f941-f47f-806c-b8f5-3435afb20c1c"
uuid: "6b4cc5df-1d90-8ce7-b59f-d6c8c464712c"
horo: 4
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
  computationUuid: "de4e31a5-df80-8be7-b191-69fca8ca7277"
  stages:
    - stage: path
      stageUuid: "43386994-5954-8894-b558-2260f4ccd0bf"
    - stage: trinity
      stageUuid: "7bcb23b5-591d-831f-a0a5-17ea5e35c935"
    - stage: boundary
      stageUuid: "311ed648-efe9-8baa-9572-1c8ea8907ea9"
    - stage: links
      stageUuid: "381cbbbd-e2b8-81a4-b808-d6315db084a3"
    - stage: horo
      stageUuid: "89027ce5-243e-873f-8b67-81de7605871b"
    - stage: seal
      stageUuid: "b7704ba9-8e21-81da-9621-ec7912b5db22"
    - stage: uuid
      stageUuid: "ecac471a-78bf-894c-b9c2-f0a129772465"
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
