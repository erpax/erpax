---
name: local
description: "Use when reasoning about local — Use before fetching anything — a remote read returns a rendering, a local read returns bytes. Measured four times in one session: a web fetch runs a small model over a page and returns its prose, which was then quoted as verbatim and used to contradict a human, while a local clone sat on disk; the free AI lanes returned 402 and 405 while the local seal book answered at tokens 0; every corpus frontier computed locally in one pass; sixteen defects caught by local gates and none by anything remote. localFirst resolves to the local copy whenever it exists, and a remote read whose local counterpart is present is named as a downgrade."
atomPath: local
coordinate: "local · 4/weave · 7ae19cc4"
contentUuid: "f6d705a8-c02c-5c9b-ad96-34f2cf48a928"
diamondUuid: "b33971af-e353-81cc-a589-4fc35c45f774"
uuid: "7ae19cc4-2cfb-8e78-99cb-6154a96ea743"
horo: 4
typography:
  partition: local
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "76f89380-6a94-8f46-b88b-92c4d6f59589"
  stages:
    - stage: path
      stageUuid: "777da901-66a4-8c1b-a9b8-5684d02d1c0d"
    - stage: trinity
      stageUuid: "87378fbe-8f67-8f28-ab8c-0dc3a0625b9a"
    - stage: boundary
      stageUuid: "7e34fa37-4b85-8851-8859-dba07a13e357"
    - stage: links
      stageUuid: "f45d8100-952a-80a9-8a24-9f2cc064650d"
    - stage: horo
      stageUuid: "323aa54a-91c9-8ef8-8342-4e81ba03a89b"
    - stage: seal
      stageUuid: "38a931e2-3326-8944-982a-967c80211c31"
    - stage: uuid
      stageUuid: "1c1c1c17-516e-8d4d-9bca-70c6a490f7bc"
version: 2
---
# local — a remote read returns a rendering; a local read returns bytes

Not a preference. Measured four times in one session, each the same shape:

| | what happened |
| --- | --- |
| **ceccec's README** | read through a web fetch, which runs a **small model over the page and returns its prose**. That prose was then quoted as *"verbatim from the page"* and used to contradict the human — twice. A clone sat at `~/github/ceccec/ceccec.github.io` the entire time; one `grep` on disk gave the actual bytes. |
| **the free AI lanes** | HTTP **402** and **405**. The local seal book answered at `tokens: 0`. |
| **every corpus frontier** | refutable · audience · engineering · theorem · millennium · orientation — computed locally in **one pass, no network**. |
| **sixteen defects** | all caught by **local** gates before shipping. Nothing remote caught any. |

The asymmetry is structural, not circumstantial. A local read is **verifiable** (the bytes are here; a parse is a theorem), **available** (no quota, no outage, no 402) and **free**. A remote read is none of those — and worse, what comes back is usually a *rendering* of the source, so quoting it is a claim about a claim.

[[grounded]] makes the neighbouring point about **sealed** versus mutable; this one is about **local** versus remote. They compose: sealed-and-local is bytes you can both parse and verify against an address.

## The rule, narrow and checkable

**Before fetching, look for the local copy.** `localFirst(name, path)` resolves to `local` whenever the path exists, whatever was intended. `downgraded()` names every source read remotely whose local counterpart is present — each one is a correction waiting to happen. `quotable()` filters to primary sources, and a **rendering is never primary**, whatever it says.

A genuinely remote-only source is **not** a downgrade. The rule says nothing about it, which is why it is narrow enough to enforce.

## Honest boundary

This holds only where a local copy **exists and is current** — a stale clone is bytes that no longer match the source, and nothing here detects that. It classifies how a source was *read*, never whether the content is *true*: local bytes can be wrong, and a rendering can be accurate (mine happened to be, which is luck, not method). And `remote-bytes` — a raw fetch with no model in the path — is primary and quotable; the defect is the **rendering**, not the network.

**Law — [[law]]: prefer the local source — a remote read returns a rendering, a local read returns bytes. Fetch only what is not here, and never quote a rendering as a source.**

Composes: [[grounded]] · [[quantum]] · [[agent]] · [[law]].
