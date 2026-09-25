---
name: accepted
description: "Use when reasoning about accepted — erpax carries Lean under . **Nothing ran it** — no CI lane, no npm script, no import. Asked, the kernel answers:"
atomPath: "proof/accepted"
coordinate: "proof/accepted · 7/descent · 00e5089d"
contentUuid: "9fc6341d-b76f-5901-b120-79a203ea7a80"
diamondUuid: "82241ac8-fc1d-86cb-829c-d7d5cea72e4e"
uuid: "00e5089d-bd4e-8557-bd70-21a0fc49050f"
horo: 7
typography:
  partition: proof
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "d7ccb941-e2c9-8939-befe-393bedd42afd"
  stages:
    - stage: path
      stageUuid: "00eab6e1-8f8e-86a6-8217-2f2f56cd3d5f"
    - stage: trinity
      stageUuid: "664d1b00-6be1-8572-9637-0a91c9297f79"
    - stage: boundary
      stageUuid: "4cc27893-918e-89bc-bb76-37cd0a0eb6be"
    - stage: links
      stageUuid: "a2c3cfba-f3c6-8ed6-b2f0-e26301dcb4cb"
    - stage: horo
      stageUuid: "92f9e3d3-d8dd-8270-ab72-390169dfbf22"
    - stage: seal
      stageUuid: "27d3eea6-ec59-81cc-8d02-c10fabfe105b"
    - stage: uuid
      stageUuid: "6be3a07a-440b-88e5-b339-3c6c28c0e771"
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

## Two of them were never rejected — the kernel was never asked

`kernelVerdict` ran `lean <file>` in the file's own directory with no `LEAN_PATH`. Lean 4 resolves
`import X` from a **compiled** `X.olean` on that path, never from a sibling `X.lean`, so every file
that imported anything was reported as unaccepted. Two were:

```
Cross.lean:20:0: error: unknown module prefix 'Arrival'
Main.lean:22:0: error: unknown module prefix 'Orchestrate'
```

`Arrival.lean` and `Orchestrate.lean` **both exist, beside the files importing them.** Compile the
imports depth-first and set the path, and both check clean with zero `sorry`.

That is [[rules]]/command's law read the other way. That atom says a gate which cannot run reports
the same green as one that passed; this is the dual — a gate which cannot run reported the same RED
as one that failed, and a false alarm in a verification gate spends exactly the attention a real
rejection deserves. `unresolved` now separates the two verdicts, so a missing module still fails
(it is a genuine dead reference) while being named as a different thing from a refused proof.

The ceiling is **0**, ratcheted in the commit that earned it ([[rules]]/slack).

Composes: [[proof]] · [[duality]]/mirror · [[rules]]/refutable · [[law]].
