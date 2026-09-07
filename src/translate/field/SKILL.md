---
name: field
description: "Use when Payload should self-translate a field on read — an afterRead field hook that projects the stored source value into req.locale through the shared messaging-uuid (the rosetta pivot), so a locale renders without per-locale storage. Falls back to the source where a rendering is the unregistered seed; never fabricates. This is how the CMS becomes self-translating: write once, any language/dialect is a computed projection."
atomPath: "translate/field"
coordinate: "translate/field · 4/weave · a08690b3"
contentUuid: "9f6a42c9-0772-531d-b9c7-7d750cdd400e"
diamondUuid: "b691d722-3a39-807f-926c-5cd52035d654"
uuid: "a08690b3-4f4d-89ac-bcda-4244f5400d2c"
horo: 4
typography:
  partition: translate
  bondDegree: 358
standards:
  - "Payload field hooks (afterRead) · BCP-47 locale tags"
bindings: []
signatures:
  computationUuid: "82bf4bc1-8397-8f18-be8f-0c3cd932c579"
  stages:
    - stage: path
      stageUuid: "f166fc87-1d28-88f7-9953-5dacfcbb2451"
    - stage: trinity
      stageUuid: "7ada78da-4694-89ee-8f23-dc5e19103360"
    - stage: boundary
      stageUuid: "dd140a8f-6f80-85a4-a2e6-c5ba38fe680d"
    - stage: links
      stageUuid: "b1067e74-2fd4-811e-b16e-ff6fb3e1adc8"
    - stage: horo
      stageUuid: "c8407118-c4b5-84c1-a904-da0925112e3c"
    - stage: seal
      stageUuid: "d8221ecb-17bb-81d1-9bc3-1ff729e25049"
    - stage: uuid
      stageUuid: "d89ff795-0f0e-8efb-94ab-9195bc745f54"
version: 2
---
# field — the Payload translate hook

Payload uses this hook to become **self-translating**. It is an `afterRead` field hook: on read, it projects the stored source value into `req.locale` **through the shared messaging-uuid** ([[translation]] · `translateVia`), so a field renders in any language or dialect **without per-locale storage**. Write the source once; every locale is a computed projection.

- **Rosetta pivot at read-time** — the N²-pair translation matrix folds to N renderings + one pivot, evaluated by the hook. `bg` and `de` render from the same uuid with no bg↔de table.
- **Honest fallback** — where a locale's rendering is the unregistered **seed**, the hook returns the **source** unchanged. It never fabricates a translation. Non-string / empty / non-concept values pass through.

Matter-twin: `src/translate/field/index.ts` — `translateField(table)`, a `FieldHook` factory closed over a [[translation]] table (dependency-injected, so it stays pure and testable). Wired into the central [[hooks]] barrel for collections to use.

**Honest boundary.** The projection and the O(L)-not-O(L²) routing are computed; the per-language/dialect **content** (the renderings) is the seed — a dictionary or model registers it, surfaced as `seed:true` upstream, never invented. Arbitrary free text beyond the registered concept table is the model's job (the oracle bit), not this hook's.

**Law — [[law]]: the CMS self-translates by projecting through the shared uuid, not by storing pairs. Write the source once; render any locale via the rosetta pivot at read-time; fall back to the source where the rendering is still the seed, and never fabricate.**

## Standards

- **Payload field hooks** — `afterRead` field hook contract.
- **BCP-47** — language and dialect subtags as the locale keys.

Composes: [[translation]] · [[translate]] · [[hooks]] · [[law]].
