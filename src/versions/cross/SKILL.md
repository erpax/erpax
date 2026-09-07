---
name: cross
description: "Use when reasoning about cross — Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite)…"
atomPath: "versions/cross"
coordinate: "versions/cross · 4/weave · cf139fa0"
contentUuid: "7958565b-15c4-579c-8569-3a3974b90430"
diamondUuid: "f03ca2c1-5a4e-87e5-a924-c427fa1741aa"
uuid: "cf139fa0-22d4-87a6-9541-a78020521e57"
horo: 4
typography:
  partition: versions
  bondDegree: 68
standards:
  - RFC 8785 JCS (deterministic content canonicalization)
  - "RFC 9562 §5.8 uuidv8 (the content-addressed version id)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "f5b1373b-cc21-867d-bc0a-bdee49df8f30"
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
      stageUuid: "1bf1fe46-7351-83b1-848a-a5133242d0ff"
    - stage: seal
      stageUuid: "4b9077aa-e5b0-817f-a54d-0eeb5725bcea"
    - stage: uuid
      stageUuid: "c03fd699-7b4e-8a98-8eaa-4614dc6f2ba0"
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
