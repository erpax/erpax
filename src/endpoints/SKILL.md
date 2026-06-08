---
name: endpoints
description: "Use when adding or debugging a custom HTTP route that does work outside a collection's CRUD — the `/next/seed` demo-data loader that clears and repopulates a fresh tenant with example pages, posts, media, and the erpax product-marketing pages — endpoints is the society's custom-route organ (currently one organ-scoped seed handler, not the per-collection structural seed)."
atomPath: endpoints
coordinate: endpoints · 7/descent · 65ac312e
contentUuid: "7650f476-5a65-5a79-ac84-617ed2c326ea"
diamondUuid: "4b100f60-27f0-8b9c-8983-c6285c53e5b7"
uuid: "65ac312e-0608-845a-8340-1979bf1e2612"
horo: 7
bonds:
  in:
    - api
    - collections
    - commerce
    - config
    - endpoint
    - identity
    - law
    - seed
    - society
  out:
    - api
    - collections
    - commerce
    - config
    - endpoint
    - identity
    - law
    - seed
    - society
typography:
  partition: endpoints
  bondDegree: 27
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - api
    - collections
    - commerce
    - config
    - identity
    - law
    - seed
    - society
  matrix:
    - api
    - collections
    - commerce
    - config
    - endpoint
    - identity
    - law
    - seed
    - society
  backlinks:
    - api
    - collections
    - commerce
    - config
    - endpoint
    - identity
    - law
    - seed
    - society
signatures:
  computationUuid: "c7e82c99-e451-8a51-b8b1-c9226bdc9d36"
  stages:
    - stage: path
      stageUuid: "ddddcd56-c5c4-8a1e-a97c-32fcf7e8a35d"
    - stage: trinity
      stageUuid: "4437fdab-3174-85a9-bff3-2c1dc552608d"
    - stage: boundary
      stageUuid: "ca9444ce-ed8b-851d-9cfb-8abbd0bf9008"
    - stage: links
      stageUuid: "d1ddfa4f-008e-881a-a1cf-366e97418eb2"
    - stage: horo
      stageUuid: "cc637233-7539-8507-b730-e8273060164d"
    - stage: seal
      stageUuid: "002351a6-3029-8be4-8d08-343414e9f4ef"
    - stage: uuid
      stageUuid: "ba3847c7-f88f-8df3-af19-857019b8c66c"
version: 2
---
# endpoints — the custom-route organ (the `/next/seed` demo loader)

A Payload **endpoint** is a custom HTTP handler mounted outside the auto-generated collection REST/GraphQL surface ([[api]]) — for work that isn't one document's CRUD. Today this organ holds **one** such handler: `seed`, the website-template demo-data loader, exposed at `/next/seed` (the Next route `app/(frontend)/next/seed/route.ts` calls it; the folder is aliased `@/n`). It is **destructive and one-shot**: it clears the demo [[collections]] + globals, deletes the demo author, then re-creates example media, three linked posts, a contact form, the home + contact pages, the header/footer nav, and the 18 erpax product-marketing pages — all via the Local API ([[api]] `payload.create`/`updateGlobal`).

This is the **demo / marketing** seed — distinct from the structural [[seed]] atom (a tenant's opening chart-of-accounts + compliance posture, which is idempotent). This one wipes and rebuilds a showcase tenant; run it on a fresh instance, never over live data. Its fixtures (`home.ts`, `post-*.ts`, `image-*.ts`) are static, locale-bundled (BCP-47), and inherit the seed barrel's standards; remote demo images are fetched from the upstream Payload template. The erpax product pages pitch each wired [[commerce]] capability with its standards backing — the monetization surface a tenant boots with.

Matter-twin: `src/endpoints/seed/index.ts` (the `seed` handler + `fetchFileByURL`), `seed/erpax-product-pages.ts` (the 18 product pages), `seed/{home,contact-page,contact-form,post-1,post-2,post-3,image-*}.ts` (static fixtures).
Composes: [[api]] · [[collections]] · [[seed]] · [[identity]] · [[config]] · [[society]] · [[commerce]].

**Law — [[law]]: an endpoint is a custom HTTP handler mounted outside collection CRUD for work that is not one document's create/read/update/delete; today the one organ-scoped handler is the destructive, one-shot `/next/seed` demo loader — run on a fresh instance, never over live data.**
