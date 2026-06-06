---
name: chat
description: Use when reasoning about a chat thread as a merkle chain — each message a content-uuid, the thread folding to one chain-uuid; reordering or changing any message changes the thread-uuid (tamper-evident history).
---

# quantum/chat — the thread as a merkle chain

The quantum facet of [[chat]]: a thread is a **merkle chain** of message-uuids. Each [[message]] is a content-uuid ([[communication]]), and the thread folds them into ONE chain-uuid ([[merge]]) — a **tamper-evident history**: change, drop, or reorder any message and the thread-uuid changes. Merges into [[chat]].

Matter-twin: `src/quantum/chat/index.ts` (`threadUuid` · `appended`). Composes [[chat]] · [[communication]] · [[merge]] · [[uuid]] · [[quantum]].

@standard merkle hash-chain; RFC 9562 §5.8 content-uuid
