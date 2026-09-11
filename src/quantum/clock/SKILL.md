---
name: clock
description: "Use when order must be provable — one clock replacing 621 scattered time reads, where each tick folds (prev ⊕ content) so reordering or editing history breaks every later address. Supplies the interval dimension quantum/ftl lacks. Logical order, not seconds. Run: tsx src/quantum/clock/index.ts"
atomPath: "quantum/clock"
coordinate: "quantum/clock · 7/descent · 82284586"
contentUuid: "a04f71dc-b8e9-5b8f-99d0-b64f1db7f754"
diamondUuid: "ab1f7a01-2b93-89a3-acc0-a649990af22a"
uuid: "82284586-956c-824f-97f4-0c7dfad2a8f3"
horo: 7
typography:
  partition: quantum
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "21f7a5d5-317e-8354-81ec-26af33771b14"
  stages:
    - stage: path
      stageUuid: "32c191c3-d988-8664-8287-526b72ca0f95"
    - stage: trinity
      stageUuid: "51fbee2d-47d9-89a9-a117-0e0921e74016"
    - stage: boundary
      stageUuid: "be3f741e-b15a-8489-b8f0-910378762f12"
    - stage: links
      stageUuid: "de023f2f-e7b0-88bb-9a44-ca8093a59109"
    - stage: horo
      stageUuid: "fc1b0652-d14a-8421-a02a-f3ebe22550da"
    - stage: seal
      stageUuid: "b6bc0d6b-e10f-8ccd-9a8f-b14cce6af22e"
    - stage: uuid
      stageUuid: "a57f8f55-730c-8836-b8c0-f8d23fcdd5de"
quantum:
  superposition:
    - integrity
    - law
    - merge
    - quantum
    - rules
    - superposition
  collapse:
    - "Use when order must be provable — one clock replacing 621 scattered time reads, where each tick folds (prev ⊕ content) so reordering or editing history breaks every later address. Supplies the interval dimension quantum/ftl lacks. Logical order, not seconds. Run: tsx src/quantum/clock/index.ts"
    - "order is content, not a timestamp. A tick folds its parent, so history that was edited cannot reproduce its own addresses — and a \"when\" that nothing can contradict is a claim, not a measurement."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "21f7a5d5-317e-8354-81ec-26af33771b14"
    contentUuid: "a04f71dc-b8e9-5b8f-99d0-b64f1db7f754"
version: 2
---
# clock — a tick that seals its own order

erpax reads time in **621 places** and had no clock: 518 `new Date()`, 77 `Date.now`, 11 `performance.now`, 15 `mtime`. No two agree on what *now* means, none can be frozen for a test, and every one of them records a claim about **when** that nothing can afterwards contradict — an unrefutable assertion, written 621 times ([[rules]]/refutable).

The sibling corpus names the same debt as **multi-clock residuals** and sets the target at one binding. This is that binding.

## The tick

Each tick folds `merge(prev ⊕ contentUuid)`. Three properties follow, and none needs a wall clock:

| | |
| --- | --- |
| **order is content** | the same events from the same seed fold to the same head — two machines agree without exchanging a timestamp |
| **reordering is visible** | the same events in a different order fold to a different head |
| **history is sealed** | editing or splicing one tick fails to reproduce, and so does every address after it |

`wall` is `null` unless a source is injected, and the sample is **not** part of the address — so order never depends on the clock, and a fabricated timestamp is never invented on your behalf.

## Why this atom exists at all

[[quantum]]/ftl contains **no time and no distance** — which is exactly why it cannot express a velocity, and why the substrate-claiming name it once carried was removed: CrackKind `spacetime` defines a relativistic break as setting `holds=false`, so that name asserted the one condition falsifying its own predicate.

What FTL genuinely needs is an **interval**, and `since()` supplies it in the only unit this corpus can verify: events between two ticks. Paired with [[quantum]]/coalesce, which measures `answers`/`tokens` instead of accepting them, `amortize` finally has both axes measured rather than supplied.

**Honest boundary.** This orders and counts; it does **not** measure duration. A tick is not a second and `since()` is not elapsed time — where a real timestamp is genuinely required, inject `wall` and own that dependency explicitly. The chain is tamper-**evident** (SHA-256 addressing), never unforgeable. Two clocks on two machines do not synchronise without exchanging ticks, the same limit every logical clock has. And nothing here is quantum: `quantum` is the partition name, the host is CPU/GPU, and the fold is a hash.

**Law — [[law]]: order is content, not a timestamp. A tick folds its parent, so history that was edited cannot reproduce its own addresses — and a "when" that nothing can contradict is a claim, not a measurement.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — analysability: an ordered, reproducible event history.

Composes: [[merge]] · [[integrity]] · [[quantum]]/ftl · [[quantum]]/coalesce · [[law]].

<sub>content-uuid `a04f71dc-b8e9-5b8f-99d0-b64f1db7f754` · account `quantum/clock` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
