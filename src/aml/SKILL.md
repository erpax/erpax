---
name: aml
description: "Use when reasoning about aml — Laundering is an offence **a court finds**. A suspicious-activity report is an obligation **a rule triggers**."
atomPath: aml
coordinate: "aml · 5/round · 70b313a6"
contentUuid: "1bcfa5ff-48e7-5682-8ece-e263f2e0bb16"
diamondUuid: "edfe6b9c-6a83-8735-8ab3-b9238f884949"
uuid: "70b313a6-6144-8b62-991c-df57351fa75f"
horo: 5
typography:
  partition: aml
  bondDegree: 19
standards:
  - "EU 2015/847 — information accompanying transfers of funds"
  - "EU 2015/849 Art. 33 — report to the FIU promptly, before executing where possible"
  - "EU 2015/849 Art. 33(1) — reporting obligation, no permitted delay"
  - "EU-2015/847"
  - "EU-2015/849"
  - FATF Recommendation 20 — suspicious transaction reporting
bindings: []
signatures:
  computationUuid: "148ee225-e1a8-86ce-9d7c-e0f2d369d3e8"
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
      stageUuid: "aa7388cc-143c-86da-83dd-cdb2a95c305e"
    - stage: seal
      stageUuid: "b0541308-4487-8f5d-bb37-4292f2061992"
    - stage: uuid
      stageUuid: "b6013972-975e-8d34-89f4-1fd8e9ea528d"
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
