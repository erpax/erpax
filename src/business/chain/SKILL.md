---
name: chain
description: "Use when you need the canonical business-chain barrel — the 15+ registered (collection, action, emitted-event) workflows that map to published process standards (SOX P2P, IFRS-15 over-time, IFRS-16 lease cycle), each encoded ONCE with its Socratic check, plus the runner, context, and producer auto-wiring."
atomPath: business/chain
coordinate: business/chain · 5/round · 61d97984
contentUuid: "56d44ccc-8873-5062-bf6b-1d8c356f5d5d"
diamondUuid: "b2bcf49e-b199-86d7-b0ea-4966db947af9"
uuid: "61d97984-1155-8640-9576-60c39d8687d4"
horo: 5
bonds:
  in:
    - audit
    - business
    - emitter
    - law
  out:
    - audit
    - business
    - emitter
    - law
typography:
  partition: business
  bondDegree: 12
  neighbors: []
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
bindings: []
neighbors:
  wikilink:
    - audit
    - business
    - law
  matrix:
    - audit
    - business
    - emitter
    - law
  backlinks:
    - audit
    - business
    - emitter
    - law
signatures:
  computationUuid: "b0107758-39ce-8480-a561-9d7e8a0cc2c8"
  stages:
    - stage: path
      stageUuid: "c75c6731-fc46-88c6-a72b-192d427d070e"
    - stage: trinity
      stageUuid: "e2cadeee-9c1d-8b6e-b7d9-2b86cf714b16"
    - stage: boundary
      stageUuid: "8398c385-a7df-8e9c-b890-478ad7183154"
    - stage: links
      stageUuid: "a0c4983a-fbf3-8e98-ba4c-9afcefdb1713"
    - stage: horo
      stageUuid: "be65943b-4469-869a-8d76-66cacdb51ba2"
    - stage: seal
      stageUuid: "961948cc-fc72-8afc-a17e-9635ab4134ce"
    - stage: uuid
      stageUuid: "e23cb258-018c-8f1d-8ba2-084fd96cc82a"
version: 2
---
# business/chain — canonical business-chain barrel

The single import surface for ERPax business chains: every canonical workflow is a sequence of `(collection, action, emits, requires)` steps encoded ONCE in the registry and traced to a published standard. The Socratic check (canDo · makesSense · wired · isStandard) rides on each entry; `wireChainProducersFor` auto-injects the matching emit hooks so 80+ orphan emits collapse to one source of truth. Pure re-export — the matter lives in the sibling files.

Matter-twin: `src/business/chain/index.ts` (barrel) re-exporting `BUSINESS_CHAINS` · `BUSINESS_CHAIN_IDS` · `chainsForCollection` · `chainsForFeature` · `runChain` · `createChainContext` · `teardownChainContext` · `wireChainProducersFor`; types `BusinessChain` · `ChainStep` · `SocraticCheck` · `ChainRunResult`. A [[business]] workflow over the [[audit]]-evidenced corpus.

**Law — [[law]]: each business chain is encoded ONCE — its steps, standards, and Socratic check live in one registry entry, so a step's `requires` precede it and its producer wiring is the single source of truth for which events fire.**
