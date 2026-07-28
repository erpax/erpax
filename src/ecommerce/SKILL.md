---
name: ecommerce
description: "Use when wiring or debugging the storefront — per-tenant Stripe payments, cart/order/product/address overrides, checkout stock validation, the order-to-GL bridge, or the \\\\\\\\\\\\\\\"data is money\\\\\\\\\\\\\\\" seam — the erpax configuration of the official @payloadcms/plugin-ecommerce."
atomPath: ecommerce
coordinate: "ecommerce · 5/round · 40a254d8"
contentUuid: "654b5ef1-70a5-5594-980f-017674bee835"
diamondUuid: "011b79ec-ee61-8902-812a-c4b45a5f88a9"
uuid: "40a254d8-d58f-8212-875b-1e0eea600502"
horo: 5
bonds:
  in:
    - access
    - accounting
    - collapse
    - commerce
    - config
    - hooks
    - identity
    - law
    - plugins
    - tax
    - transaction
  out:
    - access
    - accounting
    - collapse
    - commerce
    - config
    - hooks
    - identity
    - law
    - plugins
    - tax
    - transaction
typography:
  partition: ecommerce
  bondDegree: 0
  neighbors: []
standards:
  - "GS1-GTIN"
  - "NIST-INCITS-359-2012"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - collapse
    - commerce
    - config
    - hooks
    - identity
    - law
    - plugins
    - tax
    - transaction
  matrix:
    - access
    - accounting
    - collapse
    - commerce
    - config
    - hooks
    - identity
    - law
    - plugins
    - tax
    - transaction
  backlinks:
    - access
    - accounting
    - collapse
    - commerce
    - config
    - hooks
    - identity
    - law
    - plugins
    - tax
    - transaction
signatures:
  computationUuid: "f1752e7b-c01f-8f79-8afb-402125488f99"
  stages:
    - stage: path
      stageUuid: "9b42707f-dc63-8c2f-88c9-2bb5e0e6cfda"
    - stage: trinity
      stageUuid: "30fb8d3b-6974-8e0d-a949-e25651d4f114"
    - stage: boundary
      stageUuid: "cc140962-51d6-85f5-bc24-ff228c4ebc5e"
    - stage: links
      stageUuid: "664dcdcd-c127-8af3-ad17-39cbd2544cd2"
    - stage: horo
      stageUuid: "b5afe1a2-fda7-85ad-8eec-a08753749bc0"
    - stage: seal
      stageUuid: "9fa01d63-8816-8af5-b1ad-4ca29851a6db"
    - stage: uuid
      stageUuid: "3e02bccd-2d83-895f-af26-3e8c3e0b9f4e"
version: 2
---
# ecommerce — the storefront, configured into the society

This organ is **not** an ecommerce engine — it is the thin erpax **configuration** of the official `@payloadcms/plugin-ecommerce` ([[plugins]]; the [[collapse]] law — adopt the official plugin, override only what erpax demands). `createEcommercePlugin` is the single composition point; everything else is an override or predicate it injects. The storefront is the front-of-house face of the same transactional flow [[commerce]] models — `cart → order → payment`, one canonical currency (EUR), guest carts, tracked inventory.

Three erpax demands ride on the plugin defaults. **(1) Per-tenant Stripe** — there is no house Stripe account; each tenant supplies its own encrypted `stripeSecretKey` / `stripeWebhookSecret`, resolved from the cart's tenant at payment time, so PCI scope stays minimal (Stripe tokenizes — erpax never sees card data; ISO-27001 A.5.23 tenant isolation). **(2) Access predicates** — `isAdmin` / `isCustomer` / `isDocumentOwner` decide who reads a cart/order/address (the owning customer, or staff); the [[access]] cross over the same rows. **(3) The order-to-GL bridge** — the `orders` override fires `emitOrderLifecycleEvents` ([[hooks]] `afterChange`), mapping every status transition to a domain event so the GL posts the IFRS-15 / ASC-606 revenue + COGS double-entry ([[accounting]]). That hook closes the **"data is money"** gap: a sale front-of-house becomes a journal entry, keyed by content-[[identity]], never by the local row id.

Address rows also gain accounting master-data (tax regime, GL accounts) and per-country format validation; products carry checkout stock validation (`validateProductCheckout`).

Matter-twin: `configureEcommercePlugin/index.ts` (the composition root), `createTenantStripePaymentMethod/` + `stripe/*` (per-tenant initiate/confirm/webhook), `access/*` (the predicates), `hooks/emitOrderLifecycleEvents.ts` (the GL seam), `productValidation/index.ts`.
Composes [[plugins]] · [[commerce]] · [[accounting]] · [[access]] · [[hooks]] · [[identity]] · [[collapse]] · [[config]] · [[transaction]] · [[tax]].

**Law — [[law]]: "data is money" — every storefront sale becomes a GL double-entry keyed by content-[[identity]], never the local row id; erpax only configures the official plugin, overriding solely the per-tenant Stripe, access predicates, and the order-to-GL bridge.**
