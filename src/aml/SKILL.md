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
