---
name: data
description: "Use when a Clay statement must be tested on public data rather than argued — every Millennium problem crossed with the perspectives the corpus reads it from (lens atoms, referrers and their standards) and, where a public dataset exists (LMFDB elliptic curves, Odlyzko's zeta zeros, OEIS primes), checked as a bounded witness; where none exists, refused with the reason."
atomPath: "millennium/data"
coordinate: "millennium/data · 5/round · 6024ae7e"
contentUuid: "91cf2ac2-fb53-536d-9c44-a2a5c1525a74"
diamondUuid: "19476ee3-d7fb-818f-946f-0d2544df55d7"
uuid: "6024ae7e-4c08-8a1d-afee-97e30e9d7af8"
horo: 5
typography:
  partition: millennium
  bondDegree: 61
standards: []
bindings: []
signatures:
  computationUuid: "63549fd9-d718-87e8-8700-5d765e402f82"
  stages:
    - stage: path
      stageUuid: "c399f25d-b6ec-8901-8eed-0ba5710b5260"
    - stage: trinity
      stageUuid: "52f61aaf-b8a1-841b-9d64-f9daea018c6a"
    - stage: boundary
      stageUuid: "016653f7-9aa2-8368-a98b-9c13b3b015ad"
    - stage: links
      stageUuid: "125c1922-ae90-81dd-8abf-afcf958bf5a0"
    - stage: horo
      stageUuid: "3dc48a93-ee29-87a8-abf9-13841ee5614d"
    - stage: seal
      stageUuid: "27b75a22-50c2-81b2-b220-8659ff113ff7"
    - stage: uuid
      stageUuid: "ff97c4d2-d7ea-84ab-8fe4-f7e25712cbfa"
version: 2
---
# millennium/data — the Clay statements, crossed from every perspective and tested on public data

The register ([[millennium]]) states each problem algebraically and says the corpus solves none. This
atom asks the next honest question: **what public data can each statement be held against, and from
which perspectives does the corpus read it?** The answer is a table with no empty cell — every problem
is either tested on a dataset or refused with the reason, and `coverageGaps()` is asserted empty.

## Tested — three formulas, three public datasets

| problem | formula | dataset | the witness |
| --- | --- | --- | --- |
| Riemann Hypothesis | `N(T) = (T/2π)·ln(T/2πe) + 7/8 + S(T)` | Odlyzko, first 100,000 zeros | the count of zeros below T matches the formula with `\|S(T)\| < 1` at every gap |
| Riemann Hypothesis | `∏_p (1 − p⁻²)⁻¹ = Σ_n n⁻²` | OEIS A000040, the primes | the Euler product over the listed primes meets the series within `2/P` — no π enters |
| Birch–Swinnerton-Dyer | `ord_{s=1} L(E,s) = rank E(ℚ)` | LMFDB `ec_curvedata` | `analytic_rank === rank` on every sampled curve, the disagreeing curves named |

A witness that holds is **consistency on a finite sample**; a witness that fails would be a
**counterexample on public data**, named curve by curve. Neither is a proof, and the register's
`corpusSolves: false` is untouched. The raw dataset text is content-addressed with `receiptAddress`
([[outward]]) so the figure a reader checks has the bytes it was computed from.

## Refused — four statements no dataset tests

P vs NP (a class separation has no instances), Navier–Stokes (regularity for all time is not a finite
flow record), Yang–Mills (lattice spectra are papers, not an API; existence is not a measurement),
Hodge (no public dataset of Hodge classes exists). Poincaré is solved; a theorem is not sampled. Each
refusal carries its reason so absence reads as a decision, never as a pass.

## Crossed from every perspective

`perspectives()` reads, per problem: the atoms its **lens** names — every wikilink resolved to a
SKILL on disk, with a dangling one reported as a dead citation — and the **referrers** of
`@/millennium`, found as `ImportDeclaration`s and carrying the standards each cites
([[rules]]/citation). A problem is then a row of views: lens atoms · referrers · dataset or refusal.

## Honest boundary

Unreachable is reported as unreachable — the live test logs it and asserts nothing, the canonical
precedent: an unasked question is not an answer. The datasets are DECLARED (`datasets()`,
`refusals()`), and a dataset the corpus does not know is a dataset it does not test. The samples are
what the APIs return without a credential — 200 curves, 100,000 zeros, 58 primes — so every "holds"
is bounded by that sample and says so in `witnesses`.

**Law — [[law]]: a statement the corpus cannot prove it can still hold against public data. Cross
each one with every perspective that reads it, test it on every dataset that can be reached, refuse
the rest by name — and let a failing witness be the one outcome the file exists to report.**

## References — cited, not conformed to

A paper is evidence for a formula, not a standard the corpus conforms to; proof/replaceable counts a `## Standards` row as an axiom until a gate discharges it, and no gate discharges Riemann.

- **Riemann 1859 · von Mangoldt 1905** — the zero-counting formula.
- **Birch & Swinnerton-Dyer 1965** — rank equals order of vanishing.
- **Euler 1737** — the product over primes equals the series.
- **ISO 19011:2018 §6.4** — audit evidence: the dataset is addressed beside the figure.

Composes: [[millennium]] · [[outward]] · [[rules]]/citation · [[law]].
