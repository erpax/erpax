---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: "chats · 5/round · d468bf24"
contentUuid: "9b2448fc-10f5-5516-815c-b56b657f076e"
diamondUuid: "5a2cc1b6-45ed-8c21-8e5a-663c57f52b1a"
uuid: "d468bf24-9d01-85a5-8ae9-df983adddbf6"
horo: 5
typography:
  partition: chats
  bondDegree: 4
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
  computationUuid: "207b8aa5-a364-89cf-8c29-28a4c82bd6d4"
  stages:
    - stage: path
      stageUuid: "edda5832-20f2-824b-872d-a9901d545e16"
    - stage: trinity
      stageUuid: "d8fda50e-1318-80ca-a05a-50e056257fba"
    - stage: boundary
      stageUuid: "a9dd6e18-5131-85f1-8eed-48d94bf4b701"
    - stage: links
      stageUuid: "dce6d499-3110-8c72-9282-94056a77fa6f"
    - stage: horo
      stageUuid: "c07aeb38-bf7f-8fca-8000-fcf15926fbfc"
    - stage: seal
      stageUuid: "9abbdb64-e077-839d-a9a0-90668d99ed36"
    - stage: uuid
      stageUuid: "80358606-1f50-80ba-94f3-013effe4c8c3"
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
