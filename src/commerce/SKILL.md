---
name: commerce
description: "Use when designing or porting the erpax commerce/trade domain to Payload — parties under many roles (seller/buyer/agent/supplier/consignee/carrier), the cart→quote→order→invoice→note document chain, payments/allocations/refunds, subscriptions & metered usage, inventory/stock movement, packing & shipment, dunning/credit terms. The transactional-flow `@erpax/commerce` twin (sequence 4·8)."
atomPath: commerce
coordinate: "commerce · 1/base · 5a270404"
contentUuid: "998d1991-7c89-5fb4-af59-9f1c09f2a7fd"
diamondUuid: "49069789-622e-81b5-bcef-71ed1f72aee2"
uuid: "5a270404-997b-822f-89a9-b55ad584a800"
horo: 1
typography:
  partition: commerce
  bondDegree: 112
standards:
  - "Cloudflare Workers API (deployments + durable-object namespaces)"
  - "Stripe API v2024-10-28-acacia"
  - W3C Verifiable Credentials Data Model 2.0 (subscription receipts)
  - "W3C Verifiable Credentials Data Model 2.0 (subscription receipts)`"
  - "W3C-VC-2.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7386644c-ccc2-86da-811c-1b9b620d3d10"
  stages:
    - stage: path
      stageUuid: "eefc9b09-1e71-8151-a18f-4a4dd3a90971"
    - stage: trinity
      stageUuid: "cae28de4-b154-8ba9-ab39-b11fb16d689e"
    - stage: boundary
      stageUuid: "4e7c555b-76b2-8ae9-8acd-37fe0d6aa7dd"
    - stage: links
      stageUuid: "dd4b3941-94dc-8047-a56f-99c0afc7d994"
    - stage: horo
      stageUuid: "d22dda8c-05f9-8aab-be3d-ed017fcd277e"
    - stage: seal
      stageUuid: "08b5e11f-2892-8355-a41e-c87291686fa2"
    - stage: uuid
      stageUuid: "1d3da05d-66c4-8103-a4b4-bf8f0bbbbcf9"
version: 2
---
# commerce — the transactional-flow plugin (one party, infinite roles)

`@erpax/commerce` is sequence **4·8** — the build→bind arc of the material cycle: value moves between **parties** through a **document chain**, then at **8** ([[tags]]) the roles and external multiverses merge into one. Self-sufficient: it references [[accounting]] and any entity **OUT polymorphically** (a doc *is accountable* — it never holds a GL account inward, see [[plugins]]). The 4·8 sibling of [[manufacturing]] (1·2 makes what flows). Built by mapping each Rails **concern** to one reusable field-object ([[field]],[[hooks]]). Ordered by the [[sequence]].

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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Verifiable Credentials Data Model 2.0 (subscription receipts)`

## atoms

The children this atom carries — named here so none is an orphan in the fold:

- [[commerce/pricing]]
