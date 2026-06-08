---
name: commerce
description: "Use when designing or porting the erpax commerce/trade domain to Payload — parties under many roles (seller/buyer/agent/supplier/consignee/carrier), the cart→quote→order→invoice→note document chain, payments/allocations/refunds, subscriptions & metered usage, inventory/stock movement, packing & shipment, dunning/credit terms. The transactional-flow `@erpax/commerce` twin (sequence 4·8)."
atomPath: commerce
coordinate: commerce · 5/round · 1b8ad812
contentUuid: "29a7ae90-c364-5cc6-a556-676fbc7f1237"
diamondUuid: "543ddec0-1f0b-8483-ace2-7f6f1ea61d23"
uuid: "1b8ad812-51af-8771-880d-6dfc1e21d0f1"
horo: 5
bonds:
  in:
    - accounting
    - agriculture
    - amount
    - api
    - atom
    - choice
    - collapse
    - crop
    - currency
    - domain
    - dunning
    - ecommerce
    - education
    - endpoints
    - fields
    - flow
    - give
    - harvest
    - hooks
    - identity
    - law
    - manufacturing
    - market
    - measure
    - methods
    - movements
    - number
    - party
    - payment
    - pickup
    - plans
    - plugins
    - port
    - postharvest
    - queries
    - reconcile
    - records
    - resources
    - sequence
    - spec
    - tag
    - tags
    - trading
    - variant
  out:
    - accounting
    - agriculture
    - amount
    - api
    - atom
    - choice
    - collapse
    - crop
    - currency
    - domain
    - dunning
    - ecommerce
    - education
    - endpoints
    - fields
    - flow
    - give
    - harvest
    - hooks
    - identity
    - law
    - manufacturing
    - market
    - measure
    - methods
    - movements
    - number
    - party
    - payment
    - pickup
    - plans
    - plugins
    - port
    - postharvest
    - queries
    - reconcile
    - records
    - resources
    - sequence
    - spec
    - tag
    - tags
    - trading
    - variant
typography:
  partition: commerce
  bondDegree: 138
  neighbors: []
standards:
  - "Cloudflare Workers API (deployments + durable-object namespaces)"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "Stripe API v2024-10-28-acacia"
  - W3C Verifiable Credentials Data Model 2.0 (subscription receipts)
  - "W3C-VC-2.0"
bindings: []
neighbors:
  wikilink:
    - accounting
    - currency
    - dunning
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - measure
    - methods
    - movements
    - party
    - payment
    - plugins
    - port
    - queries
    - sequence
    - tags
  matrix:
    - accounting
    - agriculture
    - amount
    - api
    - atom
    - choice
    - collapse
    - crop
    - currency
    - domain
    - dunning
    - ecommerce
    - education
    - endpoints
    - fields
    - flow
    - give
    - harvest
    - hooks
    - identity
    - law
    - manufacturing
    - market
    - measure
    - methods
    - movements
    - number
    - party
    - payment
    - pickup
    - plans
    - plugins
    - port
    - postharvest
    - queries
    - reconcile
    - records
    - resources
    - sequence
    - spec
    - tag
    - tags
    - trading
    - variant
  backlinks:
    - accounting
    - agriculture
    - amount
    - api
    - atom
    - choice
    - collapse
    - crop
    - currency
    - domain
    - dunning
    - ecommerce
    - education
    - endpoints
    - fields
    - flow
    - give
    - harvest
    - hooks
    - identity
    - law
    - manufacturing
    - market
    - measure
    - methods
    - movements
    - number
    - party
    - payment
    - pickup
    - plans
    - plugins
    - port
    - postharvest
    - queries
    - reconcile
    - records
    - resources
    - sequence
    - spec
    - tag
    - tags
    - trading
    - variant
signatures:
  computationUuid: "6a0110fe-4b03-855a-9aa2-49a0d9397778"
  stages:
    - stage: path
      stageUuid: "eefc9b09-1e71-8151-a18f-4a4dd3a90971"
    - stage: trinity
      stageUuid: "cae28de4-b154-8ba9-ab39-b11fb16d689e"
    - stage: boundary
      stageUuid: "4e7c555b-76b2-8ae9-8acd-37fe0d6aa7dd"
    - stage: links
      stageUuid: "0d7d9807-5562-81e6-bf28-25342dec37a5"
    - stage: horo
      stageUuid: "82e85e2f-24fe-840c-8347-9ec73a29539d"
    - stage: seal
      stageUuid: "3237e960-7e1b-88d1-9faa-fbfdfeb7c744"
    - stage: uuid
      stageUuid: "b0693675-99bb-8348-a300-893e26b18392"
