---
name: spec
description: "Use when one workflow definition must generate many materializations — e2e test, help tip/subtitle, seed, evidence, marketing page, i18n keys — from a single source. The spec-generator over BUSINESS_CHAINS; e2e tests and help tips share one source."
atomPath: spec
coordinate: "spec · 5/round · 87cf53a0"
contentUuid: "fb9ff62c-cf7d-5031-ab60-88a901022b13"
diamondUuid: "1f8c981f-292f-8658-b735-9074082b72f2"
uuid: "87cf53a0-16f4-801c-b4b7-b2b041bf75b6"
horo: 5
typography:
  partition: spec
  bondDegree: 46
standards:
  - "ISO/IEC-12207"
  - "RFC-8259"
bindings: []
signatures:
  computationUuid: "e3c67d1e-28b0-8621-abd6-6a17177ba8d5"
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
      stageUuid: "9252a4c1-1060-8777-a666-821312915500"
    - stage: seal
      stageUuid: "4adf610e-54ae-8f0e-998a-9aa17a70dc3c"
    - stage: uuid
      stageUuid: "a8d9f63a-c803-8f96-b081-ee3cc7dfb846"
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
