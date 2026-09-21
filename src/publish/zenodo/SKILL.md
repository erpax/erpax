---
name: zenodo
description: "Use when reasoning about zenodo — carried hand-typed counts, and they drifted:"
atomPath: "publish/zenodo"
coordinate: "publish/zenodo · 7/descent · cb4b9b32"
contentUuid: "5b3f2ea3-0489-5d6e-9b91-4ef1a97c6caa"
diamondUuid: "a7fad758-9c48-8114-88e4-13a2e56fedb2"
uuid: "cb4b9b32-e225-8dac-8fc1-6bbb07073adf"
horo: 7
typography:
  partition: publish
  bondDegree: 9
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence"
  - "ISO 26324 — DOI: assigned by a registration agency, never computed ([[rules]]/forge)"
bindings: []
signatures:
  computationUuid: "766ad226-3923-8267-9457-e2298d9498a7"
  stages:
    - stage: path
      stageUuid: "eb325555-77db-8705-936b-1a5508b1fd39"
    - stage: trinity
      stageUuid: "de716e3c-3e79-8003-bf06-e6e034732ee9"
    - stage: boundary
      stageUuid: "2d622a05-99ac-8247-acbb-4f500e9649f3"
    - stage: links
      stageUuid: "1ca94798-849b-8b8b-a553-10c2169b18a5"
    - stage: horo
      stageUuid: "0ea3d9d4-58c3-873e-b4d8-72a07eed5b79"
    - stage: seal
      stageUuid: "63163452-cdf3-8fcd-8990-04a41daa3b45"
    - stage: uuid
      stageUuid: "50840a0f-1b98-8325-834a-98be9a296e43"
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
