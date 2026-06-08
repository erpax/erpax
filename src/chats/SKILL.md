---
name: chats
description: "Use when reasoning about the agent-society room native to Payload — the per-tenant content-addressed event bus where each row is an ErpaxEvent envelope an agent published; the queryable, auditable akashic chat history that replaces the external chat.erpax.com Durable Object. Distinct from messages (user-to-user mail). The agent-bus collection."
atomPath: chats
coordinate: chats · 2/share · dfa24807
contentUuid: "4f53b320-30cd-566f-a684-6d624e68f00b"
diamondUuid: "de58716d-abe3-80a2-b9e9-0d313378a54f"
uuid: "dfa24807-5eaf-810b-a166-7832903935eb"
horo: 2
bonds:
  in:
    - content
    - law
    - thing
    - uuid
  out:
    - content
    - law
    - thing
    - uuid
typography:
  partition: chats
  bondDegree: 12
  neighbors: []
standards:
  - "ILO-C001"
  - "ISO-27001"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)"
  - "ISO/IEC-27001:2022"
  - "RFC 9562 §5.8 content-uuid event-identity (idempotency key)"
  - "RFC-9562"
  - "W3C ActivityPub server-to-server activity-distribution (the model)"
  - "W3C-ActivityPub"
bindings: []
neighbors:
  wikilink:
    - content
    - law
    - thing
    - uuid
  matrix:
    - content
    - law
    - thing
    - uuid
  backlinks:
    - content
    - law
    - thing
    - uuid
signatures:
  computationUuid: "2d4d178b-f2cc-823f-89b4-97d9af9bfd3f"
  stages:
    - stage: path
      stageUuid: "edda5832-20f2-824b-872d-a9901d545e16"
    - stage: trinity
      stageUuid: "d8fda50e-1318-80ca-a05a-50e056257fba"
    - stage: boundary
      stageUuid: "b99bfec7-cc50-8e99-8ca9-c50a8085c80c"
    - stage: links
      stageUuid: "b8409385-df35-8cc9-9182-4391a2f1fd4e"
    - stage: horo
      stageUuid: "a1f14b46-31e9-8514-b443-69f84c314bf2"
    - stage: seal
      stageUuid: "a88cb707-f353-8334-b8f2-e1ce60c58cb4"
    - stage: uuid
      stageUuid: "8ebb3c71-363d-87d1-99c6-c14d951d94ba"
version: 2
---
# chat

Chat — the agent-society room, native to Payload: each row is a content-addressed agent event (ErpaxEvent envelope), scoped per tenant (the room); the akashic chat history. Distinct from `messages` (user mail).

This is the single-folder collection node: `index.ts` (schema + standards banners) lives here.
One folder per collection ⇒ no scatter ⇒ no drift.

Entangled with — [[content]] · [[thing]]

**Law — [[law]]: chat is the per-tenant content-addressed agent-event bus where each row is an ErpaxEvent envelope keyed by content-[[uuid]] (idempotent, the akashic agent history) — distinct from messages (user mail).**

## Standards
- W3C ActivityPub server-to-server activity-distribution (the model)
- RFC 9562 §5.8 content-uuid event-identity (idempotency key)
- ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
