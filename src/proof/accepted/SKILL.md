---
name: accepted
description: "Use when reasoning about accepted — erpax carries Lean under . **Nothing ran it** — no CI lane, no npm script, no import. Asked, the kernel answers:"
atomPath: "proof/accepted"
coordinate: "proof/accepted · 2/share · 7aab0d99"
contentUuid: "3a1ee311-8a1f-54a2-bee9-fba8917732e0"
diamondUuid: "af074dc6-bf98-8e0a-a45c-c67bb89b6285"
uuid: "7aab0d99-2913-8528-b8f3-afdd991554f4"
horo: 2
typography:
  partition: proof
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "629cf410-2a5e-834c-b952-690cd774eb08"
  stages:
    - stage: path
      stageUuid: "00eab6e1-8f8e-86a6-8217-2f2f56cd3d5f"
    - stage: trinity
      stageUuid: "664d1b00-6be1-8572-9637-0a91c9297f79"
    - stage: boundary
      stageUuid: "4cc27893-918e-89bc-bb76-37cd0a0eb6be"
    - stage: links
      stageUuid: "1c67d0bb-f3ca-8253-bd7e-f26e44f4ee8f"
    - stage: horo
      stageUuid: "01ac40c0-77a9-86e8-b3ed-850d5c5ef1e3"
    - stage: seal
      stageUuid: "27d3eea6-ec59-81cc-8d02-c10fabfe105b"
    - stage: uuid
      stageUuid: "0af3ece7-ac5d-85e3-a093-4533f25f27df"
version: 2
---
# proof/accepted — four of five `.lean` files in a directory named `verify` are not proofs

erpax carries Lean under `src/verify/lean`. **Nothing ran it** — no CI lane, no npm script, no
import. Asked, the kernel answers:

| file | kernel | declarations using `sorry` |
| --- | --- | ---: |
| `Main.lean` | **rejected** — unresolved import | `quantum_system_correct` · `system_safety` · `system_liveness` |
| `Wave.lean` | **rejected** — parse error | 6, incl. `doi_uniqueness` · `ledger_append_only` |
| `Automate.lean` | **rejected** — instance failure | 2 |
| `Orchestrate.lean` | accepted | **4** |
| `Mirror.lean` | accepted | **0** |

`theorem quantum_system_correct`, proved by `sorry`. `doi_uniqueness`, proved by `sorry` — in the
same corpus where [[rules]]/forge found three sites minting `10.5281/zenodo.${Math.random()}` and
logging `[ZENODO] Publishing` with no network call. The Lean asserted uniqueness of an identifier
the TypeScript was fabricating, and neither knew about the other because **nobody ran either**.

## The case most likely to read as success

`Orchestrate.lean` **compiles**. A gate reading only the exit code calls that a pass — and the
kernel is telling you, in its own output, that four declarations are unproven. So this reads the
compiler's `declaration uses 'sorry'` warnings rather than the exit status.

And it counts them **from the compiler**, never by grepping the source: a comment saying *"no
sorry"* contains the word. That false positive was paid for separately by three sibling repos in one
day, and this atom's own Lean file trips it — its docstring says *"No sorry"*.

## A gate with no verifier must not report green

`assertProofsAccepted` **throws when no Lean kernel is present**, rather than passing an empty
check. That is not defensive coding; it is the defect this corpus spent a day on — a check that
cannot fire reads exactly like a check that passed, and the confirm hook failed open for weeks that
way ([[rules]]/command).

The proof beside this asserts the refusal on *every* machine: where a kernel exists the assertion
runs for real, and where it does not, the refusal itself is what is checked.

**Honest boundary.** This proves a file is **kernel-accepted and sorry-free**. It does not prove the
theorem is *interesting*, that its statement says what its name suggests, or that it is not a
tautology — a sibling's `decide (0 = 0)` under a Clay-problem name passes every check here, and only
reading it caught that. It also says nothing about `axiom` declarations beyond what the kernel
reports; `#print axioms` per theorem is the finer instrument and is not automated here.

**Law — [[law]]: a proof is what the kernel accepts. A file carrying `sorry` states a theorem and
proves nothing, a file that does not compile states nothing at all — and a directory named `verify`
holding either is the strongest form of a claim that cannot be contradicted.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: an unproven declaration cannot be relied on.

Composes: [[proof]] · [[duality]]/mirror · [[rules]]/refutable · [[law]].
