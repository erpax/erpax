---
name: cross
description: "Use when reasoning about cross — Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite)…"
atomPath: "versions/cross"
coordinate: "versions/cross · 1/base · 88cc3ae5"
contentUuid: "a2d925df-ad52-504e-803e-bd851fe2f11d"
diamondUuid: "634e3aa0-0be8-89a6-bfd3-0daab89b3ff2"
uuid: "88cc3ae5-a770-8c01-b4cc-1ea50b89f5ed"
horo: 1
typography:
  partition: versions
  bondDegree: 68
standards:
  - RFC 8785 JCS (deterministic content canonicalization)
  - "RFC 9562 §5.8 uuidv8 (the content-addressed version id)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "a19478b1-b149-810f-aaa8-83dfab9c74fb"
  stages:
    - stage: path
      stageUuid: "4522ecaf-80a1-8da7-bb21-0ee1ea34c597"
    - stage: trinity
      stageUuid: "7997857c-eeaa-8114-ad36-63d119d30679"
    - stage: boundary
      stageUuid: "c82fed76-49ee-8bd3-b5f8-a0a69422380b"
    - stage: links
      stageUuid: "adaae29d-78d6-8ee5-9b3e-3e55b7f78f0a"
    - stage: horo
      stageUuid: "a9aa3ff5-c60e-87db-8be3-c1dee95f6d10"
    - stage: seal
      stageUuid: "4b9077aa-e5b0-817f-a54d-0eeb5725bcea"
    - stage: uuid
      stageUuid: "01840b98-2398-83fd-b50a-6d1dc5fef4d5"
version: 2
---
# versions/cross — one change mints ONE leaf, read three ways

Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a
new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite) and an ANALYTICS
point (a timestamped change event). `versionCross` produces it; `chainChecks` verifies the chain
it extends.

So versioning is not a per-collection flag switched on for the collections someone remembered. It
is a property every content-addressed entity already has, and this reads it.


Composes: [[uuid]] · [[law]].
