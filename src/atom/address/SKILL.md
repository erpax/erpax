# atom/address — ask the filesystem, and the assertion can fail again

```ts
export const atomPath = 'body/abdomen'          // index.ts — typed by a human
expect(atomPath).toBe('body/abdomen')           // test.ts  — and confirmed against itself
```

Four hundred and fifty-three assertions in this corpus had that shape ([[rules]]/mirror). Each was
green, fast, and counted as a proof by every gate that counts proofs. None of them could fail for
any reason a reader cares about: change the constant, and the assertion changes with it.

They were not deleted. **They were asking a real question badly.** An atom's declared name is a
claim about *where it lives*, and where it lives is a fact — so the same line, pointed at the
filesystem instead of at itself, becomes a theorem:

```ts
expect(atomPath).toBe(atomAddress(import.meta.url).path)
```

Perturbing `PART` by a single letter now reddens `src/body/abdomen`. Before the rewrite, the same
edit was invisible — the proof simply changed with it.

| | (2026-09-04) |
| --- | ---: |
| mirrored assertions before | 507 |
| convertible to an address claim | **453** |
| refused — not an address (`INDEX = 5`, `POLE = 9`, `ENTROPY_CURRENCY_NAME`) | 54 |
| files rewritten, by manifest | 144 |

## Four fields, because collapsing two of them is how a mistake survives a hundred green tests

`leaf` · `parent` · `path` · `specifier` · `canonical`. The last two look interchangeable and are
not: a facet **re-exports the canonical atom**, so `body/auto` points at `@/auto`, never at its own
`@/body/auto`. The first pass conflated them, and **12 rewritten proofs went red immediately** —
correctly. At a root atom `leaf` and `path` coincide, so the conflation reads right in 32 cases and
is wrong in 12. That is the exact shape of a defect that survives review: correct wherever anybody
looks first.

The test that caught it now pins it.

## A manifest, never a sweep

595 ops planned before a byte moved, each carrying its reason, anchored on the whole line so a
repeated line refuses rather than cutting twice ([[rules]]/manifest). Zero refusals, applied in four
batches with the ring between them. The import was added once per file, anchored on the `vitest`
import every proof already has.

**Honest boundary.** This proves a declared name agrees with the atom's **location** — never that
the name is the *right* name, and never that the atom does what it says. `[[rules]]/mirror`'s
remaining 55 are the honest residue: an `INDEX` of `5` or a currency code is not an address, and no
theorem derives it from the tree. Those need a human to decide what would refute them, which is the
point at which a gate stops and a judgement starts.

**Law — [[law]]: a constant that names a place must be checked against the place. An assertion that
confirms a value from the same file that assigns it certifies the assignment; pointed at the
filesystem, the identical line becomes refutable — and the difference between the two is the whole
difference between evidence and decoration.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a case that cannot fail cannot be tested.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[rules]]/mirror · [[rules]]/manifest · [[path]] · [[scalpel]] · [[law]].
