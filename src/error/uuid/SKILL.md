---
name: uuid
description: "Use when reasoning about uuid — content-addresses a failure and gives it a typed shape, so the same failure raised twice has the same address and can be counted, grouped and traced."
atomPath: "error/uuid"
coordinate: "error/uuid · 7/descent · cd194622"
contentUuid: "adaea4cf-9dac-55e9-871d-b2d35dbecfb4"
diamondUuid: "4c7b3d67-3d10-8162-8c62-7b1f20dc8773"
uuid: "cd194622-52a9-88f6-8c0d-55907b42e05a"
horo: 7
typography:
  partition: error
  bondDegree: 791
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (errors are evidence)"
  - "ISO/IEC 25010:2023 §5.6 reliability"
  - "NIST SP 800-92 §3.4 log integrity (errors as audited events)"
  - "NIST-SP-800-92"
  - W3C Problem Details for HTTP APIs (RFC 9457 — type + title + status)
bindings: []
signatures:
  computationUuid: "8459fbb0-8283-8fb1-86df-bb13d9c7eda4"
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
      stageUuid: "49b9ae2b-7599-81f6-aa58-b75e3f2d6d9b"
    - stage: seal
      stageUuid: "af32320b-85b0-8f11-9f5f-878da4dbe1e0"
    - stage: uuid
      stageUuid: "3150773c-fb6f-8545-8015-2da55aa87229"
version: 2
---
# error/uuid — an error is a record, not an exception that escaped

`computeErrorUuid` content-addresses a failure and `toErrorInfo` gives it a typed shape, so the
same failure raised twice has the same address and can be counted, grouped and traced.
`wrapError` carries a cause without losing it.

An out-of-band exception is a fact the system had and did not keep. Addressing it makes the
failure participate in the same fold as everything else.

Composes: [[uuid]] · [[law]].
