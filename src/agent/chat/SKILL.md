---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 1/base · f46e9699"
contentUuid: "c92b08da-f8f6-53c8-a93d-f0b9fcb05e1f"
diamondUuid: "81615fc3-1271-8544-adf9-5951919cc31f"
uuid: "f46e9699-2af2-80fc-a142-3108a82111b5"
horo: 1
typography:
  partition: agent
  bondDegree: 157
standards: []
bindings: []
signatures:
  computationUuid: "1f3dd50c-0bbb-88be-8003-eb8a4e614af6"
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
      stageUuid: "97942f4a-2246-8f74-9f5f-d006d9ff6002"
    - stage: seal
      stageUuid: "73b6a997-6ed0-8070-82f3-fc3717fb1eed"
    - stage: uuid
      stageUuid: "22c19226-cf8d-87ec-8a00-17a125b471c0"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
