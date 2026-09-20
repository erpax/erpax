---
name: casino
description: "Use when reasoning about casino — A gaming table opens with a chip float, takes and pays through the session, and is counted at close."
atomPath: casino
coordinate: "casino · 4/weave · da62d0e1"
contentUuid: "5606bf2c-750d-5d52-b953-190123b7131b"
diamondUuid: "45863ceb-56d4-8de1-a2c1-a979f6d8d286"
uuid: "da62d0e1-036a-8719-a006-f7b382f474e6"
horo: 4
typography:
  partition: casino
  bondDegree: 10
standards:
  - ISA 501 — physical count as audit evidence
  - ISO 4217 — currency and minor units
bindings: []
signatures:
  computationUuid: "9dcbf18c-3981-80fd-9359-cd5bb6b56d24"
  stages:
    - stage: path
      stageUuid: "213d8224-af30-8764-b51a-5a25bbb25f05"
    - stage: trinity
      stageUuid: "05c6803c-01bd-8814-bf39-0aeb08d1601b"
    - stage: boundary
      stageUuid: "60b5b34a-9cac-8da1-bd89-557e10b3105f"
    - stage: links
      stageUuid: "c7aa3b79-26b1-8b43-9d76-daad4eeb9f10"
    - stage: horo
      stageUuid: "c8be2848-d609-8d2d-9ea0-9145eb8fb3b4"
    - stage: seal
      stageUuid: "77cb2681-5cb6-8a2a-bbe0-96e7715f1f1f"
    - stage: uuid
      stageUuid: "1b064ab3-f077-8192-aea7-5946ec6a3b2c"
version: 2
---
# casino — the table tray, mounted on the same control as a bank drawer

A gaming table opens with a chip float, takes and pays through the session, and is counted at
close. That is [[float]]'s structure exactly, so it is [[float]]'s code exactly — this atom adds
the house's scale and one thing the bank does not have.

## The scale is a parameter, because a house has several

A table tray, the cage and a tournament set are three different chip scales **in one house**.
Hard-coding any of them makes the other two uncountable, so `reconcileTray` takes the scale and
`CHIPS` is only a default. The test asserts the same count is balanced against a tournament scale
and **void** against the cash scale — which is the whole reason the scale travels with the count.

## The drop and the variance answer different questions

The **drop** is what the table took in net of what it paid out — the movements alone, without the
opening float. The **variance** is whether the count can be believed at all. A table can take money
*and* fail to count, and a report that folds those together loses the finding that matters: a
pinned test has a table with a positive drop and a short tray.

**Honest boundary.** This reconciles a tray against a declared scale. It says nothing about play,
odds, or whether a chip is genuine — a counterfeit chip of a legal denomination counts as that
denomination here, and detecting it is a physical control, not an arithmetic one.

**Law — [[law]]: the table's result and the table's honesty are two questions. Report the drop and
the variance separately, or a winning night will cover a tray that does not count.**

## Standards

- **ISO 4217** — currency and minor units.
- **ISA 501** — physical count as audit evidence.

Composes: [[float]] · [[law]].
