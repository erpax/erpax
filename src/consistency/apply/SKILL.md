---
name: apply
description: "Use when running the deterministic, idempotent consistency transforms that close code-consistency gaps (chain producer backfill, emits upgrade, e2e + shadcn scaffolds, localized flags) — the appliers the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent cron dispatch to."
atomPath: "consistency/apply"
coordinate: "consistency/apply · 7/descent · 1d1c7d2e"
contentUuid: "663ef07c-9489-5aa1-86a5-1f3608448f5b"
diamondUuid: "2d8ce871-e0f5-872e-bc1d-866dcef11668"
uuid: "1d1c7d2e-5c1f-86bb-8514-4ad1c01220dc"
horo: 7
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
  computationUuid: "0b66bfc1-2e90-86cb-bd52-ad270da1ac65"
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
      stageUuid: "d676f5b9-4ad8-8eac-bf53-68f566ecf486"
    - stage: seal
      stageUuid: "67f93012-a553-85bd-97a7-5e1c9cabc351"
    - stage: uuid
      stageUuid: "ec919905-e038-865f-97e5-448d98cda062"
version: 2
---
# consistency/apply — the deterministic gap-closing transforms

Each `apply*` function is a deterministic, idempotent rewrite that closes one class of code-consistency gap surfaced by the architecture-invariants. The contract is fixed: read source from disk, apply the rewrite, write back, return an `ApplySummary` of `(file, action, detail)` tuples for the MCP audit log. Idempotent — re-running on already-clean source is a no-op; safe — never touches anything outside its documented file set; auditable — every change is reported. `applyAllConsistencyFixes` runs every safe transform and aggregates the audit log; the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent's hourly cron dispatch to it. A `dryRun` flag computes the summary without writing, and a missing target directory yields the empty summary.

Matter-twin: `src/consistency/apply/index.ts` (`applyAllConsistencyFixes` ⊕ `applyChainProducerBackfill` · `applyEmitsLegacyToStructured` · `applyChainE2eSeedScaffold` · `applyChainShadcnSurfaceScaffold` · `applyLocalizedTrueFlag` · `applyEmergingGapScaffold` · `applyI18nHarvestDryRun`, all returning `ApplySummary`/`AppliedChange`). Composes [[consistency]] · [[apply]].

**Law — [[law]]: every consistency fix is a deterministic, idempotent, audited transform — read · rewrite · write-back · report — so re-running is a no-op and a missing target is the empty summary.**

@audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
@standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
