---
name: attestation
description: "Use when reasoning about attestation — produces a PDF declaring which run captured this evidence, when, and against which tenant; applies a PAdES signature where a signer is configured."
atomPath: "evidence/attestation"
coordinate: "evidence/attestation · 2/share · 40307183"
contentUuid: "7e5cdd16-1088-571f-8217-db9f3b4e64e4"
diamondUuid: "78f7f161-cacb-823e-9c99-b581dc626523"
uuid: "40307183-c277-8008-beb4-2772fb51cd26"
horo: 2
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
  computationUuid: "d6e06b59-0dc6-87a1-bc9b-0e24300449c3"
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
      stageUuid: "dea8ff9d-dadf-8671-af1d-c9e751a0a46b"
    - stage: seal
      stageUuid: "ae24aa4a-70e4-8241-9462-da8cdc3bed5d"
    - stage: uuid
      stageUuid: "23881824-0c17-8293-8b24-03caab541b4b"
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
