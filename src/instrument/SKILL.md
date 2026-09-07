---
name: instrument
description: "Use when reasoning about instrument — Use before taking any measurement of this corpus — which tool answers which question, and how each one lies. Every wrong number here was a wrong instrument, or a right one trusted past its limit: a name-grep over a minified bundle, a lint report contradicted by the compiler, a web fetch returning a model's rendering, a count copied from a stale document. The pattern is that the wrong instrument does not error, it answers. instrumentFor names the settling tool; assertInstrument fails closed on a known-wrong pairing; an unregistered question passes, because pretending the register were complete would be the same error."
atomPath: instrument
coordinate: "instrument · 1/base · c24bdfa8"
contentUuid: "6d9fc42e-8bcf-5ae6-b016-628abf1ef960"
diamondUuid: "e240f7a4-4a95-84cc-93bf-c9d308d89da6"
uuid: "c24bdfa8-dd7e-8b0d-a020-7531e8d4fab7"
horo: 1
typography:
  partition: instrument
  bondDegree: 23
standards:
  - "ISO-19011:2018 §6.4 — audit evidence: sufficient and appropriate, not merely available"
bindings: []
signatures:
  computationUuid: "602f8c6f-4da5-84fd-b5df-24bb725366c9"
  stages:
    - stage: path
      stageUuid: "de8f2c5b-2dd4-8bb6-892a-d11ab378992d"
    - stage: trinity
      stageUuid: "d2aa07ff-b522-8bc5-a8cd-00b3c051993a"
    - stage: boundary
      stageUuid: "3a7d1e7f-9198-8671-8bfc-1f9473413fd9"
    - stage: links
      stageUuid: "5ae35c98-91d4-8480-aa53-f8949b1a0b4d"
    - stage: horo
      stageUuid: "3a8837a5-e936-87d6-8c2c-a935cd460bad"
    - stage: seal
      stageUuid: "46d545ec-c98e-8ed6-a4d5-879a7af9b2a3"
    - stage: uuid
      stageUuid: "041f19c5-dc59-84bd-bffe-101464935541"
version: 2
---
# instrument — the wrong instrument does not error, it answers

A grep returns `0` as confidently as it returns `9`. A lint rule says *"unused"* in the same tone whether or not it parsed the file. A summary of a page reads exactly like the page. **Silence would be safe; a confident wrong number is not.**

Every mis-measurement in this corpus was this shape — not a wrong answer, a **wrong instrument**:

| question | instrument that ANSWERS | instrument that SETTLES |
| --- | --- | --- |
| does the deployed bundle export this class? | a name-grep over the built worker — *it is minified; `class $ extends Y`* | the export tail: public names are the module's contract and no minifier may rename them |
| is this artifact the thing that ships? | `.open-next/worker.js` — *an INPUT to the wrangler entry* | follow `main` in `wrangler.jsonc`, then bundle that |
| is this symbol used? | the lint report — *said unused; both were called* | the compiler, `tsc --noEmit` |
| does prose cite real code? | a regex — *wrong in 115 of 6,203 files* | `@/syntax` over `ts.createSourceFile` |
| what does that page say? | a web fetch — *returns a rendering* | the local clone's bytes ([[local]]) |
| how many atoms? | a count in a document — *568 commits stale* | count the tree, now |
| is this standard cited? | the catalogue count — *`/001/i` matched `ISO 27001`* | open the module, read the banner |
| did the suite pass? | a green summary — *the setup swallowed the boot* | assert the precondition and let it throw |

**Eight rows, eight paid for here.** The table is evidence, not advice.

## It caught its own author, twice, in one session

Writing this atom, the README scorer was called as `orientationScore(process.cwd())`. It takes the README **text**, not a path — so the measurement was of the string `/Users/ceci/github/erpax/erpax`, and it returned **0%, every criterion missing**, moments after the README had been improved. Passing the actual bytes returned **100%**.

Before that, a "production defect" was reported from a name-grep over a minified bundle, then withdrawn when the export tail showed all five classes present. **One line of the right instrument refuted a whole finding.**

## What it refuses

`instrumentFor` returns `undefined` for an unregistered question — never a default. Guessing which tool applies is precisely the error. `assertInstrument` throws on a known-wrong pairing and **stays silent on an unregistered one**: this is a register, not a whitelist, and treating it as complete would be the same category of error it exists to catch.

## Honest boundary

Which instrument answers which question is **declared** — no theorem derives it, and the mapping is one human's judgement written where a reader trips over it. It prevents the eight recorded misreadings and says nothing about the ninth. Being on the list does not make an instrument correct in every context: `tsc` settles *is this symbol used*, not *is this symbol used well*.

**Law — [[law]]: name the instrument before the measurement — a wrong instrument does not error, it answers, and a confident wrong number costs more than no number at all.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: sufficient and appropriate, not merely available.
- **ISO/IEC 25010:2023 §5.5** — testability: a claim is only as good as what could contradict it.

Composes: [[local]] · [[seeing]] · [[rules]]/cycle · [[readme]] · [[law]].
