---
name: copy
description: "Use when reasoning about copy — This corpus states the law already: *duplication is camouflage — while one law is stated in two private corners, nothing can show a THIRD place is missing it.* It has paid for it…"
atomPath: "rules/copy"
coordinate: "rules/copy · 1/base · 631a2521"
contentUuid: "4ff77959-728a-5703-b4f0-604028d580da"
diamondUuid: "9b27927c-e044-8c87-89e3-1786c172287f"
uuid: "631a2521-2644-8280-8554-8ecc10077efd"
horo: 1
typography:
  partition: rules
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "abacd9f1-09a2-8fb6-92b4-9847262d40f5"
  stages:
    - stage: path
      stageUuid: "d82d2c62-1ae9-86e1-bad6-7da93650e4b2"
    - stage: trinity
      stageUuid: "80088271-6afa-8d2a-82c3-7dc7c7b507eb"
    - stage: boundary
      stageUuid: "b004f449-bcde-8a42-9c5a-24953044ee55"
    - stage: links
      stageUuid: "b47695fc-779e-865c-8e71-aa4982d3d90e"
    - stage: horo
      stageUuid: "ff856913-ce4c-8eca-8454-7d48e945ce16"
    - stage: seal
      stageUuid: "756a028c-a9e5-86e1-93d5-ccfcd14a267e"
    - stage: uuid
      stageUuid: "567c24db-b5d4-8fc7-b454-a8b895e832fb"
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

**Law — [[law]]: the same body at two addresses is one implementation and one decoy. Content-address
every body; where two agree, one of them is unmaintained and nobody knows which.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change must be made once, not once per copy.

Composes: [[rules]]/unfolded · [[rules]]/collapse · [[syntax]] · [[law]].
