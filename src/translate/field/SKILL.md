---
name: field
description: "Use when Payload should self-translate a field on read — an afterRead field hook that projects the stored source value into req.locale through the shared messaging-uuid (the rosetta pivot), so a locale renders without per-locale storage. Falls back to the source where a rendering is the unregistered seed; never fabricates. This is how the CMS becomes self-translating: write once, any language/dialect is a computed projection."
atomPath: "translate/field"
coordinate: "translate/field · 2/share · a17260a9"
contentUuid: "0009cc4a-a2e1-5f0a-8c93-0c1029351fcd"
diamondUuid: "b0115718-3a57-8a3a-a4cf-63c27b318964"
uuid: "a17260a9-8e9d-84fd-8559-830c75d4df0e"
horo: 2
typography:
  partition: translate
  bondDegree: 358
standards:
  - "Payload field hooks (afterRead) · BCP-47 locale tags"
bindings: []
signatures:
  computationUuid: "0f661595-8601-84e7-8a71-1727e5dd8f21"
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
      stageUuid: "80db614b-878a-8472-b560-262ee8264895"
    - stage: seal
      stageUuid: "d8221ecb-17bb-81d1-9bc3-1ff729e25049"
    - stage: uuid
      stageUuid: "2f485117-1a13-82aa-99c7-e343f25ba24a"
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
