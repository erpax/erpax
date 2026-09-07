---
name: cross
description: "Use when reasoning about cross — Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite)…"
atomPath: "versions/cross"
coordinate: "versions/cross · 1/base · 9d23739a"
contentUuid: "7f67375a-d980-5c78-8647-1a2425a38053"
diamondUuid: "3e824412-b459-8310-95c2-52d788235114"
uuid: "9d23739a-e456-849e-9d7c-2d5cff9a310f"
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
  computationUuid: "0ad0c05e-3b92-8bed-8ef4-f9b6023c63db"
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
      stageUuid: "8f8ddcab-a3da-8b52-b131-49a371ebaad7"
    - stage: seal
      stageUuid: "4b9077aa-e5b0-817f-a54d-0eeb5725bcea"
    - stage: uuid
      stageUuid: "50655590-1028-8b74-8847-c7eb64698cc6"
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
