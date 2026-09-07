---
name: kv
description: "Use when reasoning about kv — addresses the binding itself, lifts a plain map into , and finds the value for a key by address rather than by string."
atomPath: "uuid/kv"
coordinate: "uuid/kv · 7/descent · c906e56b"
contentUuid: "eb7ded50-5f7e-57c1-8312-f019cd864b89"
diamondUuid: "8e2c7ffe-9422-87cf-bf76-d6bf8a01d492"
uuid: "c906e56b-7079-82d9-b436-8afb994100ec"
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
  computationUuid: "9b2e3951-6e85-83bc-ae77-f5ec82f3efa7"
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
      stageUuid: "7a49fb59-aaca-866c-90b4-f4618c0285e1"
    - stage: seal
      stageUuid: "e6c8b0d2-b822-8b1b-b683-431b4ee91e98"
    - stage: uuid
      stageUuid: "76b545d9-b987-8e70-b1e7-227a94e46738"
version: 2
---
# uuid/kv — a key-value pair is uuid → uuid, so a mapping is addressable like anything else

`computeKvBindingUuid` addresses the binding itself, `toUuidMap` lifts a plain map into
`UuidMap`, and `resolveKeyUuid` finds the value for a key by address rather than by string.

Once the key and the value both have addresses, the mapping between them is a `KvBinding` that
can be signed, chained and compared like any other content — instead of being configuration that
nothing verifies.

Composes: [[uuid]] · [[law]].
