---
name: kv
description: "Use when reasoning about kv — addresses the binding itself, lifts a plain map into , and finds the value for a key by address rather than by string."
atomPath: "uuid/kv"
coordinate: "uuid/kv · 7/descent · 430eed12"
contentUuid: "79903fa4-a17c-58eb-8e07-1d0ed75b6a11"
diamondUuid: "5defb866-d10e-883b-b7fd-07a8c75e3cf5"
uuid: "430eed12-e576-836a-abc0-3e8986f8eb1d"
horo: 7
typography:
  partition: uuid
  bondDegree: 6
standards:
  - "NIST FIPS 180-4 SHA-256"
  - RFC 8785 JCS (canonicalisation that makes equivalence hold)
  - RFC 9562 §5.8 uuidv8 (both sides)
bindings: []
signatures:
  computationUuid: "a477efd1-fed6-8065-b6bb-adf924715509"
  stages:
    - stage: path
      stageUuid: "3a38938b-a1f6-8af2-8e3b-1ad201702ea9"
    - stage: trinity
      stageUuid: "0ccdb09c-d92e-8638-92a9-4dace664531d"
    - stage: boundary
      stageUuid: "bd026adc-581d-8770-b971-aa4f33b3bc64"
    - stage: links
      stageUuid: "d9d2d12d-1175-86df-bd38-c740a427c2c5"
    - stage: horo
      stageUuid: "296de024-f4f3-897c-8f13-098904b3f3b5"
    - stage: seal
      stageUuid: "e6c8b0d2-b822-8b1b-b683-431b4ee91e98"
    - stage: uuid
      stageUuid: "6d33f110-f1c4-8d9f-85e9-aabdf9784303"
version: 2
---
# uuid/kv — a key-value pair is uuid → uuid, so a mapping is addressable like anything else

`computeKvBindingUuid` addresses the binding itself, `toUuidMap` lifts a plain map into
`UuidMap`, and `resolveKeyUuid` finds the value for a key by address rather than by string.

Once the key and the value both have addresses, the mapping between them is a `KvBinding` that
can be signed, chained and compared like any other content — instead of being configuration that
nothing verifies.

Composes: [[uuid]] · [[law]].
