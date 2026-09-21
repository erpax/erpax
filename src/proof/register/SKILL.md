---
name: register
description: "Use when reasoning about register — A theorem is only as strong as what it assumes. This asks the kernel, per declaration, and writes the answer down — is the arbiter, and it is **asked, never restated**."
atomPath: "proof/register"
coordinate: "proof/register · 1/base · 1262a4de"
contentUuid: "f0758d5c-0a05-5056-9772-c639d5372dcd"
diamondUuid: "5ef902bc-e6dd-845b-9751-1915f197fb3f"
uuid: "1262a4de-24d0-8b3c-a14c-dd6679ef3e9b"
horo: 1
typography:
  partition: proof
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "9f374f0c-ddbe-8d8a-854e-f7bcdd293de5"
  stages:
    - stage: path
      stageUuid: "cfc60e6f-7522-8225-a769-4433b06ac0ee"
    - stage: trinity
      stageUuid: "60765a26-8a68-8864-9995-2e23c5ce046f"
    - stage: boundary
      stageUuid: "ec06f5da-5d87-8fba-8af5-b0abc2125ce2"
    - stage: links
      stageUuid: "92d300f0-98d8-8363-922e-ce6870221bc9"
    - stage: horo
      stageUuid: "41408e68-fd13-8b76-aba8-3aa410813166"
    - stage: seal
      stageUuid: "555e4ce7-2af4-8c39-ac13-4331392d1197"
    - stage: uuid
      stageUuid: "1fe98408-63ad-8915-bece-6912f019f9f1"
version: 2
---
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
second one stops the next commit. Second, a standard written more than one way used to be counted
TWICE, to surface the corpus's own citation inconsistency. That cost a real discharge:
[[rules]]/bypass gates `ISO/IEC 27001 A.5.23` and could not discharge an atom citing
`ISO 27001 A.5.23`, because the key kept the publisher. `standardKey` now folds the section, the
gloss, the edition and the publisher — and the finding did not vanish with it. `spellingVariants`
reports it directly: **5 standards are written three ways each**, and one of them, `BCP‑47`, uses a
NON-BREAKING hyphen — a difference no reader can see ([[rules]]/inject's class, in a citation).

The clause deliberately stays in the key: folding `A.5.23` away would let one cloud-isolation gate
discharge the whole of ISO 27001. An over-discharge is a false green, and strictly worse than the
over-count it would fix.

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
