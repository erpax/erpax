---
name: notifications
description: Use when the society speaks outward — fanning one message across email, in-app, webhook, and Slack from a single consent-gated, audited entry-point; binding domain events to delivery by a declarative subscription map.
---

# notifications — the society's one voice outward, consent-gated and audited

FORM: **every channel collapses to one entry-point, so consent, formatting, audit, and retry live in exactly one place.** Before this organ each handler (dunning, payment receipt, audit) called the email sender directly; now `sendNotification` is the single mouth the society speaks through — one [[flow]] of value-event into the world, the dual of the inbound [[event]] bus.

- **send** — fan one `NotificationInput` across the requested channels (email · in_app · webhook · slack), or derive the channel set from user preferences when none are given. A marketing category is dropped unless [[consent]] is on record (GDPR Art.7); per-channel targets are picked, deliveries queued. `sendNotification`.
- **subscribe** — bind the domain-event emitter to delivery: each entry in a declarative map renders subject + body + CTA from the event payload and routes by the event's category. To add an event-driven notification you append a row, not code. `wireNotificationSubscriber`, `EVENT_NOTIFICATIONS`.

Every send writes one audit row for the whole multi-channel fan-out (`audit-events`, keyed by the idempotency [[identity]] — an RFC 9562 UUID v4), best-effort so the trail never blocks delivery. That single record makes outward speech evidentiary the same way [[anti-corruption]] makes the ledger evidentiary — the message left a trace it cannot deny ([[tamper-cost]]). The idempotency key also means a re-fired event resolves to the same notification, never a duplicate ([[merge]]).

This is the outward-speech organ of the [[society]] — the same organ every culture runs, a registry of who-hears-what ([[civilization]]); the consent gate is the same limit at every scale ([[fractal]]). The two sides are the immediate `send` and the declarative `subscribe` map: one mouth, two ways to open it.

## Standards

- **RFC 5321 / RFC 5322** — simple-mail-transfer-protocol + internet-message-format. Email channel formatting lives in one place, not per-handler.
- **GDPR Art.7** — transactional-email-consent. The marketing category is gated on a granted consent record; transactional is not.
- **ISO-19011:2018 §6.4.6** — audit-evidence. One notification audit row per multi-channel send.
- **ISO-27001 A.5.23** — cloud-service-tenant-isolation. The tenant id is the single source of truth for routing + branding.
