---
name: paper
description: "Use when a sealed claim might warrant a publication — emits a lean LaTeX paper and an HONEST prior-art verdict, where an empty Zenodo search is a lead and never a finding."
atomPath: "publish/paper"
coordinate: "publish/paper · 7/descent · 40cde292"
contentUuid: "ce730190-fb52-5dd6-aa99-9a6fde04cca5"
diamondUuid: "e0c3a837-7765-8d30-8b33-b4ca481a9033"
uuid: "40cde292-5ed3-8ba6-8515-3e3be4bddd84"
horo: 7
typography:
  partition: publish
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "5af08d20-5e76-8d85-b344-2f9b68be78ed"
  stages:
    - stage: path
      stageUuid: "9d70424e-9b77-8810-af0f-9e6a0f397b2e"
    - stage: trinity
      stageUuid: "2ad188b7-555f-8b95-b28c-0f267d859176"
    - stage: boundary
      stageUuid: "7b0b718e-8854-8189-8ac6-bcb7bd659372"
    - stage: links
      stageUuid: "7563090f-f3c1-88bc-be46-72691623fe5f"
    - stage: horo
      stageUuid: "34be84b1-118e-88a9-b3c6-a0bb57fd5388"
    - stage: seal
      stageUuid: "8906e13a-4348-88e3-a935-060dcca3d11c"
    - stage: uuid
      stageUuid: "7ba00719-8972-8ca0-b987-061335e27e4c"
version: 2
---
# publish/paper — a search box cannot tell you something is new

The ask: for each sealed novelty with no prior-art publication, mint a DOI. Half of that is mechanical. The other half is a claim nobody can make from a search box, and this atom is built around refusing to make it.

## The verdict has three values, and `novel` is not one

| status | what it means |
| --- | --- |
| `found` | records came back — here they are, read them |
| `none` | **nothing in Zenodo matched these terms.** A lead. Not a finding. |
| `unknown` | the search could not run — offline, rate-limited, HTTP error |

Zenodo is one repository. It indexes a fraction of the literature, holds almost no patents, and matches on words a paper about the same idea may simply not use. "No hits" is compatible with a hundred prior publications.

**This corpus has already paid for that inference.** A claim that `CrackKind.spacetime` was unraised was built on a shell glob that errored and returned nothing — absence of evidence read as evidence of absence ([[rules]]/unraised). The parser refused it. The same mistake at publication scale is permanent and public.

`unknown` exists for exactly this reason: a failed search that reported `none` would be the most dangerous output this function could produce, so it cannot.

## The paper cannot overclaim

`paperTex` **throws** without a `boundary` — a statement of what the claim does *not* prove. Every honest atom in this corpus carries one; a paper without one is the overclaim gated everywhere else, in the one format that outlives the repository.

The prior-art search is reproduced **verbatim** in the paper, including its caveat, so a reviewer judges the search rather than trusting a summary of it. When the search found nothing, the paper says so and states plainly that no claim of novelty is made.

## It writes, it does not deposit

A Zenodo record is permanent, publicly attributed, and cannot be deleted — only superseded. Depositing is a person's decision made with the search in front of them. This atom produces the paper and the verdict; `erpax publish papers` prints them.

**Honest boundary.** This proves a query returned what it returned. It cannot establish novelty, priority, or patentability, and nothing it emits should be read as doing so — a DOI dates a disclosure, it does not adjudicate who was first.

Composes: [[publish]] · [[theorem]] · [[rules]]/unraised · [[algebra]].
