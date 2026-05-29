---
name: commerce
description: Use when designing or porting the erpax commerce/trade domain to Payload — parties under many roles (seller/buyer/agent/supplier/consignee/carrier), the cart→quote→order→invoice→note document chain, payments/allocations/refunds, subscriptions & metered usage, inventory/stock movement, packing & shipment, dunning/credit terms. The transactional-flow `@erpax/commerce` twin (sequence 4·8).
---

# commerce — the transactional-flow plugin (one party, infinite roles)

`@erpax/commerce` is sequence **4·8** — the build→bind arc of the material cycle: value moves between **parties** through a **document chain**, then at **8** ([[tags]]) the roles and external multiverses merge into one. Self-sufficient: it references [[accounting]] and any entity **OUT polymorphically** (a doc *is accountable* — it never holds a GL account inward, see [[plugins]]). The 4·8 sibling of [[manufacturing]] (1·2 makes what flows). Built by mapping each Rails **concern** to one reusable field-object ([[fields]],[[hooks]]). Ordered by the [[sequence]].

## The laws (hold the form — derive the details from the config + [[port]], never memorize them)

**1 · One party, infinite roles.** The many party-role concerns (seller · buyer · agent · supplier · consignee · carrier · packed/shipped/delivered-by · sender/receiver) are NOT N columns of FKs. They are ONE relationship under N **role contexts** — the same "(context, value) presents one collection infinitely" law as [[tags]]. → a `partyRef(role)` factory; the role IS the context.

**2 · The document chain is monotonic; status is DERIVED.** cart → quote → order → invoice → (credit/debit note · protocol) → payment → fulfilment. Track `qty`/`amount` + monotonic stage counters; **never store status** — derive it (`paid ⟺ totalPaid ≥ totalAmount`; `overdue ⟺ dueAt<now ∧ unpaid`). Every payable/overdue/renewable list is a `where` ([[queries]]), not a state machine — the same stage-counter lesson as [[manufacturing]].

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
