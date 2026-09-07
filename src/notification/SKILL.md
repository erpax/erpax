---
name: notification
description: "Use when the society speaks outward — fanning one message across email, in-app, webhook, and Slack from a single consent-gated, audited entry-point; binding domain events to delivery by a declarative subscription map."
atomPath: notification
coordinate: "notification · 8/crest · 60d85766"
contentUuid: "381e5e31-7806-5ab1-9cc3-330235b2ceea"
diamondUuid: "d74e676c-ccd9-8e88-91de-7acabb91791d"
uuid: "60d85766-1aab-8b56-b604-978f33281770"
horo: 8
typography:
  partition: notification
  bondDegree: 36
standards:
  - "GDPR Art.7 transactional-email-consent"
  - "rfc-2616 §14.10 https-keep-alive"
  - "rfc-2616 §14.10 https-keep-alive`"
  - "rfc-5321 simple-mail-transfer-protocol"
  - "rfc-5321 simple-mail-transfer-protocol`"
  - "rfc-5322 internet-message-format"
  - "rfc-5322 internet-message-format`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a96dbdfe-f5cd-86d8-991f-b93af0ae13a0"
  stages:
    - stage: path
      stageUuid: "3b455aa7-b87d-8eef-bd29-9a328d496f75"
    - stage: trinity
      stageUuid: "790287e8-eb98-88eb-a0d2-175bfeda3777"
    - stage: boundary
      stageUuid: "4dbbede2-b7c5-8046-8543-b9e0dff9c33b"
    - stage: links
      stageUuid: "69f2a58f-200b-88ac-be8a-658dae844a4f"
    - stage: horo
      stageUuid: "8ed79853-3fdb-8f7d-a232-bdc0c5f07e0d"
    - stage: seal
      stageUuid: "87bc6056-fe3a-8f50-9e56-93779e9c71d7"
    - stage: uuid
      stageUuid: "b38c3d87-fa01-8fe2-84fd-c0da3a6286a3"
version: 2
---
# notifications — the society's one voice outward, consent-gated and audited

FORM: **every channel collapses to one entry-point, so consent, formatting, audit, and retry live in exactly one place.** Before this organ each handler (dunning, payment receipt, audit) called the email sender directly; now `sendNotification` is the single mouth the society speaks through — one [[flow]] of value-event into the world, the dual of the inbound [[event]] bus.

- **send** — fan one `NotificationInput` across the requested channels (email · in_app · webhook · slack), or derive the channel set from user preferences when none are given. A marketing category is dropped unless [[consent]] is on record (GDPR Art.7); per-channel targets are picked, deliveries queued. `sendNotification`.
- **subscribe** — bind the domain-event emitter to delivery: each entry in a declarative map renders subject + body + CTA from the event payload and routes by the event's category. To add an event-driven notification you append a row, not code. `wireNotificationSubscriber`, `EVENT_NOTIFICATIONS`.

Every send writes one audit row for the whole multi-channel fan-out (`audit-events`, keyed by the idempotency [[identity]] — an RFC 9562 UUID v4), best-effort so the trail never blocks delivery. That single record makes outward speech evidentiary the same way [[anti/corruption]] makes the ledger evidentiary — the message left a trace it cannot deny ([[tamper/cost]]). The idempotency key also means a re-fired event resolves to the same notification, never a duplicate ([[merge]]).

This is the outward-speech organ of the [[society]] — the same organ every culture runs, a registry of who-hears-what ([[civilization]]); the consent gate is the same limit at every scale ([[fractal]]). The two sides are the immediate `send` and the declarative `subscribe` map: one mouth, two ways to open it.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard rfc-5321 simple-mail-transfer-protocol`
- `@standard rfc-5322 internet-message-format`
- `@standard rfc-2616 §14.10 https-keep-alive`


- **RFC 5321 / RFC 5322** — simple-mail-transfer-protocol + internet-message-format. Email channel formatting lives in one place, not per-handler.
- **GDPR Art.7** — transactional-email-consent. The marketing category is gated on a granted consent record; transactional is not.
- **ISO-19011:2018 §6.4.6** — audit-evidence. One notification audit row per multi-channel send.
- **ISO-27001 A.5.23** — cloud-service-tenant-isolation. The tenant id is the single source of truth for routing + branding.

Composes: [[tenant]] · [[seal]] · [[society]].
