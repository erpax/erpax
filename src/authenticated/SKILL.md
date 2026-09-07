---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 4/weave · 7760d1b1"
contentUuid: "4cd531f2-8878-553a-aa3d-66324897d692"
diamondUuid: "edb64cd3-a132-8c24-8cfe-5d9cfbabd7c1"
uuid: "7760d1b1-157f-8fca-8923-7935443fcaa7"
horo: 4
typography:
  partition: authenticated
  bondDegree: 9
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "0559881a-0935-83a5-b72f-6a7036f8bd7b"
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
      stageUuid: "7e9bcad5-802a-84a4-83d9-cb8c9453a4bc"
    - stage: seal
      stageUuid: "12f6223e-5f3b-83c8-b7f5-6d45050d75b2"
    - stage: uuid
      stageUuid: "01b59058-e7d6-82b8-8612-ea36de517da7"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
