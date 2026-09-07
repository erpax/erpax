---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 1/base · cc1eab71"
contentUuid: "39adc876-beac-52db-807c-029787119166"
diamondUuid: "5e0d576b-ba80-87e7-b1f1-74173fa39a71"
uuid: "cc1eab71-abce-8772-8329-eea0ea9cc45e"
horo: 1
typography:
  partition: authenticated
  bondDegree: 9
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "1482672e-3454-8a0f-a327-ea6b5a9d211f"
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
      stageUuid: "50b635bd-6238-8977-a538-031fc98fe630"
    - stage: seal
      stageUuid: "12f6223e-5f3b-83c8-b7f5-6d45050d75b2"
    - stage: uuid
      stageUuid: "0207b456-b6b1-8fcc-8edc-e462d1bc6a4b"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
