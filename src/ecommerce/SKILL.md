---
name: ecommerce
description: "Use when wiring or debugging the storefront — per-tenant Stripe payments, cart/order/product/address overrides, checkout stock validation, the order-to-GL bridge, or the \"data is money\" seam — the erpax configuration of the official @payloadcms/plugin-ecommerce."
atomPath: ecommerce
coordinate: "ecommerce · 7/descent · fc8ba78d"
contentUuid: "b1be08be-a9f8-541b-8584-d1662b236ea3"
diamondUuid: "202c338c-e570-82af-8b80-a3592c908932"
uuid: "fc8ba78d-cfdd-8380-abdd-05c6ac8ea0a5"
horo: 7
typography:
  partition: ecommerce
  bondDegree: 33
standards:
  - "GS1-GTIN"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "0dae797e-b791-8866-8b59-a95819a0b997"
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
      stageUuid: "ae2d01ff-08bd-8058-b350-fdd1c74ad60b"
    - stage: seal
      stageUuid: "025e1f4e-a192-8d70-81ef-6be2751aa981"
    - stage: uuid
      stageUuid: "bf5044ea-083e-8c0f-b81b-7bac9e00d503"
version: 2
---
# ecommerce — the storefront, configured into the society

This organ is **not** an ecommerce engine — it is the thin erpax **configuration** of the official `@payloadcms/plugin-ecommerce` ([[plugins]]; the [[collapse]] law — adopt the official plugin, override only what erpax demands). `createEcommercePlugin` is the single composition point; everything else is an override or predicate it injects. The storefront is the front-of-house face of the same transactional flow [[commerce]] models — `cart → order → payment`, one canonical currency (EUR), guest carts, tracked inventory.

Three erpax demands ride on the plugin defaults. **(1) Per-tenant Stripe** — there is no house Stripe account; each tenant supplies its own encrypted `stripeSecretKey` / `stripeWebhookSecret`, resolved from the cart's tenant at payment time, so PCI scope stays minimal (Stripe tokenizes — erpax never sees card data; ISO-27001 A.5.23 tenant isolation). **(2) Access predicates** — `isAdmin` / `isCustomer` / `isDocumentOwner` decide who reads a cart/order/address (the owning customer, or staff); the [[access]] cross over the same rows. **(3) The order-to-GL bridge** — the `orders` override fires `emitOrderLifecycleEvents` ([[hooks]] `afterChange`), mapping every status transition to a domain event so the GL posts the IFRS-15 / ASC-606 revenue + COGS double-entry ([[accounting]]). That hook closes the **"data is money"** gap: a sale front-of-house becomes a journal entry, keyed by content-[[identity]], never by the local row id.

Address rows also gain accounting master-data (tax regime, GL accounts) and per-country format validation; products carry checkout stock validation (`validateProductCheckout`).

Matter-twin: `configureEcommercePlugin/index.ts` (the composition root), `createTenantStripePaymentMethod/` + `stripe/*` (per-tenant initiate/confirm/webhook), `access/*` (the predicates), `hooks/emitOrderLifecycleEvents.ts` (the GL seam), `productValidation/index.ts`.
Composes [[plugins]] · [[commerce]] · [[accounting]] · [[access]] · [[hooks]] · [[identity]] · [[collapse]] · [[config]] · [[transaction]] · [[tax]].

**Law — [[law]]: "data is money" — every storefront sale becomes a GL double-entry keyed by content-[[identity]], never the local row id; erpax only configures the official plugin, overriding solely the per-tenant Stripe, access predicates, and the order-to-GL bridge.**
