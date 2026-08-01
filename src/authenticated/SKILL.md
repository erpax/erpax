---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 7/descent · 7c870518"
contentUuid: "ca4f7e7e-6723-5364-94fc-ecb626608b41"
diamondUuid: "5dc01d1d-7e7c-8a88-9e7c-a80de6a38acd"
uuid: "7c870518-d3a8-8d70-a7b7-2aa568b71501"
horo: 7
typography:
  partition: authenticated
  bondDegree: 0
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "575e6258-db24-831f-b129-b6174d4b65d1"
  stages:
    - stage: path
      stageUuid: "d354e2ad-c7ff-87b4-8a30-6d705d6c1a65"
    - stage: trinity
      stageUuid: "db59d9b9-384f-88f7-a807-ce24181d41c4"
    - stage: boundary
      stageUuid: "3b636953-a75f-8844-8bf1-79b55a5cf08b"
    - stage: links
      stageUuid: "c0389eea-483e-8038-8ce4-6072c8310497"
    - stage: horo
      stageUuid: "243bd79c-76ed-87d1-aa80-ca2b66629d04"
    - stage: seal
      stageUuid: "c25f34c6-a515-8e4f-8ee8-c9b8e6052639"
    - stage: uuid
      stageUuid: "9c450142-9bba-8539-ab54-494833f9ea37"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
