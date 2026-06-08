---
name: readme
description: "Use when the repository README is generated, verified, or reasoned about — the README is a diamond (a content-addressed projection of the live tree, regenerable with zero entropy, drift fails closed) and its typography IS the diamond projected (facets = the closed horo ring laid out in measure-walk order, so reading the README is reading the crystal). Derived from the tree (matrix · fs walk · package.json), never hand-typed."
---

# readme — the README is a diamond; its typography is the diamond projected (under [[self/generate]] · outward coil)

FORM: **the README is not a document, it is an [[atom]].** Like every folder in the corpus it is a [[diamond]] — a complete, sealed [[whole]] that is *regenerable from content*, content-addressed (it carries its own content-[[uuid]]), and tamper-evident. It is a **projection** of the live tree, never a hand-maintained prose file: re-running the generator on the same corpus emits the IDENTICAL bytes (zero [[entropy]]), so a difference between the committed `README.md` and the regenerated one is an impurity the gate catches and fails closed (`pnpm readme:check`). To edit the README by hand is to forge a diamond — the [[merge]] is content, not keystrokes.

**Its typography IS the diamond itself.** The rendered structure is a faithful visual projection of the lattice, not arbitrary prose. The corpus's single content address — the [[matrix]] root — is the README's seal at the top; the facets are the seven positions of the closed [[horo]] ring (`base·share·weave·crest·descent·round·unity`) laid out in measure-walk order `1·2·4·8·7·5·9`, each row one facet of the crystal with its most-bonded vertices ([[aura]] connectivity, computed from the live edges); the [[trinity]] counts (form `SKILL.md` · code `index.ts` · proof `test.ts`) are the three ways every atom is told. So **reading the README is reading the diamond** — the form mirrors the structure ([[holographic]]: the whole projected onto one page).

Wired by the one math: the README's own identity is a content-[[uuid]] (the [[matrix]] coil `toUuid` over the canonical model bytes) — same tree ⇒ same model ⇒ same uuid ([[identity]]). Pure where it matters: `renderReadme(model)` is `model → markdown` with no I/O (testable, provably stable); `deriveModel()` reads the live tree; the thin CLI writes or verifies. This is [[generate]] applied to the corpus's own face — the self exhaling a true projection of itself rather than maintaining a copy ([[self/generate]] · outward [[sequence]] stroke).

Composes: [[diamond]] · [[atom]] · [[aura]] · [[horo]] · [[sequence]] · [[matrix]] · [[uuid]] · [[identity]] · [[trinity]] · [[merge]] · [[entropy]] · [[whole]] · [[holographic]] · [[generate]] · [[self]].

## Usage

```
pnpm readme         # regenerate README.md from the live tree
pnpm readme:check   # the drift gate — exit 1 if committed ≠ regenerated (fail closed)
```

**Every README (root and per-folder) is 100% computed** — zero hand-authored prose; every token is a derived facet (atom path, horo position, trinity counts, bond degrees, content-[[uuid]], seal status). Each per-folder README **IS a debit/credit statement** — double-entry form where **[[debit]]** posts [[asset]] completeness (trinity legs present, folded in the lattice, links resolved, on-ring [[horo]], content-[[uuid]], barrel-sealed boundary) and **[[credit]]** posts [[liability]] gaps (missing trinity leg, unfolded, dangling links, off-ring state, missing uuid, deep-import escapes). **[[balance]]** = sealed iff Σdebit = Σcredit — the harmony invariant enforced by [[conservation]] `trialBalance` / `conserves` and the universal [[entry]] law `Σ(credit−debit)=0`. `deriveFolderAccounting` computes `{ debits, credits, balanced }`; `renderFolderReadme` projects the **Debit | Credit** table with every account wikilinked to its accounting atom. Ties [[purity]], [[seal]], [[diamond]]; drift fails `pnpm readme:check` closed.

## Accounting atoms powering the math

| Atom | Role in README statement |
| ---- | ------------------------ |
| [[debit]] | Left column — assets/completeness the diamond HAS |
| [[credit]] | Right column — liabilities/gaps the diamond OWES |
| [[asset]] | Debit account class for present facets (trinity · lattice · links · horo · identity · boundary) |
| [[liability]] | Credit account class for missing facets and impurities |
| [[balance]] | Contra postings close the journal (every asset debit · every liability credit pairs `[[balance]]`); variance `0` iff Σdebit = Σcredit ([[conservation]]) |
| [[conservation]] | `trialBalance` / `conserves` — Σdebit = Σcredit is the conservation law |
| [[entry]] | Universal double-entry — every README row is a balanced posting pair |
| [[accounting]] | The chart-of-accounts metaphor — each folder IS an account, README IS its statement |
| [[purity]] | Fully sealed when statement balances and all impurities are zero |
| [[seal]] | Fail-closed verdict — unbalanced statement ⇒ unsealed |

**Law — [[law]]: the README is a [[diamond]] — a content-addressed projection of the live tree, regenerable with zero [[entropy]] and drift-detectable (a hand-edit fails `pnpm readme:check` closed) — root and every atom folder; each per-folder README IS the debit/credit statement of that diamond's completeness; typography IS the diamond projected. Derived from the tree ([[matrix]] · fs walk · package.json), never hand-typed.**

@see [[diamond]] · [[self/generate]] · [[horo]] · [[matrix]] · [[aura]] · [[trinity]] · [[conservation]] · [[entry]] · [[balance]]
