---
name: commerce
description: "Use when designing or porting the erpax commerce/trade domain to Payload — parties under many roles (seller/buyer/agent/supplier/consignee/carrier), the cart→quote→order→invoice→note document chain, payments/allocations/refunds, subscriptions & metered usage, inventory/stock movement, packing & shipment, dunning/credit terms. The transactional-flow `@erpax/commerce` twin (sequence 4·8)."
atomPath: commerce
coordinate: "commerce · 1/base · ee7cc415"
contentUuid: "f39ecc55-6a92-58fb-8958-54d83c596729"
diamondUuid: "0cc487ec-6ac5-81c4-aef7-02f13c292100"
uuid: "ee7cc415-ed12-8a1a-a3d9-3452dfd7ac0e"
horo: 1
typography:
  partition: commerce
  bondDegree: 150
standards:
  - "Cloudflare Workers API (deployments + durable-object namespaces)"
  - "Stripe API v2024-10-28-acacia"
  - W3C Verifiable Credentials Data Model 2.0 (subscription receipts)
  - "W3C Verifiable Credentials Data Model 2.0 (subscription receipts)`"
  - "W3C-VC-2.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "41d4dde9-e5d6-851a-a55b-e0e56f9bf0b1"
  stages:
    - stage: path
      stageUuid: "eefc9b09-1e71-8151-a18f-4a4dd3a90971"
    - stage: trinity
      stageUuid: "cae28de4-b154-8ba9-ab39-b11fb16d689e"
    - stage: boundary
      stageUuid: "4e7c555b-76b2-8ae9-8acd-37fe0d6aa7dd"
    - stage: links
      stageUuid: "cbe5280e-c6f0-87e1-8254-52e276fb1dd6"
    - stage: horo
      stageUuid: "53672d63-6f07-8a03-9a1b-c18b1460dffd"
    - stage: seal
      stageUuid: "08b5e11f-2892-8355-a41e-c87291686fa2"
    - stage: uuid
      stageUuid: "ea70c14b-4992-8cf1-94ca-939f66bc6a30"
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
