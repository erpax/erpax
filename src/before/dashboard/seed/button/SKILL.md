---
name: button
description: "Use when reasoning about button — The button that fills an empty install. Its whole design is the guard around a single irreversible action: seeding writes demo content into a live database, and running it twice…"
atomPath: "before/dashboard/seed/button"
coordinate: "before/dashboard/seed/button · 8/crest · af11d922"
contentUuid: "f1700141-2d09-5562-829e-f5e97fd654ba"
diamondUuid: "53670e06-f2ed-83b9-9d2b-bdc25e843397"
uuid: "af11d922-eaf1-84fc-991e-5dd12630b5f7"
horo: 8
typography:
  partition: before
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "6832429c-3117-89ec-9db2-c637ecd3f0ec"
  stages:
    - stage: path
      stageUuid: "d2b34afc-4309-817b-aa66-9206f2238dbc"
    - stage: trinity
      stageUuid: "8ef34858-d8e4-825e-8b96-352cc7f53107"
    - stage: boundary
      stageUuid: "7f0140b1-5e64-840d-b605-36dfe805a50c"
    - stage: links
      stageUuid: "b21c33f2-ad0b-80cd-af0b-3a1377cd2b46"
    - stage: horo
      stageUuid: "af2c0da1-7bc7-8214-a206-2082e9a0714e"
    - stage: seal
      stageUuid: "bbe04b13-1ba4-870a-a37a-b65bed7bdf7e"
    - stage: uuid
      stageUuid: "0253c2d4-04e0-807e-88f2-95587a66ed7a"
version: 2
---
# before/dashboard/seed/button — seeding is destructive, so it may happen exactly once

The button that fills an empty install. Its whole design is the guard around a single irreversible
action: seeding writes demo content into a live database, and running it twice is not idempotent —
it duplicates.

So the component holds three states and refuses in each, before the request is sent:

| state | what a second click does |
| --- | --- |
| `seeded` | refuses — the work is already done |
| `loading` | refuses — a request is in flight, and a double-click is one press to the user |
| `error` | refuses — the previous attempt's outcome is unknown, so a retry may double-write |

Each refusal explains itself in a toast rather than doing nothing. A button that silently ignores a
click is indistinguishable from a broken one, and the user's next move is to click harder.

The `error` refusal is the interesting one: a failed seed may have written *some* rows before it
failed, so "try again" is not obviously safe. Refusing and saying so leaves the decision with a human
who can look at the database.

**Honest boundary.** These guards live in the browser. They prevent a double-click and a hurried
retry; they cannot prevent two tabs, two administrators, or a direct call to the endpoint. Real
idempotency belongs to the seed endpoint, and this atom does not claim it.

**Law — [[law]]: an irreversible action guards itself in every state that could repeat it, and says
why it refused. Silence reads as a broken button, and a broken button gets clicked again.**

## Standards

- **WCAG 2.2 §3.3.4** — error prevention for actions with consequences.
- **WAI-ARIA 1.2** — the status role carrying the outcome.

Composes: `before/dashboard` · [[law]].
