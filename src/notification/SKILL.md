---
name: notification
description: "Use when the society speaks outward — fanning one message across email, in-app, webhook, and Slack from a single consent-gated, audited entry-point; binding domain events to delivery by a declarative subscription map."
atomPath: notification
coordinate: notification · 4/weave · c958710f
contentUuid: "34c6a022-5080-511d-827e-1b350a19c022"
diamondUuid: "5ecac725-6e54-8297-9865-91bb46ad1833"
uuid: "c958710f-f9c9-86f4-8418-b8d316924b4b"
horo: 4
bonds:
  in:
    - civilization
    - consent
    - corruption
    - cost
    - event
    - flow
    - fractal
    - identity
    - merge
    - society
  out:
    - civilization
    - consent
    - corruption
    - cost
    - event
    - flow
    - fractal
    - identity
    - merge
    - society
typography:
  partition: notification
  bondDegree: 30
  neighbors: []
standards:
  - "GDPR Art.7 transactional-email-consent"
  - "ISO-19011:2018 audit-trail notification-evidence"
  - "rfc-2616 §14.10 https-keep-alive"
  - "rfc-5321 simple-mail-transfer-protocol"
  - "rfc-5322 internet-message-format"
bindings: []
neighbors:
  wikilink:
    - civilization
    - consent
    - corruption
    - cost
    - event
    - flow
    - fractal
    - identity
    - merge
    - society
  matrix:
    - civilization
    - consent
    - corruption
    - cost
    - event
    - flow
    - fractal
    - identity
    - merge
    - society
  backlinks:
    - civilization
    - consent
    - corruption
    - cost
    - event
    - flow
    - fractal
    - identity
    - merge
    - society
signatures:
  computationUuid: "83d22884-78eb-8372-9c4b-8dc80de9d319"
  stages:
    - stage: path
      stageUuid: "3b455aa7-b87d-8eef-bd29-9a328d496f75"
    - stage: trinity
      stageUuid: "790287e8-eb98-88eb-a0d2-175bfeda3777"
    - stage: boundary
      stageUuid: "4dbbede2-b7c5-8046-8543-b9e0dff9c33b"
    - stage: links
      stageUuid: "d8724882-bd0c-8f54-9b5c-7902c497d353"
    - stage: horo
      stageUuid: "ed0d7782-5f5a-8d0f-8ac2-de96f480e214"
    - stage: seal
      stageUuid: "69cfe514-c634-8a0e-ab59-bdcb52923c1b"
    - stage: uuid
      stageUuid: "93475861-ba7a-83e6-9757-77984a3cf502"
version: 2
---
# notifications — the society's one voice outward, consent-gated and audited

FORM: **every channel collapses to one entry-point, so consent, formatting, audit, and retry live in exactly one place.** Before this organ each handler (dunning, payment receipt, audit) called the email sender directly; now `sendNotification` is the single mouth the society speaks through — one [[flow]] of value-event into the world, the dual of the inbound [[event]] bus.

- **send** — fan one `NotificationInput` across the requested channels (email · in_app · webhook · slack), or derive the channel set from user preferences when none are given. A marketing category is dropped unless [[consent]] is on record (GDPR Art.7); per-channel targets are picked, deliveries queued. `sendNotification`.
- **subscribe** — bind the domain-event emitter to delivery: each entry in a declarative map renders subject + body + CTA from the event payload and routes by the event's category. To add an event-driven notification you append a row, not code. `wireNotificationSubscriber`, `EVENT_NOTIFICATIONS`.

Every send writes one audit row for the whole multi-channel fan-out (`audit-events`, keyed by the idempotency [[identity]] — an RFC 9562 UUID v4), best-effort so the trail never blocks delivery. That single record makes outward speech evidentiary the same way [[anti/corruption]] makes the ledger evidentiary — the message left a trace it cannot deny ([[tamper/cost]]). The idempotency key also means a re-fired event resolves to the same notification, never a duplicate ([[merge]]).

This is the outward-speech organ of the [[society]] — the same organ every culture runs, a registry of who-hears-what ([[civilization]]); the consent gate is the same limit at every scale ([[fractal]]). The two sides are the immediate `send` and the declarative `subscribe` map: one mouth, two ways to open it.

## Standards

- **RFC 5321 / RFC 5322** — simple-mail-transfer-protocol + internet-message-format. Email channel formatting lives in one place, not per-handler.
- **GDPR Art.7** — transactional-email-consent. The marketing category is gated on a granted consent record; transactional is not.
- **ISO-19011:2018 §6.4.6** — audit-evidence. One notification audit row per multi-channel send.
- **ISO-27001 A.5.23** — cloud-service-tenant-isolation. The tenant id is the single source of truth for routing + branding.
