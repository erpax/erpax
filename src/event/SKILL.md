---
name: event
description: "Use when reasoning about event — A domain **event** is the matter that crosses the hooks seam: a collection's hook detects a state transition and emits an envelope; subscribers (the GL-posting handler, audit, noti"
atomPath: event
coordinate: "event · 1/base · df96b0fb"
contentUuid: "37f33595-d899-545c-a2ac-c00063daa8af"
diamondUuid: "010ef069-698f-86bf-8f0f-dff3b4f985ad"
uuid: "df96b0fb-7b01-80b3-9953-16ac8d94220e"
horo: 1
typography:
  partition: event
  bondDegree: 159
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "6848f825-687f-8b77-a1aa-e86edac06bf1"
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
      stageUuid: "83719855-3d46-8bd1-a32b-e26d4b9dd9d4"
    - stage: seal
      stageUuid: "c3baa5c0-4275-889a-a370-17c7d074822c"
    - stage: uuid
      stageUuid: "ef745792-1eb1-8d1a-b2aa-7d5ab271c035"
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
