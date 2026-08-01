---
name: handoff
description: "Use when a specification must be checked by a command instead of re-read by a human — any prompt is a spec: a handoff document, a chat directive, a PR description, a ticket. Each requirement is transcribed once carrying the document line it came from, and its satisfaction is computed from the tree on every run: atoms checked for the real trinity, symbols read from the parser rather than matched, env keys read from the files. Deviations where the build departs from the spec on purpose are recorded, never absorbed, so implemented never quietly means implemented differently."
atomPath: "handoff"
---

# handoff — a specification is checked by a command, not by a reading

The observation that built this, stated by the human who kept watching it happen:

> *any time you lens the handout new revelations emerge*

The document never changed. **The reader did.** Every pass over prose resolves a different part of it, and the parts that go unresolved read as satisfied — so "the handoff is implemented" was a claim asserted from a reading, which is exactly what [[constitution]] Rule 1 forbids. The manual re-reading was also the expensive part: tokens spent re-deriving a different subset each time, and blocking on it.

So the reading became a command.

```
handoff — 37/37 requirement(s) met (100.0%)
  no unmet requirement

  2 recorded deviation(s) — built differently, on purpose:
    line 47  trello/plugin.ts → trello/plugin/{index,test,SKILL}  (law/folder)
    line 58  anchor/surface.ts → anchor/surface/{index,test,SKILL}  (law/folder)
```

The last gap it found was real and had survived every manual pass: the document asks for FIPS 203/204/205 as normative anchors, and `anchor/index.ts` defined `slh-dsa-fips205` while citing no FIPS banner at all. Adding it made the standards gate refuse the write until the catalogue followed — one gap surfacing another.

## Any prompt is a spec

A handoff document, a spoken directive in chat, a PR description, a ticket, a standard — each states what must be true when the work is done, and each is read by a human who resolves a different part every pass. The shape is identical, so `Spec` covers all of them: `source` is a path, a URL, or `chat:<date>`. The test checks a spoken directive (*prioritise local over remote · benchmarks with and without erpax · any harness follows the same self-evaluation*) with the same function that checks the document.

A registered prompt stops being something an agent must remember to honour and becomes something the tree either satisfies or does not — the same answer on every run, for every reader.

## Computed and declared, split in the open

| | |
| --- | --- |
| **DECLARED** | the requirements. No theorem extracts requirements from English, so a human read the prose and wrote down what each line asks for. Every one carries its `line`, so the transcription is checkable against the source in seconds. |
| **COMPUTED** | whether each is satisfied. Symbols come from [[syntax]]'s `boundNames` — **parsed, never matched**, and the test proves it: this atom's own doc comment names `noExpectation` a dozen times and binds nothing, so it does not satisfy the symbol check. Atoms need the real trinity. Env keys are read from the files. |

## Deviations are recorded, not absorbed

The document spells the two child atoms as stray `.ts` siblings the corpus's own folder law forbids. They were built as child atoms. The requirement is met; the file layout is not, and saying so costs one line. A spec followed loosely without saying so is the same defect this atom closes, pointed the other way.

## Honest boundary

This proves each **transcribed** requirement is satisfied by the tree. It never proves the transcription is **complete** — a line nobody transcribed is invisible here, which is the original defect surviving one level up, and the only defence is that the line numbers make the transcription cheap to audit. It never proves the code **behaves** as the document intended: a text needle proves a name is present, not that it works, and it is named the weakest check for that reason. And `pnpm check` going green — the document's own success measure — is a gate this atom can point at but not run.

**Law — [[law]]: a specification is checked by a command, not by a reading. Every requirement carries the line it came from and the check that decides it, and a deviation is recorded, never absorbed.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: a requirement that cannot be checked cannot be met.

Composes: [[constitution]] · [[syntax]] · [[rules]] · [[agent]] · [[law]].
