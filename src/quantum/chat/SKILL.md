---
name: chat
description: Use when reasoning about a chat thread as a merkle chain — each message a content-uuid, the thread folding to one chain-uuid; reordering or changing any message changes the thread-uuid (tamper-evident history).
---

# quantum/chat — the thread as a merkle chain

The quantum facet of [[chat]]: a thread is a **merkle chain** of message-uuids. Each [[message]] is a content-uuid ([[communication]]), and the thread folds them into ONE chain-uuid ([[merge]]) — a **tamper-evident history**: change, drop, or reorder any message and the thread-uuid changes. Merges into [[chat]].

Matter-twin: `src/quantum/chat/index.ts` (`threadUuid` · `appended`). Composes [[chat]] · [[communication]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the thread-uuid is the order-dependent merkle fold of its message-uuids — `threadUuid` reduces them through `merge` from a fixed seed, so it is determined entirely by which messages are present and in what order. Appending, dropping, reordering, or altering any one message changes the thread-uuid (`appended` proves the append case), and no rewritten thread can reproduce a prior thread-uuid: the history is tamper-evident by construction.**

@standard merkle hash-chain; RFC 9562 §5.8 content-uuid
