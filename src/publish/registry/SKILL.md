# publish/registry — a result is publishable only with all three legs

Which of 3,473 atoms this corpus can honestly publish, **computed** rather than kept by hand.

The filter is the scientific bar, and each leg is read from the atom itself:

| leg | read from | why it is required |
| --- | --- | --- |
| a **Law** | the `**Law — …**` line | a paper with no claim is a description |
| an **Honest boundary** | the `## Unique no matter which repo derives it

A publication's identity is `resultUuid(claim, boundary)` — a **content-address of the claim**, carrying nothing about where the file lives. Two repositories deriving the same finding land on the same uuid, so the duplicate is visible *before* a second deposit exists. Putting the path in the address would make every sibling's copy of one result look novel, which is how one finding acquires two DOIs.

That identity rides in both directions: schema.org as `erpax-result-uuid`, and Zenodo as `urn:uuid:… isIdenticalTo`. **That is where repos merge — in the metadata, not in a shared file.** Each repo drops `<repo>.results.json` into the fusion directory and reads the others'.

An empty drop reports **UNCHECKED**, never clean. A sibling that has published no manifest has not been checked, and calling that a pass is the absence-of-evidence trap this corpus has already paid for once.

**Honest boundary.**` paragraph | every overreach in this corpus began without one |
| a **gate** | an exported `assert…` in the barrel | a claim nothing can contradict is [[rules]]/refutable's defect |

| | count (2026-09-04) |
| --- | ---: |
| atoms with a SKILL | 3,473 |
| stating a Law | 3,001 |
| stating an Honest boundary | 216 |
| exporting a fail-closed gate | 67 |
| **all three — publishable** | **44** |

3,001 laws and 44 publishable results is the honest ratio. Most laws are barrel conventions; a law becomes a **result** only when something can refuse it and its author has said what it does not prove.

## The body of work, not a heap

`citationGraph` links each result to the results it **composes** with — 38 edges across 44 papers — and cites **only results that are themselves published**. A cross-link to an atom nobody can read is the dangling citation [[rules]]/reference forbids, moved from prose into metadata, where it is harder to see and just as broken.

`scholarlyArticle` projects a result to schema.org `ScholarlyArticle` — the form a search engine and an OAI harvester read — and `relatedIdentifiers` gives Zenodo the same graph. Both are **derived from the result**, so the structured data cannot disagree with the page beside it, and a deposit is reachable from the archive rather than only from the site.

## Read from the atom's own text, in both places

`proofOf` first looked only at `SKILL.md` and found **2 of the 4** kernel developments that exist — an atom commonly names its `.lean` file in the `@see` of `index.ts` instead. The domain lesson ([[rules]]/domain), on the day it was written. It now reads both, and still never guesses: a proof is linked only when the atom names it and the file exists.

## Unique no matter which repo derives it

A publication's identity is `resultUuid(claim, boundary)` — a **content-address of the claim**, carrying nothing about where the file lives. Two repositories deriving the same finding land on the same uuid, so the duplicate is visible *before* a second deposit exists. Putting the path in the address would make every sibling's copy of one result look novel, which is how one finding acquires two DOIs.

That identity rides in both directions: schema.org as `erpax-result-uuid`, and Zenodo as `urn:uuid:… isIdenticalTo`. **That is where repos merge — in the metadata, not in a shared file.** Each repo drops `<repo>.results.json` into the fusion directory and reads the others'.

An empty drop reports **UNCHECKED**, never clean. A sibling that has published no manifest has not been checked, and calling that a pass is the absence-of-evidence trap this corpus has already paid for once.

**Honest boundary.** This proves an atom **has** the three legs, never that its law is **true** or its boundary **complete** — a well-formed result can be wrong, which is what the gate beside it exists to find out. The three legs are detected lexically from an authored convention, so an atom that states its law in prose the pattern does not match is invisible here, and 44 is a floor. A `cites` edge means one atom **composes** with another, which is weaker than a scientific citation: it records a dependency the author declared, not a claim about influence.

**Law — [[law]]: a result is a claim, its limit, and something that can refuse it. Two of the three is a description; the gate alone is a tool. Publish only what carries all three, and cite only what is itself published.**

## Standards

- **schema.org ScholarlyArticle** — the structured form a search engine reads.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[publish]]/paper · [[publish]]/harvest · [[rules]]/refutable · [[rules]]/reference · [[law]].
