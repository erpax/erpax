---
name: copy
description: "Use when reasoning about copy — This corpus states the law already: *duplication is camouflage — while one law is stated in two private corners, nothing can show a THIRD place is missing it.* It has paid for it…"
atomPath: "rules/copy"
coordinate: "rules/copy · 5/round · 55a05b9a"
contentUuid: "75a37386-8418-5374-a3d7-7e70cdd23234"
diamondUuid: "15fca5b1-a572-8148-8a58-40caabe0e1c5"
uuid: "55a05b9a-d3fd-869b-981c-babddcc91a58"
horo: 5
typography:
  partition: rules
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "86c668c7-21f4-8d34-8025-af90e881f2a3"
  stages:
    - stage: path
      stageUuid: "d82d2c62-1ae9-86e1-bad6-7da93650e4b2"
    - stage: trinity
      stageUuid: "80088271-6afa-8d2a-82c3-7dc7c7b507eb"
    - stage: boundary
      stageUuid: "e9a38fb2-02f1-86c7-88ef-57a6ec4e15ef"
    - stage: links
      stageUuid: "a5a9accf-028f-8623-bbbd-05f0f08d970d"
    - stage: horo
      stageUuid: "0d6d087b-fed8-8d9b-8d97-a2985b0ff75c"
    - stage: seal
      stageUuid: "756a028c-a9e5-86e1-93d5-ccfcd14a267e"
    - stage: uuid
      stageUuid: "92b688ef-307b-84bb-a10d-05884ceac9e2"
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

## The first fold, and why it ran that direction

`pivotSkillMd` stood twice at **65 AST nodes** — `law/folder/word.ts:597` and
`navigation/distribute.ts:111` — byte-identical template literals, and `unearnedCopies` reported
**both** sites un-folded: written twice, neither called more than once.

Two checks before the cut, both of which this atom demands:

- **What does the body close over?** Nothing. It is a pure function of `(hub, leaf, facet)`, so the
  AR/AP lesson — identical text over different constants — does not apply here. That check is the
  human's, and it is the reason `rules/copy` reports candidates rather than applying them.
- **Which way does the fold run?** `distribute` already imports from `law/folder/word`, so folding
  onto `word` adds **no import edge**; the reverse would have closed a cycle ([[rules]]/cycle).
  A DRY fix that creates a tangle trades one law for another.

duplicate bodies **13 → 12**, unearned copies **8 → 7**, tangles unchanged at 13. Both ceilings
ratcheted in the same commit ([[rules]]/slack), and `copy` came down from 19 to its live 12 — a
hand-written baseline, which the slack axis does not read, so it had been sitting seven above the
tree for some time.

## Access policies — the sub-floor case, where a copy matters at any size

`minNodes` is declared at 40 and that floor is correct for ordinary bodies. It is **wrong for an
access policy**, whose body is routinely one line — and that is not hypothetical:

| the policy | where it was | how the floor hid it |
| --- | --- | --- |
| `neverDelete` = `() => false` | privately in **4** statutory collections | 1 node |
| `auditTrailModifyDenied` = `() => { return false }` | a **5th** copy | 1 node, and braces changed the text |
| `auditTrailCreate` = `isSuperAdmin(req.user)` | a 2nd `superAdminOnly` | 2 nodes |
| `adminOnly` · `userIsSuperAdmin` | diverged 2nd bodies in `plugins/auth/access` | small, and unused |

So `accessPolicies` is exempt from the floor, and a policy is identified by **Payload's own type
annotation** — `const X: Access` or `const X: FieldAccess` — parsed, never guessed.

`policyAddresses` groups by `family + hash`. Three refusals keep the number honest, and each one was
a false positive this gate reported before it was narrowed:

- **`Access` and `FieldAccess` are different interfaces.** `superAdminOnly: Access` and
  `fieldAccess: FieldAccess` share a body and satisfy two different contracts; grouping by hash
  alone reported them as a copy. They are not.
- **`{ return x }` and `x` are the same policy.** The 5th `neverDelete` hid behind a pair of braces.
  A single-return block is normalised to its expression, or content-addressing measures syntax
  instead of meaning.
- **One name in two atoms is not a copy.** `updateAndDeleteAccess` exists in `tenants/access` and
  `users/access` with genuinely different bodies — one filters by `id`, the other by
  `tenants.tenant` and grants self-access. A first draft of this gate flagged that as shadowing,
  which is exactly the population [[rules]]/face measured and **refuted** (156 matches, dominated by
  Next's `POST` convention and per-atom `translations`). The path is the message: two atoms may
  honestly name their own collection's policy alike, so that half was dropped rather than shipped
  as noise.

Zero is a **theorem**, not a ratchet: a rule a reviewer must trust may not be a coin flip between
two bodies. Registered as the `policy-address` guardian, so it is a wall rather than this paragraph.

**Honest boundary.** This proves a policy body is **written once**, never that it is **correct** or
called in the right place — an alias is trusted, a policy assembled by a factory or returned from a
higher-order helper has no `: Access` annotation to find, and the 123 collection access legs whose
value is not an object literal are outside it.

**Law — [[law]]: the same body at two addresses is one implementation and one decoy. Content-address
every body; where two agree, one of them is unmaintained and nobody knows which.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change must be made once, not once per copy.

Composes: [[rules]]/unfolded · [[rules]]/collapse · [[syntax]] · [[law]].
