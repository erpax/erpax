---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 1/base · da5ba865"
contentUuid: "6b5e15bf-b297-5039-a1eb-3ebf617d5f7e"
diamondUuid: "14cffb3e-ce73-82bd-b619-0b468e46a0c9"
uuid: "da5ba865-aefb-84d3-b888-61fd0610b9ff"
horo: 1
typography:
  partition: agent
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "1a09c417-eb67-800f-9f2f-55a6cad57aca"
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
      stageUuid: "5530d99b-1199-87f8-8f0a-04064ee21a39"
    - stage: seal
      stageUuid: "73b6a997-6ed0-8070-82f3-fc3717fb1eed"
    - stage: uuid
      stageUuid: "54488f39-659f-8a90-9f68-14d32df2c142"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
