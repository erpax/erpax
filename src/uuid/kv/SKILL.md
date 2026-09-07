---
name: kv
description: "Use when reasoning about kv — addresses the binding itself, lifts a plain map into , and finds the value for a key by address rather than by string."
atomPath: "uuid/kv"
coordinate: "uuid/kv · 4/weave · ac3e1c3c"
contentUuid: "3725a1be-c9e8-5d5d-bc7c-421106230565"
diamondUuid: "e0c33d6c-91be-8f86-a6fc-7081322f51eb"
uuid: "ac3e1c3c-e995-81f0-af4c-48f4495ccdd4"
horo: 4
typography:
  partition: uuid
  bondDegree: 6
standards:
  - "NIST FIPS 180-4 SHA-256"
  - RFC 8785 JCS (canonicalisation that makes equivalence hold)
  - RFC 9562 §5.8 uuidv8 (both sides)
bindings: []
signatures:
  computationUuid: "aff7ddba-7a03-8595-923b-79b2b75fe8db"
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
      stageUuid: "3eba78d2-294c-8732-92e1-e09c3668139e"
    - stage: seal
      stageUuid: "e6c8b0d2-b822-8b1b-b683-431b4ee91e98"
    - stage: uuid
      stageUuid: "5d9b2b22-d5c8-8ea6-bb93-a28d5e98c32b"
version: 2
---
# uuid/kv — a key-value pair is uuid → uuid, so a mapping is addressable like anything else

`computeKvBindingUuid` addresses the binding itself, `toUuidMap` lifts a plain map into
`UuidMap`, and `resolveKeyUuid` finds the value for a key by address rather than by string.

Once the key and the value both have addresses, the mapping between them is a `KvBinding` that
can be signed, chained and compared like any other content — instead of being configuration that
nothing verifies.

Composes: [[uuid]] · [[law]].
