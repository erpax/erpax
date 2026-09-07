---
name: license
description: "Use when reasoning about license — ONE licence, every path: **CC-BY-NC-ND-4.0**, or commercial via the contact below."
atomPath: "algebra/license"
coordinate: "algebra/license · 8/crest · 2fc9dd57"
contentUuid: "87cfa1a3-2b5b-55dc-9bd5-4313e657f5f3"
diamondUuid: "4fc85d35-6ec6-8ec1-8d4a-6f1d0ed47b21"
uuid: "2fc9dd57-38b5-8d15-a68f-aa0950e12275"
horo: 8
typography:
  partition: algebra
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "4836dbf0-5ab6-8cfa-b60e-b728f6a0c63c"
  stages:
    - stage: path
      stageUuid: "36254883-1d38-8b8b-8c58-cb19bc751607"
    - stage: trinity
      stageUuid: "3c1b178b-fd1d-83b1-8296-d2c5a6ebc53c"
    - stage: boundary
      stageUuid: "6084a323-dc55-8a18-ab70-e1e6d2472222"
    - stage: links
      stageUuid: "3910d019-69b7-8d0c-bbcc-8fcf279a2241"
    - stage: horo
      stageUuid: "5d5a59c5-705f-8db6-843d-fbc8422f231b"
    - stage: seal
      stageUuid: "dd868db1-62d8-8fd6-9f27-9f0aa9764ca1"
    - stage: uuid
      stageUuid: "2c429c4e-7d22-8ca6-b783-b419a731056b"
version: 2
---
# algebra/license — the licence facts are read from the file the world reads

ONE licence, every path: **CC-BY-NC-ND-4.0**, or commercial via the contact below. There is no tier
and no path test — a tier is two answers to *"may I use this"* with a path deciding which one you
get.

## Why nothing here is typed

Five values carry this atom: the SPDX identifier, the repository URL, the licensing contact, the
concept DOI and the version DOI. Every one is an **external fact** — decided by a licence steward, a
host, a mailbox, a registration agency. None is derivable from the corpus fold, so a constant is the
only honest form ([[matrix]]/constants-audit counts it as seal-debt, and is right to).

But a constant typed **twice** is two sources that drift, and this corpus has already paid that bill:
the concept DOI stood in `algebra/license` and again in `readme/compute`, and nothing could tell you
which was stale. So the values are read from **CITATION.cff** — the file a citing reader, Zenodo and
GitHub all consult — and emitted into `./generated` by `scripts/emit-license.mjs`. Change the
citation file and the corpus follows; change the corpus and the proof beside this reddens.

That is [[rules]]/drift's law applied to a fact instead of a number: **ask the source, never restate
the answer.**

## What `citation()` emits, and why each part is required

BY-NC-ND asks for four things and the function refuses to omit any: attribution (© erpax), the SPDX,
the source URL under §3(a)(1), and — when you changed something — the modification notice under
§3(a)(1)(B). ND means modified matter may be produced but not shared. The DOI rides along because a
citation that cannot be resolved is not a citation ([[rules]]/forge · ISO 19011 §6.4).

**You cite BY content-uuid; you do not copy the matter.** `citationComplies(text)` fails closed on a
citation missing the SPDX, the source URL or the DOI.

**Honest boundary.** This proves the emitted face **agrees with CITATION.cff**, never that the
licence terms are correctly stated there — a wrong SPDX in the citation file propagates cleanly into
the corpus, and no gate here reads a legal document. It closes drift between two copies, which is
the failure that actually occurred.

**Law — [[law]]: a fact decided outside the corpus is read from the one file that declares it, never
typed a second time. The licence, the source, the contact and the DOI live in CITATION.cff because
that is what the world reads — and a face generated from it cannot disagree with what you cite.**

## Standards

- **CC-BY-NC-ND-4.0 §3(a)(1)** — attribution with the source link; §3(a)(1)(B) modification notice.
- **ISO 26324** — DOI: assigned by a registration agency.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[algebra]] · [[rules]]/drift · [[rules]]/forge · [[law]].
