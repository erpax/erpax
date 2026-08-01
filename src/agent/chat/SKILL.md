---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 1/base · 75895ed5"
contentUuid: "0ede1602-6618-5701-b46d-d34f19e3d931"
diamondUuid: "8689fcb3-63a1-8447-ab6e-c6c32847124f"
uuid: "75895ed5-8e2d-8b12-9d27-cbcb19cdb4f9"
horo: 1
typography:
  partition: agent
  bondDegree: 156
standards: []
bindings: []
signatures:
  computationUuid: "7176db67-b11f-8fc7-bfe8-e76aebe9c7a1"
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
      stageUuid: "17cbb5a3-34ac-8388-9301-cce95d3b389b"
    - stage: seal
      stageUuid: "3bc287af-a0bb-8498-bab8-35d97e08171a"
    - stage: uuid
      stageUuid: "778bc099-a35f-8374-b37d-4cd16d4ab275"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
