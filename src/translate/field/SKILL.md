---
name: field
description: "Use when Payload should self-translate a field on read — an afterRead field hook that projects the stored source value into req.locale through the shared messaging-uuid (the rosetta pivot), so a locale renders without per-locale storage. Falls back to the source where a rendering is the unregistered seed; never fabricates. This is how the CMS becomes self-translating: write once, any language/dialect is a computed projection."
atomPath: "translate/field"
coordinate: "translate/field · 5/round · 623a515d"
contentUuid: "299a6276-caa7-5904-9256-e670fb065767"
diamondUuid: "c0752408-efc6-876c-960f-c6814e04ac40"
uuid: "623a515d-de25-8a54-8ff5-580e24461e8c"
horo: 5
typography:
  partition: translate
  bondDegree: 322
standards:
  - "Payload field hooks (afterRead) · BCP-47 locale tags"
bindings: []
signatures:
  computationUuid: "b746fab0-726b-8820-b015-38be3fd69375"
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
      stageUuid: "2f514667-8f76-8bb6-8145-79652938ef79"
    - stage: seal
      stageUuid: "d8221ecb-17bb-81d1-9bc3-1ff729e25049"
    - stage: uuid
      stageUuid: "ad23958f-7a57-8acd-a239-2c45745b70b1"
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
