---
name: paper
description: "Use when a sealed claim might warrant a publication — emits a lean LaTeX paper and an HONEST prior-art verdict, where an empty Zenodo search is a lead and never a finding."
atomPath: publish/paper
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
