---
name: event
description: "Use when reasoning about event — A domain **event** is the matter that crosses the hooks seam: a collection's hook detects a state transition and emits an envelope; subscribers (the GL-posting handler, audit, noti"
atomPath: event
coordinate: "event · 8/crest · 9578100e"
contentUuid: "1ec64f4f-4b0b-5100-afa7-ac9c3a0be6ba"
diamondUuid: "d361826d-a216-88d4-85ba-b3e036ea0a35"
uuid: "9578100e-69da-860f-ade8-73ddb4f91503"
horo: 8
typography:
  partition: event
  bondDegree: 0
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "99a48cff-b769-8583-be17-13edeb15c527"
  stages:
    - stage: path
      stageUuid: "0e27f2e5-b2cd-8864-bfb3-cd85b8e484e3"
    - stage: trinity
      stageUuid: "96c532fd-2d69-8a8d-bd52-9ba4587144bd"
    - stage: boundary
      stageUuid: "8a0c406d-949f-834f-b42d-d88cab6a49ce"
    - stage: links
      stageUuid: "53d1601d-fb16-8e8a-8a1e-20606f84b737"
    - stage: horo
      stageUuid: "dd6e6fc1-36e2-8252-93fd-72c9b92bb014"
    - stage: seal
      stageUuid: "0505bbbd-26fd-8001-826a-802a7cbcacee"
    - stage: uuid
      stageUuid: "a61e93c7-3eea-8de5-bd07-d8a962f7003f"
version: 2
---
# event — the content-uuid-keyed domain event (the membrane payload)

A domain **event** is the matter that crosses the [[hooks]] seam: a collection's `afterChange` hook detects a state transition and emits an envelope; subscribers (the GL-posting handler, audit, notifications) AND **other erpax instances** (federation peers) consume it. The event is how universes connect (see [[hooks]] "Hooks are where multiverses connect", [[flow]] event streams).

## Envelope shape
`{ eventId, eventType, tenantId, aggregateId, aggregateType, timestamp, userId?, payload }`.

## The law: aggregateId is the content-uuid (the 0)
**`aggregateId` MUST be the aggregate's content-`uuid` ([[identity]]), not its instance-local row `id`.** Under `idType:'uuid'` the row `id` is a *random* per-instance DB uuid; the content-`uuid` is a parallel field (sha of content — same content ⇒ same uuid on every instance). The canonical generic emitter already does this — `src/hooks/chainEventEmitters.ts`: `aggregateId: next.uuid ?? next.id`. Every hand-written domain hook MUST match (`String(doc.uuid ?? doc.id)`), or the **same logical event from two instances carries different aggregateIds and federation can't reconcile** (set-union dedup breaks — see [[merge]]). `src/services/federation/exchange.ts` dedups/verifies on the content `uuid` (`isAlreadyImported(e.uuid)`, `verifyContentUuid`), so an event keyed by the random `id` is invisible to that path.

- **`eventId` may be random** (`uuid()` v4) — each emission is a distinct event instance; dedup happens on the aggregate's content uuid (the envelope), not on `eventId`.
- **`payload.*Id` refs**: a sub-event that targets *another* aggregate (a line item, the invoice a payment settles) carries that target's identity; key it by content-uuid too where the consumer may be a peer.

## Applying it
- Emit in `afterChange` only on the real transition (`justActivated(doc, prev)`), idempotently (skip if the linked JE/uuid already set).
- Keep the emit lightweight; heavy work → [[jobs]].

## Common mistakes
- `aggregateId: String(doc.id)` — the **random** db id; bypasses the content-uuid and breaks cross-instance reconciliation. Use `String(doc.uuid ?? doc.id)`.
- Re-deriving identity off the integer/local id anywhere a federation peer will read it.
- Doing the GL post inline in the hook instead of emitting and letting the subscriber post (see `chainEventEmitters` + the GL-posting subscriber).

Composes: [[hooks]] (the emit seam) · [[identity]] (the content-uuid aggregate key) · [[merge]] (federation reconciliation/dedup) · [[flow]] (event streams) · [[accounting]] (GL-posting subscriber).
