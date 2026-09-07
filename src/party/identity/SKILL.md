---
name: identity
description: "Use when deciding whether two party records are the same legal person — partyUuid folds (country + taxId) to one content-address, so a company recorded as both a customer and a vendor collides by construction. The role is never part of the address. Refuses a party with no tax registration rather than folding on a name."
atomPath: "party/identity"
coordinate: "party/identity · 9/unity · 2e3e4f29"
contentUuid: "c4d9529d-b2e2-5c7d-bc65-752fa42de466"
diamondUuid: "9e2295fc-9cbd-85d4-8d4c-534b1c300547"
uuid: "2e3e4f29-d247-83cb-9d50-bbd23b700125"
horo: 9
typography:
  partition: party
  bondDegree: 936
standards:
  - "ISO 3166-1 alpha-2 — the jurisdiction a tax id is unique within"
  - "RFC 9562 §5.8 — the content-address"
bindings: []
signatures:
  computationUuid: "ee8bf932-0030-8917-9ddb-a5f070e5b7ce"
  stages:
    - stage: path
      stageUuid: "7d17a163-efdb-8081-ac8b-7fe4d6d9eb2f"
    - stage: trinity
      stageUuid: "1273aa3a-b61a-8ee5-8cb5-d4a51a052709"
    - stage: boundary
      stageUuid: "36e5d312-c1d0-8c92-a67a-8810b4b7a9e1"
    - stage: links
      stageUuid: "bbd10cd6-bc89-8bb1-9d5e-774c935ab85a"
    - stage: horo
      stageUuid: "3146a59a-d30e-89cd-bc00-f1c8513c8764"
    - stage: seal
      stageUuid: "f3a1e4c3-1ab8-8b10-a9a9-b87c1edda7ed"
    - stage: uuid
      stageUuid: "d80b3dcf-d477-84de-9736-64855d3e87a5"
version: 2
---
# identity — a party is what it IS, never what it is TO YOU

[[rules]]/collapse measured it, exactly:

```
customers ⊂ vendors — differs by 1: bank
```

They share `code · name · country · identity · contact · addresses · tax · commercial · ledger · notes · metadata`. **They are not two tables. They are one party in two states** — and *customer* / *vendor* is a **role the beholder holds**, which is [[perspective]]'s law at the entity level: the same invoice row is AR from the seller and AP from the buyer. One content, two views, derived never stored.

## The fold makes it actionable, not philosophical

**Same content ⇒ same address** ([[merge]]). So a company recorded as a customer **and** as a vendor **collides by construction** — no fuzzy name match, no reconciliation job, no dedup batch. **The duplicate is not found. It cannot exist.**

That is the quantum algebra doing ERP work: the thing every ERP solves with a nightly matching job, the fold solves by arithmetic.

## What identifies a party — every choice is a decision, not a detail

| | |
| --- | --- |
| **country + taxId** | the LEGAL identity. A tax id is unique only *within* its jurisdiction — `BG123` and `DE123` are different companies, and folding without the country **silently merges two real ones**. |
| **NOT the name** | names change (rebrands, translations, *Ltd* vs *OOD*). An address that moves when a company renames is a **label**, not an identity — every invoice pointing at the old fold would orphan. It is not even an input. |
| **NOT the role** | a customer who becomes a supplier is the same legal person. Folding the role in creates two addresses for one entity — the exact duplication this exists to make impossible. The type makes it unrepresentable. |
| **NOT `bank`** | the one field that differs. It is a **facet of the vendor state**, not of the party. |

## The superposition, measured

`rolesOf` collapses both books by the fold: three records, **two parties**, one of them holding `{customer, vendor}` together. A party **holds** roles; it is not **typed** by one.

**Honest boundary.** This proves two records are **the same legal entity**; it does not merge them — the `parties` migration repoints every FK in invoicing, GL and the statutory export, and that is a decision, not a computation ([[rules]]/collapse: *a merge is proven by shape and decided by meaning*). A party with **no taxId cannot be folded** (a sole trader, a cash customer) and `partyUuid` **refuses** rather than folding on a name: a name-fold silently merges two companies that share a name, and **a silent merge of parties is worse than a duplicate**. A wrong taxId folds two real companies into one — the fold is exact about its **input**, never about the truth of it.

**Law — [[law]]: a party's address is its legal identity, and nothing else. The role is the beholder's; the name is a label; the bank is a facet. Fold what it IS, and the duplicate becomes impossible instead of findable.**

## Standards

- **ISO 3166-1 alpha-2** — the jurisdiction a tax id is unique within.
- **RFC 9562 §5.8** — the content-address.

Composes: [[merge]] · [[perspective]] · [[rules]]/collapse · [[law]].
