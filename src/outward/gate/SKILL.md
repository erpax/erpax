---
name: gate
description: "Use when wiring the outward contracts into CI, pre-push or the release workflow — runs all twelve OFFLINE contracts (EU four, BG two, world six) plus the coverage ratchet and the contracted-endpoint resolve check, fail-closed. Offline by construction: it imports only the frozen-capture functions, so a correct erpax can never fail its release because an authority is rebooting."
atomPath: "outward/gate"
coordinate: "outward/gate · 2/share · e426a24c"
contentUuid: "e64e1cf7-21a8-55ce-9854-74a5c016ba19"
diamondUuid: "21b78ea3-0dc0-8dcc-9f28-e4d4bff0a6f7"
uuid: "e426a24c-c238-8b5b-a105-0d5d147ceb6a"
horo: 2
typography:
  partition: outward
  bondDegree: 282
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the contract IS the evidence"
bindings: []
signatures:
  computationUuid: "bb511172-ac09-87d7-9eaa-8ef733a8d98d"
  stages:
    - stage: path
      stageUuid: "5beef5af-6b51-825d-b337-a5579440e6da"
    - stage: trinity
      stageUuid: "cc5a53d0-6028-824a-8010-7d0e60509e18"
    - stage: boundary
      stageUuid: "c30d52e2-c4da-8aa0-9dfb-3a40d2191846"
    - stage: links
      stageUuid: "d11480df-2eea-8e80-bca6-a0e103373205"
    - stage: horo
      stageUuid: "98ad49c9-b35d-8d3d-b9de-6d9767f7cfb5"
    - stage: seal
      stageUuid: "75c9f48b-bf68-8076-91ef-5085de3bae42"
    - stage: uuid
      stageUuid: "f4725f77-0966-896a-96b1-99423d1b72ba"
version: 2
---
# outward/gate — the release half of the split, fail-closed

"Test all the APIs" is **two** questions, and conflating them makes a gate nobody
trusts:

| question | answer depends on | belongs in |
| --- | --- | --- |
| does OUR CODE handle the shape? | us — deterministic | **the gate. This.** |
| is the OUTSIDE still that shape? | someone else's uptime | a lane, run deliberately |

This runs the first one: **twelve offline contracts** — the EU four
([[outward]]/eu), the BG two ([[outward]]/bg), the world six ([[outward]]/world) —
against frozen captures on disk.

**Offline by construction, not by discipline.** It imports only the `*Offline`
functions, and its test runs the whole gate with `fetch` replaced by a throwing stub.
A network call cannot pass. That matters because the alternative already happened: a
perfectly correct erpax would have failed its release when the EU sanctions host
answered `403` — and that 403 later turned out to be *our* missing token, which is the
case **for** the split, not against it. The offline half kept the release honest while
the live half named the break.

## Three ways it fails a release, each a real defect

- **A parser disagrees with its own capture.** The shape erpax reads moved. This is
  erpax's break, not the world's, and the error says so.
- **A contracted endpoint matches no catalogued rail.** The ledger under-reporting
  itself — exactly how a working ECB contract marked *nothing* covered for as long as
  it existed ([[rules]]/unraised: a key nobody has fails OPEN).
- **Unproven claims grow.** A new rail declaring `clientImplemented` with no contract
  beside it is a promise nothing can contradict.

**Honest boundary.** A green gate proves erpax's parsers agree with **captures**, never
that an authority is up, correct, or still sending that shape — a fixture freezes a
moment. Only `erpax outward eu|bg|world --online` speaks to the present. And the
coverage ceiling is a **ratchet, not a target**: all 20 remaining unproven rails are
credentialed, so the floor is provisioning, not undone work.

**Law — [[law]]: the gate tests OUR code, never someone else's uptime. A release that
can be failed by a stranger's reboot teaches everyone to bypass it, and a bypassed
gate is prose.**

Composes: [[outward]] · [[gate]] · [[law]].
