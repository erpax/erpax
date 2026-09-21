---
name: aml
description: "Use when reasoning about aml — Laundering is an offence **a court finds**. A suspicious-activity report is an obligation **a rule triggers**."
atomPath: aml
coordinate: "aml · 5/round · 70b313a6"
contentUuid: "e0160b27-8df4-5e38-ba9a-8408f7038ad2"
diamondUuid: "2b7a43ce-07cb-816c-85ee-5425051cbc64"
uuid: "70b313a6-6144-8b62-991c-df57351fa75f"
horo: 5
typography:
  partition: aml
  bondDegree: 22
standards:
  - "EU 2015/847 — information accompanying transfers of funds"
  - "EU 2015/849 Art. 33 — report to the FIU promptly, before executing where possible"
  - "EU 2015/849 Art. 33(1) — report promptly; refrain from executing a SUSPECTED transaction"
  - "EU 2015/849 Art. 33(1) — reporting obligation, no permitted delay"
  - "EU-2015/847"
  - "EU-2015/849"
  - FATF Recommendation 20 — suspicious transaction reporting
bindings: []
signatures:
  computationUuid: "f3a43c01-b3f5-816c-9c9a-90dc101c540a"
  stages:
    - stage: path
      stageUuid: "deafa163-9dff-8473-b6ae-52d1b1dea555"
    - stage: trinity
      stageUuid: "3ce62486-2129-82de-b9fa-0099fa27461a"
    - stage: boundary
      stageUuid: "c87d705a-7293-8245-8e7c-1f4520160463"
    - stage: links
      stageUuid: "cc33ac22-b65a-8a0d-a769-e1654e70d193"
    - stage: horo
      stageUuid: "47ffbc39-354c-816f-a06d-e37c544a34e2"
    - stage: seal
      stageUuid: "b0541308-4487-8f5d-bb37-4292f2061992"
    - stage: uuid
      stageUuid: "c7a420ec-0ce3-808e-983e-a9a8d386303e"
version: 2
---
# aml — whether a report is owed, never whether money was laundered

Laundering is an offence **a court finds**. A suspicious-activity report is an obligation **a rule
triggers**. The first is not decidable; the second is, and it is the one a bank is actually fined
for missing. This atom computes the second and refuses the first.

So a `none` verdict means **no trigger fired**. It does not mean the movement is clean, and that
sentence is in the code where a reader cannot miss it — because the failure mode of an AML engine
is not a missed report, it is a bank treating a green screen as a finding.

## Three verdicts, and the order between them is the law

| verdict | when |
| --- | --- |
| **suspicious** | a sanctions hit, an analyst's recorded suspicion, or structuring |
| **threshold** | a plain movement at or over the declaration threshold |
| **none** | no trigger fired — *not* a finding of cleanliness |

A sanctions hit reports at **any** amount: Art. 33 carries no de-minimis, so a €12 movement to a
listed counterparty is a report. And structuring is classed **suspicious rather than threshold**,
precisely because the amounts were kept under the threshold — filing it as a threshold declaration
would report the opposite of what happened.

## Structuring needs all three conditions

Two or more movements, sitting **just below** the threshold, **inside one window**, which together
**clear** it. Each condition is load-bearing and each is pinned by a test that removes only it:
one movement below a threshold is ordinary business; two that never sum past it are ordinary
business; a pair days apart is not a pattern. The window is measured over **real time**, never over
row order — a test shuffles the rows and asserts the same answer.

`STRUCTURING_BAND` is declared at 10%. Structuring is defined by **intent**, and no number decides
intent — this names candidates for a human, the same boundary [[rules]]/collapse keeps between what
a theorem proves and what a person means.

## The deadline is zero, deliberately

Art. 33(1) requires a report promptly and, where possible, **before the transaction executes**. A
deadline expressed as hours would invite a queue, and the queue is the violation — so
`SUSPICION_DELAY_MS` is `0` and `holdBeforeExecuting` returns true for exactly one verdict.

**Honest boundary.** Sanctions status and analyst suspicion are **inputs** — this atom maintains no
list and screens no name; it reads a flag somebody else set. It sees only the movements it is
handed, so a pattern split across institutions or accounts it was not given is invisible to it, and
that is most real laundering. It computes an obligation from declared thresholds. It does not
detect crime, and no configuration of it ever will.

**Law — [[law]]: compute what is owed, never what is true. A reporting rule that reports nothing has
found no trigger — it has not found innocence, and a system that lets those two read the same way
has already failed the only reader who matters.**

## Standards

- **EU 2015/849 Art. 33** — report to the FIU promptly, before executing where possible.
- **EU 2015/847** — information accompanying transfers of funds.
- **FATF Recommendation 20** — suspicious transaction reporting.

Composes: [[kyc]] · [[rules]]/audience · [[rules]]/refutable · [[law]].
