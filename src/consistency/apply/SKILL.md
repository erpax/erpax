---
name: apply
description: "Use when running the deterministic, idempotent consistency transforms that close code-consistency gaps (chain producer backfill, emits upgrade, e2e + shadcn scaffolds, localized flags) — the appliers the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent cron dispatch to."
atomPath: "consistency/apply"
coordinate: "consistency/apply · 4/weave · c8e6c238"
contentUuid: "0fcc4645-d983-56dc-a75b-1380ec3a0f39"
diamondUuid: "b89a6467-46b0-8362-8d44-13480f83fa2b"
uuid: "c8e6c238-a485-8efb-b6b8-37ccb9e89509"
horo: 4
typography:
  partition: consistency
  bondDegree: 45
standards:
  - "ISO/IEC 25010:2023 §5.1 functional-completeness"
  - "ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path"
  - "ISO/IEC-29119:2022 software-testing system-test-level"
  - "W3C-WAI-ARIA-1.2 accessibility-landmarks"
  - "WCAG-2.1-AA contrast text-spacing"
bindings: []
signatures:
  computationUuid: "1b10ecd9-c466-8dbb-9cd1-19c5b1f01097"
  stages:
    - stage: path
      stageUuid: "687fe7d3-a4dc-818f-b682-c0e0f5fc553a"
    - stage: trinity
      stageUuid: "19bb178e-90bd-8f2d-a8a7-8db3238e83a1"
    - stage: boundary
      stageUuid: "c1ef82b7-5588-825c-987d-7defdc9294af"
    - stage: links
      stageUuid: "08a8b179-fe37-80d6-834f-e3e7fea990be"
    - stage: horo
      stageUuid: "28d66b49-a78e-8e70-97a9-4696005f4065"
    - stage: seal
      stageUuid: "67f93012-a553-85bd-97a7-5e1c9cabc351"
    - stage: uuid
      stageUuid: "f2b8a2ec-5e6f-8a25-bfbe-2d4d9ed10f6b"
version: 2
---
# consistency/apply — the deterministic gap-closing transforms

Each `apply*` function is a deterministic, idempotent rewrite that closes one class of code-consistency gap surfaced by the architecture-invariants. The contract is fixed: read source from disk, apply the rewrite, write back, return an `ApplySummary` of `(file, action, detail)` tuples for the MCP audit log. Idempotent — re-running on already-clean source is a no-op; safe — never touches anything outside its documented file set; auditable — every change is reported. `applyAllConsistencyFixes` runs every safe transform and aggregates the audit log; the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent's hourly cron dispatch to it. A `dryRun` flag computes the summary without writing, and a missing target directory yields the empty summary.

Matter-twin: `src/consistency/apply/index.ts` (`applyAllConsistencyFixes` ⊕ `applyChainProducerBackfill` · `applyEmitsLegacyToStructured` · `applyChainE2eSeedScaffold` · `applyChainShadcnSurfaceScaffold` · `applyLocalizedTrueFlag` · `applyEmergingGapScaffold` · `applyI18nHarvestDryRun`, all returning `ApplySummary`/`AppliedChange`). Composes [[consistency]] · [[apply]].

**Law — [[law]]: every consistency fix is a deterministic, idempotent, audited transform — read · rewrite · write-back · report — so re-running is a no-op and a missing target is the empty summary.**

@audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
@standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
