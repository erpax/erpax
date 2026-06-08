---
name: apply
description: "Use when running the deterministic, idempotent consistency transforms that close code-consistency gaps (chain producer backfill, emits upgrade, e2e + shadcn scaffolds, localized flags) — the appliers the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent cron dispatch to."
atomPath: consistency/apply
coordinate: consistency/apply · 7/descent · 1e1a16a7
contentUuid: "ec407244-3fcf-5321-8f3b-eae089886538"
diamondUuid: "1f7797ee-0add-84de-833a-db0efc501087"
uuid: "1e1a16a7-0cfe-8c3d-a2ee-acc131e1440f"
horo: 7
bonds:
  in:
    - action
    - apply
    - collapse
    - consistency
    - direct
    - law
    - merge
    - sti
  out:
    - action
    - apply
    - collapse
    - direct
    - law
    - merge
    - sti
typography:
  partition: consistency
  bondDegree: 26
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited"
  - "ISO 9241-210:2019 human-centred-design"
  - "ISO-19011:2018 audit-trail visual-evidence ux-gap-finding"
  - "ISO/IEC 25010:2023 §5.1 functional-completeness"
  - "ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path"
  - "ISO/IEC-29119"
  - "ISO/IEC-29119:2022 software-testing system-test-level"
  - "Slice PPPPPPPP-cont CREATE_GAP emergence"
  - "W3C-WAI-ARIA-1.2 accessibility-landmarks"
  - "WCAG-2.1"
  - "WCAG-2.1-AA contrast text-spacing"
bindings: []
neighbors:
  wikilink:
    - apply
    - consistency
    - law
  matrix:
    - action
    - apply
    - collapse
    - direct
    - law
    - merge
    - sti
  backlinks:
    - action
    - apply
    - collapse
    - direct
    - law
    - merge
    - sti
signatures:
  computationUuid: "caf07ad1-b53d-86bc-aff7-dc44df6ab70d"
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
      stageUuid: "fada922e-9085-8f12-96c2-23f739d48d02"
    - stage: seal
      stageUuid: "67c29c22-4c4e-86fe-ab56-10c96640c98c"
    - stage: uuid
      stageUuid: "36dee821-c287-8da6-880a-c8f5c4ca3d9b"
version: 2
---
# consistency/apply — the deterministic gap-closing transforms

Each `apply*` function is a deterministic, idempotent rewrite that closes one class of code-consistency gap surfaced by the architecture-invariants. The contract is fixed: read source from disk, apply the rewrite, write back, return an `ApplySummary` of `(file, action, detail)` tuples for the MCP audit log. Idempotent — re-running on already-clean source is a no-op; safe — never touches anything outside its documented file set; auditable — every change is reported. `applyAllConsistencyFixes` runs every safe transform and aggregates the audit log; the `erpax.consistency.applyAll` MCP tool and the ConsistencyAgent's hourly cron dispatch to it. A `dryRun` flag computes the summary without writing, and a missing target directory yields the empty summary.

Matter-twin: `src/consistency/apply/index.ts` (`applyAllConsistencyFixes` ⊕ `applyChainProducerBackfill` · `applyEmitsLegacyToStructured` · `applyChainE2eSeedScaffold` · `applyChainShadcnSurfaceScaffold` · `applyLocalizedTrueFlag` · `applyEmergingGapScaffold` · `applyI18nHarvestDryRun`, all returning `ApplySummary`/`AppliedChange`). Composes [[consistency]] · [[apply]].

**Law — [[law]]: every consistency fix is a deterministic, idempotent, audited transform — read · rewrite · write-back · report — so re-running is a no-op and a missing target is the empty summary.**

@audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
@standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
