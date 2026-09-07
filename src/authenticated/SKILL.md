---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 4/weave · 635cda25"
contentUuid: "9b21eedb-15a2-577a-a439-17972c1510bf"
diamondUuid: "1ad87b62-bb63-8ddd-990d-1989af16e22f"
uuid: "635cda25-59be-8328-8e09-3580adc8362d"
horo: 4
typography:
  partition: authenticated
  bondDegree: 9
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "52741a2a-bfdd-838f-bb9a-2622b6f8d746"
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
      stageUuid: "def95ca4-460d-8d81-bba3-60ffafc5e63c"
    - stage: seal
      stageUuid: "12f6223e-5f3b-83c8-b7f5-6d45050d75b2"
    - stage: uuid
      stageUuid: "61df69b7-2f68-80b6-b6ec-4c44684cd800"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
