---
name: monitor
description: "Use when reasoning about patient monitor — hospital bedside vitals facet; pivot to @/medical/device registry. Also: realtime corpus violation monitor via @/monitor/violations (all gate axes, path-account bonded)."
atomPath: monitor
coordinate: "monitor · 7/descent · 142bfaa4"
contentUuid: "041e1ee4-f598-5507-b1cd-74fdb5234a0a"
diamondUuid: "0886dd4a-f2e8-8eab-af6b-c7ff274ada6c"
uuid: "142bfaa4-5b49-8325-b1bc-82a48843e0e9"
horo: 7
bonds:
  in:
    - accounting
    - device
    - emr
    - inventory
    - law
    - medical
    - merge
    - readings
    - violations
    - vital
  out:
    - accounting
    - device
    - emr
    - inventory
    - law
    - medical
    - merge
    - readings
    - violations
    - vital
typography:
  partition: monitor
  bondDegree: 31
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - device
    - emr
    - law
    - medical
    - merge
    - readings
    - vital
  matrix:
    - accounting
    - device
    - emr
    - inventory
    - law
    - medical
    - merge
    - readings
    - violations
    - vital
  backlinks:
    - accounting
    - device
    - emr
    - inventory
    - law
    - medical
    - merge
    - readings
    - violations
    - vital
signatures:
  computationUuid: "cb83aa4a-3b06-8ff8-b796-1a3e29713d50"
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
      stageUuid: "ff1b804e-6ca6-8f37-93a0-eb55efc8535e"
    - stage: seal
      stageUuid: "79116894-663f-85ce-944f-df4db398ed7b"
    - stage: uuid
      stageUuid: "3d7968da-fa90-8f71-a69d-bd38c8743a4b"
version: 2
---
# monitor — patient bedside monitor facet

Hospital **patient monitor** modality — HR, SpO₂, and systolic BP captured at the bedside, collapsed into a `DeviceReading` and wired through [[medical/device]] → [[readings]] → [[quantum/emr]].

**Pivot.** `deviceReadingFromMonitor` · `wireModalityToEmr('monitor', …)` — zero duplication ([[merge]] at path scale).

**Violations facet.** `scanViolationsRealtime()` · `ViolationMonitorProvider` · `pnpm violations:watch` — live folder law · rules · diamond · gap eb · cross · import · path-follow · entanglement; each event bonds `accountCodeOf(atomPath)` ([[accounting]]).

**Improve facet — law: always improve in realtime.** `improveInRealtime()` · `runRealtimeImproveCycle()` · `pnpm improve:watch` — scan → prioritize → auto-fix safe classes (regen face · test stub · path record · seal credit eb) → append-only receipt → Sonner "Improved" toast; tenant/invoices/structure human-gated; ratchet never regresses.

**Law — [[law]]: bedside monitor capture collapses at the device edge — scalars and LOINC codes only cross into the EMR chain; raw waveforms stay local. Violation monitor: path is the account code on every gate event. Realtime improve: every safe violation closes with seal credit eb and a chained receipt — never loosen ratchet baselines.**

@see [[medical/device]] · [[medical]] · [[vital]] · [[readings]] · [[quantum/emr]]