version: 2
---
# commerce — the transactional-flow plugin (one party, infinite roles)

`@erpax/commerce` is sequence **4·8** — the build→bind arc of the material cycle: value moves between **parties** through a **document chain**, then at **8** ([[tags]]) the roles and external multiverses merge into one. Self-sufficient: it references [[accounting]] and any entity **OUT polymorphically** (a doc *is accountable* — it never holds a GL account inward, see [[plugins]]). The 4·8 sibling of [[manufacturing]] (1·2 makes what flows). Built by mapping each Rails **concern** to one reusable field-object ([[fields]],[[hooks]]). Ordered by the [[sequence]].

## The laws (hold the form — derive the details from the config + [[port]], never memorize them)

**1 · One party, infinite roles.** The many party-role concerns (seller · buyer · agent · supplier · consignee · carrier · packed/shipped/delivered-by · sender/receiver) are NOT N columns of FKs. They are ONE relationship under N **role contexts** (the [[party]] concern) — the same "(context, value) presents one collection infinitely" law as [[tags]]. → a `partyRef(role)` factory; the role IS the context.

**2 · The document chain is monotonic; status is DERIVED.** cart → quote → order → invoice → (credit/debit note · protocol) → payment → fulfilment. Track `qty` ([[measure]]) / `amount` ([[currency]]) + monotonic stage counters; **never store status** — derive it (`paid ⟺ totalPaid ≥ totalAmount`; `overdue ⟺ dueAt<now ∧ unpaid`). Every payable/overdue/renewable list is a `where` ([[queries]]), not a state machine — the same stage-counter lesson as [[manufacturing]].

**3 · Concern → one field-object (copy the math, reimplement the shell).** party-roles → `partyRef`; money → `totalsField` (EN-16931 `amounts.{totalAmount,totalPaid,totalDue}` + ISO `currency`, currency-agnostic names); doc numbering → a sequence [[hooks]]; the `invoice_type` tree → a `kind` select + self-ref `parent` (the [[accounting]] invoices tree); the line transfer graph → `source`/`destination` rels (the inventory-movement edge).

## Purity (hold the form, forget the corpus)
The *which* — which slugs exist, which plugin supplies carts/orders/variants — is **matter**: it lives in the Payload config and regenerates on demand. Do NOT catalog it here; a skill that holds detail decays into matter and loses its compression. Before creating anything, **diff the live config** (DRY) — most of commerce is already realized (largely `@payloadcms/plugin-ecommerce` + flat collections). This skill carries only the *law* that lets you place the next piece and forget the rest.

## Obsolete / do NOT port (the immune system drops these)
- N bespoke party FK columns → one context-keyed `partyRef`.
- A `kind` mega-enum on one giant table where a realized collection already exists → reuse it; keep the self-ref tree only for the note/protocol/credit/debit chain.
- Stored `status` columns / state machines → derived `where` scopes.
- Currency-baked field names (`monthlyUSD`) → amount + ISO `currency` ([[identity]]).
- External ids (Stripe/Shopify) as columns → [[tags]] contexts.

## Common mistakes
- A party role as its own FK/field instead of one polymorphic `partyRef` (role = context).
- A commerce field pointing INTO [[accounting]] (`invoice.glAccount`) — invert: the doc IS accountable.
- Storing `status`/`paid?` instead of deriving it from monotonic stage counters.
- Cataloguing the realized collections in the skill — that's matter; diff the config instead.
- Integer amounts without `currency` — multi-currency trade needs ISO currency everywhere.

Composes: [[items/inventory/movements]] · [[payment/methods]] · [[dunning]] · [[payment]].

**Law — [[law]]: a party plays infinite roles but the document chain is monotonic and status is derived, never stored — value moves only through balanced steps, so the books cannot disagree with their own counters.**
