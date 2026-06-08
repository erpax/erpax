---
name: event
description: "Use when reasoning about event — A domain **event** is the matter that crosses the hooks seam: a collection's hook detects a state transition and emits an envelope; subscribers (the GL-posting handler, audit, noti"
atomPath: event
coordinate: event · 5/round · 8e1db417
contentUuid: "3587e270-6d4a-583b-9316-c2a947fe8c89"
diamondUuid: "b9084953-8843-859b-bfb4-2fc4fb7a56e6"
uuid: "8e1db417-8eaf-884f-92ba-11ad5a58eb90"
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
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
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
  computationUuid: "e3769ee7-6c86-8524-91f5-805e66663216"
  stages:
    - stage: path
      stageUuid: "0e27f2e5-b2cd-8864-bfb3-cd85b8e484e3"
    - stage: trinity
      stageUuid: "479b28d9-bb55-8ddd-a4bc-4de1b08de0c1"
    - stage: boundary
      stageUuid: "855d87ff-0d9f-8d77-9bb5-6559d5c7cc8c"
    - stage: links
      stageUuid: "53d1601d-fb16-8e8a-8a1e-20606f84b737"
    - stage: horo
      stageUuid: "a0510628-61b9-82ba-a684-8533641d25cc"
    - stage: seal
      stageUuid: "0505bbbd-26fd-8001-826a-802a7cbcacee"
    - stage: uuid
      stageUuid: "8e6c040a-bcf7-84ae-b57a-08f6b0ddb0f1"
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
