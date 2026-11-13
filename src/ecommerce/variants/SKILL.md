---
name: variants
description: "Use when a product's variants should be computed instead of typed — the variants are the cartesian product of the options of the product's variant types, so a hook creates the missing combinations as drafts when the product is saved, and the author confirms price and stock instead of enumerating them."
atomPath: "ecommerce/variants"
coordinate: "ecommerce/variants · 2/share · 7af78fe4"
contentUuid: "38fa36ec-0f79-5277-8b91-8d3fd0e65245"
diamondUuid: "c5a2766b-9d14-842a-abda-e40d444a71ce"
uuid: "7af78fe4-ec3e-80fc-98ba-a1a0d97cfe11"
horo: 2
typography:
  partition: ecommerce
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "97572176-96bf-8764-bba8-4b8eedc785ff"
  stages:
    - stage: path
      stageUuid: "fad1781f-b308-8489-95f9-5d24209bc95a"
    - stage: trinity
      stageUuid: "1360f288-b1d6-87f3-8588-da8c05adf16d"
    - stage: boundary
      stageUuid: "6778cbcd-ddd3-8eca-aa9a-5e3c25cc9b9e"
    - stage: links
      stageUuid: "e1b93f35-d224-84c8-8c38-61df0e3218ed"
    - stage: horo
      stageUuid: "0a6664e2-e912-81c7-82d2-a47805a5aba3"
    - stage: seal
      stageUuid: "aecbd070-c686-88b8-8be6-b0bcaa867ad6"
    - stage: uuid
      stageUuid: "d15fdccb-3401-85e1-911f-a1b6d1f8b241"
version: 2
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
