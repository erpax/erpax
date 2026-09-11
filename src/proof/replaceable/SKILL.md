---
name: replaceable
description: "Use when reasoning about replaceable — erpax cites ISO, RFC, WCAG and statute across 219 atoms. **Every one of those citations is an assumption about the world until something can contradict it.** What turns a citation…"
atomPath: "proof/replaceable"
coordinate: "proof/replaceable · 7/descent · 4870b962"
contentUuid: "e74cf72d-217c-5bd9-8f58-18532fc12bde"
diamondUuid: "cc2b5456-6892-8a01-a053-10311a453184"
uuid: "4870b962-4978-83bf-bc7d-20f8fc2d0d75"
horo: 7
typography:
  partition: proof
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "3917c353-fdac-878e-a0bc-6563e51a4d6d"
  stages:
    - stage: path
      stageUuid: "5f5c9b89-d5ca-8eec-8edb-3eaaddac934c"
    - stage: trinity
      stageUuid: "258ef1c5-f44d-8ec5-82af-7bed98c76d76"
    - stage: boundary
      stageUuid: "de3ddb03-ee32-8cda-a72e-43350b7a6792"
    - stage: links
      stageUuid: "443c335f-e44e-8636-b3a2-ca927c94ecc6"
    - stage: horo
      stageUuid: "15ba8a46-f396-8a50-9a76-96f900ccbe24"
    - stage: seal
      stageUuid: "6e36f693-8734-847a-814c-dd3c318a8664"
    - stage: uuid
      stageUuid: "754e4cca-853f-8224-af9e-49a63102fb23"
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

`WCAG 2.2` leads with **29 citing atoms and no gate on any criterion**. Then BCP 47, WHATWG HTML, WAI-ARIA 1.2, ISO 27001 A.5.23, W3C HTML5, ActivityPub. Each line is a theorem not yet written.

`EMPIRICAL` is **declared** in the open: a DOI is assigned by a registration agency, an RFC 3161 timestamp is a third party's signature, `SOX §302` is a natural person's certification, and a statute's text is not in this repo. No amount of reading `src` decides them, and a gate is the wrong instrument — pretending otherwise manufactures the false conformance these gates exist to refuse. Adding such a citation is therefore **not** a regression, so the ratchet counts only the replaceable ones; counting statutes would push the corpus toward citing fewer laws rather than gating more of them.

**Honest boundary.** Two limits, and both matter.

A discharge is measured at the **standard** level, but conformance is per **criterion**: "WCAG 2.2 gated" can never be true of a 50-criterion standard, and one gate on §1.1.1 would mark it discharged here while 49 criteria remain assumed. The count is a floor on the debt, never a ceiling on it.

And a gate in an atom that cites a standard is not proof the gate **checks that standard** — the link is co-location, not entailment. It reports where a citation *could* be answered, and a human reads whether it is.

The `## Standards` section is also not always a standard: `Group theory` and a book citation appear there. That is prose in a slot meant for conformance claims, and it is per-case, not something to normalise away.

**Law — [[law]]: a standard you cite is an axiom you assume. Discharge it with a gate that fails closed, or say plainly that you assume it — a conformance claim nothing can contradict is the most respectable-looking lie a corpus can tell.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a conformance claim must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability: a claim that cannot fail cannot be tested.

Composes: [[proof]]/register · [[rules]]/refutable · [[rules]]/unfolded · [[law]].
