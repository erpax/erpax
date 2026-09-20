# verify/latex — a document and a kernel record that cannot disagree

The rendering is generated from [[verify]]/inventory, so it cannot drift. What matters is the other
direction: **a document may quietly omit** the theorems that carry axioms, or the files the kernel
refused, and read as a clean record of a dirty run.

So the pair is checked as a **bijection in three directions**:

| direction | what it forbids |
| --- | --- |
| document → record | naming a theorem the kernel never reported |
| record → document | dropping a theorem the kernel did report |
| record → **leads** | listing a theorem in the table while hiding it as an open end |

Prose can then be wrong *about* a theorem. It cannot be **silent** about one.

## The third direction is the one that matters

The sharpest test plants the lie precisely: take a correct document, keep **every theorem row**, and
delete only the `LEAD-` rows. The theorem round-trip is perfect, `missingFromDocument` is empty —
and `agrees` is still **false**, because `hiddenLeads` names what was tidied away.

A document that lists proofs and not their open ends is a clean account of whatever the run
happened to be.

## The hash ties the pair to bytes

The header carries `% sources <hash>` — the content hash of the `.lean` files the kernel actually
read. A document describing a different tree is **detectable rather than merely unlikely**, which is
the same construction [[verify]]/inventory uses to make its record stale by construction.

Leads are ordered by what it costs to believe the claim: **stubbed** (asserted, unproved), then
**refused** (no evidence at all), then **axioms** (proved, and leaning on something). Live today:
66 leads, all `axioms` — `propext` and `Quot.sound`, Lean's own foundations. **0 stubbed, 0 refused.**

**Honest boundary.** This proves the document and the record **name the same theorems**, never that
either is **true** — the kernel decides that, and this only refuses a document that disagrees with
what the kernel said. It compares names, so a row whose *axiom column* is wrong passes; the hash
catches a stale tree but not a mislabelled cell. And it reads the rendered text, so a document
built by another route is judged the same way — which is the point.

**Law — [[law]]: a rendering of a proof must be a bijection with the proof, leads included. A
document may be wrong about a theorem; it may never be quiet about one.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[verify]] · [[verify]]/inventory · [[rules]]/mirror · [[law]].
