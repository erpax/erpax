---
name: monitor
description: "Use when reasoning about patient monitor — hospital bedside vitals facet; pivot to @/medical/device registry. Also: realtime corpus violation monitor via @/monitor/violations (all gate axes, path-account bonded)."
atomPath: monitor
coordinate: monitor
contentUuid: "de7a7841-0e45-5c85-aeba-86402f563b95"
diamondUuid: "9743334a-8c2a-8c24-86a8-dd81bcb1a62c"
bonds:
  in: []
  out:
    - violations
typography:
  partition: monitor
  bondDegree: 11
  neighbors:
    - diamond
    - hallucination
    - purity
standards: []
bindings: []
neighbors:
  wikilink:
    - device
    - emr
    - law
    - medical
    - merge
    - readings
    - vital
  matrix: []
  backlinks: []
signatures:
  computationUuid: "8fa0fcd0-7eb1-8df9-a271-baa493a674eb"
  stages:
    - stage: path
      stageUuid: "48a30b3f-d283-8031-b938-a9ed3d5bbb7e"
    - stage: trinity
      stageUuid: "5efca0bc-f646-807d-809d-6fde3d369ce2"
    - stage: boundary
      stageUuid: "3a20e951-85f9-85b3-877a-05d1e0593196"
    - stage: links
      stageUuid: "3b13744e-b8cc-811d-9e7e-988eb499fac8"
    - stage: horo
      stageUuid: "c76b0e58-62a0-850c-9c11-1e037311fda2"
    - stage: seal
      stageUuid: "819480d9-99b0-8378-bc96-69cc227ea53c"
    - stage: uuid
      stageUuid: "b44e4ce5-6270-879c-9f9f-6951c1fc4f54"
version: 2
---
# monitor — patient bedside monitor facet

Hospital **patient monitor** modality — HR, SpO₂, and systolic BP captured at the bedside, collapsed into a `DeviceReading` and wired through [[medical/device]] → [[readings]] → [[quantum/emr]].

**Pivot.** `deviceReadingFromMonitor` · `wireModalityToEmr('monitor', …)` — zero duplication ([[merge]] at path scale).

**Violations facet.** `scanViolationsRealtime()` · `ViolationMonitorProvider` · `pnpm violations:watch` — live folder law · rules · diamond · gap eb · cross · import · path-follow · entanglement; each event bonds `accountCodeOf(atomPath)` ([[accounting]]).

**Improve facet — law: always improve in realtime.** `improveInRealtime()` · `runRealtimeImproveCycle()` · `pnpm improve:watch` — scan → prioritize → auto-fix safe classes (regen face · test stub · path record · seal credit eb) → append-only receipt → Sonner "Improved" toast; tenant/invoices/structure human-gated; ratchet never regresses.

**Law — [[law]]: bedside monitor capture collapses at the device edge — scalars and LOINC codes only cross into the EMR chain; raw waveforms stay local. Violation monitor: path is the account code on every gate event. Realtime improve: every safe violation closes with seal credit eb and a chained receipt — never loosen ratchet baselines.**

@see [[medical/device]] · [[medical]] · [[vital]] · [[readings]] · [[quantum/emr]]
