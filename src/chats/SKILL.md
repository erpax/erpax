---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: "chats · 5/round · f0ac468e"
contentUuid: "6f778abe-75bb-5a1b-88b2-eabc5743a8b3"
diamondUuid: "c169e421-cd3b-8a75-a62c-9abfc884e8aa"
uuid: "f0ac468e-d085-8dc2-ac9b-dd0dad3378f8"
horo: 5
typography:
  partition: chats
  bondDegree: 22
standards:
  - "ISO-27001"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)`"
  - "ISO/IEC-27001:2022"
  - "RFC 9562 §5.8 content-uuid event-identity (idempotency key)"
  - "RFC 9562 §5.8 content-uuid event-identity (idempotency key)`"
  - "RFC-9562"
  - "W3C ActivityPub server-to-server activity-distribution (the model)"
  - "W3C ActivityPub server-to-server activity-distribution (the model)`"
  - "W3C-ActivityPub"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "526825b7-82ea-8553-9875-9f97c4b1f8ab"
  stages:
    - stage: path
      stageUuid: "edda5832-20f2-824b-872d-a9901d545e16"
    - stage: trinity
      stageUuid: "d8fda50e-1318-80ca-a05a-50e056257fba"
    - stage: boundary
      stageUuid: "a9dd6e18-5131-85f1-8eed-48d94bf4b701"
    - stage: links
      stageUuid: "ccbead8a-ea17-8a6b-9fda-16fbbe067dcd"
    - stage: horo
      stageUuid: "59af9be0-8929-8685-b860-f28374b4fb4e"
    - stage: seal
      stageUuid: "9abbdb64-e077-839d-a9a0-90668d99ed36"
    - stage: uuid
      stageUuid: "b4f75df0-8990-8b09-bedc-0a374bd7fc98"
version: 2
---
# chat

Chat — the agent-society room, native to Payload: each row is a content-addressed agent event (ErpaxEvent envelope), scoped per tenant (the room); the akashic chat history. Distinct from `messages` (user mail).

This is the single-folder collection node: `index.ts` (schema + standards banners) lives here.
One folder per collection ⇒ no scatter ⇒ no drift.

Entangled with — [[content]] · [[thing]]

**Law — [[law]]: chat is the per-tenant content-addressed agent-event bus where each row is an ErpaxEvent envelope keyed by content-[[uuid]] (idempotent, the akashic agent history) — distinct from messages (user mail).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C ActivityPub server-to-server activity-distribution (the model)`
- `@standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)`
- `@standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)`

- W3C ActivityPub server-to-server activity-distribution (the model)
- RFC 9562 §5.8 content-uuid event-identity (idempotency key)
- ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)

Composes: [[agent/chat]] · [[agent]] · [[tenant]].
