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
