---
name: authenticated
description: "Use when gating a Payload collection or field on a logged-in session — the access predicate that grants only when `req.user` exists, denying every anonymous caller."
atomPath: authenticated
coordinate: authenticated · 1/base · 6c36a075
contentUuid: "2954aad2-780d-5d8d-97b2-f77431c2f88d"
diamondUuid: "9777c9c3-1498-8318-991f-3e28ca57adea"
uuid: "6c36a075-4abe-84c2-b3ae-7db3e92870e9"
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
  computationUuid: "c4c0aa01-83f1-86d2-89f3-bab07f41859c"
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
      stageUuid: "a98aef17-a7f2-8ae2-8f84-493239986ef0"
    - stage: seal
      stageUuid: "c25f34c6-a515-8e4f-8ee8-c9b8e6052639"
    - stage: uuid
      stageUuid: "e523a1e9-a582-8821-a7cd-62895bc986d4"
version: 2
---
# authenticated — logged-in read predicate

The baseline [[access]] gate: `Boolean(req.user)`. It grants any caller whose request carries a resolved user (identity established by [[auth]]) and denies anonymous callers. This is Payload's default-style "must be signed in" predicate.

Matter-twin: `src/authenticated/index.ts` (`authenticated = ({ req: { user } }) => Boolean(user)`). Composes [[access]] · [[auth]].

**Law — [[law]]: presence of a verified `req.user` is the gate — `authenticated` grants iff a session exists ([[auth]]), denying every anonymous caller.**
