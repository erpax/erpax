---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 2/share · ad4d4f08"
contentUuid: "cee17c44-0022-5541-9d7d-55fb4448eb5b"
diamondUuid: "7fdbb612-7a05-848d-b6fb-ac4bf9e1a925"
uuid: "ad4d4f08-659d-88c1-a4b2-2e2eda65647e"
horo: 2
typography:
  partition: agent
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "b4b59ea8-5fde-84a1-bd86-41c7e83cbee5"
  stages:
    - stage: path
      stageUuid: "98aef98a-97ad-869d-bca5-aaf4c28400e3"
    - stage: trinity
      stageUuid: "e4cdb329-f496-8df0-9f69-720ab2322df3"
    - stage: boundary
      stageUuid: "1bd02d88-063b-85a3-947c-a2a7fdedc121"
    - stage: links
      stageUuid: "5fe11ab5-ca41-8ea2-84e8-558410fba0bd"
    - stage: horo
      stageUuid: "94653036-a2a7-896c-ad57-667faeb4a461"
    - stage: seal
      stageUuid: "73b6a997-6ed0-8070-82f3-fc3717fb1eed"
    - stage: uuid
      stageUuid: "d75ebbd0-55d5-8497-9f97-90059b35373f"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
