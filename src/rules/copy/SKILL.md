---
name: copy
description: "Use when reasoning about copy — This corpus states the law already: *duplication is camouflage — while one law is stated in two private corners, nothing can show a THIRD place is missing it.* It has paid for it…"
atomPath: "rules/copy"
coordinate: "rules/copy · 5/round · 8e3fe9f0"
contentUuid: "7ff84fcc-311f-5760-aeb7-d2f65691cffd"
diamondUuid: "ef257ec6-7d05-8f52-92f4-c1c057bfdc82"
uuid: "8e3fe9f0-7275-8ab3-a59f-f4810bb70723"
horo: 5
typography:
  partition: rules
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "3ec10bfc-dd09-8978-bf7c-94010c928c9b"
  stages:
    - stage: path
      stageUuid: "d82d2c62-1ae9-86e1-bad6-7da93650e4b2"
    - stage: trinity
      stageUuid: "80088271-6afa-8d2a-82c3-7dc7c7b507eb"
    - stage: boundary
      stageUuid: "148c1c0c-6f88-81d2-94de-5fe73f6214c5"
    - stage: links
      stageUuid: "064ee739-4e42-8f01-a978-44e67ffae308"
    - stage: horo
      stageUuid: "7bd9b8ad-bb4a-8ce6-ac47-960671847fb5"
    - stage: seal
      stageUuid: "756a028c-a9e5-86e1-93d5-ccfcd14a267e"
    - stage: uuid
      stageUuid: "add134b0-91e4-8741-8d9e-f48739b58696"
version: 2
---
# rules/copy — one truth at two addresses, found by content-addressing the body

This corpus states the law already: *duplication is camouflage — while one law is stated in two
private corners, nothing can show a THIRD place is missing it.* It has paid for it repeatedly:
`canonical` existed twice while ten audit leaves each claimed JCS and none had it; a second
`generateTrialBalance` grew inside a dead service; `posting/immutability/enforcer` sat beside
`enforce/posting/immutability` with zero callers.

Each of those was found by READING. This finds them by address.

## What it measures

Every function, method, arrow and class body is content-addressed: comments and whitespace removed,
sha256 of what is left. **Same bytes ⇒ same address** — a theorem, not a similarity score. Two sites
sharing an address are the same implementation, whatever their names.

| | count (2026-09-06) |
| --- | ---: |
| bodies at two or more addresses | 44 |
| **copies beyond the first** | **56** |
| largest | `onChainStep` — 111 AST nodes, **11 identical copies** across the registered agents |

Identifiers are deliberately **not** normalised. Erasing names would find "duplicates" that differ in
what they operate on, and a report whose noise floor sits above its signal is one nobody reads — the
failure `rules/prose`, `rules/reference` and `standards/emit` each paid for separately.

`minNodes` is DECLARED at 40, in the open, for the same reason: below it a body is a one-liner that
many honest functions share, and every such pair would bury the ones that matter.

## It caught its author first

Two of the top ten findings were written by the session that built it:

- `visit` — 136 AST nodes, copied from `rules/collapse` into `fund` rather than reused. The payload-types
  parser, duplicated by the agent who had read the original an hour earlier.
- `time` — 87 nodes, twice inside `quantum/hexbit`, because two benchmarks each grew their own
  median-timing helper.

That is the useful evidence about this instrument: the law is easy to state, easy to agree with, and
still broken by the person stating it. A gate is the only form of it that holds.

## The hash covers the body, never what the body closes over

Folding two byte-identical `justActivated` bodies out of the AR and AP invoice hooks **silently
changed AP's behaviour**, and a pre-existing test caught it on the first run. The two functions
were the same text; the `ACTIVE_STATUSES` set each closed over was not — a bill becomes live on
`approved`, an invoice stays live through `grace_period`, and neither status exists in the
other's set.

**Two bodies matching is not two behaviours matching.** Before folding, read what the body reads:
the fix is to pass the difference in (the set became a parameter) rather than to pick one
constant and hope. That is the same shape as `ownsCollections` in the eleven-agent chain-step
fold — share the mechanism, parameterise what differs.

**Honest boundary.** This proves two bodies are the SAME TEXT, never that they should be ONE function
— three `wrap` helpers in the ISO 20022, Peppol and SAF-T exporters are genuinely the same code, and
whether they become a shared helper or stay independent is a coupling decision a human makes. It
reads `.ts` and `.tsx`, skips generated faces (which restate every symbol) and skips tests (where
scaffolding legitimately repeats). And it finds copies, never near-copies: a body edited by one
character is invisible to it, which is the price of using an address instead of a score. And as above, a matching body says
nothing about the constants it reads — that check is the human's, before the cut.

## The copy × cycle cross, formulated and then built

[[conjecture]]'s enumerator ranked `rules/copy × rules/cycle` **second of 528 crosses at 1.11 bits**
— both laws widely cited (14 and 28 SKILLs), never drawn together. The enumeration produced the
pair; the claim it names is real, and this is it:

**A duplicated body whose two FILES lie in one strongly connected component is strictly worse than
an ordinary copy.** Inside a tangle the initialisation order of the two files is decided by the
import graph rather than by either author, so the same text can run under conditions neither of
them chose — and neither law sees it alone. `rules/copy` reports two identical bodies and says
nothing about when they run; `rules/cycle` reports a tangle and says nothing about what is inside
it.

| | count (2026-09-25) |
| --- | ---: |
| duplicate bodies | 13 |
| **spanning two or more files** | **7** |
| import tangles | 13, over 152 files |
| **cross-file copies inside ONE tangle** | **0** |

**Zero over a non-empty population.** Both ingredients exist in quantity, so the gate stands where
traffic passes rather than being a check that cannot fire ([[rules]]/unraised) — and the baseline is
0 because there is no acceptable number of bodies duplicated across files whose running order is an
accident.

**Same-file duplicates are excluded.** A file is trivially in its own component, so counting them
would make every same-file duplicate a tangle finding — this corpus's noise floor, paid for four
times. The `readme/compute` pair at lines 926 and 966 is exactly that case and is correctly not
here.

**Honest boundary.** This proves two bodies are the same TEXT and that their files are mutually
reachable — never that they diverge, and never that the order actually differs on any given entry
into the graph. That is [[rules]]/cycle's own boundary restated: entangled is not fatal, and which
loops bite depends on how the graph is entered. It closes the case where a copy's two halves cannot
even be reasoned about independently.

## A copy no site earns — found by measuring, not by ranking

[[conjecture]]'s prose ranking put `copy × unfolded` nowhere near the top. Measuring the
intersection put it **second of fifteen**, on 11 shared files — and its own top live pick,
`concentration × copy`, measured exactly **0**.

`unearnedCopies` is the law that lives there: a body duplicated across files where at least one
site's export has **no more than one caller**. **8 groups**, and in every one of them *both* copies
are unearned — the body is written twice and neither copy is called more than once, so the
duplication is not even paying for itself once.

The largest is 65 nodes across `law/folder/word.ts` and `navigation/distribute.ts`.

**Honest boundary.** [[rules]]/unfolded's own boundary carries straight through: erpax ships as
`@erpax/*` packages, so an export with no in-repo caller may be a public face, and a site whose
single use is its own test exists to be tested. This names candidates where two laws agree, which
is a stronger signal than either alone and still not a purge list.

**Law — [[law]]: the same body at two addresses is one implementation and one decoy. Content-address
every body; where two agree, one of them is unmaintained and nobody knows which.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change must be made once, not once per copy.

Composes: [[rules]]/unfolded · [[rules]]/collapse · [[syntax]] · [[law]].
