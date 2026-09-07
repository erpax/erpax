---
name: uuid
description: "Use when reasoning about uuid — content-addresses a failure and gives it a typed shape, so the same failure raised twice has the same address and can be counted, grouped and traced."
atomPath: "error/uuid"
coordinate: "error/uuid · 7/descent · 6acde97b"
contentUuid: "10284ba0-6a5a-5b35-ba8e-40c37cc8b6fd"
diamondUuid: "f6ece095-cf01-88be-b0e4-e71cfaa479ab"
uuid: "6acde97b-cc8c-8fd2-b600-3ea968df346e"
horo: 7
typography:
  partition: error
  bondDegree: 825
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (errors are evidence)"
  - "ISO/IEC 25010:2023 §5.6 reliability"
  - "NIST SP 800-92 §3.4 log integrity (errors as audited events)"
  - "NIST-SP-800-92"
  - W3C Problem Details for HTTP APIs (RFC 9457 — type + title + status)
bindings: []
signatures:
  computationUuid: "e79e2ca9-dc76-83fc-8ac8-8a63e3fd6799"
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
      stageUuid: "847fb76f-9bd0-8b49-b15d-caccec8a124d"
    - stage: seal
      stageUuid: "af32320b-85b0-8f11-9f5f-878da4dbe1e0"
    - stage: uuid
      stageUuid: "f0709275-e72e-8b48-8886-5b6f6e55bfb3"
version: 2
---
# error/uuid — an error is a record, not an exception that escaped

`computeErrorUuid` content-addresses a failure and `toErrorInfo` gives it a typed shape, so the
same failure raised twice has the same address and can be counted, grouped and traced.
`wrapError` carries a cause without losing it.

An out-of-band exception is a fact the system had and did not keep. Addressing it makes the
failure participate in the same fold as everything else.

Composes: [[uuid]] · [[law]].
