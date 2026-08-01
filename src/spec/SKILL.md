---
name: spec
description: "Use when one workflow definition must generate many materializations — e2e test, help tip/subtitle, seed, evidence, marketing page, i18n keys — from a single source. The spec-generator over BUSINESS_CHAINS; e2e tests and help tips share one source."
atomPath: spec
coordinate: "spec · 7/descent · 5a0266c5"
contentUuid: "f84ca258-69c5-5e83-bc75-c031a03efa19"
diamondUuid: "9b45b95b-9bfc-8a87-9893-d31df75af87c"
uuid: "5a0266c5-d065-8aad-974a-c447fdad8d22"
horo: 7
typography:
  partition: spec
  bondDegree: 0
standards:
  - "ISO/IEC-12207"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "61fd7899-1d72-84bb-bbef-681fc463f3e0"
  stages:
    - stage: path
      stageUuid: "4eb8ef9c-3c64-8427-add6-7d971014f25c"
    - stage: trinity
      stageUuid: "f7d39a74-2504-8f74-b7ec-af3f5120580c"
    - stage: boundary
      stageUuid: "b471e1f6-614b-857e-a888-8c53b22b545a"
    - stage: links
      stageUuid: "9ff24001-7257-8ffa-981c-1ea4f998eadd"
    - stage: horo
      stageUuid: "63a40514-229d-8157-b2a1-425613436899"
    - stage: seal
      stageUuid: "3ea5dd48-d2d0-8cbc-940a-8f05a124a3c0"
    - stage: uuid
      stageUuid: "6221eb69-611f-836b-9173-1bd079d419ff"
version: 2
---
# spec — one source, many materializations (e2e test ↔ help tip)

A **spec** is the single source a workflow is authored as — a [[port]]ed chain in the `BUSINESS_CHAINS` registry (ordered by the [[sequence]]); from it every output is *generated*, never hand-authored twice. Its content-`uuid` ([[identity]]) entangles the spec and its outputs across instances. The canonical duality: an **e2e test** (machine verification) and a **help tip / subtitle** (human guidance) have the **same source** — the spec's step list runs as the test AND renders as the WebVTT subtitle / tooltip. Matter↔antimatter: the spec is the form; test and help are its two materializations.

## One spec → every output (generate, don't re-author)
- **test** (verification) and **help** (guidance) — the same step list.
- **seed** fixtures — the [[accounting]] / [[commerce]] chain prerequisites.
- **evidence** — audit proof the chain ran (ties to [[accounting]] / [[identity]]).
- **i18n** keys + the marketing page.
Generation runs in a [[jobs]] task, is reached via [[api]], and surfaces in [[admin]].

## Common mistakes
- Authoring an e2e test and its help text separately — one drifts from the other; generate both from the spec.
- Hand-writing a seed or fixture a spec could generate.

**Law — [[law]]: one spec is the single source from which every materialization is generated, never hand-authored twice — e2e test and help tip share one step list; its content-uuid ([[identity]]) entangles the spec and its outputs.**
