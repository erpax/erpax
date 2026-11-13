---
name: treasury
description: "Use when reasoning about treasury — A government cash office reconciles exactly as a bank drawer does, so it mounts float unchanged."
atomPath: treasury
coordinate: "treasury · 7/descent · 5d63c02a"
contentUuid: "35294add-e805-5639-8ce8-f972f49787d2"
diamondUuid: "243c2b27-5533-8539-9e18-e457ff31ee9a"
uuid: "5d63c02a-e096-8e09-8cd4-1953bb3017e1"
horo: 7
typography:
  partition: treasury
  bondDegree: 7
standards:
  - INTOSAI GOV 9100 — internal control for the public sector
  - IPSAS 1 — presentation; IPSAS 2 — cash flow statements
  - ISA 501 — physical count as audit evidence
bindings: []
signatures:
  computationUuid: "8c94c473-6b3b-897c-ab5a-8052148347f7"
  stages:
    - stage: path
      stageUuid: "c10b5e40-2a9b-84e6-9674-b0d40ae55ce7"
    - stage: trinity
      stageUuid: "29cd1d0d-2029-8dcd-afb3-e7b8ced36ca4"
    - stage: boundary
      stageUuid: "39bacbb0-daa2-8500-ad92-fea3e84b023e"
    - stage: links
      stageUuid: "1348e52b-482f-87e7-99c1-17d5e65fce72"
    - stage: horo
      stageUuid: "923fef3e-b970-8328-b948-37cbbaf9b8f3"
    - stage: seal
      stageUuid: "f981df18-6a95-8166-bddf-ae0e3cf25762"
    - stage: uuid
      stageUuid: "4ab57654-26b1-8ba6-8335-5ac43d437e06"
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

Tolerance is zero for the same reason armory's is: there is no one with standing to absorb a
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

Composes: [[float]] · armory · [[law]].
