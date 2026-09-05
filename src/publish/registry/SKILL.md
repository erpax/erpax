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

## Notes from the code

These were long docstrings; the code keeps one line and points here.

### `resultUuid`

The identity of a RESULT, repo-independent. Addresses the claim and its boundary — the two things a reader is asked to believe — and nothing about where the file lives. Same finding, same address, in any repository: that is the whole point of a content-address, applied to publications so a body of work can merge in metadata rather than duplicate in deposits.

### `normaliseStatement`

The CROSS-REPO statement normalisation, agreed with the sibling repositories. Collapse whitespace runs; remove a space ONLY where it does not sit between two of [A-Za-z0-9_]; keep case; `==`→`=`, `!=`→`≠`. Both halves of that rule are scars. An earlier version stripped ALL whitespace, which corrupts Lean's application by juxtaposition — `List.range 7` becomes `List.range7`, a different term — and mis-merged 395 of 534 statements in one sibling and 672 in another. Lowercasing conflated case-sensitive identifiers in 1,037 more. Three repos agreed the first rule before anyone measured it; one measured it and it was wrong in the MERGING direction, which is the direction that destroys the thing a merge key exists to protect. v3 — the class is `[\p{L}\p{N}_]` with the `u` flag, not `[A-Za-z0-9_]`. The ASCII form was agreed by three parties and was wrong in the merging direction for the third time. It protects `List.range 7` and corrupts every non-ASCII identifier: `σ (σ l)` → `σ(σl)`, `ℤ⁴ with χ` → `ℤ⁴withχ`. Measured: 211 of 832 statements in one sibling's corpus, 0 of 533 in another's, and 2 of erpax's own 45 — `under φ(d)` → `underφ(d)`, `the ω-basis` → `theω-basis`. I held the defect deliberately while it was shared, because a merge key only works when every party computes it identically and a private correction silently stops matching. That changed when the party for whom the fix was free adopted it first: the correct rule now has adopters, erpax's own addresses are among those the ASCII form corrupts, and moving is announced rather than silent. Holding a rule that is wrong about your OWN data to preserve agreement with a party that is also wrong is not consensus, it is a shared error.

### `statementFixture`

The shared FIXTURE: input/output pairs a sibling checks its implementation against. This rule has now been specified in prose three times and refuted by measurement twice — strip everything (672 statements corrupted), then ASCII-only (211). Each was agreed by three parties before anyone ran it against real statements. A sentence describing a normaliser is exactly the artifact that keeps failing; cases are checkable. Copy these verbatim.

### `publishableResults`

Every result this corpus can publish, computed — never a hand-kept list. The three legs are the scientific bar and each is read from the atom itself: a **Law** it states, an **Honest boundary** naming what it does not prove, and an exported `assert…` that fails closed. An atom missing any one of them is not published, and that is the whole filter — a claim with no falsifier is [[rules]]/refutable's defect, and a claim with no stated limit is how every overreach in this corpus began.

### `foreignCollisions`

Results a SIBLING repository already publishes, matched by identity rather than by title. This is what "repos merge in metadata" means concretely: the identity is a content-address of the claim, so a sibling deriving the same finding lands on the same uuid and the duplicate is visible before a second deposit exists. Two DOIs for one result is the failure being prevented. An empty drop is reported as EMPTY, never as clean — a sibling that has published no manifest has not been checked, which is the absence-of-evidence trap this corpus has already paid for.

### `paperInputs`

Every publishable result as a paper input — the wiring `runPapers` never had. `publish/paper` could build a paper and a Zenodo deposition from the day it was written, and its only caller was its own test: an instrument built and never pointed at the tree, the same defect `standardRegister` carried. This is the connection. `contentUuid` is the result's cross-repo identity, so the deposition's `isIdenticalTo` names the finding rather than the file.

