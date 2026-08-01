---
name: apply
description: "Use when running the deterministic, idempotent consistency transforms that close code-consistency gaps (chain producer backfill, emits upgrade, e2e + shadcn scaffolds, localized flags) — the appliers the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent cron dispatch to."
atomPath: "consistency/apply"
coordinate: "consistency/apply · 2/share · bcdb631c"
contentUuid: "fb4cd7c9-454e-51e1-819e-ba5f97ad2ae5"
diamondUuid: "f986679c-0fd7-841a-9e52-10dad174300d"
uuid: "bcdb631c-2144-88e8-98df-12893965b438"
horo: 2
typography:
  partition: consistency
  bondDegree: 39
standards:
  - "ISO/IEC 25010:2023 §5.1 functional-completeness"
  - "ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path"
  - "ISO/IEC-29119:2022 software-testing system-test-level"
  - "W3C-WAI-ARIA-1.2 accessibility-landmarks"
  - "WCAG-2.1-AA contrast text-spacing"
bindings: []
signatures:
  computationUuid: "d1c491b1-bd78-8882-956f-240f3716e2e3"
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
      stageUuid: "bc4e0631-94d1-8088-b762-2c6e40625395"
    - stage: seal
      stageUuid: "67f93012-a553-85bd-97a7-5e1c9cabc351"
    - stage: uuid
      stageUuid: "e0c4485e-fc4c-8dfc-a945-8c80ca464fef"
version: 2
---
# consistency/apply — the deterministic gap-closing transforms

Each `apply*` function is a deterministic, idempotent rewrite that closes one class of code-consistency gap surfaced by the architecture-invariants. The contract is fixed: read source from disk, apply the rewrite, write back, return an `ApplySummary` of `(file, action, detail)` tuples for the MCP audit log. Idempotent — re-running on already-clean source is a no-op; safe — never touches anything outside its documented file set; auditable — every change is reported. `applyAllConsistencyFixes` runs every safe transform and aggregates the audit log; the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent's hourly cron dispatch to it. A `dryRun` flag computes the summary without writing, and a missing target directory yields the empty summary.

Matter-twin: `src/consistency/apply/index.ts` (`applyAllConsistencyFixes` ⊕ `applyChainProducerBackfill` · `applyEmitsLegacyToStructured` · `applyChainE2eSeedScaffold` · `applyChainShadcnSurfaceScaffold` · `applyLocalizedTrueFlag` · `applyEmergingGapScaffold` · `applyI18nHarvestDryRun`, all returning `ApplySummary`/`AppliedChange`). Composes [[consistency]] · [[apply]].

**Law — [[law]]: every consistency fix is a deterministic, idempotent, audited transform — read · rewrite · write-back · report — so re-running is a no-op and a missing target is the empty summary.**

@audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
@standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
