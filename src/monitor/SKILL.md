---
name: monitor
description: "Use when reasoning about patient monitor — hospital bedside vitals facet; pivot to @/medical/device registry. Also: realtime corpus violation monitor via @/monitor/violations (all gate axes, path-account bonded)."
atomPath: monitor
coordinate: "monitor · 8/crest · b56836e2"
contentUuid: "6cb47464-567f-51d0-87ea-d745317a4430"
diamondUuid: "1b36554e-9c82-8d95-8691-abbdaa3a8d80"
uuid: "b56836e2-8bbc-8115-b6f5-264846c60c8e"
horo: 8
typography:
  partition: monitor
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "48c1a30f-912d-815e-811b-c5218eb55e87"
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
      stageUuid: "e21bad1c-7dba-85d0-bd9b-c953a2c236b2"
    - stage: seal
      stageUuid: "79116894-663f-85ce-944f-df4db398ed7b"
    - stage: uuid
      stageUuid: "077bb969-c113-8bb3-a8a8-cecbff3d4287"
version: 2
---
# monitor — patient bedside monitor facet

Hospital **patient monitor** modality — HR, SpO₂, and systolic BP captured at the bedside, collapsed into a `DeviceReading` and wired through [[medical/device]] → [[readings]] → [[quantum/emr]].

**Pivot.** `deviceReadingFromMonitor` · `wireModalityToEmr('monitor', …)` — zero duplication ([[merge]] at path scale).

**Violations facet.** `scanViolationsRealtime()` · `ViolationMonitorProvider` · `pnpm violations:watch` — live folder law · rules · diamond · gap eb · cross · import · path-follow · entanglement; each event bonds `accountCodeOf(atomPath)` ([[accounting]]).

**Improve facet — law: always improve in realtime.** `improveInRealtime()` · `runRealtimeImproveCycle()` · `pnpm improve:watch` — scan → prioritize → auto-fix safe classes (regen face · test stub · path record · seal credit eb) → append-only receipt → Sonner "Improved" toast; tenant/invoices/structure human-gated; ratchet never regresses.

**Law — [[law]]: bedside monitor capture collapses at the device edge — scalars and LOINC codes only cross into the EMR chain; raw waveforms stay local. Violation monitor: path is the account code on every gate event. Realtime improve: every safe violation closes with seal credit eb and a chained receipt — never loosen ratchet baselines.**

@see [[medical/device]] · [[medical]] · [[vital]] · [[readings]] · [[quantum/emr]]
