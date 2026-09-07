---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 2/share · 62fb35da"
contentUuid: "7c3c4866-c6b6-5d18-bb15-319880002c9b"
diamondUuid: "634b7e29-2bb1-82a9-8ef9-767c7626a5cf"
uuid: "62fb35da-61db-81b7-b2c7-1086e0bb8e37"
horo: 2
typography:
  partition: authenticated
  bondDegree: 9
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "cf4b63ee-ad7f-88fa-8a7f-a32ca44eb491"
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
      stageUuid: "61a73188-3d5f-8393-b454-7fe0261f058a"
    - stage: seal
      stageUuid: "12f6223e-5f3b-83c8-b7f5-6d45050d75b2"
    - stage: uuid
      stageUuid: "54d6059f-1f79-8521-b7f5-9863b3d4d28a"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
