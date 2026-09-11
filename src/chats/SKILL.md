---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: "chats · 2/share · 21795720"
contentUuid: "2f201e30-9cf3-51af-81c3-1a69e6d2b29d"
diamondUuid: "22b3c943-855b-8647-a5d0-3091e6c8d47f"
uuid: "21795720-b7cb-8e6d-afe8-811b6e543ae8"
horo: 2
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
  computationUuid: "e022b05d-3ced-816d-b845-6f319cc75abb"
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
      stageUuid: "c1de3366-95bb-8335-b046-b423319264db"
    - stage: seal
      stageUuid: "9abbdb64-e077-839d-a9a0-90668d99ed36"
    - stage: uuid
      stageUuid: "b16300fc-b24d-83d5-8804-d2dfc9fe6b6a"
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
