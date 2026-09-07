---
name: uuid
description: "Use when reasoning about uuid — content-addresses a failure and gives it a typed shape, so the same failure raised twice has the same address and can be counted, grouped and traced."
atomPath: "error/uuid"
coordinate: "error/uuid · 5/round · 432ce5b7"
contentUuid: "beba2a5b-9cee-5c22-8904-8e24a906ce2d"
diamondUuid: "bcc3e9cd-11d7-820a-95bd-64f0a9b35a19"
uuid: "432ce5b7-176e-8aef-920c-253b43c5a484"
horo: 5
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
  computationUuid: "322aa96d-81f3-89a9-85fe-0e9cba429769"
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
      stageUuid: "815a2906-8a08-8abf-aa31-6fe5142969ba"
    - stage: seal
      stageUuid: "af32320b-85b0-8f11-9f5f-878da4dbe1e0"
    - stage: uuid
      stageUuid: "46e86ec7-0ebd-8316-be80-5e9910ce0774"
version: 2
---
# error/uuid — an error is a record, not an exception that escaped

`computeErrorUuid` content-addresses a failure and `toErrorInfo` gives it a typed shape, so the
same failure raised twice has the same address and can be counted, grouped and traced.
`wrapError` carries a cause without losing it.

An out-of-band exception is a fact the system had and did not keep. Addressing it makes the
failure participate in the same fold as everything else.

Composes: [[uuid]] · [[law]].
