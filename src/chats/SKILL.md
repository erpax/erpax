---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: "chats · 5/round · 803cf48b"
contentUuid: "9453253d-9f27-58fb-b90d-2942170544ca"
diamondUuid: "1696b41e-3af3-8f4a-99c9-1a42eb46def4"
uuid: "803cf48b-5a62-8534-b3b9-b3eb266c273c"
horo: 5
typography:
  partition: chats
  bondDegree: 14
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
  computationUuid: "46ea8377-1e8f-8aa6-92f1-bec5bf0701ff"
  stages:
    - stage: path
      stageUuid: "edda5832-20f2-824b-872d-a9901d545e16"
    - stage: trinity
      stageUuid: "d8fda50e-1318-80ca-a05a-50e056257fba"
    - stage: boundary
      stageUuid: "a9dd6e18-5131-85f1-8eed-48d94bf4b701"
    - stage: links
      stageUuid: "0418206a-d552-81c1-8a6e-f7e8fef68e4d"
    - stage: horo
      stageUuid: "156a42f4-63f6-86fb-a57d-dae803878e6e"
    - stage: seal
      stageUuid: "9abbdb64-e077-839d-a9a0-90668d99ed36"
    - stage: uuid
      stageUuid: "cf84ee42-d77f-8056-9e51-63b6f33ac056"
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
