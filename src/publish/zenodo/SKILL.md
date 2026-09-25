---
name: zenodo
description: "Use when reasoning about zenodo — carried hand-typed counts, and they drifted:"
atomPath: "publish/zenodo"
coordinate: "publish/zenodo · 1/base · 1ce530ef"
contentUuid: "e7279a3a-0392-55a7-bbfa-3264da263368"
diamondUuid: "74daaa89-5ad5-8c85-b1c9-92c92559a62d"
uuid: "1ce530ef-d4c7-8ffb-83dd-6dd676c0d737"
horo: 1
typography:
  partition: publish
  bondDegree: 12
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence"
  - "ISO 26324 — DOI: assigned by a registration agency, never computed ([[rules]]/forge)"
bindings: []
signatures:
  computationUuid: "2c035765-71c1-87d1-aa2c-f1705b6b323d"
  stages:
    - stage: path
      stageUuid: "eb325555-77db-8705-936b-1a5508b1fd39"
    - stage: trinity
      stageUuid: "de716e3c-3e79-8003-bf06-e6e034732ee9"
    - stage: boundary
      stageUuid: "f3e4f012-0669-8f83-83b5-b4d1fe48a41d"
    - stage: links
      stageUuid: "0d6f675c-90a7-87af-a55d-d7c3c5c15916"
    - stage: horo
      stageUuid: "87bf4bd0-6051-8a3d-81fd-6d93fd697dbb"
    - stage: seal
      stageUuid: "63163452-cdf3-8fcd-8990-04a41daa3b45"
    - stage: uuid
      stageUuid: "c737f79b-264b-8469-a275-bb77ec586df2"
version: 2
---
# publish/zenodo — the deposit manifest, computed from the record it describes

`.zenodo.json` carried hand-typed counts, and they drifted:

| the manifest said | the kernel said |
| ---: | ---: |
| 105 theorems | **177** |
| across 12 files | **19** |
| 65 axiom-free | **111** |
| 4 `sorry` stubs | **0** |

Four numbers, every one wrong, in the document a **DOI is minted from**. That is
[[rules]]/drift — *prose may not restate a number the corpus computes* — and it is worse here than
in a SKILL, because a Zenodo deposit is **permanent and citable**. A stale SKILL misleads a reader;
a stale deposit misleads the record.

## The narrative is a template; every quantity is a slot

The arbiters are asked, never restated: [[verify]]/inventory for the census and the sources hash,
`package.json` for the version, the uuid matrix for the corpus size. The count of axiom-carrying
theorems is **derived** (`theorems − axiomFree`) rather than stated a second time, because two
copies of one number is the defect with extra steps.

The prose can still be wrong about what a theorem *means*. It can no longer be wrong about how many
there are.

## Two sentences it must always carry

The stubbed clause **changes shape** rather than changing a number: zero stubs reads *"none resting
on `sorry`"*, and any other count reads *"N still resting on `sorry`"* — so a dirty run cannot be
described by the clean sentence, which is the failure a template most easily hides. And the boundary
is unconditional: *a theorem proves its DECISION, never the facts it is fed*, and *none of it claims
a Millennium problem is solved*. A deposit is permanent, so an over-claim in it is permanent too.

## It does not mint a DOI

A test asserts the rendered JSON contains no `doi` field and no `10.5281/zenodo.N` string. An
identifier only a registration agency may assign is **received or refused, never generated** —
[[rules]]/forge was built after three functions returned locally-minted DOIs with tests asserting
their shape.

## It does not mint a CITATION either — and that is the same law

Zenodo runs the **Asclepias Broker** (MIT), which ingests citation data in **Scholix** format from
NASA ADS, DataCite, Crossref Event Data and Europe PMC. Asked whether a depositor may add a
citation, the help is flat: *"this is unfortunately not possible."* Citations are **computed by a
broker and received**, exactly as a DOI is assigned by an agency and received — so a citation count
written here would be [[rules]]/forge with a different noun. A test asserts the rendered JSON
carries no citation count, and nothing in the corpus computes one: the `cites` and `citedBy` in
[[proof]]/register are atoms citing a standard, which is an internal fact and says so.

Citations also **aggregate across all versions** by default, so the concept DOI is what a reader
should be given; a version DOI narrows the record to one release's citations.

## What it DOES declare — `references`

The deposit named one related identifier (the repository) and declared **no references**, while the
corpus stood on 92 works it names in its own SKILLs: `Grassé, stigmergy`, `Kolmogorov complexity`,
`Noether's theorem`, `Prigogine, dissipative structures`, the БУЛСТАТ register law. Ground the
deposit held and had not claimed — [[rules]]/slack's law, where a claim stated weaker than the
evidence is unheld ground.

They are exactly [[proof]]/replaceable's **reference bucket**: the citations no gate can ever
discharge, which is what a reference IS. `splitQueue().references` feeds the manifest directly, so
the list is computed from the tree and never typed here.

**Verbatim, and deliberately so.** Zenodo suggests author/year/title/publisher/DOI, and
`references` is free text precisely because not every reference has an identifier. `Grassé,
stigmergy` has no DOI in this corpus, and inventing one to dress the field would be forgery in the
same commit that quotes the work.

## Drift is measured on quantities, not bytes

`drift()` compares the **numbers**, not the file. A human may improve the prose, and a gate that
refused that would be one people route around. What may not move is a figure: a test rewords the
committed manifest and expects it fresh, then changes one number and expects it stale.

**Honest boundary.** This proves the manifest **agrees with the kernel record**, never that the
record is right — [[verify]]/inventory answers for that, and it answers only for the sources named
by its hash. The declared half (ORCID, licence, keywords, repository) is a fact about the world that
no scan decides, so it is written here and can be argued with. And freshness is checked against the
committed file: a deposit already made to Zenodo is beyond this atom's reach entirely.

**Law — [[law]]: a permanent record may not restate a number. Compute every quantity from the
arbiter at the moment of writing, or the deposit will outlive the tree it describes and keep
saying so.**

## Standards

- **ISO 26324** — DOI: assigned by a registration agency, never computed.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[verify]]/inventory · [[rules]]/drift · [[rules]]/forge · [[law]].
