---
name: treasury
description: "Use when reasoning about treasury — A government cash office reconciles exactly as a bank drawer does, so it mounts float unchanged."
atomPath: treasury
coordinate: "treasury · 4/weave · 1a527908"
contentUuid: "a16d76a6-e5ae-5ddb-a81f-9ce35b019be6"
diamondUuid: "e926f4b0-9bea-8817-af66-261a6eff751a"
uuid: "1a527908-1ced-8173-b7ed-6c20ff168859"
horo: 4
typography:
  partition: treasury
  bondDegree: 10
standards:
  - INTOSAI GOV 9100 — internal control for the public sector
  - IPSAS 1 — presentation; IPSAS 2 — cash flow statements
  - ISA 501 — physical count as audit evidence
bindings: []
signatures:
  computationUuid: "3a03fc8f-d575-8f94-9389-00caf391cf7b"
  stages:
    - stage: path
      stageUuid: "c10b5e40-2a9b-84e6-9674-b0d40ae55ce7"
    - stage: trinity
      stageUuid: "29cd1d0d-2029-8dcd-afb3-e7b8ced36ca4"
    - stage: boundary
      stageUuid: "39bacbb0-daa2-8500-ad92-fea3e84b023e"
    - stage: links
      stageUuid: "821ae1f8-a730-8c21-bdac-e71ae752fbb8"
    - stage: horo
      stageUuid: "74a120e9-8c6a-8b3f-a36d-77e49c28a479"
    - stage: seal
      stageUuid: "f981df18-6a95-8166-bddf-ae0e3cf25762"
    - stage: uuid
      stageUuid: "f31441c7-1057-8284-a243-fe2155bff7ac"
version: 2
---
# treasury — a public till, where the variance has nowhere to go

A government cash office reconciles exactly as a bank drawer does, so it mounts [[float]] unchanged.
What differs is **what happens next**: public money has no owner who may absorb a shortfall, so an
over is not a windfall and a short is not a cost of business.

| variance | disposition |
| --- | --- |
| over | **surrender to the consolidated fund** |
| short | **raise a deficiency** |
| zero | none |

## The rule this encodes is the one most often broken

A system that nets tomorrow's opening float against today's over has **carried the difference
forward**, and the money has quietly become the office's. There is deliberately no disposition
meaning *carry forward* and none meaning *silence* — a pinned test asserts that every non-zero
variance names an action.

Tolerance is zero for the same reason [[armory]]'s is: there is no one with standing to absorb a
difference in public money.

**Honest boundary.** This names what is owed on a counted difference. It does not perform the
surrender, does not post to a fund, and does not know whether the deficiency was ever raised —
those are ledger entries and a human process. It closes the gap where a difference has no named
destination, which is where public money goes missing without anybody deciding that it should.

**Law — [[law]]: public money has no owner, so a difference has nowhere to rest. Name the
destination of every variance at the moment it is found, or the next day's opening float will
absorb it and no one will have decided anything.**

## Standards

- **IPSAS 1** — presentation of financial statements; **IPSAS 2** — cash flow statements.
- **INTOSAI GOV 9100** — internal control for the public sector.
- **ISA 501** — physical count as audit evidence.

Composes: [[float]] · [[armory]] · [[law]].
