---
name: teller
description: "Use when reasoning about teller — Everything structural — the derived total, the signed variance, the void-on-illegal-count rule — lives in float, because a chip tray, an armoury and a public till obey the same…"
atomPath: teller
coordinate: "teller · 5/round · 8b530bc1"
contentUuid: "67469455-47c2-5628-ae13-402bb2a375f7"
diamondUuid: "74aaecf4-fdcb-869f-97ce-28fdb578920d"
uuid: "8b530bc1-c8e8-84d2-b840-77a262cd7f9c"
horo: 5
typography:
  partition: teller
  bondDegree: 10
standards:
  - ECB — euro legal tender denominations
  - ISA 501 — physical count as audit evidence
  - "ISO 4217 — EUR, minor units"
bindings: []
signatures:
  computationUuid: "79eb377e-57bb-8269-a011-66d6b446829e"
  stages:
    - stage: path
      stageUuid: "0d8dd8b3-7a34-841c-888f-805332b5a53a"
    - stage: trinity
      stageUuid: "12f62ff4-4a22-8187-a2bf-8fcff9a026fd"
    - stage: boundary
      stageUuid: "b5623a08-a869-882f-978d-b3cb4fd6e071"
    - stage: links
      stageUuid: "4d283354-3ba5-8af3-9222-4bcb71ebc258"
    - stage: horo
      stageUuid: "9d7e2246-517b-87e3-b20f-4e36fea3882e"
    - stage: seal
      stageUuid: "efaa610c-459f-8c7e-b952-0ecabd4cf294"
    - stage: uuid
      stageUuid: "0fefaa66-7e82-81da-ab45-96acfbdf6b9d"
version: 2
---
# teller — the branch counter, mounted on [[float]]

Everything structural — the derived total, the signed variance, the void-on-illegal-count rule —
lives in [[float]], because a chip tray, an armoury and a public till obey the same law. What is
teller's **own** is the unit set the euro issues and the branch's two thresholds.

That split is the point: when the reconciliation law changes it changes **once**, and no case can
drift from it.

## A preserved name is not a preserved meaning

This atom used to hold the reconciliation itself. Moving it out and re-exporting the names kept
every caller compiling — and **silently changed one of them**. `needsDualControl(amount)` took the
branch threshold as a default; the core's version requires it, so every amount compared against
`undefined` and returned `false`. A four-eyes check answering *no* to everything, with the face
intact and the build green.

A test caught it, and it is exactly the boundary [[rules]]/face states about itself: that gate
proves a name is still **offered**, never that it still **means** what it did. So `needsDualControl`
is wrapped here with the branch's default rather than re-exported, and the case is pinned.

**Honest boundary.** A balanced drawer proves the count agrees with the movements recorded. It does
not prove the movements are complete: a transaction never entered leaves both sides consistent.
That is what dual control and an independent counter are for, and neither is a function.

**Law — [[law]]: a case mounts the law, it does not restate it. And when matter moves out from
under a name, check what the name MEANT — the compiler only checks that it still exists.**

## Standards

- **ISO 4217** — EUR, minor units.
- **ECB** — euro legal tender denominations.
- **ISA 501** — physical count as audit evidence.

Composes: [[float]] · [[rules]]/face · [[law]].
