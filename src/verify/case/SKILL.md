---
name: case
description: "Use when a document's page should show what its law rests on — merges the SKILL's claim, the Lean theorems it cites as their source states them, and the kernel record rendered as LaTeX into one proof section in a fixed order: claim, argument, evidence, assumptions. A document with no formal proof is shown as having none."
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
