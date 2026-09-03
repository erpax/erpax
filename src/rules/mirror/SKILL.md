# rules/mirror — a proof that restates its own definition is not evidence, and evidence is a legal word

```ts
export const atomPath = 'acceptance'      // index.ts — a human typed this
expect(atomPath).toBe('acceptance')       // test.ts  — and this certifies the typing
```

That assertion cannot fail for any reason a reader cares about. Change the constant and the test
changes with it. The only thing it forbids is a compiler that has stopped working — and it is
counted, by every gate in this corpus, as a **proof**.

| | count (2026-09-04) |
| --- | ---: |
| `test.ts` files scanned | 1,417 |
| **assertions restating a literal their own module assigns** | **507** |
| atoms holding at least one | 188 |
| **of those, citing a standard or a statute** | **25** |

## Where it was found, and why that matters more than the number

A sibling repo reported that it claims no Millennium Prize problem is solved, and said so
*"measured three ways"*: `provenHere = 0` is a `def`; a theorem `decide`s that it equals 0; and
seven per-problem propositions carry it as a conjunct. **Three readings of one hand-typed literal
is not triangulation.** The kernel obliges because `decide (0 = 0)` is true. Nothing in that chain
touches a Clay problem.

The reflex was to flag it there. The correct move was to look here — and erpax had the same defect
**507 times**. A finding you only apply to someone else's tree is not a finding.

**This is the dangerous direction.** A mirror is not a weak test; it is a test wearing the
credibility of a real one. It is green, it is fast, it completes a trinity, and it satisfies every
gate that counts proofs. [[rules]]/refutable asks whether a claim *can* be contradicted. This asks
the sharper question: **whether the thing standing beside it as evidence is evidence at all.**

## The legal edge — 25 of them stand under a signature

ISO 19011 §6.4 does not ask for a citation, it asks that the citation **lead to the evidence**.
SOX §302 is a natural person's certification that a report contains no untrue statement of material
fact. Наредба Н-18 requires the software to be inspectable. Twenty-five atoms carrying a mirrored
assertion also cite a standard or statute — `accounting/proof`, `audit/agent`, `currency`
(ISO-4217), `identity` (ISO-3166-2), `peppol/bis/3/types` (EN-16931), `deploy/fold` (§5.5
testability). In those atoms the sentence *"this is proven"* is addressed to a reader who signs,
and the proof beside it restates a constant.

A corpus that states its own honesty and props it on a mirror has produced the exact artefact it
exists to prevent: **a false statement that reads as verified**. That is not a style defect. It is
the thing the standards name.

## Parsed, never matched

The receiver must be the identifier itself and the expected value the **same literal text**.
`expect(NAME.length).toBe(3)` is a real claim about a real property and is not flagged.
`expect(NAME).toBe(OTHER)` compares two things and is not flagged. `expect(n).toBe(2)` where
`n = [1,2].length` is computed, not typed, and is not flagged. Only the exact mirror counts —
otherwise this gate would be another instrument whose noise floor sits above its signal.

**Honest boundary.** This proves an assertion is **vacuous**, never that the atom is untested — a
mirror can sit beside six real assertions in the same file, and 188 atoms holding one is not 188
untested atoms. It reads `export const` literals in the sibling barrel only; a constant re-exported
from a child, or asserted through an object property, is invisible to it. And a non-vacuous test
can still be a bad test. It closes the case where the evidence is definitionally incapable of
saying no.

**Law — [[law]]: a proof must be able to fail. An assertion that repeats the literal its own module
assigns certifies the assignment and nothing else — and where such an assertion stands under a
claim addressed to someone who signs, the corpus is not merely untested, it is asserting evidence
it does not have.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: a case that cannot fail cannot be tested.
- **SOX §302** — the certifying officer is a natural person.

Composes: [[rules]]/refutable · [[rules]]/audience · [[syntax]] · [[law]].
