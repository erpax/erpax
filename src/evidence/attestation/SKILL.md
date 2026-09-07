---
name: attestation
description: "Use when reasoning about attestation — produces a PDF declaring which run captured this evidence, when, and against which tenant; applies a PAdES signature where a signer is configured."
atomPath: "evidence/attestation"
coordinate: "evidence/attestation · 8/crest · 680b3b64"
contentUuid: "ccb223c2-1352-5b5e-a18f-281e5499b782"
diamondUuid: "f35dea86-f3a0-8730-a7a3-6d9ba0efd2e0"
uuid: "680b3b64-7fa2-8701-ba30-87ad02ae5cf6"
horo: 8
typography:
  partition: evidence
  bondDegree: 7
standards:
  - "ETSI-EN-319-142"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile"
  - "EU 910/2014 eidas qualified-electronic-signature"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-14289-1"
  - "ISO-14289-1:2014 pdf-ua-1"
  - "ISO-19005"
  - "ISO-19005-2:2011 pdf-a-2"
  - "ISO-32000"
  - "ISO-32000-2:2020 pdf"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls process-walk-through"
bindings: []
signatures:
  computationUuid: "644321e4-a4ce-8a7e-a9df-2ecedf140ce6"
  stages:
    - stage: path
      stageUuid: "18a37f0e-eb5d-834b-a582-627bfd0f41cc"
    - stage: trinity
      stageUuid: "be523ef6-dcc9-8c44-96d1-20d2f054f23a"
    - stage: boundary
      stageUuid: "c81ddd54-5b89-8c06-bc07-6c0af9acbc96"
    - stage: links
      stageUuid: "175e9e99-8b03-8d30-b870-6ad8ac283fc4"
    - stage: horo
      stageUuid: "0ee109b5-9f51-825f-8642-908c9f2889b9"
    - stage: seal
      stageUuid: "ae24aa4a-70e4-8241-9462-da8cdc3bed5d"
    - stage: uuid
      stageUuid: "e3b37606-46e2-8c19-bb20-07c81ebc6242"
version: 2
---
# evidence/attestation — the cover sheet is what makes a capture into evidence

`buildEvidenceAttestation` produces a PDF declaring which run captured this evidence, when, and
against which tenant; `signEvidenceAttestation` applies a PAdES signature where a signer is
configured.

A screenshot with no provenance is a picture. An auditor accepts a capture when the claim about
its origin is attached to it and signed, which is exactly what ISO 19011 §6.4 asks of evidence.

**Honest boundary.** The attestation states the run's own account of itself; it proves the
declaration was signed, never that the capture was faithful.

Composes: [[law]].
