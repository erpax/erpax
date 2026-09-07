---
name: endpoints
description: "Use when adding or debugging a custom HTTP route that does work outside a collection's CRUD — the `/next/seed` demo-data loader that clears and repopulates a fresh tenant with example pages, posts, media, and the erpax product-marketing pages — endpoints is the society's custom-route organ (currently one organ-scoped seed handler, not the per-collection structural seed)."
atomPath: "vocabulary/endpoints"
coordinate: "vocabulary/endpoints · 2/share · 9ec8344d"
contentUuid: "bf96aae8-ec23-5508-8068-91729fb45ec0"
diamondUuid: "fa5cd5a5-b287-8dac-923e-bd83f3118b03"
uuid: "9ec8344d-c7cf-87c5-ab20-01386b464324"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "5abb7bf2-f90f-8147-9167-66c903816114"
  stages:
    - stage: path
      stageUuid: "a2d95c0e-3251-8087-abb5-162478667fe1"
    - stage: trinity
      stageUuid: "14cf4735-4ca0-8463-8124-c60b601a1296"
    - stage: boundary
      stageUuid: "d64f33d5-c5d3-81df-9eaa-859f1e08a65e"
    - stage: links
      stageUuid: "ea7bb7bb-3cb5-834a-8187-09385ed86603"
    - stage: horo
      stageUuid: "6abaed7e-ec7f-8c6d-9cba-246b0db02847"
    - stage: seal
      stageUuid: "489d117a-7b28-8f4a-b561-c0836f20fcdd"
    - stage: uuid
      stageUuid: "f6e38e7d-f458-897b-a1e0-ce7bd89d78b6"
version: 2
---
# endpoints — the custom-route organ (the `/next/seed` demo loader)

A Payload **endpoint** is a custom HTTP handler mounted outside the auto-generated collection REST/GraphQL surface ([[api]]) — for work that isn't one document's CRUD. Today this organ holds **one** such handler: `seed`, the website-template demo-data loader, exposed at `/next/seed` (the Next route `app/(frontend)/next/seed/route.ts` calls it; the folder is aliased `@/n`). It is **destructive and one-shot**: it clears the demo [[collections]] + globals, deletes the demo author, then re-creates example media, three linked posts, a contact form, the home + contact pages, the header/footer nav, and the 18 erpax product-marketing pages — all via the Local API ([[api]] `payload.create`/`updateGlobal`).

This is the **demo / marketing** seed — distinct from the structural [[seed]] atom (a tenant's opening chart-of-accounts + compliance posture, which is idempotent). This one wipes and rebuilds a showcase tenant; run it on a fresh instance, never over live data. Its fixtures (`home.ts`, `post-*.ts`, `image-*.ts`) are static, locale-bundled (BCP-47), and inherit the seed barrel's standards; remote demo images are fetched from the upstream Payload template. The erpax product pages pitch each wired [[commerce]] capability with its standards backing — the monetization surface a tenant boots with.

Matter-twin: `src/endpoints/seed/index.ts` (the `seed` handler + `fetchFileByURL`), `seed/erpax-product-pages.ts` (the 18 product pages), `seed/{home,contact-page,contact-form,post-1,post-2,post-3,image-*}.ts` (static fixtures).
Composes: [[api]] · [[collections]] · [[seed]] · [[identity]] · [[config]] · [[society]] · [[commerce]].

**Law — [[law]]: an endpoint is a custom HTTP handler mounted outside collection CRUD for work that is not one document's create/read/update/delete; today the one organ-scoped handler is the destructive, one-shot `/next/seed` demo loader — run on a fresh instance, never over live data.**
