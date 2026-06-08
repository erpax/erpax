---
name: attestations
description: "Use when assembling SOX §404 audit-pack evidence — indexing PDF/A-2b + PDF/UA-1 attestation cover sheets per completed e2e walk-through, with optional eIDAS PAdES qualified signature (CMS blob, certificate chain, SHA-256 digest). The durable evidence-attestation index."
atomPath: evidence/attestations
coordinate: evidence/attestations · 5/round · d3fe4dd3
contentUuid: "7527be88-5969-54a4-a0d8-afd5f6edd1ed"
diamondUuid: "32db0023-4665-8857-9696-ad912dfb555a"
uuid: "d3fe4dd3-969a-8d78-b14b-bb7ade499a53"
horo: 5
bonds:
  in:
    - attestation
    - combinations
    - emissions
    - evidence
    - horo
    - identity
    - law
    - measurements
    - party
    - proof
    - standard
  out:
    - attestation
    - combinations
    - emissions
    - horo
    - identity
    - law
    - measurements
    - party
    - proof
    - standard
typography:
  partition: evidence
  bondDegree: 30
  neighbors: []
standards:
  - "ETSI-EN-319-142"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile signature-fields"
  - "EU 910/2014 eidas Art.28 qualified-electronic-signature"
  - "EU 910/2014 eidas qualified-electronic-signature"
  - "EU-2011/83"
  - "EU-2014/55"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-14289-1"
  - "ISO-14289-1:2014 pdf-ua-1"
  - "ISO-19005"
  - "ISO-19005-2:2011 pdf-a-2"
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail attestation-evidence"
  - "ISO-19011:2018 audit-trail visual-evidence"
  - "NIST FIPS-180-4 sha-256 message-digest"
  - "NIST-FIPS-180-4"
  - "RFC-5652"
  - "SOX §404 internal-controls process-walk-through"
  - "rfc-5652 cms-detached-signature"
bindings: []
neighbors:
  wikilink:
    - horo
    - identity
    - law
    - party
    - proof
    - standard
  matrix:
    - attestation
    - combinations
    - emissions
    - horo
    - identity
    - law
    - measurements
    - party
    - proof
    - standard
  backlinks:
    - attestation
    - combinations
    - emissions
    - horo
    - identity
    - law
    - measurements
    - party
    - proof
    - standard
signatures:
  computationUuid: "85dda62f-d945-8a33-bf0f-954acd8a1895"
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
      stageUuid: "6adc1762-c70b-8952-9c4b-aa528a5d6489"
    - stage: seal
      stageUuid: "3d88e974-6888-8f43-82e0-24d0119d6fd7"
    - stage: uuid
      stageUuid: "e45b331e-e196-883c-a33c-75a26e9a43e9"
version: 2
---
# evidence-attestations

Evidence Attestations — signed PDF cover sheets produced by.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one durable index row per SOX §404 attestation — a PDF/A cover sheet per completed e2e walk-through, optionally bearing an eIDAS PAdES qualified signature with its certificate chain and SHA-256 digest as tamper-evident [[proof]]; a single-folder collection node (no scatter, no drift).**

## Standards
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
