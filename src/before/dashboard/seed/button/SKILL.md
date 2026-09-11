---
name: button
description: "Use when reasoning about button — The button that fills an empty install. Its whole design is the guard around a single irreversible action: seeding writes demo content into a live database, and running it twice…"
atomPath: "before/dashboard/seed/button"
coordinate: "before/dashboard/seed/button · 8/crest · bd8605c7"
contentUuid: "6e7c5095-90b6-52e2-b235-473d7afb29a5"
diamondUuid: "08baf26b-02d1-8215-ae4f-99c88a2b4af6"
uuid: "bd8605c7-1a4f-8e56-84ab-244e8e796b42"
horo: 8
typography:
  partition: before
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "d76acc76-4618-8588-ad0f-ac32ba6c85d1"
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
      stageUuid: "4f32a3be-5884-88a5-a224-52b4dcbc273c"
    - stage: seal
      stageUuid: "bbe04b13-1ba4-870a-a37a-b65bed7bdf7e"
    - stage: uuid
      stageUuid: "b0b6ec93-a1c2-8509-8baf-70791e3db0f6"
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
