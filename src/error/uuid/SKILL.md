---
name: uuid
description: "Use when reasoning about uuid — content-addresses a failure and gives it a typed shape, so the same failure raised twice has the same address and can be counted, grouped and traced."
atomPath: "error/uuid"
coordinate: "error/uuid · 1/base · 6cb02103"
contentUuid: "3bb1fa6a-41db-5d44-9013-ea9a6629e4d0"
diamondUuid: "3d997e2f-a5a7-80e7-b1f0-6490c50f5519"
uuid: "6cb02103-137b-86aa-9c0c-7b42ebf5e3b4"
horo: 1
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
  computationUuid: "29cceb6e-f893-865f-b725-2b5cb8db22d1"
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
      stageUuid: "0b97bbb6-75ba-8c0a-9377-8148285a3f09"
    - stage: seal
      stageUuid: "af32320b-85b0-8f11-9f5f-878da4dbe1e0"
    - stage: uuid
      stageUuid: "e29fb668-0d72-8aeb-8106-1672f37b32cf"
version: 2
---
# error/uuid — an error is a record, not an exception that escaped

`computeErrorUuid` content-addresses a failure and `toErrorInfo` gives it a typed shape, so the
same failure raised twice has the same address and can be counted, grouped and traced.
`wrapError` carries a cause without losing it.

An out-of-band exception is a fact the system had and did not keep. Addressing it makes the
failure participate in the same fold as everything else.

Composes: [[uuid]] · [[law]].
