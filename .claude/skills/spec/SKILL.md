---
name: spec
description: Use when one workflow definition must generate many materializations — e2e test, help tip/subtitle, seed, evidence, marketing page, i18n keys — from a single source. The spec-generator over BUSINESS_CHAINS; e2e tests and help tips share one source.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
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
