---
name: button
description: "Use when reasoning about button — The button that fills an empty install. Its whole design is the guard around a single irreversible action: seeding writes demo content into a live database, and running it twice…"
atomPath: "before/dashboard/seed/button"
coordinate: "before/dashboard/seed/button · 8/crest · 0895cfd0"
contentUuid: "30588e4c-521e-5cfa-9593-2d34e7297321"
diamondUuid: "d6331c2e-be58-8fb6-ba3d-377e9547a27a"
uuid: "0895cfd0-476a-8fbd-ae09-8064a165dc9f"
horo: 8
typography:
  partition: before
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "df15e49f-ff22-8777-9088-0cb9ee856f91"
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
      stageUuid: "ac4fc8e5-813c-8dcb-bfda-8ec7aaa5ae3e"
    - stage: seal
      stageUuid: "bbe04b13-1ba4-870a-a37a-b65bed7bdf7e"
    - stage: uuid
      stageUuid: "cfaee448-dd14-8b51-9c51-616e8e04a7ba"
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
