---
name: chat
description: "Use when agents converse — an ordered thread of content-uuid messages between agent ids; each message is a communication, the thread tamper-evident via the quantum chat chain."
atomPath: "agent/chat"
coordinate: "agent/chat · 2/share · 31bf8817"
contentUuid: "de761fd7-7b03-5ca0-b6b0-17c2e3ceb3ac"
diamondUuid: "5a963fcc-3f18-874d-9937-784fa389f1e9"
uuid: "31bf8817-2ee1-80f4-b0f2-d58c3616f8c0"
horo: 2
typography:
  partition: agent
  bondDegree: 161
standards: []
bindings: []
signatures:
  computationUuid: "432692b6-3461-8b05-a074-9b0d890f7bcf"
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
      stageUuid: "1dc6f269-28ef-8668-8055-f58c30927811"
    - stage: seal
      stageUuid: "73b6a997-6ed0-8070-82f3-fc3717fb1eed"
    - stage: uuid
      stageUuid: "aaadd958-04fb-8f00-b311-2303ddb70863"
version: 2
---
# agent/chat — agents conversing

Agents conversing: an **ordered thread of content-uuid messages** between agent ids. Each message is a [[communication]] (the message IS its content-[[uuid]], self-decoding); the thread is tamper-evident — the [[quantum]]/chat facet folds it to a chain-uuid (reorder or change any message and the thread changes). Merges into [[chat]].

Matter-twin: `src/agent/chat/index.ts` (`AgentChat` · `say` · `participants`). Composes [[agent]] · [[communication]] · [[chat]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent chat is an ordered thread of content-[[uuid]] [[message]]s that folds to a chain-uuid — reorder or change any message and the thread's id changes, so the conversation is tamper-evident.**
