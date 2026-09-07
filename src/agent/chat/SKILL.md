---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 4/weave · 8a55d348"
contentUuid: "aa02da93-5ab9-5ee2-832a-364f2123c839"
diamondUuid: "e4bd16c0-d560-8591-90e9-1c20d77dbf38"
uuid: "8a55d348-a9e5-827e-9ae6-e15a64bd8846"
horo: 4
typography:
  partition: agent
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "797d61f9-9316-8380-b2b6-6dc06738f396"
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
      stageUuid: "05518d27-b914-83c2-a474-f2637a04904b"
    - stage: seal
      stageUuid: "73b6a997-6ed0-8070-82f3-fc3717fb1eed"
    - stage: uuid
      stageUuid: "24ff739b-f482-81f5-a12a-f7a82aa5e1a6"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
