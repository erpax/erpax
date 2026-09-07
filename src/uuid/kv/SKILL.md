---
name: kv
description: "Use when reasoning about kv — addresses the binding itself, lifts a plain map into , and finds the value for a key by address rather than by string."
atomPath: "uuid/kv"
coordinate: "uuid/kv · 2/share · 96b1a21d"
contentUuid: "0c02fc88-9e71-50b6-8182-437ff3e83848"
diamondUuid: "74594cc8-89f8-8a22-8770-d853e5490a83"
uuid: "96b1a21d-49cb-8ac7-b6e0-f7e1fd3539b3"
horo: 2
typography:
  partition: uuid
  bondDegree: 6
standards:
  - "NIST FIPS 180-4 SHA-256"
  - RFC 8785 JCS (canonicalisation that makes equivalence hold)
  - RFC 9562 §5.8 uuidv8 (both sides)
bindings: []
signatures:
  computationUuid: "3a38616c-1535-8762-8f4f-cd202f9c1a0b"
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
      stageUuid: "8028b931-96b6-8161-8549-50759d39699a"
    - stage: seal
      stageUuid: "e6c8b0d2-b822-8b1b-b683-431b4ee91e98"
    - stage: uuid
      stageUuid: "b07e280f-efa5-8d14-b5af-2af985c04076"
version: 2
---
# uuid/kv — a key-value pair is uuid → uuid, so a mapping is addressable like anything else

`computeKvBindingUuid` addresses the binding itself, `toUuidMap` lifts a plain map into
`UuidMap`, and `resolveKeyUuid` finds the value for a key by address rather than by string.

Once the key and the value both have addresses, the mapping between them is a `KvBinding` that
can be signed, chained and compared like any other content — instead of being configuration that
nothing verifies.

Composes: [[uuid]] · [[law]].
