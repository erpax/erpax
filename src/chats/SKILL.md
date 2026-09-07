---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: "chats · 8/crest · 5f59dbd1"
contentUuid: "cf0c5404-4826-5c04-b196-c025f1082f84"
diamondUuid: "babe5ef5-b614-8b6a-8c6f-941c03e55802"
uuid: "5f59dbd1-33c4-8843-bedd-3d956ae7796a"
horo: 8
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
  computationUuid: "f85ecd6d-2e93-8fc6-a414-18792368ccdf"
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
      stageUuid: "4244db7e-b851-856a-858f-6189e2ebfebd"
    - stage: seal
      stageUuid: "9abbdb64-e077-839d-a9a0-90668d99ed36"
    - stage: uuid
      stageUuid: "c9dfcd71-a299-8b45-ae72-bd37baacd69b"
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
