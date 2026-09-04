# proof/register — the axiom index: what every theorem in this corpus actually rests on

A theorem is only as strong as what it assumes. This asks the kernel, per declaration, and writes
the answer down — `#print axioms` is the arbiter, and it is **asked, never restated**.

| | (2026-09-04) |
| --- | ---: |
| theorems interrogated | 39 |
| **resting on nothing at all** | **33** |
| resting on `sorryAx` — proved nothing | **4** |
| resting on Lean's own axioms only | 2 |
| axioms this corpus declares | 2 |
| foreign axioms | **0** |

## What the index found that the compiler warnings did not say twice

`sorryAx` is the kernel's own marker for a proof that was never given, and it appears as an
**axiom** of four `Orchestrate` declarations. [[proof]]/accepted reaches the same four by reading
`declaration uses 'sorry'` warnings; this reaches them through **dependency**. Two instruments,
opposite directions, one answer — either alone would be a single reading.

The rest of the dependency set is Lean's own and unremarkable: `propext` (4), `Classical.choice`
(2), `Quot.sound` (2). **No foreign axiom** — nothing arrived from a library this corpus does not
name.

## A declared axiom used by no theorem is a register entry, not a dependency

`Erpax.one_law` and `Erpax.audience_weight` are declared in the open and **used by nothing**. That
is the honest shape for them: *zero entropy ⇒ infinite tamper-cost* has no `Nat` for "infinite", and
ISO 19011 §6.4 / SOX §302 are facts about the world. Proving a weakened finite version and calling
it the law would be the tautology a sibling repo removed the same day. They are recorded as
assumptions so a reader meets them, not smuggled into a proof so a reader does not.

## A standard is an axiom until a gate discharges it

The kernel's axioms are the small half. This corpus cites ISO, RFC, WCAG, W3C and statute across its
atoms, and **every such citation is an assumption about the world** — a premise, not a result. What
turns one into a theorem is a gate: an `assert…` that fails closed when the standard is violated.
Until then the atom asserts conformance and nothing can contradict it.

| | (2026-09-04) |
| --- | ---: |
| distinct standards cited | 269 |
| **discharged by a fail-closed gate** | **21** |
| **assumed — cited with nothing enforcing them** | **248** |

The most-cited are split both ways: ISO/IEC 25010 (55 atoms) and ISO 19011 (43) are discharged;
**WCAG 2.2 (29 atoms), WHATWG HTML (6), WAI-ARIA (5) and W3C HTML5 (5) are assumed.** Nothing in
this corpus fails closed on an accessibility criterion, and twenty-nine atoms cite one.

The literature reaches the same split from the other side — process requirements extracted from
standards and translated into logical axioms — and names the hard part exactly: bridging a
machine-checkable witness to evidence an auditor accepts. This measures that bridge; it does not
build it.

**Two honest limits on this count.** `hasGate` looks for an exported `assert…`, so an atom whose
PROOF exercises a standard without exposing a gate — every `blocks/form/*` atom checks its WCAG
label binding in `test.ts` — is counted as *assumed*. The number is therefore a conservative floor
on what is discharged, and deliberately so: a test is evidence, a gate is enforcement, and only the
second one stops the next commit. Second, `ISO-19011:2018` and `ISO 19011:2018` are counted as two
standards because the citations are written both ways; that is a real inconsistency in the corpus's
own citation format, surfaced here rather than normalised away.

## "Could not ask" is not "rests on nothing"

Three files do not compile, so their theorems were never interrogated — reported as **UNASKED**, on
their own line, never folded into the axiom-free count. That distinction is the whole discipline:
a check that cannot fire reads exactly like a check that passed, and an index that quietly counted
an unaskable file as clean would be that defect wearing a scholar's hat.

For the same reason `axiomRegister` **throws** when no Lean kernel is present. An index of guesses
is worse than no index.

**Honest boundary.** This reports what the kernel says a theorem depends on. It does not judge
whether the theorem is *interesting*, whether its statement means what its name suggests, or whether
a `decide` over a finite family generalises — a sibling's `decide (0 = 0)` under a Clay-problem name
would appear here as axiom-free, and only reading it caught that. Axiom-free is a floor, not a
verdict.

**Law — [[law]]: every theorem declares what it rests on, and the kernel is asked rather than
quoted. An assumption named in a register can be argued with; the same assumption inside a proof
cannot be seen — and a theorem nobody could interrogate is not axiom-free, it is unexamined.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: an unproven declaration cannot be relied on.

Composes: [[proof]]/accepted · [[duality]]/mirror · [[rules]]/refutable · [[law]].
