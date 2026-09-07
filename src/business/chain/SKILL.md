---
name: chain
description: "Use when you need the canonical business-chain barrel — the 15+ registered (collection, action, emitted-event) workflows that map to published process standards (SOX P2P, IFRS-15 over-time, IFRS-16 lease cycle), each encoded ONCE with its Socratic check, plus the runner, context, and producer auto-wiring."
atomPath: "business/chain"
coordinate: "business/chain · 4/weave · 638d8d88"
contentUuid: "7270e893-76d0-5395-8ad3-5aabe40dc21c"
diamondUuid: "44648782-6879-860e-8d3b-20db081ec268"
uuid: "638d8d88-8832-8d65-8209-05753c8963c6"
horo: 4
typography:
  partition: business
  bondDegree: 18
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "ISO/IEC-19510"
bindings: []
signatures:
  computationUuid: "074c657f-a16a-8e36-90af-59f4db6a3ef6"
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
      stageUuid: "1a6f1e74-77fa-8d1d-8506-8615ed22dc69"
    - stage: seal
      stageUuid: "968c052a-5594-8275-8783-d3a271721866"
    - stage: uuid
      stageUuid: "9d5ff0aa-0400-8e73-8ae7-0c8b1aa5de89"
version: 2
---
# business/chain — canonical business-chain barrel

The single import surface for ERPax business chains: every canonical workflow is a sequence of `(collection, action, emits, requires)` steps encoded ONCE in the registry and traced to a published standard. The Socratic check (canDo · makesSense · wired · isStandard) rides on each entry; `wireChainProducersFor` auto-injects the matching emit hooks so 80+ orphan emits collapse to one source of truth. Pure re-export — the matter lives in the sibling files.

Matter-twin: `src/business/chain/index.ts` (barrel) re-exporting `BUSINESS_CHAINS` · `BUSINESS_CHAIN_IDS` · `chainsForCollection` · `chainsForFeature` · `runChain` · `createChainContext` · `teardownChainContext` · `wireChainProducersFor`; types `BusinessChain` · `ChainStep` · `SocraticCheck` · `ChainRunResult`. A [[business]] workflow over the [[audit]]-evidenced corpus.

**Law — [[law]]: each business chain is encoded ONCE — its steps, standards, and Socratic check live in one registry entry, so a step's `requires` precede it and its producer wiring is the single source of truth for which events fire.**
