---
name: cross
description: "Use when reasoning about cross — Every entity change content-addresses to a leaf. That same leaf is simultaneously the VERSION (a new content-uuid), a TAMPER-COST increment (one more link a forger must rewrite)…"
atomPath: "versions/cross"
coordinate: "versions/cross · 2/share · c0087bf1"
contentUuid: "345fe86a-d2e0-5969-ba57-2d1c4fde8eb1"
diamondUuid: "50511159-b092-8bb0-b802-a0192a1d0668"
uuid: "c0087bf1-27dd-8889-8bf5-b497295462f0"
horo: 2
typography:
  partition: versions
  bondDegree: 68
standards:
  - RFC 8785 JCS (deterministic content canonicalization)
  - "RFC 9562 §5.8 uuidv8 (the content-addressed version id)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "848dca52-051a-8444-ab4e-ba40921baeec"
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
      stageUuid: "106eafe1-b328-8fa9-bd17-26b30c29595a"
    - stage: seal
      stageUuid: "4b9077aa-e5b0-817f-a54d-0eeb5725bcea"
    - stage: uuid
      stageUuid: "fc3e9ac7-ad9c-8468-bffb-017d8ed0736b"
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
