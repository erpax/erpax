---
name: notification
description: "Use when the society speaks outward — fanning one message across email, in-app, webhook, and Slack from a single consent-gated, audited entry-point; binding domain events to delivery by a declarative subscription map."
atomPath: notification
coordinate: "notification · 2/share · 825c68d9"
contentUuid: "0b552bf2-4f48-5a4b-946a-d5c5bd0add97"
diamondUuid: "433e0ab3-1b86-8309-9417-2c311f2b0223"
uuid: "825c68d9-719d-8f3f-a73f-4f99bd7ea79c"
horo: 2
typography:
  partition: notification
  bondDegree: 27
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
  computationUuid: "f139a20c-96fc-8e24-8c15-ad1a4bef8c53"
  stages:
    - stage: path
      stageUuid: "3b455aa7-b87d-8eef-bd29-9a328d496f75"
    - stage: trinity
      stageUuid: "790287e8-eb98-88eb-a0d2-175bfeda3777"
    - stage: boundary
      stageUuid: "4dbbede2-b7c5-8046-8543-b9e0dff9c33b"
    - stage: links
      stageUuid: "4e44adae-1f44-8273-a260-ebbf5dc19b3a"
    - stage: horo
      stageUuid: "73ac513c-c5ef-87db-b441-3fe6080d0f09"
    - stage: seal
      stageUuid: "87bc6056-fe3a-8f50-9e56-93779e9c71d7"
    - stage: uuid
      stageUuid: "5030a505-823c-8556-a226-44177a21e979"
version: 2
---
# notifications — the society's one voice outward, consent-gated and audited

FORM: **every channel collapses to one entry-point, so consent, formatting, audit, and retry live in exactly one place.** Before this organ each handler (dunning, payment receipt, audit) called the email sender directly; now `sendNotification` is the single mouth the society speaks through — one flow of value-event into the world, the dual of the inbound [[event]] bus.

- **send** — fan one `NotificationInput` across the requested channels (email · in_app · webhook · slack), or derive the channel set from user preferences when none are given. A marketing category is dropped unless [[consent]] is on record (GDPR Art.7); per-channel targets are picked, deliveries queued. `sendNotification`.
- **subscribe** — bind the domain-event emitter to delivery: each entry in a declarative map renders subject + body + CTA from the event payload and routes by the event's category. To add an event-driven notification you append a row, not code. `wireNotificationSubscriber`, `EVENT_NOTIFICATIONS`.

Every send writes one audit row for the whole multi-channel fan-out (`audit-events`, keyed by the idempotency [[identity]] — an RFC 9562 UUID v4), best-effort so the trail never blocks delivery. That single record makes outward speech evidentiary the same way [[anti/corruption]] makes the ledger evidentiary — the message left a trace it cannot deny ([[tamper/cost]]). The idempotency key also means a re-fired event resolves to the same notification, never a duplicate ([[merge]]).

This is the outward-speech organ of the [[society]] — the same organ every culture runs, a registry of who-hears-what (civilization); the consent gate is the same limit at every scale (fractal). The two sides are the immediate `send` and the declarative `subscribe` map: one mouth, two ways to open it.

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
