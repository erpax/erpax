---
name: monitor
description: "Use when reasoning about patient monitor — hospital bedside vitals facet; pivot to @/medical/device registry. Also: realtime corpus violation monitor via @/monitor/violations (all gate axes, path-account bonded)."
atomPath: monitor
coordinate: "monitor · 4/weave · 2f68da6d"
contentUuid: "6eccb531-0205-507c-a75c-de26a1a3bb0b"
diamondUuid: "fc9e759b-1c91-8ec5-8c9e-b6ff94c8e812"
uuid: "2f68da6d-1522-86c7-b3f1-8898bc87ca1b"
horo: 4
typography:
  partition: monitor
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "8765a96d-3dd1-8be8-b0ae-df2ef1a93e2b"
  stages:
    - stage: path
      stageUuid: "48a30b3f-d283-8031-b938-a9ed3d5bbb7e"
    - stage: trinity
      stageUuid: "5efca0bc-f646-807d-809d-6fde3d369ce2"
    - stage: boundary
      stageUuid: "824a5022-365d-844a-8c48-9fdfead51916"
    - stage: links
      stageUuid: "094be6c4-3ac0-84ce-867b-e8553bb5f7bd"
    - stage: horo
      stageUuid: "a726d0ee-d6e7-8b7f-997c-242e3114e48b"
    - stage: seal
      stageUuid: "79116894-663f-85ce-944f-df4db398ed7b"
    - stage: uuid
      stageUuid: "f12d83d6-eb0d-8e73-a885-96cb9da61980"
version: 2
---
# monitor — patient bedside monitor facet

Hospital **patient monitor** modality — HR, SpO₂, and systolic BP captured at the bedside, collapsed into a `DeviceReading` and wired through [[medical/device]] → [[readings]] → [[quantum/emr]].

**Pivot.** `deviceReadingFromMonitor` · `wireModalityToEmr('monitor', …)` — zero duplication ([[merge]] at path scale).

**Violations facet.** `scanViolationsRealtime()` · `ViolationMonitorProvider` · `pnpm violations:watch` — live folder law · rules · diamond · gap eb · cross · import · path-follow · entanglement; each event bonds `accountCodeOf(atomPath)` ([[accounting]]).

**Improve facet — law: always improve in realtime.** `improveInRealtime()` · `runRealtimeImproveCycle()` · `pnpm improve:watch` — scan → prioritize → auto-fix safe classes (regen face · test stub · path record · seal credit eb) → append-only receipt → Sonner "Improved" toast; tenant/invoices/structure human-gated; ratchet never regresses.

**Law — [[law]]: bedside monitor capture collapses at the device edge — scalars and LOINC codes only cross into the EMR chain; raw waveforms stay local. Violation monitor: path is the account code on every gate event. Realtime improve: every safe violation closes with seal credit eb and a chained receipt — never loosen ratchet baselines.**

@see [[medical/device]] · [[medical]] · [[vital]] · [[readings]] · [[quantum/emr]]
