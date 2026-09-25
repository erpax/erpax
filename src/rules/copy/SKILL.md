---
name: copy
description: "Use when reasoning about copy — This corpus states the law already: *duplication is camouflage — while one law is stated in two private corners, nothing can show a THIRD place is missing it.* It has paid for it…"
atomPath: "rules/copy"
coordinate: "rules/copy · 5/round · 86b36fb1"
contentUuid: "115d78dd-4df3-56a8-b5a1-ebc3c454fe40"
diamondUuid: "5ef1b39e-5adb-8504-a394-25c3165638db"
uuid: "86b36fb1-19b8-87f8-9c85-bdff9f3966a1"
horo: 5
typography:
  partition: rules
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "2480b24c-3540-89f2-b819-11e4028e0e19"
  stages:
    - stage: path
      stageUuid: "d82d2c62-1ae9-86e1-bad6-7da93650e4b2"
    - stage: trinity
      stageUuid: "80088271-6afa-8d2a-82c3-7dc7c7b507eb"
    - stage: boundary
      stageUuid: "45176da6-5cb1-8ba5-89fb-5ca551cad96c"
    - stage: links
      stageUuid: "94ac95ae-f176-8fde-8e17-fc8017f80b9f"
    - stage: horo
      stageUuid: "8591d24d-f303-82f5-88f5-4fd77926419b"
    - stage: seal
      stageUuid: "756a028c-a9e5-86e1-93d5-ccfcd14a267e"
    - stage: uuid
      stageUuid: "0fda636b-a8d4-8386-914e-6c499b684274"
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

## Formulas — one formula, one address, and a coincidence is not a copy

`minNodes` hides a whole class: a formula is one expression, far below 40 nodes. Content-addressing
the **shape** — the expression with parameters normalised to `$0`, `$1` — found 8 groups across 95
single-expression formulas, and the split is the interesting part.

**Seven were one formula written seven times**, and they are folded:

| shape | written as |
| --- | --- |
| `exactRound($0 * 1000) / 1000` | `roundTo3` (accounting/balance) · `ROUND` (accounting/gaps) · `round3` (book/harmony-index) · `roundBits` (entropy) · `roundEb` (readme/entropy) |
| `exactRound($0 * 100) / 100` | `round2` (signal) · `round2` (speech/computed) |
| `(1n << BigInt(architectureBits())) - 1n` | `architectureMask` in **both** book/compute and quantum/word |

`roundTo(n, decimals)` now lives once in [[algebra]], beside `exactRound`, and each atom's local name
points at it — so the call sites did not move and the formula has one address.

### A bare operator is not a formula

`$0 * $1` matched **five** atoms: `standingStock` · `trophicTransfer` · `emissionFromActivity` ·
`energyJoules` · `consultProfit`. `energyJoules = h·f` and `consultProfit = rate·hours` share
multiplication and **no physics**. A shape whose every operand is a parameter is refused — the
expression-level form of the floor `minNodes` gives bodies, and without it this gate's noise sits
above its signal, which is the failure this corpus has paid for four times.

### Two shapes that coincide, and must NOT be folded

This is the sharper half, and the reason the gate declares rather than sweeps:

| shape | the two theorems |
| --- | --- |
| `$0 / 2` | **`birthdayLog2`** counts CLASSICAL collisions in a space of size 2^d; **`groverPreimageLog2`** counts QUANTUM queries for a preimage. One exponent, two derivations, neither implying the other. |
| `bound() / $0` | **`conjugate`** is Δx·Δp ≥ ℏ/2, **`linewidth`** is ΔE·Δt ≥ ℏ/2 — one inequality read over two conjugate pairs. |

Folding either would erase a real cross-domain fact and, worse, remove the two sides' ability to
move independently when a model changes: if the quantum floor stopped being d/2, a folded
`birthdayLog2` would silently follow it. **A cross formula explains a cross-domain problem precisely
because the two domains meet at the same expression by different routes** — that meeting is the
content, and it survives only while both names do.

`COINCIDENT_FORMULAS` declares each pair with the reason it is a coincidence, in the open, so the
exemption is arguable. Registered as the `formula-address` guardian at 0 — a theorem, not a ratchet.

**Honest boundary.** This reads single-expression arrow functions only: a formula in a block body,
spread over two statements, or folded into a larger function is invisible to it. Shape equality is
not semantic equality — two formulas can differ in shape and compute the same thing (`d/2` and
`d*0.5`), which this will never see. And a declared coincidence is a human judgement, which is why
each one carries its argument rather than just an exemption.

**Law — [[law]]: the same body at two addresses is one implementation and one decoy. Content-address
every body; where two agree, one of them is unmaintained and nobody knows which.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change must be made once, not once per copy.

Composes: [[rules]]/unfolded · [[rules]]/collapse · [[syntax]] · [[law]].
