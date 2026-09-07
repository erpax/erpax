---
name: party
description: "Use when one entity is referenced under many roles (seller/buyer/agent/supplier/consignee/carrier/sender/receiver/authorized-by) OR when computing the counterparty side of a financial document — aging open balances into day-buckets (A/R and A/P share one algorithm) or validating a status-lifecycle transition; one party seen through infinite roles, receivable and payable seen from two sides."
atomPath: party
coordinate: "party · 5/round · c7c0bc8f"
contentUuid: "5351b2b6-ea8a-56a9-9d61-b666223c49cb"
diamondUuid: "5213b1a2-41db-8715-a7ff-c60895d65b9e"
uuid: "c7c0bc8f-49f4-8cdf-8bc3-2ef9852b4c50"
horo: 5
typography:
  partition: party
  bondDegree: 134
standards:
  - "EN-16931`"
  - "ISO-19011`"
  - "ISO-27002"
  - "ISO-8601-1`"
  - "ISO/IEC-27002:2022"
  - "ISO/IEC-27002:2022`"
bindings: []
signatures:
  computationUuid: "f59ad1ae-15da-8552-9cce-d98d0b6f4a5c"
  stages:
    - stage: path
      stageUuid: "0ef76c9e-8206-8572-a3b4-828ca52c220a"
    - stage: trinity
      stageUuid: "8745ca04-a341-8b9b-9d48-33cdfbebf89a"
    - stage: boundary
      stageUuid: "42bd6e05-dca0-874f-8670-68986bc540ff"
    - stage: links
      stageUuid: "9ef1cca1-940f-8581-8829-f81b2299a139"
    - stage: horo
      stageUuid: "068e61d8-7fd1-8a5d-95c5-8e83e7d5d0d9"
    - stage: seal
      stageUuid: "9ab5dcde-f654-8f13-b628-e78032c820a3"
    - stage: uuid
      stageUuid: "1c8a6744-4e0d-8ab3-9078-7a09bb7a7486"
version: 2
---
# party — one party, infinite roles; two sides of the same debt

`party` is the counterparty object. It has two coexisting facets — the **reference** (who the other side is, under which role) and the **document algorithms** (what that relationship owes, aging and lifecycle). One party, infinitely many roles; one document, two opposite ends.

## Facet 1 — the role-reference atom (the field)

ceccec/erpax's ~13 party-role concerns (`Seller·Buyer·SellerAgent·BuyerAgent·Supplier·Consignee·ShippingAgent·PackedBy·ShippedBy·DeliveredBy·AuthorizedBy·Sender·Receiver`, each `belongs_to Address`) are NOT 13 FK columns — they are ONE relationship under N **role contexts**, the same "(context, value) presents one collection infinitely" law as [[tags]]. → a `partyRef(role)` factory ([[field]] relationship, position **1**); the role IS the context. The party collection(s) are polymorphic (`addresses`/`customers`/`vendors`/`carriers`), so the reference points OUT, never into a single hard slug ([[plugins]]). The factory is realised as `partyRefField` in [[field|discriminator]].

Composes: [[tags]] (role = context), [[commerce]] (document parties), [[field]] (relationship), [[identity]] · [[Customers]] · [[Vendors]].

### Common mistakes
- A bespoke FK column per role — use one context-keyed `partyRef`.
- Hard `relationTo:'customers'` only — parties are polymorphic.

## Facet 2 — the document algorithms (the service)

FORM: **receivable and payable are the SAME document seen from opposite ends of a relationship.** A customer owing us and us owing a supplier differ only in sign and direction — both are a `PartyDocument`: dated, balanced, status-lifecycled. This organ is the single source of truth for the two algorithms that act on that shape, so the receivables and payables services never restate them ([[duality]] — the [[merge]] of the two ledgers into one [[balance]]). Pure (no I/O) ⇒ testable.

- **aging** — bucketize open balances by days-past-due against an as-of date; same buckets for both sides (`current | aging | overdue | stale`). The day-thresholds are the bands every outstanding item ages along, a closed [[horo]] ring of staleness. `computeAgingBuckets`, `filterOpenDocuments`, `DEFAULT_AGING_BUCKETS`.
- **workflow** — a directed graph of legal status transitions; assert legality before applying a status change, or throw with the allowed set. `canTransition`, `transitionOrThrow`, `reachableStates`, `terminalStates`.

The aging math is shared with bank-reconciliation via the canonical `AgingBucketKey`; the day-arithmetic (`daysBetween`) is borrowed from [[accounting]], not re-typed — the filesystem is the only source ([[akashic]]). The workflow validator is the same impossibility [[anti/corruption]] enforces (no illegal jump, terminal states final), one law at every scale ([[fractal]]). Value moving between [[party]] is the universal document chain ([[flow]]).

This is the counterparty organ of the [[society]] — the shape both sides of every relationship share; the standards a document cites are external law incorporated by reference (see [[standard]]).

Sequence position: **8** (crest — the value transfer between two parties carried to its document), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`
- `@standard ISO/IEC-27002:2022`
- `@standard ISO-19011`
- `@standard EN-16931`


- **EN-16931:2017** — invoice-and-credit-note; the common party-side document shape (`PartyDocument`).
- **IFRS-9 / US-GAAP ASC-326** — expected-credit-loss aging-buckets; `computeAgingBuckets` is the executable bucketization.
- **US-GAAP ASC-310 receivables / ASC-405 liabilities** — the two sides the one algorithm serves.
- **ISO-8601-1:2019** — date-time days-between-arithmetic; `daysBetween` over `dueDate`.
- **SOX §404 / ISO-27002 §5.4** — segregation-of-duties on status-transitions; the workflow graph forbids the illegal jump.
- **ISO-19011:2018** — audit-trail of state-transitions and aging-of-outstanding-items.

**Law — [[law]]: one party is seen through infinitely many roles via a single context-keyed reference (never one FK per role), and receivable and payable are the SAME document seen from opposite ends — so both sides share one aging algorithm and one lifecycle, differing only in sign and direction.**
