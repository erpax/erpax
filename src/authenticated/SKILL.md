---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: "authenticated · 1/base · 8d232ac2"
contentUuid: "3028eaee-3552-5eb4-ad62-b862470274f4"
diamondUuid: "25611be7-b82b-8e77-a482-1e45029a2ce4"
uuid: "8d232ac2-7397-8457-a24d-4d69a42e68f6"
horo: 1
bonds:
  in:
    - access
    - auth
    - law
  out:
    - access
    - auth
    - law
typography:
  partition: authenticated
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ISO/IEC-29119"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - auth
    - law
  matrix:
    - access
    - auth
    - law
  backlinks:
    - access
    - auth
    - law
signatures:
  computationUuid: "017e07ad-9aab-8000-93ea-6c365d3bd935"
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
      stageUuid: "0cd35a28-d20a-8b1a-a7cd-6401ce87ebc2"
    - stage: seal
      stageUuid: "c25f34c6-a515-8e4f-8ee8-c9b8e6052639"
    - stage: uuid
      stageUuid: "2d47122f-791a-80b1-8fbc-d5d08b5a22fb"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
