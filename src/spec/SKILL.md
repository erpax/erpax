---
name: spec
description: "Use when one workflow definition must generate many materializations — e2e test, help tip/subtitle, seed, evidence, marketing page, i18n keys — from a single source. The spec-generator over BUSINESS_CHAINS; e2e tests and help tips share one source."
atomPath: spec
coordinate: "spec · 4/weave · ced87fc7"
contentUuid: "d1153c91-0087-58f8-bc18-3782285e6410"
diamondUuid: "203cde40-7da7-8f5f-90bd-cbab624fc3fe"
uuid: "ced87fc7-e92c-8005-96b6-01c57f54d7ae"
horo: 4
typography:
  partition: spec
  bondDegree: 49
standards:
  - "ISO/IEC-12207"
  - "RFC-8259"
bindings: []
signatures:
  computationUuid: "ccbe0a0c-ae3d-8049-9e1d-0b73e4dfe920"
  stages:
    - stage: path
      stageUuid: "4eb8ef9c-3c64-8427-add6-7d971014f25c"
    - stage: trinity
      stageUuid: "a28e5c14-595a-8e17-820d-529a7d62e1de"
    - stage: boundary
      stageUuid: "56a40433-6520-8a86-88e9-bb47997847ba"
    - stage: links
      stageUuid: "9ff24001-7257-8ffa-981c-1ea4f998eadd"
    - stage: horo
      stageUuid: "e851d193-4e2c-8ded-ba35-8595b08a7c84"
    - stage: seal
      stageUuid: "4adf610e-54ae-8f0e-998a-9aa17a70dc3c"
    - stage: uuid
      stageUuid: "36e0ef61-04a9-811c-876f-3b7c27ffb205"
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
