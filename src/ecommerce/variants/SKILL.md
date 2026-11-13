---
name: variants
description: "Use when a product's variants should be computed instead of typed — the variants are the cartesian product of the options of the product's variant types, so a hook creates the missing combinations as drafts when the product is saved, and the author confirms price and stock instead of enumerating them."
---

# ecommerce/variants — a variant is the result of a hook

The ecommerce plugin stores what varies (the variant types on a product) and the values each can
take (the options of a type). It then asks an author to create one variant per combination. That
is a question the data already answers ([[rules]]/ask): three sizes and four colours are twelve
variants, and which twelve is not a decision.

So the variants are derived. `deriveVariants` runs after a product is saved:

| step | done by |
| --- | --- |
| every way to pick one option per type | `combinations()` — the cartesian product |
| which of those have no variant yet | `missing()` — a combination is identified by `keyOf()`, its options as a set |
| create only those, as drafts | the hook, through the ordinary collection operation |

**Drafts on purpose.** A derived variant has no price and no stock. Creating it published would put
an unpriced item on sale; as a draft it is a row waiting for the one thing the system cannot
compute.

**It never deletes.** Removing an option leaves the variants that used it. A variant may already be
on an order, so retiring one is a human decision.

**Inside the product's transaction.** Every nested read and write passes the request, so a failed
save does not leave variants behind, and the hook's own writes carry a context flag so they cannot
re-enter it.

**Honest boundary.** This proves the combinations exist as variants, never that each one should be
sold: a real catalogue has combinations nobody stocks, and those stay as drafts until someone
deletes them. With many types the product grows multiplicatively — five types of ten options is a
hundred thousand variants — and nothing here caps it. Options are read by type, so two products
sharing a type share its options.

**Law — [[law]]: what the entered data already determines is computed, not asked. A product's
variants are the product of its options; a hook writes them and a person prices them.**

## Standards

- **ISO/IEC 25010:2023 §5.2** — functional correctness: the combinations are complete by construction.

Composes: [[ecommerce]] · [[rules]]/ask · [[law]].
