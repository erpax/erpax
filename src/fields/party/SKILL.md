---
name: party
description: Use when one entity is referenced under many roles — seller/buyer/agent/supplier/consignee/carrier/sender/receiver/authorized-by. The party-role concern-set collapsed to ONE polymorphic partyRef(role); the role is a tag-context, not N FK columns.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# party — one party, infinite roles

`party` is the role-reference atom. ceccec/erpax's ~13 party-role concerns (`Seller·Buyer·SellerAgent·BuyerAgent·Supplier·Consignee·ShippingAgent·PackedBy·ShippedBy·DeliveredBy·AuthorizedBy·Sender·Receiver`, each `belongs_to Address`) are NOT 13 FK columns — they are ONE relationship under N **role contexts**, the same "(context, value) presents one collection infinitely" law as [[tags]]. → a `partyRef(role)` factory ([[fields]] relationship, position **1**); the role IS the context. The party collection(s) are polymorphic (`addresses`/`customers`/`vendors`/`carriers`), so the reference points OUT, never into a single hard slug ([[plugins]]).

Composes: [[tags]] (role = context), [[commerce]] (document parties), [[fields]] (relationship), [[identity]] · [[Customers]] · [[Vendors]].

## Common mistakes
- A bespoke FK column per role — use one context-keyed `partyRef`.
- Hard `relationTo:'customers'` only — parties are polymorphic.
