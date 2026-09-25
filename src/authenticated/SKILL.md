---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 8/crest · 7c37c162"
contentUuid: "983c7379-4ce8-5430-b5cb-5adbd056a0c5"
diamondUuid: "c9bcd278-971e-8d66-bc17-6c01b9a65b1f"
uuid: "7c37c162-5f93-827d-880c-28c222a6dc5e"
horo: 8
typography:
  partition: authenticated
  bondDegree: 12
standards:
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "6206bd4f-2cc9-8d9e-b013-ad9b4c103a03"
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
      stageUuid: "06988701-561d-89b2-83a2-5970ab610dc1"
    - stage: seal
      stageUuid: "12f6223e-5f3b-83c8-b7f5-6d45050d75b2"
    - stage: uuid
      stageUuid: "09fed8bb-74fb-89c0-9255-16a18ddce7c7"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
