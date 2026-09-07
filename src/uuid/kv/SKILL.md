---
name: kv
description: "Use when reasoning about kv — addresses the binding itself, lifts a plain map into , and finds the value for a key by address rather than by string."
atomPath: "uuid/kv"
coordinate: "uuid/kv · 7/descent · 19a7ed3c"
contentUuid: "7292e7bd-8613-5077-aab5-fb2a149a8203"
diamondUuid: "fdf9c216-7b47-8dc7-a46b-815cef62ab00"
uuid: "19a7ed3c-75c6-8ae9-833d-0a2e3c867c81"
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
  computationUuid: "874f5b77-c3cf-8133-98e2-8faadfc5a038"
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
      stageUuid: "4d7a3d68-2b8a-832b-8e7f-2cbcb8423c62"
    - stage: seal
      stageUuid: "e6c8b0d2-b822-8b1b-b683-431b4ee91e98"
    - stage: uuid
      stageUuid: "6b2003a6-7175-8e93-ab66-8ee0e5966a1f"
version: 2
---
# uuid/kv — a key-value pair is uuid → uuid, so a mapping is addressable like anything else

`computeKvBindingUuid` addresses the binding itself, `toUuidMap` lifts a plain map into
`UuidMap`, and `resolveKeyUuid` finds the value for a key by address rather than by string.

Once the key and the value both have addresses, the mapping between them is a `KvBinding` that
can be signed, chained and compared like any other content — instead of being configuration that
nothing verifies.

Composes: [[uuid]] · [[law]].
