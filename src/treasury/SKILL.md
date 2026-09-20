---
name: treasury
description: "Use when reasoning about treasury — A government cash office reconciles exactly as a bank drawer does, so it mounts float unchanged."
atomPath: treasury
coordinate: "treasury · 5/round · ca7cb4b5"
contentUuid: "e54e876d-4b36-5783-af92-37b2e60f24af"
diamondUuid: "f3c3dabc-b4b7-8587-a293-f99495507ecc"
uuid: "ca7cb4b5-abec-80f7-b87f-2a1dccd0148c"
horo: 5
typography:
  partition: treasury
  bondDegree: 10
standards:
  - INTOSAI GOV 9100 — internal control for the public sector
  - IPSAS 1 — presentation; IPSAS 2 — cash flow statements
  - ISA 501 — physical count as audit evidence
bindings: []
signatures:
  computationUuid: "5f9e1bc1-a57c-8525-ac71-811c28e53dd6"
  stages:
    - stage: path
      stageUuid: "c10b5e40-2a9b-84e6-9674-b0d40ae55ce7"
    - stage: trinity
      stageUuid: "29cd1d0d-2029-8dcd-afb3-e7b8ced36ca4"
    - stage: boundary
      stageUuid: "39bacbb0-daa2-8500-ad92-fea3e84b023e"
    - stage: links
      stageUuid: "97cefde0-bfec-8738-9b4a-66a5f43def8a"
    - stage: horo
      stageUuid: "8b5ad884-e02a-8110-b960-1b0e07a76c89"
    - stage: seal
      stageUuid: "f981df18-6a95-8166-bddf-ae0e3cf25762"
    - stage: uuid
      stageUuid: "85edcfbb-6a3c-8030-9462-8eb47603dbac"
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
