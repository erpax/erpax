---
name: paper
description: "Use when a sealed claim might warrant a publication — emits a lean LaTeX paper and an HONEST prior-art verdict, where an empty Zenodo search is a lead and never a finding."
atomPath: "publish/paper"
coordinate: "publish/paper · 8/crest · 45317fbf"
contentUuid: "e6b62597-5f39-58b9-9f52-8f8837f1a34f"
diamondUuid: "d3d3a24b-dc38-80f9-8a30-5915be39647e"
uuid: "45317fbf-2b82-83c4-99cf-e4a39f69e13b"
horo: 8
typography:
  partition: publish
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "70d5707f-af94-828c-a6f6-f66f351e083e"
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
      stageUuid: "b031723e-2ac1-8755-91b0-85f57a4be59d"
    - stage: seal
      stageUuid: "8906e13a-4348-88e3-a935-060dcca3d11c"
    - stage: uuid
      stageUuid: "34c5f5ad-aef9-8119-b9ac-dc81596fbd7d"
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
