---
name: case
description: "Use when a document's page should show what its law rests on — merges the SKILL's claim, the Lean theorems it cites as their source states them, and the kernel record rendered as LaTeX into one proof section in a fixed order: claim, argument, evidence, assumptions. A document with no formal proof is shown as having none."
atomPath: "verify/case"
coordinate: "verify/case · 5/round · 3b172ac7"
contentUuid: "f1b2097a-44d4-58f7-98b2-ec5d012ca6a1"
diamondUuid: "2bd9f50f-4268-8e89-bfee-3b74bef8884f"
uuid: "3b172ac7-faf8-8ea5-88fb-bea518209314"
horo: 5
typography:
  partition: verify
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "956a74c5-f7f3-8b31-823b-fceb02b86cd4"
  stages:
    - stage: path
      stageUuid: "32245b27-300e-8bd2-915d-b18bd91517ef"
    - stage: trinity
      stageUuid: "90bf1db6-16ab-8930-bae8-260cb8f21830"
    - stage: boundary
      stageUuid: "096ead17-3986-8834-9e7a-0e782c0010c1"
    - stage: links
      stageUuid: "7b7ebe75-a57b-85db-87ca-a0be22112e96"
    - stage: horo
      stageUuid: "1b536333-e5ed-8efd-ae72-3dded9dfb03c"
    - stage: seal
      stageUuid: "128ad480-5073-8e24-8d6a-4c65595840b2"
    - stage: uuid
      stageUuid: "a30ca8ea-4cb0-8ac1-b183-16dc09f17fdb"
version: 2
---
# verify/case — every page shows its proof the same way

A page states a law. What the law rests on lived in three places: the claim in the SKILL, the
theorems in the Lean files, and the kernel's verdict in [[verify]]/inventory. This atom puts them
on the page, in one section with a fixed order, so no page can show its strong half and omit the
rest.

| part | what it is | where it comes from |
| --- | --- | --- |
| **Claim** | the document's own law sentence | `lawOf` reads it from the SKILL |
| **Argument** | each theorem, as Lean states it | `statementsOf` reads the cited `.lean` files |
| **Evidence** | the kernel record for those files, as LaTeX | [[verify]]/latex `render`, restricted by `restrict` |
| **Assumptions** | axioms used, refused files, stubs, unknown citations | the same record |

`caseMarkdown` builds the section, `withCase` appends it once, and `corpusCase` does both for an
atom of a checkout. [[seed]]/content/load reads every document through it, so a loaded page
carries its proof.

## Three refusals

- **Nothing is re-typed.** A theorem is shown only if the kernel reported it, and its statement is
  the text between `theorem` and `:=` in the source. A theorem that is in the file and not in the
  record is left out.
- **A test is not a proof.** A document that cites no Lean file says "no formal proof is cited"
  and counts its test cases as weaker evidence. It is never shown as proved.
- **No empty frame.** A document with no law, no cited proof and no tests gets no section at all:
  a heading with nothing under it would read as a proof.

## Measured, 2026-11-13

| pages | count |
| --- | ---: |
| showing a Lean proof | 15 |
| showing evidence by test only | 3,484 |
| with nothing to show | 149 |
| citing a Lean file the kernel record does not hold | 1 |

**Honest boundary.** The order — claim, argument, evidence, assumptions — follows the assurance
case of ISO/IEC/IEEE 15026-2 as the author recalls it; the standard's text was not consulted, and
no standard prescribes how a proof is laid out on a web page. Notation is whatever the Lean source
uses; nothing here translates a statement into ISO 80000-2 mathematical notation. The LaTeX is
carried as a code block, not typeset. A citation is found by the file's name appearing in the
SKILL, so a document that rests on a theorem without naming its file is shown as test-only. And
the section proves that a theorem was checked, never that it is the right theorem for the claim
above it — that reading is the reader's.

**Law — [[law]]: a page that states a law shows what it rests on, in the same four parts every
time — and says so plainly when the answer is "tests, not a proof".**

Composes: [[verify]]/latex · [[verify]]/inventory · [[seed]]/content · [[law]].
