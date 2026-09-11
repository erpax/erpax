---
name: receipt
description: "Use when an agent must publish its own error record — the ledger every atom carries except the thing that writes them. Computes honesty (claims that held / claims made), efficiency (delivered / delivered+rework), self-caught defects, and lapses repeated after acknowledgement; withoutCorpus gives the counterfactual (what ships when the gates are stripped), trainingRules turns each correction into an imperative naming the instrument that already existed, and compareAgents refuses to call one row a comparison. Harness is tracked apart from model, and any harness can emit a receipt — the shape is plain data."
atomPath: "agent/receipt"
coordinate: "agent/receipt · 7/descent · 6743332a"
contentUuid: "056d3314-28c5-5b33-a33d-09e682253746"
diamondUuid: "0a469a2d-8d7a-8157-977d-46d1bf9a3ca6"
uuid: "6743332a-479d-8af4-8265-073044a3e226"
horo: 7
typography:
  partition: agent
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "3539f59c-adf0-8270-96dd-f677810f6ac1"
  stages:
    - stage: path
      stageUuid: "4abe2be3-15b1-86a5-8a0d-6e56706b249f"
    - stage: trinity
      stageUuid: "f7896d4e-2899-897e-a6ca-aaa6257a3cea"
    - stage: boundary
      stageUuid: "952475f1-cb88-8787-9aa2-eb134c5b424b"
    - stage: links
      stageUuid: "3749b154-6aa7-8a31-b27b-06f3e7a8a402"
    - stage: horo
      stageUuid: "a955bdfd-962a-8256-854a-5dd2719f1914"
    - stage: seal
      stageUuid: "96fe2f58-2990-8e5e-b62a-8f5c825b423c"
    - stage: uuid
      stageUuid: "cd13206e-177f-84d9-9606-3aaa8db9c201"
version: 2
---
# agent/receipt — an agent publishes its own error record, or its output is unaudited

erpax runs agents. Every atom carries a receipt except the thing that writes them. An agent reporting only what it delivered is an **unrefutable claim** ([[rules]]/refutable): the output looks identical whether it was reasoned or guessed. This is [[constitution]] Rule 1 turned on the writer — *claim no result you have not computed, including about yourself.*

**Intelligence is not a scalar and this does not compute one.** It computes the record.

## The session that built it

```
agent  claude-opus-5    harness  claude-code
claims  96   corrected   6   →  honesty     93.75%
deliv. 425m  rework    165m  →  efficiency  72.0%
selfCaught 16  lapses  13  commits 18

CONSTITUTION VERDICT: NOT SEALED — 8 of 9 hold; balance refuses at 0.694
```

The atom **fails its own constitution**, and the test asserts the refusal rather than the seal. Deleting the `delivered⊕rework` axis would have turned it green and hidden the one thing the receipt exists to publish. An agent's own record is the last place to trade a true number for a green one.

## The counterfactual — the only benchmark that does not need a second run

```
                 defects found    defects SHIPPED
with erpax            22                 0
without erpax          6                16
caughtShare = 72.7%
```

`selfCaught` counts defects a gate stopped **before they shipped**. Strip the gates and they do not vanish — they ship. The six corrections stay either way, because the corpus never caught those; a human did.

## The loop

`trainingRules` turns each correction into an imperative **naming the instrument that already existed** — *"Before asserting this, run `src/horo throughVoid`. It was available and unused."* Repeated lapses rank first, carrying their count. `trainingPrompt` renders what the next session reads, and [[constitution]]'s `prependToAgentPrompt` puts it at the head.

Its own output caught a bug in it: lapse rules read *"use the named instrument"* and named nothing, violating this atom's stated invariant. They now quote the law, which carries the instrument.

## Any harness, any model

`agent` and `harness` are separate strings because they fail differently: a **model** asserts something false; a **harness** makes the wrong instrument the easiest to reach. Ten shell-heredoc lapses in one session is as much a harness observation as a model one — the shell was one keystroke away, the scalpel was an import. Cursor, Copilot, aider or a CI runner emit the same shape and get the same rules.

`compareAgents` **refuses to call one row a comparison**: `comparable` is false below two measured sessions, and a row exists only for a model actually run on this corpus — never inferred from reputation or a published benchmark. Ranking is by honesty first; delivery does not buy the rank.

## Honest boundary

The record is **human-seeded**. An agent that under-reports its own corrections scores well, so `claims` is the softest number here and the honesty figure is only as honest as whoever fills in the denominator. The counterfactual assumes a caught defect would have shipped — the honest worst case, still an assumption. And the training loop is **prompt-level**: it changes what an agent reads, not what it is, so a rule derived here is a candidate for a gate, never a substitute for one.

**Law — [[law]]: an agent publishes its own error record — corrections, laws broken, rework — beside what it delivered, or its output is unaudited.**

Composes: [[agent]] · [[constitution]] · [[rules]] · [[local]] · [[law]].
