---
name: monitor
description: "Use when reasoning about patient monitor — hospital bedside vitals facet; pivot to @/medical/device registry. Also: realtime corpus violation monitor via @/monitor/violations (all gate axes, path-account bonded)."
atomPath: monitor
coordinate: "monitor · 4/weave · 0ae769eb"
contentUuid: "b99bae92-ed66-5185-9e48-e6fbe5580eb4"
diamondUuid: "a04ad215-4b34-8643-8b63-5a8c73d5f89a"
uuid: "0ae769eb-9ee9-82b5-bba5-bf39d5860eda"
horo: 4
typography:
  partition: monitor
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "f9ed641a-e146-82be-8164-92f8048c1be7"
  stages:
    - stage: path
      stageUuid: "48a30b3f-d283-8031-b938-a9ed3d5bbb7e"
    - stage: trinity
      stageUuid: "5efca0bc-f646-807d-809d-6fde3d369ce2"
    - stage: boundary
      stageUuid: "648b4276-dae2-8571-bba3-45d0f4370455"
    - stage: links
      stageUuid: "ebde9b43-9d67-8de8-8e98-acef1dc22219"
    - stage: horo
      stageUuid: "037aa8e6-ce79-88cc-90a6-da9f7d34e918"
    - stage: seal
      stageUuid: "79116894-663f-85ce-944f-df4db398ed7b"
    - stage: uuid
      stageUuid: "898f38e3-1fa5-859b-b9b4-4c1bf480668b"
version: 2
---
# monitor — patient bedside monitor facet

Hospital **patient monitor** modality — HR, SpO₂, and systolic BP captured at the bedside, collapsed into a `DeviceReading` and wired through [[medical/device]] → [[readings]] → [[quantum/emr]].

**Pivot.** `deviceReadingFromMonitor` · `wireModalityToEmr('monitor', …)` — zero duplication ([[merge]] at path scale).

**Violations facet.** `scanViolationsRealtime()` · `ViolationMonitorProvider` · `pnpm violations:watch` — live folder law · rules · diamond · gap eb · cross · import · path-follow · entanglement; each event bonds `accountCodeOf(atomPath)` ([[accounting]]).

**Improve facet — law: always improve in realtime.** `improveInRealtime()` · `runRealtimeImproveCycle()` · `pnpm improve:watch` — scan → prioritize → auto-fix safe classes (regen face · test stub · path record · seal credit eb) → append-only receipt → Sonner "Improved" toast; tenant/invoices/structure human-gated; ratchet never regresses.

**Law — [[law]]: bedside monitor capture collapses at the device edge — scalars and LOINC codes only cross into the EMR chain; raw waveforms stay local. Violation monitor: path is the account code on every gate event. Realtime improve: every safe violation closes with seal credit eb and a chained receipt — never loosen ratchet baselines.**

@see [[medical/device]] · [[medical]] · vital · [[readings]] · [[quantum/emr]]
