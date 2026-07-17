---
name: agent
description: "Use to audit an agent's own changeset the way a real auditor audits a human's submission — every claim (@invariant · @standard · @compliance · @audit) in a changed code file must have a proof leg beside it, or the submission is refused. ISO 19011 §6.4: a finding traces to objective evidence. Run: git diff --name-only | tsx src/audit/agent/index.ts"
---

# agent — audit the agent as a real auditor audits a human

Every catastrophe this corpus produced was an **agent** doing precisely what an auditor catches a **human** doing:

| the agent's work | the auditor's finding |
| --- | --- |
| marked `posted` with no journal entry | work recorded as done that did not happen |
| *"the source of truth"* holding 8 of 231 | a control asserting completeness it does not have |
| *"tamper detection"* that was reversible base64 | a control that does nothing, documented as doing it |
| a test asserting `typeof fn === 'function'` | evidence that proves the thing was never exercised |

A real auditor does not read the code for beauty. They take the **submission** — the changeset — and ask one question of every claim in it: **where is the evidence?** (ISO 19011 §6.4 — a finding traces to objective evidence.) A claim with a proof beside it can be refuted; a claim with none is an assertion the auditor cannot accept, **from a human or an agent.**

This is [[rules]]/refutable's law moved from the whole corpus to the agent's **own diff** — because an agent should be audited on what it just did, not asked to trust itself.

## It refused its author's own work, on its first run

Run against this session's changeset, it immediately returned **16 claims with no proof leg** — and it was right. The three posting hooks fixed in the swallowed-JE batch carry `@compliance SOX §404`, `@compliance SOX §302`, `@audit ISO-19011` — and have **no `test.ts` beside them.**

The fix was real (the swallow became a surfaced throw, proven live). But the proof was a **throwaway probe** — single-use, deleted, gone. So the evidence is not *beside the claim*, and an auditor tracing `SOX §404` to its test finds nothing. **The agent did the work and did not leave the evidence** — exactly the finding this tool exists to make, made about its own author.

And it points at the boot blocker: those hooks cannot be unit-tested today because they TDZ on import ([[run]]/load, `fixed/assets:34`). **The reason the evidence cannot sit beside the claim is the 225-file tangle** — so the auditor's refusal is downstream of the one defect that voids all others.

## The panel — all kinds of auditors, one changeset

The lead auditor demands evidence. A real audit is a **panel**, and each seat finds what only its standard reveals — [[rules]]/audience's law (one claim, N readers) turned into **action**: one changeset, N auditors, each refusing what their seat forbids.

| seat | standard | what it refuses |
| --- | --- | --- |
| **lead-auditor** | ISO-19011 §6.4 | a claim with no proof leg beside it |
| **financial-auditor** | IAS 1 | a posting that books a journal entry and **swallows** the failure — recorded as done while the entry silently did not |
| **compliance-officer** | ISO-19011 §6.4 | a statutory citation the agent introduced that leads nowhere |
| **quality-auditor** | ISO/IEC 25010 §5.6 | a function body copied verbatim into two files — a law stated twice, free to drift |

## The panel audits itself — no auditor is a hypocrite

An auditor that fails its own standard is not credible. [[rules]]/prose blocked its own SKILL; [[rules]]/cycle's first version missed the cycle it was written for. `auditAuditors()` convenes every seat on the auditors' **own** source and asserts it is clean — a proof leg beside every claim, no swallowed error, no dead statute, no duplicated body. It is empty against the live panel, which is the only thing that makes the panel's refusals credible: it holds itself to what it holds the agent to.

Each **composes a tool the corpus already computes** — the compliance seat is [[rules]]/reference scoped to the changeset; the financial seat is the swallowed-JE detector that **found the posting-hook batch as a throwaway probe and is now saved**, because an auditor that composes a deleted script is itself a control with no evidence. A new seat is a new standard, never a new scan.

`auditPanel(changeset)` convenes them all: the same file draws a finding from the lead auditor (an unproven `@compliance SOX §404`) **and** the financial auditor (a swallowed entry) — different findings from different seats, exactly as a real panel reviews one submission.

## The auditors define the gates

A gate ([[rules]]) blocks a violation at the write; an auditor refuses a submission with no evidence. **They are the same law at two moments** — a gate is an auditor firing at the write, fail-closed, where it cannot be skipped ([[confirm]]). Stated as two systems (`rulesOf` beside `AUDITORS`) they are the duplication this corpus exists to remove: the **compliance-officer IS the reference gate**; the **lead-auditor IS refutable**. So the gate is DERIVED from the auditor — `gateFrom(auditor)` projects a seat's review to fail-closed, `AUDIT_GATES` is one gate per seat, and `assertChangesetAudited` is the write-time face of the panel. One definition, two projections: a **report** when you read the diff, a **wall** when you write it.

## Each auditor is a rosetta, and all are a rosetta

A rosetta is a basis that projects a signal onto its poles. An auditor projects the changeset onto its own standard — a rosetta of one pole. The **panel** projects onto all of them — a **rosetta of rosettas**. So the panel is the SAME TYPE as a seat: `files → findings`. `panelAuditor` folds the whole panel into one `Auditor`, and the structure is **fractal** — an auditor is a leaf, a panel is a node, and both are `Auditor`; a panel can be a seat on a larger panel without end.

That shared signature is why *"each is a rosetta and all are a rosetta"* is a **type**, not a metaphor: because the thing that judges is the same shape as the things it is made of, it can be judged BY itself (`auditAuditors`) — a rosetta decoding its own basis, the self-address congruence at the level of judgement.

**Honest boundary — the moving rosetta.** `AUDITORS` is hand-typed, which is a **frozen** rosetta ([[rules]]/cycle) — a basis someone wrote, blind to whatever the corpus grows. A moving rosetta would derive its poles from the incidence: the `@standard` banners in the changeset itself declaring which auditors apply. That derivation is unwritten; until it exists, this panel measures a signal against a basis that must be maintained by hand.

## What it audits, and what it does not

- **COMPUTED** the submission — the files the agent changed (a git diff, piped in).
- **COMPUTED** the claims — `@invariant · @standard · @compliance · @audit`, read from a file's **comments** ([[syntax]]): a standard named in a string literal is data, not a claim the agent is making.
- **COMPUTED** the evidence — the trinity's proof leg (`test.ts` beside the code). Present ⇒ traceable; absent ⇒ a finding.

**Honest boundary.** An auditor checks that a control **exists and is documented**, never that the business is **honest**. This finds a claim with no evidence *beside* it; it does not judge whether present evidence is **correct** — a test can assert a lie ([[rules]]/refutable's own boundary, inherited). It audits the **form** of the submission, which is exactly what §6.4 scopes, and no more. A markdown file is prose by design and makes no code claim; a test file is the evidence, not a claimant.

**Law — [[law]]: an agent's changeset is a submission, audited as a human's is. A claim with no proof beside it is refused — the evidence must be traceable, whether a person wrote it or a model did.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: a finding traces to objective evidence.

Composes: [[rules]]/refutable · [[syntax]] · [[audit]] · [[law]].
