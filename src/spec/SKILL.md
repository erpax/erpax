---
name: spec
description: "Use when one workflow definition must generate many materializations — e2e test, help tip/subtitle, seed, evidence, marketing page, i18n keys — from a single source. The spec-generator over BUSINESS_CHAINS; e2e tests and help tips share one source."
atomPath: spec
coordinate: spec · 1/base · baed5e9d
contentUuid: "1f2dce10-9b90-548d-8f64-35925109cc12"
diamondUuid: "4ddc4e5f-d408-8a4b-b6e8-ca8af590e049"
uuid: "baed5e9d-d1c3-8560-8a3e-7778ef78b572"
horo: 1
bonds:
  in:
    - accounting
    - admin
    - api
    - chat
    - collapse
    - commerce
    - concatenate
    - generate
    - identity
    - jobs
    - law
    - port
    - sequence
    - society
    - testing
    - trinity
  out:
    - accounting
    - admin
    - api
    - chat
    - collapse
    - commerce
    - concatenate
    - generate
    - identity
    - jobs
    - law
    - port
    - sequence
    - society
    - testing
    - trinity
typography:
  partition: spec
  bondDegree: 0
  neighbors: []
standards:
  - "ISO/IEC-12207"
  - "ISO/IEC-29119"
bindings: []
neighbors:
  wikilink:
    - accounting
    - admin
    - api
    - commerce
    - identity
    - jobs
    - law
    - port
    - sequence
  matrix:
    - accounting
    - admin
    - api
    - chat
    - collapse
    - commerce
    - concatenate
    - generate
    - identity
    - jobs
    - law
    - port
    - sequence
    - society
    - testing
    - trinity
  backlinks:
    - accounting
    - admin
    - api
    - chat
    - collapse
    - commerce
    - concatenate
    - generate
    - identity
    - jobs
    - law
    - port
    - sequence
    - society
    - testing
    - trinity
signatures:
  computationUuid: "3ebf92ec-727c-87e5-a1ca-330a826386a6"
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
      stageUuid: "bc66ad12-5152-808e-b6e3-e9f868b2a323"
    - stage: seal
      stageUuid: "3ea5dd48-d2d0-8cbc-940a-8f05a124a3c0"
    - stage: uuid
      stageUuid: "afba142d-2ede-8241-808d-888babc65a21"
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
