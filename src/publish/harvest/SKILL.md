# publish/harvest — a DOI is verified against the registry, or it is a string that looks like one

[[rules]]/forge established the negative: an identifier only a registry may assign is **received or refused, never generated** — three sites here once minted `10.5281/zenodo.${Math.random()}` and logged `[ZENODO] Publishing`. This is the positive half. A received DOI can now be **checked**, through Zenodo's OAI-PMH harvest and its REST record API.

## What the first run found, and the correction that followed

Asking OAI-PMH for the corpus's own DOI returned **`idDoesNotExist`**:

```
oai:zenodo.org:22237698   →   <error code="idDoesNotExist">
```

The reflex reading — *the DOI is not real* — was **wrong**, and a control caught it. A known-good record (`oai:zenodo.org:1215979`) returned normally, so the query form was sound; following the DOI resolver gave the answer:

| | |
| --- | --- |
| `10.5281/zenodo.22237698` | the **concept** DOI — resolves to whatever version is newest |
| `10.5281/zenodo.22288360` | the **version** DOI — a fixed record, and the one OAI-PMH harvests |

**A concept record is not an OAI record.** The absence was a fact about the protocol, not about the work. Two instruments disagreeing is what produced the truth; either alone would have been a single reading, and the single reading was a false alarm.

## The distinction that decides reproducibility

A concept DOI names *the latest version*. A claim pinned to one **can change meaning after it is cited** — the citation still resolves, to something else. ISO 19011 §6.4 asks that a citation lead to *the* evidence, and only a version DOI can promise that.

So `doiForPurpose` states both: cite the **software** with the concept DOI (that is exactly what it is for — all versions), and cite a **result** with the version DOI.

## It refuses rather than guesses

`resolveDoi` and `isHarvested` **throw** when the registry cannot be reached. *"The question could not be put"* and *"the answer was no"* are different facts and only one is bad news — the rule [[proof]]/register applies to a missing kernel, applied to a missing network. A verification that returns green when it could not verify is the failure mode this whole corpus is built against.

The fetcher is injected, so every pure part is tested offline and no suite depends on a network.

**A single endpoint answers EXISTENCE, never COMPLETENESS — and two endpoints do not answer it either.**

A sibling ran the whole CERN open-data portal. OAI-PMH `ListIdentifiers` reports `completeListSize` **74,614** against the REST API's **82,385**: the protocol built for exhaustive harvesting, **9.4% short, silently**. Same family as the concept-DOI false absence — the instrument answers a narrower question than its name.

Then the harder half, and it inverts the obvious fix. Their record filter was `/record/\d+$`, and CERN ids are not all numeric (`cms-releases-first-batch-of-high-level-lhc-open-data` is one). The filter dropped **55,821** records — and returned exactly **82,385**, which is precisely the REST API's reported total. **An independent source agreeing to the digit read as confirmation that the broken filter was right.** Corrected, the sitemap holds 113,229 record URLs against the API's 82,385, and ~29% of API records are absent from the sitemap: each source omits tens of thousands the other has.

So "consult a second endpoint" is not the rule. **Two sources agreeing is not completeness**, and the exact figure that made the instrument look validated was produced by the instrument being wrong. Everything below verifies that ONE record exists; nothing here claims a listing is complete.

**Honest boundary.** This proves a DOI **is registered and harvestable** — never that the deposit's *content* is what a citation claims about it, and never that the work is correct. Zenodo's documented harvesting limit is 30 requests per minute and resumption tokens live 2 minutes; anything walking the full set must respect both. And a record that is restricted or embargoed is legitimately absent from the harvest, so `harvestable: false` is not by itself evidence of anything wrong.

**Law — [[law]]: an identifier a registry assigns is received, then verified against that registry. And a citation of a RESULT names a fixed version — a concept DOI cites whatever is newest, which is a citation that can change its mind.**

## Standards

- **ISO 26324** — DOI: assigned by a registration agency.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **OAI-PMH 2.0** — metadata harvesting protocol.

Composes: [[rules]]/forge · [[publish]]/paper · [[proof]]/register · [[law]].
