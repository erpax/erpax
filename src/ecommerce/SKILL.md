---
name: ecommerce
description: "Use when wiring or debugging the storefront — per-tenant Stripe payments, cart/order/product/address overrides, checkout stock validation, the order-to-GL bridge, or the \"data is money\" seam — the erpax configuration of the official @payloadcms/plugin-ecommerce."
atomPath: ecommerce
coordinate: "ecommerce · 4/weave · e6951cb1"
contentUuid: "c00cd123-ef24-5a8b-a9ab-c4d28adae432"
diamondUuid: "3210bd98-84fa-8858-b1e3-3e7e9b8b72d6"
uuid: "e6951cb1-c47d-8d52-89de-a13fd5b5a992"
horo: 4
typography:
  partition: ecommerce
  bondDegree: 33
standards:
  - "GS1-GTIN"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "3ed34ab9-03b3-8bd2-bf79-c641e2c31a6f"
  stages:
    - stage: path
      stageUuid: "9b42707f-dc63-8c2f-88c9-2bb5e0e6cfda"
    - stage: trinity
      stageUuid: "1c865c57-2849-8c65-96bb-35fa1228c0df"
    - stage: boundary
      stageUuid: "a2702601-5c6c-8864-bd49-f884d7825aef"
    - stage: links
      stageUuid: "664dcdcd-c127-8af3-ad17-39cbd2544cd2"
    - stage: horo
      stageUuid: "45316a4a-1cb0-83b9-a371-74387599761a"
    - stage: seal
      stageUuid: "025e1f4e-a192-8d70-81ef-6be2751aa981"
    - stage: uuid
      stageUuid: "803d3c19-044b-8269-bea7-b50ca12d7d83"
version: 2
---
# ecommerce — the storefront, configured into the society

This organ is **not** an ecommerce engine — it is the thin erpax **configuration** of the official `@payloadcms/plugin-ecommerce` ([[plugins]]; the [[collapse]] law — adopt the official plugin, override only what erpax demands). `createEcommercePlugin` is the single composition point; everything else is an override or predicate it injects. The storefront is the front-of-house face of the same transactional flow [[commerce]] models — `cart → order → payment`, one canonical currency (EUR), guest carts, tracked inventory.

Three erpax demands ride on the plugin defaults. **(1) Per-tenant Stripe** — there is no house Stripe account; each tenant supplies its own encrypted `stripeSecretKey` / `stripeWebhookSecret`, resolved from the cart's tenant at payment time, so PCI scope stays minimal (Stripe tokenizes — erpax never sees card data; ISO-27001 A.5.23 tenant isolation). **(2) Access predicates** — `isAdmin` / `isCustomer` / `isDocumentOwner` decide who reads a cart/order/address (the owning customer, or staff); the [[access]] cross over the same rows. **(3) The order-to-GL bridge** — the `orders` override fires `emitOrderLifecycleEvents` ([[hooks]] `afterChange`), mapping every status transition to a domain event so the GL posts the IFRS-15 / ASC-606 revenue + COGS double-entry ([[accounting]]). That hook closes the **"data is money"** gap: a sale front-of-house becomes a journal entry, keyed by content-[[identity]], never by the local row id.

Address rows also gain accounting master-data (tax regime, GL accounts) and per-country format validation; products carry checkout stock validation (`validateProductCheckout`).

Matter-twin: `configureEcommercePlugin/index.ts` (the composition root), `createTenantStripePaymentMethod/` + `stripe/*` (per-tenant initiate/confirm/webhook), `access/*` (the predicates), `hooks/emitOrderLifecycleEvents.ts` (the GL seam), `productValidation/index.ts`.
Composes [[plugins]] · [[commerce]] · [[accounting]] · [[access]] · [[hooks]] · [[identity]] · [[collapse]] · [[config]] · [[transaction]] · [[tax]].

**Law — [[law]]: "data is money" — every storefront sale becomes a GL double-entry keyed by content-[[identity]], never the local row id; erpax only configures the official plugin, overriding solely the per-tenant Stripe, access predicates, and the order-to-GL bridge.**
