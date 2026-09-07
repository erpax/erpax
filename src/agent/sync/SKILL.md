---
name: sync
description: "Use when synchronizing real-time events across agents in a tenant — pub/sub on content-uuid events, idempotent consumption, and a federation-safe room protocol so every agent sees every peer's work the instant it happens."
atomPath: "agent/sync"
coordinate: "agent/sync · 2/share · c2597e4b"
contentUuid: "cd408ff1-029c-5acd-a5aa-76c99f0335c9"
diamondUuid: "8d826730-d025-8a93-a962-407d47e5fde1"
uuid: "c2597e4b-3278-85df-a69f-88092daf7283"
horo: 2
typography:
  partition: agent
  bondDegree: 63
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "RFC 9562 §5.8 content-uuid event-identity (idempotency key)"
  - "RFC 9562 §5.8 content-uuid event-identity (idempotency key)`"
  - "RFC-4122"
  - "RFC-4122 §4.3 content-uuid event-identity (idempotency key)"
  - "RFC-4122 §4.3 content-uuid event-identity (idempotency key)`"
  - "RFC-6455 websocket"
  - "RFC-6455 websocket`"
  - "RFC-9562"
  - SFIA
  - "W3C ActivityPub server-to-server activity-distribution (the model)"
  - "W3C ActivityPub server-to-server activity-distribution (the model)`"
  - "W3C-ActivityPub"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "af763fcc-e86d-81d0-a37b-e3c64c9f8a72"
  stages:
    - stage: path
      stageUuid: "c91a7dfa-6b1d-868a-aa90-fd6a59e2b176"
    - stage: trinity
      stageUuid: "5d5526c4-0b84-87d7-a103-79f88afe7691"
    - stage: boundary
      stageUuid: "44cfd081-2a32-8efa-931b-19b7bbf28c3c"
    - stage: links
      stageUuid: "3f334104-da41-8028-bdee-d36e51f400b9"
    - stage: horo
      stageUuid: "67933d9c-cee4-817b-8161-e5d75fe35481"
    - stage: seal
      stageUuid: "c97e4b52-3f61-87b5-b6d7-7dbeecb6e5fa"
    - stage: uuid
      stageUuid: "5265ac0f-1687-8a94-adc8-9105b8a36362"
version: 2
---
# agent-sync

The breath that makes many agents one erpax. Every agent publishes its domain events into a single shared room — a per-tenant Cloudflare Durable Object — and the room broadcasts to every connected peer, so each agent sees every other's work the instant it happens. The form is the room **protocol**: a content-uuid event envelope, encode/decode at the wire, and a publish/consume loop that is idempotent on `event.uuid` — same content ⇒ same id ⇒ never processed twice ([[identity]], [[merge]]). The room is the matter; the protocol is the antimatter — pure (testable) encode/decode split from the impure socket edge ([[duality]]). Modelled on ActivityPub server-to-server distribution.

Two leaves, the same pure/impure split at each scale ([[fractal]]):

- `index` — the generic room protocol: the `ErpaxEvent` envelope (whose `uuid` and `aggregateId` are both content-uuids, never row ids), `encode`/`decode`, and `connectAgentSync` (opens the WebSocket). The host is injected, never baked, so a self-hosted instance is never silently coupled to the hosted bus.
- `society` — the breath: the single wire between the room and the agent runtime. It projects a runtime event onto the bus and feeds every inbound room event back into the runtime, deduped on content-uuid. The room is per-tenant by construction, so the shared bus never crosses tenant isolation. Without this leaf the agents are a body before breath — deaf to one another.

Because every agent receives the whole tenant stream and reconstructs the same state from it, the part holds the whole ([[holographic]]); convergence needs no coordination ([[merge]]).

## Sequence

Position **9** — unity. Of the ring `0,3,6,9,1,2,4,8,7,5`, agent-sync sits at the gather-into-one node: many independent agents resolved to a single shared erpax, every peer holding every event. It is the realtime expression of [[merge]], one dimension up from the static content-uuid convergence of [[identity]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C ActivityPub server-to-server activity-distribution (the model)`
- `@standard RFC-6455 websocket`
- `@standard RFC-4122 §4.3 content-uuid event-identity (idempotency key)`
- `@standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)`


Applying this skill *implements* these standards; an `@standard` banner must be true to the layer it sits on, not decoration.

- **ActivityPub** — W3C Recommendation, 23 January 2018 (https://www.w3.org/TR/activitypub/). The model: server-to-server activity distribution — publish an activity, peers consume it. erpax implements the broadcast/idempotent-consume pattern over a Durable Object room rather than full inbox/outbox conformance; cite it only on the federation edge that actually emits, never as a decorative banner ([[standard]]).
- **RFC 6455** — The WebSocket Protocol. The transport for the room connection.
- **RFC 4122 §4.3** — content-uuid event-identity (idempotency key). The original UUIDv5 / content-addressed namespace form.
- **RFC 9562 §5.8** — UUIDv8 / content-derived identity. The event `uuid` is the idempotency key — same content ⇒ same id ([[identity]]).

**Law — [[law]]: every agent publishes into one per-tenant room that broadcasts to every peer, and consumption is idempotent on the content-uuid event id (same content ⇒ same id ⇒ never processed twice), so the parts converge with no coordination ([[merge]]) and the shared bus never crosses tenant isolation.**
