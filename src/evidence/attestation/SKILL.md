---
name: attestation
description: "Use when reasoning about attestation — produces a PDF declaring which run captured this evidence, when, and against which tenant; applies a PAdES signature where a signer is configured."
atomPath: "evidence/attestation"
coordinate: "evidence/attestation · 1/base · 1c4c519d"
contentUuid: "7ac978ff-842a-5f20-b06c-17377a40b649"
diamondUuid: "632e812c-10b3-82e4-b61a-4515a8a32337"
uuid: "1c4c519d-3bb7-8e75-9135-4809bfc2443f"
horo: 1
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
  computationUuid: "bfeab7b8-9347-8336-869f-52d2b80d16a5"
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
      stageUuid: "cf469e8a-0094-8938-9ea3-2fb23cabb3d0"
    - stage: seal
      stageUuid: "ae24aa4a-70e4-8241-9462-da8cdc3bed5d"
    - stage: uuid
      stageUuid: "1fbd3dc4-3330-8418-aac3-9d9a2bcbf682"
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
