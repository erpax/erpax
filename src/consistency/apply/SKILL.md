---
name: apply
description: "Use when running the deterministic, idempotent consistency transforms that close code-consistency gaps (chain producer backfill, emits upgrade, e2e + shadcn scaffolds, localized flags) — the appliers the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent cron dispatch to."
atomPath: "consistency/apply"
coordinate: "consistency/apply · 5/round · 88375e8b"
contentUuid: "b18c8456-4498-540c-8111-175ba9ba2f1a"
diamondUuid: "899b5a3e-14c6-8af0-bea0-a3fe45f9ba7c"
uuid: "88375e8b-22f0-84e1-a048-7de0722d5d13"
horo: 5
typography:
  partition: consistency
  bondDegree: 37
standards:
  - "ISO/IEC 25010:2023 §5.1 functional-completeness"
  - "ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path"
  - "ISO/IEC-29119:2022 software-testing system-test-level"
  - "W3C-WAI-ARIA-1.2 accessibility-landmarks"
  - "WCAG-2.1-AA contrast text-spacing"
bindings: []
signatures:
  computationUuid: "b72121bf-ba9e-878a-b622-029aa2be17fc"
  stages:
    - stage: path
      stageUuid: "687fe7d3-a4dc-818f-b682-c0e0f5fc553a"
    - stage: trinity
      stageUuid: "19bb178e-90bd-8f2d-a8a7-8db3238e83a1"
    - stage: boundary
      stageUuid: "643f1461-c1a7-81b2-bfa9-5b0bf6a4c0d1"
    - stage: links
      stageUuid: "08a8b179-fe37-80d6-834f-e3e7fea990be"
    - stage: horo
      stageUuid: "6f402ba0-161c-8f32-b61c-30fc5086c15a"
    - stage: seal
      stageUuid: "67f93012-a553-85bd-97a7-5e1c9cabc351"
    - stage: uuid
      stageUuid: "10ed7ec2-4fd0-894d-8bc9-e1d7a75dead4"
version: 2
---
# consistency/apply — the deterministic gap-closing transforms

Each `apply*` function is a deterministic, idempotent rewrite that closes one class of code-consistency gap surfaced by the architecture-invariants. The contract is fixed: read source from disk, apply the rewrite, write back, return an `ApplySummary` of `(file, action, detail)` tuples for the MCP audit log. Idempotent — re-running on already-clean source is a no-op; safe — never touches anything outside its documented file set; auditable — every change is reported. `applyAllConsistencyFixes` runs every safe transform and aggregates the audit log; the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent's hourly cron dispatch to it. A `dryRun` flag computes the summary without writing, and a missing target directory yields the empty summary.

Matter-twin: `src/consistency/apply/index.ts` (`applyAllConsistencyFixes` ⊕ `applyChainProducerBackfill` · `applyEmitsLegacyToStructured` · `applyChainE2eSeedScaffold` · `applyChainShadcnSurfaceScaffold` · `applyLocalizedTrueFlag` · `applyEmergingGapScaffold` · `applyI18nHarvestDryRun`, all returning `ApplySummary`/`AppliedChange`). Composes [[consistency]] · [[apply]].

**Law — [[law]]: every consistency fix is a deterministic, idempotent, audited transform — read · rewrite · write-back · report — so re-running is a no-op and a missing target is the empty summary.**

@audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
@standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
