---
name: replaceable
description: "Use when reasoning about replaceable — erpax cites ISO, RFC, WCAG and statute across 219 atoms. **Every one of those citations is an assumption about the world until something can contradict it.** What turns a citation…"
atomPath: "proof/replaceable"
coordinate: "proof/replaceable · 2/share · 880c0822"
contentUuid: "51c08969-ad15-56f0-903b-b58636f7ccc2"
diamondUuid: "cdfc06b1-2e44-8fc0-97ec-5c52a124ff92"
uuid: "880c0822-0217-8cd9-b2b7-fac781ec967e"
horo: 2
typography:
  partition: proof
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "acb4596b-c4ba-895a-8630-96e8976329dd"
  stages:
    - stage: path
      stageUuid: "5f5c9b89-d5ca-8eec-8edb-3eaaddac934c"
    - stage: trinity
      stageUuid: "258ef1c5-f44d-8ec5-82af-7bed98c76d76"
    - stage: boundary
      stageUuid: "2a4f9a61-fb37-8ea5-94b7-f9f5a9e602f0"
    - stage: links
      stageUuid: "7b21f03e-f4a3-809f-9b52-236a62b33404"
    - stage: horo
      stageUuid: "09d1bf0a-6b31-8551-8b0f-6035cefd245c"
    - stage: seal
      stageUuid: "6e36f693-8734-847a-814c-dd3c318a8664"
    - stage: uuid
      stageUuid: "b27d04f8-9af2-8860-88f9-1d024cb53f88"
version: 2
---
# proof/replaceable — a cited standard is an axiom until a gate discharges it

erpax cites ISO, RFC, WCAG and statute across 219 atoms. **Every one of those citations is an assumption about the world until something can contradict it.** What turns a citation into a theorem is a gate: an `assert…` that fails closed when the standard is violated. Until then the atom asserts conformance and nothing can say otherwise — [[rules]]/refutable's defect, wearing a standard's number.

| | count (2026-09-04) |
| --- | ---: |
| atoms citing a standard | 219 |
| distinct standards cited | 265 |
| **discharged by some gate** | 22 |
| **assumed** | **243** |
| of those, replaceable by a theorem | **242** |

## The instrument existed and had never been run

`standardRegister` was already written in [[proof]]/register — and its only caller was **its own test**. [[rules]]/unfolded's single-use defect in its most expensive form: not a wasted export, a **measurement nobody took**. This atom points it at the tree.

Doing so immediately found a normalisation defect: `ISO-19011:2018` and `ISO 19011:2018` were **two keys splitting 44 citations**, understating the corpus's exposure to a standard it leans on heavily. A hyphen. `standardKey` folds the separator, and the assumed count moved 248 → 243.

## The queue, computed

The queue is ordered by what a discharge would buy, and each line is a theorem not yet written. It is not restated here: this paragraph once led with `WCAG 2.2` at 29 citing atoms, and the corpus then DISCHARGED it — the sentence went stale by the tree getting better, which is [[rules]]/drift's law. RECORD (2026-09-21): 254 open, led by `WHATWG HTML`, `ISA 501`, `WAI ARIA 1.2` and `W3C HTML5`.

`EMPIRICAL` is **declared** in the open: a DOI is assigned by a registration agency, an RFC 3161 timestamp is a third party's signature, `SOX §302` is a natural person's certification, and a statute's text is not in this repo. No amount of reading `src` decides them, and a gate is the wrong instrument — pretending otherwise manufactures the false conformance these gates exist to refuse. Adding such a citation is therefore **not** a regression, so the ratchet counts only the replaceable ones; counting statutes would push the corpus toward citing fewer laws rather than gating more of them.

**Honest boundary.** Two limits, and both matter.

A discharge is measured at the **standard** level, but conformance is per **criterion**: "WCAG 2.2 gated" can never be true of a 50-criterion standard, and one gate on §1.1.1 would mark it discharged here while 49 criteria remain assumed. The count is a floor on the debt, never a ceiling on it.

And a gate in an atom that cites a standard is not proof the gate **checks that standard** — the link is co-location, not entailment. It reports where a citation *could* be answered, and a human reads whether it is.

## Two populations, and one of them is undischargeable

The `## Standards` section is not always a standard. `splitQueue` measures it rather than
normalising it away: of 254 open, **162 are obligations and 92 are references** — `Grassé,
stigmergy`, `Kolmogorov complexity`, `Noether's theorem`, `Brundtland Report`. Those are the
provenance of an idea, cited honestly, and no gate will ever discharge a branch of mathematics.
Counting them as undischarged conformance inflates the debt AND hides the real debt underneath it.

**The split now decides the axis.** `replaceableStandards` counts OBLIGATIONS, for the reason
`EMPIRICAL` is excluded: a gate is the wrong instrument. Counting `Kolmogorov complexity` as
undischarged conformance pushes the corpus toward citing LESS literature rather than gating more
law — the argument this atom already makes about statutes. 254 → **164**, and the ceiling fell with
it in the commit that earned it ([[rules]]/slack).

Two corrections came first, in this order, because moving an axis onto a classification before the
classification is right would hide debt rather than measure it: four PHANTOMS (a `###` subsection
inside `## Standards` in [[supto]], whose bullets about how to *write* banners were read as cited
standards — the section reader stops at the next `##`), and four STATUTES rescued from literature
(`Кодекс на труда`, `ЗКИР`, `Търговски регистър`, the БУЛСТАТ register law — obligations written by
name rather than number). `ISSUING_BODIES` and `NAMED_STANDARDS` are DECLARED, and the failure direction that
matters is **understating obligations**: `ActivityPub`, `eIDAS`, `Linked Data Notifications` and
`WHOQOL` are real standards carrying no number and sat in the reference bucket until they were
named. Bulgarian statutes written in prose form — `Кодекс на труда`, `ЗКИР`, the БУЛСТАТ register
law — are still in the wrong bucket, and that is said here rather than quietly counted as
literature.

**A bold lead ending in `:` labels a value, never a standard.** `- **Version:** 1.2` was yielding
the standard `Version:`, and three such labels sat in the corpus's conformance debt — the same
defect [[standards]]/emit paid for counting prose about banners as banners.

**Law — [[law]]: a standard you cite is an axiom you assume. Discharge it with a gate that fails closed, or say plainly that you assume it — a conformance claim nothing can contradict is the most respectable-looking lie a corpus can tell.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a conformance claim must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: a claim that cannot fail cannot be tested.

Composes: [[proof]]/register · [[rules]]/refutable · [[rules]]/unfolded · [[law]].
