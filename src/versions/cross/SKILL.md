---
name: cross
description: "Use when reasoning about cross — Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite)…"
atomPath: "versions/cross"
coordinate: "versions/cross · 1/base · af7ee49d"
contentUuid: "db0cbeb6-8346-521c-ac38-00b1497d851f"
diamondUuid: "4f1f35e8-fe7d-8a43-a6f0-8495ba5272ce"
uuid: "af7ee49d-9f9e-8a8e-b9ee-ba115d1fc8bf"
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
  computationUuid: "c6d3bbd7-f3a1-8f89-89d1-1dd4a529d1b9"
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
      stageUuid: "4edf0b90-4d6a-8ed1-86cd-082f0f27cbe0"
    - stage: seal
      stageUuid: "4b9077aa-e5b0-817f-a54d-0eeb5725bcea"
    - stage: uuid
      stageUuid: "e1f6ed61-a8d9-8cce-a09a-ea9472b367d5"
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
