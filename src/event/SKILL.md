---
name: event
description: "Use when reasoning about event — A domain **event** is the matter that crosses the hooks seam: a collection's hook detects a state transition and emits an envelope; subscribers (the GL-posting handler, audit, noti"
atomPath: event
coordinate: "event · 5/round · 4b1025ef"
contentUuid: "3aae36f2-d05d-51b9-93dd-0ae89cbc4ccb"
diamondUuid: "e1f6c421-f22a-8ebd-bbf8-a180d21bf144"
uuid: "4b1025ef-93d5-86db-9ca0-d3b7b525702d"
horo: 5
bonds:
  in:
    - accounting
    - agent
    - arts
    - attendance
    - beyond
    - broadcast
    - business
    - calendar
    - childrens
    - comedy
    - conference
    - connections
    - corruption
    - dance
    - delivery
    - demand
    - emitter
    - engine
    - enumeration
    - exhibition
    - federation
    - flow
    - food
    - hook
    - hooks
    - identity
    - instantaneous
    - jobs
    - life
    - literary
    - merge
    - mode
    - music
    - notification
    - performing
    - publication
    - realtime
    - released
    - reservation
    - sale
    - screening
    - sectors
    - series
    - social
    - sports
    - stream
    - sub
    - supto
    - theater
    - venue
    - visit
    - visual
    - workflow
  out:
    - accounting
    - agent
    - arts
    - attendance
    - beyond
    - broadcast
    - business
    - calendar
    - childrens
    - comedy
    - conference
    - connections
    - corruption
    - dance
    - delivery
    - demand
    - emitter
    - engine
    - enumeration
    - exhibition
    - federation
    - flow
    - food
    - hook
    - hooks
    - identity
    - instantaneous
    - jobs
    - life
    - literary
    - merge
    - mode
    - music
    - notification
    - performing
    - publication
    - realtime
    - released
    - reservation
    - sale
    - screening
    - sectors
    - series
    - social
    - sports
    - stream
    - sub
    - supto
    - theater
    - venue
    - visit
    - visual
    - workflow
typography:
  partition: event
  bondDegree: 0
  neighbors: []
standards:
  - "ISO/IEC-29119"
bindings: []
neighbors:
  wikilink:
    - accounting
    - flow
    - hooks
    - identity
    - jobs
    - merge
  matrix:
    - accounting
    - agent
    - arts
    - attendance
    - beyond
    - broadcast
    - business
    - calendar
    - childrens
    - comedy
    - conference
    - connections
    - corruption
    - dance
    - delivery
    - demand
    - emitter
    - engine
    - enumeration
    - exhibition
    - federation
    - flow
    - food
    - hook
    - hooks
    - identity
    - instantaneous
    - jobs
    - life
    - literary
    - merge
    - mode
    - music
    - notification
    - performing
    - publication
    - realtime
    - released
    - reservation
    - sale
    - screening
    - sectors
    - series
    - social
    - sports
    - stream
    - sub
    - supto
    - theater
    - venue
    - visit
    - visual
    - workflow
  backlinks:
    - accounting
    - agent
    - arts
    - attendance
    - beyond
    - broadcast
    - business
    - calendar
    - childrens
    - comedy
    - conference
    - connections
    - corruption
    - dance
    - delivery
    - demand
    - emitter
    - engine
    - enumeration
    - exhibition
    - federation
    - flow
    - food
    - hook
    - hooks
    - identity
    - instantaneous
    - jobs
    - life
    - literary
    - merge
    - mode
    - music
    - notification
    - performing
    - publication
    - realtime
    - released
    - reservation
    - sale
    - screening
    - sectors
    - series
    - social
    - sports
    - stream
    - sub
    - supto
    - theater
    - venue
    - visit
    - visual
    - workflow
signatures:
  computationUuid: "3a3e1f0c-4d35-82cd-82d1-ea5d6608363f"
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
      stageUuid: "a5bd89b8-b40f-8eae-81a6-fc65f322eab4"
    - stage: seal
      stageUuid: "0505bbbd-26fd-8001-826a-802a7cbcacee"
    - stage: uuid
      stageUuid: "832f37c6-cd65-8bf4-a67d-af3fe184ba29"
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
