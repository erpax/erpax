---
name: uuid
description: "Use when reasoning about uuid — content-addresses a failure and gives it a typed shape, so the same failure raised twice has the same address and can be counted, grouped and traced."
atomPath: "error/uuid"
coordinate: "error/uuid · 1/base · 6cb02103"
contentUuid: "45f73bc0-038e-547d-bdfe-0fe6dc9e1785"
diamondUuid: "beabee4b-18f1-8f57-93e8-217796bcf8bd"
uuid: "6cb02103-137b-86aa-9c0c-7b42ebf5e3b4"
horo: 1
typography:
  partition: error
  bondDegree: 705
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (errors are evidence)"
  - "ISO/IEC 25010:2023 §5.6 reliability"
  - "NIST SP 800-92 §3.4 log integrity (errors as audited events)"
  - "NIST-SP-800-92"
  - W3C Problem Details for HTTP APIs (RFC 9457 — type + title + status)
bindings: []
signatures:
  computationUuid: "8fb8278f-6cea-819c-8b45-0446e1d0e020"
  stages:
    - stage: path
      stageUuid: "0561271e-a44f-82d2-8510-37777f9e4729"
    - stage: trinity
      stageUuid: "fb8bc78d-618c-8a1a-8e3d-6755caf26f45"
    - stage: boundary
      stageUuid: "9fdc0537-bf47-82af-9407-bec61f2048f1"
    - stage: links
      stageUuid: "301059e0-52ee-8d5e-8fa4-0eea5895f662"
    - stage: horo
      stageUuid: "85f79f2c-2f36-85b0-a04b-38f6a1a1f341"
    - stage: seal
      stageUuid: "af32320b-85b0-8f11-9f5f-878da4dbe1e0"
    - stage: uuid
      stageUuid: "420ca03f-3caa-8a43-b085-ab591b533f7e"
version: 2
---
# error/uuid — an error is a record, not an exception that escaped

`computeErrorUuid` content-addresses a failure and `toErrorInfo` gives it a typed shape, so the
same failure raised twice has the same address and can be counted, grouped and traced.
`wrapError` carries a cause without losing it.

An out-of-band exception is a fact the system had and did not keep. Addressing it makes the
failure participate in the same fold as everything else.

Composes: [[uuid]] · [[law]].
