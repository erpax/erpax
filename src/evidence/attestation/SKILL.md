---
name: attestation
description: "Use when reasoning about attestation — produces a PDF declaring which run captured this evidence, when, and against which tenant; applies a PAdES signature where a signer is configured."
atomPath: "evidence/attestation"
coordinate: "evidence/attestation · 1/base · 71480ed1"
contentUuid: "28ed29d1-a071-5349-b185-9ecaafa4bc9d"
diamondUuid: "3be98225-590e-853e-8d5c-1121cec06f5e"
uuid: "71480ed1-f41b-8729-8017-07831dfa93b6"
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
  computationUuid: "b563696b-6860-8fae-b010-8e0a450c2b74"
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
      stageUuid: "75b93b12-ec2d-8257-9310-39fdccadba69"
    - stage: seal
      stageUuid: "ae24aa4a-70e4-8241-9462-da8cdc3bed5d"
    - stage: uuid
      stageUuid: "bc286296-61f8-8ada-81d1-fa7fb9f3c629"
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
