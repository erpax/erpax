---
name: teller
description: "Use when reasoning about teller — Everything structural — the derived total, the signed variance, the void-on-illegal-count rule — lives in float, because a chip tray, an armoury and a public till obey the same…"
atomPath: teller
coordinate: "teller · 5/round · 8b530bc1"
contentUuid: "73ba489b-006b-5473-acb9-5903479cb579"
diamondUuid: "2cfd367a-2fbc-8709-b333-a6c37ac159c5"
uuid: "8b530bc1-c8e8-84d2-b840-77a262cd7f9c"
horo: 5
typography:
  partition: teller
  bondDegree: 13
standards:
  - ECB — euro legal tender denominations
  - ISA 501 — physical count as audit evidence
  - "ISO 4217 — EUR, minor units"
bindings: []
signatures:
  computationUuid: "b421d6f9-2d2a-8de8-9733-dc837f2d3d42"
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
      stageUuid: "c3a9ae7b-829e-825d-9282-9c6520f82547"
    - stage: seal
      stageUuid: "efaa610c-459f-8c7e-b952-0ecabd4cf294"
    - stage: uuid
      stageUuid: "e2767860-2f2c-88e2-bed0-19a2457c61bd"
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
