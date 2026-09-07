---
name: coalesce
description: "Use when many API requests must be served without many API calls — content-addressed single-flight collapses identical concurrent work onto ONE upstream call and bounds how much runs at once. Emits MEASURED answers/tokens for amortize, which is what makes the FTL claim refutable. Run: tsx src/quantum/coalesce/index.ts"
atomPath: "quantum/coalesce"
coordinate: "quantum/coalesce · 7/descent · 6a20b8ab"
contentUuid: "f9241f84-e2d9-5917-98ca-5121e2d79a4d"
diamondUuid: "f5cbe26d-561b-830f-8886-a543810492e6"
uuid: "6a20b8ab-6c09-89ea-a14f-2571857d203b"
horo: 7
typography:
  partition: quantum
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c99d00ab-e930-8b78-bc9a-b142b1f079ba"
  stages:
    - stage: path
      stageUuid: "742d7b1e-3ead-82eb-9a77-4d934cc999e4"
    - stage: trinity
      stageUuid: "41d8b628-3426-8a30-b25f-62cf4181dd97"
    - stage: boundary
      stageUuid: "04118db8-5acd-8e35-948d-11ac821ad081"
    - stage: links
      stageUuid: "b2d4ef7d-58a1-8b46-b819-b850e9c6474d"
    - stage: horo
      stageUuid: "16a28851-f5d7-8ec8-bbe6-6b3f5f0fc10b"
    - stage: seal
      stageUuid: "395ce11a-b2b5-8bb8-a496-82b51c8a6eca"
    - stage: uuid
      stageUuid: "3e56baaa-d289-84c9-b70d-abc330c63633"
quantum:
  superposition:
    - algebra
    - law
    - quantum
    - rules
    - superposition
  collapse:
    - "Use when many API requests must be served without many API calls — content-addressed single-flight collapses identical concurrent work onto ONE upstream call and bounds how much runs at once. Emits MEASURED answers/tokens for amortize, which is what makes the FTL claim refutable. Run: tsx src/quantum/coalesce/index.ts"
    - "identical work folds to one call. The address is a function of the content, so duplicate requests collapse provably; what remains is bounded on purpose, and the cost it reports is the cost it paid."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "c99d00ab-e930-8b78-bc9a-b142b1f079ba"
    contentUuid: "f9241f84-e2d9-5917-98ca-5121e2d79a4d"
version: 2
---
# coalesce — same content ⇒ same address ⇒ one upstream call

The primitives were already here and nothing used them. [[quantum]]/request has `requestUuid` · `idempotentReplay` · `cacheDedupKey` in 48 lines; the only real in-flight map in the corpus was **private** inside `remote/media/import`. So every other caller that asked the same question twice paid twice.

Two folds, both exact, both classical:

| fold | what it collapses |
| --- | --- |
| **address** | `requestUuid(body)` is a pure function of content, so two callers match *before* either call is made — the second attaches to the first. N identical requests ⇒ **1** upstream call. |
| **backpressure** | `concurrency` is a hard ceiling. A million accepted requests are a million *answers*, never a million simultaneous calls. |

The ceiling is the feature. Firing everything at once is how a client gets rate-limited, banned, or runs out of sockets — the queue is what makes millions survivable.

## Why this makes FTL refutable

`ftl.holds` = `precomputed && scalesToInfinity && cracks=∅`, and `scalesToInfinity` is `tokens === 0 && answers > 0` — every conjunct **caller-supplied**. So `efficiency → ∞` restates its own arguments, and nothing can contradict it ([[rules]]/refutable: a claim that forbids nothing asserts nothing).

The coalescer's `amortizeInput` method returns what it **actually did**: `answers` = requests served, `tokens` = calls actually made. Feed that to `amortize` and novel traffic yields `tokens > 0`, which **contradicts** holds. The claim becomes falsifiable, which is the only condition under which it can be true. The proof is pinned in `test.ts`: twenty novel bodies cost twenty, and replaying the same twenty costs nothing further — measured, not asserted.

**Honest boundary.** This reduces the NUMBER of upstream calls. It does not make one remote call faster, it cannot exceed a provider's quota, and it is **not a quantum algorithm** — the host is CPU/GPU (`QPU`), and the fold here is a hash and a map ([[quantum]]/ftl: CrackKind `qpu` is the exotic-device claim, forbidden). A settled answer is only replayed under `retain`, because a cached value has a lifetime and serving it forever is staleness wearing a speedup's clothes. An upstream failure does not poison the address — the next caller may retry.

**Law — [[law]]: identical work folds to one call. The address is a function of the content, so duplicate requests collapse provably; what remains is bounded on purpose, and the cost it reports is the cost it paid.**

## Standards

- **ISO/IEC 25010:2023 §5.4** — performance efficiency: resource utilisation under load.

Composes: [[quantum]]/request · [[quantum]]/ftl · [[algebra]] · [[law]].

<sub>content-uuid `f9241f84-e2d9-5917-98ca-5121e2d79a4d` · account `quantum/coalesce` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
